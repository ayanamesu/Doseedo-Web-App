const request = require('supertest');
const server = require('./server');

const email = "tama@email.com";
const password = "tama";

describe('POST /login', () => {
    it('responds with 200 status', async () => {
      const response = await request(server)
        .post('/login')
        .send({ email: email, password: password });
      expect(response.statusCode).toBe(200);
    });
  
    it('response body includes user_id and session_id', async () => {
      const response = await request(server)
        .post('/login')
        .send({ email: email, password: password });
      expect(response.text).toContain('user_id');
      expect(response.text).toContain('session_id');
    });
  });

describe('POST /register', () => {
});

describe('POST /session', () => {
});

describe('POST /profile', () => {
});

describe('POST /profile/edit', () => {
});

// WING TO DO 
describe('POST /showpatient', () => {
});

describe('POST /showcaregiver', () => {
});

describe('POST /linkAccounts', () => {
});

describe('POST /addmedicine', () => {
});

describe('POST /deletemedicine', () => {
});

// WING TO DO 
describe('POST /viewmedicine', () => {
});

describe('POST /logout', () => {
});

describe('POST /emergencycontact', () => {
});

describe('POST /emergencycontact/add', () => {
});