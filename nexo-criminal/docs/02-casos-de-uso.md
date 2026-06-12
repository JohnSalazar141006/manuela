# 🔍 Casos de Uso — Nexo Criminal

## Resumen ejecutivo

| # | Título | Objetivo | Entidades Vinculadas |
|---|---|---|---|
| A | **Alerta de Nodo Logístico** | Localizar centros de desmantelamiento | Ubicaciones GPS + Talleres + Tiempo |
| B | **Rastreo de Escolta** | Identificar cómplices en fugas | Vehículo robado + Vehículos cercanos + Cámaras |
| C | **Intermediario Crítico** | Encontrar personas que conectan víctima y sospechoso | Víctima + Sospechoso + Amigos comunes |
| D | **Punto de Contacto** | Hallar el lugar exacto donde se perdió el rastro | Transacciones + Antenas + Geolocalización |
| ⭐ | **Similitud de Modus Operandi** | Detectar bandas que operan en múltiples ciudades | Sucesos + Métodos delictivos |

---

## 🏎️ ÁREA 1 — Robo de Vehículos

### Caso de Uso A: Identificación de "Nodos Logísticos" (Deshuesaderos)

- **Actor principal:** Analista de Inteligencia Criminal.
- **Precondición:** Existen al menos 3 sucesos de robo de vehículo registrados con su última ubicación conocida.
- **Disparador:** El analista ejecuta la rutina de análisis de nodos logísticos.

**Flujo principal:**
1. El sistema consulta los sucesos de robo con última ubicación registrada en las últimas 72 horas.
2. Agrupa las coordenadas por proximidad geográfica (radio configurable, por defecto 500 m).
3. Si un grupo contiene ≥ 3 vehículos dentro de una ventana temporal de 2 horas, lo marca como candidato.
4. Verifica si dentro del radio existe una Ubicación tipo `TALLER`, `GALPÓN` o `TERRENO_BALDÍO`.
5. Si hay coincidencia, genera una **Alerta de Nodo Sospechoso** y enhebra los vehículos con la ubicación.
6. El analista visualiza el grafo: un nodo ubicación central con aristas rojas hacia los 3+ vehículos.

**Postcondición:** La ubicación queda marcada como "Nodo de interés" y aparece en el dashboard de alertas.

**Datos mínimos:** `Suceso.ubicacion_ultima`, `Suceso.fecha_hora`, `Ubicacion.tipo`.

---

### Caso de Uso B: Detección de "Mulas" y Escoltas

- **Actor principal:** Operador de Monitoreo Urbano.
- **Precondición:** Existen registros de avistamientos de vehículos provenientes de cámaras.

**Flujo principal:**
1. El operador ingresa la placa de un vehículo robado.
2. El sistema consulta todos los avistamientos de ese vehículo.
3. Para cada avistamiento, busca otros vehículos captados dentro de un radio de 100 m y ±2 minutos.
4. Acumula coincidencias: si un mismo vehículo "X" apareció cerca del vehículo robado en ≥ 3 momentos distintos con ≥ 10 minutos de coincidencia, se cataloga como **Vehículo de Apoyo Logístico**.
5. El sistema genera un hilo rojo entre el vehículo robado y el sospechoso.

**Postcondición:** El vehículo de apoyo queda etiquetado y cualquier nuevo avistamiento genera alerta automática.

---

## 🔍 ÁREA 2 — Personas Desaparecidas

### Caso de Uso C: Análisis del "Círculo de Confianza"

- **Actor principal:** Investigador de Desapariciones.
- **Precondición:** La víctima tiene registros de contactos telefónicos y/o relaciones sociales cargadas.

**Flujo principal:**
1. El investigador abre el perfil de la víctima.
2. El sistema carga el grafo de relaciones directas (contactos de primer grado).
3. El investigador ingresa el nombre o cédula de un sospechoso.
4. El sistema ejecuta un algoritmo de **ruta más corta** entre víctima y sospechoso.
5. Si existe un camino de 2 grados (amigo de un amigo), identifica al **nodo intermedio**.
6. Cruza coordenadas: si compartieron ubicación (radio 50 m) en alguna fecha previa, lo resalta como "Coincidencia geográfica".
7. Resultado: el intermediario se marca con ícono ⭐ y se recomienda interrogación.

**Postcondición:** El "intermediario crítico" queda registrado como persona de interés.

---

### Caso de Uso D: El "Patrón de Desconexión"

- **Actor principal:** Analista Forense.
- **Precondición:** Existen múltiples casos de desaparición (≥ 5) en un mismo sector geográfico.

**Flujo principal:**
1. El analista selecciona una zona en el mapa (polígono).
2. El sistema carga todas las desapariciones en esa zona en los últimos 6 meses.
3. Por cada víctima, obtiene la **última actividad verificable** (transacción en cajero, transporte, última señal).
4. Agrupa esas actividades por ubicación.
5. Si una misma ubicación aparece en ≥ 80% de los casos como último punto de contacto, la marca como **POI crítico**.
6. El sistema sugiere concentrar recursos (cámaras, patrullajes) en ese punto.

**Postcondición:** El POI aparece en el mapa con marcador rojo y se dispara alerta para las unidades de campo.

---

## ⭐ Plot Twist: Similitud de Modus Operandi

Este módulo eleva el sistema de simple registro a **inteligencia predictiva**.

**Descripción:**
Al registrar sucesos, el analista captura el **método utilizado** (inhibidor de señal, violencia armada, engaño a la víctima, uso de grúa falsa) junto con horario, tipo de víctima y perfil del atacante.

**Lógica del sistema:**
1. El motor de modus operandi compara pares de sucesos usando un **índice de similitud** (coincidencia de atributos: método + franja horaria + tipo de objetivo).
2. Si el índice supera el umbral (por defecto 75%), enhebra ambos sucesos en el mismo **Hilo Rojo**.
3. Todos los sucesos enhebrados se asocian a un **Patrón de Banda Sospechosa** con un identificador único.

**Ejemplo concreto:**
> Tres robos cometidos en Quito, Guayaquil y Cuenca, todos de camionetas 4x4, entre 22:00 y 01:00, usando inhibidor de señal → el sistema los une y sugiere: *"Patrón consistente con la banda #PAT-0047"*.

**Valor táctico:** permite coordinación entre jurisdicciones; los casos dejan de trabajarse de forma aislada.

---

## Diagrama de flujo del motor (pseudocódigo)

```
INICIO ANÁLISIS
  PARA cada regla EN [NodoLogistico, Escolta, CirculoConfianza, POIDesconexion, ModusOperandi]:
    vinculos_detectados = regla.detectar(contexto)
    PARA cada vinculo EN vinculos_detectados:
      persistir(vinculo)
      SI vinculo.score >= umbral_alerta:
        generar_alerta(vinculo)
      FIN SI
    FIN PARA
  FIN PARA
FIN
```
