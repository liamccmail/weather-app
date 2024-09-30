import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import Search from "./components/Search";

function App() {
  const weatherData = {
    city: "Rotterdam",
    region: "South Holland",
    country: "Netherlands",
    localTime: "2022-04-12 11:33",
    temperature: 15.0,
    sunrise: "06:52 AM",
    sunset: "08:34 PM"
  }
  return (
    <body className="bg-ghost-white">
      <main>
        <Box sx={{ flexGrow: 1}}>
          <AppBar position="static">
            <Toolbar className="bg-teal">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Weather
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Search />
        <WeatherCard weatherData={weatherData} />
      </main>
    </body>
  )
}

export default App;