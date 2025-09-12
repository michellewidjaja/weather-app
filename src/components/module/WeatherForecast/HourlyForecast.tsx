"use client";
import React, { useState } from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import Image from "next/image";
import { WEATHER_CODE_MAP } from "@/lib/constants";
import { createURLSearchParams, fixedNumber } from "@/lib/utils";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useWeather } from "@/context/WeatherContext";

interface HourlyForecastProps {
  hourlyResult: any;
  dailyResult: any;
}

export default function HourlyForecast({ hourlyResult: hourly, dailyResult: daily }: HourlyForecastProps) {
  const [selectedDay, setSelectedDay] = React.useState<string>("");
  const { loading, params } = useWeather();
  const { time: time_daily } = daily || {};
  const [newHourlyResult, setNewHourlyResult] = useState<any>(null);
  const [loadingHourly, setLoadingHourly] = useState<boolean>(false);
  const source = newHourlyResult || hourly;
  const { time, weathercode, temperature_2m } = source || {};

  const handleChangeDays = async (date: Date, day: string) => {
    setSelectedDay(day);
    setLoadingHourly(true);
    const startHour = format(date, "yyyy-MM-dd'T'00:00");
    const endHour = format(date, "yyyy-MM-dd'T'23:00");
    const hourlyParams = {
      ...params,
      start_hour: startHour,
      end_hour: endHour,
    };

    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?${createURLSearchParams(hourlyParams)}`);
      const data = await res.json();
      setNewHourlyResult(data?.hourly);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.error("Fetch error:", err);
      }
    } finally {
      setLoadingHourly(false);
    }
  }

  return (
    <>
      <Card className="border-none p-0">
        <CardTitle className="mb-2 flex justify-between items-center p-4 pb-0">
          <div className="text-preset-5">Hourly Forecast</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="neutral" className="bg-neutral-600">{selectedDay || time ? format(selectedDay || time?.[0], "EEEE") : "-"}<ChevronDown /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup value={selectedDay}>
                {
                  (time_daily && time_daily.length > 0 ? time_daily : Array(7).fill(null)).map((_: any, i: number) => {
                    const date = time_daily ? new Date(time_daily?.[i]): new Date();
                    const getDay = date ? format(date, "EEE, dd MMM") : "Today";
                    const displayDay = i === 0 ? "Today" : getDay;
                    return (
                      <DropdownMenuRadioItem 
                        onClick={() => handleChangeDays(date, getDay)}
                        key={`day-${i}`} value={displayDay}>{displayDay}</DropdownMenuRadioItem>
                    )
                  })
                }
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
        <CardContent className="flex flex-col gap-4 overflow-y-scroll max-h-[40rem] p-4 custom-scrollbar" tabIndex={-1}>
          {
            (time && time.length > 0 ? time : Array(7).fill(null)).map((_: any, i: number) => (
              <Card className="border-neutral-600 bg-neutral-700 p-1.5" key={`hourly-${i}`}>
                <CardContent className="min-h-12 flex items-center">
                  {
                    !(loading || loadingHourly) && hourly && (
                      <div className="flex justify-between items-center w-full">
                        <div className="flex gap-2 items-center">
                          <div><Image src={WEATHER_CODE_MAP[weathercode?.[i]]?.icon} width={40} height={40} alt="weather" /></div>
                          <div className="text-preset-5">{time ? format(time[i], "h a") : "-"}</div>
                        </div>
                        <div className="text-preset-7">{fixedNumber(temperature_2m?.[i])}°</div>
                      </div>
                    )
                  }
                </CardContent>
              </Card>
            ))
          }
        </CardContent>
      </Card>
    </>
  )
}