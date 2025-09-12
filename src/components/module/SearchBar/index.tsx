"use client";
import React, { useState, useEffect, useRef } from "react";
import { InputIcon } from "@/components/ui/input-icon";
import { useWeather } from "@/context/WeatherContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface CitiesType {
  display_name: string;
  name: string;
  lat: number;
  lon: number;
}

export default function SearchBar() {
  const [query, setQuery] = useState<CitiesType | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [results, setResults] = useState<CitiesType[]>([]);
  const [loading, setLoading] = useState(false);
  const { loading: loadingWeather, setCoords } = useWeather();
  const [open, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const skipFetchRef = useRef(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchCities = async () => {
    if (!inputValue) {
      setResults([]);
      return;
    }

    setLoading(true);
    setOpen(true);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${inputValue}&format=json&limit=7`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.error("Fetch error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (skipFetchRef.current) {
      skipFetchRef.current = false;
      return;
    }

    const controller = new AbortController();
    const debounceFetch = setTimeout(() => fetchCities(), 500);

    return () => {
      clearTimeout(debounceFetch);
      controller.abort();
    };
  }, [inputValue]);

  const handleSearch = () => {
    if (!query) return;
    const { lat, lon } = query;
    if (!lat || !lon) return;

    setCoords({
      latitude: lat,
      longitude: lon,
    });
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setOpen(true);
  };

  const handleSelectedCity = (city: CitiesType) => {
    setQuery(city);
    skipFetchRef.current = true;
    setInputValue(city.display_name);
    setResults([]);
    setOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mx-auto my-10 max-w-lg text-preset-5">
      <div ref={wrapperRef} className="relative w-full">
        <InputIcon
          icon={<Image src="/icon-search.svg" width={20} height={20} alt="Icon search" />}
          type="text"
          id="search"
          name="search"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
          placeholder="Search for a place..."
          autoComplete="off"
          disabled={loadingWeather}
          className="flex-1 h-14"
        />

        {open && (
          <Card className="absolute top-16 z-10 w-full transition-all duration-300 ease-in-out p-2 rounded-lg">
            <CardContent>
              {loading ? (
                <div className="text-preset-7 p-3">Search in progress...</div>
              ) : results.length > 0 ? (
                results.map((city: CitiesType, k) => (
                  <div
                    key={`city-${k}`}
                    className="text-preset-7 p-3 rounded-sm hover:border-neutral-600 hover:bg-neutral-700 hover:cursor-pointer"
                    onClick={() => handleSelectedCity(city)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSelectedCity(city);
                      }
                    }}
                    tabIndex={0}
                  >
                    {city.display_name}
                  </div>
                ))
              ) : inputValue ? (
                <div className="text-preset-7 p-3">No search found...</div>
              ) : (
                <div className="text-preset-7 p-3">Type to search...</div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <Button
        size="lg"
        className="h-14 w-full md:w-auto font-medium"
        disabled={loadingWeather}
        onClick={handleSearch}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      >
        Search
      </Button>
    </div>
  );
}
