# STUDIO EB

Sitio web del instituto **STUDIO EB** con diseño moderno, integración con **Mercado Pago** para cobro de cuotas, y secciones: pagar cuota, inscribirme a cursos, eventos próximos y galería.

## Cómo iniciar

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Desarrollo (frontend)**
   ```bash
   npm run dev
   ```
   Abrí: **http://localhost:5173**

3. **Servidor API (para pagos con Mercado Pago)**
   En otra terminal:
   ```bash
   npm run server
   ```
   Configurá un archivo `.env` con `VITE_MP_ACCESS_TOKEN` (ver `.env.example`).

## Accesos (login)

- **Admin:** usuario `carlabrusa` y contraseña `123`. Solo el admin puede registrar profesores y alumnos nuevos.
- **Profesores:** email y contraseña asignados por el admin. Pueden registrar, editar y eliminar alumnos.
- **Alumnos:** email y contraseña asignados por el profesor o admin. Solo los alumnos pueden pagar la cuota.

Los profesores y alumnos se guardan en el navegador (localStorage).

## Imágenes

- **Logo:** `public/galeria/logo.jpg`
- **Galería:** `public/galeria/1.jpg` … `public/galeria/7.jpg`

## Build para producción

```bash
npm run build
npm run preview
```

## Subir el proyecto a GitHub

Ver **[GITHUB.md](GITHUB.md)** para una guía paso a paso (instalar Git, crear el repositorio y subir el código).

## Publicar online (para que el cliente lo vea)

Ver **[DEPLOY.md](DEPLOY.md)** con los pasos para subir el sitio a **Vercel** o **Netlify** (gratis) y opcionalmente el servidor de pagos a **Render**.

## Actualizar la web cuando hagas cambios

Si ya conectaste el repo con Vercel, cada vez que subas cambios a GitHub la web se actualiza sola. Desde la carpeta del proyecto:

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

En 1–2 minutos los cambios se verán en la URL de Vercel.
