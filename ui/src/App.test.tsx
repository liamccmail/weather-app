import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Weather Search Header", () => {
  render(<App />);
  const linkElement = screen.getByText(/Weather Search/i);
  expect(linkElement).toBeInTheDocument();
});
