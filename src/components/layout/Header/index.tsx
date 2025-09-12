"use client";
import React from "react";
import Image from "next/image";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuRadioItem, DropdownMenuRadioGroup } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { WEATHER_UNITS } from "@/lib/constants";
import { useWeather } from "@/context/WeatherContext";

export default function Header() {
  const { units, setUnits } = useWeather();
  
  const handleChangeUnits = (unit: string, unit_item: string) => {
    setUnits(prev => ({
      ...prev,
      [unit]: unit_item
    }));
  }

  return (
    <header className="flex justify-between p-6">
      <Image src="/logo.svg" width={200} height={150} alt="Weather Logo" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="neutral"><Image src="/icon-units.svg" width={20} height={20} alt="icon units" />Units <ChevronDown /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Switch to Imperial</DropdownMenuItem>
          {
            Object.entries(WEATHER_UNITS).map(([key, unit], k) => (
              <React.Fragment key={key}>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-preset-8 text-neutral-300">
                  {unit.display_name}
                </DropdownMenuLabel>
                <DropdownMenuRadioGroup value={units?.[key]}
                  onValueChange={(val) => handleChangeUnits(key, val)}>
                  {unit.items.map((item) => (
                    <DropdownMenuRadioItem key={item.key} value={item.key}>
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </React.Fragment>
            ))
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}