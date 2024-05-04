const request = require('supertest');
const server = require('./server');


// LOGIN
const email = "W1@gmail.com";
const password = "123";

// REGISTER
// const new_email = "new@email.com";
// const new_pass = "new";
// const new_fname = "New";
// const new_lname = "Egg";
// const new_acctype = "caregiver";

//SESSION
// const sess_id = "XVGd24K6FtFn-xn_XF0PO9b3CKyku2pp";
// const invalid_sess_id = "AY4XgkCXw2UhWmI6LHDApqNhVC69Zp2F";

//PROFILE
// const user_id = 31;

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


// describe('POST /register', () => {
//   it('Successful Registration Status', async () => {
//     const response = await request(server)
//       .post('/register')
//       .send({ first_name: new_fname, last_name: new_lname, email: new_email, password: new_pass, account_type: new_acctype });
//     expect(response.statusCode).toBe(201);
//   });

//   it('Account already made', async () => {
//     const response = await request(server)
//       .post('/register')
//       .send({ first_name: new_fname, last_name: new_lname, email: email, password: password, account_type: new_acctype });
//     expect(response.statusCode).toBe(200);
//   });

//   it('Error Handling Check', async () => {
//     const response = await request(server)
//       .post('/register')
//       .send({ email: email });
//     expect(response.statusCode).toBe(400);
//   });
// });

// describe('POST /session', () => {
//   it('Successful Session Status', async () => {
//     const response = await request(server)
//       .post('/session')
//       .send({ session_id: sess_id });
//     expect(response.statusCode).toBe(200);
//   });

//   it('Session no longer valid', async () => {
//     const response = await request(server)
//       .post('/session')
//       .send({ session_id: invalid_sess_id });
//     expect(response.statusCode).toBe(401);
//   });

//   it('Error Handling Check', async () => {
//     const response = await request(server)
//       .post('/session');
//     expect(response.statusCode).toBe(400);
//   });
// });

// describe('POST /profile', () => {
//   it('Successful Profile Status', async () => {
//     const response = await request(server)
//       .post('/profile')
//       .send({ user_id: user_id });
//     expect(response.statusCode).toBe(200);
//   });

//   it('Successful Profile Body', async () => {
//     const response = await request(server)
//       .post('/profile')
//       .send({ user_id: user_id });
//       expect(response.text).toContain('first_name', 'last_name', 'email', 'phone', 'account_type', 'address_1', 'address_2', 'state', 'city', 'zip_code');
//   });

//   it('Invalid User ID', async () => {
//     const response = await request(server)
//       .post('/profile')
//       .send({ user_id: 100 });
//     expect(response.statusCode).toBe(401);
//   });

//   it('Error Handling Check', async () => {
//     const response = await request(server)
//       .post('/profile');
//     expect(response.statusCode).toBe(400);
//   });
// });

// // IN PROGRESS
// describe('POST /profile/edit', () => {
//     it('Successful Profile Edit Status', async () => {
//         const response = await request(server)
//             .post('/profile')
//             .send({ user_id: user_id });
//         expect(response.statusCode).toBe(200);
//     });

//   it('Successful Profile Body', async () => {
//     const response = await request(server)
//       .post('/profile')
//       .send({ user_id: user_id });
//       expect(response.text).toContain('first_name', 'last_name', 'email', 'phone', 'account_type', 'address_1', 'address_2', 'state', 'city', 'zip_code');
//   });

//   it('Invalid User ID', async () => {
//     const response = await request(server)
//       .post('/profile')
//       .send({ user_id: 100 });
//     expect(response.statusCode).toBe(401);
//   });

//   it('Error Handling Check', async () => {
//     const response = await request(server)
//       .post('/profile');
//     expect(response.statusCode).toBe(400);
//   });
// });

// WING TO DO 
describe('POST /showcaregiver', () => {
});

describe('POST /linkAccounts', () => {
});

describe('POST /addmedicine', () => {
});

describe('POST /deletemedicine', () => {
});

// WING TO DO 
describe('POST /logout', () => {
});

describe('POST /emergencycontact', () => {
});

describe('POST /emergencycontact/add', () => {

});


