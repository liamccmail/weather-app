using FakeItEasy;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using WeatherService.Api.Controllers;
using WeatherService.Api.Models;
using static TestHelpers;
using Newtonsoft.Json;

namespace WeatherService.Api.Tests
{
  public class WeatherControllerTests
  {
    [Fact]
    public async Task GetWeatherAsync_WhenCalled_ReturnsWeatherData()
    {
      // Arrange: Create a fake IConfigurationSection & IConfiguration
      var configurationSection = A.Fake<IConfigurationSection>();
      var _configuration = A.Fake<IConfiguration>();
      A.CallTo(() => configurationSection.Value).Returns("your-fake-api-key");
      A.CallTo(() => _configuration.GetSection("WeatherApi:ApiKey")).Returns(configurationSection);

      // Act
      var weatherController = new WeatherController(_configuration);
      var result = await weatherController.GetWeatherData("London");

      // Assert
      Assert.NotNull(result);
    }

    [Fact]
    public async Task GetWeatherData_ReturnsOk_WithValidWeatherData()
    {
        // Arrange
        var configuration = A.Fake<IConfiguration>();
        A.CallTo(() => configuration["WeatherApi:ApiKey"]).Returns("your-fake-api-key");

        var currentWeather = new CurrentWeatherApiResponse
        {
          location = new CurrentWeatherApiResponse.Location { name = "London", region = "Greater London", country = "United Kingdom", localtime = "2021-09-30 12:00" },
          current = new CurrentWeatherApiResponse.CurrentWeather { temp_c = 15.0F }
        };

        var astroWeather = new AstronomyWeatherApiResponse
        {
          location = new AstronomyWeatherApiResponse.Location { name = "London" },
          astronomy = new AstronomyWeatherApiResponse.Astronomy { astro = new AstronomyWeatherApiResponse.Astro { sunrise = "06:00", sunset = "18:00" } }
        };

        var currentWeatherResponse = new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(JsonConvert.SerializeObject(currentWeather))
        };
        var astroWeatherResponse = new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(JsonConvert.SerializeObject(astroWeather))
        };

        var httpClient = CreateMockHttpClient(currentWeatherResponse, astroWeatherResponse);

        var weatherController = new WeatherController(configuration, httpClient);

        // Act
        var result = await weatherController.GetWeatherData("London");

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var weatherData = Assert.IsType<Weather>(okResult.Value);

        Assert.Equal("London", weatherData.City);
        Assert.Equal("06:00", weatherData.Sunrise);
        Assert.Equal(15.0F, weatherData.Temperature);
    }

    [Fact]
    public async Task GetWeatherData_ReturnsNotFound_ForInvalidCity()
    {
      // Arrange: Fake the configuration with an API key
      var configuration = A.Fake<IConfiguration>();
      A.CallTo(() => configuration["WeatherApi:ApiKey"]).Returns("your-fake-api-key");
      var httpClient = CreateMockHttpClient(new HttpResponseMessage(HttpStatusCode.NotFound));
      var weatherController = new WeatherController(configuration, httpClient);

      // Act
      var result = await weatherController.GetWeatherData("Loading");

      // Assert
      var notFoundResult = Assert.IsType<BadRequestObjectResult>(result);
    }
  }
}