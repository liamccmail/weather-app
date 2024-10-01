import { Card, Typography } from "@mui/material";
import { WeatherData } from "../models/WeatherData";
import { useEffect, useState } from "react";

interface WeatherCardProps {
  weatherData: WeatherData;
}

const weatherData = {
  city: "Rotterdam",
  region: "South Holland",
  country: "Netherlands",
  localTime: "2022-04-12 11:33",
  temperature: 15.0,
  sunrise: "06:52 AM",
  sunset: "08:34 PM"
}

export default function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch("https://localhost:7059/Weather/London");
      const data = await response.json();
      setWeather(data);
    }
    fetchWeatherData();
  }, []);

  return (
    <Card>
      <Typography variant="h3">{weather?.city}</Typography>
      <Typography variant="h4">{weather?.region}</Typography>
      <Typography variant="h5">{weather?.country}</Typography>
      <Typography variant="h6">{weather?.localTime}</Typography>
      <Typography variant="h6">{weather?.temperature}°C</Typography>
      <Typography variant="h6">{weather?.sunrise}</Typography>
      <Typography variant="h6">{weather?.sunset}</Typography>
    </Card>
  );
};