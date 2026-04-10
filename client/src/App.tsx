import { useState, useEffect } from 'react';
import { Search, MapPin, Thermometer, Droplets, Wind, Eye, Sun, Cloud, Sunrise, Sunset, CloudRain, CloudSnow, CloudLightning, CloudFog } from 'lucide-react';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  description: string;
  icon: string;
  iconMain: string;
  windSpeed: number;
  visibility: number;
  clouds: number;
  sunrise: string;
  sunset: string;
}

interface ForecastDay {
  date: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  icon: string;
  iconMain: string;
  description: string;
  humidity: number;
  pop: number;
}

const API_URL = import.meta.env.VITE_API_URL || '';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [city, setCity] = useState('Mendoza');
  const [searchCity, setSearchCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWeather(city);
    fetchForecast(city);
  }, []);

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/weather/${cityName}`);
      if (!response.ok) throw new Error('Ciudad no encontrada');
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError('No se pudo obtener el clima. Verificá la ciudad e intentá de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (cityName: string) => {
    try {
      const response = await fetch(`${API_URL}/api/forecast/${cityName}`);
      if (response.ok) {
        const data = await response.json();
        setForecast(data.forecast);
      }
    } catch (err) {
      console.error('Error fetching forecast:', err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCity.trim()) {
      setCity(searchCity.trim());
      fetchWeather(searchCity.trim());
      fetchForecast(searchCity.trim());
      setSearchCity('');
    }
  };

  const getWeatherIcon = (iconMain: string, size: number = 48) => {
    const icons: Record<string, JSX.Element> = {
      Clear: <Sun size={size} className="text-yellow-400" />,
      Clouds: <Cloud size={size} className="text-gray-300" />,
      Rain: <CloudRain size={size} className="text-blue-400" />,
      Snow: <CloudSnow size={size} className="text-blue-200" />,
      Thunderstorm: <CloudLightning size={size} className="text-purple-400" />,
      Drizzle: <CloudRain size={size} className="text-blue-300" />,
      Mist: <CloudFog size={size} className="text-gray-400" />,
      Fog: <CloudFog size={size} className="text-gray-400" />,
      Haze: <CloudFog size={size} className="text-gray-300" />,
    };
    return icons[iconMain] || <Cloud size={size} className="text-gray-300" />;
  };

  const getWeatherGradient = (iconMain: string): string => {
    const gradients: Record<string, string> = {
      Clear: 'from-orange-400 via-yellow-400 to-amber-500',
      Clouds: 'from-gray-500 via-gray-400 to-gray-300',
      Rain: 'from-blue-700 via-blue-500 to-cyan-400',
      Snow: 'from-blue-200 via-blue-100 to-white',
      Thunderstorm: 'from-purple-900 via-purple-700 to-blue-600',
      Drizzle: 'from-blue-500 via-blue-400 to-cyan-300',
      Mist: 'from-gray-400 via-gray-300 to-gray-200',
      Fog: 'from-gray-400 via-gray-300 to-gray-200',
      Haze: 'from-yellow-400 via-yellow-300 to-gray-300',
    };
    return gradients[iconMain] || 'from-blue-500 via-blue-400 to-cyan-300';
  };

  if (loading && !weather) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getWeatherGradient(weather?.iconMain || 'Clear')} p-4 md:p-8`}>
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            🌤️  Clima Mendoza
          </h1>
          <p className="text-white/80 text-lg">Tu app del clima en tiempo real</p>
        </header>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Buscar ciudad..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-white/90 transition-all shadow-lg"
            >
              Buscar
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-500/20 backdrop-blur-lg border border-red-500/50 rounded-2xl p-4 mb-8 text-center text-white">
            {error}
          </div>
        )}

        {weather && (
          <>
            <div className="weather-card mb-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-2 text-white/80 mb-2">
                    <MapPin size={18} />
                    <span>{weather.city}, {weather.country}</span>
                  </div>
                  <div className="text-9xl font-bold text-white drop-shadow-2xl">
                    {weather.temperature}°
                  </div>
                  <p className="text-xl text-white/90 capitalize mt-2">
                    {weather.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="p-6 bg-white/10 rounded-full">
                    {getWeatherIcon(weather.iconMain, 96)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="stat-card">
                  <Thermometer className="mx-auto mb-2 text-white/80" size={24} />
                  <p className="text-2xl font-bold text-white">{weather.feelsLike}°</p>
                  <p className="text-sm text-white/60">Sensación térmica</p>
                </div>
                <div className="stat-card">
                  <Droplets className="mx-auto mb-2 text-blue-300" size={24} />
                  <p className="text-2xl font-bold text-white">{weather.humidity}%</p>
                  <p className="text-sm text-white/60">Humedad</p>
                </div>
                <div className="stat-card">
                  <Wind className="mx-auto mb-2 text-white/80" size={24} />
                  <p className="text-2xl font-bold text-white">{weather.windSpeed} km/h</p>
                  <p className="text-sm text-white/60">Viento</p>
                </div>
                <div className="stat-card">
                  <Eye className="mx-auto mb-2 text-white/80" size={24} />
                  <p className="text-2xl font-bold text-white">{weather.visibility} km</p>
                  <p className="text-sm text-white/60">Visibilidad</p>
                </div>
              </div>

              <div className="flex justify-center gap-8 mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center gap-2 text-white/80">
                  <Sunrise size={20} className="text-yellow-400" />
                  <span>{weather.sunrise}</span>
                  <span className="text-sm text-white/60">Amanecer</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Sunset size={20} className="text-orange-400" />
                  <span>{weather.sunset}</span>
                  <span className="text-sm text-white/60">Atardecer</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Cloud className="text-white/80" />
                Pronóstico 5 días
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {forecast.map((day, index) => (
                  <div key={index} className="bg-white/10 rounded-2xl p-4 text-center hover:bg-white/20 transition-all">
                    <p className="text-white/80 text-sm mb-2">{day.date}</p>
                    <div className="flex justify-center mb-2">
                      {getWeatherIcon(day.iconMain, 32)}
                    </div>
                    <p className="text-2xl font-bold text-white">{day.temp}°</p>
                    <p className="text-xs text-white/60 capitalize">{day.description}</p>
                    {day.pop > 0 && (
                      <p className="text-xs text-blue-300 mt-1">💧 {day.pop}%</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <footer className="text-center mt-12 text-white/60 text-sm">
          <p>Desarrollado con React, TypeScript y Tailwind CSS</p>
          <p className="mt-1">Datos proporcionados por OpenWeatherMap</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
