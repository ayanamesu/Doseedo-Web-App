import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import PatientList from './patientList';

// Mock axios post function
jest.mock('axios');

describe('PatientList component', () => {
  test('renders without crashing', () => {
    render(<PatientList />);
  });

  test('fetches and displays account list', async () => {
    const accountList = [
      { id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' },
      { id: 2, first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@example.com' }
    ];

    // Mock axios post function to return mocked data
    axios.post.mockResolvedValueOnce({ status: 200, data: accountList });

    const { getByText } = render(<PatientList />);

    // Check if "Linked Accounts:" header is rendered
    expect(getByText('Linked Accounts:')).toBeInTheDocument();

    // Check if account names and emails are displayed
    await waitFor(() => {
      accountList.forEach(account => {
        expect(getByText(`${account.first_name} ${account.last_name}`)).toBeInTheDocument();
        expect(getByText(account.email)).toBeInTheDocument();
      });
    });
  });

  // You can write more tests to cover other scenarios like handling no accounts or errors
});
