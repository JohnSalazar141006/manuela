# 🗃️ Modelo de Datos — PostgreSQL

## Visión general

El modelo está diseñado alrededor de **cuatro entidades núcleo** (Persona, Vehículo, Ubicación, Suceso) y **entidades relacionales** que capturan los vínculos (el hilo rojo).

```
          ┌──────────┐
          │ PERSONA  │
          └────┬─────┘
               │ (propietario, víctima, sospechoso)
    ┌──────────┼─────────────┐
    │          │             │
┌───▼────┐ ┌───▼────┐  ┌─────▼──────┐
│VEHICULO│ │ SUCESO │  │ RELACION   │
└───┬────┘ └───┬────┘  │ (social)   │
    │          │       └────────────┘
    │          │
    └─────┬────┘
          │
    ┌─────▼─────┐
    │ UBICACION │
    └───────────┘
```

---

## 📐 Diagrama ER (resumen)

- **Persona** 1..N **Vehiculo** (propietario).
- **Persona** N..N **Persona** vía **Relacion** (círculo social).
- **Suceso** N..1 **Ubicacion** (lugar del hecho).
- **Suceso** N..1 **Vehiculo** (cuando aplica).
- **Suceso** N..1 **Persona** (víctima).
- **Vinculo** conecta cualquier par de entidades (tabla del "hilo rojo").
- **Alerta** N..1 **Vinculo**.

---

## 🧱 Tablas principales

### 1. `persona`
```sql
CREATE TABLE persona (
    id                BIGSERIAL PRIMARY KEY,
    documento         VARCHAR(20) UNIQUE NOT NULL,
    nombre            VARCHAR(100) NOT NULL,
    apellido          VARCHAR(100) NOT NULL,
    alias             VARCHAR(100),
    fecha_nacimiento  DATE,
    rol               VARCHAR(20) NOT NULL
                      CHECK (rol IN ('VICTIMA','SOSPECHOSO','TESTIGO','PROPIETARIO','INTERMEDIARIO')),
    telefono          VARCHAR(20),
    estado            VARCHAR(20) DEFAULT 'ACTIVO',
    creado_en         TIMESTAMP DEFAULT NOW(),
    actualizado_en    TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_persona_documento ON persona(documento);
CREATE INDEX idx_persona_rol       ON persona(rol);
```

### 2. `vehiculo`
```sql
CREATE TABLE vehiculo (
    id              BIGSERIAL PRIMARY KEY,
    placa           VARCHAR(10) UNIQUE NOT NULL,
    marca           VARCHAR(50) NOT NULL,
    modelo          VARCHAR(50) NOT NULL,
    anio            INT,
    color           VARCHAR(30),
    estado          VARCHAR(30) DEFAULT 'NORMAL'
                    CHECK (estado IN ('NORMAL','ROBADO','RECUPERADO',
                                      'DESAPARECIDO','BAJO_OBSERVACION','VEHICULO_APOYO')),
    propietario_id  BIGINT REFERENCES persona(id) ON DELETE SET NULL,
    creado_en       TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_vehiculo_placa  ON vehiculo(placa);
CREATE INDEX idx_vehiculo_estado ON vehiculo(estado);
```

### 3. `ubicacion`
```sql
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE ubicacion (
    id              BIGSERIAL PRIMARY KEY,
    direccion       VARCHAR(255),
    latitud         DOUBLE PRECISION NOT NULL,
    longitud        DOUBLE PRECISION NOT NULL,
    tipo            VARCHAR(30)
                    CHECK (tipo IN ('TALLER','GALPON','TERRENO_BALDIO','DOMICILIO',
                                    'CAJERO','TRANSPORTE_PUBLICO','COMERCIO','OTRO')),
    nodo_sospechoso BOOLEAN DEFAULT FALSE,
    geom            GEOGRAPHY(POINT,4326),
    creado_en       TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_ubicacion_geom ON ubicacion USING GIST(geom);
CREATE INDEX idx_ubicacion_tipo ON ubicacion(tipo);
```

