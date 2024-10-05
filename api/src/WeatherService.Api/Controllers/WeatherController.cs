using Microsoft.AspNetCore.Mvc;
using WeatherService.Api.Models;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.Filters;

namespace WeatherService.Api.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class WeatherController : Controller
  {
    private readonly IConfiguration _configuration;
    private readonly HttpClient _httpClient;


    public WeatherController(IConfiguration configuration)
    {
      _configuration = configuration;
      _httpClient = new HttpClient { BaseAddress = new Uri("http://api.weatherapi.com") };
    }

    // Overload constructor for testing
    public WeatherController(IConfiguration configuration, HttpClient httpClient)
    {
      _configuration = configuration;
      _httpClient = httpClient;
    }

    /// <summary>
    /// Fetches current and astronomical Weather Data from a City.
    /// </summary>
    /// <param name="city">The city for which to get the weather data.</param>
    /// <returns>Current and astronomical weather data for the searched City</returns>
    /// <response code="200">Returns the set of current and astronomical weather data for the city</response>
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
    [ProducesResponseType(typeof(Weather), StatusCodes.Status200OK)]
    [SwaggerResponseExample(200, typeof(WeatherExample))]
    public async Task<IActionResult> GetWeatherData(string city)
    {
      try
      {
        // Fetch API Key from configuration.
        var apiKey = _configuration["WeatherApi:ApiKey"];

        // Fetch Current Weather Data from Weather
        var currentWeatherResponse = await _httpClient.GetAsync($"/v1/current.json?key={apiKey}&q={city}&aqi=no");
        currentWeatherResponse.EnsureSuccessStatusCode();
        var currentStringResult = await currentWeatherResponse.Content.ReadAsStringAsync();
        var rawCurrentWeather = JsonConvert.DeserializeObject<CurrentWeatherApiResponse>(currentStringResult);

        // Fetch Astronomy Weather Data from Weather
        var astroWeatherResponse = await _httpClient.GetAsync($"/v1/astronomy.json?key={apiKey}&q={city}&aqi=no");
        astroWeatherResponse.EnsureSuccessStatusCode();
        var astroStringResult = await astroWeatherResponse.Content.ReadAsStringAsync();
        var rawAstroWeather = JsonConvert.DeserializeObject<AstronomyWeatherApiResponse>(astroStringResult);

        // Handle incomplete weather data
        if (rawCurrentWeather == null || rawAstroWeather == null)
        {
          return BadRequest("Error: Incomplete weather data received from WeatherApi.");
        }

        // Create Weather object to pass to the client
        var weatherData = new Weather
        {
          City = rawCurrentWeather.location.name,
          Region = rawCurrentWeather.location.region,
          Country = rawCurrentWeather.location.country,
          LocalTime = rawCurrentWeather.location.localtime,
          Temperature = rawCurrentWeather.current.temp_c,
          Sunrise = rawAstroWeather.astronomy.astro.sunrise,
          Sunset = rawAstroWeather.astronomy.astro.sunset
        };

        return Ok(weatherData);
      }
      catch (HttpRequestException httpRequestException)
      {
        return BadRequest($"Error getting weather from WeatherApi: {httpRequestException.Message}");
      }
    }

    public class WeatherExample
    {
      public static readonly Weather Example = new()
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