import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login page on initial route', () => {
  render(<App />);
  const loginElement = screen.getByRole('heading', { name: /login/i });
  expect(loginElement).toBeInTheDocument();
});

