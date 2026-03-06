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

- **Profesores:** en la navbar, "Ingresar" → email `profesor@studio.com` y contraseña `studio123`. Desde el panel podés inscribir, editar y eliminar alumnos.
- **Alumnos:** mismo "Ingresar" con el email y contraseña que les dio el profesor (por defecto `studio2024`). Pueden ver "Mi cuota" y pagar.

Los alumnos se guardan en el navegador (localStorage). Para cambiar la contraseña de un profesor, editá `src/context/AuthContext.jsx` (variable `PROFESORES`).

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
