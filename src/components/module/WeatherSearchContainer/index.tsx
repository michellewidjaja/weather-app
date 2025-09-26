"use client";
import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import WeatherForecast from "../WeatherForecast";
import { useWeather } from "@/context/WeatherContext";
import { createURLSearchParams } from "@/lib/utils";

export default function WeatherSearchContainer() {
  const [weatherResult, setWeatherResult] = useState<any>(null);
  const [geoLocation, setGeoLocation] = useState<any>(null);
  const { setLoading, params, coords, setCoords, setError, units } = useWeather();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (err) => setError(err.message)
      )
    }
  }, []);

  useEffect(() => {
    if (!coords) return;
  
    const fetchGeoLocation = async () => {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`);
      const data = await res.json();
      setGeoLocation(data);
    };
  
    fetchGeoLocation();
  }, [coords]); 

  useEffect(() => {
    if (!coords) return;
  
    setLoading(true);
  
    const combinedParams = {
      ...params,
      latitude: coords.latitude,
      longitude: coords.longitude,
      ...units,
    };
  
    const fetchWeather = async () => {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?${createURLSearchParams(combinedParams)}`);
      const data = await res.json();
      setWeatherResult(data);
    };
  
    fetchWeather()
      .catch(() => setError("Failed to fetch weather"))
      .finally(() => setLoading(false));
  }, [coords, units]);

  return (
    <>
      <SearchBar />
      <WeatherForecast weatherResult={weatherResult} geoLocation={geoLocation || { display_name: "Loading location..." }} />
    </>
  )
}