### 4. `suceso`
```sql
CREATE TABLE suceso (
    id                   BIGSERIAL PRIMARY KEY,
    tipo                 VARCHAR(30) NOT NULL
                         CHECK (tipo IN ('ROBO_VEHICULO','DESAPARICION','AVISTAMIENTO','TRANSACCION')),
    fecha_hora           TIMESTAMP NOT NULL,
    ubicacion_id         BIGINT REFERENCES ubicacion(id),
    ubicacion_ultima_id  BIGINT REFERENCES ubicacion(id),
    vehiculo_id          BIGINT REFERENCES vehiculo(id),
    victima_id           BIGINT REFERENCES persona(id),
    modus_operandi       VARCHAR(100),
    descripcion          TEXT,
    patron_banda_id      BIGINT,
    creado_en            TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_suceso_tipo  ON suceso(tipo);
CREATE INDEX idx_suceso_fecha ON suceso(fecha_hora);
CREATE INDEX idx_suceso_modus ON suceso(modus_operandi);
```

### 5. `relacion`
```sql
CREATE TABLE relacion (
    id             BIGSERIAL PRIMARY KEY,
    persona_a_id   BIGINT NOT NULL REFERENCES persona(id),
    persona_b_id   BIGINT NOT NULL REFERENCES persona(id),
    tipo_relacion  VARCHAR(30)
                   CHECK (tipo_relacion IN ('FAMILIAR','AMIGO','LABORAL',
                                            'CONTACTO_TELEFONICO','REDES_SOCIALES','OTRO')),
    peso           INT DEFAULT 1,
    creado_en      TIMESTAMP DEFAULT NOW(),
    CONSTRAINT relacion_unica UNIQUE(persona_a_id, persona_b_id, tipo_relacion),
    CONSTRAINT no_auto_relacion CHECK (persona_a_id <> persona_b_id)
);
CREATE INDEX idx_relacion_a ON relacion(persona_a_id);
CREATE INDEX idx_relacion_b ON relacion(persona_b_id);
```

### 6. `avistamiento`
```sql
CREATE TABLE avistamiento (
    id            BIGSERIAL PRIMARY KEY,
    vehiculo_id   BIGINT REFERENCES vehiculo(id),
    persona_id    BIGINT REFERENCES persona(id),
    ubicacion_id  BIGINT REFERENCES ubicacion(id),
    fecha_hora    TIMESTAMP NOT NULL,
    fuente        VARCHAR(50),
    creado_en     TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_avistamiento_veh_fecha ON avistamiento(vehiculo_id, fecha_hora);
```

### 7. `vinculo` — el hilo rojo
```sql
CREATE TABLE vinculo (
    id              BIGSERIAL PRIMARY KEY,
    tipo_origen     VARCHAR(20) NOT NULL,
    id_origen       BIGINT NOT NULL,
    tipo_destino    VARCHAR(20) NOT NULL,
    id_destino      BIGINT NOT NULL,
    regla_detectada VARCHAR(50) NOT NULL,
    score           NUMERIC(4,2) NOT NULL DEFAULT 1.0,
    activo          BOOLEAN DEFAULT TRUE,
    detectado_en    TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_vinculo_origen  ON vinculo(tipo_origen, id_origen);
CREATE INDEX idx_vinculo_destino ON vinculo(tipo_destino, id_destino);
```

### 8. `alerta`
```sql
CREATE TABLE alerta (
    id            BIGSERIAL PRIMARY KEY,
    tipo          VARCHAR(40) NOT NULL
                  CHECK (tipo IN ('NODO_LOGISTICO','VEHICULO_APOYO','INTERMEDIARIO',
                                  'POI_DESAPARICION','MODUS_OPERANDI')),
    titulo        VARCHAR(150) NOT NULL,
    descripcion   TEXT,
    nivel_riesgo  VARCHAR(10) CHECK (nivel_riesgo IN ('BAJO','MEDIO','ALTO','CRITICO')),
    vinculo_id    BIGINT REFERENCES vinculo(id),
    estado        VARCHAR(20) DEFAULT 'PENDIENTE'
                  CHECK (estado IN ('PENDIENTE','EN_REVISION','CONFIRMADA','DESCARTADA')),
    creada_en     TIMESTAMP DEFAULT NOW()
);
```

