import React, { useState, useEffect } from "react";
import CurrentForecast from "./CurrentForecast";
import CurrentForecastMetrics from "./CurrentForecastMetrics";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import { useWeather } from "@/context/WeatherContext";

interface WeatherForecastProps {
  weatherResult: any;
  geoLocation: any;
}

export default function WeatherForecast({ weatherResult, geoLocation }: WeatherForecastProps) {
  const { loading } = useWeather();
  const [showNoResult, setShowNoResult] = useState(false);

  useEffect(() => {
    if (!loading && (!geoLocation?.lat || !geoLocation?.lon)) {
      const timer = setTimeout(() => setShowNoResult(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowNoResult(false);
    }
  }, [loading, geoLocation]);


  if (showNoResult) {
    return (
      <div className="text-preset-4 text-center w-full font-bold mx-auto">
        No search result found!
      </div>
    )
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8">
      <div>
        <CurrentForecast weatherResult={weatherResult} geoLocation={geoLocation} />
        <CurrentForecastMetrics weatherResult={weatherResult} />
        <DailyForecast dailyResult={weatherResult?.daily} />
      </div>
      <HourlyForecast hourlyResult={weatherResult?.hourly} dailyResult={weatherResult?.daily}/>
    </section>
  )
}