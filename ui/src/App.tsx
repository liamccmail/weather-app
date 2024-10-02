import "./App.css";
import WeatherCard from "./components/WeatherCard";
import Search from "./components/Search";
import { useState } from "react";

function App() {
  const [city, setCity] = useState<string>("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-ghost-white">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Weather Search</h1>
        <div className="flex items-center justify-center mb-6">
          <Search setCity={setCity} />
        </div>
        { 
        city ? 
          <div className="items-center justify-center mb-6">
            <WeatherCard city={city} />
          </div>
          : null 
        }
      </div>
    </div>
  )
}

export default App;