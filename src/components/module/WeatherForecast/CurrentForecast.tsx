import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useWeather } from "@/context/WeatherContext";
import { format } from "date-fns";
import { WEATHER_CODE_MAP } from "@/lib/constants";
import { fixedNumber } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { getLocationLabel } from "@/lib/utils";

interface CurrentForecastProps {
  weatherResult: any;
  geoLocation: any;
}

export default function CurrentForecast({ weatherResult, geoLocation }: CurrentForecastProps) {
  const { current } = weatherResult || {};
  const { temperature_2m, time, weather_code, is_day } = current || {};
  const { address } = geoLocation || {};
  const { loading } = useWeather();
  const [weatherBackground, setWeatherBackground] = useState<string>("");

  useEffect(() => {
    const hour = time ? new Date(time).getHours() : null;
    if (is_day === 1 && hour) {
      if (hour >= 5 && hour <= 7) {
        setWeatherBackground("linear-gradient(to top, rgb(255 204 110 / 72%), rgba(255, 133, 73, 0.6), rgba(120, 198, 250, 0.6))");
      } else if (hour >= 17 && hour <= 19) {
        setWeatherBackground("linear-gradient(to top, rgb(255 149 43 / 54%), rgb(58 82 175 / 40%))");
      } else {
        setWeatherBackground("linear-gradient(to top, rgba(149, 209, 249, 0.53), rgba(64, 132, 227, 0.48))");
      }
    }
  }, [time]);
  
  return (
    <div className="w-full relative">
      {
        !loading && current ? (
          <>
            <div className="relative w-full h-full">
              <Image src="/bg-today-large.svg" alt="Background large" width={800} height={286} className="w-full hidden md:block" />
              <Image src="/bg-today-small.svg" alt="Background small" width={800} height={286} className="w-full block md:hidden" />
              <div
                className={`absolute inset-0 transition-all duration-700 rounded-[1.25rem]`}
                style={{
                  background: weatherBackground,
                }}
              />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 w-full">
              <div className="flex flex-col md:flex-row md:justify-between items-center px-4">
                <div className="text-center md:text-left">
                  <div className="text-preset-4 font-semibold">{getLocationLabel(address)}</div>
                  <div className="text-preset-6 mt-3 font-light">{time ? format(time, "EEEE, MMM dd, yyyy") : "-"}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div><Image src={WEATHER_CODE_MAP[weather_code]?.icon} width={100} height={100} alt="weather" /></div>
                  <div className="text-preset-1 italic font-semibold mt-7 md:mt-0 md:mt-2 md:mr-4">{fixedNumber(temperature_2m)}°</div>
                </div>
              </div>
            </div>
          </>
        ) :
        <Skeleton className="h-72 w-full rounded-lg" />
      }
    </div> 
  )
}