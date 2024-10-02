import "./App.css";
import WeatherCard from "./components/WeatherCard";
import Search from "./components/Search";
import { useState } from "react";
import { motion } from "framer-motion"

function App() {
  const [city, setCity] = useState<string>("");

  // const city = 'London';
  // const setCity = () => {};

  return (
    <div className="flex items-center justify-center min-h-screen bg-cornflower-blue">
      <div className="w-full sm:w-10/12 lg:w-4/6 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.10]
          }}
        >
        <h1 className="text-4xl font-bold text-gray-100 mb-6">Weather Search</h1>
          <div className="flex items-center justify-center mb-6">
            <Search setCity={setCity} />
          </div>        
        { 
        city ? 
          <div className="items-center justify-center mb-6">
            <WeatherCard city={city} />
          </div>
          : <div>
              <p className="text-lg text-gray-100 mt-6">Type in a city name above to retrieve local weather and astronomy data.</p> 
              <p className="text-sm text-ghost-white mt-1">Hint: Use a country name after city to confine the search (E.g. Auckland, New Zealand)</p> 
            </div>
        }
        </motion.div>
      </div>
    </div>
  )
}

export default App;