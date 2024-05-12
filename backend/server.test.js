const request = require('supertest');
const server = require('./server');

// TEST VALUES - all good to run
// LOGIN
const email = "W1@gmail.com"; //known user (caregiver)
const password = "123"; //known user (caregiver)
// REGISTER & PROFILE EDIT
const new_email = "new@email.com"; //not in db yet
const new_pass = "new"; //not in db yet
const new_fname = "New"; //not in db yet
const new_lname = "Egg"; //not in db yet
const new_acctype = "caregiver"; //not in db yet
const address_2 = "APT 22"
const state = "65987"
//SESSION && LOGOUT
const session_id = "LSCzitLCg3KpvVU56PzBDZ87G-KoGBWX"; //known session with no logout time
const invalid_sess_id = "EQBwD4d_wGDtf_gzmvHTIcnauVr457us"; //known session with logout time
//PROFILE
const user_id = 22; //known user (caregiver)
//LINKACCOUNTS
const pat_id = 26; //known user (patient)
const pat_email = "yama@hotmail.com"; //known user (patient)
//MEDICINE
const med_id = 33; //delete test - known prescription

describe('POST /login', () => {
    it('Successful Login Status', async () => {
      const response = await request(server)
        .post('/login')
        .send({ email: email, password: password });
      expect(response.statusCode).toBe(200);
    });
  
    it('Successful Login Body Check', async () => {
      const response = await request(server)
        .post('/login')
        .send({ email: email, password: password });
      expect(response.text).toContain('user_id', 'session_id');
    });

    it('Error Handling Check', async () => {
      const response = await request(server)
        .post('/login')
        .send({ email: email });
      expect(response.statusCode).toBe(400);
    });
});

describe('POST /register', () => {
  it('Successful Registration Status', async () => {
    const response = await request(server)
      .post('/register')
      .send({ first_name: new_fname, last_name: new_lname, email: new_email, password: new_pass, account_type: new_acctype });
    expect(response.statusCode).toBe(201);
  });

  it('Account already made', async () => {
    const response = await request(server)
      .post('/register')
      .send({ first_name: new_fname, last_name: new_lname, email: email, password: password, account_type: new_acctype });
    expect(response.statusCode).toBe(200);
  });

  it('Error Handling Check', async () => {
    const response = await request(server)
      .post('/register')
      .send({ email: email });
    expect(response.statusCode).toBe(400);
  });
});

describe('POST /session', () => {
  it('Successful Session Status', async () => {
    const response = await request(server)
      .post('/session')
      .send({ session_id: session_id });
    expect(response.statusCode).toBe(200);
  });

  it('Session no longer valid', async () => {
    const response = await request(server)
      .post('/session')
      .send({ session_id: invalid_sess_id });
    expect(response.statusCode).toBe(401);
  });

  it('Error Handling Check', async () => {
    const response = await request(server)
      .post('/session');
    expect(response.statusCode).toBe(400);
  });
});

describe('POST /profile', () => {
  it('Successful Profile Status', async () => {
    const response = await request(server)
      .post('/profile')
      .send({ user_id: user_id });
    expect(response.statusCode).toBe(200);
  });

  it('Successful Profile Body', async () => {
    const response = await request(server)
      .post('/profile')
      .send({ user_id: user_id });
      expect(response.text).toContain('first_name', 'last_name', 'email', 'phone', 'account_type', 'address_1', 'address_2', 'state', 'city', 'zip_code');
  });

  it('Invalid User ID', async () => {
    const response = await request(server)
      .post('/profile')
      .send({ user_id: 100 });
    expect(response.statusCode).toBe(401);
  });

  it('Error Handling Check', async () => {
    const response = await request(server)
      .post('/profile');
    expect(response.statusCode).toBe(400);
  });
});


describe('POST /profile/edit', () => {
    it('Successful Profile Edit Status', async () => {
        const response = await request(server)
            .post('/profile')
            .send({ user_id: user_id, first_name: "", last_name: new_lname, email: new_email, phone: "", address_1: "", address_2: address_2, state: state, city: "", zip_code: ""});
        expect(response.statusCode).toBe(200);
    });

  it('Error Handling Check', async () => {
    const response = await request(server)
      .post('/profile');
    expect(response.statusCode).toBe(400);
  });
});

describe('POST /linkAccounts', () => {
  it('Successful AccountLink Status - User is Caregiver', async () => {
      const response = await request(server)
      .post('/linkAccounts')
      .send({ user_id: user_id, email: pat_email });
      expect(response.statusCode).toBe(201);
  });

  it('Successful AccountLink Status User is Patient', async () => {
      const response = await request(server)
      .post('/linkAccounts')
      .send({ user_id: pat_id, email: new_email });
      expect(response.statusCode).toBe(201);
  });
  
  it('Invalid email status', async () => {
      const response = await request(server)
      .post('/linkAccounts')
      .send({ user_id: user_id, email: "thisemaildne@email.com"});
      expect(response.statusCode).toBe(400);
  })

  it('Same Account Type Status', async () => {
      const response = await request(server)
      .post('/linkAccounts')
      .send({ user_id: user_id, email: email});
      expect(response.statusCode).toBe(400);
  });
      
  it('Error Handling Check', async () => {
      const response = await request(server)
      .post('/linkAccounts')
      .send({ email: email });
      expect(response.statusCode).toBe(400);
  });
});

