import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders Weather Search Header", () => {
    render(<App />);
    const linkElement = screen.getByText(/Weather Search/i);
    expect(linkElement).toBeInTheDocument();
  })
  
  test("renders initial instruction text", () => {
    render(<App />);
    const instructionElement = screen.getByText(/Type in a city name above to retrieve local weather and astronomy data./i);
    expect(instructionElement).toBeInTheDocument();
  });
  
  test("renders hint text", () => {
    render(<App />);
    const hintElement = screen.getByText(/Hint: Use a country name after city to confine the search/i);
    expect(hintElement).toBeInTheDocument();
  });  
});
