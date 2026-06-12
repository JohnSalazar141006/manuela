-- =====================================================================
-- NEXO CRIMINAL - Datos de ejemplo para demo
-- Ciudad ficticia: Coordenadas aproximadas Miami FL
-- =====================================================================

-- Personas
INSERT INTO persona (documento, nombre, apellido, alias, fecha_nacimiento, rol, telefono) VALUES
('1700000001', 'Juan',   'Pérez',    'El Rápido',  '1985-03-12', 'SOSPECHOSO',   '0991234001'),
('1700000002', 'María',  'Gómez',    NULL,         '1990-07-22', 'VICTIMA',      '0991234002'),
('1700000003', 'Carlos', 'Ramírez',  'Tuerca',     '1978-01-05', 'SOSPECHOSO',   '0991234003'),
('1700000004', 'Ana',    'Torres',   NULL,         '1995-11-14', 'VICTIMA',      '0991234004'),
('1700000005', 'Luis',   'Mendoza',  'El Puente',  '1982-06-30', 'INTERMEDIARIO','0991234005'),
('1700000006', 'Patricia','Vargas',  NULL,         '1988-04-19', 'TESTIGO',      '0991234006'),
('1700000007', 'Roberto','Salazar',  NULL,         '1975-09-02', 'PROPIETARIO',  '0991234007'),
('1700000008', 'Lucía',  'Rojas',    NULL,         '1992-12-08', 'PROPIETARIO',  '0991234008'),
('1700000009', 'Miguel', 'Castro',   'Negro',      '1987-02-15', 'SOSPECHOSO',   '0991234009'),
('1700000010', 'Sofía',  'Núñez',    NULL,         '1998-08-21', 'VICTIMA',      '0991234010')
ON CONFLICT (documento) DO NOTHING;

-- Ubicaciones (lat/lng alrededor de Miami)
INSERT INTO ubicacion (direccion, latitud, longitud, tipo) VALUES
('Av. Principal 123',         25.7617, -80.1918, 'COMERCIO'),
('Taller Mecánico El Galpón', 25.7650, -80.1950, 'TALLER'),
('Galpón zona industrial',    25.7651, -80.1955, 'GALPON'),
('Terreno baldío sector sur', 25.7660, -80.1970, 'TERRENO_BALDIO'),
('Cajero Banco Central',      25.7700, -80.2000, 'CAJERO'),
('Parada Bus Central',        25.7710, -80.2010, 'TRANSPORTE_PUBLICO'),
('Casa Juan Pérez',           25.7800, -80.2100, 'DOMICILIO'),
('Casa Carlos Ramírez',       25.7820, -80.2150, 'DOMICILIO'),
('Casa María Gómez',          25.7830, -80.2160, 'DOMICILIO'),
('Restaurante La Fiesta',     25.7750, -80.2050, 'COMERCIO');

-- Vehículos
INSERT INTO vehiculo (placa, marca, modelo, anio, color, estado, propietario_id) VALUES
('ABC1234', 'Toyota',    'Hilux',    2020, 'Blanco', 'ROBADO',    7),
('DEF5678', 'Chevrolet', 'D-Max',    2019, 'Negro',  'ROBADO',    8),
('GHI9012', 'Ford',      'Ranger',   2021, 'Gris',   'ROBADO',    7),
('JKL3456', 'Nissan',    'Frontier', 2018, 'Rojo',   'NORMAL',    8),
('MNO7890', 'Honda',     'Civic',    2022, 'Blanco', 'NORMAL',    1),
('PQR1111', 'Kia',       'Sportage', 2020, 'Azul',   'NORMAL',    3);

-- Sucesos
INSERT INTO suceso (tipo, fecha_hora, ubicacion_id, ubicacion_ultima_id, vehiculo_id, victima_id, modus_operandi, descripcion) VALUES
('ROBO_VEHICULO',  NOW() - INTERVAL '2 hours',  1, 2, 1, 7, 'INHIBIDOR_SENAL',     'Robo en zona comercial, última señal cerca del taller'),
('ROBO_VEHICULO',  NOW() - INTERVAL '1 hour',   1, 3, 2, 8, 'INHIBIDOR_SENAL',     'Mismo modus operandi que el caso anterior'),
('ROBO_VEHICULO',  NOW() - INTERVAL '30 minutes', 1, 2, 3, 7, 'INHIBIDOR_SENAL',  'Tercera camioneta robada en el día'),
('DESAPARICION',   NOW() - INTERVAL '3 days',   6, 6, NULL, 2, NULL,              'María Gómez desapareció después de tomar el bus en Parada Central'),
('DESAPARICION',   NOW() - INTERVAL '5 days',   6, 5, NULL, 4, NULL,              'Ana Torres desapareció tras usar el cajero; última señal en transporte'),
('AVISTAMIENTO',   NOW() - INTERVAL '1 hour 55 minutes',  2, NULL, 1, NULL, NULL, 'Cámara taller captó la camioneta'),
('AVISTAMIENTO',   NOW() - INTERVAL '55 minutes',         3, NULL, 2, NULL, NULL, 'Cámara galpón captó la segunda camioneta'),
('AVISTAMIENTO',   NOW() - INTERVAL '25 minutes',         2, NULL, 3, NULL, NULL, 'Cámara taller captó la tercera camioneta');

-- Relaciones sociales (para el caso del intermediario)
-- Víctima María (2) conoce a Luis (5) por contacto telefónico
-- Luis (5) conoce a Juan Pérez (1) - sospechoso - como amigo
-- Por tanto: María → Luis → Juan (Luis es el intermediario)
INSERT INTO relacion (persona_a_id, persona_b_id, tipo_relacion, peso) VALUES
(2, 5, 'CONTACTO_TELEFONICO', 3),
(5, 2, 'CONTACTO_TELEFONICO', 3),
(5, 1, 'AMIGO',              5),
(1, 5, 'AMIGO',              5),
(4, 5, 'LABORAL',            2),
(5, 4, 'LABORAL',            2),
(3, 9, 'FAMILIAR',           5),
(9, 3, 'FAMILIAR',           5),
(6, 2, 'AMIGO',              2),
(2, 6, 'AMIGO',              2);

-- Avistamientos (para detectar vehículo escolta)
-- El sedán MNO7890 aparece cerca de los vehículos robados antes de cada robo
INSERT INTO avistamiento (vehiculo_id, ubicacion_id, fecha_hora, fuente) VALUES
(1, 1, NOW() - INTERVAL '2 hours 15 minutes', 'CAMARA_1'),
(5, 1, NOW() - INTERVAL '2 hours 14 minutes', 'CAMARA_1'),
(2, 1, NOW() - INTERVAL '1 hour 15 minutes',  'CAMARA_1'),
(5, 1, NOW() - INTERVAL '1 hour 14 minutes',  'CAMARA_1'),
(3, 1, NOW() - INTERVAL '45 minutes',         'CAMARA_1'),
(5, 1, NOW() - INTERVAL '44 minutes',         'CAMARA_1');

-- =====================================================================
-- Verificación
-- =====================================================================
-- SELECT COUNT(*) AS personas     FROM persona;
-- SELECT COUNT(*) AS vehiculos    FROM vehiculo;
-- SELECT COUNT(*) AS ubicaciones  FROM ubicacion;
-- SELECT COUNT(*) AS sucesos      FROM suceso;
-- SELECT COUNT(*) AS relaciones   FROM relacion;
-- SELECT COUNT(*) AS avistamientos FROM avistamiento;
