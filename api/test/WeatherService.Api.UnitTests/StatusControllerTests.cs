using Microsoft.AspNetCore.Mvc;
using WeatherService.Api.Controllers;

namespace WeatherService.Api.UnitTests;

public class StatusControllerTests
{
    [Fact]
    public void Get_Status_ReturnsOk()
    {
        var controller = new StatusController();

        var result = controller.GetStatus();

        Assert.IsType<OkResult>(result);
    }
}