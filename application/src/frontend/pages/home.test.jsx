import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import HomePage from "./home";

describe('HomePage component', () => {
  test('renders without crashing', () => {
    render(<HomePage />);
  });

  test('switches between login and register forms', async () => {
    const { getByText } = render(<HomePage />);

    // By default, the login form should be rendered
    expect(getByText('Login')).toBeInTheDocument();

    // Click on the "Register" button to switch to the register form
    fireEvent.click(getByText('Register'));

    // After clicking on the "Register" button, the register form should be rendered
    expect(getByText('Register')).toBeInTheDocument();

    // Click on the "Login" button to switch back to the login form
    fireEvent.click(getByText('Login'));

    // After clicking on the "Login" button, the login form should be rendered again
    expect(getByText('Login')).toBeInTheDocument();
  });

  test('submits login form', async () => {
    const { getByText, getByPlaceholderText } = render(<HomePage />);

    // Switch to the login form
    fireEvent.click(getByText('Login'));

    // Fill in the email and password fields
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(getByText('submit'));

    // You can add assertions here to check if the form submission was successful
    await waitFor(() => {
      // Example assertion: Check if a success message is displayed
      expect(getByText('Successfuly logged In!')).toBeInTheDocument();
    });
  });

  test('submits registration form', async () => {
    const { getByText, getByPlaceholderText, getByLabelText } = render(<HomePage />);

    // Switch to the registration form
    fireEvent.click(getByText('Register'));

    // Fill in the registration form fields
    fireEvent.change(getByPlaceholderText('First name'), { target: { value: 'John' } });
    fireEvent.change(getByPlaceholderText('Last name'), { target: { value: 'Doe' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });

    // Select account type
    fireEvent.click(getByLabelText('Caregiver'));

    // Submit the registration form
    fireEvent.click(getByText('submit'));

    // You can add assertions here to check if the registration was successful
    await waitFor(() => {
      // Example assertion: Check if a success message is displayed
      expect(getByText('Account Creation was successful😀')).toBeInTheDocument();
    });
  });

  // You can write more tests to cover other scenarios like input field validations, error handling, etc.
});
