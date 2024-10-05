namespace WeatherService.Api.Models
{
  public class Weather
  {
    public required string City { get; set; }
    public required string Region { get; set; }
    public required string Country { get; set; }
    public required string LocalTime { get; set; }
    public required float Temperature { get; set; }
    public required string Sunrise { get; set; }
    public required string Sunset { get; set; }
  }
}