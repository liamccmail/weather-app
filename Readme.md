# Weather Application

## Introduction

This solution I developed was apart of a Job Application for an Isurance Software company in London that I wrote over the span of a week. Although it didn't land me the job I wanted, I was happy with how the application worked and functioned.


**Running the API:**

- build with `dotnet build` command,
- run with `dotnet run` command and start the local, console instance of the webapi.

**Running the UI solution:**

- build with `npm run build` command,
- run with `npm start` command,

For obtaining the weather/time information, I have integrated with https://www.weatherapi.com/ using a free account.

If you wish to add your credientials to the application, when inside the `api/src/WeatherService.Api` location, include a secret with the format:

```
dotnet user-secrets set "WeatherApi:ApiKey" "YOUR_WEATHER_API_KEY_HERE"
```
