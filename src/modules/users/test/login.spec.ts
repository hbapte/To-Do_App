import app from "../../../app";
import chai from "chai";
import chaiHttp from "chai-http";
import User from "../../../database/models/user";
const bcrypt = require("bcrypt"); 

const { expect } = chai;

chai.use(chaiHttp);

describe('Login API', () => {
  beforeEach(async () => {
    // Create a test user
    const userData = {
      names: 'Test User',
      email: 'test@example.com',
      username: 'testuser',
      password: await bcrypt.hash('password123', 10) // Hash the password for storage
    };
    await User.create(userData);
  });

  afterEach(async () => {
    // Clean up after each test by deleting the test user
    await User.deleteMany({});
  });

  it('should login a user with correct credentials', async () => {
    const loginData = {
      emailUsername: 'test@example.com', // Use email or username to login
      password: 'password123',
      rememberMe: false 
    };

    const res = await chai.request(app)
      .post('/api/auth/login')
      .send(loginData);

    // Assertions
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
    // Add more assertions as needed
  });

  it('should return an error for incorrect password', async () => {
    const loginData = {
      emailUsername: 'test@example.com',
      password: 'wrongpassword', // Incorrect password
      rememberMe: false
    };

    const res = await chai.request(app)
      .post('/api/auth/login')
      .send(loginData);

    // Assertions
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('error').equal('Wrong password');
  });

  it('should return an error for non-existing user', async () => {
    const loginData = {
      emailUsername: 'nonexistent@example.com', // Non-existing email
      password: 'password123',
      rememberMe: false
    };

    const res = await chai.request(app)
      .post('/api/auth/login')
      .send(loginData);

    // Assertions
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error').equal('User not found');
  });

  // Add more test cases as needed
});
