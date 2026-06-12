# 🐍 Scripts Python

## `generar_datos.py`

Genera un dataset simulado y lo carga vía API REST al backend.
Esta historia corresponde a **HU-008** del backlog.

### Instalación

```bash
pip install -r requirements.txt
```

### Uso básico

Con el backend corriendo en `localhost:8080`:

```bash
python generar_datos.py
```

### Opciones

```bash
python generar_datos.py \
  --api http://localhost:8080 \
  --n-personas 100 \
  --n-vehiculos 50 \
  --n-ubicaciones 25 \
  --n-sucesos 40 \
  --n-relaciones 150 \
  --n-avistamientos 80
```

### Qué hace

1. Inicia sesión como `admin / admin123`.
2. Crea personas con documentos únicos y roles variados.
3. Crea ubicaciones (concentra 40% cerca de un "taller" para que se dispare
   la alerta de **Nodo Logístico**).
4. Crea vehículos asignados a propietarios.
5. Crea sucesos de robo y desaparición (con un modus operandi compartido
   para que se active la regla de **Modus Operandi**).
6. Crea relaciones sociales aleatorias (para detectar intermediarios).
7. Crea avistamientos con un "vehículo escolta" que aparece repetidamente
   cerca de otros (activa la regla de **Escolta Vehicular**).

### Después de cargar los datos

Ejecutá el motor desde el frontend (botón en el Dashboard) o por API:

```bash
curl -X POST http://localhost:8080/api/v1/engine/ejecutar-todo
```

Y luego navegá al grafo en `http://localhost:5173/grafo` para ver el Hilo Rojo.