describe('POST /showpatients', () => {
  it('responds with 200 status', async () => {
    const response = await request(server)
      .post('/showpatients')
      .send({ user_id: user_id }); // Send user_id in the request
    expect(response.statusCode).toBe(200);
  });

  it('response body includes expected fields for first patient', async () => {
    const response = await request(server)
      .post('/showpatients')
      .send({ user_id: user_id }); // Send user_id in the request
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

describe('POST /showcaregivers', () => {
  it('should return caregiver details', async () => {
    const res = await request(server)
      .post('/showcaregivers')
      .send({ user_id: pat_id });

    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('first_name');
    expect(res.body[0]).toHaveProperty('last_name');
    expect(res.body[0]).toHaveProperty('email');
    expect(res.body[0]).toHaveProperty('password');
    expect(res.body[0]).toHaveProperty('address_1');
    expect(res.body[0]).toHaveProperty('address_2');
    expect(res.body[0]).toHaveProperty('state');
    expect(res.body[0]).toHaveProperty('city');
    expect(res.body[0]).toHaveProperty('zip_code');
    expect(res.body[0]).toHaveProperty('phone');
    expect(res.body[0]).toHaveProperty('account_type');
  });
});

describe('POST /addmedicine', () => {
  it('should return a success message after adding medicine', async () => {
    const res = await request(server)
      .post('/addmedicine')
      .send({
        user_id: pat_id,
        med_name: 'biden sleep aid',
        dose_amt: '200mgs',
        start_date: '2024-05-28',
        doctor_first_name: 'michael',
        doctor_last_name: 'lee',
        doctor_phone: '4156689999'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('msg');
    expect(res.body.msg).toEqual('Update successful!');
  });
});

describe('POST /viewmedicine', () => {
  it('responds with 200 status', async () => {
    const response = await request(server)
      .post('/viewmedicine')
      .send({ user_id: pat_id }); // Send user_id in the request
      expect(response.statusCode).toBe(200);
  });

  it('response body includes user_id and session_id', async () => {
    const response = await request(server)
      .post('/viewmedicine')
      .send({ user_id: pat_id }); // Send user_id in the request
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('user_id');
    expect(response.body[0]).toHaveProperty('med_name');
    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('dose_amt');
    expect(response.body[0]).toHaveProperty('start_date');
    expect(response.body[0]).toHaveProperty('end_date');
    expect(response.body[0]).toHaveProperty('doctor_first_name');
    expect(response.body[0]).toHaveProperty('doctor_last_name');
    expect(response.body[0]).toHaveProperty('doctor_phone');
});
});

describe('POST /deletemedicine', () => {
    it('Successful Delete Status', async () => {
        const response = await request(server)
            .post('/deletemedicine')
            .send({ id: med_id });
        expect(response.statusCode).toBe(200);
    });

    it('Unknown Prescription ID Status', async () => {
        const response = await request(server)
            .post('/deletemedicine')
            .send({ id: 100 });
        expect(response.statusCode).toBe(404);
    });

    it('Error Handling Check', async () => {
        const response = await request(server)
        .post('/deletemedicine');
        expect(response.statusCode).toBe(400);
    });
});

describe('POST /emergencycontact/add', () => {
  it('Successful New Add Status', async () => {
      const response = await request(server)
          .post('/emergencycontact/add')
          .send({ user_id: pat_id, first_name: "Mr", last_name: "Potato", phone: "123456", email: "potato@email.com" });
      expect(response.statusCode).toBe(201);
  });

  it('Successful Update Add Status', async () => {
      const response = await request(server)
          .post('/emergencycontact/add')
          .send({ user_id: pat_id, first_name: "Hana", last_name: "Hou", phone: "32597", email: "hh@email.com" });
      expect(response.statusCode).toBe(201);
  });

  it('Error Handling Check', async () => {
      const response = await request(server)
      .post('/emergencycontact/add');
      expect(response.statusCode).toBe(400);
  });
});

describe('POST /emergencycontact', () => {
  it('should return user emergency contact details', async () => {
    const res = await request(server)
      .post('/emergencycontact')
      .send({ user_id: pat_id });

    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toHaveProperty('user_id');
    expect(res.body[0]).toHaveProperty('first_name');
    expect(res.body[0]).toHaveProperty('last_name');
    expect(res.body[0]).toHaveProperty('email');
    expect(res.body[0]).toHaveProperty('phone');
  });
});

describe('POST /logout', () => {
  it('Successful Logout Status', async () => {
      const response = await request(server)
          .post('/logout')
          .send({ session_id: session_id });
      expect(response.statusCode).toBe(200);
  });

  it('Unknown Session ID Status', async () => {
      const response = await request(server)
          .post('/logout')
          .send({ session_id: "Something" });
      expect(response.statusCode).toBe(404);
  });

  it('Error Handling Check', async () => {
      const response = await request(server)
      .post('/logout');
      expect(response.statusCode).toBe(400);
  });
});


