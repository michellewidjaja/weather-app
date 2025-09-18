import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CURRENT_DISPLAY } from "@/lib/constants";
import { useWeather } from "@/context/WeatherContext";
import { fixedNumber } from "@/lib/utils";

interface CurrentForecastMetricsProps {
  weatherResult: any;
}

export default function CurrentForecastMetrics({ weatherResult }: CurrentForecastMetricsProps) {
  const { current, current_units } = weatherResult || {};
  const { loading } = useWeather();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {CURRENT_DISPLAY.map((v, k) => {
        const Icon = v.icon;
        return (
          <Card
            className="border-neutral-600 bg-neutral-800 p-4 h-32 flex flex-col justify-between"
            key={`current-${k}`}
          >
            <CardTitle className="font-normal p-0 flex gap-1 md:gap-2 items-center text-neutral-200">
              <Icon className="flex-none h-5 w-5" />
              <div className="text-preset-7 md:text-preset-6">{v.title}</div>
            </CardTitle>
            <CardContent className="text-preset-3 flex items-end font-light">
              {!loading && current && current_units? 
              `${fixedNumber(current[v.key])}${current_units[v.key]}` : "-"}
            </CardContent>
          </Card>
        )
      })}
    </div>
  );
}
