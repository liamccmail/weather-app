import { Card, Typography } from "@mui/material";
import { WeatherData } from "../models/WeatherData";

interface WeatherCardProps {
  weatherData: WeatherData;
}

export default function WeatherCard({weatherData}: WeatherCardProps) {
  return (
    <Card>
      <Typography variant="h3">{weatherData.city}</Typography>
      <Typography variant="h4">{weatherData.region}</Typography>
      <Typography variant="h5">{weatherData.country}</Typography>
      <Typography variant="h6">{weatherData.localTime}</Typography>
      <Typography variant="h6">{weatherData.temperature}°C</Typography>
      <Typography variant="h6">{weatherData.sunrise}</Typography>
      <Typography variant="h6">{weatherData.sunset}</Typography>
    </Card>
  );
};