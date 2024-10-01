using Microsoft.AspNetCore.Mvc;
using WeatherService.Api.Models;
using Newtonsoft.Json;

namespace WeatherService.Api.Controllers
{
  [Route("[controller]")]
  public class WeatherController(IConfiguration configuration) : Controller
  {
    private readonly IConfiguration _configuration = configuration;

    [HttpGet("{city}")]
    public async Task<IActionResult> GetLocationData(string city)
    {
      using var client = new HttpClient();
      try
      {
        var apiKey = _configuration["WeatherApi:ApiKey"];
        client.BaseAddress = new Uri("http://api.weatherapi.com");

        // Fetch Current Weather Data from Location
        var currentWeatherResponse = await client.GetAsync($"/v1/current.json?key={apiKey}&q={city}&aqi=no");
        currentWeatherResponse.EnsureSuccessStatusCode();
        var currentStringResult = await currentWeatherResponse.Content.ReadAsStringAsync();
        var rawCurrentWeather = JsonConvert.DeserializeObject<CurrentWeatherApiResponse>(currentStringResult);

        // Fetch Astronomy Weather Data from Location
        var astroWeatherResponse = await client.GetAsync($"/v1/astronomy.json?key={apiKey}&q={city}&aqi=no");
        astroWeatherResponse.EnsureSuccessStatusCode();
        var astroStringResult = await astroWeatherResponse.Content.ReadAsStringAsync();
        var rawAstroWeather = JsonConvert.DeserializeObject<AstronomyWeatherApiResponse>(astroStringResult);

        // Handle incomplete weather data
        if (rawCurrentWeather == null || rawAstroWeather == null)
        {
          return BadRequest("Error: Incomplete weather data received from WeatherApi.");
        }

        // Create Location object to pass to the client
        var location = new Location
        {
          City = rawCurrentWeather.location.name,
          Region = rawCurrentWeather.location.region,
          Country = rawCurrentWeather.location.country,
          LocalTime = rawCurrentWeather.location.localtime,
          Temperature = rawCurrentWeather.current.temp_c,
          Sunrise = rawAstroWeather.astronomy.astro.sunrise,
          Sunset = rawAstroWeather.astronomy.astro.sunset
        };

        return Ok(location);
      }
      catch (HttpRequestException httpRequestException)
      {
        return BadRequest($"Error getting weather from WeatherApi: {httpRequestException.Message}");
      }
    }
  }
}