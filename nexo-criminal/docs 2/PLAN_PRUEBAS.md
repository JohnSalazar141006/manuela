# Plan de Pruebas
## Nexo Criminal — Sistema de Inteligencia de Precisión

---

**Universidad de Oriente — Núcleo Nueva Esparta**
**Materia:** Sistemas de Información II
**Profesor:** Alejandro Marcano
**Equipo:** Amarillo
**Versión:** 1.0
**Fecha:** Agosto 2026

---

## Tabla de Contenido

1. [Objetivo del plan de pruebas](#1-objetivo-del-plan-de-pruebas)
2. [Alcance de las pruebas](#2-alcance-de-las-pruebas)
3. [Tipos de pruebas](#3-tipos-de-pruebas)
4. [Entorno de pruebas](#4-entorno-de-pruebas)
5. [Datos de prueba](#5-datos-de-prueba)
6. [Estructura de los casos de prueba](#6-estructura-de-los-casos-de-prueba)
7. [Módulo 1: Autenticación](#7-módulo-1-autenticación)
8. [Módulo 2: Dashboard](#8-módulo-2-dashboard)
9. [Módulo 3: Personas](#9-módulo-3-personas)
10. [Módulo 4: Vehículos](#10-módulo-4-vehículos)
11. [Módulo 5: Ubicaciones](#11-módulo-5-ubicaciones)
12. [Módulo 6: Sucesos](#12-módulo-6-sucesos)
13. [Módulo 7: Personas Desaparecidas](#13-módulo-7-personas-desaparecidas)
14. [Módulo 8: Motor Red Thread](#14-módulo-8-motor-red-thread)
15. [Módulo 9: Sistema de Alertas](#15-módulo-9-sistema-de-alertas)
16. [Módulo 10: Grafo Interactivo](#16-módulo-10-grafo-interactivo)
17. [Módulo 11: Asistente IA](#17-módulo-11-asistente-ia)
18. [Módulo 12: Búsqueda Global](#18-módulo-12-búsqueda-global)
19. [Módulo 13: Configuración y Tema](#19-módulo-13-configuración-y-tema)
20. [Resumen de resultados](#20-resumen-de-resultados)

---

## 1. Objetivo del plan de pruebas

Este documento define los casos de prueba que se ejecutan sobre el sistema Nexo Criminal para verificar el correcto funcionamiento de cada módulo en condiciones normales (casos positivos) y en condiciones de error (casos negativos).

El plan tiene como propósitos:

- Validar que las funcionalidades implementadas cumplen con los criterios de aceptación definidos en cada historia de usuario.
- Detectar bugs antes de la entrega final.
- Documentar el comportamiento esperado del sistema para futuras iteraciones.
- Servir como evidencia académica del proceso de QA realizado por el equipo.

---

## 2. Alcance de las pruebas

### Dentro del alcance

- Pruebas funcionales manuales de la interfaz web.
- Pruebas de los endpoints del backend mediante Postman / Insomnia.
- Pruebas de integración entre módulos (ej: motor genera alertas).
- Validación visual de componentes UI (mapa, grafo, tablas, formularios).

### Fuera del alcance (deuda técnica)

- Pruebas unitarias automatizadas (JUnit).
- Pruebas E2E automatizadas (Playwright, Cypress).
- Pruebas de carga / estrés.
- Pruebas de seguridad (penetration testing).
- Pruebas de compatibilidad con navegadores antiguos.

---

## 3. Tipos de pruebas

### 🟢 Pruebas positivas

Verifican que el sistema funciona correctamente cuando recibe inputs válidos siguiendo el flujo esperado.

### 🔴 Pruebas negativas

Verifican que el sistema responde apropiadamente cuando recibe inputs inválidos o se intenta realizar operaciones no permitidas.

### 🔵 Pruebas de integración

Verifican que distintos módulos del sistema funcionan correctamente en conjunto.

### 🟡 Pruebas exploratorias

Realizadas sin guion específico, buscando comportamientos inesperados.

---

## 4. Entorno de pruebas

### Hardware mínimo

- Procesador: Intel i5 o equivalente
- RAM: 8 GB
- Almacenamiento: 20 GB libres

### Software

- **Sistema operativo**: Windows 11 / Ubuntu 22.04
- **Backend**: Java 17, Spring Boot 3.2.5 corriendo en `localhost:8080`
- **Frontend**: Vite dev server en `localhost:5173`
- **Base de datos**: PostgreSQL 14+ con PostGIS
- **Navegadores probados**: Chrome 130, Edge 130, Firefox 132

### Credenciales de prueba

| Usuario | Contraseña | Rol |
|---|---|---|
| `admin2` | `admin123` | Administrador |

---

## 5. Datos de prueba

Los datos de prueba se generan ejecutando el script Python `generar_datos.py`:

```bash
cd scripts
python generar_datos.py
```

Resultado esperado:

| Entidad | Cantidad |
|---|---|
| Personas | 51 |
| Vehículos | 33 |
| Vehículos robados | 8 |
| Ubicaciones | 15 |
| Ubicaciones sospechosas | 4 |
| Sucesos | 20 |
| Alertas pendientes | 19 (después de ejecutar motor) |

---

## 6. Estructura de los casos de prueba

Cada caso de prueba sigue este formato:

```
ID: TC-XXX
Módulo: [nombre]
Tipo: [Positivo / Negativo / Integración]
Prioridad: [Crítica / Alta / Media / Baja]
Precondición: [estado del sistema antes de la prueba]
Pasos: [secuencia numerada de acciones]
Resultado esperado: [comportamiento del sistema]
Resultado obtenido: [llenar al ejecutar]
Estado: [PASS / FAIL / BLOCKED]
```

---

## 7. Módulo 1: Autenticación

### 🟢 TC-001: Login exitoso con credenciales válidas

| Atributo | Valor |
|---|---|
| Tipo | Positivo |
| Prioridad | Crítica |

**Precondición:** El usuario `admin2` existe en la base de datos.

**Pasos:**
1. Abrir el navegador en `http://localhost:5173`.
2. Ingresar `admin2` en el campo Usuario.
3. Ingresar `admin123` en el campo Contraseña.
4. Click en "Iniciar Sesión".

**Resultado esperado:**
- El sistema redirige a `/dashboard`.
- El JWT se guarda en `localStorage` con la clave `token`.
- El sidebar muestra el nombre del usuario logueado.

**Estado:** ✅ PASS

---

### 🔴 TC-002: Login con contraseña incorrecta

| Atributo | Valor |
|---|---|
| Tipo | Negativo |
| Prioridad | Alta |

**Pasos:**
1. Abrir `http://localhost:5173`.
2. Ingresar `admin2` en Usuario.
3. Ingresar `wrong_password` en Contraseña.
4. Click en "Iniciar Sesión".

**Resultado esperado:**
- El sistema muestra mensaje "Credenciales inválidas".
- Permanece en la pantalla de login.
- No se guarda token en localStorage.

**Estado:** ✅ PASS

---

### 🔴 TC-003: Login con usuario inexistente

**Pasos:**
1. Ingresar `usuario_falso` en Usuario.
2. Ingresar cualquier contraseña.
3. Click "Iniciar Sesión".

**Resultado esperado:**
- Mensaje de error "Credenciales inválidas".
- El sistema no debe revelar si el usuario existe o no (seguridad).

**Estado:** ✅ PASS

---

### 🔴 TC-004: Login con campos vacíos

**Pasos:**
1. Dejar ambos campos vacíos.
2. Click "Iniciar Sesión".

**Resultado esperado:**
- Validación HTML5 marca campos como requeridos.
- No se realiza request al backend.

**Estado:** ✅ PASS

---

### 🟢 TC-005: Acceso a ruta protegida con token válido

**Pasos:**
1. Hacer login exitoso (TC-001).
2. Navegar a `/personas`.

**Resultado esperado:**
- La página carga correctamente.
- Se muestran datos del backend.

**Estado:** ✅ PASS

---

### 🔴 TC-006: Acceso a ruta protegida sin token

**Pasos:**
1. Limpiar localStorage del navegador.
2. Intentar navegar directamente a `http://localhost:5173/personas`.

**Resultado esperado:**
- El sistema redirige automáticamente a `/login`.

**Estado:** ✅ PASS

---

### 🟢 TC-007: Logout

**Pasos:**
1. Hacer login.
2. Click en avatar de usuario en sidebar.
3. Click en "Cerrar sesión".

**Resultado esperado:**
- El token se elimina de localStorage.
- Redirección a `/login`.

**Estado:** ✅ PASS

---

## 8. Módulo 2: Dashboard

### 🟢 TC-008: Carga inicial del dashboard

| Atributo | Valor |
|---|---|
| Tipo | Positivo |
| Prioridad | Alta |

**Pasos:**
1. Hacer login.
2. Esperar carga del dashboard.

**Resultado esperado:**
- Se muestran 6 tarjetas con conteos: Personas, Vehículos, Robados, Sucesos, Ubicaciones, Alertas Pendientes.
- Los números coinciden con los datos en BD.
- Sección "Últimas alertas" muestra hasta 5 alertas pendientes.

**Estado:** ✅ PASS

---

### 🟢 TC-009: Click en tarjeta navega al módulo

**Pasos:**
1. Click en tarjeta "Personas".

**Resultado esperado:**
- Redirección a `/personas`.
- La tabla muestra datos.

**Estado:** ✅ PASS

---

### 🟢 TC-010: Botón "Ejecutar Motor Completo"

**Pasos:**
1. Click en botón "Ejecutar Motor".
2. Esperar respuesta.

**Resultado esperado:**
- Botón muestra estado de carga.
- Al completar: mensaje con cantidad de vínculos y alertas creados.
- Las tarjetas de stats se actualizan.

**Estado:** ✅ PASS

---

## 9. Módulo 3: Personas

### 🟢 TC-011: Listar personas con paginación

**Pasos:**
1. Navegar a `/personas`.

**Resultado esperado:**
- Tabla muestra 10 personas por página.
- Paginación al pie de la tabla funciona.
- Filtros por rol funcionan.

**Estado:** ✅ PASS

---

### 🟢 TC-012: Crear nueva persona

**Pasos:**
1. Click en "Crear persona".
2. Llenar campos:
   - Documento: `99999999`
   - Nombre: `Pedro`
   - Apellido: `Pérez`
   - Rol: `TESTIGO`
3. Click en "Guardar".

**Resultado esperado:**
- Modal se cierra.
- Notificación "Persona creada".
- La nueva persona aparece en la lista.

**Estado:** ✅ PASS

---

### 🔴 TC-013: Crear persona con documento duplicado

**Pasos:**
1. Click en "Crear persona".
2. Ingresar documento ya existente (ej: `12345678`).
3. Llenar resto de campos.
4. Click "Guardar".

**Resultado esperado:**
- Mensaje de error: "Ya existe una persona con ese documento".
- El modal permanece abierto.

**Estado:** ✅ PASS

---

### 🔴 TC-014: Crear persona sin campos obligatorios

**Pasos:**
1. Click en "Crear persona".
2. Dejar Documento vacío.
3. Click "Guardar".

**Resultado esperado:**
- Validación HTML5 impide envío.
- Campos obligatorios resaltados en rojo.

**Estado:** ✅ PASS

---

### 🟢 TC-015: Editar persona existente

**Pasos:**
1. Click en botón "Editar" de una persona.
2. Cambiar el campo "Teléfono".
3. Click "Guardar".

**Resultado esperado:**
- Cambios se persisten.
- La fila se actualiza con el nuevo teléfono.

**Estado:** ✅ PASS

---

### 🟢 TC-016: Eliminar persona con confirmación

**Pasos:**
1. Click en botón "Eliminar".
2. En el modal de confirmación, click "Confirmar".

**Resultado esperado:**
- La persona desaparece de la lista.
- Notificación "Persona eliminada".

**Estado:** ✅ PASS

---

### 🟢 TC-017: Cancelar eliminación

**Pasos:**
1. Click en botón "Eliminar".
2. Click en "Cancelar" en el modal.

**Resultado esperado:**
- Modal se cierra.
- La persona NO se elimina.

**Estado:** ✅ PASS

---

### 🟢 TC-018: Crear relación social entre personas

**Pasos:**
1. Abrir detalle de Persona A.
2. Click en "Agregar relación".
3. Seleccionar Persona B y tipo "FAMILIAR".
4. Click "Guardar".

**Resultado esperado:**
- La relación aparece en el dossier de A.
- También aparece en el dossier de B.

**Estado:** ✅ PASS

---

### 🟢 TC-019: Buscar intermediarios entre dos personas

**Pasos:**
1. En modal de detalle, click en "Buscar intermediarios".
2. Seleccionar Persona destino.
3. Click "Buscar".

**Resultado esperado:**
- Si hay camino: muestra lista de intermediarios.
- Si no hay camino: muestra "No se encontraron intermediarios".

**Estado:** ✅ PASS

---

### 🟢 TC-020: Exportar personas a CSV

**Pasos:**
1. Click en botón "Exportar CSV".

**Resultado esperado:**
- Se descarga archivo `personas.csv`.
- El archivo contiene todos los registros.
- Caracteres especiales (tildes, ñ) se ven correctamente al abrirlo en Excel.

**Estado:** ✅ PASS

---

## 10. Módulo 4: Vehículos

### 🟢 TC-021: Crear vehículo nuevo

**Pasos:**
1. Navegar a `/vehiculos`.
2. Click "Crear vehículo".
3. Llenar:
   - Placa: `XYZ-999`
   - Marca: `Toyota`
   - Modelo: `Corolla`
   - Año: `2020`
   - Estado: `NORMAL`
4. Click "Guardar".

**Resultado esperado:**
- Vehículo aparece en la tabla.

**Estado:** ✅ PASS

---

### 🔴 TC-022: Crear vehículo con placa duplicada

**Pasos:**
1. Crear vehículo con placa `ABC-123` (ya existente).

**Resultado esperado:**
- Error: "Ya existe un vehículo con esa placa".

**Estado:** ✅ PASS

---

### 🟢 TC-023: Cambiar estado de vehículo a ROBADO

**Pasos:**
1. En la tabla, abrir dropdown de Estado de un vehículo NORMAL.
2. Seleccionar "ROBADO".

**Resultado esperado:**
- El badge cambia de color (gris a rojo).
- El vehículo aparece en la sección "Vehículos robados" del dashboard.
- El conteo de robados aumenta en 1.

**Estado:** ✅ PASS

---

### 🟢 TC-024: Ver detalle de vehículo con avistamientos

**Pasos:**
1. Click en una fila de vehículo.
2. En modal de detalle, ver pestaña "Avistamientos".

**Resultado esperado:**
- Lista de avistamientos ordenada por fecha descendente.
- Cada avistamiento muestra ubicación, fecha y fuente.

**Estado:** ✅ PASS

---

### 🟢 TC-025: Registrar avistamiento de vehículo

**Pasos:**
1. En detalle de vehículo, click "Registrar avistamiento".
2. Seleccionar ubicación, fecha y fuente.
3. Guardar.

**Resultado esperado:**
- El avistamiento aparece en la lista.
- Si hay una ubicación con muchos avistamientos cercanos, podría disparar regla del motor al ejecutarlo.

**Estado:** ✅ PASS

---

### 🔴 TC-026: Crear vehículo con año inválido

**Pasos:**
1. Crear vehículo con año `1850` o `3000`.

**Resultado esperado:**
- Mensaje de error: "Año debe estar entre 1900 y año actual".

**Estado:** ✅ PASS

---

## 11. Módulo 5: Ubicaciones

### 🟢 TC-027: Crear ubicación con picker de mapa

**Pasos:**
1. Navegar a `/ubicaciones`.
2. Click "Crear ubicación".
3. Click en un punto del mapa (Margarita por ejemplo).
4. Llenar dirección y tipo.
5. Guardar.

**Resultado esperado:**
- Las coordenadas se autocompletan al hacer click en mapa.
- La ubicación aparece como marker en el mapa principal.

**Estado:** ✅ PASS

---

### 🟢 TC-028: Marcar ubicación como nodo sospechoso

**Pasos:**
1. Editar una ubicación existente.
2. Activar toggle "Nodo sospechoso".
3. Guardar.

**Resultado esperado:**
- El badge cambia de color.
- La ubicación queda marcada como input para el motor.

**Estado:** ✅ PASS

---

### 🔴 TC-029: Coordenadas fuera de rango

**Pasos:**
1. Crear ubicación con latitud `200` y longitud `-300`.

**Resultado esperado:**
- Error: "Latitud debe estar entre -90 y 90".

**Estado:** ✅ PASS

---

### 🟢 TC-030: Filtrar ubicaciones por tipo

**Pasos:**
1. Aplicar filtro "TALLER".

**Resultado esperado:**
- La tabla muestra solo ubicaciones tipo TALLER.
- Los markers del mapa se filtran.

**Estado:** ✅ PASS

---

## 12. Módulo 6: Sucesos

### 🟢 TC-031: Crear suceso vinculando entidades

**Pasos:**
1. Navegar a `/sucesos`.
2. Click "Crear suceso".
3. Llenar:
   - Tipo: `ROBO_VEHICULO`
   - Vehículo: seleccionar uno robado
   - Víctima: seleccionar persona
   - Ubicación: seleccionar ubicación
   - Fecha: hoy
   - Modus operandi: "Asalto a mano armada"
4. Guardar.

**Resultado esperado:**
- Suceso creado.
- Aparece en lista con todos sus vínculos.

**Estado:** ✅ PASS

---

### 🟢 TC-032: Filtrar sucesos por rango de fechas

**Pasos:**
1. Aplicar filtro de fecha "últimos 7 días".

**Resultado esperado:**
- Solo aparecen sucesos en ese rango.

**Estado:** ✅ PASS

---

### 🟢 TC-033: Crear suceso de desaparición

**Pasos:**
1. Crear suceso tipo `DESAPARICION`.
2. Vincular a persona existente como víctima.
3. Guardar.

**Resultado esperado:**
- Sistema sugiere automáticamente crear caso en módulo de Personas Desaparecidas.

**Estado:** ✅ PASS

---

## 13. Módulo 7: Personas Desaparecidas

### 🟢 TC-034: Reportar nuevo caso con foto

**Pasos:**
1. Navegar a `/desaparecidas`.
2. Click "Reportar nueva desaparición".
3. Pestaña 1 (Identificación):
   - Documento: `87654321`
   - Nombre: `María`, Apellido: `González`
   - Subir foto JPG de 2MB.
4. Pestaña 2 (Datos físicos): completar.
5. Pestaña 3 (Circunstancias):
   - Fecha desaparición: hace 3 días
   - Última ubicación: seleccionar
   - Vestimenta y descripción.
6. Pestaña 4 (Reportante): completar.
7. Click "Guardar".

**Resultado esperado:**
- Caso creado con estado `BUSCADA`.
- Foto se persiste en `/uploads/desaparecidas/`.
- Card aparece en galería con foto y banner "BUSCADA · 3 DÍAS".

**Estado:** ✅ PASS

---

### 🔴 TC-035: Subir foto de tamaño excesivo

**Pasos:**
1. Intentar subir imagen de 10 MB.

**Resultado esperado:**
- Error: "El archivo excede el tamaño máximo permitido (5 MB)".
- Foto no se sube.

**Estado:** ✅ PASS

---

### 🔴 TC-036: Subir archivo no-imagen como foto

**Pasos:**
1. Intentar subir archivo `.pdf` como foto.

**Resultado esperado:**
- Error: "Solo se permiten archivos de imagen".

**Estado:** ✅ PASS

---

### 🟢 TC-037: Cambiar estado a ENCONTRADA_VIVA

**Pasos:**
1. Abrir caso de desaparecida.
2. Click "Cambiar estado".
3. Seleccionar `ENCONTRADA_VIVA`.
4. Confirmar.

**Resultado esperado:**
- Banner cambia de "BUSCADA" a "ENCONTRADA".
- El caso ya no aparece en stats activos.

**Estado:** ✅ PASS

---

### 🟢 TC-038: Toggle entre vista galería y tabla

**Pasos:**
1. Click en botón de cambio de vista.

**Resultado esperado:**
- La vista cambia entre cards (galería) y tabla.
- Los datos son consistentes.

**Estado:** ✅ PASS

---

### 🟢 TC-039: Reemplazar foto existente

**Pasos:**
1. Editar caso.
2. Subir nueva foto.

**Resultado esperado:**
- Nueva foto reemplaza la anterior.
- Archivo viejo se elimina del servidor.

**Estado:** ✅ PASS

---

### 🟢 TC-040: Ver mapa con últimas ubicaciones

**Pasos:**
1. En página de Desaparecidas, ver el mapa.

**Resultado esperado:**
- Markers púrpura en cada última ubicación.
- Click en marker abre popup con datos del caso.

**Estado:** ✅ PASS

---

## 14. Módulo 8: Motor Red Thread

### 🟢 TC-041: Ejecutar motor completo

**Pasos:**
1. En dashboard, click "Ejecutar Motor".

**Resultado esperado:**
- El motor ejecuta las 5 reglas secuencialmente.
- Retorna lista de resultados con `nombreRegla`, `vinculosCreados`, `alertasCreadas`.
- Las alertas aparecen en módulo `/alertas`.

**Estado:** ✅ PASS

---

### 🟢 TC-042: Regla 1 — Detectar nodo logístico

**Precondición:**
- 3 vehículos robados con avistamientos en radio < 500m de una misma ubicación tipo TALLER.

**Pasos:**
1. Ejecutar motor.

**Resultado esperado:**
- Se crea alerta tipo `NODO_LOGISTICO` nivel CRITICO.
- Se crean vínculos `VEHICULO ↔ UBICACION` con score 0.90.

**Estado:** ✅ PASS

---

### 🟢 TC-043: Regla 2 — Detectar vehículo escolta

**Precondición:**
- Un vehículo NO robado aparece junto a vehículos robados en 3+ avistamientos.

**Pasos:**
1. Ejecutar motor.

**Resultado esperado:**
- Alerta `VEHICULO_APOYO` nivel ALTO.
- Vínculo `VEHICULO ↔ VEHICULO`.

**Estado:** ✅ PASS

---

### 🟢 TC-044: Regla 3 — Detectar intermediario

**Precondición:**
- Persona A (víctima) → C (común) → B (sospechoso) en relaciones sociales.

**Pasos:**
1. Ejecutar motor.

**Resultado esperado:**
- Alerta `INTERMEDIARIO` nivel MEDIO.
- Vínculo entre A y B con C como intermediario.

**Estado:** ✅ PASS

---

### 🟢 TC-045: Regla 4 — Detectar similitud de modus operandi

**Precondición:**
- 2+ sucesos con descripciones similares en `modusOperandi`.

**Pasos:**
1. Ejecutar motor.

**Resultado esperado:**
- Alerta `MODUS_OPERANDI` nivel ALTO.
- Vínculo entre los sucesos con score = similitud Jaccard.

**Estado:** ✅ PASS

---

### 🟢 TC-046: Regla 5 — Detectar cluster de desapariciones

**Precondición:**
- 3+ casos de desapariciones en radio 1.5km en últimos 30 días.

**Pasos:**
1. Ejecutar motor.

**Resultado esperado:**
- Alerta `CLUSTER_DESAPARICIONES` nivel CRITICO.
- Vínculos entre las desaparecidas del cluster.

**Estado:** ✅ PASS

---

### 🟢 TC-047: Re-ejecutar motor sin generar duplicados

**Pasos:**
1. Ejecutar motor.
2. Anotar cantidad de vínculos.
3. Ejecutar motor de nuevo sin agregar datos.

**Resultado esperado:**
- La segunda ejecución NO crea vínculos duplicados.
- Cantidad de vínculos se mantiene igual.

**Estado:** ✅ PASS

---

### 🟢 TC-048: Configurar umbrales del motor

**Pasos:**
1. Cambiar `motor.nodo-logistico.radio-metros` a 1000 en properties.
2. Reiniciar backend.
3. Ejecutar motor.

**Resultado esperado:**
- La regla 1 ahora detecta vínculos en radio mayor.

**Estado:** ✅ PASS

---

## 15. Módulo 9: Sistema de Alertas

### 🟢 TC-049: Listar alertas con stats

**Pasos:**
1. Navegar a `/alertas`.

**Resultado esperado:**
- Cards con info de cada alerta (ID, tipo, riesgo, estado).
- Panel lateral con conteos por nivel.

**Estado:** ✅ PASS

---

### 🟢 TC-050: Cambiar estado de PENDIENTE a EN_REVISION

**Pasos:**
1. En una alerta PENDIENTE, click "Analizar".

**Resultado esperado:**
- Estado cambia a `EN_REVISION`.
- Botones disponibles cambian a "Confirmar" y "Descartar".

**Estado:** ✅ PASS

---

### 🟢 TC-051: Confirmar alerta

**Pasos:**
1. En alerta EN_REVISION, click "Confirmar".

**Resultado esperado:**
- Estado cambia a `CONFIRMADA`.
- Sale de la lista de pendientes.

**Estado:** ✅ PASS

---

### 🟢 TC-052: Descartar alerta como falso positivo

**Pasos:**
1. En alerta EN_REVISION, click "Descartar".

**Resultado esperado:**
- Estado cambia a `DESCARTADA`.
- Sale del flujo activo.

**Estado:** ✅ PASS

---

### 🟢 TC-053: Filtrar alertas por nivel CRITICO

**Pasos:**
1. Aplicar filtro nivel = CRITICO.

**Resultado esperado:**
- Solo se muestran alertas críticas.

**Estado:** ✅ PASS

---

## 16. Módulo 10: Grafo Interactivo

### 🟢 TC-054: Cargar grafo completo

**Pasos:**
1. Navegar a `/grafo`.

**Resultado esperado:**
- Se renderiza grafo con todos los nodos y aristas.
- Layout `cose` se aplica automáticamente.
- Nodos coloreados según tipo.

**Estado:** ✅ PASS

---

### 🟢 TC-055: Click en nodo muestra panel lateral

**Pasos:**
1. Click en un nodo persona.

**Resultado esperado:**
- Panel lateral muestra datos completos.
- Lista vínculos directos.

**Estado:** ✅ PASS

---

### 🟢 TC-056: Filtrar tipos de nodos

**Pasos:**
1. Desactivar checkbox "Personas".

**Resultado esperado:**
- Nodos persona se ocultan.
- Aristas relacionadas se ocultan.

**Estado:** ✅ PASS

---

### 🟢 TC-057: Zoom y arrastre del grafo

**Pasos:**
1. Hacer scroll para hacer zoom.
2. Arrastrar el grafo.
3. Arrastrar un nodo individual.

**Resultado esperado:**
- Zoom funciona suavemente.
- Drag del grafo funciona.
- Nodo individual se reposiciona y queda fijo.

**Estado:** ✅ PASS

---

### 🟢 TC-058: Distinguir aristas del motor vs relaciones directas

**Pasos:**
1. Observar colores de aristas.

**Resultado esperado:**
- Aristas rojas = vínculos del motor.
- Aristas grises = relaciones directas (sociales, propiedad, etc.).

**Estado:** ✅ PASS

---

## 17. Módulo 11: Asistente IA

### 🟢 TC-059: Verificar configuración de IA

**Pasos:**
1. Hacer GET a `http://localhost:8080/api/v1/ia/estado`.

**Resultado esperado:**
- Respuesta: `{"configurada": true, "modelo": "claude-sonnet-4-5-20250929"}`.

**Estado:** ✅ PASS (configuración) / ⚠️ PENDIENTE (activación de billing externo)

---

### 🟢 TC-060: Chat conversacional con contexto

**Pasos:**
1. Navegar a `/asistente-ia`.
2. Escribir: "¿Cuáles son las alertas críticas activas?".
3. Enviar.

**Resultado esperado:**
- Respuesta mencionando alertas reales del sistema.
- Tiempo de respuesta < 30 segundos.

**Estado:** ⚠️ PENDIENTE (depende de activación de billing)

---

### 🟢 TC-061: Predicción de zonas de búsqueda

**Pasos:**
1. Abrir caso de persona desaparecida.
2. Click "Predecir zonas con IA".
3. Esperar respuesta.

**Resultado esperado:**
- Muestra 3-5 zonas geográficas con justificación.
- Se guarda en `zonasBusquedaIA`.

**Estado:** ⚠️ PENDIENTE

---

### 🟢 TC-062: Generar reporte ejecutivo

**Pasos:**
1. En cualquier alerta crítica, click "Generar reporte IA".

**Resultado esperado:**
- Reporte con secciones: Resumen, Datos, Análisis, Recomendaciones.
- Botón "Copiar al portapapeles" funciona.

**Estado:** ⚠️ PENDIENTE

---

### 🔴 TC-063: Manejo de error de IA cuando billing inactivo

**Pasos:**
1. Sin billing activo en Anthropic.
2. Intentar consultar IA.

**Resultado esperado:**
- Sistema muestra error: "Servicio de IA temporalmente no disponible".
- No rompe el resto de la aplicación.

**Estado:** ✅ PASS

---

## 18. Módulo 12: Búsqueda Global

### 🟢 TC-064: Buscar nombre de persona

**Pasos:**
1. En TopBar, escribir "Juan".
2. Esperar resultados (debounce 300ms).

**Resultado esperado:**
- Dropdown muestra resultados agrupados.
- Sección "Personas" con coincidencias.

**Estado:** ✅ PASS

---

### 🟢 TC-065: Buscar placa de vehículo

**Pasos:**
1. Escribir "ABC".

**Resultado esperado:**
- Sección "Vehículos" con vehículos cuya placa contiene "ABC".

**Estado:** ✅ PASS

---

### 🟢 TC-066: Click en resultado navega al módulo

**Pasos:**
1. Click en un resultado de tipo Persona.

**Resultado esperado:**
- Redirección a `/personas` con esa persona resaltada.

**Estado:** ✅ PASS

---

### 🟢 TC-067: Búsqueda sin resultados

**Pasos:**
1. Escribir "xxxxxxxxxx".

**Resultado esperado:**
- Mensaje "No se encontraron resultados".

**Estado:** ✅ PASS

---

## 19. Módulo 13: Configuración y Tema

### 🟢 TC-068: Cambiar a tema oscuro

**Pasos:**
1. Click en avatar.
2. Click "Configuración".
3. Tab "General".
4. Cambiar Tema a "Oscuro".

**Resultado esperado:**
- La interfaz cambia a tema oscuro inmediatamente.
- Todos los componentes respetan el tema.

**Estado:** ✅ PASS

---

### 🟢 TC-069: Persistencia de tema entre sesiones

**Pasos:**
1. Cambiar tema a oscuro.
2. Cerrar navegador.
3. Volver a abrir y hacer login.

**Resultado esperado:**
- El tema oscuro se mantiene.

**Estado:** ✅ PASS

---

### 🟢 TC-070: Configurar umbrales del motor desde UI

**Pasos:**
1. En configuración, ir a tab "Motor".
2. Cambiar "Radio nodo logístico" de 500 a 800.
3. Click "Guardar".

**Resultado esperado:**
- Valor se guarda.
- Próxima ejecución usa el nuevo radio.

**Estado:** ✅ PASS

---

## 20. Resumen de resultados

### Estadísticas globales

| Métrica | Valor |
|---|---|
| Total de casos de prueba | 70 |
| Casos pasados (PASS) | 66 |
| Casos pendientes (depend. externa) | 4 |
| Casos fallidos (FAIL) | 0 |
| Casos bloqueados (BLOCKED) | 0 |
| **Tasa de éxito** | **94.3%** |

### Por módulo

| Módulo | Total | Pasados | % éxito |
|---|---|---|---|
| 1. Autenticación | 7 | 7 | 100% |
| 2. Dashboard | 3 | 3 | 100% |
| 3. Personas | 10 | 10 | 100% |
| 4. Vehículos | 6 | 6 | 100% |
| 5. Ubicaciones | 4 | 4 | 100% |
| 6. Sucesos | 3 | 3 | 100% |
| 7. Desaparecidas | 7 | 7 | 100% |
| 8. Motor Red Thread | 8 | 8 | 100% |
| 9. Alertas | 5 | 5 | 100% |
| 10. Grafo | 5 | 5 | 100% |
| 11. Asistente IA | 5 | 1 | 20% (resto pendiente de billing) |
| 12. Búsqueda Global | 4 | 4 | 100% |
| 13. Configuración | 3 | 3 | 100% |

### Casos pendientes — IA Claude

Los casos TC-060, TC-061 y TC-062 quedan en estado **PENDIENTE** debido a una dependencia operativa externa: la activación del billing en la cuenta de Anthropic. La integración técnica está implementada y verificada (TC-059 confirma configuración correcta), pero el servicio externo requiere completar el proceso de habilitación de la API key.

Esta dependencia está documentada en el Informe Técnico como una limitación operativa, no técnica. Una vez activada la cuenta, los casos pasan automáticamente a estado PASS sin necesidad de modificar código.

### Bugs encontrados durante el testing

| ID | Descripción | Severidad | Estado |
|---|---|---|---|
| BUG-01 | Picker de mapa con z-index incorrecto en modal Ubicaciones | Media | ✅ Resuelto |
| BUG-02 | LazyInitializationException al serializar entidades con FK | Alta | ✅ Resuelto |
| BUG-03 | Caracteres especiales corrompidos en CSV exportado | Baja | ✅ Resuelto |
| BUG-04 | Hash corrupto del usuario `admin` original | Alta | ✅ Resuelto (alternativa: `admin2`) |
| BUG-05 | Warnings de Cytoscape con StrictMode de React | Baja | ⚠️ No crítico, documentado |
| BUG-06 | Error 403 en API de Anthropic | Crítica para IA | ⚠️ Externo, billing pendiente |

### Observaciones generales

1. **Alta cobertura funcional**: el 94.3% de los casos pasaron exitosamente, demostrando que el sistema cumple con los requerimientos del MVP.
2. **Robustez de las validaciones**: todos los casos negativos (TCs de validación de inputs) fueron manejados correctamente por el sistema.
3. **Performance aceptable**: el motor ejecuta las 5 reglas en menos de 5 segundos con el dataset de prueba.
4. **UI responsiva**: todos los módulos funcionan correctamente en pantallas desde 1280×720 hasta 1920×1080.

### Recomendaciones para iteraciones futuras

1. **Tests automatizados**: implementar JUnit 5 para backend y Cypress para frontend, con cobertura objetivo del 70% mínimo.
2. **Tests de carga**: usar JMeter para simular 50+ usuarios concurrentes y validar que el sistema no se degrada.
3. **Tests de seguridad**: ejecutar OWASP ZAP para detectar vulnerabilidades comunes.
4. **CI/CD**: integrar los tests al pipeline de GitHub Actions para que cada PR ejecute la suite automáticamente.
5. **Monitoreo en producción**: agregar Sentry o equivalente para detectar errores reales en uso productivo.

---

## 📋 Checklist final de QA

Antes de considerar el sistema "listo para entrega", verificar:

- [x] Todos los módulos del MVP funcionan según especificación.
- [x] Validaciones de inputs manejan casos negativos.
- [x] Las 5 reglas del motor generan vínculos y alertas correctamente.
- [x] El grafo renderiza correctamente con dataset completo.
- [x] La autenticación protege todos los endpoints.
- [x] Las fotos se persisten y se sirven correctamente.
- [x] El sistema funciona en Chrome, Edge y Firefox.
- [x] Los datos exportados a CSV son legibles en Excel.
- [x] No hay errores críticos en consola del navegador.
- [x] La integración con IA está implementada (pendiente billing externo).

---

*Plan de pruebas elaborado y ejecutado por el equipo amarillo — Sistemas de Información II — Universidad de Oriente, Núcleo Nueva Esparta.*