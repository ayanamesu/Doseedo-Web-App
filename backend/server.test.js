const request = require('supertest');
const server = require('./server');

// TEST VALUES - need to reset
// LOGIN
const email = "tama@email.com"; //known user (caregiver)
const password = "tama"; //known user (caregiver)
// REGISTER & PROFILE EDIT
const new_email = "new@email.com"; //not in db yet
const new_pass = "new"; //not in db yet
const new_fname = "New"; //not in db yet
const new_lname = "Egg"; //not in db yet
const new_acctype = "caregiver"; //not in db yet
const address_2 = "APT 5"
const state = "12345"
//SESSION && LOGOUT
const sess_id = "99GtpGxhxtZbBxU5RE8UR60kLM96BuSb"; //known session with no logout time
const invalid_sess_id = "AY4XgkCXw2UhWmI6LHDApqNhVC69Zp2F"; //known session with logout time
const not_logged_out = "99GtpGxhxtZbBxU5RE8UR60kLM96BuSb"; //logout test - known session with no logout time
//PROFILE
const user_id = 31; //known user (caregiver)
//LINKACCOUNTS
const pat_id = 34; //known user (patient)
const pat_email = "test@email.com"; //known user (patient)
//MEDICINE
const med_id = 13; //delete test - known prescription

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
      .send({ session_id: sess_id });
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

// WING TO DO 
describe('POST /showpatient', () => {
});

// WING TO DO
describe('POST /showcaregiver', () => {
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

// WING TO DO
describe('POST /addmedicine', () => {
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

// WING TO DO 
describe('POST /viewmedicine', () => {
});

describe('POST /logout', () => {
    it('Successful Logout Status', async () => {
        const response = await request(server)
            .post('/logout')
            .send({ session_id: not_logged_out });
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

// WING TO DO
describe('POST /emergencycontact', () => {
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