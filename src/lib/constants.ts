export const WEATHER_CODE_MAP: Record<number, { label: string; icon: string }> = {
  0: { label: "Clear sky", icon: "/icon-sunny.webp" },
  1: { label: "Mainly clear", icon: "/icon-sunny.webp" },
  2: { label: "Partly cloudy", icon: "/icon-overcast.webp" },
  3: { label: "Overcast", icon: "/icon-overcast.webp" },
  45: { label: "Fog", icon: "/icon-fog.webp" },
  48: { label: "Depositing rime fog", icon: "/icon-fog.webp" },
  51: { label: "Light drizzle", icon: "/icon-rain.webp" },
  53: { label: "Moderate drizzle", icon: "/icon-rain.webp" },
  55: { label: "Dense drizzle", icon: "/icon-rain.webp" },
  61: { label: "Slight rain", icon: "/icon-rain.webp" },
  63: { label: "Moderate rain", icon: "/icon-rain.webp" },
  65: { label: "Heavy rain", icon: "/icon-rain.webp" },
  66: { label: "Freezing rain", icon: "/icon-rain.webp" },
  67: { label: "Heavy freezing rain", icon: "/icon-rain.webp" },
  71: { label: "Slight snow fall", icon: "/icon-snow.webp" },
  73: { label: "Moderate snow fall", icon: "/icon-snow.webp" },
  75: { label: "Heavy snow fall", icon: "/icon-snow.webp" },
  77: { label: "Snow grains", icon: "/icon-snow.webp" },
  80: { label: "Rain showers", icon: "/icon-rain.webp" },
  81: { label: "Moderate rain showers", icon: "/icon-rain.webp" },
  82: { label: "Violent rain showers", icon: "/icon-rain.webp" },
  95: { label: "Thunderstorm", icon: "/icon-storm.webp" },
  96: { label: "Thunderstorm with hail", icon: "/icon-storm.webp" },
  99: { label: "Heavy thunderstorm with hail", icon: "/icon-storm.webp" },
};

export const DAYS: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const CURRENT_DISPLAY:{ title: string; key: string }[] = [
  {
    title: 'Feels Like',
    key: 'apparent_temperature',
  },
  {
    title: 'Humidity',
    key: 'relative_humidity_2m'
  },
  {
    title: 'Wind',
    key: 'wind_speed_10m'
  },
  {
    title: 'Precipitation',
    key: 'precipitation'
  }
];

export const WEATHER_UNITS = {
  temperature_unit: {
    display_name: "Temperature",
    items: [
      {
        key: "celsius",
        label: "Celsius (°C)"
      },
      {
        key: "fahrenheit",
        label: "Fahrenheit (°F)"
      }
    ]
  },
  wind_speed_unit: {
    display_name: "Wind Speed",
    items: [
      {
        key: "kmh",
        label: "km/h"
      },
      {
        key: "mph",
        label: "mph"
      },
    ]
  },
  precipitation_unit: {
    display_name: "Precipitation",
    items: [
      {
        key: "mm",
        label: "Millimeters (mm)"
      },
      {
        key: "inch",
        label: "Inch"
      },
    ]
  }
}

export const UNITS_SYSTEM_MAP = {
  metric: { temperature_unit: "celsius", wind_speed_unit: "kmh", precipitation_unit: "mm" },
  imperial: { temperature_unit: "fahrenheit", wind_speed_unit: "mph", precipitation_unit: "inch" }
};