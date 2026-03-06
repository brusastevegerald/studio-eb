# Cómo subir el proyecto STUDIO EB a GitHub

Guía paso a paso para subir tu proyecto a GitHub desde cero.

---

## Paso 1: Tener Git instalado

1. Abrí **PowerShell** o **Símbolo del sistema** (buscalo en el menú de Windows).
2. Escribí:
   ```bash
   git --version
   ```
3. Si aparece algo como `git version 2.x.x`, ya está instalado. Si dice "no reconocido", instalalo:
   - Entrá en [git-scm.com/download/win](https://git-scm.com/download/win)
   - Descargá e instalá Git para Windows (dejá las opciones por defecto).
   - Cerrá y volvé a abrir la terminal.

---

## Paso 2: Crear una cuenta en GitHub (si no tenés)

1. Entrá en [github.com](https://github.com).
2. Click en **Sign up**.
3. Completá email, contraseña y usuario. Verificá el email si te lo pide.

---

## Paso 3: Crear un repositorio nuevo en GitHub

1. Iniciá sesión en GitHub.
2. Arriba a la derecha, click en el **+** → **New repository**.
3. Completá:
   - **Repository name:** por ejemplo `studio-eb` (sin espacios).
   - **Description:** opcional, ej. "Sitio web STUDIO EB".
   - Dejá **Public**.
   - **No** marques "Add a README" ni "Add .gitignore" (el proyecto ya los tiene).
4. Click en **Create repository**.

5. En la página que te muestra GitHub vas a ver una URL como:
   ```text
   https://github.com/TU-USUARIO/studio-eb.git
   ```
   Esa URL la vas a usar en el Paso 5. No cierres esa pestaña todavía.

---

## Paso 4: Abrir la terminal en la carpeta del proyecto

1. Abrí **Explorador de archivos** y andá a la carpeta del proyecto:
   ```text
   C:\studio-app
   ```
2. En la barra de direcciones de la carpeta escribí `cmd` y apretá Enter.  
   Se abre una ventana negra (terminal) ya ubicada en `C:\studio-app`.  
   O bien: click derecho en la carpeta → **Abrir en terminal** (si tu Windows lo muestra).

---

## Paso 5: Comandos para subir el proyecto

Copiá y pegá **uno por uno** en la terminal (después de cada uno apretá Enter).

**1) Inicializar Git en la carpeta**
```bash
git init
```
Deberías ver: "Initialized empty Git repository...".

**2) Decirle a Git qué archivos incluir**
```bash
git add .
```
El punto significa "todo lo que está en esta carpeta" (respetando el `.gitignore`, así que no se suben `node_modules` ni `.env`).

**3) Hacer el primer "guardado" (commit)**
```bash
git commit -m "Sitio STUDIO EB - primera subida"
```
El mensaje entre comillas puede ser otro si querés.

**4) Ponerle nombre a la rama principal**
```bash
git branch -M main
```

**5) Conectar esta carpeta con tu repositorio de GitHub**

Reemplazá `TU-USUARIO` por tu usuario de GitHub y `studio-eb` por el nombre del repo que creaste en el Paso 3:
```bash
git remote add origin https://github.com/TU-USUARIO/studio-eb.git
```
Ejemplo si tu usuario es "mariaperez" y el repo "studio-eb":
```bash
git remote add origin https://github.com/mariaperez/studio-eb.git
```

**6) Subir el código a GitHub**
```bash
git push -u origin main
```

- La primera vez puede pedirte **usuario y contraseña** de GitHub.  
- Si GitHub te pide contraseña, en la web de GitHub andá a **Settings** → **Developer settings** → **Personal access tokens** y creá un token; usá ese token como contraseña en la terminal.
- Si todo sale bien, al final verás algo como "branch 'main' set up to track 'origin/main'".

---

## Paso 6: Verificar en GitHub

1. Entrá de nuevo en tu repositorio en GitHub (por ejemplo `https://github.com/TU-USUARIO/studio-eb`).
2. Refrescá la página (F5).
3. Deberías ver todas las carpetas y archivos del proyecto: `src`, `public`, `package.json`, etc.

Listo: el proyecto ya está subido a GitHub.

---

## Resumen de comandos (cuando ya hiciste el Paso 5 una vez)

Si más adelante cambiás algo en el proyecto y querés **actualizar** lo que está en GitHub:

```bash
cd C:\studio-app
git add .
git commit -m "Descripción del cambio"
git push
```

Siempre desde la carpeta `C:\studio-app` (o la ruta donde tengas el proyecto).

---

## Si algo falla

| Problema | Qué hacer |
|----------|-----------|
| "git no se reconoce" | Instalá Git (Paso 1) y abrí una **nueva** terminal. |
| "failed to push" / "Authentication failed" | GitHub ya no acepta contraseña normal. Creá un **Personal access token** en GitHub (Settings → Developer settings → Personal access tokens) y usalo como contraseña al hacer `git push`. |
| "remote origin already exists" | Ya conectaste el repo. Para cambiar la URL: `git remote set-url origin https://github.com/TU-USUARIO/studio-eb.git` |
| "Permission denied" | Revisá que la URL tenga **tu** usuario y un repo que **vos** hayas creado (o en el que tengas permiso de escritura). |

Si querés, después de tener el proyecto en GitHub podés seguir con [DEPLOY.md](DEPLOY.md) para publicar el sitio en Vercel y que el cliente lo vea online.
