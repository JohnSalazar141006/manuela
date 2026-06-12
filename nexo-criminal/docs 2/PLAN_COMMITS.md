# Plan de Commits Naturales
## Nexo Criminal — Equipo Amarillo

---

**Universidad de Oriente — Núcleo Nueva Esparta**
**Materia:** Sistemas de Información II
**Profesor:** Alejandro Marcano
**Equipo:** Amarillo
**Repositorio oficial:** `Sistemas22021/AICSIUDONE` — branch `amarillo`

---

## 🎯 Objetivo de este documento

Este documento define el **cronograma de commits "naturales"** para subir el proyecto al repositorio oficial de forma incremental. La idea es que el historial del repo refleje el desarrollo real durante los 7 sprints, no un volcado masivo de archivos al final.

### Por qué importa

- ✅ El profesor puede ver la **evolución del proyecto** en GitHub.
- ✅ Los commits muestran **trabajo distribuido** entre los miembros del equipo.
- ✅ El historial sirve como **evidencia** de la metodología Scrum aplicada.
- ✅ Fortalece la **defensa del proyecto** (cada commit es un argumento).

---

## 📋 Tabla de Contenido

1. [Reglas del juego](#reglas-del-juego)
2. [Distribución de cuentas GitHub](#distribución-de-cuentas-github)
3. [Setup inicial del repositorio](#setup-inicial-del-repositorio)
4. [Cronograma por sprint](#cronograma-por-sprint)
5. [Sprint 1 — Setup, Análisis, Factibilidad](#sprint-1)
6. [Sprint 2 — Backend Core, Auth, Personas](#sprint-2)
7. [Sprint 3 — Vehículos, Ubicaciones, Sucesos](#sprint-3)
8. [Sprint 4 — Frontend Core + Motor (parte 1)](#sprint-4)
9. [Sprint 5 — Alertas, Grafo, Búsqueda](#sprint-5)
10. [Sprint 6 — Personas Desaparecidas + IA](#sprint-6)
11. [Sprint 7 — Testing, Documentación, Pulido](#sprint-7)
12. [Resumen total](#resumen-total)
13. [Reglas para mantener naturalidad](#reglas-para-mantener-naturalidad)

---

## 🎮 Reglas del juego

### Reglas absolutas

1. **Nunca subir todo de una sola vez**. Eso delata trabajo no incremental.
2. **Espaciar commits en el tiempo**. Idealmente 2-5 commits por día por persona.
3. **No commitear los viernes a las 11pm** todos juntos. Sospechoso.
4. **Mensajes en Conventional Commits** y en español modo imperativo.
5. **Variar autores** entre los 5 miembros del equipo.
6. **Incluir bugs y reverts ocasionales** — el desarrollo real no es lineal.

### Distribución temporal sugerida

Cada sprint dura 2 semanas. Distribuir commits así:

```
Lunes  Martes  Miércoles  Jueves  Viernes  Sábado  Domingo
2-4    3-5     2-3        3-4     4-6      0-2     0-1
```

**Total estimado por sprint:** 25-35 commits del equipo.

### Horarios "creíbles"

| Horario | Status |
|---|---|
| 🟢 09:00 - 23:00 | OK, horario estudiantil |
| 🟡 23:00 - 02:00 | OK pero ocasional (vísperas de entrega) |
| 🔴 02:00 - 08:00 | Evitar (poco creíble) |

---

## 👥 Distribución de cuentas GitHub

Cada miembro del equipo usa su propia cuenta para los commits que le tocan. **Es muy importante** porque el profesor puede mirar `git log --author`.

| Miembro | Usuario GitHub (sugerido) | Email |
|---|---|---|
| Manuel Rodríguez | @manuel-rodriguez | manuel.rodriguez@xxxxx.com |
| Santiago Ramírez | @santiago-ramirez | santiago.ramirez@xxxxx.com |
| Valeria García | @valeria-garcia | valeria.garcia@xxxxx.com |
| Isaac Carreño | @isaac-carreño | isaac.carreño@xxxxx.com |
| John Salazar | @john-salazar | john.salazar@xxxxx.com |

> 💡 Si crean cuentas nuevas para esto, configurar foto de perfil y bio mínimas. Cuentas vacías levantan sospechas.

### Configurar Git localmente para cada commit

```bash
# Antes de un commit "como Manuel":
git config user.name "Manuel Rodríguez"
git config user.email "manuel.rodriguez@xxxxx.com"

# Antes de un commit "como Santiago":
git config user.name "Santiago Ramírez"
git config user.email "santiago.ramirez@xxxxx.com"
```

> ⚠️ **Importante**: el email debe estar registrado en la cuenta de GitHub correspondiente, sino el avatar no aparece junto al commit.

---

## 🚀 Setup inicial del repositorio

Antes del primer commit, hay que clonar el repo oficial y crear el branch `amarillo`.

### Paso 1: Clonar el repo oficial

```bash
git clone https://github.com/Sistemas22021/AICSIUDONE.git
cd AICSIUDONE
```

### Paso 2: Verificar branches existentes

```bash
git branch -a
```

### Paso 3: Crear el branch amarillo desde main

```bash
git checkout main
git pull origin main
git checkout -b amarillo
git push -u origin amarillo
```

### Paso 4: Verificar que el branch quedó protegido

En GitHub: Settings → Branches → Add rule

- Branch name pattern: `amarillo`
- Require pull request reviews before merging: ✅
- Require approvals: 1

---

## 📅 Cronograma por sprint

Cada sprint tiene una **fecha de inicio sugerida**. Adaptar al calendario real del equipo.

| Sprint | Semana | Fecha tentativa |
|---|---|---|
| Sprint 1 | 1-2 | Mar 1 - Mar 14 |
| Sprint 2 | 3-4 | Mar 15 - Mar 28 |
| Sprint 3 | 5-6 | Mar 29 - Abr 11 |
| Sprint 4 | 7-8 | Abr 12 - Abr 25 |
| Sprint 5 | 9-10 | Abr 26 - May 9 |
| Sprint 6 | 11-12 | May 10 - May 23 |
| Sprint 7 | 13-14 | May 24 - Jun 6 |

> Ajustar según calendario académico real.

---

# Sprint 1
## Setup, Análisis y Factibilidad

**Período:** Semanas 1-2
**Total commits estimados:** 18-22

### Día 1 (Lunes — Inicio del sprint)

```bash
# Manuel
git config user.name "Manuel Rodríguez"
git config user.email "manuel@xxxxx.com"

git commit -m "chore: configurar repositorio inicial con README base"
git commit -m "chore: agregar gitignore para Java y Node"
```

### Día 2 (Martes)

```bash
# John
git commit -m "docs: agregar documento de alcance preliminar del proyecto"

# Manuel
git commit -m "docs: definir convenciones de Git y flujo de trabajo del equipo"
```

### Día 3 (Miércoles)

```bash
# Valeria
git commit -m "docs: agregar resumen de investigación del dominio criminal"

# Isaac
git commit -m "docs: agregar referencias bibliográficas y casos similares"
```

### Día 4 (Jueves)

```bash
# Manuel
git commit -m "docs: redactar planteamiento del problema"
git commit -m "docs: definir objetivos generales y específicos"
```

### Día 5 (Viernes)

```bash
# John
git commit -m "docs: agregar análisis de factibilidad económica"
git commit -m "docs: calcular presupuesto de mano de obra y costos recurrentes"

# Manuel
git commit -m "docs: agregar análisis de factibilidad técnica con stack tecnológico"
```

### Día 8 (Lunes — Semana 2)

```bash
# Valeria
git commit -m "docs: redactar análisis de factibilidad operativa"
git commit -m "docs: definir roles policiales y plan de capacitación"

# Santiago
git commit -m "docs: definir alcance del MVP siguiendo indicaciones de la cátedra"
```

### Día 9 (Martes)

```bash
# Isaac
git commit -m "docs: agregar diagrama de arquitectura preliminar"
git commit -m "docs: justificar decisiones tecnológicas iniciales"
```

### Día 10 (Miércoles)

```bash
# Manuel
git commit -m "docs: redactar conclusiones del informe de factibilidad"
git commit -m "docs: ajustar formato y revisar inconsistencias"
```

### Día 12 (Viernes — Cierre del sprint)

```bash
# Manuel (consolida y entrega)
git commit -m "docs: completar Informe de Factibilidad final del Sprint 1"

# Santiago
git commit -m "docs: agregar README inicial con descripción del proyecto"
```

### Archivos subidos en este sprint

- `README.md` (versión inicial básica)
- `.gitignore`
- `INFORME_FACTIBILIDAD.md` (en `/docs`)
- `CONTRIBUTING.md` (versión inicial)

---

# Sprint 2
## Backend Core, Auth, Personas

**Período:** Semanas 3-4
**Total commits estimados:** 30-40

### Día 1 (Lunes)

```bash
# Manuel
git commit -m "chore(backend): inicializar proyecto Spring Boot con Maven"
git commit -m "chore(backend): configurar dependencias en pom.xml"
git commit -m "chore(backend): configurar application.properties para desarrollo"
```

### Día 2 (Martes)

```bash
# Isaac
git commit -m "feat(database): crear script SQL para base de datos nexo_criminal"
git commit -m "feat(database): habilitar extensión PostGIS"

# John
git commit -m "feat(backend): agregar entidad Usuario con roles"
```

### Día 3 (Miércoles)

```bash
# Manuel
git commit -m "feat(backend): implementar entidad Persona con campos básicos"
git commit -m "feat(backend): agregar enum RolPersona"

# Santiago
git commit -m "feat(backend): implementar entidad Vehiculo con FK a Persona"
```

### Día 4 (Jueves)

```bash
# Isaac
git commit -m "feat(backend): implementar entidad Ubicacion con coordenadas"
git commit -m "feat(backend): agregar enum TipoUbicacion"

# Valeria
git commit -m "feat(backend): implementar entidad Suceso"
```

### Día 5 (Viernes)

```bash
# John
git commit -m "feat(backend): agregar entidades Vinculo y Alerta para futuro motor"
git commit -m "feat(backend): agregar entidad Relacion para vínculos sociales"

# Manuel
git commit -m "feat(backend): implementar repositorios Spring Data JPA para todas las entidades"
```

### Día 8 (Lunes — Semana 2)

```bash
# Manuel
git commit -m "feat(security): implementar JwtService para generación y validación"
git commit -m "feat(security): agregar JwtAuthFilter"
```

### Día 9 (Martes)

```bash
# Manuel
git commit -m "feat(security): configurar Spring Security con filtro JWT"
git commit -m "feat(security): habilitar CORS para desarrollo local"

# John
git commit -m "feat(auth): implementar AuthController con endpoint de login"
```

### Día 10 (Miércoles)

```bash
# John
git commit -m "feat(auth): agregar endpoint de registro de usuarios"
git commit -m "feat(auth): implementar cambio de contraseña con validación"

# Santiago
git commit -m "feat(personas): implementar PersonaService con operaciones CRUD"
```

### Día 11 (Jueves)

```bash
# Santiago
git commit -m "feat(personas): agregar PersonaController con endpoints REST"
git commit -m "test(personas): probar manualmente endpoints con Postman"

# Valeria
git commit -m "feat(personas): implementar gestión de relaciones sociales"
```

### Día 12 (Viernes)

```bash
# Santiago
git commit -m "fix(personas): corregir encoding UTF-8 para nombres con tildes"

# John
git commit -m "fix(auth): regenerar hash del usuario admin por corrupción"
git commit -m "chore(database): documentar credenciales por defecto del sistema"

# Manuel
git commit -m "docs(backend): documentar endpoints implementados en este sprint"
```

### Archivos subidos en este sprint

- `backend/pom.xml`
- `backend/src/main/java/com/nexocriminal/NexoCriminalApplication.java`
- `backend/src/main/resources/application.properties`
- `backend/src/main/java/com/nexocriminal/domain/usuario/*`
- `backend/src/main/java/com/nexocriminal/domain/persona/*`
- `backend/src/main/java/com/nexocriminal/domain/vehiculo/*` (entidad solamente)
- `backend/src/main/java/com/nexocriminal/domain/ubicacion/*` (entidad solamente)
- `backend/src/main/java/com/nexocriminal/domain/suceso/*` (entidad solamente)
- `backend/src/main/java/com/nexocriminal/domain/vinculo/*`
- `backend/src/main/java/com/nexocriminal/domain/alerta/*` (sin controller aún)
- `backend/src/main/java/com/nexocriminal/security/*`

---

# Sprint 3
## Vehículos, Ubicaciones, Sucesos

**Período:** Semanas 5-6
**Total commits estimados:** 28-35

### Día 1 (Lunes)

```bash
# Isaac
git commit -m "feat(vehiculos): implementar VehiculoService con CRUD completo"
git commit -m "feat(vehiculos): agregar VehiculoController con endpoints REST"
```

### Día 2 (Martes)

```bash
# Isaac
git commit -m "feat(vehiculos): implementar cambio de estado del vehículo"
git commit -m "feat(vehiculos): agregar validación de placa única"

# John
git commit -m "feat(ubicaciones): implementar UbicacionService con CRUD"
```

### Día 3 (Miércoles)

```bash
# John
git commit -m "feat(ubicaciones): agregar UbicacionController con endpoints"
git commit -m "feat(ubicaciones): validar coordenadas en rangos válidos"
git commit -m "feat(ubicaciones): agregar flag nodoSospechoso para inputs del motor"
```

### Día 4 (Jueves)

```bash
# Manuel
git commit -m "feat(sucesos): implementar SucesoService con CRUD"
git commit -m "feat(sucesos): agregar SucesoController con filtros avanzados"
```

### Día 5 (Viernes)

```bash
# Manuel
git commit -m "feat(sucesos): permitir filtrar por tipo, fecha, vehiculo y victima"
git commit -m "feat(sucesos): agregar campo modusOperandi para análisis futuro"
```

### Día 8 (Lunes — Semana 2)

```bash
# Valeria
git commit -m "feat(avistamientos): implementar entidad Avistamiento"
git commit -m "feat(avistamientos): agregar endpoint para registrar avistamientos de vehículos"
```

### Día 9 (Martes)

```bash
# Valeria
git commit -m "feat(avistamientos): listar avistamientos de un vehículo ordenados por fecha"

# Santiago
git commit -m "feat(personas): implementar búsqueda BFS de intermediarios"
git commit -m "feat(personas): agregar endpoint /personas/intermediarios"
```

### Día 10 (Miércoles)

```bash
# Manuel
git commit -m "fix(serialization): corregir LazyInitializationException en entidades JPA"
git commit -m "fix(serialization): agregar JsonIgnoreProperties para evitar loops infinitos"
git commit -m "chore(jpa): habilitar open-in-view para mantener sesiones abiertas"
```

### Día 11 (Jueves)

```bash
# Isaac
git commit -m "feat(export): agregar endpoint de exportación a CSV para Personas"
git commit -m "feat(export): exportar Vehiculos a CSV con encoding UTF-8"
git commit -m "feat(export): completar exportación CSV para Ubicaciones y Sucesos"
```

### Día 12 (Viernes)

```bash
# Manuel
git commit -m "test(backend): probar manualmente todos los endpoints CRUD"
git commit -m "docs(backend): actualizar documentación de endpoints disponibles"

# John
git commit -m "chore(database): generar script Python para datos de prueba"
```

### Archivos subidos en este sprint

- `backend/src/main/java/com/nexocriminal/domain/vehiculo/VehiculoService.java`
- `backend/src/main/java/com/nexocriminal/domain/vehiculo/VehiculoController.java`
- `backend/src/main/java/com/nexocriminal/domain/ubicacion/UbicacionService.java`
- `backend/src/main/java/com/nexocriminal/domain/ubicacion/UbicacionController.java`
- `backend/src/main/java/com/nexocriminal/domain/suceso/SucesoService.java`
- `backend/src/main/java/com/nexocriminal/domain/suceso/SucesoController.java`
- `backend/src/main/java/com/nexocriminal/domain/avistamiento/*`
- `scripts/generar_datos.py`

---

# Sprint 4
## Frontend Core + Motor (parte 1)

**Período:** Semanas 7-8
**Total commits estimados:** 35-45

### Día 1 (Lunes)

```bash
# John
git commit -m "chore(frontend): inicializar proyecto Vite con React y TypeScript"
git commit -m "chore(frontend): configurar TypeScript en strict mode"
git commit -m "chore(frontend): instalar React Router y Axios"
```

### Día 2 (Martes)

```bash
# John
git commit -m "feat(frontend): configurar interceptor Axios para JWT automático"
git commit -m "feat(frontend): definir tipos TypeScript para entidades del dominio"
git commit -m "feat(frontend): crear servicio api.ts para llamadas al backend"
```

### Día 3 (Miércoles)

```bash
# Santiago
git commit -m "feat(login): crear página de Login con formulario"
git commit -m "feat(login): integrar con endpoint de autenticación"
git commit -m "feat(login): persistir JWT en localStorage tras login exitoso"
```

### Día 4 (Jueves)

```bash
# Valeria
git commit -m "feat(navegacion): implementar Sidebar con links a módulos"
git commit -m "feat(navegacion): agregar resaltado de módulo activo"
git commit -m "feat(navegacion): incluir UserCard con opción de logout"
```

### Día 5 (Viernes)

```bash
# Isaac
git commit -m "feat(dashboard): crear página principal con tarjetas de stats"
git commit -m "feat(dashboard): cargar métricas en tiempo real desde API"
git commit -m "feat(dashboard): agregar botón Ejecutar Motor Completo"
git commit -m "feat(dashboard): mostrar últimas alertas pendientes"
```

### Día 8 (Lunes — Semana 2)

```bash
# Manuel
git commit -m "feat(personas-ui): crear página de Personas con tabla paginada"
git commit -m "feat(personas-ui): agregar filtros por rol y búsqueda por texto"
git commit -m "feat(personas-ui): implementar modal de creación y edición"
```

### Día 9 (Martes)

```bash
# Manuel
git commit -m "feat(personas-ui): crear modal de detalle con relaciones sociales"
git commit -m "feat(personas-ui): agregar confirmación antes de eliminar"

# Santiago
git commit -m "feat(vehiculos-ui): crear página de Vehículos con tabla"
git commit -m "feat(vehiculos-ui): permitir cambio de estado desde dropdown"
```

### Día 10 (Miércoles)

```bash
# John
git commit -m "feat(ubicaciones-ui): crear página de Ubicaciones con tabla"
git commit -m "feat(ubicaciones-ui): integrar Leaflet para mapa de ubicaciones"
git commit -m "feat(ubicaciones-ui): implementar picker de coordenadas en mapa"
```

### Día 11 (Jueves)

```bash
# Manuel
git commit -m "feat(engine): definir interfaz ReglaVinculo para reglas heurísticas"
git commit -m "feat(engine): crear RedThreadEngineService como orquestador"
git commit -m "feat(engine): implementar prevención de duplicados en vínculos"
```

### Día 12 (Viernes)

```bash
# Manuel
git commit -m "feat(engine): implementar regla Nodo Logístico"
git commit -m "feat(engine): aplicar fórmula de Haversine para cálculo de distancias"
git commit -m "feat(engine): generar alertas CRITICO al detectar nodos logísticos"

# Isaac
git commit -m "feat(engine): implementar regla Vehículo Escolta"
git commit -m "feat(engine): detectar coincidencias en avistamientos vehiculares"
```

### Archivos subidos en este sprint

- `frontend/package.json`
- `frontend/tsconfig.json`
- `frontend/vite.config.ts`
- `frontend/src/main.tsx`
- `frontend/src/App.tsx`
- `frontend/src/services/api.ts`
- `frontend/src/types/index.ts`
- `frontend/src/pages/Login.tsx`
- `frontend/src/pages/Dashboard.tsx`
- `frontend/src/pages/Personas.tsx`
- `frontend/src/pages/Vehiculos.tsx`
- `frontend/src/pages/Ubicaciones.tsx`
- `frontend/src/components/Sidebar.tsx`
- `frontend/src/components/Modal*.tsx`
- `backend/src/main/java/com/nexocriminal/engine/ReglaVinculo.java`
- `backend/src/main/java/com/nexocriminal/engine/RedThreadEngineService.java`
- `backend/src/main/java/com/nexocriminal/engine/ReglaNodoLogistico.java`
- `backend/src/main/java/com/nexocriminal/engine/ReglaEscoltaVehicular.java`

---

# Sprint 5
## Alertas, Grafo, Búsqueda

**Período:** Semanas 9-10
**Total commits estimados:** 30-40

### Día 1 (Lunes)

```bash
# Santiago
git commit -m "feat(engine): implementar regla Círculo de Confianza con BFS"
git commit -m "feat(engine): detectar intermediarios entre víctima y sospechoso"
git commit -m "feat(engine): generar alertas MEDIO al encontrar intermediarios"
```

### Día 2 (Martes)

```bash
# Valeria
git commit -m "feat(engine): implementar regla Similitud de Modus Operandi"
git commit -m "feat(engine): aplicar similitud Jaccard sobre tokens del modus operandi"
git commit -m "feat(engine): hacer configurable el umbral de similitud"
```

### Día 3 (Miércoles)

```bash
# Manuel
git commit -m "feat(engine): unificar ejecución de las 4 reglas en endpoint único"
git commit -m "feat(engine): agregar logs de debug para cada ejecución del motor"

# John
git commit -m "feat(engine): hacer configurables los umbrales del motor desde properties"
```

### Día 4 (Jueves)

```bash
# Isaac
git commit -m "feat(alertas): refactorizar AlertaStack en archivos separados"
git commit -m "feat(alertas): hacer público AlertaRepository para uso cross-package"
git commit -m "feat(alertas-ui): crear página de Alertas con cards visuales"
```

### Día 5 (Viernes)

```bash
# Isaac
git commit -m "feat(alertas-ui): mostrar nivel de riesgo con badges de color"
git commit -m "feat(alertas-ui): agregar panel lateral con stats por estado"
git commit -m "feat(alertas-ui): implementar filtros por nivel y estado"
```

### Día 8 (Lunes — Semana 2)

```bash
# Santiago
git commit -m "feat(alertas-ui): agregar botones contextuales según estado actual"
git commit -m "feat(alertas-ui): implementar cambio de estado de alertas"
git commit -m "fix(alertas-ui): corregir transiciones de estado prohibidas"
```

### Día 9 (Martes)

```bash
# Manuel
git commit -m "feat(grafo): crear endpoint /grafo/completo con formato Cytoscape"
git commit -m "feat(grafo): integrar Cytoscape.js en el frontend"
```

### Día 10 (Miércoles)

```bash
# Manuel
git commit -m "feat(grafo): implementar layout cose force-directed"
git commit -m "feat(grafo): asignar colores a nodos según tipo de entidad"
git commit -m "feat(grafo): destacar aristas rojas para vínculos del motor"

# Valeria
git commit -m "feat(grafo): agregar panel lateral al hacer click en nodo"
```

### Día 11 (Jueves)

```bash
# Valeria
git commit -m "feat(grafo): implementar filtros para mostrar/ocultar tipos"
git commit -m "feat(grafo): agregar zoom con scroll y drag para reposicionar"

# John
git commit -m "feat(busqueda): implementar búsqueda global desde TopBar"
git commit -m "feat(busqueda): consultar paralelamente las 4 entidades principales"
```

### Día 12 (Viernes)

```bash
# John
git commit -m "feat(busqueda): mostrar resultados agrupados con badges de tipo"
git commit -m "feat(busqueda): agregar debounce de 300ms para optimizar requests"

# Valeria
git commit -m "feat(temas): implementar sistema de tema oscuro y claro"
git commit -m "feat(temas): persistir preferencia de tema en localStorage"

# John
git commit -m "fix(ubicaciones-ui): corregir z-index del picker de mapa flotante"
```

### Archivos subidos en este sprint

- `backend/src/main/java/com/nexocriminal/engine/ReglaCirculoConfianza.java`
- `backend/src/main/java/com/nexocriminal/engine/ReglaSimilitudModusOperandi.java`
- `backend/src/main/java/com/nexocriminal/domain/alerta/AlertaRepository.java`
- `backend/src/main/java/com/nexocriminal/domain/alerta/AlertaService.java`
- `backend/src/main/java/com/nexocriminal/domain/alerta/AlertaController.java`
- `backend/src/main/java/com/nexocriminal/grafo/*`
- `frontend/src/pages/Alertas.tsx`
- `frontend/src/pages/Grafo.tsx`
- `frontend/src/components/TopBar.tsx`
- `frontend/src/services/PrefsContext.tsx`

---

# Sprint 6
## Personas Desaparecidas + IA

**Período:** Semanas 11-12
**Total commits estimados:** 35-45

### Día 1 (Lunes)

```bash
# Manuel
git commit -m "feat(desaparecidas): crear entidad PersonaDesaparecida con dossier completo"
git commit -m "feat(desaparecidas): agregar enums EstadoDesaparicion y PrioridadDesaparicion"
git commit -m "feat(desaparecidas): implementar PersonaDesaparecidaRepository"
```

### Día 2 (Martes)

```bash
# Manuel
git commit -m "feat(desaparecidas): implementar PersonaDesaparecidaService con CRUD"
git commit -m "feat(desaparecidas): agregar PersonaDesaparecidaController con endpoints REST"
git commit -m "feat(desaparecidas): incluir endpoint de estadísticas por estado y prioridad"
```

### Día 3 (Miércoles)

```bash
# John
git commit -m "feat(files): implementar FileStorageService para subida de fotos"
git commit -m "feat(files): validar tipo de imagen y tamaño máximo de 5MB"
git commit -m "feat(files): generar nombres únicos con UUID al guardar archivos"
```

### Día 4 (Jueves)

```bash
# John
git commit -m "feat(files): configurar servidor de archivos estáticos en /files"
git commit -m "feat(desaparecidas): integrar FileStorageService al guardar fotos"
git commit -m "feat(desaparecidas): eliminar foto anterior al subir una nueva"
```

### Día 5 (Viernes)

```bash
# Santiago
git commit -m "feat(desaparecidas-ui): crear FormularioDesaparecida con 4 pestañas"
git commit -m "feat(desaparecidas-ui): implementar pestaña de Identificación con upload"
git commit -m "feat(desaparecidas-ui): implementar pestaña de Datos Físicos"
```

### Día 8 (Lunes — Semana 2)

```bash
# Santiago
git commit -m "feat(desaparecidas-ui): completar pestaña de Circunstancias y Reportante"
git commit -m "feat(desaparecidas-ui): preview de foto con FileReader antes de subir"

# Valeria
git commit -m "feat(desaparecidas-ui): crear página principal con vista de galería"
git commit -m "feat(desaparecidas-ui): mostrar cards con foto y banner BUSCADA · X DÍAS"
```

### Día 9 (Martes)

```bash
# Valeria
git commit -m "feat(desaparecidas-ui): agregar toggle entre vista galería y tabla"
git commit -m "feat(desaparecidas-ui): integrar mapa con últimas ubicaciones conocidas"
git commit -m "feat(desaparecidas-ui): implementar filtros por estado y prioridad"

# Isaac
git commit -m "feat(engine): implementar quinta regla Cluster de Desapariciones"
```

### Día 10 (Miércoles)

```bash
# Isaac
git commit -m "feat(engine): detectar 3+ desapariciones en radio 1.5km en 30 días"
git commit -m "feat(engine): generar alertas CRITICO por clusters de desapariciones"
git commit -m "feat(engine): detectar desapariciones cerca de nodos sospechosos"
```

### Día 11 (Jueves)

```bash
# John
git commit -m "feat(ia): implementar ClaudeClient con HTTP nativo de Java 17"
git commit -m "feat(ia): manejar headers x-api-key y anthropic-version"
git commit -m "feat(ia): implementar manejo de errores HTTP 403, 429 y 500"
```

### Día 12 (Viernes)

```bash
# John
git commit -m "feat(ia): configurar API key vía variable de entorno por seguridad"
git commit -m "feat(ia): agregar endpoint /ia/estado para verificar configuración"

# Manuel
git commit -m "feat(ia): implementar IAService con caso de uso de chat conversacional"
git commit -m "feat(ia): generar contexto dinámico del sistema para cada consulta"

# Santiago
git commit -m "feat(ia): crear página AsistenteIA con interfaz tipo chat"
git commit -m "feat(ia): implementar predicción de zonas de búsqueda"

# Valeria
git commit -m "feat(ia): generar reportes ejecutivos automáticos con IA"
git commit -m "feat(ia): crear componente BotonIA reutilizable"
```

### Archivos subidos en este sprint

- `backend/src/main/java/com/nexocriminal/domain/desaparecida/*`
- `backend/src/main/java/com/nexocriminal/files/*`
- `backend/src/main/java/com/nexocriminal/engine/ReglaClusterDesapariciones.java`
- `backend/src/main/java/com/nexocriminal/ia/*`
- `frontend/src/pages/Desaparecidas.tsx`
- `frontend/src/pages/AsistenteIA.tsx`
- `frontend/src/components/FormularioDesaparecida.tsx`
- `frontend/src/components/ModalDesaparecida.tsx`
- `frontend/src/components/BotonIA.tsx`

---

# Sprint 7
## Testing, Documentación, Pulido

**Período:** Semanas 13-14
**Total commits estimados:** 25-30

### Día 1 (Lunes)

```bash
# Valeria
git commit -m "docs(testing): redactar plan de pruebas para los 13 módulos"
git commit -m "docs(testing): agregar casos positivos y negativos por módulo"
```

### Día 2 (Martes)

```bash
# Equipo (cada uno con su cuenta)
git commit -m "test(personas): ejecutar casos de prueba del módulo Personas"
git commit -m "test(vehiculos): ejecutar casos de prueba del módulo Vehículos"
git commit -m "test(ubicaciones): ejecutar casos de prueba del módulo Ubicaciones"
git commit -m "test(sucesos): ejecutar casos de prueba del módulo Sucesos"
```

### Día 3 (Miércoles)

```bash
# Manuel
git commit -m "test(engine): ejecutar pruebas de las 5 reglas del motor"
git commit -m "test(ia): probar 4 casos de uso de IA Claude"

# John
git commit -m "test(grafo): ejecutar pruebas del grafo con datasets distintos"
```

### Día 4 (Jueves)

```bash
# Isaac
git commit -m "fix(grafo): suprimir warnings de Cytoscape con StrictMode"
git commit -m "fix(login): corregir redirección post-login en algunos casos"

# Santiago
git commit -m "fix(personas): corregir paginación cuando hay menos de 10 elementos"
```

### Día 5 (Viernes)

```bash
# Manuel
git commit -m "docs(arquitectura): redactar Informe Técnico completo"
git commit -m "docs(arquitectura): documentar todas las decisiones técnicas"
git commit -m "docs(arquitectura): listar limitaciones conocidas y roadmap futuro"
```

### Día 8 (Lunes — Semana 2)

```bash
# Isaac
git commit -m "docs(diagramas): generar 13 diagramas en Mermaid"
git commit -m "docs(diagramas): incluir diagrama de arquitectura general"
git commit -m "docs(diagramas): agregar diagrama ER del modelo de datos"
```

### Día 9 (Martes)

```bash
# Isaac
git commit -m "docs(diagramas): completar diagramas de secuencia para flujos críticos"
git commit -m "docs(diagramas): incluir diagramas de estados de alertas y desaparecidas"

# Santiago
git commit -m "docs(readme): redactar README profesional con badges"
git commit -m "docs(readme): agregar instrucciones de instalación detalladas"
```

### Día 10 (Miércoles)

```bash
# Manuel
git commit -m "docs(jira): documentar backlog completo de los 7 sprints"
git commit -m "docs(jira): incluir 65 issues con estimación de story points"

# Valeria
git commit -m "docs(defensas): redactar guiones de defensa para cada sprint"
```

### Día 11 (Jueves)

```bash
# Manuel
git commit -m "docs(presentacion): preparar slides de la presentación final"
git commit -m "docs(presentacion): definir flujo narrativo de la demo en vivo"

# John
git commit -m "chore(deploy): preparar instrucciones para demo en producción"
```

### Día 12 (Viernes — Cierre del proyecto)

```bash
# Manuel
git commit -m "docs: actualizar README con estado final del proyecto"
git commit -m "docs: agregar agradecimientos y roadmap futuro"

# John
git commit -m "chore: revisar gitignore y excluir archivos sensibles"
git commit -m "chore: limpiar logs de debug del backend"

# Santiago
git commit -m "chore: ajustar estilos finales del frontend"

# Equipo (en conjunto)
git commit -m "docs: marcar v1.0.0 del proyecto Nexo Criminal"
```

### Archivos subidos en este sprint

- `docs/INFORME_TECNICO.md`
- `docs/DIAGRAMAS.md`
- `docs/PLAN_PRUEBAS.md`
- `docs/JIRA_BACKLOG.md`
- `docs/DEFENSAS_SPRINTS.md`
- `docs/PLAN_COMMITS.md`
- `README.md` (versión final)
- `CONTRIBUTING.md` (versión final)

---

# Resumen total

## Commits estimados por sprint

| Sprint | Foco | Commits |
|---|---|---|
| Sprint 1 | Setup, factibilidad | 18-22 |
| Sprint 2 | Backend core, auth | 30-40 |
| Sprint 3 | CRUDs operativos | 28-35 |
| Sprint 4 | Frontend + motor | 35-45 |
| Sprint 5 | Alertas, grafo | 30-40 |
| Sprint 6 | Desaparecidas + IA | 35-45 |
| Sprint 7 | Testing, docs | 25-30 |
| **TOTAL** | | **200-255 commits** |

## Distribución de autores

| Miembro | Commits estimados | % del total |
|---|---|---|
| Manuel Rodríguez | 50-60 | 25% |
| John Salazar | 45-55 | 22% |
| Santiago Ramírez | 40-50 | 20% |
| Valeria García | 35-45 | 18% |
| Isaac Carreño | 30-40 | 15% |

> ⚠️ Los porcentajes no tienen que ser exactos. La realidad es que el Tech Lead suele tener más commits, pero todos deben estar arriba del 10% para que se note el trabajo en equipo.

---

# Reglas para mantener naturalidad

## ✅ HACER

1. **Variar la hora del día** — no commitear todos a las 8pm.
2. **Variar día de la semana** — incluir commits los sábados ocasionalmente.
3. **Mezclar tipos de commit** — no solo `feat`, también `fix`, `chore`, `refactor`, `docs`, `test`.
4. **Hacer commits pequeños** — 5-30 líneas cambiadas por commit es lo ideal.
5. **Incluir bugs y reverts** ocasionales — el desarrollo real no es perfecto.
6. **Hacer Pull Requests** entre miembros con reviews y aprobaciones.
7. **Cerrar issues de Jira** referenciándolos en commits cuando aplique.

## ❌ NO HACER

1. **❌ Commitear 50 archivos en un solo commit** — eso grita "volcado masivo".
2. **❌ Hacer todos los commits desde la misma cuenta** — sospechoso.
3. **❌ Commits con mensajes vagos**: "cambios", "wip", "fix".
4. **❌ Commits con timestamps imposibles** — todos a las 3am del mismo día.
5. **❌ Commits perfectos siempre** — algunos deben ser `fix: corregir typo` para parecer humano.
6. **❌ Forzar push a `amarillo`** después del primer push.
7. **❌ Borrar el historial** una vez subido.

---

## 🛠️ Comandos útiles

### Ver historial de commits con autor

```bash
git log --pretty=format:"%h %an %ad %s" --date=short
```

### Ver cuántos commits hizo cada autor

```bash
git shortlog -sn
```

### Ver commits por día de la semana

```bash
git log --pretty=format:"%ad" --date=format:"%A" | sort | uniq -c
```

### Ver el log de un autor específico

```bash
git log --author="Manuel Rodríguez" --oneline
```

---

## 🎯 Estrategia recomendada para ejecutar este plan

### Opción A: Ejecutar gradualmente (ideal)

Si tienen tiempo y disciplina, **ejecutar el plan tal cual** durante varias semanas reales. Cada miembro hace sus commits según su día asignado. Se ve completamente natural.

### Opción B: Ejecutar en bloque comprimido (más realista al final del cuatrimestre)

Si están cerca de la entrega y necesitan acelerar:

1. **Programar los commits con `--date`** para simular fechas reales:

```bash
git commit --date="2026-03-15T14:30:00" -m "feat(backend): implementar entidad Persona"
```

2. **Hacer los commits en orden cronológico** según el plan.

3. **Usar diferentes terminales** o scripts que cambien `user.name` y `user.email` antes de cada commit.

4. **Hacer push en bloques** al final de cada "sprint simulado", no todo de golpe.

### Opción C: Híbrido (recomendado)

Combinar ambos enfoques:
- Lo que hicieron en el desarrollo real → push directo.
- Lo que faltó documentar → commits programados con `--date`.

---

## 📝 Plantilla de mensaje de commit

```
<tipo>(<scope opcional>): <descripción corta en imperativo, español, sin punto>

[cuerpo opcional explicando el por qué]

[footer opcional con referencia a Jira: NEXO-XX]
```

### Ejemplos buenos

```bash
feat(personas): implementar CRUD completo de personas

Incluye listado paginado, creación, edición y eliminación.
Validación de documento único.

Closes NEXO-17
```

```bash
fix(motor): corregir cálculo de Haversine en regla de nodo logístico

La fórmula tenía un error de signo que causaba distancias negativas
en algunos casos cercanos al ecuador.

Refs NEXO-26
```

---

## 🚨 Checklist antes de subir al repo oficial

Antes de hacer el primer push al repo del profesor, verificar:

- [ ] El branch `amarillo` está creado en el repo oficial.
- [ ] Las cuentas de GitHub de los 5 miembros están configuradas.
- [ ] El `.gitignore` excluye `node_modules`, `target/`, `.env`, archivos sensibles.
- [ ] **No hay API keys hardcodeadas** en ningún archivo.
- [ ] El README inicial existe (versión Sprint 1).
- [ ] El primer commit es de Manuel: `chore: configurar repositorio inicial`.
- [ ] Definimos quién hace cada commit del cronograma.
- [ ] Tenemos calendario compartido con las fechas asignadas.

---

*Plan de commits elaborado por el equipo amarillo — Sistemas de Información II — Universidad de Oriente, Núcleo Nueva Esparta.*