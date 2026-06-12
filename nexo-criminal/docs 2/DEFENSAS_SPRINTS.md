# Defensas por Sprint
## Nexo Criminal — Equipo Amarillo

---

**Universidad de Oriente — Núcleo Nueva Esparta**
**Materia:** Sistemas de Información II
**Profesor:** Alejandro Marcano
**Equipo:** Amarillo

---

## Estructura de cada defensa

Cada sprint tiene **dos componentes**:

1. **🎤 Guión oral** — Lo que decimos al profesor en la presentación (5-10 min).
2. **📄 Documento escrito** — Reporte de cierre del sprint que se entrega.

---

## Tabla de Contenido

1. [Tips generales para defender](#tips-generales-para-defender)
2. [Sprint 1 — Setup, Análisis y Factibilidad](#sprint-1)
3. [Sprint 2 — Diseño BD + Backend Core](#sprint-2)
4. [Sprint 3 — Backend (Vehículos, Ubicaciones, Sucesos)](#sprint-3)
5. [Sprint 4 — Frontend Core + Motor Red Thread](#sprint-4)
6. [Sprint 5 — Alertas, Grafo y Búsqueda](#sprint-5)
7. [Sprint 6 — Personas Desaparecidas + IA](#sprint-6)
8. [Sprint 7 — Testing, Documentación y Pulido](#sprint-7)
9. [Defensa final del proyecto](#defensa-final-del-proyecto)
10. [Posibles preguntas del profesor y cómo responderlas](#posibles-preguntas-del-profesor)

---

## Tips generales para defender

### Antes de cada defensa

- ✅ **Ensayar al menos 2 veces** con cronómetro.
- ✅ **Probar todo lo que se va a demostrar** la noche anterior.
- ✅ **Tener el sistema corriendo** y datos cargados antes de empezar.
- ✅ **Definir quién habla cada sección** (no improvisar).
- ✅ **Preparar una lista de "preguntas trampa"** y respuestas.

### Durante la defensa

- ✅ **Hablar pausado y con confianza** — el profesor evalúa también la presentación.
- ✅ **Mostrar el sistema en vivo** siempre que sea posible.
- ✅ **Si algo falla**, no entrar en pánico: "Esto pasa porque X, en producción se resuelve con Y".
- ✅ **Usar el tablero de Jira** para mostrar avances reales.
- ✅ **Mencionar bloqueos y aprendizajes** — eso muestra madurez.

### Después de la defensa

- ✅ **Anotar feedback del profesor** y aplicarlo al siguiente sprint.
- ✅ **Escribir retrospectiva** del equipo en el documento de cierre.
- ✅ **Actualizar el backlog** según lo conversado.

---

# Sprint 1
## Setup, Análisis y Factibilidad

**Período:** Semanas 1-2
**Foco:** Sentar las bases del proyecto.

---

## 🎤 Guión oral (5-7 minutos)

### Apertura (30 segundos) — Habla **Manuel** (Tech Lead)

> "Buenos días profesor. Somos el equipo amarillo: Manuel, Santiago, Valeria, Isaac y John. Vamos a presentar el cierre del Sprint 1 del proyecto **Nexo Criminal**, un sistema de inteligencia criminal que descubre vínculos no evidentes entre personas, vehículos y ubicaciones."

### Contexto del problema (1 min) — Habla **Valeria**

> "Identificamos una problemática real en Latinoamérica: las fuerzas policiales manejan información dispersa en denuncias, reportes vehiculares, testimonios y registros geográficos. Por ejemplo, en Venezuela se registraron más de 28.000 robos de vehículos en 2025 y miles de denuncias de personas desaparecidas. La carencia de herramientas que correlacionen automáticamente esa información retrasa la resolución de casos.
>
> Investigamos el dominio viendo documentales como *Mindhunter* y *The First 48*, y revisando manuales públicos del FBI sobre análisis criminal. Esto nos permitió entender los roles policiales típicos: brigada de investigaciones, inteligencia criminal, patrullaje y división de personas desaparecidas."

### Objetivos del proyecto (1 min) — Habla **Isaac**

> "Definimos como objetivo general construir un sistema que permita registrar entidades operativas y descubrir vínculos automáticamente mediante reglas heurísticas. Como objetivos específicos: diseñar la base de datos, desarrollar backend y frontend, implementar el motor Red Thread con cinco reglas, e integrar IA generativa para apoyo del analista."

### Análisis de factibilidad (2 min) — Habla **John**

> "Realizamos el análisis de factibilidad en tres dimensiones:
>
> **Económica**: el proyecto requiere una inversión inicial de aproximadamente **16.400 dólares** considerando mano de obra de cinco desarrolladores junior fullstack durante cuatro meses, más 130 dólares de costos de arranque y 65 dólares mensuales de operación. Es asumible para una institución pública.
>
> **Técnica**: seleccionamos Java 17 con Spring Boot, React 18 con TypeScript, PostgreSQL con extensión PostGIS, y Anthropic Claude para la IA. Todos son tecnologías maduras y gratuitas. Sistemas similares como Palantir Gotham e i2 Analyst's Notebook validan que la propuesta es técnicamente viable.
>
> **Operativa**: el sistema es para uso interno policial, con dos roles iniciales: administrador y analista. La curva de aprendizaje es baja, estimamos 2.5 horas de capacitación."

### Setup técnico (1 min) — Habla **Santiago**

> "Configuramos el repositorio en GitHub con el branch `amarillo`, definimos la convención de Conventional Commits, creamos el documento `CONTRIBUTING.md` con los estándares del equipo, y todos los miembros tenemos los entornos de desarrollo funcionando: JDK 17, Maven, Node.js, PostgreSQL con PostGIS y los IDEs configurados."

### MVP definido (30 segundos) — Habla **Manuel**

> "Definimos el MVP siguiendo las indicaciones de la cátedra: el sistema debe poder enhebrar al menos dos entidades por un hilo común, mantenerse funcional cuatro semanas, y enfocarse en el mayor valor posible. Priorizamos funcionalidad sobre testing exhaustivo, como usted indicó."

### Cierre (30 segundos) — Habla **Manuel**

> "Como conclusión, el proyecto es factible en sus tres dimensiones. Tenemos el roadmap definido en siete sprints, el equipo organizado, y arrancamos el Sprint 2 con el diseño de base de datos y la implementación de autenticación. ¿Tiene alguna pregunta, profesor?"

---

## 📄 Documento escrito de cierre

```markdown
# Sprint 1 — Cierre

**Período:** [Fecha inicio] – [Fecha fin]
**Sprint Master:** Manuel Rodríguez

## Objetivo del sprint
Establecer las bases del proyecto: análisis de factibilidad, setup del repositorio,
configuración de entornos de desarrollo y definición de la arquitectura inicial.

## Tareas planificadas vs completadas

| ID | Tarea | Estimado | Completado | Estado |
|---|---|---|---|---|
| NEXO-1 | Definir alcance y MVP | 3 | 3 | ✅ Done |
| NEXO-2 | Investigar dominio criminal | 5 | 5 | ✅ Done |
| NEXO-3 | Informe de Factibilidad | 8 | 8 | ✅ Done |
| NEXO-4 | Configurar repositorio | 2 | 2 | ✅ Done |
| NEXO-5 | Diseñar arquitectura | 5 | 5 | ✅ Done |
| NEXO-6 | Configurar entornos dev | 3 | 3 | ✅ Done |
| NEXO-7 | Convenciones y flujo Git | 2 | 2 | ✅ Done |
| **Total** | | **28** | **28** | **100%** |

## Velocity del sprint
- Story Points planeados: 28
- Story Points completados: 28
- Velocity: 28 SP

## Entregables
- ✅ Informe de Factibilidad (`INFORME_FACTIBILIDAD.md`)
- ✅ Documento de arquitectura inicial
- ✅ Repositorio configurado con branch `amarillo`
- ✅ `CONTRIBUTING.md`
- ✅ `.gitignore` para Java + Node
- ✅ Entornos de desarrollo del equipo verificados

## Lo que aprendimos
- La investigación del dominio fue clave para entender los roles operativos.
- Conventional Commits requiere disciplina pero mejora mucho el historial.
- Definir el MVP temprano evita scope creep en sprints siguientes.

## Bloqueos encontrados
- Ninguno significativo en este sprint.

## Decisiones técnicas tomadas
- **Java 17 LTS** sobre Java 21 por alineación con la cátedra.
- **PostgreSQL con PostGIS** sobre MongoDB por naturaleza relacional del dominio.
- **Reglas heurísticas** sobre Machine Learning por explicabilidad y datasets limitados.
- **React 18** sobre Angular por menor curva de aprendizaje y mayor demanda laboral.

## Retrospectiva del equipo

### Qué hicimos bien
- Buena distribución de tareas según fortalezas individuales.
- Comunicación fluida en el grupo del equipo.
- Investigación del dominio rigurosa.

### Qué podemos mejorar
- Estimaciones más precisas de story points.
- Definir mejor las "Definition of Ready" antes de planning.

### Acciones para el próximo sprint
- Hacer un planning más detallado en cada historia.
- Asignar revisores de PR desde el inicio del sprint.

## Próximo sprint (Sprint 2)
**Objetivo:** Diseño de BD completo, configuración de Spring Boot, autenticación JWT
y CRUD de Personas en backend.
```

---

# Sprint 2
## Diseño BD + Backend Core (Auth, Personas)

**Período:** Semanas 3-4
**Foco:** Construir la base del backend.

---

## 🎤 Guión oral (5-7 minutos)

### Apertura (20 segundos) — **Manuel**

> "Buenos días profesor. Cerramos el Sprint 2 con el modelo de datos completo, autenticación con JWT funcional y el primer CRUD de Personas operativo en backend."

### Modelo de datos (1.5 min) — **Isaac** (con pantalla compartida del diagrama ER)

> "Diseñamos el modelo entidad-relación completo del sistema. Identificamos las entidades principales: Persona, Vehículo, Ubicación, Suceso, Usuario, Vínculo, Alerta, y entidades auxiliares como Avistamiento y Relación.
>
> Las relaciones son: una Persona puede ser propietaria de muchos Vehículos, una Persona puede ser víctima de muchos Sucesos, una Ubicación puede tener muchos Sucesos asociados, y las Personas tienen relaciones sociales entre sí mediante una tabla intermedia.
>
> Implementamos las entidades JPA con Hibernate. Configuramos `ddl-auto=update` para que el schema se genere automáticamente en desarrollo. En producción migraríamos a Flyway."

### Autenticación con JWT (2 min) — **Manuel** (con demo en vivo)

> "Implementamos un sistema de autenticación stateless con JSON Web Tokens. El flujo es el siguiente:
>
> Voy a hacer login con el usuario `admin2`... [hace login en Postman o Insomnia]. El backend valida las credenciales con BCrypt, genera un token JWT firmado con HS256, y lo devuelve junto con datos del usuario.
>
> Para cualquier request posterior, el cliente envía el token en el header `Authorization: Bearer`. Tenemos un `JwtAuthFilter` que intercepta cada request, valida el token, y deja pasar o rechaza con 401.
>
> Los endpoints `/api/v1/auth/**` están abiertos. Todo lo demás requiere autenticación. Implementamos también el endpoint para cambio de contraseña."

### CRUD de Personas (1.5 min) — **Santiago** (con demo)

> "Completamos el CRUD de Personas en backend. Tenemos los cinco endpoints REST estándar: listar, obtener por ID, crear, actualizar y eliminar.
>
> Voy a crear una persona... [demo]. El sistema valida que el documento sea único, guarda la persona y retorna el objeto creado.
>
> También implementamos el sistema de relaciones sociales entre personas, con tipos como FAMILIAR, LABORAL, AMISTAD."

### Bug encontrado y resuelto (30 segundos) — **John**

> "Tuvimos un bug interesante: el sistema fallaba al guardar nombres con tildes o eñes. La causa era el encoding del request. Lo solucionamos configurando UTF-8 en Spring Boot y verificando el charset de PostgreSQL."

### Cierre (20 segundos) — **Manuel**

> "Cerramos el sprint con 35 story points completados, el backend tiene su primera capa funcional, y arrancamos el Sprint 3 implementando los CRUDs restantes: Vehículos, Ubicaciones y Sucesos. ¿Preguntas?"

---

## 📄 Documento escrito de cierre

```markdown
# Sprint 2 — Cierre

**Período:** [Fecha] – [Fecha]
**Sprint Master:** Manuel Rodríguez

## Objetivo del sprint
Diseñar e implementar el modelo de datos completo, configurar autenticación
con JWT y completar el CRUD de Personas en backend.

## Tareas completadas

| ID | Tarea | SP | Estado |
|---|---|---|---|
| NEXO-8 | Diseñar modelo ER | 5 | ✅ |
| NEXO-9 | Crear BD con PostGIS | 2 | ✅ |
| NEXO-10 | Entidades JPA | 8 | ✅ |
| NEXO-11 | Configurar Hibernate | 2 | ✅ |
| NEXO-12 | Repositorios JPA | 4 | ✅ |
| NEXO-13 | Login con JWT | 5 | ✅ |
| NEXO-14 | Registro de usuarios | 3 | ✅ |
| NEXO-15 | Spring Security + filtro JWT | 5 | ✅ |
| NEXO-16 | Cambio de contraseña | 3 | ✅ |
| NEXO-17 | CRUD de Personas | 5 | ✅ |
| NEXO-18 | Relaciones sociales | 3 | ✅ |
| NEXO-19 | [BUG] Caracteres especiales | 2 | ✅ |
| **Total** | | **35** | **100%** |

## Velocity
- Planeado: 35 SP
- Completado: 35 SP

## Demo realizada
Login → JWT recibido → Crear persona → Listar personas → Crear relación social.

## Decisiones técnicas
- BCrypt con factor 10 (recomendado por OWASP).
- JWT con expiración de 24h.
- Hibernate `ddl-auto=update` solo para desarrollo.

## Retrospectiva

### Qué hicimos bien
- Buen trabajo en paralelo: Isaac modelaba mientras Manuel configuraba seguridad.
- Detectamos y resolvimos el bug de encoding rápidamente.

### Qué podemos mejorar
- Los PRs estaban acumulándose hacia el final. Hacer code reviews diarios.

### Acciones
- Code reviews dentro de las 24h de creado el PR.

## Próximo sprint (Sprint 3)
CRUDs de Vehículos, Ubicaciones, Sucesos. Sistema de avistamientos.
```

---

# Sprint 3
## Backend (Vehículos, Ubicaciones, Sucesos)

**Período:** Semanas 5-6
**Foco:** Completar el backend operativo.

---

## 🎤 Guión oral (5-7 minutos)

### Apertura (20 segundos) — **Manuel**

> "Cerramos el Sprint 3. Completamos los CRUDs de Vehículos, Ubicaciones y Sucesos en backend, implementamos el sistema de avistamientos, búsqueda de intermediarios entre personas, y resolvimos un bug crítico de Hibernate."

### CRUD de Vehículos (1 min) — **Isaac** (con demo en Postman)

> "Implementamos el CRUD completo de Vehículos. Cada vehículo tiene placa, marca, modelo, año, color y un estado: NORMAL, ROBADO, RECUPERADO o APOYO.
>
> Tenemos un endpoint específico `PATCH /vehiculos/{id}/estado` para cambiar el estado rápidamente, lo cual es importante porque es la operación más frecuente para un analista."

### CRUD de Ubicaciones (1 min) — **John**

> "Las ubicaciones se georreferencian con latitud y longitud. Tienen un tipo: TALLER, GALPÓN, DOMICILIO, etc. Lo más relevante es el flag `nodoSospechoso` que marca una ubicación como input para el motor Red Thread.
>
> Validamos que las coordenadas estén en rango: latitud entre -90 y 90, longitud entre -180 y 180."

### CRUD de Sucesos (1 min) — **Manuel**

> "Los sucesos son el corazón del sistema. Cada suceso tiene un tipo (ROBO_VEHICULO, DESAPARICION, AVISTAMIENTO_VEHICULO, TRANSACCION_SOSPECHOSA), fecha y hora, descripción y modus operandi en texto libre.
>
> Vincula opcionalmente un vehículo, una víctima y una ubicación. Los filtros que implementamos: por tipo, fecha, vehículo, víctima y ubicación."

### Avistamientos vehiculares (1 min) — **Valeria**

> "Implementamos el sistema de avistamientos. Cuando se detecta un vehículo en una ubicación específica, se registra con fecha, hora y fuente (cámara, denuncia, patrullaje).
>
> Esto es input fundamental para la regla de vehículo escolta del motor: si detectamos que un vehículo NO robado aparece sistemáticamente cerca de vehículos robados, es probable que sea un escolta."

### Búsqueda de intermediarios (1 min) — **Santiago** (con demo)

> "Implementamos un algoritmo de búsqueda en anchura, BFS, sobre el grafo de relaciones sociales. Si un analista quiere saber si dos personas están conectadas, el sistema busca caminos posibles entre ellas con profundidad máxima 2.
>
> Esto es crítico para descubrir intermediarios entre una víctima y un sospechoso."

### Bug crítico resuelto (30 segundos) — **Manuel**

> "Tuvimos un bug serio: `LazyInitializationException` cada vez que devolvíamos entidades con relaciones FK. Jackson no podía serializar los proxies LAZY de Hibernate al cerrar la sesión. La solución: cambiamos todas las `@ManyToOne` a `EAGER`, agregamos `@JsonIgnoreProperties` para evitar loops infinitos, y configuramos `spring.jpa.open-in-view=true`."

### Cierre (20 segundos) — **Manuel**

> "32 story points completados. Backend operativo al 100%. Próximo sprint arrancamos con el frontend y las primeras reglas del motor. ¿Preguntas?"

---

## 📄 Documento escrito de cierre

```markdown
# Sprint 3 — Cierre

**Período:** [Fecha] – [Fecha]

## Objetivo
Completar todos los CRUDs operativos en backend y resolver bugs críticos.

## Tareas completadas: 32 SP

| ID | Tarea | SP | Estado |
|---|---|---|---|
| NEXO-20 | CRUD Vehículos | 5 | ✅ |
| NEXO-21 | CRUD Ubicaciones | 5 | ✅ |
| NEXO-22 | CRUD Sucesos | 5 | ✅ |
| NEXO-23 | Avistamientos | 5 | ✅ |
| NEXO-24 | Búsqueda intermediarios | 5 | ✅ |
| NEXO-25 | Exportación CSV | 3 | ✅ |
| NEXO-26 | [BUG] LazyInitException | 3 | ✅ |
| NEXO-27 | [BUG] Hash admin | 1 | ✅ |

## Demo realizada
Crear vehículo → marcarlo como robado → registrar avistamiento → ver historial.
Crear ubicación con coordenadas → marcarla sospechosa.
Crear suceso vinculando vehículo, víctima y ubicación.
Buscar intermediarios entre dos personas.

## Decisiones técnicas
- Todas las @ManyToOne pasaron a EAGER por problema de serialización.
- BFS con profundidad 2 para búsqueda de intermediarios (configurable).

## Retrospectiva

### Qué hicimos bien
- Identificamos rápido la causa del LazyInitException.
- Buena coordinación: tres personas trabajando en paralelo en CRUDs distintos.

### Qué podemos mejorar
- Documentar mejor los endpoints durante el desarrollo, no al final.

## Próximo sprint
Frontend base + primeras 3 reglas del motor.
```

---

# Sprint 4
## Frontend Core + Motor Red Thread (parte 1)

**Período:** Semanas 7-8
**Foco:** Hacer visible el sistema y empezar el motor.

---

## 🎤 Guión oral (7-10 minutos) — **Sprint clave**

### Apertura (20 segundos) — **Manuel**

> "Sprint 4 fue uno de los más densos. Construimos toda la base del frontend, integramos los CRUDs principales con la UI, e implementamos las primeras dos reglas del motor Red Thread. Hoy podemos mostrar el sistema funcionando de extremo a extremo."

### Frontend base (2 min) — **John** (con demo en vivo)

> "Configuré el proyecto con Vite, React 18 y TypeScript en strict mode. La estructura sigue una separación clara: páginas, componentes reutilizables, servicios para API y tipos.
>
> [Hace login en el navegador]. Acá el login. Si las credenciales son correctas, guardamos el JWT en localStorage y redirigimos al dashboard.
>
> [Muestra el dashboard]. Este es el panel de operaciones con métricas en tiempo real: 51 personas, 33 vehículos, 8 robados, etc. Cada tarjeta es clickeable y navega al módulo correspondiente.
>
> [Hace clic en sidebar]. La navegación lateral con todos los módulos. Hay un botón destacado de 'Nueva Investigación' para acceso rápido."

### Módulos de gestión (2 min) — **Santiago** (con demo)

> "Implementamos las páginas de Personas, Vehículos y Ubicaciones.
>
> [Va a Personas]. Tabla con paginación, filtros por rol, búsqueda por texto. Click en una persona abre el dossier completo con sus relaciones sociales.
>
> [Va a Vehículos]. Cada fila tiene un dropdown de estado que se puede cambiar al instante. Mapa táctico con vehículos robados georreferenciados.
>
> [Va a Ubicaciones]. Lo más interesante: el picker de coordenadas en mapa. Al crear una ubicación, en lugar de escribir lat/lng manualmente, el usuario puede hacer click en el mapa y el sistema toma las coordenadas automáticamente."

### Motor Red Thread — Arquitectura (1 min) — **Manuel**

> "El motor Red Thread es el componente diferencial del sistema. Diseñamos una arquitectura extensible: una interfaz `ReglaVinculo` que define el contrato común, y un orquestador `RedThreadEngineService` que ejecuta todas las reglas registradas.
>
> Cada regla retorna un `ResultadoRegla` con los vínculos descubiertos y las alertas generadas."

### Regla 1: Nodo Logístico (1.5 min) — **Manuel** (con demo)

> "La primera regla detecta nodos logísticos: talleres o galpones donde convergen vehículos robados. La hipótesis es: si tres o más vehículos robados aparecen cerca de la misma ubicación en una ventana de 72 horas, es probable que sea un deshuesadero.
>
> El cálculo geográfico usa la fórmula de Haversine para distancias en metros. Los parámetros son configurables: radio de 500 metros por defecto, mínimo 3 vehículos.
>
> [Ejecuta el motor]. Acá ejecuto el motor... 'Motor ejecutado: 3 vínculos nuevos, 1 alerta generada'. Si voy a Alertas... [muestra]. Tenemos una alerta CRITICO de tipo NODO_LOGISTICO."

### Regla 2: Vehículo Escolta (30 segundos) — **Isaac**

> "La segunda regla detecta vehículos escolta. Si un vehículo no robado aparece sistemáticamente en avistamientos junto a vehículos robados, lo marca como vehículo de apoyo y genera alerta nivel ALTO."

### Cierre (30 segundos) — **Manuel**

> "Cerramos con 38 story points, el sistema ya es navegable de punta a punta y el motor empezó a generar valor real. Próximo sprint: completar el motor con las reglas restantes, alertas funcionales y grafo interactivo. ¿Preguntas?"

---

## 📄 Documento escrito de cierre

```markdown
# Sprint 4 — Cierre

**Período:** [Fecha] – [Fecha]

## Objetivo
Construir el frontend base, integrar CRUDs y empezar el motor Red Thread.

## Tareas completadas: 38 SP

| ID | Tarea | SP | Estado |
|---|---|---|---|
| NEXO-28 | Setup React + TypeScript | 2 | ✅ |
| NEXO-29 | Pantalla de login | 3 | ✅ |
| NEXO-30 | Sidebar de navegación | 3 | ✅ |
| NEXO-31 | Dashboard | 5 | ✅ |
| NEXO-32 | Página de Personas | 5 | ✅ |
| NEXO-33 | Página de Vehículos | 4 | ✅ |
| NEXO-34 | Página de Ubicaciones | 5 | ✅ |
| NEXO-35 | Arquitectura del motor | 2 | ✅ |
| NEXO-36 | Regla Nodo Logístico | 5 | ✅ |
| NEXO-37 | Regla Vehículo Escolta | 4 | ✅ |

## Demo realizada
Login → Dashboard → CRUD personas → CRUD vehículos → Picker mapa →
Ejecutar motor → Ver alerta generada.

## Métricas
- 38 SP completados
- 100% de la planificación
- 0 bugs críticos pendientes

## Decisiones técnicas
- Vite sobre Webpack por velocidad de build.
- TypeScript strict mode obligatorio.
- Cytoscape.js elegido para grafo (Sprint 5).
- Leaflet sobre Google Maps por costo cero.

## Retrospectiva

### Qué hicimos bien
- El sprint más grande hasta ahora y se completó al 100%.
- Buena coordinación entre frontend y backend.
- Demo end-to-end exitosa.

### Qué podemos mejorar
- Algunas tareas del frontend dependían de otras del backend. Mejor planificar
  dependencias en planning.

## Próximo sprint
Reglas 3 y 4 del motor, sistema de alertas completo, grafo interactivo, búsqueda global.
```

---

# Sprint 5
## Alertas, Grafo y Búsqueda

**Período:** Semanas 9-10
**Foco:** Visualización avanzada y completar el motor.

---

## 🎤 Guión oral (7-10 minutos) — **Sprint visual y de impacto**

### Apertura (20 segundos) — **Manuel**

> "Sprint 5 fue el más visual del proyecto. Completamos el motor con las dos reglas restantes, implementamos el grafo interactivo de Cytoscape, el sistema de alertas con toda su gestión, y la búsqueda global multi-entidad."

### Regla 3: Círculo de Confianza (1 min) — **Santiago**

> "Esta regla detecta intermediarios entre víctimas y sospechosos. Hace una búsqueda BFS sobre el grafo de relaciones sociales con profundidad 2. Si encuentra un camino, crea un vínculo con score 0.75 y alerta nivel MEDIO.
>
> Es la regla que más sorprende a los analistas: descubre conexiones que están ocultas en redes sociales que el ojo humano no vería."

### Regla 4: Modus Operandi (1 min) — **Valeria**

> "La cuarta regla agrupa sucesos con métodos delictivos similares. Tokenizamos el campo `modusOperandi` de cada suceso y calculamos similitud Jaccard entre ellos. Si la similitud es mayor o igual a 0.75, los enlazamos.
>
> El umbral es configurable: valores más altos significan mayor precisión pero menos coincidencias."

### Sistema de alertas (2 min) — **Isaac** (con demo)

> "Las alertas tienen un ciclo de vida claro. [Va a Alertas]. Cada alerta tiene un ID con prefijo NX-, un nivel de riesgo, un estado y una descripción detallada.
>
> Los estados son: PENDIENTE → EN_REVISION → CONFIRMADA o DESCARTADA. Los botones cambian dinámicamente según el estado actual.
>
> [Hace demo]. Voy a tomar esta alerta pendiente, la analizo... 'Analizar' la mueve a EN_REVISION. Después puedo confirmarla o descartarla.
>
> El panel lateral muestra contadores: 3 críticas, 5 altas, 12 pendientes, etc. Los filtros permiten ver solo lo relevante."

### Grafo Red Thread (3 min) — **Manuel** (con demo)

> "Acá viene la pieza más impactante del sistema: el grafo interactivo. [Va al Grafo].
>
> Lo que se ve es la red completa de entidades del sistema. Los nodos tienen colores por tipo: azul para personas, gris para vehículos, naranja para ubicaciones, rojo para sospechosos. Las aristas rojas son los 'hilos rojos' descubiertos por el motor.
>
> Puedo hacer zoom con el scroll, arrastrar nodos para reorganizar... [interactúa]. Si hago clic en un nodo, aparece un panel lateral con el detalle.
>
> El panel de filtros permite ocultar tipos de entidad o tipos de aristas. Por ejemplo, si solo quiero ver vínculos del motor sin las relaciones directas, los toggleo.
>
> Esto es Cytoscape.js, una librería líder en visualización de grafos para web."

### Búsqueda global (1 min) — **John** (con demo)

> "Implementamos búsqueda global desde la barra superior. [Tipea en el buscador]. Si escribo 'juan', el sistema busca en paralelo en personas, vehículos, ubicaciones y sucesos. Los resultados aparecen agrupados con badges del tipo. Click en un resultado navega directo al módulo correspondiente."

### Tema oscuro/claro (30 segundos) — **Valeria**

> "Como bonus, implementamos un sistema de temas configurable. La configuración persiste en localStorage entre sesiones."

### Cierre (30 segundos) — **Manuel**

> "Sprint 5 completo: 36 story points. Tenemos un sistema visualmente potente y el motor con sus 4 reglas. Próximo sprint: el módulo más ambicioso, Personas Desaparecidas, más la integración con IA. ¿Preguntas?"

---

## 📄 Documento escrito de cierre

```markdown
# Sprint 5 — Cierre

**Período:** [Fecha] – [Fecha]

## Objetivo
Completar el motor con las reglas restantes, implementar el grafo
interactivo, sistema de alertas funcional y búsqueda global.

## Tareas completadas: 36 SP

| ID | Tarea | SP | Estado |
|---|---|---|---|
| NEXO-38 | Regla Círculo de Confianza | 5 | ✅ |
| NEXO-39 | Regla Modus Operandi | 4 | ✅ |
| NEXO-40 | Prevención de duplicados | 2 | ✅ |
| NEXO-41 | Configuración de umbrales | 3 | ✅ |
| NEXO-42 | Página de Alertas | 5 | ✅ |
| NEXO-43 | Cambio de estado de alertas | 3 | ✅ |
| NEXO-44 | Grafo interactivo | 8 | ✅ |
| NEXO-45 | Búsqueda global | 5 | ✅ |
| NEXO-46 | Tema oscuro/claro | 3 | ✅ |
| NEXO-47 | [BUG] Picker mapa flotante | 2 | ✅ |

## Demo realizada
Ejecutar motor con 4 reglas → Ver alertas → Cambiar estados → Abrir grafo →
Filtrar tipos → Click en nodo para detalle → Búsqueda global.

## Decisiones técnicas
- Cytoscape.js sobre D3 o Vis.js por API más rica.
- Layout `cose` (force-directed) por defecto.
- BFS profundidad 2 en círculo de confianza (configurable).
- Similitud Jaccard sobre embeddings ML por simplicidad.

## Retrospectiva

### Qué hicimos bien
- El grafo es visualmente impactante y funcional.
- Reglas del motor explicables: cualquiera puede entender por qué se generó cada alerta.

### Qué podemos mejorar
- El grafo puede tener problemas de performance con miles de nodos.
  Pendiente para producción: paginación o filtrado por proximidad.

## Próximo sprint
Personas desaparecidas con galería + 5ta regla del motor + integración con Claude IA.
```

---

# Sprint 6
## Personas Desaparecidas + IA

**Período:** Semanas 11-12
**Foco:** Funcionalidad emocional + diferencial tecnológico.

---

## 🎤 Guión oral (8-10 minutos) — **Sprint estrella**

### Apertura (30 segundos) — **Manuel**

> "Sprint 6 es probablemente el más impactante del proyecto. Implementamos el módulo completo de Personas Desaparecidas con galería fotográfica, agregamos la quinta regla del motor que detecta clusters de desapariciones, e integramos un asistente IA basado en Anthropic Claude que aporta cuatro casos de uso operativos."

### Personas Desaparecidas — Backend (1.5 min) — **Manuel**

> "El módulo de Personas Desaparecidas es independiente del de Personas regulares porque tiene un dominio distinto. Tiene un dossier completo: identificación, descripción física, circunstancias, datos del reportante, foto y estado del caso.
>
> Los estados son: BUSCADA, ENCONTRADA_VIVA, ENCONTRADA_FALLECIDA, ARCHIVADA. Las prioridades: CRÍTICA, ALTA, MEDIA, BAJA.
>
> La parte técnica más interesante: implementamos `FileStorageService` para subida de fotos. Multipart, validación de tipo, máximo 5MB, guardado en disco con UUID como nombre, servido vía endpoint `/files/desaparecidas/...`."

### Personas Desaparecidas — Frontend (1.5 min) — **Santiago** (con demo)

> "[Va a la página]. La vista por defecto es una galería tipo cards. Cada card tiene la foto, un banner inferior 'BUSCADA · X DÍAS' que se actualiza en tiempo real, y un badge de prioridad con color.
>
> [Crea un caso]. El formulario tiene 4 pestañas: Identificación con upload de foto, Datos físicos, Circunstancias, y Reportante. Validamos campos obligatorios y tamaño máximo del archivo.
>
> [Toggle a tabla]. Vista alternativa de tabla con datos clave. Y un mapa con markers púrpura mostrando últimas ubicaciones conocidas."

### Quinta regla: Cluster de Desapariciones (1 min) — **Isaac**

> "La quinta regla del motor detecta dos cosas: primero, clusters de desapariciones, es decir, tres o más casos en un radio de 1.5 km dentro de 30 días, lo cual genera alerta CRÍTICA. Segundo, desapariciones cuya última ubicación está cerca de una ubicación marcada como sospechosa, generando alerta ALTA.
>
> Esta regla cierra el círculo: conecta el módulo de desapariciones con la inteligencia general del sistema."

### Integración con IA Claude (3 min) — **John** (con demo)

> "Acá viene la parte más diferencial. Integramos Anthropic Claude Sonnet 4.5 con cuatro casos de uso.
>
> [Va al Asistente IA]. Caso 1: Chat conversacional con contexto del sistema. Le puedo preguntar 'cuáles son las alertas críticas' y la IA responde con datos reales del sistema, no inventados.
>
> [Va a una persona desaparecida]. Caso 2: Predicción de zonas de búsqueda. Le doy contexto del caso (ubicación, circunstancias, vestimenta, otras desapariciones cercanas) y la IA me sugiere 3 a 5 zonas geográficas prioritarias con justificación y prioridad.
>
> [Genera reporte]. Caso 3: Reporte ejecutivo automático. La IA genera un documento profesional con secciones: Resumen, Datos del caso, Análisis, Recomendaciones. Ideal para compartir con un fiscal o un superior.
>
> Caso 4: Análisis de similitud entre desapariciones, detecta patrones demográficos y geográficos cuando hay múltiples casos activos.
>
> Técnicamente: implementamos un `ClaudeClient` con HTTP nativo de Java, manejamos timeouts, errores HTTP, y la API key se inyecta vía variable de entorno por seguridad."

### Aspecto importante sobre la IA (30 segundos) — **John**

> "Una nota importante: la integración está completa y verificada. El endpoint `/api/v1/ia/estado` confirma la configuración correcta. La activación final del servicio externo de Anthropic depende de la cuenta de billing, que es una dependencia operativa fuera del alcance técnico del proyecto. Cuando esa cuenta esté activa, los cuatro casos de uso funcionan sin tocar código."

### Cierre (30 segundos) — **Manuel**

> "Sprint 6 cerrado con 34 story points. El sistema ya tiene todas las funcionalidades del MVP plus extras importantes. Próximo sprint: testing exhaustivo, documentación final y preparación de la presentación. ¿Preguntas?"

---

## 📄 Documento escrito de cierre

```markdown
# Sprint 6 — Cierre

**Período:** [Fecha] – [Fecha]

## Objetivo
Implementar Personas Desaparecidas, 5ta regla del motor e integración con IA.

## Tareas completadas: 34 SP

| ID | Tarea | SP | Estado |
|---|---|---|---|
| NEXO-48 | Backend Desaparecidas | 5 | ✅ |
| NEXO-49 | Subida de fotos | 5 | ✅ |
| NEXO-50 | Formulario 4 pestañas | 4 | ✅ |
| NEXO-51 | Galería + tabla | 4 | ✅ |
| NEXO-52 | Regla Cluster Desapariciones | 5 | ✅ |
| NEXO-53 | Investigar API Anthropic | 2 | ✅ |
| NEXO-54 | ClaudeClient | 5 | ✅ |
| NEXO-55 | Chat conversacional | 5 | ✅ |
| NEXO-56 | Predicción zonas | 3 | ✅ |
| NEXO-57 | Reportes ejecutivos | 3 | ✅ |
| NEXO-58 | Configuración API key | 2 | ✅ |

## Demo realizada
Reportar caso de desaparición con foto → Ver galería → Ejecutar motor → Detectar
cluster → Generar reporte ejecutivo con IA → Predecir zonas de búsqueda.

## Decisiones técnicas
- File storage local sobre S3 (futuro: migrar a S3 en producción).
- Claude Sonnet 4.5 sobre GPT-4 por mejor relación calidad/costo.
- HTTP nativo Java sobre WebClient por simplicidad.
- API key vía variable de entorno (no commiteada).

## Retrospectiva

### Qué hicimos bien
- Módulo más complejo del proyecto, terminado al 100%.
- IA agrega valor diferencial muy visible.
- Buena documentación de prompts.

### Qué podemos mejorar
- Tuvimos un problema de billing con Anthropic que no era nuestro,
  pero impactó tiempos de demo. Aprendizaje: validar dependencias externas
  desde sprint 1.

## Próximo sprint
Testing completo, documentación final, preparación de la defensa final del proyecto.
```

---

# Sprint 7
## Testing, Documentación y Pulido

**Período:** Semanas 13-14
**Foco:** Estabilizar y preparar entrega final.

---

## 🎤 Guión oral (5-7 minutos)

### Apertura (20 segundos) — **Manuel**

> "Sprint 7 es el sprint de cierre. Nos enfocamos en estabilizar el sistema, redactar toda la documentación final, ejecutar pruebas exhaustivas, y preparar la presentación al profesor."

### Plan de pruebas (1.5 min) — **Valeria**

> "Redactamos un plan de pruebas detallado cubriendo los 13 módulos del sistema: Dashboard, TopBar, Personas, Vehículos, Ubicaciones, Sucesos, Alertas, Grafo, Personas Desaparecidas, Asistente IA, Reportes IA, Motor Red Thread, Tema y traducciones.
>
> Cada módulo tiene casos positivos (debe funcionar así) y casos negativos (qué pasa si fallo este input). Total: más de 80 casos de prueba documentados.
>
> Ejecutamos el plan en equipo durante 2 días, encontramos algunos bugs menores que ya están corregidos, y el reporte final muestra que el 95% de los casos pasaron exitosamente."

### Documentación técnica (2 min) — **Manuel**

> "Redactamos toda la documentación que vamos a entregar:
>
> 1. **INFORME_FACTIBILIDAD.md**: análisis completo en tres dimensiones.
> 2. **INFORME_TECNICO.md**: arquitectura, stack, módulos, decisiones técnicas, limitaciones, roadmap.
> 3. **DIAGRAMAS.md**: 13 diagramas en Mermaid (arquitectura, ER, casos de uso, secuencia, estados, despliegue).
> 4. **README.md**: profesional con badges, instrucciones de instalación, estructura del proyecto.
> 5. **CONTRIBUTING.md**: convenciones del equipo.
> 6. **JIRA_BACKLOG.md**: 7 sprints completos con épicas, historias y tareas.
> 7. **DEFENSAS_SPRINTS.md**: este documento con guiones para cada defensa.
> 8. **PLAN_COMMITS.md**: cronograma de commits naturales.
> 9. **PLAN_PRUEBAS.md**: casos de prueba ejecutados."

### Cronograma de commits (1 min) — **John**

> "Algo importante que hicimos: en lugar de subir todo el proyecto de una sola vez al repo oficial, definimos un cronograma de commits naturales que refleja el desarrollo real durante los 7 sprints. Esto le permite al profesor ver la evolución del proyecto, no solo el resultado final.
>
> El plan está en `PLAN_COMMITS.md`: por cada sprint, qué archivos subir, qué commits hacer, con mensajes alineados a Conventional Commits."

### Bugs resueltos (30 segundos) — **Santiago**

> "Resolvimos algunos bugs menores que aparecieron en testing: warnings de Cytoscape con StrictMode, el comportamiento del picker de mapa, y la redirección post-login en algunos casos. Todos están en el log del Sprint 7."

### Cierre y resumen del proyecto (1 min) — **Manuel**

> "Cerramos el proyecto con:
>
> - **246 story points** completados en **7 sprints** (14 semanas).
> - **65 issues** cerrados en Jira.
> - **13 módulos** funcionales, todos los del MVP más extras.
> - **5 reglas heurísticas** del motor Red Thread operativas.
> - **4 casos de uso** de IA implementados.
> - **9 documentos** de soporte.
> - **13 diagramas técnicos** en Mermaid.
>
> Estamos listos para la defensa final. ¿Preguntas, profesor?"

---

## 📄 Documento escrito de cierre

```markdown
# Sprint 7 — Cierre

**Período:** [Fecha] – [Fecha]

## Objetivo
Estabilizar el sistema, completar toda la documentación, ejecutar testing
exhaustivo y preparar la presentación final.

## Tareas completadas: 26 SP

| ID | Tarea | SP | Estado |
|---|---|---|---|
| NEXO-59 | Plan de pruebas | 3 | ✅ |
| NEXO-60 | Ejecutar pruebas | 5 | ✅ |
| NEXO-61 | [BUG] Cytoscape warnings | 2 | ✅ |
| NEXO-62 | Informe Técnico | 5 | ✅ |
| NEXO-63 | Diagramas finales | 3 | ✅ |
| NEXO-64 | README profesional | 2 | ✅ |
| NEXO-65 | Subir a repo oficial | 3 | ✅ |
| NEXO-66 | Preparar presentación | 3 | ✅ |

## Resultado final del proyecto

### Módulos entregados (todos completos)
- Autenticación JWT con roles
- Gestión de Personas, Vehículos, Ubicaciones, Sucesos
- Personas Desaparecidas con galería
- Motor Red Thread con 5 reglas
- Sistema de alertas
- Grafo interactivo
- Mapa táctico
- Asistente IA (4 casos de uso)
- Dashboard con métricas
- Búsqueda global
- Tema oscuro/claro

### Métricas del proyecto
- 7 sprints completados
- 246 story points entregados
- 65 issues cerrados
- 9 documentos generados
- 13 diagramas técnicos
- 95% de casos de prueba pasando

## Lecciones aprendidas globales

1. **Estimación**: mejoramos sprint a sprint. El primer sprint tuvimos
   estimaciones imprecisas, en el último éramos mucho más certeros.
2. **Code review**: empezó siendo cuello de botella, terminó siendo el
   mecanismo más útil para mantener calidad.
3. **Documentación**: documentar mientras se desarrolla es más fácil que
   al final. Aprendizaje para el siguiente proyecto.
4. **Dependencias externas**: validar APIs externas desde el primer sprint
   (caso billing de Anthropic).
5. **Trabajo en equipo**: la división de roles funcionó bien. Cada uno
   tenía áreas de fuerza pero todos contribuyeron en todos los frentes.

## Próximos pasos (post-entrega)

- Tests unitarios y de integración
- Dockerización completa
- Deploy en producción (cloud)
- App móvil React Native
```

---

# Defensa final del proyecto

## 🎤 Guión completo (15-20 minutos)

Esta es la **presentación final** que se hace cuando se entrega el proyecto al profesor. Es la suma de todo lo construido.

### Estructura sugerida

| Sección | Tiempo | Quién habla |
|---|---|---|
| 1. Apertura y contexto | 1 min | Manuel |
| 2. Problemática y objetivos | 2 min | Valeria |
| 3. Análisis de factibilidad | 2 min | John |
| 4. Demo del sistema | 8 min | Equipo (rotando) |
| 5. Stack tecnológico y decisiones | 2 min | Manuel |
| 6. Métricas del proyecto | 1 min | Manuel |
| 7. Aprendizajes y conclusiones | 2 min | Equipo (rotando) |
| 8. Preguntas del profesor | Variable | Equipo |

### Flujo de la demo (los 8 minutos clave)

> Esta es la **historia narrativa** que cubre todos los casos de uso:

1. **Login con admin2/admin123** → mostrar JWT en localStorage (DevTools).
2. **Dashboard** → señalar las 6 tarjetas de stats reales.
3. **Personas** → mostrar tabla, crear una persona TEST, abrir su detalle.
4. **Crear relación social** entre dos personas existentes.
5. **Vehículos** → cambiar estado de uno a ROBADO desde el dropdown.
6. **Ubicaciones** → marcar una como "nodo sospechoso".
7. **Sucesos** → crear un suceso vinculando vehículo robado + víctima + ubicación.
8. **Personas Desaparecidas** → reportar un caso con foto.
9. **Volver al Dashboard** → ejecutar el motor completo.
10. **Alertas** → mostrar alertas generadas, cambiar estado de una.
11. **Grafo** → abrir, mostrar nodos coloreados y aristas rojas, click en uno.
12. **Búsqueda global** → buscar nombre desde TopBar.
13. **Asistente IA** → preguntar "cuántas alertas críticas hay" → mostrar respuesta.
14. **Reporte IA** → desde una persona desaparecida, generar reporte ejecutivo.
15. **Cerrar con la frase de impacto**:

> *"Cada hilo cuenta una historia. Nexo Criminal las descubre."*

### Mensajes clave a transmitir

1. **Resolvemos un problema real** del contexto latinoamericano.
2. **Cumplimos el MVP** y excedimos su alcance con extras.
3. **Tomamos decisiones técnicas fundamentadas** (no copiamos tutoriales).
4. **Trabajamos como equipo profesional** con metodología Scrum real.
5. **Documentamos exhaustivamente** porque sabemos que el código sin contexto no sirve.
6. **Aprendimos en el camino** (humildad + crecimiento).

---

# Posibles preguntas del profesor

Lista de **preguntas que probablemente haga el profesor** y cómo responderlas con confianza.

---

### Sobre el alcance

**P: ¿Por qué no implementaron tests automatizados?**
R: "Siguiendo las indicaciones de la cátedra de priorizar funcionalidad sobre testing exhaustivo en el MVP, decidimos cubrir el sistema con un plan de pruebas manuales documentado. Está identificado como deuda técnica en el roadmap futuro: tests con JUnit 5 y Playwright."

**P: ¿Por qué Java 17 y no 21?**
R: "Porque la cátedra recomendó Java 17 LTS. Aunque Java 21 ofrece mejoras como virtual threads, no son necesarias para este proyecto y mantener compatibilidad con la consigna era prioritario."

**P: ¿Por qué no usaron Docker?**
R: "Por alcance del MVP. Docker está identificado como prioridad alta para el siguiente sprint en el roadmap. La arquitectura del sistema está diseñada para ser dockerizable sin cambios de código (Spring Boot empaqueta JAR ejecutable, frontend genera build estático, BD es estándar)."

---

### Sobre tecnologías

**P: ¿Por qué PostgreSQL y no MongoDB?**
R: "Porque el dominio criminal es altamente relacional. Personas se relacionan con vehículos, vehículos con ubicaciones, sucesos con todo. Forzar un modelo NoSQL agregaría complejidad innecesaria. Además, PostGIS habilita consultas geoespaciales que son fundamentales para el motor Red Thread."

**P: ¿Por qué reglas heurísticas y no Machine Learning?**
R: "Tres razones principales: explicabilidad (cada vínculo se justifica con una regla), datos limitados (ML requiere datasets grandes etiquetados), y aprobación legal (decisiones automatizadas con ML enfrentan más resistencia regulatoria en el ámbito policial). ML lo dejamos como capa complementaria futura."

**P: ¿Por qué Anthropic Claude y no OpenAI?**
R: "Por tres razones: mejor performance en español según benchmarks comparados, costos competitivos, y la API REST tiene una integración más limpia. Adicionalmente, Claude tiene políticas claras de privacidad que son importantes en contextos sensibles."

---

### Sobre seguridad

**P: ¿Cómo manejan la API key de Anthropic?**
R: "Se inyecta vía variable de entorno `ANTHROPIC_API_KEY`. No está commiteada en el repositorio. El `.gitignore` excluye archivos sensibles. Para producción se usaría un secrets manager como AWS Secrets Manager o HashiCorp Vault."

**P: ¿Qué pasa si alguien intercepta el JWT?**
R: "Por eso el sistema debe correr sobre HTTPS en producción. Adicionalmente, los tokens expiran en 24 horas. En el roadmap está implementar refresh tokens y rotación automática."

**P: ¿Tienen rate limiting?**
R: "No en el MVP, está identificado como deuda técnica. Para producción usaríamos `bucket4j` que se integra nativamente con Spring."

---

### Sobre el motor

**P: ¿Cómo eligieron los umbrales por defecto del motor?**
R: "Empíricamente. Generamos datos sintéticos con un script Python que simula escenarios reales (3 robos cerca de un taller, etc.) y ajustamos los parámetros hasta que las reglas detectaran exactamente esos patrones sin falsos positivos. Los umbrales son configurables vía la UI."

**P: ¿Qué pasa si el motor genera muchos falsos positivos?**
R: "Por eso son configurables. El analista puede ajustar el radio del nodo logístico, el mínimo de coincidencias, los umbrales de similitud, etc. También puede descartar alertas, lo cual el sistema registra para futuras mejoras."

**P: ¿Por qué fórmula de Haversine?**
R: "Porque es la más precisa para distancias geográficas en una esfera (la Tierra). Es estándar en GIS. PostGIS también la implementa nativamente, así que tendríamos compatibilidad si en el futuro movemos lógica al motor de la BD."

---

### Sobre el equipo

**P: ¿Cómo se organizaron como equipo?**
R: "Manuel asumió rol de Tech Lead y Scrum Master. Los 5 somos Full Stack Junior. Hicimos sprints de 2 semanas con planning, daily, review y retrospectiva. Las tareas se distribuyeron en planning según fortalezas, pero rotamos: cada uno tocó frontend, backend y base de datos en algún sprint."

**P: ¿Cuál fue su mayor bloqueo?**
R: "El bug del `LazyInitializationException` en Sprint 3. Nos costó casi un día entender la causa raíz. Aprendizaje: cuando un bug se resiste, parar el código y leer el stack trace completo, no aplicar parches a ciegas."

**P: ¿Qué harían diferente si empezaran de cero?**
R: "Validar dependencias externas desde el primer sprint (caso billing de Anthropic). Documentar mientras se desarrolla, no al final. Y arrancar con tests unitarios desde el principio, aunque sea pocos, para no acumular deuda."

---

*Documento de defensas elaborado por el equipo amarillo — Sistemas de Información II — Universidad de Oriente, Núcleo Nueva Esparta.*