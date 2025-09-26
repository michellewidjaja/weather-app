"use client";
import React, { createContext, useContext, useState} from "react";
import type { WeatherParams, Position, UnitsParams } from "@/lib/types";
import { format, addHours, addDays } from "date-fns";

interface WeatherContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  units: any;
  setUnits: React.Dispatch<React.SetStateAction<UnitsParams | null>>;
  params: any;
  setParams: React.Dispatch<React.SetStateAction<WeatherParams | null>>;
  coords: any;
  setCoords: React.Dispatch<React.SetStateAction<Position | null>>;
  error: any;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [coords, setCoords] = useState<Position | null>(null);
  const [error, setError] = useState<string | null>(null);

  const now = new Date();
  const eightHoursLater = addHours(now, 8);
  const sixDaysLater = addDays(now, 6);

  const [units, setUnits] = useState<UnitsParams | null>({
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    precipitation_unit: "mm"
  });

  const [params, setParams] = useState<WeatherParams | null>({
    latitude: 0,
    longitude: 0,
    current: "temperature_2m,relative_humidity_2m,precipitation,apparent_temperature,wind_speed_10m,weather_code,is_day",
    hourly: "temperature_2m,precipitation,weathercode",
    daily: "temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode",
    timezone: "auto",
    start_date: format(now, "yyyy-MM-dd"),
    end_date: format(sixDaysLater, "yyyy-MM-dd"),
    start_hour: format(now, "yyyy-MM-dd'T'HH:mm"),
    end_hour: format(eightHoursLater, "yyyy-MM-dd'T'HH:mm"),
    ...units
  });

  return (
    <WeatherContext.Provider value={
      { loading, setLoading, units, setUnits, params, setParams, coords, setCoords, error, setError }}>
      {children}
    </WeatherContext.Provider>
  )
}

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error("Invalid useWeather");
  return context;
}