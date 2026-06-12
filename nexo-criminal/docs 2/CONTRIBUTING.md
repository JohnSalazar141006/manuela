# Guía de Contribución
## Nexo Criminal — Equipo Amarillo

Bienvenido a la guía de contribución del proyecto **Nexo Criminal**. Este documento describe cómo trabajar con el código, los estándares que seguimos, y el flujo de trabajo Git que utilizamos para mantener un proyecto ordenado y profesional.

---

## Tabla de Contenido

1. [Antes de empezar](#1-antes-de-empezar)
2. [Flujo de trabajo Git](#2-flujo-de-trabajo-git)
3. [Convención de commits](#3-convención-de-commits)
4. [Estructura de branches](#4-estructura-de-branches)
5. [Pull Requests](#5-pull-requests)
6. [Estándares de código](#6-estándares-de-código)
7. [Estructura de tareas en Jira](#7-estructura-de-tareas-en-jira)
8. [Code Review](#8-code-review)
9. [Reportar bugs](#9-reportar-bugs)
10. [Comunicación del equipo](#10-comunicación-del-equipo)

---

## 1. Antes de empezar

### Requisitos previos

Antes de contribuir, asegurate de tener instalado:

- **Git 2.40+**
- **JDK 17** (Eclipse Temurin recomendado)
- **Maven 3.9+**
- **Node.js 18+** y **npm 9+**
- **PostgreSQL 14+** con extensión **PostGIS**
- **Visual Studio Code** o **IntelliJ IDEA**

### Setup inicial

```bash
# 1. Clonar el repositorio
git clone https://github.com/Sistemas22021/AICSIUDONE.git
cd AICSIUDONE

# 2. Posicionarse en el branch amarillo (nuestro equipo)
git checkout amarillo

# 3. Configurar tu identidad de Git
git config user.name "Tu Nombre"
git config user.email "tu.email@dominio.com"

# 4. Instalar dependencias del backend
cd backend
./mvnw install -DskipTests

# 5. Instalar dependencias del frontend
cd ../frontend
npm install
```

### Configuración del editor

Recomendamos **Visual Studio Code** con las siguientes extensiones:

- **Extension Pack for Java** (Microsoft)
- **Spring Boot Extension Pack** (VMware)
- **ES7+ React/Redux/React-Native snippets**
- **Prettier — Code formatter**
- **ESLint**
- **Mermaid Markdown Syntax Highlighting**
- **GitLens — Git supercharged**

---

## 2. Flujo de trabajo Git

Usamos un flujo basado en **Git Flow simplificado** adaptado al contexto académico:

```
main (rama estable)
  │
  └── amarillo (rama del equipo amarillo)
       │
       ├── feature/sprint-X-nombre-feature
       ├── fix/sprint-X-nombre-bug
       ├── docs/sprint-X-nombre-doc
       └── refactor/sprint-X-nombre-refactor
```

### Reglas fundamentales

1. **Nunca trabajar directo en `main`**. Esa rama es propiedad del profesor.
2. **Nunca pushear directo a `amarillo`** sin pasar por una Pull Request revisada.
3. **Siempre crear una rama nueva** desde `amarillo` para cada tarea.
4. **Una rama = una tarea**. No mezclar features distintos en la misma rama.
5. **Mantener las ramas cortas**. Idealmente menos de 3 días de vida.

### Crear una nueva rama

```bash
# Asegurarse de estar actualizado en amarillo
git checkout amarillo
git pull origin amarillo

# Crear nueva rama (usar prefijo según el tipo)
git checkout -b feature/sprint-3-crud-vehiculos
# o
git checkout -b fix/sprint-4-error-grafo-vacio
```

---

## 3. Convención de commits

Seguimos **Conventional Commits** porque ayuda a mantener un historial limpio y permite generar changelogs automáticos.

### Formato

```
<tipo>(<scope opcional>): <descripción corta>

[cuerpo opcional con más detalle]

[footer opcional con referencias a tareas]
```

### Tipos permitidos

| Tipo | Cuándo usarlo |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Cambios en documentación |
| `style` | Formato (espacios, comas, sin afectar lógica) |
| `refactor` | Reorganización de código sin cambiar comportamiento |
| `test` | Agregar o corregir tests |
| `chore` | Tareas de mantenimiento (configuración, dependencias) |
| `perf` | Mejora de performance |
| `ci` | Cambios en CI/CD |

### Ejemplos válidos

```bash
# Nueva funcionalidad
git commit -m "feat(personas): agregar CRUD de personas con búsqueda por documento"

# Bug fix
git commit -m "fix(motor): corregir cálculo de Haversine en ReglaNodoLogistico"

# Documentación
git commit -m "docs(readme): actualizar instrucciones de instalación"

# Refactor
git commit -m "refactor(ia): extraer ClaudeClient a paquete dedicado"

# Con cuerpo
git commit -m "feat(desaparecidas): implementar subida de fotos

- Agregar FileStorageService
- Validar tipo de imagen y tamaño máximo 5MB
- Persistir en /uploads/desaparecidas/

Closes NEXO-42"
```

### Ejemplos a evitar

```bash
# ❌ Demasiado vago
git commit -m "cambios"
git commit -m "arreglos"
git commit -m "wip"

# ❌ Sin tipo
git commit -m "agregar formulario de personas"

# ❌ En mayúsculas o con punto final
git commit -m "Feat: Agregar formulario."

# ❌ Mezclando idiomas
git commit -m "feat: add nuevo módulo"
```

### Reglas adicionales

- ✅ **En español** (consistencia con el resto del proyecto).
- ✅ **Modo imperativo**: "agregar", no "agregado" ni "agrega".
- ✅ **Primera línea menor a 72 caracteres**.
- ✅ **Sin punto final**.
- ✅ **Referenciar tarea de Jira** cuando aplique (ej: `Closes NEXO-42`).

---

## 4. Estructura de branches

### Convención de nombres

```
<tipo>/sprint-<número>-<descripción-corta-en-kebab-case>
```

### Ejemplos

```bash
feature/sprint-1-setup-inicial-backend
feature/sprint-2-modelo-datos-personas
feature/sprint-3-crud-vehiculos
fix/sprint-4-correccion-jwt-expiration
docs/sprint-7-actualizar-readme
refactor/sprint-5-reestructurar-engine
test/sprint-6-pruebas-motor-red-thread
```

### Reglas

- ✅ Todo en **minúsculas**.
- ✅ **Kebab-case** (palabras separadas por guiones).
- ✅ Sin caracteres especiales (`ñ` se escribe como `n`).
- ✅ Máximo **50 caracteres** en total.
- ✅ Siempre incluir el número de sprint para trazabilidad.

---

## 5. Pull Requests

### Cuándo abrir una PR

Cuando tu rama esté lista para integrarse a `amarillo`:

1. La feature está completa según el alcance de la tarea de Jira.
2. El código compila sin errores.
3. Probaste manualmente que funciona.
4. Documentaste lo que hiciste.

### Cómo crear una PR

```bash
# 1. Push de la rama
git push origin feature/sprint-3-crud-vehiculos

# 2. GitHub te muestra un link directo, o andá a:
# https://github.com/Sistemas22021/AICSIUDONE/pulls
# y click en "New pull request"

# 3. Base: amarillo  ←  Compare: feature/sprint-3-crud-vehiculos
```

### Plantilla de PR

Usá esta plantilla en la descripción:

```markdown
## ¿Qué hace este PR?

Descripción clara y concisa de qué cambia.

## Tipo de cambio

- [ ] 🆕 Nueva funcionalidad (feat)
- [ ] 🐛 Corrección de bug (fix)
- [ ] 📝 Documentación (docs)
- [ ] ♻️ Refactor (refactor)
- [ ] 🎨 Estilos (style)
- [ ] ✅ Tests (test)

## Tarea de Jira

NEXO-XX

## Sprint

Sprint X

## ¿Cómo probarlo?

1. Pull de la rama `feature/sprint-X-nombre`
2. Levantar backend con `./mvnw spring-boot:run`
3. Levantar frontend con `npm run dev`
4. Login con admin2/admin123
5. Ir a /modulo-afectado
6. Probar [acción específica]

## Capturas

(adjuntar capturas o GIFs si aplica)

## Checklist

- [ ] El código compila sin errores
- [ ] Probé manualmente la funcionalidad
- [ ] No rompí funcionalidades existentes
- [ ] Documenté cambios relevantes en el código
- [ ] Actualicé documentación general si fue necesario
- [ ] Mis commits siguen Conventional Commits
- [ ] No hay archivos sensibles (API keys, .env) en el commit
```

### Aprobación

- **Mínimo 1 reviewer** debe aprobar antes de mergear.
- El **Tech Lead (Manuel)** revisa todos los PRs antes del merge a `amarillo`.
- Si hay comentarios pendientes, **resolverlos antes de mergear**.

### Merge

- Usar **"Squash and merge"** para mantener el historial limpio.
- El mensaje del squash debe seguir Conventional Commits.

---

## 6. Estándares de código

### Backend (Java)

#### Estilo

- **Indentación**: 4 espacios (sin tabs).
- **Encoding**: UTF-8.
- **Line endings**: LF (Unix).
- **Longitud máxima de línea**: 120 caracteres.

#### Nomenclatura

| Elemento | Convención | Ejemplo |
|---|---|---|
| Clases | PascalCase | `PersonaService` |
| Interfaces | PascalCase | `ReglaVinculo` |
| Métodos | camelCase | `obtenerPorDocumento()` |
| Variables | camelCase | `personaActual` |
| Constantes | UPPER_SNAKE_CASE | `MAX_INTENTOS` |
| Paquetes | lowercase | `com.nexocriminal.domain.persona` |

#### Estructura de archivos

```java
package com.nexocriminal.domain.persona;

// Imports estándar de Java primero
import java.util.List;
import java.util.Optional;

// Imports de Spring después
import org.springframework.stereotype.Service;

// Imports del proyecto al final
import com.nexocriminal.domain.persona.Persona;

// Clase con un solo "concern"
@Service
@RequiredArgsConstructor
public class PersonaService {
    // Constantes primero
    private static final int MAX_RESULTADOS = 100;

    // Dependencias después
    private final PersonaRepository repository;

    // Métodos públicos
    public List<Persona> listar() { ... }

    // Métodos privados al final
    private void validar(Persona p) { ... }
}
```

#### Buenas prácticas

- ✅ Usar **Lombok** (`@Data`, `@RequiredArgsConstructor`, `@Builder`) para reducir boilerplate.
- ✅ Anotar entidades JPA con `@JsonIgnoreProperties` para evitar loops de serialización.
- ✅ Servicios anotados con `@Transactional` cuando modifiquen datos.
- ✅ Usar `Optional<T>` en lugar de retornar `null`.
- ✅ Validar inputs con `@Valid` y anotaciones de `jakarta.validation`.
- ❌ Evitar `System.out.println()`. Usar **SLF4J** (`log.info`, `log.error`).
- ❌ No mezclar lógica de negocio en controllers (delegar a services).

### Frontend (React + TypeScript)

#### Estilo

- **Indentación**: 2 espacios.
- **Comillas**: simples (`'`) para strings, dobles (`"`) para JSX.
- **Punto y coma**: obligatorio al final de cada statement.

#### Nomenclatura

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes | PascalCase | `ModalDesaparecida.tsx` |
| Hooks personalizados | camelCase con `use` | `usePaginacion.ts` |
| Servicios | camelCase | `personaService.ts` |
| Tipos / Interfaces | PascalCase | `interface PersonaDesaparecida` |
| Variables | camelCase | `listaPersonas` |
| Constantes globales | UPPER_SNAKE_CASE | `MAX_PAGE_SIZE` |

#### Estructura de archivos

```tsx
// 1. Imports de React
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Imports de librerías externas
import axios from 'axios';

// 3. Imports del proyecto
import { personaService } from '../services/api';
import type { Persona } from '../types';
import Modal from './Modal';

// 4. Tipos / Interfaces
interface Props {
  id: number;
  onClose: () => void;
}

// 5. Componente
export default function MiComponente({ id, onClose }: Props) {
  const [data, setData] = useState<Persona | null>(null);

  useEffect(() => {
    // ...
  }, [id]);

  return (
    <Modal>
      {/* JSX */}
    </Modal>
  );
}
```

#### Buenas prácticas

- ✅ **Tipar todo**: nunca usar `any` salvo casos extremos.
- ✅ Usar `interface` para props de componentes.
- ✅ Componentes funcionales con hooks (no clases).
- ✅ Extraer lógica reusable a **custom hooks**.
- ✅ Manejar estados de carga y error en cada llamada async.
- ✅ Usar variables CSS (`var(--red-500)`) en lugar de colores hardcodeados.
- ❌ Evitar `console.log` en producción (dejar solo en debug).
- ❌ No mutar estado directamente. Usar siempre setters o `useReducer`.
- ❌ Evitar componentes mayores a 300 líneas. Si crece, extraer subcomponentes.

### Bases de datos

#### Nomenclatura

| Elemento | Convención | Ejemplo |
|---|---|---|
| Tablas | snake_case singular | `persona`, `vehiculo`, `persona_desaparecida` |
| Columnas | snake_case | `nombre_completo`, `fecha_creacion` |
| Foreign keys | `<tabla>_id` | `persona_id`, `ubicacion_id` |
| Índices | `idx_<tabla>_<columna>` | `idx_persona_documento` |

#### Reglas

- ✅ Todas las tablas deben tener **`id` BIGSERIAL** como PK.
- ✅ Toda tabla debe tener **`creado_en`** TIMESTAMP.
- ✅ Las relaciones N:M usan tablas intermedias con nombre descriptivo.
- ❌ No usar reserved words de SQL como nombres (ej: `user`, `order`).

---

## 7. Estructura de tareas en Jira

Usamos Jira para gestionar el trabajo. Cada tarea sigue esta estructura:

### Tipos de issue

| Tipo | Cuándo usarlo |
|---|---|
| **Epic** | Conjunto grande de funcionalidades (ej: "Módulo de Personas Desaparecidas") |
| **Story** | Funcionalidad de cara al usuario (ej: "Como analista, quiero subir foto de un desaparecido") |
| **Task** | Tarea técnica sin valor directo al usuario (ej: "Configurar PostGIS en BD") |
| **Bug** | Error a corregir |

### Plantilla de Story

```
**Título**: Como [actor], quiero [acción] para [beneficio].

**Descripción**:
Contexto del por qué de esta historia.

**Criterios de aceptación**:
- [ ] El usuario puede X
- [ ] Si pasa Y, el sistema responde Z
- [ ] El campo W es obligatorio

**Notas técnicas**:
Detalles de implementación, dependencias, etc.

**Story Points**: 3
**Sprint**: Sprint 4
**Asignado a**: @nombre
```

### Story Points

Usamos la **escala de Fibonacci** (1, 2, 3, 5, 8, 13):

| Puntos | Estimación |
|---|---|
| 1 | Trivial (cambiar un texto, ajuste mínimo) |
| 2 | Pequeño (un endpoint simple, formulario básico) |
| 3 | Medio (CRUD completo de una entidad) |
| 5 | Grande (módulo con UI + backend + tests) |
| 8 | Muy grande (debe partirse en stories más pequeñas) |
| 13 | ⚠️ Demasiado grande, dividir obligatoriamente |

### Estados (workflow)

```
TO DO  →  IN PROGRESS  →  IN REVIEW  →  DONE
                              ↓
                         REJECTED (vuelve a IN PROGRESS)
```

---

## 8. Code Review

### ¿Qué busca el reviewer?

| Aspecto | Pregunta clave |
|---|---|
| **Funcionalidad** | ¿Hace lo que dice el ticket? |
| **Legibilidad** | ¿Cualquiera del equipo puede entender este código? |
| **Estructura** | ¿Sigue los patrones del proyecto? |
| **Performance** | ¿Hay queries N+1, loops innecesarios, memory leaks? |
| **Seguridad** | ¿Hay inyecciones SQL, XSS, exposición de datos? |
| **Tests** | ¿Hay manera de probar manualmente o automáticamente? |
| **Documentación** | ¿Quedó documentado lo que cambia? |

### Checklist del reviewer

- [ ] El PR tiene descripción clara y referencia a Jira.
- [ ] Los commits siguen Conventional Commits.
- [ ] No hay archivos sensibles (API keys, credenciales).
- [ ] No hay código comentado sin explicación.
- [ ] No hay `console.log` ni `System.out.println()` sobrantes.
- [ ] El código compila sin warnings nuevos.
- [ ] La funcionalidad fue probada manualmente.
- [ ] La documentación está actualizada.

### Cómo dar feedback

✅ **Constructivo y específico**:
> "En `PersonaService.crear()` línea 45, podríamos validar que el documento no esté duplicado antes de guardar. Te dejo este ejemplo: ..."

❌ **Destructivo o vago**:
> "Esto está mal."
> "No me gusta."

### Tiempos esperados

| Acción | Tiempo máximo |
|---|---|
| Asignar reviewer | Inmediato al abrir PR |
| Primera revisión | 24 horas |
| Aprobación final | 48 horas |
| Merge tras aprobación | Inmediato |

---

## 9. Reportar bugs

Para reportar un bug, abrir un issue tipo **Bug** en Jira con esta plantilla:

```markdown
**Título**: [BUG] Descripción corta del problema

**Descripción**:
¿Qué pasa? ¿Qué esperabas que pasara?

**Pasos para reproducir**:
1. Login con usuario admin2
2. Ir a /personas
3. Click en "Crear persona"
4. Dejar el campo X vacío
5. Click en "Guardar"

**Comportamiento esperado**:
El sistema debería mostrar un mensaje de error indicando el campo faltante.

**Comportamiento actual**:
La aplicación se queda colgada y muestra un error 500 en consola.

**Capturas / Logs**:
(adjuntar imagen y log del backend)

**Entorno**:
- OS: Windows 11
- Navegador: Chrome 130
- Backend version: 0.1.0-MVP
- Sprint: Sprint 5

**Severidad**:
- [ ] Crítica (bloquea uso del sistema)
- [x] Alta (impide funcionalidad importante)
- [ ] Media (workaround disponible)
- [ ] Baja (cosmético)
```

---

## 10. Comunicación del equipo

### Canales

| Canal | Uso |
|---|---|
| **WhatsApp grupo "Equipo Amarillo"** | Coordinación diaria, dudas rápidas |
| **GitHub Issues** | Bugs y mejoras técnicas formales |
| **Jira** | Gestión de sprints y tareas |
| **Reuniones presenciales** | Daily, planning, retrospectiva |
| **Discord (opcional)** | Pair programming y revisiones largas |

### Ceremonias Scrum

Como equipo seguimos un **Scrum adaptado** al contexto académico:

| Ceremonia | Frecuencia | Duración | Objetivo |
|---|---|---|---|
| **Sprint Planning** | Inicio de cada sprint | 1 hora | Definir qué hacer en el sprint |
| **Daily Standup** | Diaria (lunes a viernes) | 15 min | Sincronizar avances |
| **Sprint Review** | Final de cada sprint | 30 min | Demo de lo logrado |
| **Sprint Retrospective** | Después del Review | 30 min | Qué mejoramos para el siguiente sprint |

### Daily Standup

Cada miembro responde 3 preguntas:

1. ¿Qué hice ayer?
2. ¿Qué voy a hacer hoy?
3. ¿Tengo algún bloqueo?

### Roles

| Rol | Responsable |
|---|---|
| **Tech Lead / Scrum Master** | Manuel Rodríguez |
| **Product Owner** | Asignación rotativa |
| **Desarrolladores Full Stack Junior** | Todos |

### Acuerdos del equipo

1. **Respeto y cordialidad** en todas las interacciones.
2. **Avisar bloqueos lo antes posible**, no esperar al daily.
3. **No mergear PRs propias sin revisión**.
4. **Mantener `amarillo` siempre estable** (sin código roto).
5. **Documentar lo que se hace**, no solo el código.
6. **Priorizar el aprendizaje sobre la perfección**: este es un proyecto académico, todos venimos a aprender.

---

## 📚 Recursos útiles

- [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/)
- [Spring Boot Docs](https://docs.spring.io/spring-boot/docs/3.2.x/reference/html/)
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [PostgreSQL Docs](https://www.postgresql.org/docs/14/)
- [Mermaid Live Editor](https://mermaid.live)

---

## ❓ ¿Dudas?

Si tenés alguna duda sobre el proceso o el proyecto:

1. **Preguntá en el grupo del equipo** (WhatsApp).
2. **Etiquetá al Tech Lead (Manuel)** en GitHub.
3. **Consultá la documentación** en `/docs`.
4. **Si el bloqueo persiste, escalá al profesor**.

---

<div align="center">

### 🔴 Equipo Amarillo

Universidad de Oriente — Núcleo Nueva Esparta — 2026

*"El código que escribís hoy lo va a leer alguien más mañana — incluso si ese alguien sos vos en 3 meses."*

</div>