import React from "react";
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import CareGiverRxListPage from './caregiverRxList';

jest.mock('axios');

describe('CareGiverRxListPage', () => {
  it('should render "Click on a patient to view their medication list" when no patient is selected', () => {
    const { getByText } = render(<CareGiverRxListPage />);
    expect(getByText('Click on a patient to view their medication list')).toBeInTheDocument();
  });

  it('should render patient list when patients are available', async () => {
    axios.post.mockResolvedValueOnce({ data: [{ id: 1, name: 'John Doe', email: 'john@example.com' }] });
    const { getByText } = render(<CareGiverRxListPage />);
    await waitFor(() => expect(getByText('John Doe')).toBeInTheDocument());
  });

  it('should render medication list when a patient is selected', async () => {
    axios.post.mockResolvedValueOnce({ data: [{ id: 1, med_name: 'Medicine A', dose_amt: '10mg' }] });
    const { getByText, getByTestId } = render(<CareGiverRxListPage />);
    fireEvent.click(getByText('John Doe')); // Assuming John Doe is a patient in your mock
    await waitFor(() => expect(getByTestId('medication-name')).toHaveTextContent('Medicine A'));
  });

  // You can write more tests to cover other functionalities like handleNextClick, handleBackClick, etc.
});
