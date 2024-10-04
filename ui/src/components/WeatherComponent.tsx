import { WeatherData } from "../models/WeatherData";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingSkeletonCard from "./LoadingSkeletonCard";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import dayjs from "dayjs";

interface WeatherComponentProps {
  city: string;
}

export default function WeatherComponent({city}: WeatherComponentProps) {
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

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://localhost:7059/Weather/${city}`);
        const data = await response.json();
        setWeather(data);
        clearError();
      } catch (err) {
        initiateError();
      }
    }
    fetchWeatherData();
  }, [city]);

  if (isError) {
    return (
      <div>
        <motion.div
          className="box"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-gray-100">Error loading city data...</p>
          <p className="text-ghost-white">Please try another city name.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="box"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {
        isLoading || !weather ? 
          <LoadingSkeletonCard /> 
          : <div className="bg-ghost-white p-6 rounded-lg shadow-lg flex justify-center">
              <div className="flex-1">
                <motion.div
                  whileHover={{ scale: [null, 1.2, 1.1] }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-md">Local Time & Temperature</h2>
                  <p className="text-lg mt-2">{dayjs(weather?.localTime).format('MMM D, HH:mm A')}</p>
                  <p className="text-xl md:text-2xl mt-2"><ThermostatIcon/> {weather?.temperature} °C</p>
                </motion.div>
              </div>

              <div className="border-l border-gray-600 mx-4"></div>

              <div className="flex-1">
                <motion.div
                  whileHover={{ scale: [null, 1.2, 1.1] }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-md">Location</h2>
                  <p className="text-2xl">{weather?.city}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{weather?.region}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{weather?.country}</p>
                </motion.div>
              </div>

              <div className="border-l border-gray-600 mx-4"></div>

              
              <div className="flex-1">
                <motion.div
                  whileHover={{ scale: [null, 1.2, 1.1] }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-md">Sunrise & Sunset</h2>
                  <div className="flex justify-center">
                    <p className="text-xl mt-2"><WbSunnyIcon/><ArrowDropUpIcon/></p>
                    <p className="text-xl ml-3 mt-2">{weather?.sunrise}</p>
                  </div>
                  <div className="flex justify-center">
                    <p className="text-xl mt-2"><WbSunnyIcon/><ArrowDropDownIcon/></p>
                    <p className="text-xl ml-3 mt-2">{weather?.sunset}</p>
                  </div>
                </motion.div>
              </div>
            </div>
        }
    </motion.div>
  );
};