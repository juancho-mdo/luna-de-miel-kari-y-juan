# Juan & Karina — Lista de Regalos de Luna de Miel

Página web para que los invitados a nuestro casamiento puedan regalarnos experiencias para la luna de miel por Grecia, Italia y España.

## Cómo funciona

1. Los invitados eligen una experiencia (vuelos, hotel, cenas, etc.)
2. Aportan el monto que quieran hacia esa experiencia
3. Completan su nombre y email
4. Ven los datos bancarios para transferir (ARS, MXN o USD)
5. Nos avisan por WhatsApp con un mensaje pre-armado

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:5173/luna-de-miel/

## Deploy en GitHub Pages

El deploy es automático: cada push a `main` dispara el workflow de GitHub Actions que hace build y publica en GitHub Pages.

### Pasos para activarlo:

1. Crear un repositorio en GitHub (ej: `luna-de-miel`)
2. En el repo: **Settings → Pages → Source → GitHub Actions**
3. Subir el código:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/luna-de-miel.git
git push -u origin main
```

4. Esperar que termine el Action (~1 min) y la página estará en:
   `https://TU_USUARIO.github.io/luna-de-miel/`

### Si usás otro nombre de repo

Editar `vite.config.ts` y cambiar el `base`:

```ts
base: "/NOMBRE-DE-TU-REPO/",
```

## Personalización

### Datos bancarios
Editar en `src/App.tsx` el array `BANK_ACCOUNTS` con los datos reales de las cuentas.

### Número de WhatsApp
Editar en `src/App.tsx` la constante `WHATSAPP_NUMBER` con el número real (formato internacional sin +).

### Experiencias / regalos
Editar el array `GIFTS` en `src/App.tsx` para cambiar experiencias, montos o descripciones.

## Stack

React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui
