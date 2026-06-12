# 🏛️ Arquitectura del Sistema

## Vista general

Nexo Criminal sigue una arquitectura de **3 capas + BFF opcional**:

```
┌────────────────────────────────────────────────────────────┐
│                    CAPA DE PRESENTACIÓN                    │
│  ┌────────────────────────┐   ┌──────────────────────┐     │
│  │ React + TypeScript     │   │ Cytoscape.js / D3    │     │
│  │ (Dashboard, formularios)│   │ (Grafo del Hilo Rojo)│     │
│  └────────────┬───────────┘   └──────────┬───────────┘     │
└───────────────┼──────────────────────────┼─────────────────┘
                │                          │
          ┌─────▼──────────────────────────▼─────┐
          │         BFF (NestJS) — opcional      │
          │  - Orquestación de llamadas          │
          │  - Caché en memoria                  │
          │  - Adaptación de DTOs para UI        │
          └──────────────┬───────────────────────┘
                         │ REST / JSON
┌────────────────────────▼───────────────────────────────────┐
│                  CAPA DE APLICACIÓN                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │    Backend — Java 17 + Spring Boot 3                │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────────┐    │   │
│  │  │Entities  │ │ Red      │ │ Alertas &        │    │   │
│  │  │API (CRUD)│ │ Thread   │ │ Modus Operandi   │    │   │
│  │  │          │ │ Engine   │ │ Services         │    │   │
│  │  └──────────┘ └──────────┘ └──────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────┬───────────────────────────────────┘
                         │ JPA / JDBC
┌────────────────────────▼───────────────────────────────────┐
│                   CAPA DE PERSISTENCIA                     │
│   ┌─────────────────────┐       ┌──────────────────────┐   │
│   │ PostgreSQL 15       │       │ Scripts Python (ETL) │   │
│   │  + PostGIS          │◄──────┤ Carga y simulación   │   │
│   └─────────────────────┘       └──────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

---

## 📦 Componentes del backend (Spring Boot)

### Paquetes propuestos
```
com.nexocriminal
├── config/                 # Seguridad, CORS, beans globales
├── domain/                 # Entidades JPA
│   ├── persona/
│   ├── vehiculo/
│   ├── ubicacion/
│   ├── suceso/
│   ├── vinculo/
│   └── alerta/
├── engine/                 # Red Thread Engine
├── api/                    # Controladores REST
└── NexoCriminalApplication.java
```

### Principios de diseño
- **Arquitectura hexagonal ligera** — el dominio no depende de frameworks.
- **DTOs separados de entidades JPA**.
- **Transacciones explícitas** con `@Transactional`.
- **Servicios sin estado** cuando sea posible.

---

## 🔌 API REST — principales endpoints (v1)

### Entidades
```
GET    /api/v1/personas
POST   /api/v1/personas
GET    /api/v1/personas/{id}
PUT    /api/v1/personas/{id}
DELETE /api/v1/personas/{id}

GET    /api/v1/vehiculos
POST   /api/v1/vehiculos
GET    /api/v1/vehiculos/{id}
PATCH  /api/v1/vehiculos/{id}/estado

GET    /api/v1/ubicaciones
POST   /api/v1/ubicaciones

GET    /api/v1/sucesos
POST   /api/v1/sucesos
```

### Motor de vínculos
```
POST /api/v1/engine/nodo-logistico        # Caso A
POST /api/v1/engine/escolta/{placa}       # Caso B
POST /api/v1/engine/circulo-confianza     # Caso C
POST /api/v1/engine/poi-desaparicion      # Caso D
POST /api/v1/engine/modus-operandi        # Plot twist
POST /api/v1/engine/ejecutar-todo         # Ejecuta todas las reglas
```

### Grafo
```
GET /api/v1/grafo/nodo/{tipo}/{id}        # Vínculos de primer grado
GET /api/v1/grafo/completo                # Grafo completo con límite
```

### Alertas
```
GET   /api/v1/alertas
PATCH /api/v1/alertas/{id}/estado
```

### Relaciones sociales
```
GET  /api/v1/relaciones/persona/{id}
POST /api/v1/relaciones
```

---

## ⚙️ Red Thread Engine — corazón del sistema

El motor se implementa como una colección de **estrategias (Strategy pattern)**:

```java
public interface ReglaVinculo {
    List<Vinculo> detectar(ContextoAnalisis ctx);
    TipoAlerta tipoAlertaSiAplica();
    String nombre();
}

@Component
public class ReglaNodoLogistico implements ReglaVinculo { ... }

@Component
public class ReglaEscoltaVehicular implements ReglaVinculo { ... }

@Component
public class ReglaCirculoConfianza implements ReglaVinculo { ... }

@Component
public class ReglaSimilitudModusOperandi implements ReglaVinculo { ... }
```

El `RedThreadEngineService` orquesta todas las reglas, persiste los `Vinculo` resultantes y dispara `Alerta` cuando procede.

---

## 🧪 Escalabilidad futura

- **Caché Redis** para consultas frecuentes del grafo.
- **Colas RabbitMQ/Kafka** para análisis asíncronos pesados.
- **Migrar vínculos a Neo4j** cuando superen 100k nodos.
- **Pruebas de carga con JMeter**.
- **Docker + Kubernetes**.

---

## 🔒 Seguridad mínima del MVP

- Autenticación JWT (Bearer token).
- Hasheo de contraseñas con BCrypt.
- CORS restringido al dominio del frontend.
- Validación de entrada con Bean Validation (`@Valid`).
- Auditoría básica (quién ejecuta cada análisis).
