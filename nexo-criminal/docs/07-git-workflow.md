# 🌿 Git Workflow — Estrategia de Ramas

## Principios acordados en clase (22/04)

- El **informe se entrega a través del repositorio**.
- El **repositorio de documentación es exclusivo para docs**.
- Los informes van en formato `README.md` (Markdown).
- Cada equipo tiene sus propias ramas principales.
- Las ramas se integran a `main` mediante Pull Request.

---

## 🌳 Estructura de ramas

```
main  ───────────────────────────────────────────▶  (producción / entrega final)
  │
  └── develop ─────────────────────────────────▶   (integración continua)
         │
         ├── feature/HU-001-registrar-persona
         ├── feature/HU-004-registrar-suceso
         ├── feature/HU-007-nodo-logistico
         │
         ├── docs/sprint-1-readme
         ├── docs/modelo-datos
         │
         ├── bugfix/vinculo-duplicado
         └── hotfix/login-fallo-produccion
```

### Ramas permanentes
- **`main`** → solo versiones entregables (tags `v0.1`, `v0.2`...). **Protegida**: requiere PR y aprobación.
- **`develop`** → rama de integración. Todas las features se fusionan aquí primero.

### Ramas temporales
- **`feature/HU-XXX-titulo`** → una por historia de usuario.
- **`docs/tema`** → cambios exclusivos de documentación.
- **`bugfix/descripcion`** → corrección de defectos.
- **`hotfix/descripcion`** → correcciones urgentes sobre `main`.

---

## 📝 Convención de commits

Formato:
```
<tipo>(<scope>): <descripción corta>

[Cuerpo opcional]
```

**Tipos válidos:**
- `feat` → nueva funcionalidad
- `fix` → corrección de bug
- `docs` → cambios en documentación
- `refactor` → refactorización sin cambios funcionales
- `test` → agregado de pruebas
- `chore` → tareas de mantenimiento

**Ejemplos:**
```
feat(persona): implementar CRUD de personas (HU-001)
fix(engine): corregir cálculo de radio en nodo logístico
docs(mvp): agregar criterios de éxito del MVP
```

---

## 🔄 Flujo de trabajo de una historia

1. Tomar una historia del tablero Scrum.
2. Crear rama desde `develop`:
   ```bash
   git checkout develop
   git pull
   git checkout -b feature/HU-001-registrar-persona
   ```
3. Desarrollar, commitear con mensajes claros.
4. Push:
   ```bash
   git push origin feature/HU-001-registrar-persona
   ```
5. Abrir **Pull Request** hacia `develop`.
6. Revisión por al menos 1 compañero.
7. Merge cuando haya aprobación.
8. Eliminar la rama feature después del merge.

---

## 📦 Organización del repositorio

**Repositorios propuestos:**

| Repo | Contenido |
|---|---|
| `nexo-criminal-docs` | Documentación en Markdown |
| `nexo-criminal-backend` | Proyecto Spring Boot (Java) |
| `nexo-criminal-frontend` | Proyecto React |
| `nexo-criminal-scripts` | Scripts Python de ETL/simulación |

**Alternativa: monorepo** — un único repo `nexo-criminal/` con subcarpetas (como este proyecto). Más fácil para un equipo pequeño.

---

## 🚫 `.gitignore` mínimo

```
# Java / Spring
target/
*.class
.idea/
*.iml
.mvn/
mvnw
mvnw.cmd

# Node / TypeScript
node_modules/
dist/
build/
.env
.env.local

# Python
__pycache__/
*.pyc
venv/
.venv/
*.egg-info/

# Bases de datos
*.sql.backup
dump.sql

# Sistema
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
```

---

## ✅ Checklist antes de hacer Pull Request

- [ ] La rama está actualizada con `develop`.
- [ ] El código compila sin errores.
- [ ] Los nombres de archivos y variables siguen la convención del equipo.
- [ ] El commit message describe claramente el cambio.
- [ ] Se actualizó la documentación si el cambio lo requiere.
- [ ] No se subieron credenciales ni datos sensibles.

---

## 📎 Plantilla de Pull Request

```markdown
## 🔖 Historia de usuario
HU-XXX — Título

## 📝 Descripción
[Qué cambió y por qué]

## ✅ Criterios de aceptación cumplidos
- [ ] Criterio 1
- [ ] Criterio 2

## 🧪 Cómo probar
1. Paso 1
2. Paso 2

## 📸 Capturas (si aplica)
[Screenshots del cambio visual]
```
