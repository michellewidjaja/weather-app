import React from "react";
import Header from "@/components/layout/Header";
import WeatherSearchContainer from "@/components/module/WeatherSearchContainer";
import { WeatherProvider } from "@/context/WeatherContext";

export default function Home() {
  return (
    <WeatherProvider>
      <div className="max-w-7xl mx-auto font-sans">
        <Header />
        <main className="p-6">
          <h1 className="font-bricolage text-preset-2 text-center mx-auto my-10">How&apos;s the sky looking today?</h1>
          <WeatherSearchContainer />
        </main>
        <footer className="text-center text-neutral-300 py-4">
          © {new Date().getFullYear()} Weather App · Michelle Lee Widjaja
        </footer>
      </div>
    </WeatherProvider>
  );
}
