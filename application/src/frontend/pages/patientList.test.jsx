/*import React from 'react';
import axios from "axios";
import App from "./App";
import {rander, act} from 'react';
//import axios from '../../__mocks__/axios';
*/

// PatientList.test.js

import React from 'react';
import {act} from 'react';
import { render, screen } from '@testing-library/react';
//import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Mocked for testing
import mockAxios from 'axios';
import Cookies from 'js-cookie'; // Mocked for testing
import PatientList from './patientList'; // Import the component to be tested
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const fetchAccountList= require ('./patientList');
jest.mock("axios");
mockAxios.post.mockResolvedValue({data: {userId: "1"}});

describe('PatientList test', () => {

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test('renders patients when API call succeeds', async () => {
    let userId=1;
    const data = await fetchAccountList();
    expect(data).toBe('');
  
});
});

