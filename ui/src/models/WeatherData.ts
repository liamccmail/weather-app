export type WeatherData = {
  city: string;
  region: string;
  country: string;
  localTime: string;
  temperature: number;
  sunrise: string;
  sunset: string;
  description?: string;
  icon?: string;
}