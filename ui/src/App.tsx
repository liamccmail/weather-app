import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import "./App.css";
import WeatherCard from "./components/WeatherCard";

function App() {
  return (
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
      <WeatherCard></WeatherCard>
    </main>
  )
}

export default App;