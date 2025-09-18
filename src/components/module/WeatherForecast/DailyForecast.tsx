import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { WEATHER_CODE_MAP } from "@/lib/constants";
import { fixedNumber } from "@/lib/utils";
import { useWeather } from "@/context/WeatherContext";

interface DailyForecastProps {
  dailyResult: any;
}

export default function DailyForecast({ dailyResult: daily }: DailyForecastProps) {
  const { time, temperature_2m_max, temperature_2m_min, weathercode } = daily || {};
  const { loading } = useWeather();

  return (
    <>
      <div className="text-preset-5 font-bold mt-12">Daily Forecast</div>
      <div className="grid grid-cols-3 lg:grid-cols-7 gap-6 mt-4">
        {
          (time && time.length > 0 ? time : Array(7).fill(null)).map((_: any, i: number) => (
            <Card className="min-h-32" key={`daily-${i}`}>
              {
                !loading && daily && (
                  <CardContent className="text-preset-7 h-full flex flex-col justify-between items-center gap-4 h-full">
                    <div className="text-preset-6 text-neutral-200">{time ? format(time?.[i], "EEE") : "-"}</div>
                    <div><Image src={WEATHER_CODE_MAP[weathercode?.[i]]?.icon} width={100} height={100} alt="weather" /></div>
                    <div className="flex justify-between w-full">
                      <div>{fixedNumber(temperature_2m_max?.[i])}°</div>
                      <div>{fixedNumber(temperature_2m_min?.[i])}°</div>
                    </div>
                  </CardContent>
                )
              }
            </Card>
          ))
        }
      </div>
    </>
  )
}