### 9. `patron_banda`
```sql
CREATE TABLE patron_banda (
    id              BIGSERIAL PRIMARY KEY,
    codigo          VARCHAR(20) UNIQUE NOT NULL,
    descripcion     TEXT,
    metodo_comun    VARCHAR(100),
    primer_registro TIMESTAMP,
    ultimo_registro TIMESTAMP,
    num_sucesos     INT DEFAULT 0
);
```

### 10. `usuario`
```sql
CREATE TABLE usuario (
    id              BIGSERIAL PRIMARY KEY,
    username        VARCHAR(50) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    nombre_completo VARCHAR(150),
    rol             VARCHAR(20) DEFAULT 'ANALISTA',
    activo          BOOLEAN DEFAULT TRUE,
    creado_en       TIMESTAMP DEFAULT NOW()
);
```

---

## 🔗 Cómo se conectan Persona + Vehículo + Suceso

Existen **dos formas complementarias**:

### Forma 1: Vinculación directa (datos duros)
Las columnas `propietario_id`, `victima_id`, `vehiculo_id` capturan las relaciones **explícitas y conocidas** desde el momento del registro.

### Forma 2: Vinculación descubierta (el "hilo rojo")
La tabla `vinculo` es genérica y permite enhebrar **cualquier par de entidades** descubiertas automáticamente por el motor. Ejemplo:

```sql
-- El motor detectó que la Persona 45 aparece en 3 avistamientos
-- cerca del Vehículo 12 antes de cada robo.
INSERT INTO vinculo (tipo_origen, id_origen, tipo_destino, id_destino, regla_detectada, score)
VALUES ('PERSONA', 45, 'VEHICULO', 12, 'PATRON_ESCOLTA', 0.87);
```

La tabla `vinculo` es **el corazón del sistema** — cada fila es literalmente un hilo rojo.

---

## 📊 Consultas clave del motor

### Detectar nodo logístico (Caso A)
```sql
SELECT u.id, COUNT(DISTINCT s.vehiculo_id) AS vehiculos_cerca
FROM ubicacion u
JOIN suceso s ON s.tipo = 'ROBO_VEHICULO'
JOIN ubicacion su ON su.id = s.ubicacion_ultima_id
WHERE u.tipo IN ('TALLER','GALPON','TERRENO_BALDIO')
  AND ST_DWithin(u.geom, su.geom, 500)
  AND s.fecha_hora >= NOW() - INTERVAL '72 hours'
GROUP BY u.id
HAVING COUNT(DISTINCT s.vehiculo_id) >= 3;
```

### Encontrar intermediario crítico (Caso C)
```sql
WITH RECURSIVE amigos AS (
    SELECT persona_a_id AS origen, persona_b_id AS destino, 1 AS grado
    FROM relacion WHERE persona_a_id = :victima_id
    UNION
    SELECT a.origen, r.persona_b_id, a.grado + 1
    FROM amigos a JOIN relacion r ON a.destino = r.persona_a_id
    WHERE a.grado < 2
)
SELECT DISTINCT a1.destino AS intermediario
FROM amigos a1
JOIN amigos a2 ON a1.destino = a2.origen
WHERE a2.destino = :sospechoso_id;
```

### Detectar modus operandi similar (Plot twist)
```sql
SELECT s1.id AS suceso_a, s2.id AS suceso_b
FROM suceso s1
JOIN suceso s2 ON s1.id < s2.id
WHERE s1.modus_operandi = s2.modus_operandi
  AND EXTRACT(HOUR FROM s1.fecha_hora) BETWEEN
      EXTRACT(HOUR FROM s2.fecha_hora) - 2
      AND EXTRACT(HOUR FROM s2.fecha_hora) + 2
  AND s1.tipo = s2.tipo;
```

---

## 🧮 Normalización

El modelo está en **3FN (Tercera Forma Normal)**:
- Sin dependencias transitivas.
- Claves foráneas donde corresponde.
- Tipos enumerados como `CHECK` en lugar de tablas aparte (para simplificar el MVP; migrable a tablas catálogo en el futuro).
