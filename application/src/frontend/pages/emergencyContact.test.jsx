import React from "react";
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import EmergencyContact from './emergencyContact';

jest.mock('axios');

describe('EmergencyContact', () => {
  it('should render form when no emergency contact exists', () => {
    const { getByPlaceholderText } = render(<EmergencyContact />);
    expect(getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Phone Number')).toBeInTheDocument();
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
  });

  it('should render emergency contact information when it exists', async () => {
    axios.post.mockResolvedValueOnce({ data: { first_name: 'John', last_name: 'Doe', phone: '123456789', email: 'john@example.com' } });
    const { getByText } = render(<EmergencyContact />);
    await waitFor(() => expect(getByText('Name: John Doe')).toBeInTheDocument());
    await waitFor(() => expect(getByText('Phone: 123456789')).toBeInTheDocument());
    await waitFor(() => expect(getByText('Email: john@example.com')).toBeInTheDocument());
  });

  it('should call addEmergencyContact when form is submitted', async () => {
    axios.post.mockResolvedValueOnce({});
    const { getByPlaceholderText, getByText } = render(<EmergencyContact />);
    fireEvent.change(getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(getByPlaceholderText('Phone Number'), { target: { value: '123456789' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.click(getByText('Submit'));
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  });
});
