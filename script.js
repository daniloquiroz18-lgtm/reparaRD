<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#003366">
    <link rel="manifest" href="manifest.json">
    <link rel="icon" href="icon.svg" type="image/svg+xml">
    <title>reparaRD - Prototipo Arreglado</title>
    <!-- Iconos Material de Google -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #f4f6f9;
            color: #333;
            display: flex;
            justify-content: center;
            min-height: 100vh;
        }

        /* Contenedor del celular virtual */
        .app-container {
            width: 100%;
            max-width: 412px;
            background-color: #ffffff;
            min-height: 100vh;
            position: relative;
            box-shadow: 0 0 20px rgba(0,0,0,0.05);
            display: flex;
            flex-direction: column;
        }

        /* Vistas independientes */
        .view {
            display: none; /* Ocultas por defecto */
            flex-direction: column;
            flex: 1;
            padding-bottom: 80px;
        }

        /* Fuerza a mostrar solo la pantalla con la clase 'active' */
        .view.active {
            display: flex !important;
        }

        /* Encabezados */
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background-color: #ffffff;
            border-bottom: 1px solid #eef2f5;
        }

        header .logo {
            font-size: 22px;
            font-weight: 800;
            color: #003366;
        }

        header .logo span { color: #d9534f; }

        .icon-btn {
            background: none;
            border: none;
            color: #555;
            cursor: pointer;
            display: flex;
            align-items: center;
        }

        /* --- PANTALLA 1: INICIO --- */
        .search-section { padding: 20px; }
        .search-section h2 { font-size: 18px; font-weight: 600; margin-bottom: 12px; }
        .search-bar {
            display: flex;
            align-items: center;
            background-color: #f0f2f5;
            padding: 12px 15px;
            border-radius: 12px;
        }
        .search-bar input { border: none; background: none; width: 100%; font-size: 15px; outline: none; margin-left: 8px; }
        
        .emergency-container { padding: 0 20px 20px 20px; }
        .emergency-btn {
            width: 100%;
            background: linear-gradient(135deg, #d9534f, #c9302c);
            color: white;
            border: none;
            padding: 18px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 6px 15px rgba(217, 83, 79, 0.3);
            cursor: pointer;
        }
        .emergency-text { text-align: left; }
        .emergency-text h3 { font-size: 17px; font-weight: 700; }
        .emergency-text p { font-size: 12px; opacity: 0.9; }
        
        .categories-section { padding: 0 20px; }
        .categories-section h4 { font-size: 13px; font-weight: 700; color: #777; text-transform: uppercase; margin-bottom: 15px; }
        .grid-categories { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
        .category-group { margin-bottom: 22px; }
        .category-group h5 { font-size: 15px; color: #003366; margin-bottom: 10px; }
        
        .category-card {
            background-color: #ffffff;
            border: 1px solid #eef2f5;
            padding: 20px 15px;
            border-radius: 16px;
            text-align: center;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .category-card:hover { background-color: #f8faff; border-color: #003366; }
        
        .category-card .icon-wrapper {
            width: 50px; height: 50px; background-color: #e6f0fa; border-radius: 12px;
            display: flex; align-items: center; justify-content: center; color: #003366; margin-bottom: 12px;
        }
        .category-card p { font-size: 14px; font-weight: 600; }

        /* --- PANTALLA 2: FORMULARIO --- */
        .form-content { padding: 20px; display: flex; flex-direction: column; gap: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group label { font-size: 14px; font-weight: 700; color: #444; }
        .form-group input, .form-group textarea, .form-group select {
            width: 100%; padding: 12px; border: 1px solid #ccd4dc; border-radius: 12px; font-size: 15px; outline: none; background-color: #fcfdfe;
        }
        .form-group textarea { height: 100px; resize: none; }
        .photos-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .photo-box {
            aspect-ratio: 1; border: 2px dashed #ccd4dc; border-radius: 12px;
            display: flex; align-items: center; justify-content: center; color: #888; cursor: pointer; background-color: #fafbfc;
        }
        .whatsapp-btn {
            width: 100%; background-color: #25D366; color: white; border: none; padding: 16px;
            border-radius: 14px; font-size: 16px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.2); margin-top: 10px;
        }

        /* --- PANTALLA 3: PRECIOS --- */
        .price-list { padding: 20px; display: flex; flex-direction: column; gap: 15px; }
        .price-item {
            display: flex; justify-content: space-between; align-items: center;
            padding: 15px; border: 1px solid #eef2f5; border-radius: 12px; background-color: #fafbfc;
        }
        .price-info h5 { font-size: 15px; font-weight: 700; color: #003366; }
        .price-info p { font-size: 12px; color: #666; margin-top: 2px; }
        .price-tag { background-color: #e6f0fa; color: #003366; padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: 700; }

        /* MENÚ INFERIOR */
        nav.bottom-nav {
            position: absolute; bottom: 0; left: 0; width: 100%; height: 70px;
            background-color: #ffffff; border-top: 1px solid #eef2f5; display: flex; justify-content: space-around; align-items: center; z-index: 10;
        }
        .nav-item { display: flex; flex-direction: column; align-items: center; color: #888; text-decoration: none; font-size: 11px; font-weight: 500; cursor: pointer; }
        .nav-item.active { color: #003366; }
        .nav-item span { font-size: 24px; margin-bottom: 2px; }
    </style>
</head>
<body>

    <div class="app-container">
        
        <!-- VISTA 1: HOME -->
        <div id="home-view" class="view active">
            <header>
                <div class="icon-btn"><span class="material-icons-round">menu</span></div>
                <div class="logo">repara<span>RD</span></div>
                <div class="icon-btn"><span class="material-icons-round">notifications</span></div>
            </header>

            <section class="search-section">
                <h2>¿Qué necesitas reparar hoy?</h2>
                <div class="search-bar">
                    <span class="material-icons-round">search</span>
                    <input type="text" placeholder="Busca plomero, electricista...">
                </div>
            </section>

            <section class="emergency-container">
                <div class="emergency-btn" onclick="openForm('🚨 EMERGENCIA 24/7 🚨');">
                    <div class="emergency-text">
                        <h3>🚨 EMERGENCIA 24/7</h3>
                        <p>Técnico asignado de inmediato</p>
                    </div>
                    <span class="material-icons-round" style="font-size: 32px;">bolt</span>
                </div>
            </section>

            <section class="categories-section">
                <h4>Servicios disponibles</h4>

                <div class="category-group">
                    <h5>🔧 Reparaciones</h5>
                    <div class="grid-categories">
                        <div class="category-card" onclick="openForm('Plomería');"><div class="icon-wrapper"><span class="material-icons-round">water_drop</span></div><p>Plomería</p></div>
                        <div class="category-card" onclick="openForm('Electricidad');"><div class="icon-wrapper"><span class="material-icons-round">bolt</span></div><p>Electricidad</p></div>
                        <div class="category-card" onclick="openForm('Reparación de baños');"><div class="icon-wrapper"><span class="material-icons-round">bathroom</span></div><p>Reparación de baños</p></div>
                        <div class="category-card" onclick="openForm('Reparación de filtraciones');"><div class="icon-wrapper"><span class="material-icons-round">water_damage</span></div><p>Reparación de filtraciones</p></div>
                        <div class="category-card" onclick="openForm('Reparación de techos');"><div class="icon-wrapper"><span class="material-icons-round">roofing</span></div><p>Reparación de techos</p></div>
                        <div class="category-card" onclick="openForm('Pintura');"><div class="icon-wrapper"><span class="material-icons-round">format_paint</span></div><p>Pintura</p></div>
                        <div class="category-card" onclick="openForm('Impermeabilización');"><div class="icon-wrapper"><span class="material-icons-round">home_repair_service</span></div><p>Impermeabilización</p></div>
                        <div class="category-card" onclick="openForm('Albañilería');"><div class="icon-wrapper"><span class="material-icons-round">construction</span></div><p>Albañilería</p></div>
                        <div class="category-card" onclick="openForm('Reparación de pisos');"><div class="icon-wrapper"><span class="material-icons-round">grid_view</span></div><p>Reparación de pisos</p></div>
                        <div class="category-card" onclick="openForm('Reparación de paredes');"><div class="icon-wrapper"><span class="material-icons-round">format_paint</span></div><p>Reparación de paredes</p></div>
                    </div>
                </div>

                <div class="category-group">
                    <h5>🚪 Puertas y seguridad</h5>
                    <div class="grid-categories">
                        <div class="category-card" onclick="openForm('Puertas enrollables');"><div class="icon-wrapper"><span class="material-icons-round">sensor_door</span></div><p>Puertas enrollables</p></div>
                        <div class="category-card" onclick="openForm('Portones eléctricos');"><div class="icon-wrapper"><span class="material-icons-round">sensor_door</span></div><p>Portones eléctricos</p></div>
                        <div class="category-card" onclick="openForm('Motores de portones');"><div class="icon-wrapper"><span class="material-icons-round">settings</span></div><p>Motores de portones</p></div>
                        <div class="category-card" onclick="openForm('Cerraduras');"><div class="icon-wrapper"><span class="material-icons-round">lock</span></div><p>Cerraduras</p></div>
                        <div class="category-card" onclick="openForm('Intercomunicadores');"><div class="icon-wrapper"><span class="material-icons-round">call</span></div><p>Intercomunicadores</p></div>
                        <div class="category-card" onclick="openForm('Controles eléctricos');"><div class="icon-wrapper"><span class="material-icons-round">settings_remote</span></div><p>Controles eléctricos</p></div>
                        <div class="category-card" onclick="openForm('Reparación de puertas y ventanas');"><div class="icon-wrapper"><span class="material-icons-round">window</span></div><p>Reparación de puertas y ventanas</p></div>
                        <div class="category-card" onclick="openForm('Instalación de puertas');"><div class="icon-wrapper"><span class="material-icons-round">door_front</span></div><p>Instalación de puertas</p></div>
                        <div class="category-card" onclick="openForm('Cámaras de seguridad');"><div class="icon-wrapper"><span class="material-icons-round">videocam</span></div><p>Cámaras de seguridad</p></div>
                        <div class="category-card" onclick="openForm('Shutters de aluminio');"><div class="icon-wrapper"><span class="material-icons-round">window</span></div><p>Shutters de aluminio</p></div>
                    </div>
                </div>

                <div class="category-group">
                    <h5>🪚 Carpintería y mobiliario</h5>
                    <div class="grid-categories">
                        <div class="category-card" onclick="openForm('Carpintería');"><div class="icon-wrapper"><span class="material-icons-round">carpenter</span></div><p>Carpintería</p></div>
                        <div class="category-card" onclick="openForm('Instalación de camas');"><div class="icon-wrapper"><span class="material-icons-round">bed</span></div><p>Instalación de camas</p></div>
                        <div class="category-card" onclick="openForm('Armado de muebles');"><div class="icon-wrapper"><span class="material-icons-round">chair</span></div><p>Armado de muebles</p></div>
                        <div class="category-card" onclick="openForm('Closet');"><div class="icon-wrapper"><span class="material-icons-round">shelves</span></div><p>Closet</p></div>
                        <div class="category-card" onclick="openForm('Gabinetes de cocina');"><div class="icon-wrapper"><span class="material-icons-round">kitchen</span></div><p>Gabinetes de cocina</p></div>
                        <div class="category-card" onclick="openForm('Muebles de baño');"><div class="icon-wrapper"><span class="material-icons-round">bathroom</span></div><p>Muebles de baño</p></div>
                        <div class="category-card" onclick="openForm('Repisas');"><div class="icon-wrapper"><span class="material-icons-round">shelves</span></div><p>Repisas</p></div>
                        <div class="category-card" onclick="openForm('Puertas de madera');"><div class="icon-wrapper"><span class="material-icons-round">door_front</span></div><p>Puertas de madera</p></div>
                        <div class="category-card" onclick="openForm('Fabricación de muebles a medida');"><div class="icon-wrapper"><span class="material-icons-round">design_services</span></div><p>Fabricación de muebles a medida</p></div>
                    </div>
                </div>

                <div class="category-group">
                    <h5>🏗️ Construcción y remodelación</h5>
                    <div class="grid-categories">
                        <div class="category-card" onclick="openForm('Remodelación de baños');"><div class="icon-wrapper"><span class="material-icons-round">bathroom</span></div><p>Remodelación de baños</p></div>
                        <div class="category-card" onclick="openForm('Remodelación de cocinas');"><div class="icon-wrapper"><span class="material-icons-round">kitchen</span></div><p>Remodelación de cocinas</p></div>
                        <div class="category-card" onclick="openForm('Construcción de paredes');"><div class="icon-wrapper"><span class="material-icons-round">construction</span></div><p>Construcción de paredes</p></div>
                        <div class="category-card" onclick="openForm('Pisos y cerámicas');"><div class="icon-wrapper"><span class="material-icons-round">grid_view</span></div><p>Pisos y cerámicas</p></div>
                        <div class="category-card" onclick="openForm('Plafones');"><div class="icon-wrapper"><span class="material-icons-round">view_quilt</span></div><p>Plafones</p></div>
                        <div class="category-card" onclick="openForm('Yeso');"><div class="icon-wrapper"><span class="material-icons-round">format_paint</span></div><p>Yeso</p></div>
                        <div class="category-card" onclick="openForm('Herrería');"><div class="icon-wrapper"><span class="material-icons-round">construction</span></div><p>Herrería</p></div>
                        <div class="category-card" onclick="openForm('Trabajos de soldadura');"><div class="icon-wrapper"><span class="material-icons-round">construction</span></div><p>Trabajos de soldadura</p></div>
                        <div class="category-card" onclick="openForm('Tabla roca (sheetrock)');"><div class="icon-wrapper"><span class="material-icons-round">view_quilt</span></div><p>Tabla roca (sheetrock)</p></div>
                        <div class="category-card" onclick="openForm('Aluminio y vidrio');"><div class="icon-wrapper"><span class="material-icons-round">window</span></div><p>Aluminio y vidrio</p></div>
                        <div class="category-card" onclick="openForm('Divisiones');"><div class="icon-wrapper"><span class="material-icons-round">view_week</span></div><p>Divisiones</p></div>
                        <div class="category-card" onclick="openForm('Techos');"><div class="icon-wrapper"><span class="material-icons-round">roofing</span></div><p>Techos</p></div>
                        <div class="category-card" onclick="openForm('Ampliaciones');"><div class="icon-wrapper"><span class="material-icons-round">add_home</span></div><p>Ampliaciones</p></div>
                        <div class="category-card" onclick="openForm('Construcción en general');"><div class="icon-wrapper"><span class="material-icons-round">construction</span></div><p>Construcción en general</p></div>
                        <div class="category-card" onclick="openForm('Construcción de casas y apartamentos');"><div class="icon-wrapper"><span class="material-icons-round">apartment</span></div><p>Construcción de casas y apartamentos</p></div>
                        <div class="category-card" onclick="openForm('Maestro constructor, ingenieros y arquitectos');"><div class="icon-wrapper"><span class="material-icons-round">engineering</span></div><p>Maestro constructor, ingenieros y arquitectos</p></div>
                        <div class="category-card" onclick="openForm('Vidrios y gabinetes');"><div class="icon-wrapper"><span class="material-icons-round">window</span></div><p>Vidrios y gabinetes</p></div>
                        <div class="category-card" onclick="openForm('Puertas, ventanas y mamparas');"><div class="icon-wrapper"><span class="material-icons-round">sensor_door</span></div><p>Puertas, ventanas y mamparas</p></div>
                        <div class="category-card" onclick="openForm('Cerámicas, pisos y cemento');"><div class="icon-wrapper"><span class="material-icons-round">grid_view</span></div><p>Cerámicas, pisos y cemento</p></div>
                    </div>
                </div>

                <div class="category-group">
                    <h5>❄️ Equipos del hogar</h5>
                    <div class="grid-categories">
                        <div class="category-card" onclick="openForm('Aire acondicionado');"><div class="icon-wrapper"><span class="material-icons-round">ac_unit</span></div><p>Aires acondicionados</p></div>
                        <div class="category-card" onclick="openForm('Abanicos');"><div class="icon-wrapper"><span class="material-icons-round">air</span></div><p>Abanicos</p></div>
                        <div class="category-card" onclick="openForm('Extractores');"><div class="icon-wrapper"><span class="material-icons-round">mode_fan</span></div><p>Extractores</p></div>
                        <div class="category-card" onclick="openForm('Bombas de agua');"><div class="icon-wrapper"><span class="material-icons-round">water</span></div><p>Bombas de agua</p></div>
                        <div class="category-card" onclick="openForm('Calentadores');"><div class="icon-wrapper"><span class="material-icons-round">water_heater</span></div><p>Calentadores</p></div>
                        <div class="category-card" onclick="openForm('Lavadoras');"><div class="icon-wrapper"><span class="material-icons-round">local_laundry_service</span></div><p>Lavadoras</p></div>
                        <div class="category-card" onclick="openForm('Secadoras');"><div class="icon-wrapper"><span class="material-icons-round">dry_cleaning</span></div><p>Secadoras</p></div>
                        <div class="category-card" onclick="openForm('Neveras');"><div class="icon-wrapper"><span class="material-icons-round">kitchen</span></div><p>Neveras</p></div>
                    </div>
                </div>

                <div class="category-group">
                    <h5>🏢 Condominios y empresas</h5>
                    <div class="grid-categories">
                        <div class="category-card" onclick="openForm('Mantenimiento de áreas comunes');"><div class="icon-wrapper"><span class="material-icons-round">business</span></div><p>Mantenimiento de áreas comunes</p></div>
                        <div class="category-card" onclick="openForm('Reparaciones de apartamentos');"><div class="icon-wrapper"><span class="material-icons-round">home_repair_service</span></div><p>Reparaciones de apartamentos</p></div>
                        <div class="category-card" onclick="openForm('Mantenimiento preventivo');"><div class="icon-wrapper"><span class="material-icons-round">build</span></div><p>Mantenimiento preventivo</p></div>
                        <div class="category-card" onclick="openForm('Mantenimiento de portones');"><div class="icon-wrapper"><span class="material-icons-round">sensor_door</span></div><p>Portones</p></div>
                        <div class="category-card" onclick="openForm('Mantenimiento de bombas');"><div class="icon-wrapper"><span class="material-icons-round">water</span></div><p>Bombas</p></div>
                        <div class="category-card" onclick="openForm('Electricidad para empresas y condominios');"><div class="icon-wrapper"><span class="material-icons-round">bolt</span></div><p>Electricidad</p></div>
                        <div class="category-card" onclick="openForm('Plomería para empresas y condominios');"><div class="icon-wrapper"><span class="material-icons-round">water_drop</span></div><p>Plomería</p></div>
                        <div class="category-card" onclick="openForm('Pintura para empresas y condominios');"><div class="icon-wrapper"><span class="material-icons-round">format_paint</span></div><p>Pintura</p></div>
                        <div class="category-card" onclick="openForm('Jardinería');"><div class="icon-wrapper"><span class="material-icons-round">yard</span></div><p>Jardinería</p></div>
                        <div class="category-card" onclick="openForm('Mantenimiento de piscinas');"><div class="icon-wrapper"><span class="material-icons-round">pool</span></div><p>Mantenimiento de piscinas</p></div>
                    </div>
                </div>
            </section>
        </div>

        <!-- VISTA 2: FORMULARIO -->
        <div id="form-view" class="view">
            <header>
                <div class="icon-btn" onclick="switchView('home-view');"><span class="material-icons-round">arrow_back</span></div>
                <div class="logo" id="form-title">Solicitud</div>
                <div style="width: 24px;"></div>
            </header>

            <div class="form-content">
                <div class="form-group">
                    <label for="client-name">Tu Nombre Completo</label>
                    <input type="text" id="client-name" placeholder="Ej. Juan Pérez" required>
                </div>

                <div class="form-group">
                    <label for="client-sector">Sector (Santo Domingo)</label>
                    <select id="client-sector" required>
                        <option value="" disabled selected>Selecciona tu sector</option>
                        <option>Distrito Nacional</option>
                        <option>Santo Domingo Este</option>
                        <option>Santo Domingo Norte</option>
                        <option>Santo Domingo Oeste</option>
                        <option>Boca Chica</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="client-phone">Teléfono</label>
                    <input type="tel" id="client-phone" placeholder="Ej. 809-555-1234" required>
                </div>

                <div class="form-group">
                    <label for="problem-description">Describe el problema</label>
                    <textarea id="problem-description" placeholder="Cuéntanos qué necesitas reparar..." required></textarea>
                </div>

                <button class="whatsapp-btn" type="button" onclick="sendRequest()">
                    <span class="material-icons-round">chat</span>
                    Enviar solicitud por WhatsApp
                </button>
            </div>
        </div>

        <!-- VISTA 3: PRECIOS -->
        <div id="prices-view" class="view">
            <header>
                <div class="icon-btn" onclick="switchView('home-view');"><span class="material-icons-round">arrow_back</span></div>
                <div class="logo">Precios</div>
                <div style="width: 24px;"></div>
            </header>
            <section class="price-list">
                <div class="price-item">
                    <div class="price-info"><h5>Plomería</h5><p>Evaluación inicial; materiales aparte</p></div>
                    <span class="price-tag">A cotizar</span>
                </div>
                <div class="price-item">
                    <div class="price-info"><h5>Electricidad</h5><p>Evaluación inicial; materiales aparte</p></div>
                    <span class="price-tag">A cotizar</span>
                </div>
                <div class="price-item">
                    <div class="price-info"><h5>Portones eléctricos</h5><p>Revisión y diagnóstico</p></div>
                    <span class="price-tag">A cotizar</span>
                </div>
                <div class="price-item">
                    <div class="price-info"><h5>Carpintería</h5><p>Evaluación según el trabajo</p></div>
                    <span class="price-tag">A cotizar</span>
                </div>
            </section>
        </div>

        <nav class="bottom-nav" aria-label="Navegación principal">
            <a class="nav-item active" href="#inicio" onclick="switchView('home-view'); return false;">
                <span class="material-icons-round">home</span>Inicio
            </a>
            <a class="nav-item" href="#precios" onclick="switchView('prices-view'); return false;">
                <span class="material-icons-round">payments</span>Precios
            </a>
        </nav>
    </div>

    <script src="script.js"></script>
</body>
</html>
