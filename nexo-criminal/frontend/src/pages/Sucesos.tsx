import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  sucesoService, vehiculoService, ubicacionService, personaService, modusService, iaService,
} from '../services/api';
import type { Suceso, Vehiculo, Ubicacion, Persona, TipoSuceso, TipoUbicacion } from '../types';
import { usePaginacion } from '../services/usePaginacion';
import Paginacion from '../components/Paginacion';
import MapaTactical, { PuntoMapa } from '../components/MapaTactical';
import ModalDetalle from '../components/ModalDetalle';
import ModalConfirmar from '../components/ModalConfirmar';
import Modal from '../components/Modal';
import { exportarCSV } from '../services/exportar';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { divIcon } from 'leaflet';
import FormPersona from '../components/FormPersona';
import FormVehiculo from '../components/FormVehiculo';

const TIPOS: TipoSuceso[] = ['ROBO_VEHICULO', 'DESAPARICION', 'AVISTAMIENTO', 'TRANSACCION'];

const tipoLabel: Record<string, string> = {
  ROBO_VEHICULO: 'Robo de vehículo',
  DESAPARICION: 'Desaparición',
  AVISTAMIENTO: 'Avistamiento',
  TRANSACCION: 'Transacción',
};

const TIPOS_UBI: TipoUbicacion[] = [
  'TALLER', 'GALPON', 'TERRENO_BALDIO', 'DOMICILIO',
  'CAJERO', 'TRANSPORTE_PUBLICO', 'COMERCIO', 'OTRO',
];

const tipoUbiLabel: Record<string, string> = {
  TALLER: 'Taller mecánico', GALPON: 'Galpón',
  TERRENO_BALDIO: 'Terreno baldío', DOMICILIO: 'Domicilio',
  CAJERO: 'Cajero automático', TRANSPORTE_PUBLICO: 'Transporte público',
  COMERCIO: 'Comercio', OTRO: 'Otro',
};

// Captura clicks en el mapa
function CapturadorClicks({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) { onPick(e.latlng.lat, e.latlng.lng); },
  });
  return null;
}

// Corrige el tamaño del mapa dentro del modal sin resize global
function InvalidarTamano() {
  const map = useMap();
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(t);
  }, [map]);
  return null;
}

// Datos de una ubicación nueva creada inline
interface UbiInline {
  direccion: string;
  tipo: TipoUbicacion;
  lat: number;
  lng: number;
}

const ubiVacia = (): UbiInline => ({ direccion: '', tipo: 'OTRO', lat: 0, lng: 0 });

