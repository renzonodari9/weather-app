# 🚀 Weather App

Aplicación de clima con frontend React y backend Node.js. Consulta el clima actual y pronóstico de cualquier ciudad del mundo.

## 📌 Descripción
App web que consume la API de OpenWeather para mostrar información meteorológica en tiempo real. Incluye diseño moderno con tema oscuro y visualizaciones claras de datos climáticos.

## 🛠️ Tecnologías

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Lucide React
- Vite

### Backend
- Node.js
- Express
- TypeScript
- Axios

## ⚡ Features
- Búsqueda por ciudad
- Clima actual con detalles
- Pronóstico del día
- Diseño responsive
- Tema oscuro moderno
- Fondo con partículas

## 🌐 Demo

**Frontend**: https://weather-app-front-kdpl.onrender.com

**Backend API**: https://weather-app-gd26.onrender.com

## 📦 Instalación

```bash
# Clonar el repo
git clone https://github.com/renzonodari9/weather-app.git
cd weather-app

# --- FRONTEND ---
cd client
npm install
npm run dev

# --- BACKEND (en otra terminal) ---
cd server
npm install
npm run dev
```

## 🔐 Variables de Entorno (Backend)

```env
PORT=3001
OPENWEATHER_API_KEY=tu-api-key
```

## 📁 Estructura

```
weather-app/
├── client/          # Frontend React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
│   └── package.json
│
└── server/         # Backend Node.js
    ├── src/
    │   └── index.ts
    └── package.json
```

## 👨‍💻 Autor
**Renzo Nodari** - Desarrollador Full Stack
- GitHub: @renzonodari9
