import { useState, useEffect } from 'react';
import { desaparecidaService } from '../services/api';
import { fileUrl } from '../services/files';
import type { FotoDesaparecida } from '../types';
import { useConfirm } from '../services/ConfirmContext';
import { useToast } from '../services/ToastContext';

interface Props {
  personaId: number;
  editable?: boolean;
}

export default function GaleriaFotos({ personaId, editable = true }: Props) {
  const [fotos, setFotos] = useState<FotoDesaparecida[]>([]);
  const [cargando, setCargando] = useState(false);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState('');
  const confirmar = useConfirm();
  const toast = useToast();

  const cargarFotos = async () => {
    setCargando(true);
    try {
      const data = await desaparecidaService.listarFotos(personaId);
      setFotos(data);
    } catch (e) {
      setError('No se pudieron cargar las fotos');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (personaId) cargarFotos();
  }, [personaId]);

  const handleSubir = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    if (!archivo.type.startsWith('image/')) {
      setError('Solo se permiten imágenes');
      return;
    }
    if (archivo.size > 5 * 1024 * 1024) {
      setError('La imagen no puede superar 5MB');
      return;
    }

    setSubiendo(true);
    setError('');
    try {
      await desaparecidaService.agregarFoto(personaId, archivo);
      await cargarFotos();
    } catch (e) {
      setError('Error al subir la foto');
    } finally {
      setSubiendo(false);
      e.target.value = '';
    }
  };

  const handleEliminar = async (fotoId: number) => {
    const ok = await confirmar({
      titulo: 'Eliminar foto',
      mensaje: '¿Eliminar esta foto? Esta acción no se puede deshacer.',
      textoConfirmar: 'Eliminar',
      peligro: true,
    });
    if (!ok) return;
    try {
      await desaparecidaService.eliminarFoto(personaId, fotoId);
      await cargarFotos();
      toast.exito('Foto eliminada');
    } catch (e) {
      setError('Error al eliminar la foto');
    }
  };

  const handlePrincipal = async (fotoId: number) => {
    try {
      await desaparecidaService.marcarFotoPrincipal(personaId, fotoId);
      await cargarFotos();
    } catch (e) {
      setError('Error al marcar como principal');
    }
  };

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h4 style={{ margin: 0 }}>Fotos ({fotos.length})</h4>
        {editable && (
          <label style={{
            cursor: 'pointer',
            padding: '6px 12px',
            background: 'var(--purple-600, #8b5cf6)',
            color: 'white',
            borderRadius: 6,
            fontSize: 13,
          }}>
            {subiendo ? 'Subiendo...' : '+ Agregar foto'}
            <input
              type="file"
              accept="image/*"
              onChange={handleSubir}
              disabled={subiendo}
              style={{ display: 'none' }}
            />
          </label>
        )}
      </div>

      {error && <p style={{ color: 'var(--red-500, #ef4444)', fontSize: 13 }}>{error}</p>}
      {cargando && <p style={{ fontSize: 13, opacity: 0.7 }}>Cargando fotos...</p>}

      {!cargando && fotos.length === 0 && (
        <p style={{ fontSize: 13, opacity: 0.6 }}>No hay fotos cargadas.</p>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: 12,
      }}>
        {fotos.map((foto) => (
          <div key={foto.id} style={{
            position: 'relative',
            border: foto.principal ? '2px solid var(--purple-600, #8b5cf6)' : '1px solid #ddd',
            borderRadius: 8,
            overflow: 'hidden',
          }}>
            <img
              src={fileUrl(foto.url)}
              alt="Foto"
              style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }}
            />
            {foto.principal && (
              <span style={{
                position: 'absolute', top: 4, left: 4,
                background: 'var(--purple-600, #8b5cf6)', color: 'white',
                fontSize: 10, padding: '2px 6px', borderRadius: 4,
              }}>
                Principal
              </span>
            )}
            {editable && (
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                display: 'flex', gap: 4, padding: 4,
                background: 'rgba(0,0,0,0.6)',
              }}>
                {!foto.principal && (
                  <button
                    onClick={() => handlePrincipal(foto.id!)}
                    style={{ flex: 1, fontSize: 10, cursor: 'pointer', border: 'none', borderRadius: 4, padding: '3px' }}
                    title="Marcar como principal"
                  >
                    ★
                  </button>
                )}
                <button
                  onClick={() => handleEliminar(foto.id!)}
                  style={{ flex: 1, fontSize: 10, cursor: 'pointer', border: 'none', borderRadius: 4, padding: '3px', background: '#ef4444', color: 'white' }}
                  title="Eliminar"
                >
                  🗑
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}