export default function Sucesos() {
  const [searchParams] = useSearchParams();
  const [lista, setLista] = useState<Suceso[]>([]);
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [ubicaciones, setUbicaciones] = useState<Ubicacion[]>([]);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [filtro, setFiltro] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('');
  const [filtroVehiculo, setFiltroVehiculo] = useState<string>('');
  const [filtroPersona, setFiltroPersona] = useState<string>('');
  const [filtroUbicacion, setFiltroUbicacion] = useState<string>('');
  const [catalogoModus, setCatalogoModus] = useState<{ codigo: string; etiqueta: string }[]>([]);
  const [sugiriendo, setSugiriendo] = useState(false);
  const [form, setForm] = useState<Suceso>({
    tipo: 'ROBO_VEHICULO',
    fechaHora: new Date().toISOString().slice(0, 16),
  });
  const [modalVictima, setModalVictima] = useState(false);
  const [modalVehiculo, setModalVehiculo] = useState(false);

  // Ubicaciones nuevas a crear inline (hecho + última)
  const [ubiHecho, setUbiHecho] = useState<UbiInline>(ubiVacia());
  const [ubiUltima, setUbiUltima] = useState<UbiInline>(ubiVacia());

  // Picker de mapa: qué campo estoy marcando ('hecho' | 'ultima' | null)
  const [pickerPara, setPickerPara] = useState<'hecho' | 'ultima' | null>(null);
  const [pickerCoords, setPickerCoords] = useState<[number, number] | null>(null);

  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');
  const [detalle, setDetalle] = useState<Suceso | null>(null);
  const [aEliminar, setAEliminar] = useState<Suceso | null>(null);

  const cargar = async () => {
    try { setLista(await sucesoService.listar()); } catch (e) { console.error('Sucesos:', e); }
    try { setVehiculos(await vehiculoService.listar()); } catch (e) { console.error('Vehiculos:', e); }
    try { setUbicaciones(await ubicacionService.listar()); } catch (e) { console.error('Ubicaciones:', e); }
    try { setPersonas(await personaService.listar()); } catch (e) { console.error('Personas:', e); }
    try { setCatalogoModus(await modusService.listar()); } catch (e) { console.error('Modus:', e); }
  };

  // Tras crear una víctima inline: recarga la lista y la selecciona en el suceso
  const onVictimaCreada = async (persona: Persona) => {
    setModalVictima(false);
    try {
      const lista = await personaService.listar();
      setPersonas(lista);
      // auto-seleccionar la recién creada como víctima
      const nueva = lista.find(p => p.id === persona.id) || persona;
      setForm(f => ({ ...f, victima: nueva }));
    } catch (e) {
      console.error('Recargar personas:', e);
    }
  };

  // Tras crear un vehículo inline: recarga la lista y lo selecciona en el suceso
  const onVehiculoCreado = async (vehiculo: Vehiculo) => {
    setModalVehiculo(false);
    try {
      const lista = await vehiculoService.listar();
      setVehiculos(lista);
      const nuevo = lista.find(v => v.id === vehiculo.id) || vehiculo;
      setForm(f => ({ ...f, vehiculo: nuevo }));
    } catch (e) {
      console.error('Recargar vehiculos:', e);
    }
  };

  useEffect(() => {
    cargar();
    if (searchParams.get('nueva') === '1') {
      setTimeout(() => {
        document.getElementById('form-suceso')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, []);

  const pickIcon = divIcon({
    className: 'custom-marker',
    iconSize: [32, 42],
    iconAnchor: [16, 32],
    html: `<div class="marker-pin sospechoso"><span class="material-symbols-outlined">push_pin</span></div>`,
  });

  const abrirPicker = (para: 'hecho' | 'ultima') => {
    setPickerCoords(null);
    setPickerPara(para);
  };

  const confirmarPicker = () => {
    if (!pickerCoords || !pickerPara) return;
    if (pickerPara === 'hecho') {
      setUbiHecho({ ...ubiHecho, lat: pickerCoords[0], lng: pickerCoords[1] });
    } else {
      setUbiUltima({ ...ubiUltima, lat: pickerCoords[0], lng: pickerCoords[1] });
    }
    setPickerPara(null);
    setPickerCoords(null);
  };

  // Crea una ubicación inline si tiene coordenadas; devuelve su id o undefined
  const resolverUbicacion = async (ubi: UbiInline): Promise<number | undefined> => {
    if (ubi.lat === 0 && ubi.lng === 0) return undefined;
    const creada = await ubicacionService.crear({
      direccion: '',
      latitud: ubi.lat,
      longitud: ubi.lng,
      tipo: 'OTRO',
    } as Ubicacion);
    return creada.id;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(''); setOk('');
    try {
      const idHecho = await resolverUbicacion(ubiHecho);
      const idUltima = await resolverUbicacion(ubiUltima);

      const payload = {
        ...form,
        vehiculo: form.vehiculo?.id ? { id: form.vehiculo.id } : null,
        victima: form.victima?.id ? { id: form.victima.id } : null,
        ubicacion: idHecho ? { id: idHecho } : null,
        ubicacionUltima: idUltima ? { id: idUltima } : null,
      };
      await sucesoService.crear(payload as Suceso);

      setForm({ tipo: 'ROBO_VEHICULO', fechaHora: new Date().toISOString().slice(0, 16) });
      setUbiHecho(ubiVacia());
      setUbiUltima(ubiVacia());
      setOk('Suceso registrado correctamente');
      setTimeout(() => setOk(''), 3000);
      await cargar();
    } catch (e: any) {
      setErr(e?.response?.data?.error || 'Error al guardar');
    }
  };

  const confirmarEliminar = async () => {
    if (!aEliminar) return;
    try {
      await sucesoService.eliminar(aEliminar.id!);
      setAEliminar(null);
      setOk('Suceso eliminado');
      setTimeout(() => setOk(''), 3000);
      await cargar();
    } catch (e: any) {
      setErr(e?.response?.data?.error || 'No se pudo eliminar');
      setAEliminar(null);
    }
  };

  const exportar = () => {
    exportarCSV(
      filtrados.map(s => ({
        ID: `EV-${String(s.id).padStart(4, '0')}`,
        Tipo: tipoLabel[s.tipo],
        Fecha: new Date(s.fechaHora).toLocaleString('es-ES'),
        Vehiculo: s.vehiculo?.placa || '',
        Marca: s.vehiculo ? `${s.vehiculo.marca} ${s.vehiculo.modelo}` : '',
        Victima: s.victima ? `${s.victima.nombre} ${s.victima.apellido}` : '',
        Ubicacion: s.ubicacion?.direccion || '',
        Modus: s.modusOperandi || '',
        Descripcion: s.descripcion || '',
      })),
      'sucesos'
    );
  };

  const filtrados = lista.filter(s => {
    if (filtroTipo && s.tipo !== filtroTipo) return false;
    if (filtroVehiculo && String(s.vehiculo?.id) !== filtroVehiculo) return false;
    if (filtroPersona && String(s.victima?.id) !== filtroPersona) return false;
    if (filtroUbicacion && String(s.ubicacion?.id) !== filtroUbicacion) return false;
    if (!filtro.trim()) return true;
    const q = filtro.toLowerCase();
    return s.tipo.toLowerCase().includes(q) ||
      s.modusOperandi?.toLowerCase().includes(q) ||
      s.descripcion?.toLowerCase().includes(q) ||
      s.vehiculo?.placa?.toLowerCase().includes(q) ||
      s.victima?.nombre?.toLowerCase().includes(q) ||
      s.victima?.apellido?.toLowerCase().includes(q);
  });

  const { visibles, pagina, setPagina, total, porPagina } = usePaginacion(filtrados, 10);

  const puntos: PuntoMapa[] = useMemo(
    () => filtrados.filter(s => s.ubicacion?.latitud && s.ubicacion?.longitud)
      .map(s => ({
        id: s.id!, lat: s.ubicacion!.latitud, lng: s.ubicacion!.longitud,
        tipo: 'SUCESO',
        titulo: tipoLabel[s.tipo],
        subtitulo: `EV-${String(s.id).padStart(4, '0')}`,
        sospechoso: s.tipo === 'ROBO_VEHICULO',
        campos: [
          { etiqueta: 'Fecha', valor: new Date(s.fechaHora).toLocaleString('es-ES') },
          { etiqueta: 'Vehículo', valor: s.vehiculo ? s.vehiculo.placa : '—' },
          { etiqueta: 'Víctima', valor: s.victima ? `${s.victima.nombre} ${s.victima.apellido}` : '—' },
          { etiqueta: 'Modus', valor: s.modusOperandi || '—' },
        ],
      })), [filtrados]);

  const ultimaSemana = lista.filter(s => {
    const d = new Date(s.fechaHora);
    return d.getTime() > Date.now() - 7 * 24 * 3600 * 1000;
  }).length;
  const robos = lista.filter(s => s.tipo === 'ROBO_VEHICULO').length;
  const desapariciones = lista.filter(s => s.tipo === 'DESAPARICION').length;

  const limpiarFiltros = () => {
    setFiltro(''); setFiltroTipo(''); setFiltroVehiculo('');
    setFiltroPersona(''); setFiltroUbicacion('');
  };
  const filtrosActivos = filtro || filtroTipo || filtroVehiculo || filtroPersona || filtroUbicacion;

  // Bloque reutilizable para marcar una ubicación inline (solo mapa)
  const BloqueUbicacion = ({ titulo, ubi, para }: {
    titulo: string; ubi: UbiInline; para: 'hecho' | 'ultima';
  }) => (
    <div className="form-group full">
      <label className="form-label">{titulo}</label>
      <button type="button" className="btn-secondary" onClick={() => abrirPicker(para)}>
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add_location_alt</span>
        {(ubi.lat !== 0 || ubi.lng !== 0) ? 'Cambiar ubicación en mapa' : 'Marcar en mapa'}
      </button>
      {(ubi.lat !== 0 || ubi.lng !== 0) && (
        <div style={{
          marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 12,
          color: 'var(--green-600, #16A34A)',
        }}>
          ✓ {ubi.lat.toFixed(6)}, {ubi.lng.toFixed(6)}
        </div>
      )}
    </div>
  );

  // Pide a la IA que clasifique el modus a partir de la descripción
  const sugerirModus = async () => {
    if (!form.descripcion?.trim()) {
      setErr('Escribí una descripción del hecho para que la IA pueda sugerir el modus.');
      setTimeout(() => setErr(''), 3000);
      return;
    }
    setSugiriendo(true);
    setErr('');
    try {
      const r = await iaService.clasificarModus(form.descripcion);
      setForm(f => ({ ...f, modusOperandi: r.codigo }));
      setOk(`IA sugirió: ${r.etiqueta}. Podés cambiarlo si no corresponde.`);
      setTimeout(() => setOk(''), 4000);
    } catch (e: any) {
      setErr(e?.response?.data?.error || 'No se pudo obtener la sugerencia de la IA.');
      setTimeout(() => setErr(''), 3000);
    } finally {
      setSugiriendo(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Registro de Sucesos</h1>
          <p className="page-subtitle">Gestión y monitoreo de incidentes criminales en tiempo real.</p>
        </div>
        <div className="page-badges">
          <span className="badge-pill">TOTAL: {lista.length}</span>
          <span className="badge-pill alerta">ÚLTIMA SEMANA: {ultimaSemana}</span>
        </div>
      </div>

      <div className="toolbar">
        <button className="btn-ghost" onClick={exportar}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
          Exportar CSV
        </button>
      </div>

      <div className="bento-grid" id="form-suceso">
        <div className="bento-col-5">
          <div className="form-card" style={{ height: '100%' }}>
            <div className="card-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 20 }}>
              <span className="material-symbols-outlined">app_registration</span>
              <h3 className="card-title">Registrar suceso</h3>
            </div>
            <form onSubmit={submit}>
              <div className="form-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                <div className="form-group">
                  <label className="form-label">Tipo</label>
                  <select value={form.tipo}
                    onChange={(e) => setForm({ ...form, tipo: e.target.value as TipoSuceso })}>
                    {TIPOS.map(t => <option key={t} value={t}>{tipoLabel[t]}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Fecha y hora</label>
                  <input type="datetime-local" value={form.fechaHora}
                    onChange={(e) => setForm({ ...form, fechaHora: e.target.value })} required />
                </div>
                <div className="form-group full">
                  <label className="form-label">Modus operandi</label>
                  <select value={form.modusOperandi || ''}
                    onChange={(e) => setForm({ ...form, modusOperandi: e.target.value })}>
                    <option value="">— Sin especificar —</option>
                    {catalogoModus.map(m => (
                      <option key={m.codigo} value={m.codigo}>{m.etiqueta}</option>
                    ))}
                  </select>
                  <button type="button"
                    onClick={sugerirModus}
                    disabled={sugiriendo}
                    style={{
                      marginTop: 8,
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '6px 12px', fontSize: 12, cursor: 'pointer',
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%)',
                      border: '1px solid rgba(139, 92, 246, 0.4)',
                      color: '#C4B5FD',
                    }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                      {sugiriendo ? 'hourglass_empty' : 'auto_awesome'}
                    </span>
                    {sugiriendo ? 'Analizando...' : 'Sugerir con IA'}
                  </button>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Vehículo<span className="entity-counter">{vehiculos.length}</span>
                  </label>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <select value={form.vehiculo?.id || ''}
                      style={{ flex: 1 }}
                      onChange={(e) => {
                        const id = Number(e.target.value);
                        setForm({ ...form, vehiculo: vehiculos.find(v => v.id === id) || null });
                      }}>
                      <option value="">— Ninguno —</option>
                      {vehiculos.map(v => (
                        <option key={v.id} value={v.id}>
                          {v.placa} — {v.marca} {v.modelo}
                        </option>
                      ))}
                    </select>
                    <button type="button" className="btn-secondary"
                      title="Crear vehículo nuevo"
                      style={{ padding: '0 12px', flexShrink: 0 }}
                      onClick={() => setModalVehiculo(true)}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Víctima<span className="entity-counter">{personas.length}</span>
                  </label>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <select value={form.victima?.id || ''}
                      style={{ flex: 1 }}
                      onChange={(e) => {
                        const id = Number(e.target.value);
                        setForm({ ...form, victima: personas.find(p => p.id === id) || null });
                      }}>
                      <option value="">— Ninguna —</option>
                      {personas.map(p => (
                        <option key={p.id} value={p.id}>{p.nombre} {p.apellido} ({p.rol})</option>
                      ))}
                    </select>
                    <button type="button" className="btn-secondary"
                      title="Crear persona nueva"
                      style={{ padding: '0 12px', flexShrink: 0 }}
                      onClick={() => setModalVictima(true)}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
                    </button>
                  </div>
                </div>

                {/* Ubicación del hecho — mapa directo inline */}
                <BloqueUbicacion titulo="Ubicación del hecho" ubi={ubiHecho} para="hecho" />

                {/* Última ubicación — mapa directo inline */}
                <BloqueUbicacion titulo="Última ubicación conocida" ubi={ubiUltima} para="ultima" />

                <div className="form-group full">
                  <label className="form-label">Descripción</label>
                  <textarea rows={3} value={form.descripcion || ''}
                    onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                    placeholder="Detalles adicionales del incidente..." />
                </div>
              </div>
              {err && <div className="error">{err}</div>}
              {ok && <div className="success">{ok}</div>}
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: 16 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>send</span>
                Crear suceso
              </button>
            </form>
          </div>
        </div>

        <div className="bento-col-7">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: '100%' }}>
            <MapaTactical puntos={puntos} altura={300}
              hudLabel="Mapa de sucesos"
              hudValor={`${puntos.length} de ${lista.length} con ubicación`}
              emptyMessage="Sin sucesos georreferenciados" />
            <div className="mini-stats">
              <div className="mini-stat" style={{ borderLeft: '4px solid var(--red-500)' }}>
                <div className="mini-stat-label">Sucesos totales</div>
                <div className="mini-stat-value">{lista.length}</div>
                <div className="mini-stat-change">+{ultimaSemana} última semana</div>
              </div>
              <div className="mini-stat">
                <div className="mini-stat-label">Robos de vehículo</div>
                <div className="mini-stat-value danger">{robos}</div>
                <div className="mini-stat-change danger">Activos</div>
              </div>
              <div className="mini-stat">
                <div className="mini-stat-label">Desapariciones</div>
                <div className="mini-stat-value tertiary">{desapariciones}</div>
                <div className="mini-stat-change">En investigación</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros avanzados */}
      <div className="form-card" style={{ marginBottom: 20, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--red-500)', fontSize: 18 }}>filter_alt</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Filtros avanzados
          </span>
          {filtrosActivos && (
            <button type="button" className="btn-ghost"
              style={{ marginLeft: 'auto', fontSize: 10, padding: '4px 10px' }}
              onClick={limpiarFiltros}>
              <span className="material-symbols-outlined" style={{ fontSize: 12 }}>clear</span>
              Limpiar filtros
            </button>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
          <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
            <option value="">Todos los tipos</option>
            {TIPOS.map(t => <option key={t} value={t}>{tipoLabel[t]}</option>)}
          </select>
          <select value={filtroVehiculo} onChange={(e) => setFiltroVehiculo(e.target.value)}>
            <option value="">Cualquier vehículo</option>
            {vehiculos.map(v => (
              <option key={v.id} value={v.id}>{v.placa} — {v.marca} {v.modelo}</option>
            ))}
          </select>
          <select value={filtroPersona} onChange={(e) => setFiltroPersona(e.target.value)}>
            <option value="">Cualquier víctima</option>
            {personas.map(p => (
              <option key={p.id} value={p.id}>{p.nombre} {p.apellido}</option>
            ))}
          </select>
          <select value={filtroUbicacion} onChange={(e) => setFiltroUbicacion(e.target.value)}>
            <option value="">Cualquier ubicación</option>
            {ubicaciones.map(u => (
              <option key={u.id} value={u.id}>{u.direccion || `Ubi #${u.id}`}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div className="table-wrap">
        <div className="table-header">
          <div className="table-header-title">
            <span className="material-symbols-outlined">format_list_bulleted</span>
            <h3>Historial de Sucesos</h3>
          </div>
          <div className="table-header-actions">
            <div className="filter-input-wrap">
              <span className="material-symbols-outlined">search</span>
              <input type="text" placeholder="Buscar por texto libre..."
                value={filtro} onChange={(e) => setFiltro(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Tipo</th><th>Fecha</th>
                <th>Vehículo</th><th>Víctima</th><th>Modus</th>
                <th className="right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map(s => (
                <tr key={s.id}>
                  <td className="mono" style={{ fontWeight: 700 }}>
                    #EV-{String(s.id).padStart(4, '0')}
                  </td>
                  <td style={{ color: 'white', fontWeight: 600 }}>{tipoLabel[s.tipo]}</td>
                  <td style={{ fontSize: 11, color: 'var(--slate-400)' }}>
                    {new Date(s.fechaHora).toLocaleString('es-ES', {
                      day: '2-digit', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    }).toUpperCase()}
                  </td>
                  <td style={{ fontSize: 12 }}>
                    {s.vehiculo ? (
                      <>
                        <span style={{ color: 'white', fontFamily: 'var(--font-mono)' }}>{s.vehiculo.placa}</span>
                        <div className="row-sub">{s.vehiculo.marca} {s.vehiculo.modelo}</div>
                      </>
                    ) : <span style={{ color: 'var(--slate-600)' }}>Sin vehículo</span>}
                  </td>
                  <td style={{ fontSize: 12 }}>
                    {s.victima ? `${s.victima.nombre} ${s.victima.apellido}`
                      : <span style={{ color: 'var(--slate-600)' }}>—</span>}
                  </td>
                  <td>
                    {s.modusOperandi ? (
                      <span className="badge robado" style={{ fontFamily: 'var(--font-mono)' }}>{s.modusOperandi}</span>
                    ) : '—'}
                  </td>
                  <td className="right">
                    <div className="table-actions">
                      <button className="btn-icon" onClick={() => setDetalle(s)} title="Ver detalle">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>visibility</span>
                      </button>
                      <button className="btn-icon danger" onClick={() => setAEliminar(s)} title="Eliminar">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {visibles.length === 0 && (
                <tr><td colSpan={7} className="table-empty">
                  {filtrosActivos ? 'Sin resultados' : 'Sin sucesos registrados'}
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Paginacion total={total} pagina={pagina} porPagina={porPagina}
          onCambiar={setPagina} label="sucesos" />
      </div>

      {/* Modal Detalle */}
      {detalle && (
        <ModalDetalle abierto={!!detalle} onClose={() => setDetalle(null)}
          titulo={tipoLabel[detalle.tipo]}
          subtitulo={`EV-${String(detalle.id).padStart(4, '0')}`}
          icono="event_note"
          campos={[
            { etiqueta: 'ID', valor: `EV-${String(detalle.id).padStart(4, '0')}`, mono: true, destacado: true },
            { etiqueta: 'Tipo', valor: tipoLabel[detalle.tipo] },
            { etiqueta: 'Fecha y hora', valor: new Date(detalle.fechaHora).toLocaleString('es-ES'), mono: true },
            { etiqueta: 'Modus operandi', valor: detalle.modusOperandi || '—', mono: true },
            { etiqueta: 'Vehículo', valor: detalle.vehiculo ? `${detalle.vehiculo.placa} — ${detalle.vehiculo.marca} ${detalle.vehiculo.modelo}` : '—' },
            { etiqueta: 'Víctima', valor: detalle.victima ? `${detalle.victima.nombre} ${detalle.victima.apellido}` : '—' },
            { etiqueta: 'Ubicación del hecho', valor: detalle.ubicacion?.direccion || '—' },
            { etiqueta: 'Última ubicación', valor: detalle.ubicacionUltima?.direccion || '—' },
          ]}
          extra={
            detalle.descripcion ? (
              <div style={{ marginTop: 16 }}>
                <h4 style={{
                  fontSize: 11, color: 'var(--slate-500)', textTransform: 'uppercase',
                  letterSpacing: '0.1em', margin: '0 0 8px',
                }}>
                  Descripción detallada
                </h4>
                <div style={{
                  padding: 12, background: 'var(--slate-950)',
                  border: '1px solid var(--slate-800)', fontSize: 13,
                  color: 'var(--slate-300)', lineHeight: 1.6,
                }}>
                  {detalle.descripcion}
                </div>
              </div>
            ) : null
          }
        />
      )}

      <ModalConfirmar abierto={!!aEliminar} titulo="¿Eliminar suceso?"
        mensaje={aEliminar ? `Vas a eliminar el suceso EV-${String(aEliminar.id).padStart(4, '0')}.` : ''}
        onConfirmar={confirmarEliminar} onCancelar={() => setAEliminar(null)}
        textoConfirmar="Eliminar" peligro />
      
      {/* Modal crear víctima inline */}
      <Modal
        abierto={modalVictima}
        onClose={() => setModalVictima(false)}
        titulo="Registrar nueva persona"
        icono="person_add"
        ancho={620}
      >
        <p style={{ color: 'var(--slate-400)', fontSize: 12, marginBottom: 16 }}>
          La persona se registrará con rol de víctima y quedará seleccionada en el suceso.
        </p>
        <FormPersona
          rolFijo="VICTIMA"
          onGuardado={onVictimaCreada}
          onCancelar={() => setModalVictima(false)}
          textoGuardar="Crear y seleccionar"
        />

      </Modal>

      {/* Modal crear vehículo inline */}
      <Modal
        abierto={modalVehiculo}
        onClose={() => setModalVehiculo(false)}
        titulo="Registrar nuevo vehículo"
        icono="directions_car"
        ancho={620}
      >
        <p style={{ color: 'var(--slate-400)', fontSize: 12, marginBottom: 16 }}>
          El vehículo se registrará como robado y quedará seleccionado en el suceso.
        </p>
        <FormVehiculo
          estadoInicial="ROBADO"
          mostrarPropietario={false}
          onGuardado={onVehiculoCreado}
          onCancelar={() => setModalVehiculo(false)}
          textoGuardar="Crear y seleccionar"
        />
      </Modal>

      {/* Modal picker de mapa (compartido por ambos campos de ubicación) */}
      <Modal
        abierto={pickerPara !== null}
        onClose={() => { setPickerPara(null); setPickerCoords(null); }}
        titulo={pickerPara === 'ultima' ? 'Marcar última ubicación' : 'Marcar ubicación del hecho'}
        icono="add_location_alt"
        ancho={760}
      >
        <p style={{ color: 'var(--slate-400)', fontSize: 12, marginBottom: 12 }}>
          Hacé click en cualquier punto del mapa para seleccionar las coordenadas.
        </p>
        {pickerPara !== null && (
          <div style={{ height: 400, border: '1px solid var(--slate-800)', position: 'relative' }}>
            <MapContainer
              key={`picker-suceso-${pickerPara}`}
              center={[10.45, -64.17]}
              zoom={11}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap"
              />
              <InvalidarTamano />
              <CapturadorClicks onPick={(lat, lng) => setPickerCoords([lat, lng])} />
              {pickerCoords && <Marker position={pickerCoords} icon={pickIcon} />}
            </MapContainer>
          </div>
        )}
        {pickerCoords && (
          <div style={{
            marginTop: 12, padding: 10, background: 'var(--slate-950)',
            border: '1px solid var(--red-500)', fontFamily: 'var(--font-mono)', fontSize: 12,
          }}>
            <strong style={{ color: 'var(--red-500)' }}>Seleccionado: </strong>
            <span style={{ color: 'white' }}>
              {pickerCoords[0].toFixed(6)}, {pickerCoords[1].toFixed(6)}
            </span>
          </div>
        )}
        <div style={{
          display: 'flex', gap: 8, justifyContent: 'flex-end',
          marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--slate-800)',
        }}>
          <button type="button" className="btn-ghost"
            onClick={() => { setPickerPara(null); setPickerCoords(null); }}>
            Cancelar
          </button>
          <button type="button" className="btn-primary" onClick={confirmarPicker} disabled={!pickerCoords}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check</span>
            Usar estas coordenadas
          </button>
        </div>
      </Modal>
    </>
  );
}