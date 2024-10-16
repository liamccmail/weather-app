import { render, screen, waitFor } from '@testing-library/react';
import { WeatherData } from '../models/WeatherData';
import WeatherComponent from './WeatherComponent';


const mockWeatherData: WeatherData = {
  city: 'London',
  region: 'Greater London',
  country: 'UK',
  localTime: '2023-10-01T12:00:00Z',
  temperature: 20,
  sunrise: '06:00 AM',
  sunset: '06:00 PM',
};

// const response = await fetch(`https://localhost:7059/Weather/${city}`);
// const data = await response.json();
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockWeatherData),
  })
) as jest.Mock;

describe('WeatherComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading skeleton initially', async () => {
    render(<WeatherComponent city="London" />);

    await waitFor(() => {
      expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    });

  });

  test('renders weather data after fetching', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve(mockWeatherData),
      })
    );

    render(<WeatherComponent city="London" />);

    await waitFor(() => {
      expect(screen.getByText('Local Time & Temperature')).toBeInTheDocument();
    });

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Greater London')).toBeInTheDocument();
    expect(screen.getByText('UK')).toBeInTheDocument();
    expect(screen.getByText('20 °C')).toBeInTheDocument();
    expect(screen.getByText('06:00 AM')).toBeInTheDocument();
    expect(screen.getByText('06:00 PM')).toBeInTheDocument();
  });

  test('renders error message on fetch failure', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch'))
    );

    render(<WeatherComponent city="InvalidCity" />);

    await screen.findByText('Error loading city data...');

    expect(screen.getByText('Please try another city name.')).toBeInTheDocument();
  });
});