import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

function stubFetch(): typeof fetch {
  return jest.fn((input: RequestInfo | URL) => {
    const url = typeof input === 'string' ? input : input.toString();
    if (url.includes('/public/teams')) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 't1',
              name: 'Real Madrid',
              country: 'Spain',
              leagueId: 'l1',
              updatedAt: '2026-01-01T00:00:00.000Z',
            },
          ]),
      } as Response);
    }
    if (url.includes('/public/leagues')) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 'l1',
              name: 'La Liga',
              country: 'Spain',
              updatedAt: '2026-01-01T00:00:00.000Z',
            },
            {
              id: 'l2',
              name: 'Premier League',
              country: 'England',
              updatedAt: '2026-01-01T00:00:00.000Z',
            },
          ]),
      } as Response);
    }
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    } as Response);
  }) as typeof fetch;
}

const origGlobalFetch = global.fetch;
const origWindowFetch =
  typeof window !== 'undefined' ? window.fetch.bind(window) : undefined;

beforeEach(() => {
  const impl = stubFetch();
  global.fetch = impl;
  if (typeof window !== 'undefined') {
    window.fetch = impl;
  }
});

afterEach(() => {
  global.fetch = origGlobalFetch;
  if (typeof window !== 'undefined' && origWindowFetch) {
    window.fetch = origWindowFetch;
  }
});

test('renders team list on initial load', async () => {
  render(<App />);
  expect(screen.getByText(/sandbox/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /^teams$/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /^teams$/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /^leagues$/i })).toBeInTheDocument();

  const countryColumn = await screen.findByRole('columnheader', { name: /^country$/i });
  expect(countryColumn).toBeInTheDocument();

  const team = await screen.findByText(/real madrid/i);
  expect(team).toBeInTheDocument();

  expect(await screen.findByText(/la liga/i)).toBeInTheDocument();
});

test('switches to leagues and renders league list', async () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /^leagues$/i }));

  const heading = await screen.findByRole('heading', { name: /^leagues$/i });
  expect(heading).toBeInTheDocument();
  expect(await screen.findByText(/premier league/i)).toBeInTheDocument();
});
