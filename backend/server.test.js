const request = require('supertest');
const server = require('./server');

const email = "W1@gmail.com";
const password = "123";

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

  describe('POST /viewmedicine', () => {
    it('responds with 200 status', async () => {
      const response = await request(server)
        .post('/viewmedicine')
        .send({ user_id: 22 }); // Send user_id in the request
        expect(response.statusCode).toBe(200);
    });
  
    it('response body includes user_id and session_id', async () => {
      const response = await request(server)
        .post('/viewmedicine')
        .send({ user_id: 22 }); // Send user_id in the request
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('user_id');
      expect(response.body[0]).toHaveProperty('med_name');
      expect(response.body[0]).toHaveProperty('description');
      expect(response.body[0]).toHaveProperty('med_type');
      expect(response.body[0]).toHaveProperty('dose_amt');
      expect(response.body[0]).toHaveProperty('dose_unit');
      expect(response.body[0]).toHaveProperty('start_date');
      expect(response.body[0]).toHaveProperty('end_date');
      expect(response.body[0]).toHaveProperty('doctor_first_name');
      expect(response.body[0]).toHaveProperty('doctor_last_name');
      expect(response.body[0]).toHaveProperty('doctor_phone');
  });
});

describe('POST /showpatients', () => {
  it('responds with 200 status', async () => {
    const response = await request(server)
      .post('/showpatients')
      .send({ user_id: 22 }); // Send user_id in the request
    expect(response.statusCode).toBe(200);
  });

  it('response body includes expected fields for first patient', async () => {
    const response = await request(server)
      .post('/showpatients')
      .send({ user_id: 22 }); // Send user_id in the request
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('first_name');
    expect(response.body[0]).toHaveProperty('last_name');
    expect(response.body[0]).toHaveProperty('email');
    expect(response.body[0]).toHaveProperty('password');
    expect(response.body[0]).toHaveProperty('address_1');
    expect(response.body[0]).toHaveProperty('address_2');
    expect(response.body[0]).toHaveProperty('state');
    expect(response.body[0]).toHaveProperty('city');
    expect(response.body[0]).toHaveProperty('zip_code');
    expect(response.body[0]).toHaveProperty('phone');
  });
});