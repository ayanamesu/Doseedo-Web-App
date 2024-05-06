import axios from 'axios';
import { Home } from './home';
jest.mock('axios');

test('should login user', () => {
    const user = { email: "test@example.com", password: "password123" };
    const resp = { data: { status: "success", user: user } };
    axios.post.mockResolvedValue(resp);
  
    // Assuming you have a login function in your Home module that takes an email and password
    return Home.login(user.email, user.password).then(data => expect(data).toEqual(resp.data));
  });