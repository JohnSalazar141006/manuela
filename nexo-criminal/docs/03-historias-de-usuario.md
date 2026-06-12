# 📝 Historias de Usuario — Backlog Inicial

## Roles (personas usuarias del sistema)

| Rol | Descripción |
|---|---|
| **Analista de Inteligencia** | Analiza patrones, ejecuta el motor de vínculos y genera reportes. |
| **Investigador de Desapariciones** | Gestiona casos de personas desaparecidas. |
| **Operador de Monitoreo** | Ingresa avistamientos en tiempo real desde cámaras. |
| **Analista Forense** | Revisa patrones geográficos y temporales. |
| **Administrador** | Gestiona usuarios y configuración (fuera del MVP). |

---

## 🎯 Épicas

- **E1:** Gestión de Entidades
- **E2:** Motor de Vínculos (Red Thread Engine)
- **E3:** Visualización de Grafo
- **E4:** Alertas Inteligentes
- **E5:** Similitud de Modus Operandi
- **E6:** Autenticación y Seguridad

---

## 📋 Historias — Sprint 1 (prioridad alta)

### HU-001 — Registrar persona
**Como** Analista de Inteligencia
**Quiero** registrar una persona (víctima, sospechoso o testigo)
**Para** poder vincularla con otras entidades.

**Criterios de aceptación:**
- El formulario solicita: nombre, apellido, documento, alias, rol, fecha de nacimiento.
- El documento es único.
- Al guardar, la persona aparece en el listado.

**Estimación:** 3 puntos.

---

### HU-002 — Registrar vehículo
**Como** Analista de Inteligencia
**Quiero** registrar un vehículo
**Para** asociarlo a sucesos de robo y a sus propietarios.

**Criterios de aceptación:**
- Campos: placa, marca, modelo, año, color, estado, propietario.
- La placa es única.
- Puedo cambiar el estado del vehículo.

**Estimación:** 3 puntos.

---

### HU-003 — Registrar ubicación
**Como** Analista de Inteligencia
**Quiero** registrar una ubicación con coordenadas GPS
**Para** cruzarla con sucesos y avistamientos.

**Criterios de aceptación:**
- Campos: dirección, latitud, longitud, tipo.
- Las coordenadas son obligatorias.
- Visualización en un mapa simple (opcional en MVP).

**Estimación:** 2 puntos.

---

### HU-004 — Registrar suceso de robo de vehículo
**Como** Operador de Monitoreo
**Quiero** registrar un suceso de robo
**Para** que el sistema pueda analizarlo.

**Criterios de aceptación:**
- Campos: vehículo, fecha y hora, ubicación, última ubicación conocida, modus operandi.
- El suceso queda asociado al vehículo cambiando su estado a "robado".

**Estimación:** 5 puntos.

---

### HU-005 — Registrar desaparición de persona
**Como** Investigador de Desapariciones
**Quiero** registrar un caso de desaparición
**Para** iniciar el análisis de círculo de confianza.

**Criterios de aceptación:**
- Campos: víctima, fecha última vez vista, última ubicación, descripción.

**Estimación:** 3 puntos.

---

### HU-006 — Iniciar sesión en el sistema
**Como** usuario autorizado
**Quiero** iniciar sesión con usuario y contraseña
**Para** acceder a la plataforma.

**Criterios de aceptación:**
- Autenticación con JWT.
- Bloqueo después de 5 intentos fallidos.
- Cierre de sesión por inactividad.

**Estimación:** 5 puntos.

---

## 📋 Historias — Sprint 2

### HU-007 — Detección de Nodo Logístico (CU-A)
**Como** Analista de Inteligencia
**Quiero** que el sistema detecte automáticamente posibles deshuesaderos
**Para** generar alertas tácticas.

**Criterios de aceptación:**
- Regla: ≥ 3 vehículos robados dentro de un radio de 500 m y ventana de 2 h.
- Si hay una ubicación tipo "taller" en el radio, genera alerta.
- La alerta queda registrada y visible en dashboard.

**Estimación:** 8 puntos.

---

### HU-008 — Script Python de datos simulados
**Como** desarrollador
**Quiero** un script Python que cargue datos de prueba
**Para** demostrar el MVP con un dataset realista.

**Criterios de aceptación:**
- Script genera ≥ 50 personas, 30 vehículos, 15 ubicaciones, 20 sucesos.
- Inserta datos vía API REST o directamente en PostgreSQL.
- Documentado en el README de `/scripts`.

**Estimación:** 5 puntos.

---

### HU-009 — Visualizar grafo de vínculos
**Como** Analista de Inteligencia
**Quiero** ver un grafo interactivo con los vínculos descubiertos
**Para** comprender visualmente las relaciones.

**Criterios de aceptación:**
- Nodos coloreados por tipo.
- Aristas rojas en vínculos "Red Thread".
- Zoom y arrastre disponibles.
- Click en un nodo muestra su detalle.

**Estimación:** 8 puntos.

---

## 📋 Historias — Sprint 3

### HU-010 — Detección de intermediario crítico (CU-C)
**Como** Investigador de Desapariciones
**Quiero** encontrar a la persona que conecta a la víctima con un sospechoso
**Para** identificar a quién interrogar.

**Estimación:** 8 puntos.

---

### HU-011 — Módulo de Modus Operandi (plot twist)
**Como** Analista
**Quiero** que el sistema agrupe sucesos con método similar
**Para** detectar bandas que operan en múltiples ciudades.

**Estimación:** 13 puntos.

---

### HU-012 — Dashboard de alertas
**Como** usuario
**Quiero** ver todas las alertas activas
**Para** priorizar la atención de casos.

**Estimación:** 5 puntos.

---

## 📊 Resumen del backlog inicial

| Sprint | Historias | Puntos |
|---|---|---|
| Sprint 1 | HU-001 a HU-006 | 21 |
| Sprint 2 | HU-007 a HU-009 | 21 |
| Sprint 3 | HU-010 a HU-012 | 26 |
| **Total MVP** | **12 historias** | **68 puntos** |

---

## 📐 Criterios de priorización

Se utiliza la matriz **Valor vs. Esfuerzo**:

| Historia | Valor | Esfuerzo | Prioridad |
|---|---|---|---|
| HU-001 | Alto | Bajo | ⭐⭐⭐ |
| HU-007 (Nodo Logístico) | Altísimo | Medio | ⭐⭐⭐ |
| HU-011 (Modus Operandi) | Altísimo | Alto | ⭐⭐ |
| HU-009 (Grafo) | Alto | Medio | ⭐⭐⭐ |
