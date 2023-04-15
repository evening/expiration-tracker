import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('home page loads', () => {
  render(<App />)
  const linkElement = screen.getByText(/Food Tracker/i)
  expect(linkElement).toBeInTheDocument()
})
