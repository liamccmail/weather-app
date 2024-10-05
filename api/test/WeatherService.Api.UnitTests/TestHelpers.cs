using Moq;
using Moq.Protected;

public static class TestHelpers
{
  public static HttpClient CreateMockHttpClient(params HttpResponseMessage[] responseMessages)
  {
    var handlerMock = new Mock<HttpMessageHandler>();
    var responseQueue = new Queue<HttpResponseMessage>(responseMessages);

    handlerMock
      .Protected()
      .Setup<Task<HttpResponseMessage>>(
        "SendAsync",
        ItExpr.IsAny<HttpRequestMessage>(),
        ItExpr.IsAny<CancellationToken>()
      )
      .ReturnsAsync(() => responseQueue.Dequeue());

    return new HttpClient(handlerMock.Object)
    {
      BaseAddress = new Uri("http://api.weatherapi.com")
    };
  }
}
