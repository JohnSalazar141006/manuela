"""
Nexo Criminal — Generador de datos simulados
=============================================
HU-008: Script que carga un dataset realista via API REST del backend.

Uso:
    python generar_datos.py [--api http://localhost:8080] [--n-personas 50]

Por defecto crea:
    - 50 personas (mezcla de roles)
    - 30 vehiculos (varios robados)
    - 15 ubicaciones (talleres, cajeros, domicilios)
    - 20 sucesos (robos y desapariciones)
    - 60 relaciones sociales
    - 40 avistamientos (para detectar escolta)

El script auto-registra el usuario si no existe, asi funciona
"out-of-the-box" en cualquier equipo recien clonado.
"""

import argparse
import random
from datetime import datetime, timedelta

import requests
from faker import Faker

fake = Faker('es_ES')

# Coordenadas base (Miami, FL) - radio aprox 10 km
LAT_BASE = 25.7617
LNG_BASE = -80.1918

MARCAS = ['Toyota', 'Chevrolet', 'Ford', 'Nissan', 'Kia', 'Hyundai', 'Honda', 'Mazda']
MODELOS = ['Hilux', 'D-Max', 'Ranger', 'Frontier', 'Sportage', 'Tucson', 'Civic', 'CX-5']
COLORES = ['Blanco', 'Negro', 'Gris', 'Rojo', 'Azul', 'Plata']
MODUS = ['INHIBIDOR_SENAL', 'GRUA_FALSA', 'VIOLENCIA_ARMADA', 'ENGANO_VICTIMA', 'LLAVE_MAESTRA']
ROLES_PERS = ['VICTIMA', 'SOSPECHOSO', 'TESTIGO', 'PROPIETARIO', 'INTERMEDIARIO']
TIPOS_UBI = ['TALLER', 'GALPON', 'TERRENO_BALDIO', 'DOMICILIO', 'CAJERO', 'TRANSPORTE_PUBLICO', 'COMERCIO']
TIPOS_REL = ['FAMILIAR', 'AMIGO', 'LABORAL', 'CONTACTO_TELEFONICO', 'REDES_SOCIALES']


class NexoClient:
    def __init__(self, base_url):
        self.base = base_url.rstrip('/')
        self.s = requests.Session()
        self.s.headers['Content-Type'] = 'application/json'

    def registrar_si_no_existe(self, username, password, nombre_completo='Usuario Generador'):
        """Intenta registrar el usuario. Si ya existe, lo ignora."""
        try:
            r = self.s.post(
                f'{self.base}/api/v1/auth/registrar',
                json={
                    'username': username,
                    'password': password,
                    'nombreCompleto': nombre_completo,
                },
                timeout=10,
            )
            if r.status_code == 200:
                print(f'[OK] Usuario "{username}" creado')
            elif r.status_code == 400:
                # Usuario ya existe: perfecto, seguimos
                print(f'[INFO] Usuario "{username}" ya existia, se reutiliza')
            else:
                print(f'[WARN] Registro devolvio {r.status_code}: {r.text[:120]}')
        except requests.exceptions.RequestException as e:
            print(f'[WARN] No se pudo registrar: {e}')

    def login(self, username, password):
        try:
            r = self.s.post(
                f'{self.base}/api/v1/auth/login',
                json={'username': username, 'password': password},
                timeout=10,
            )
        except requests.exceptions.ConnectionError:
            print(f'\n[ERROR] No se pudo conectar con {self.base}')
            print('        Asegurate de que el backend Spring Boot este corriendo')
            print('        en otra terminal: mvn spring-boot:run\n')
            raise SystemExit(1)

        if r.status_code == 401:
            print(f'\n[ERROR] Credenciales invalidas para el usuario "{username}".')
            print('        Probá con otro usuario usando --usuario NOMBRE --password CLAVE')
            print('        o reiniciá el backend con la base vacia.\n')
            raise SystemExit(1)

        r.raise_for_status()
        self.s.headers['Authorization'] = f"Bearer {r.json()['token']}"
        print(f'[OK] Login exitoso como {username}')

    def post(self, path, payload):
        r = self.s.post(f'{self.base}{path}', json=payload)
        if r.status_code >= 400:
            print(f'[WARN] {path} -> {r.status_code} {r.text[:120]}')
            return None
        return r.json()


def coord_aleatoria(radio_km=5):
    """Genera lat/lng en un radio aproximado alrededor del centro."""
    dlat = random.uniform(-radio_km / 111, radio_km / 111)
    dlng = random.uniform(-radio_km / 111, radio_km / 111)
    return round(LAT_BASE + dlat, 6), round(LNG_BASE + dlng, 6)


