import { useEffect, useMemo, useState } from 'react';
import { ubicacionService } from '../services/api';
import type { Ubicacion, TipoUbicacion } from '../types';
import { usePaginacion } from '../services/usePaginacion';
import Paginacion from '../components/Paginacion';
import MapaTactical, { PuntoMapa } from '../components/MapaTactical';
import ModalConfirmar from '../components/ModalConfirmar';
import ModalDetalle from '../components/ModalDetalle';
import { exportarCSV } from '../services/exportar';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { divIcon } from 'leaflet';
import Modal from '../components/Modal';

const TIPOS: TipoUbicacion[] = [
  'TALLER', 'GALPON', 'TERRENO_BALDIO', 'DOMICILIO',
  'CAJERO', 'TRANSPORTE_PUBLICO', 'COMERCIO', 'OTRO',
];

const tipoLabel: Record<string, string> = {
  TALLER: 'Taller mecánico', GALPON: 'Galpón',
  TERRENO_BALDIO: 'Terreno baldío', DOMICILIO: 'Domicilio',
  CAJERO: 'Cajero automático', TRANSPORTE_PUBLICO: 'Transporte público',
  COMERCIO: 'Comercio', OTRO: 'Otro',
};

const tipoIcono: Record<string, string> = {
  TALLER: 'build', GALPON: 'warehouse', TERRENO_BALDIO: 'landscape',
  DOMICILIO: 'home', CAJERO: 'local_atm',
  TRANSPORTE_PUBLICO: 'directions_bus', COMERCIO: 'storefront', OTRO: 'place',
};

// Componente que captura clicks en el mapa
function CapturadorClicks({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// Corrige el tamaño del mapa al montarse dentro del modal,
// sin disparar un resize global que afecte a otros mapas de la pagina.
function InvalidarTamano() {
  const map = useMap();
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(t);
  }, [map]);
  return null;
}

