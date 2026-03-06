# Cómo publicar STUDIO EB online

Para que tu cliente vea el sitio en internet tenés que **subir el proyecto** a un servicio de hosting. Abajo las opciones más simples (gratuitas).

---

## Opción 1: Vercel (recomendada, gratis)

1. **Crear cuenta:** entrá en [vercel.com](https://vercel.com) y registrate (podés usar GitHub).

2. **Subir el proyecto a GitHub** (si aún no está):
   - Creá un repositorio en [github.com](https://github.com).
   - En la carpeta del proyecto (`c:\studio-app`) abrí una terminal y ejecutá:
   ```bash
   git init
   git add .
   git commit -m "STUDIO EB - sitio listo"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git push -u origin main
   ```
   (Reemplazá `TU-USUARIO` y `TU-REPO` por tu usuario y nombre del repo.)

3. **Conectar con Vercel:**
   - En Vercel, click en **Add New** → **Project**.
   - Importá el repositorio de GitHub.
   - **Build settings** (Vercel los detecta solo):
     - Framework: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click en **Deploy**.

4. En unos minutos te dan una URL tipo `https://tu-proyecto.vercel.app`. Esa es la que podés pasarle al cliente.

5. **Pagos con Mercado Pago:**  
   El botón "Pagar cuota" necesita el servidor. Para tenerlo online:
   - Desplegá el servidor en [Render](https://render.com) (gratis): creá un **Web Service**, conectá el mismo repo, poné **Start Command** `node server/index.js`, **Root Directory** dejalo en blanco o `studio-app` si el repo es la carpeta padre.
   - En Render, en **Environment** agregá `MP_ACCESS_TOKEN` (tu token de Mercado Pago).
   - Copiá la URL que te da Render (ej. `https://tu-api.onrender.com`).
   - En Vercel, en tu proyecto: **Settings** → **Environment Variables** → agregá `VITE_API_URL` = `https://tu-api.onrender.com`. Volvé a desplegar (Deployments → ⋮ → Redeploy).

---

## Opción 2: Netlify (gratis)

1. Entrá en [netlify.com](https://netlify.com) y creá una cuenta.

2. **Subir el proyecto:**
   - **Deploys** → **Add new site** → **Import an existing project** → elegí GitHub y el repositorio.
   - O arrastrá la carpeta **dist** después de generar el build (ver paso 3).

3. **Build local (si no usás GitHub):**
   ```bash
   cd c:\studio-app
   npm run build
   ```
   Se genera la carpeta `dist`. En Netlify: **Sites** → **Add new site** → **Deploy manually** y arrastrá la carpeta `dist`.

4. Si conectaste por GitHub, configurá:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy.

5. Netlify te da una URL tipo `https://nombre-random.netlify.app`. Podés cambiar el nombre en **Domain settings**.

---

## Opción 3: Solo la carpeta `dist` (cualquier hosting)

Si ya tenés un hosting (cPanel, otro proveedor):

1. En tu PC, en la carpeta del proyecto:
   ```bash
   cd c:\studio-app
   npm install
   npm run build
   ```
2. Se crea la carpeta **dist** con todos los archivos listos.
3. Subí **todo el contenido** de `dist` (no la carpeta) a la raíz del sitio en tu hosting (por FTP o administrador de archivos).
4. La URL será la que te asigne tu proveedor (ej. `https://tudominio.com`).

**Importante:** Como el sitio usa rutas con `#` (HashRouter), no hace falta configurar redirecciones. Si más adelante cambiás a rutas sin `#`, en muchos hostings hay que poner un `index.html` que redirija todas las rutas al mismo archivo.

---

## Resumen rápido (Vercel + GitHub)

| Paso | Acción |
|------|--------|
| 1 | Cuenta en GitHub y en Vercel |
| 2 | Subir el proyecto a un repo en GitHub |
| 3 | En Vercel: New Project → importar el repo → Deploy |
| 4 | Compartir la URL que te da Vercel con el cliente |

Para que **Pagar cuota** funcione online, además desplegá el servidor (por ejemplo en Render) y configurá `VITE_API_URL` y `MP_ACCESS_TOKEN` como se indica arriba.
