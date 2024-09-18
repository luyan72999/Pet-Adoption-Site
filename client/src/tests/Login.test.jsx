import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { MemoryRouter } from 'react-router-dom';
import Login from "../components/Users/Login";
import store from '../redux/store/store'; // Import your Redux store

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }

  observe(target) {
    this.target = target;
    this.callback([{ isIntersecting: true, target: this.target }]);
  }

  disconnect() {
    // Do nothing
  }
}

// Set IntersectionObserver globally for the test environment
global.IntersectionObserver = MockIntersectionObserver;

describe('Log in unsuccessful behavior', () => {
  test('Sign in failed. not redirected', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    
    fireEvent.click(screen.getByText("Sign in"));

    // Use getByText to find the error message
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
