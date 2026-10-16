# Rick & Morty Explorer · Microfrontends

Aplicación web construida con arquitectura de microfrontends que consume la API (https://rickandmortyapi.com). Permite explorar personajes con
filtros y ver el detalle de cada uno con la lista de episodios en los que aparece.


| Microfrontend | Puerto | Responsabilidad | Expone |
|---|---|---|---|
| **MF-Shell** | 3000 | Contenedor: ruteo, layout común (navbar, footer), aislamiento de errores | — |
| **MF-Characters** | 3001 | Listado de personajes en tarjetas, filtros por nombre, estado y especie, paginación | `./Characters` |
| **MF-CharacterDetail** | 3002 | Información ampliada del personaje y lista de episodios | `./CharacterDetail` |

### Comunicación entre microfrontends

Los microfrontends no se conocen entre sí; el Shell los conecta mediante **props**:

1. MF-Characters recibe `onSelect(id)` y lo invoca al seleccionar una tarjeta.
2. El Shell navega a `/character/:id`.
3. El Shell lee el `id` de la URL y lo pasa a MF-CharacterDetail junto con `onBack()`.

Solo el Shell usa React Router. Esto permite que cada microfrontend funcione de forma
independiente (standalone) y facilita sus pruebas.

## Stack

- **React 19 + TypeScript**
- **Vite** + **@module-federation/vite** (Module Federation 2.0)
- **React Router** (solo en el Shell)
- **CSS puro** con prefijos por microfrontend (`shell-`, `chr-`, `cd-`)
- **Vitest + React Testing Library** para pruebas
- **Docker + Nginx** para el despliegue

> **Sobre Webpack:** el examen indica "Webpack Module Federation o similar". Se eligió
> `@module-federation/vite`, la implementación oficial de Module Federation 2.0 para Vite.
> Usa el mismo modelo que Webpack 5 (`remoteEntry.js`, `exposes`, `remotes`, `shared`)
> con tiempos de arranque y recarga considerablemente menores.

## Estructura

```
.
|- docker-compose.yml
|- MF-Shell/
│   > src/
│       > components/   Navbar, Footer, Layout, ErrorBoundary, RemoteBoundary
│       > pages/        Adaptadores que montan cada microfrontend
│       > utils/        Logger estructurado
│       > remotes.d.ts  Contrato de tipos de los microfrontends
|- MF-Characters/
│   > src/
│       > services/     Acceso a la API
│       > hooks/        Estado, carga, errores y debounce
│       > components/   UI: CharacterCard, Filters, Pagination
│       > utils/        Logger estructurado
│       > __tests__/
|- MF-CharacterDetail/
|    > src/
|      > services/     Acceso a la API (personaje y episodios)
|      > hooks/
|      > components/   UI: CharacterInfo, EpisodeList
|      > utils/
|      > __tests__/
        
```

Cada microfrontend separa servicios (comunicación con la API), hooks (lógica y
estado) y componentes (UI).

## Requisitos

- **Docker Desktop** (para la ejecución con contenedores), o
- **Node.js 20+** y npm (para la ejecución local)

## Ejecución con Docker (recomendado)

Desde la raíz del repositorio:

```bash
docker compose up --build
```

Abrir **http://localhost:3000**.

| Servicio | URL |
|---|---|
| MF-Shell (aplicación) | http://localhost:3000 |
| MF-Characters (standalone) | http://localhost:3001 |
| MF-CharacterDetail (standalone) | http://localhost:3002 |

Para detener: `Ctrl + C` y luego `docker compose down`.

Cada microfrontend tiene su propio `Dockerfile` multi-stage: una etapa con Node
construye la aplicación y una etapa con Nginx sirve los archivos estáticos.

## Ejecución local (sin Docker)

Instalar dependencias en cada microfrontend (solo la primera vez):

```bash
cd MF-Characters && npm install && cd ..
cd MF-CharacterDetail && npm install && cd ..
cd MF-Shell && npm install && cd ..
```

Levantar cada uno en una terminal distinta. **Los microfrontends deben iniciarse antes que el Shell.**

```bash
# Terminal 1
cd MF-Characters && npm run dev        # http://localhost:3001

# Terminal 2
cd MF-CharacterDetail && npm run dev   # http://localhost:3002

# Terminal 3
cd MF-Shell && npm run dev             # http://localhost:3000
```

### Correr un microfrontend de forma independiente

- **MF-Characters:** `http://localhost:3001`. Al seleccionar un personaje, el id se muestra en la consola.
- **MF-CharacterDetail:** `http://localhost:3002/?id=2` (el parámetro `id` define el personaje).

## Pruebas

```bash
cd MF-Characters && npm run test:run
cd MF-CharacterDetail && npm run test:run
```

| Archivo | Tipo | Qué valida |
|---|---|---|
| `CharacterCard.test.tsx` | Componente | Muestra imagen, nombre, estado, especie y género; emite `onSelect` con el id |
| `Characters.test.tsx` | Integración | Estado de carga, renderizado de resultados y manejo de error con reintento |
| `EpisodeList.test.tsx` | Componente | Lista de episodios y mensaje de error |
| `characterDetailService.test.ts` | Unitaria | Normaliza la respuesta de un solo episodio y agrupa los ids en una sola petición |

## Manejo de errores y logging

- **Errores de red, HTTP y 404** se distinguen en la capa de servicios y se traducen a mensajes claros para el usuario.
- En el listado, un **404 de la API** (filtro sin coincidencias) se trata como lista vacía, no como error.
- En el detalle, si falla la carga de episodios, **la ficha del personaje se muestra igualmente** (degradación parcial).
- Las peticiones obsoletas se cancelan con **AbortController** para evitar condiciones de carrera.
- Cada microfrontend se monta dentro de un **Error Boundary** propio: si uno falla, el resto de la aplicación sigue funcionando.
- **Logging estructurado** en JSON con `timestamp`, `level`, `mf`, `message` y `context`:

```json
{"timestamp":"2026-10-15T18:30:00.000Z","level":"error","mf":"mf-characters","message":"HTTP error fetching characters","context":{"url":"...","status":500}}
```

## Decisiones técnicas

- **React como singleton compartido** entre Shell y microfrontends: evita cargar React dos veces y errores de hooks.
- **Debounce de 400 ms** en filtros de texto para reducir peticiones a la API.
- **Una sola petición para todos los episodios** (`/episode/1,2,3`), en lugar de una por episodio.
- **Estilos aislados** mediante prefijos de clase y variables CSS limitadas al contenedor de cada microfrontend.
- **Accesibilidad:** tarjetas como `<button>`, roles `status` y `alert` en estados de carga y error, etiquetas en filtros.

## Mejoras futuras

- Persistir filtros y página en la URL (query string) para conservarlos al volver del detalle.
- Configuración de URLs de microfrontends en tiempo de ejecución, para no reconstruir la imagen del Shell al cambiar de entorno.
- Enviar los logs a un servicio de monitoreo.
- Pruebas end-to-end (Playwright) del flujo completo entre microfrontends.

## Autor

Angel Daniel Velazquez Gomez 