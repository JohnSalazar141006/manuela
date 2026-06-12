# 🎯 Producto Mínimo Viable (MVP)

## Filosofía del MVP

El MVP de Nexo Criminal debe demostrar el **valor central** del sistema: *descubrir un vínculo oculto entre entidades de forma automática*. Si el MVP no puede enhebrar al menos dos entidades por un hilo común, no es un MVP válido.

Siguiendo las indicaciones de la clase del 22/04:
- El MVP debe **seguir funcionando durante al menos 4 semanas**.
- Debe **estar abierto a cambios** (metodología ágil).
- Debe **enfocarse en el mayor valor posible**, no en perfección técnica.
- El testing no genera valor tangible a corto plazo, por lo que se prioriza funcionalidad.

---

## ✅ Alcance del MVP (lo que SÍ incluye)

### 1. Gestión básica de entidades (CRUD)
- Registrar **Personas** (víctimas, sospechosos, testigos).
- Registrar **Vehículos** (con placa, marca, modelo, estado).
- Registrar **Ubicaciones** (dirección, lat/lng, tipo).
- Registrar **Sucesos** (robo de vehículo, desaparición, avistamiento).

### 2. Motor de vínculos — reglas mínimas
- **Regla temporal-geográfica:** detectar si dos o más sucesos ocurrieron en un radio configurable y ventana temporal.
- **Regla de círculo social:** detectar si dos personas tienen un contacto en común.
- **Regla de modus operandi:** agrupar sucesos que compartan el mismo método delictivo.

### 3. Visualización básica del grafo
- Pantalla que muestra un nodo seleccionado y sus vínculos de primer grado.
- Nodos diferenciados por color según tipo.
- Aristas rojas (el "hilo rojo") entre nodos vinculados.

### 4. Alertas simples
- Notificación en el dashboard cuando se detecta un nodo logístico.

### 5. Autenticación básica
- Login con usuario y contraseña.
- Un único rol: "Analista".

---

## ❌ Fuera del alcance del MVP

Estos puntos quedan para iteraciones posteriores:
- Roles avanzados (administrador, supervisor, auditor).
- Importación masiva desde CSV/Excel desde UI.
- Integración real con cámaras, GPS o telefonía.
- Reportes PDF automatizados.
- Módulo móvil.
- Machine Learning (los vínculos se descubren con reglas determinísticas).
- Notificaciones por correo o SMS.

---

## 📊 Criterios de éxito del MVP

El MVP se considera exitoso si un analista puede:

1. Cargar 10 vehículos robados, 5 personas y 3 ubicaciones en menos de 15 minutos.
2. Ejecutar el motor de vínculos y obtener al menos un "hilo rojo" descubierto automáticamente.
3. Ver el grafo resultante en pantalla.
4. Recibir una alerta cuando se cumple la regla del nodo logístico.

---

## 🗓️ Plan de entregas del MVP (4 semanas)

| Semana | Entregable |
|---|---|
| 1 | Repositorio listo, BD creada, CRUD de Personas y Vehículos funcional. |
| 2 | CRUD de Ubicaciones y Sucesos. Script Python para cargar datos simulados. |
| 3 | Motor de vínculos (reglas 1 y 3). Primera pantalla de grafo. |
| 4 | Regla del círculo social. Alertas. Demo integrada. |

---

## 🚦 Definition of Done (DoD)

Una historia de usuario está "hecha" cuando:
- [ ] El código está en la rama `develop`.
- [ ] La funcionalidad se demostró en ambiente local.
- [ ] Existe documentación básica en el README del módulo.
- [ ] El Product Owner aprobó la demo.

---

## 🎬 Escenario de Demo para la Presentación

**Historia a contar:** "En una ciudad hipotética, tres camionetas fueron reportadas como robadas en las últimas 24 horas. El sistema descubre que las tres tuvieron su última ubicación conocida cerca del mismo taller. Dispara una alerta de Nodo Logístico. Al abrir el grafo, el analista ve un taller rodeado de tres vehículos enhebrados en rojo. Luego carga una desaparición y el sistema revela que la víctima comparte un contacto en común con un sospechoso previamente registrado."

Esta narrativa cubre **los 4 casos de uso + el plot twist** y se completa en **5 minutos de demo**.
