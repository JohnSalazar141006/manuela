# 🌀 Plan Scrum y Manifiesto Ágil

## Decisiones tomadas en clase (22/04)

- Metodología **ágil — Scrum**.
- El MVP debe funcionar **≥ 4 semanas**.
- Foco en **valor máximo**, no en perfección.
- Testing no es prioridad del MVP (pero sí buena práctica).
- Leer los **12 principios del Manifiesto Ágil**, asignados 2 por equipo.

---

## 🧭 Roles Scrum

| Rol | Responsabilidad | Asignado |
|---|---|---|
| **Product Owner** | Prioriza backlog, define valor | *Por definir viernes* |
| **Scrum Master** | Facilita ceremonias, elimina bloqueadores | *Líder Sprint 1 — viernes* |
| **Development Team** | Ejecuta las historias | Todo el equipo |

> El líder del Sprint 1 se decide el viernes. Se sugiere **rotar el liderazgo** en cada sprint.

---

## 📆 Sprints planificados

**Duración:** 1 semana por sprint.

### Sprint 0 — Factibilidad
- Documentación completa.
- Arquitectura y repositorio listos.
- Correo grupal creado.

### Sprint 1 — Fundamentos
- CRUD de entidades.
- Autenticación JWT.
- Historias HU-001 a HU-006 (21 puntos).
- **Demo:** crear personas, vehículos, ubicaciones, sucesos desde el frontend.

### Sprint 2 — Inteligencia básica
- Primer algoritmo del Hilo Rojo (Nodo Logístico).
- Script Python para simulación.
- Visualización inicial del grafo.
- Historias HU-007 a HU-009 (21 puntos).

### Sprint 3 — Valor diferencial
- Intermediario Crítico.
- Modus Operandi (plot twist).
- Dashboard de alertas.
- Historias HU-010 a HU-012 (26 puntos).

---

## 📅 Ceremonias Scrum

| Ceremonia | Frecuencia | Duración | Objetivo |
|---|---|---|---|
| **Sprint Planning** | Inicio de sprint (viernes) | 1 h | Seleccionar historias |
| **Daily Standup** | Diario | 10–15 min | Sincronizar |
| **Sprint Review** | Fin de sprint | 45 min | Demo funcional al PO |
| **Retrospectiva** | Fin de sprint | 30 min | Qué funcionó, qué mejorar |

---

## 📏 Estimación (Planning Poker con Fibonacci)

| Puntos | Equivalente |
|---|---|
| 1 | Tarea trivial (≤ 1 h) |
| 2 | Pequeña, clara |
| 3 | Normal, bien entendida |
| 5 | Mediana, cierta incertidumbre |
| 8 | Grande, requiere diseño |
| 13 | Muy grande, probable dividir |
| 21 | Épica, descomponer |

---

## 📊 Métricas del equipo

- **Velocidad:** puntos completados por sprint.
- **Burndown chart:** puntos restantes por día.
- **Tasa de rework:** historias reabiertas.
- **Tiempo de ciclo:** de "To Do" a "Done".

---

## ⚠️ Riesgos y mitigación

| Riesgo | Mitigación |
|---|---|
| Scope creep | El PO defiende el backlog; cambios grandes → próximo sprint |
| No todos dominan el stack | Pair programming, sesiones de conocimiento |
| Bugs por falta de testing | Checklist de pruebas manuales antes de demo |
| Datos sensibles en repo | `.gitignore` estricto, nunca subir `.env` |
| Retrasos por dependencias entre tareas | Dividir en subtareas técnicas desde el planning |

---

## 🏃 Tablero recomendado (Kanban)

Usar GitHub Projects o Trello con las columnas:

```
[BACKLOG] → [TODO SPRINT] → [EN PROGRESO] → [EN REVISIÓN] → [DONE]
```

Cada tarjeta debe contener:
- Código de historia (HU-XXX).
- Título.
- Estimación en puntos.
- Responsable.
- Criterios de aceptación.
