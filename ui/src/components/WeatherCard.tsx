import { WeatherData } from "../models/WeatherData";
import { useEffect, useState } from "react";
import LoadingSkeletonCard from "./SkeletonCard";

interface WeatherCardProps {
  city: string;
}

export default function WeatherCard({city}: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const initiateError = () => {
    setIsLoading(false);
    setIsError(true);
  }
  const clearError = () => {
    setIsLoading(false);
    setIsError(false);
  }

  const RenderError = () => {
    return (
      <div className="loading-spinner">
        <p>Error loading city data...</p>
      </div>
    );
  }

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://localhost:7059/Weather/${city}`);
        const data = await response.json();
        setWeather(data);
        clearError()
      } catch (err) {
        console.error(err);
        initiateError();
      }
    }
    fetchWeatherData();
  }, [city]);

  if (isError) {
    return (
      <div className="loading-spinner">
        <p>Error loading city data...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <LoadingSkeletonCard />
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{weather?.city}</h2>
      <p>{weather?.region}</p>
      <p>{weather?.country}</p>
      <p>{weather?.localTime}</p>
      <p>{weather?.temperature}°C</p>
      <p>{weather?.sunrise}</p>
      <p>{weather?.sunset}</p>
    </div>
  );
};