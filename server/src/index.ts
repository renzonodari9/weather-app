import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  visibility: number;
  clouds: {
    all: number;
  };
}

interface ForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
    pop: number;
  }>;
}

app.get('/api/weather/:city', async (req: Request, res: Response) => {
  try {
    const { city } = req.params;
    const API_KEY = process.env.OPENWEATHER_API_KEY || 'demo';

    const response = await axios.get<WeatherResponse>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},AR&units=metric&appid=${API_KEY}&lang=es`
    );

    res.json({
      city: response.data.name,
      country: response.data.sys.country,
      temperature: Math.round(response.data.main.temp),
      feelsLike: Math.round(response.data.main.feels_like),
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      iconMain: response.data.weather[0].main,
      windSpeed: Math.round(response.data.wind.speed * 3.6),
      visibility: Math.round((response.data.visibility || 0) / 1000),
      clouds: response.data.clouds.all,
      sunrise: new Date(response.data.sys.sunrise * 1000).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
      sunset: new Date(response.data.sys.sunset * 1000).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
    });
  } catch (error: any) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'Ciudad no encontrada' });
    } else if (error.response?.status === 401) {
      res.status(401).json({ error: 'API key inválida' });
    } else {
      res.status(500).json({ error: 'Error del servidor' });
    }
  }
});

app.get('/api/forecast/:city', async (req: Request, res: Response) => {
  try {
    const { city } = req.params;
    const API_KEY = process.env.OPENWEATHER_API_KEY || 'demo';

    const response = await axios.get<ForecastResponse>(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},AR&units=metric&appid=${API_KEY}&lang=es`
    );

    const dailyForecast = response.data.list
      .filter((_, index) => index % 8 === 0)
      .slice(0, 5)
      .map(item => ({
        date: new Date(item.dt * 1000).toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' }),
        temp: Math.round(item.main.temp),
        tempMin: Math.round(item.main.feels_like - 3),
        tempMax: Math.round(item.main.feels_like + 3),
        icon: item.weather[0].icon,
        iconMain: item.weather[0].main,
        description: item.weather[0].description,
        humidity: item.main.humidity,
        pop: Math.round(item.pop * 100),
      }));

    res.json({ forecast: dailyForecast });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al obtener el pronóstico' });
  }
});

app.get('/api/weather/default', async (_req: Request, res: Response) => {
  try {
    const API_KEY = process.env.OPENWEATHER_API_KEY || 'demo';

    const response = await axios.get<WeatherResponse>(
      `https://api.openweathermap.org/data/2.5/weather?q=Mendoza,AR&units=metric&appid=${API_KEY}&lang=es`
    );

    res.json({
      city: response.data.name,
      country: response.data.sys.country,
      temperature: Math.round(response.data.main.temp),
      feelsLike: Math.round(response.data.main.feels_like),
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      iconMain: response.data.weather[0].main,
      windSpeed: Math.round(response.data.wind.speed * 3.6),
      visibility: Math.round((response.data.visibility || 0) / 1000),
      clouds: response.data.clouds.all,
      sunrise: new Date(response.data.sys.sunrise * 1000).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
      sunset: new Date(response.data.sys.sunset * 1000).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`🌤️  Server running on port ${PORT}`);
});
