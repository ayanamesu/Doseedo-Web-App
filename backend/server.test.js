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

//   describe('POST /viewmedicine', () => {
//     it('responds with 200 status', async () => {
//       const response = await request(server)
//         .post('/viewmedicine')
//         .send({ email: email, password: password });
//       expect(response.statusCode).toBe(200);
//     });
  
//     it('response body includes user_id and session_id', async () => {
//       const response = await request(server)
//         .post('/viewmedicine')
//         .send({ email: email, password: password });
//       expect(response.text).toContain('user_id');
//       expect(response.text).toContain('session_id');
//     });
//   }