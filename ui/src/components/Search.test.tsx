import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Search Component', () => {
  test('renders the search input and button', () => {
    render(<Search setCity={jest.fn()} />);
    
    const inputElement = screen.getByPlaceholderText(/Enter City Name/i);
    const buttonElement = screen.getByRole('button', { name: /search/i });

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls setCity with the correct value when form is submitted', () => {
    const setCityMock = jest.fn();
    render(<Search setCity={setCityMock} />);
    
    const inputElement = screen.getByPlaceholderText(/Enter City Name/i);
    const formElement = screen.getByRole('form');

    fireEvent.change(inputElement, { target: { value: 'London' } });
    fireEvent.submit(formElement);

    expect(setCityMock).toHaveBeenCalledWith('London');
  });
});