export default function Ubicaciones() {
  const [lista, setLista] = useState<Ubicacion[]>([]);
  const [filtro, setFiltro] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('');
  const [form, setForm] = useState<Ubicacion>({
    direccion: '', latitud: 0, longitud: 0, tipo: 'OTRO',
  });
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');
  const [pickerAbierto, setPickerAbierto] = useState(false);
  const [pickerCoords, setPickerCoords] = useState<[number, number] | null>(null);
  const [detalle, setDetalle] = useState<Ubicacion | null>(null);
  const [aEliminar, setAEliminar] = useState<Ubicacion | null>(null);

  const cargar = async () => setLista(await ubicacionService.listar());
  useEffect(() => { cargar(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(''); setOk('');
    if (form.latitud === 0 && form.longitud === 0) {
      setErr('Coordenadas inválidas. Hacé click en el mapa o ingresá las coordenadas manualmente.');
      return;
    }
    try {
      await ubicacionService.crear(form);
      setForm({ direccion: '', latitud: 0, longitud: 0, tipo: 'OTRO' });
      setOk('Ubicación registrada correctamente');
      setTimeout(() => setOk(''), 3000);
      await cargar();
    } catch (e: any) {
      setErr(e?.response?.data?.error || 'Error al guardar');
    }
  };

  const confirmarPicker = () => {
    if (pickerCoords) {
      setForm({ ...form, latitud: pickerCoords[0], longitud: pickerCoords[1] });
      setPickerAbierto(false);
      setPickerCoords(null);
    }
  };

  const confirmarEliminar = async () => {
    if (!aEliminar) return;
    try {
      await ubicacionService.eliminar(aEliminar.id!);
      setAEliminar(null);
      setOk('Ubicación eliminada');
      setTimeout(() => setOk(''), 3000);
      await cargar();
    } catch (e: any) {
      setErr(e?.response?.data?.error || 'No se pudo eliminar');
      setAEliminar(null);
    }
  };

  const exportar = () => {
    exportarCSV(
      filtradas.map(u => ({
        ID: u.id, Direccion: u.direccion || '',
        Latitud: u.latitud, Longitud: u.longitud,
        Tipo: tipoLabel[u.tipo || 'OTRO'],
        Sospechoso: u.nodoSospechoso ? 'Sí' : 'No',
      })),
      'ubicaciones'
    );
  };

  const filtradas = lista.filter((u) => {
    if (filtroTipo && u.tipo !== filtroTipo) return false;
    if (!filtro.trim()) return true;
    const q = filtro.toLowerCase();
    return u.direccion?.toLowerCase().includes(q) || u.tipo?.toLowerCase().includes(q);
  });

  const { visibles, pagina, setPagina, total, porPagina } = usePaginacion(filtradas, 10);

  const puntos: PuntoMapa[] = useMemo(
    () => filtradas.map((u) => ({
      id: u.id!, lat: u.latitud, lng: u.longitud, tipo: u.tipo || 'OTRO',
      titulo: u.direccion || `Ubicación #${u.id}`,
      subtitulo: tipoLabel[u.tipo || 'OTRO'],
      sospechoso: u.nodoSospechoso,
      campos: [
        { etiqueta: 'ID', valor: `LOC-${String(u.id).padStart(4, '0')}` },
        { etiqueta: 'Tipo', valor: tipoLabel[u.tipo || 'OTRO'] },
        { etiqueta: 'Estado', valor: u.nodoSospechoso ? 'SOSPECHOSO' : 'NORMAL' },
      ],
    })), [filtradas]);

  const sospechosas = lista.filter(u => u.nodoSospechoso).length;

  // Marker para el picker
  const pickIcon = divIcon({
    className: 'custom-marker',
    iconSize: [32, 42],
    iconAnchor: [16, 32],
    html: `<div class="marker-pin sospechoso"><span class="material-symbols-outlined">push_pin</span></div>`,
  });

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Inteligencia Geoespacial</h1>
          <p className="page-subtitle">Registro y gestión de ubicaciones de interés criminal.</p>
        </div>
        <div className="page-badges">
          <span className="badge-pill">UBICACIONES: {lista.length}</span>
          {sospechosas > 0 && <span className="badge-pill alerta">SOSPECHOSAS: {sospechosas}</span>}
        </div>
      </div>

      <div className="toolbar">
        <button className="btn-secondary" onClick={() => setPickerAbierto(true)}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add_location_alt</span>
          Marcar punto en el mapa
        </button>
        <button className="btn-ghost" onClick={exportar}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
          Exportar CSV
        </button>
      </div>

      <div className="bento-grid">
        <div className="bento-col-5">
          <div className="form-card">
            <div className="card-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 20 }}>
              <span className="material-symbols-outlined">add_location_alt</span>
              <h3 className="card-title">Registrar ubicación</h3>
            </div>
            <form onSubmit={submit}>
              <div className="form-group full" style={{ marginBottom: 14 }}>
                <label className="form-label">Dirección</label>
                <input value={form.direccion || ''}
                  onChange={(e) => setForm({ ...form, direccion: e.target.value })}
                  placeholder="Calle, número, ciudad..." />
              </div>

              <div className="form-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginBottom: 8 }}>
                <div className="form-group">
                  <label className="form-label">Latitud</label>
                  <input type="number" step="0.00001" value={form.latitud}
                    onChange={(e) => setForm({ ...form, latitud: Number(e.target.value) })}
                    placeholder="0.000000" required style={{ fontFamily: 'var(--font-mono)' }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Longitud</label>
                  <input type="number" step="0.00001" value={form.longitud}
                    onChange={(e) => setForm({ ...form, longitud: Number(e.target.value) })}
                    placeholder="0.000000" required style={{ fontFamily: 'var(--font-mono)' }} />
                </div>
              </div>

              <button type="button" className="btn-ghost"
                onClick={() => setPickerAbierto(true)}
                style={{ width: '100%', marginBottom: 14, fontSize: 11 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>location_on</span>
                Seleccionar coordenadas en el mapa
              </button>

              {err && <div className="error">{err}</div>}
              {ok && <div className="success">{ok}</div>}

              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>save</span>
                Crear ubicación
              </button>
            </form>
          </div>
        </div>

        <div className="bento-col-7">
          <MapaTactical puntos={puntos} altura="100%"
            hudLabel="Sistema GIS activo"
            hudValor={`${puntos.length} ubicaciones`}
            emptyMessage="Sin ubicaciones georreferenciadas" />
        </div>
      </div>

      {/* Tabla */}
      <div className="table-wrap">
        <div className="table-header">
          <div className="table-header-title">
            <span className="material-symbols-outlined">list_alt</span>
            <h3>Historial de Ubicaciones</h3>
          </div>
          <div className="table-header-actions">
            <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}
              style={{ width: 160, fontSize: 11, padding: '6px 24px 6px 10px' }}>
              <option value="">Todos los tipos</option>
              {TIPOS.map((t) => <option key={t} value={t}>{tipoLabel[t]}</option>)}
            </select>
            <div className="filter-input-wrap">
              <span className="material-symbols-outlined">filter_list</span>
              <input type="text" placeholder="Filtrar..."
                value={filtro} onChange={(e) => setFiltro(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Dirección</th><th>Lat / Lng</th>
                <th>Tipo</th><th>Estado</th><th className="right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((u) => (
                <tr key={u.id} style={u.nodoSospechoso ? { borderLeft: '3px solid var(--red-500)' } : undefined}>
                  <td className="mono">LOC-{String(u.id).padStart(4, '0')}</td>
                  <td>
                    <div className="row-avatar">
                      <div className={`avatar-sm ubicacion ${u.nodoSospechoso ? 'sospechoso' : ''}`}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                          {tipoIcono[u.tipo || 'OTRO']}
                        </span>
                      </div>
                      <div>
                        <div className="row-name">{u.direccion || 'Sin dirección'}</div>
                        <div className="row-sub">{tipoLabel[u.tipo || 'OTRO']}</div>
                      </div>
                    </div>
                  </td>
                  <td className="mono" style={{ fontSize: 11, color: 'var(--slate-400)' }}>
                    {u.latitud.toFixed(4)} / {u.longitud.toFixed(4)}
                  </td>
                  <td><span className="badge muted">{tipoLabel[u.tipo || 'OTRO']}</span></td>
                  <td>
                    {u.nodoSospechoso ? (
                      <span className="badge sospechoso">
                        <span className="material-symbols-outlined" style={{ fontSize: 12 }}>warning</span>
                        {' '}Sospechoso
                      </span>
                    ) : <span className="badge normal">Normal</span>}
                  </td>
                  <td className="right">
                    <div className="table-actions">
                      <button className="btn-icon" onClick={() => setDetalle(u)} title="Ver detalle">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>visibility</span>
                      </button>
                      <button className="btn-icon danger" onClick={() => setAEliminar(u)} title="Eliminar">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {visibles.length === 0 && (
                <tr><td colSpan={6} className="table-empty">
                  {filtro || filtroTipo ? 'Sin resultados' : 'Sin ubicaciones registradas'}
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Paginacion total={total} pagina={pagina} porPagina={porPagina}
          onCambiar={setPagina} label="ubicaciones" />
      </div>

      {/* Modal Picker de mapa */}
      <Modal
        abierto={pickerAbierto}
        onClose={() => { setPickerAbierto(false); setPickerCoords(null); }}
        titulo="Marcar punto en el mapa"
        icono="add_location_alt"
        ancho={760}
      >
        <p style={{ color: 'var(--slate-400)', fontSize: 12, marginBottom: 12 }}>
          Hacé click en cualquier punto del mapa para seleccionar las coordenadas.
        </p>
        {pickerAbierto && (
          <div style={{ height: 400, border: '1px solid var(--slate-800)', position: 'relative' }}>
            <MapContainer
              key={`picker-${pickerAbierto}`}
              center={[25.7617, -80.1918]}
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
          <div
            style={{
              marginTop: 12, padding: 10, background: 'var(--slate-950)',
              border: '1px solid var(--red-500)', fontFamily: 'var(--font-mono)', fontSize: 12,
            }}
          >
            <strong style={{ color: 'var(--red-500)' }}>Coordenadas seleccionadas: </strong>
            <span style={{ color: 'white' }}>
              {pickerCoords[0].toFixed(6)}, {pickerCoords[1].toFixed(6)}
            </span>
          </div>
        )}
        <div
          style={{
            display: 'flex', gap: 8, justifyContent: 'flex-end',
            marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--slate-800)',
          }}
        >
          <button
            className="btn-ghost"
            onClick={() => { setPickerAbierto(false); setPickerCoords(null); }}
          >
            Cancelar
          </button>
          <button className="btn-primary" onClick={confirmarPicker} disabled={!pickerCoords}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check</span>
            Usar estas coordenadas
          </button>
        </div>
      </Modal>

      {/* Modal Detalle */}
      {detalle && (
        <ModalDetalle abierto={!!detalle} onClose={() => setDetalle(null)}
          titulo={detalle.direccion || `Ubicación #${detalle.id}`}
          subtitulo={tipoLabel[detalle.tipo || 'OTRO']}
          icono={tipoIcono[detalle.tipo || 'OTRO']}
          campos={[
            { etiqueta: 'ID', valor: `LOC-${String(detalle.id).padStart(4, '0')}`, mono: true },
            { etiqueta: 'Dirección', valor: detalle.direccion || '—' },
            { etiqueta: 'Latitud', valor: detalle.latitud.toFixed(6), mono: true },
            { etiqueta: 'Longitud', valor: detalle.longitud.toFixed(6), mono: true },
            { etiqueta: 'Tipo', valor: tipoLabel[detalle.tipo || 'OTRO'] },
            {
              etiqueta: 'Estado',
              valor: detalle.nodoSospechoso ? 'Sospechoso' : 'Normal',
              destacado: detalle.nodoSospechoso,
            },
          ]}
        />
      )}

      <ModalConfirmar abierto={!!aEliminar} titulo="¿Eliminar ubicación?"
        mensaje={aEliminar ? `Vas a eliminar "${aEliminar.direccion || `Ubi #${aEliminar.id}`}".` : ''}
        onConfirmar={confirmarEliminar} onCancelar={() => setAEliminar(null)}
        textoConfirmar="Eliminar" peligro />
    </>
  );
}