def crear_personas(cli, n):
    creados = []
    documentos = set()
    for _ in range(n):
        while True:
            doc = str(random.randint(1700000000, 1799999999))
            if doc not in documentos:
                documentos.add(doc)
                break
        p = cli.post('/api/v1/personas', {
            'documento': doc,
            'nombre': fake.first_name(),
            'apellido': fake.last_name(),
            'alias': fake.user_name() if random.random() < 0.3 else None,
            'fechaNacimiento': fake.date_of_birth(minimum_age=18, maximum_age=70).isoformat(),
            'rol': random.choice(ROLES_PERS),
            'telefono': fake.phone_number()[:20],
        })
        if p:
            creados.append(p)
    print(f'[OK] {len(creados)} personas creadas')
    return creados


def crear_ubicaciones(cli, n):
    # Concentrar 40% cerca de un "taller sospechoso" para disparar nodo logistico
    lat_taller, lng_taller = coord_aleatoria(radio_km=1)
    creadas = []
    for i in range(n):
        if i < n * 0.4:
            dlat = random.uniform(-0.002, 0.002)
            dlng = random.uniform(-0.002, 0.002)
            lat, lng = round(lat_taller + dlat, 6), round(lng_taller + dlng, 6)
            tipo = random.choice(['TALLER', 'GALPON', 'TERRENO_BALDIO']) if i == 0 else 'COMERCIO'
        else:
            lat, lng = coord_aleatoria(8)
            tipo = random.choice(TIPOS_UBI)

        u = cli.post('/api/v1/ubicaciones', {
            'direccion': fake.street_address(),
            'latitud': lat,
            'longitud': lng,
            'tipo': tipo,
        })
        if u:
            creadas.append(u)
    print(f'[OK] {len(creadas)} ubicaciones creadas')
    return creadas


def crear_vehiculos(cli, n, personas):
    creados = []
    placas = set()
    propietarios = [p for p in personas if p['rol'] in ('PROPIETARIO', 'VICTIMA')]
    if not propietarios:
        propietarios = personas
    for _ in range(n):
        while True:
            placa = ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZ', k=3)) + str(random.randint(1000, 9999))
            if placa not in placas:
                placas.add(placa)
                break
        prop = random.choice(propietarios)
        v = cli.post('/api/v1/vehiculos', {
            'placa': placa,
            'marca': random.choice(MARCAS),
            'modelo': random.choice(MODELOS),
            'anio': random.randint(2010, 2024),
            'color': random.choice(COLORES),
            'estado': 'NORMAL',
            'propietario': {'id': prop['id']}
        })
        if v:
            creados.append(v)
    print(f'[OK] {len(creados)} vehiculos creados')
    return creados


def crear_sucesos(cli, n, vehiculos, ubicaciones, personas):
    victimas = [p for p in personas if p['rol'] == 'VICTIMA']
    if not victimas:
        victimas = personas[:5]
    ubis_taller = [u for u in ubicaciones if u.get('tipo') in ('TALLER', 'GALPON', 'TERRENO_BALDIO')]
    creados = []
    ahora = datetime.now()
    modus_banda = random.choice(MODUS)  # modus operandi "compartido" por una banda

    for i in range(n):
        if i < n * 0.5 and vehiculos:  # robos
            veh = random.choice(vehiculos)
            ubi = random.choice(ubicaciones)
            ubi_ultima = random.choice(ubis_taller) if ubis_taller and random.random() < 0.7 else random.choice(ubicaciones)
            fecha = ahora - timedelta(hours=random.randint(1, 72))
            mo = modus_banda if random.random() < 0.6 else random.choice(MODUS)
            s = cli.post('/api/v1/sucesos', {
                'tipo': 'ROBO_VEHICULO',
                'fechaHora': fecha.isoformat(timespec='seconds'),
                'vehiculo': {'id': veh['id']},
                'ubicacion': {'id': ubi['id']},
                'ubicacionUltima': {'id': ubi_ultima['id']},
                'modusOperandi': mo,
                'descripcion': f'Robo reportado en zona {ubi.get("direccion", "desconocida")}',
            })
        else:  # desapariciones
            vic = random.choice(victimas)
            ubi = random.choice(ubicaciones)
            fecha = ahora - timedelta(days=random.randint(1, 30))
            s = cli.post('/api/v1/sucesos', {
                'tipo': 'DESAPARICION',
                'fechaHora': fecha.isoformat(timespec='seconds'),
                'victima': {'id': vic['id']},
                'ubicacionUltima': {'id': ubi['id']},
                'descripcion': f'Desaparicion reportada de {vic["nombre"]} {vic["apellido"]}',
            })
        if s:
            creados.append(s)
    print(f'[OK] {len(creados)} sucesos creados')
    return creados


