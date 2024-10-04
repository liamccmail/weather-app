using Microsoft.AspNetCore.Mvc;
using WeatherService.Api.Models;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.Filters;

namespace WeatherService.Api.Controllers
{

  [ApiController]
  [Route("[controller]")]
  public class WeatherController(IConfiguration configuration) : Controller
  {
    private readonly IConfiguration _configuration = configuration;

    /// <summary>
    /// Fetches current and astronomical Weather Data from a City Location.
    /// </summary>
    /// <param name="city">The city for which to get the weather data.</param>
    /// <returns>Current and astronomical weather data for the searched City</returns>
    /// <response code="200">Returns the set of current and astronomical weather data for City,</response>
    /// <response code="404">If the city passed is not found</response>
    /// <example>
    /// {
    ///     "city": "London",
    ///     "region": "City of London, Greater London",
    ///     "country": "United Kingdom",
    ///     "localTime": "2021-09-30 12:00",
    ///     "temperature": 15.0,
    ///     "sunrise": "06:00",
    ///     "sunset": "18:00"
    /// }
    /// </example>
    [HttpGet("{city}")]
    [Produces("application/json")]
    [ProducesResponseType(typeof(Location), StatusCodes.Status200OK)]
    [SwaggerResponseExample(200, typeof(LocationExample))]
    public async Task<IActionResult> GetLocationData(string city)
    {
      using var client = new HttpClient();
      try
      {
        // Fetch API Key from configuration.
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

    public class LocationExample
    {
        public static readonly Location Example = new()
        {
            City = "London",
            Region = "City of London, Greater London",
            Country = "United Kingdom",
            LocalTime = "2021-09-30 12:00",
            Temperature = 15.0F,
            Sunrise = "06:00",
            Sunset = "18:00"
        };
    }
  }
}