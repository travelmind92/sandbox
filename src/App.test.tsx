import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders team list on initial load', () => {
  render(<App />);
  const header = screen.getByText(/sandbox/i);
  const heading = screen.getByRole('heading', { name: /^teams$/i });
  const sidebarItem = screen.getByRole('button', { name: /^teams$/i });
  const team = screen.getByText(/real madrid/i);
  const countryColumn = screen.getByText(/country/i);
  expect(header).toBeInTheDocument();
  expect(heading).toBeInTheDocument();
  expect(sidebarItem).toBeInTheDocument();
  expect(team).toBeInTheDocument();
  expect(countryColumn).toBeInTheDocument();
});