def crear_relaciones(cli, n, personas):
    if len(personas) < 2:
        return []
    creadas = []
    pares_vistos = set()
    for _ in range(n):
        a, b = random.sample(personas, 2)
        par = tuple(sorted([a['id'], b['id']]))
        if par in pares_vistos:
            continue
        pares_vistos.add(par)
        r = cli.post('/api/v1/relaciones', {
            'personaA': {'id': a['id']},
            'personaB': {'id': b['id']},
            'tipoRelacion': random.choice(TIPOS_REL),
            'peso': random.randint(1, 5),
        })
        if r:
            creadas.append(r)
    print(f'[OK] {len(creadas)} relaciones creadas')
    return creadas


def crear_avistamientos(cli, n, vehiculos, ubicaciones):
    if not vehiculos or not ubicaciones:
        return []
    # Elegimos un "vehiculo escolta" que aparece junto a muchos otros
    escolta = random.choice(vehiculos)
    creados = []
    ahora = datetime.now()
    for i in range(n):
        # La mitad de las veces avistamos al escolta junto a otro vehiculo
        if i % 2 == 0 and len(vehiculos) > 1:
            otro = random.choice([v for v in vehiculos if v['id'] != escolta['id']])
            ubi = random.choice(ubicaciones)
            t = ahora - timedelta(minutes=random.randint(1, 120))
            cli.post('/api/v1/avistamientos', {
                'vehiculo': {'id': otro['id']},
                'ubicacion': {'id': ubi['id']},
                'fechaHora': t.isoformat(timespec='seconds'),
                'fuente': 'CAMARA_URBANA',
            })
            # Escolta justo despues
            cli.post('/api/v1/avistamientos', {
                'vehiculo': {'id': escolta['id']},
                'ubicacion': {'id': ubi['id']},
                'fechaHora': (t + timedelta(seconds=random.randint(20, 100))).isoformat(timespec='seconds'),
                'fuente': 'CAMARA_URBANA',
            })
            creados.append(otro['id'])
        else:
            v = random.choice(vehiculos)
            ubi = random.choice(ubicaciones)
            cli.post('/api/v1/avistamientos', {
                'vehiculo': {'id': v['id']},
                'ubicacion': {'id': ubi['id']},
                'fechaHora': (ahora - timedelta(hours=random.randint(1, 48))).isoformat(timespec='seconds'),
                'fuente': 'CAMARA_URBANA',
            })
    print(f'[OK] Avistamientos cargados (escolta: {escolta["placa"]})')


def main():
    ap = argparse.ArgumentParser(
        description='Genera datos simulados y los carga via API REST en Nexo Criminal.'
    )
    ap.add_argument('--api', default='http://localhost:8080',
                    help='URL base del backend (default: http://localhost:8080)')
    ap.add_argument('--n-personas', type=int, default=50)
    ap.add_argument('--n-vehiculos', type=int, default=30)
    ap.add_argument('--n-ubicaciones', type=int, default=15)
    ap.add_argument('--n-sucesos', type=int, default=20)
    ap.add_argument('--n-relaciones', type=int, default=60)
    ap.add_argument('--n-avistamientos', type=int, default=40)
    ap.add_argument('--usuario', default='admin2',
                    help='Usuario a usar (se crea automaticamente si no existe)')
    ap.add_argument('--password', default='admin123')
    ap.add_argument('--saltar-registro', action='store_true',
                    help='No intentar registrar el usuario (si ya sabes que existe)')
    args = ap.parse_args()

    print(f'=== Generando datos para {args.api} ===')
    cli = NexoClient(args.api)

    # Intento auto-registro (silencioso si el usuario ya existe)
    if not args.saltar_registro:
        cli.registrar_si_no_existe(args.usuario, args.password)

    cli.login(args.usuario, args.password)

    personas = crear_personas(cli, args.n_personas)
    ubicaciones = crear_ubicaciones(cli, args.n_ubicaciones)
    vehiculos = crear_vehiculos(cli, args.n_vehiculos, personas)
    crear_sucesos(cli, args.n_sucesos, vehiculos, ubicaciones, personas)
    crear_relaciones(cli, args.n_relaciones, personas)
    crear_avistamientos(cli, args.n_avistamientos, vehiculos, ubicaciones)

    print('\n=== LISTO ===')
    print('Ahora ejecuta en el frontend el boton "Ejecutar motor completo"')
    print(f'o con curl: curl -X POST {args.api}/api/v1/engine/ejecutar-todo')
    print('\nCredenciales para loguearte en el frontend:')
    print(f'  Usuario: {args.usuario}')
    print(f'  Password: {args.password}')


if __name__ == '__main__':
    main()