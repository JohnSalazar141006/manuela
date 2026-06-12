-- =====================================================================
-- NEXO CRIMINAL - Esquema de Base de Datos
-- PostgreSQL 15+ con extensión PostGIS
-- =====================================================================

-- Crear base de datos (ejecutar como superusuario)
-- CREATE DATABASE nexo_criminal;
-- \c nexo_criminal

CREATE EXTENSION IF NOT EXISTS postgis;

-- =====================================================================
-- TABLAS BASE
-- =====================================================================

-- Usuarios del sistema
CREATE TABLE IF NOT EXISTS usuario (
    id              BIGSERIAL PRIMARY KEY,
    username        VARCHAR(50) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    nombre_completo VARCHAR(150),
    rol             VARCHAR(20) DEFAULT 'ANALISTA',
    activo          BOOLEAN DEFAULT TRUE,
    creado_en       TIMESTAMP DEFAULT NOW()
);

-- Personas
CREATE TABLE IF NOT EXISTS persona (
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

CREATE INDEX IF NOT EXISTS idx_persona_documento ON persona(documento);
CREATE INDEX IF NOT EXISTS idx_persona_rol       ON persona(rol);

-- Ubicaciones
CREATE TABLE IF NOT EXISTS ubicacion (
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

CREATE INDEX IF NOT EXISTS idx_ubicacion_geom ON ubicacion USING GIST(geom);
CREATE INDEX IF NOT EXISTS idx_ubicacion_tipo ON ubicacion(tipo);

-- Trigger para poblar automáticamente el campo geom a partir de lat/lng
CREATE OR REPLACE FUNCTION trigger_ubicacion_set_geom() RETURNS TRIGGER AS $$
BEGIN
    NEW.geom := ST_SetSRID(ST_MakePoint(NEW.longitud, NEW.latitud), 4326)::geography;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_ubicacion_geom ON ubicacion;
CREATE TRIGGER tr_ubicacion_geom
    BEFORE INSERT OR UPDATE ON ubicacion
    FOR EACH ROW EXECUTE FUNCTION trigger_ubicacion_set_geom();

-- Vehículos
CREATE TABLE IF NOT EXISTS vehiculo (
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

CREATE INDEX IF NOT EXISTS idx_vehiculo_placa  ON vehiculo(placa);
CREATE INDEX IF NOT EXISTS idx_vehiculo_estado ON vehiculo(estado);

-- Patrones de banda (para modus operandi)
CREATE TABLE IF NOT EXISTS patron_banda (
    id              BIGSERIAL PRIMARY KEY,
    codigo          VARCHAR(20) UNIQUE NOT NULL,
    descripcion     TEXT,
    metodo_comun    VARCHAR(100),
    primer_registro TIMESTAMP,
    ultimo_registro TIMESTAMP,
    num_sucesos     INT DEFAULT 0
);

-- Sucesos (robos, desapariciones, avistamientos)
CREATE TABLE IF NOT EXISTS suceso (
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
    patron_banda_id      BIGINT REFERENCES patron_banda(id),
    creado_en            TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_suceso_tipo  ON suceso(tipo);
CREATE INDEX IF NOT EXISTS idx_suceso_fecha ON suceso(fecha_hora);
CREATE INDEX IF NOT EXISTS idx_suceso_modus ON suceso(modus_operandi);

-- Relaciones sociales entre personas
CREATE TABLE IF NOT EXISTS relacion (
    id             BIGSERIAL PRIMARY KEY,
    persona_a_id   BIGINT NOT NULL REFERENCES persona(id) ON DELETE CASCADE,
    persona_b_id   BIGINT NOT NULL REFERENCES persona(id) ON DELETE CASCADE,
    tipo_relacion  VARCHAR(30)
                   CHECK (tipo_relacion IN ('FAMILIAR','AMIGO','LABORAL',
                                            'CONTACTO_TELEFONICO','REDES_SOCIALES','OTRO')),
    peso           INT DEFAULT 1,
    creado_en      TIMESTAMP DEFAULT NOW(),
    CONSTRAINT relacion_unica UNIQUE(persona_a_id, persona_b_id, tipo_relacion),
    CONSTRAINT no_auto_relacion CHECK (persona_a_id <> persona_b_id)
);

CREATE INDEX IF NOT EXISTS idx_relacion_a ON relacion(persona_a_id);
CREATE INDEX IF NOT EXISTS idx_relacion_b ON relacion(persona_b_id);

-- Avistamientos de cámaras
CREATE TABLE IF NOT EXISTS avistamiento (
    id            BIGSERIAL PRIMARY KEY,
    vehiculo_id   BIGINT REFERENCES vehiculo(id),
    persona_id    BIGINT REFERENCES persona(id),
    ubicacion_id  BIGINT REFERENCES ubicacion(id),
    fecha_hora    TIMESTAMP NOT NULL,
    fuente        VARCHAR(50),
    creado_en     TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_avistamiento_veh_fecha ON avistamiento(vehiculo_id, fecha_hora);

-- Vínculos (el "hilo rojo" generado por el motor)
CREATE TABLE IF NOT EXISTS vinculo (
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

CREATE INDEX IF NOT EXISTS idx_vinculo_origen  ON vinculo(tipo_origen, id_origen);
CREATE INDEX IF NOT EXISTS idx_vinculo_destino ON vinculo(tipo_destino, id_destino);
CREATE INDEX IF NOT EXISTS idx_vinculo_regla   ON vinculo(regla_detectada);

-- Alertas generadas
CREATE TABLE IF NOT EXISTS alerta (
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

CREATE INDEX IF NOT EXISTS idx_alerta_estado ON alerta(estado);
CREATE INDEX IF NOT EXISTS idx_alerta_tipo   ON alerta(tipo);

-- =====================================================================
-- USUARIO ADMINISTRADOR INICIAL
-- Password: "admin123" (BCrypt hash)
-- =====================================================================
INSERT INTO usuario (username, password_hash, nombre_completo, rol)
VALUES ('admin',
        '$2a$10$8.WfxZ7XmLyY0VJ7G3qsYeVHK4uCqJ3z0ZpLqZKZ.mJzKgEXFHL7u',
        'Administrador del Sistema',
        'ANALISTA')
ON CONFLICT (username) DO NOTHING;

-- =====================================================================
-- VISTA ÚTIL: Grafo completo de vínculos
-- =====================================================================
CREATE OR REPLACE VIEW v_grafo_vinculos AS
SELECT
    v.id                AS vinculo_id,
    v.tipo_origen,
    v.id_origen,
    CASE v.tipo_origen
        WHEN 'PERSONA'   THEN (SELECT nombre || ' ' || apellido FROM persona WHERE id = v.id_origen)
        WHEN 'VEHICULO'  THEN (SELECT placa FROM vehiculo WHERE id = v.id_origen)
        WHEN 'UBICACION' THEN (SELECT direccion FROM ubicacion WHERE id = v.id_origen)
        WHEN 'SUCESO'    THEN 'Suceso #' || v.id_origen
    END                 AS label_origen,
    v.tipo_destino,
    v.id_destino,
    CASE v.tipo_destino
        WHEN 'PERSONA'   THEN (SELECT nombre || ' ' || apellido FROM persona WHERE id = v.id_destino)
        WHEN 'VEHICULO'  THEN (SELECT placa FROM vehiculo WHERE id = v.id_destino)
        WHEN 'UBICACION' THEN (SELECT direccion FROM ubicacion WHERE id = v.id_destino)
        WHEN 'SUCESO'    THEN 'Suceso #' || v.id_destino
    END                 AS label_destino,
    v.regla_detectada,
    v.score,
    v.detectado_en
FROM vinculo v
WHERE v.activo = TRUE;
