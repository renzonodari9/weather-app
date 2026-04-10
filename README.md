# 🌤️ Weather App - Mendoza

Aplicación del clima profesional desarrollada con React, TypeScript, Tailwind CSS, Node.js y Express.

## Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **API**: OpenWeatherMap
- **Despliegue**: Render

## Estructura del Proyecto

```
weather-app/
├── client/          # Frontend React
├── server/          # Backend Express
└── README.md
```

## Instalación Local

### 1. Backend

```bash
cd server
npm install
```

Crea un archivo `.env` basado en `.env.example` y agrega tu API key de OpenWeatherMap:

```env
OPENWEATHER_API_KEY=tu_api_key_aqui
PORT=3001
```

Inicia el servidor:

```bash
npm run dev
```

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

## Despliegue en Render

### Backend (API)

1. Crear nuevo Web Service en Render
2. Conectar repositorio GitHub
3. Configurar:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Agregar variable de entorno: `OPENWEATHER_API_KEY`

### Frontend

1. Crear nuevo Static Site en Render
2. Conectar repositorio GitHub
3. Configurar:
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Agregar variable de entorno: `VITE_API_URL=https://tu-backend.onrender.com`

## Obtener API Key de OpenWeatherMap

1. Ve a [openweathermap.org](https://openweathermap.org/api)
2. Crea una cuenta gratuita
3. Copia tu API Key del dashboard

## Funcionalidades

- ✅ Clima actual en tiempo real
- ✅ Información detallada (sensación térmica, humedad, viento, visibilidad)
- ✅ Amanecer y atardecer
- ✅ Pronóstico de 5 días
- ✅ Diseño responsive
- ✅ Efectos visuales profesionales (glass morphism)
- ✅ Soporte para cualquier ciudad de Argentina

## Preview

La app muestra Mendoza por defecto y permite buscar cualquier ciudad argentina.

## Licencia

MIT
