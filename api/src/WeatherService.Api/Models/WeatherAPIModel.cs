namespace WeatherService.Api.Models
{
  public class CurrentWeatherApiResponse
  {
    public required Location location { get; set; }
    public required CurrentWeather current { get; set; }

    public class Location
    {
      public required string name { get; set; }
      public required string region { get; set; }
      public required string country { get; set; }
      public required string localtime { get; set; }
    }

    public class CurrentWeather
    {
      public float temp_c { get; set; }
    }
  }
  public class AstronomyWeatherApiResponse
  {
    public required Location location { get; set; }
    public required Astronomy astronomy { get; set; }

    public class Location
    {
      public required string name { get; set; }
    }

    public class Astronomy
    {
      public required Astro astro { get; set; }
    }

    public class Astro
    {
      public required string sunrise { get; set; }
      public required string sunset { get; set; }
    }
  }
}