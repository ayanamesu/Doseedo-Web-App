import React from 'react';
import { render } from '@testing-library/react';
import PatientList from './patientList'; // Import the component to be tested
import axios from '../../__mocks__/axios';

jest.mock('axios'); // Automatically mock axios
const mockedAxios = axios;

const renderComponent = () => (render(<PatientList />));

describe('PatientList Component', () => {
  test('renders linked accounts correctly', async () => {

    // Render the component
    const { getByText } = renderComponent();
    console.log("PEEPEE")
    console.log(await getByText);

    // // Check if the linked accounts are rendered correctly
    // const first_name = await findByText(/Lola/i);
    // expect(first_name).toBeInTheDocument();

    // const email = await findByText(/lola@email.com/i);
    // expect(email).toBeInTheDocument();
  });
});
