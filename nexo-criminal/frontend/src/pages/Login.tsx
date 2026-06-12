import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useAuth } from '../services/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('admin2');
  const [password, setPassword] = useState('admin123');
  const [err, setErr] = useState('');
  const [cargando, setCargando] = useState(false);
  const { login } = useAuth();
  const nav = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    setCargando(true);
    try {
      const sesion = await authService.login(username, password);
      login(sesion);
      nav('/');
    } catch {
      setErr('Credenciales inválidas. Verificá usuario y contraseña.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={onSubmit}>
        <div className="login-header">
          <div className="login-logo">
            <span className="material-symbols-outlined">security</span>
          </div>
          <div>
            <div className="login-title">Nexo Criminal</div>
            <div className="login-subtitle">Precision Intelligence</div>
          </div>
        </div>

        <p className="login-desc">
          Acceso restringido. Autenticación requerida para ingresar al sistema
          de inteligencia de vínculos.
        </p>

        <div className="form-group" style={{ marginBottom: 14 }}>
          <label className="form-label">Agent ID</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            placeholder="admin2"
          />
        </div>

        <div className="form-group" style={{ marginBottom: 14 }}>
          <label className="form-label">Access Key</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {err && <div className="error">{err}</div>}

        <button
          type="submit"
          className="btn-primary"
          style={{ width: '100%', marginTop: 10 }}
          disabled={cargando}
        >
          {cargando ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
            arrow_forward
          </span>
        </button>

        <div className="login-hint">
          DEMO ACCESS: <strong>admin2</strong> / <strong>admin123</strong>
        </div>
      </form>
    </div>
  );
}