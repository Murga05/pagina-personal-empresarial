const request = require('supertest');
const fs = require('fs').promises;
const app = require('../server');

const USERS_PATH = require('path').join(__dirname, '..', 'users.json');

beforeEach(async () => {
  await fs.writeFile(USERS_PATH, '[]');
});

describe('Auth routes', () => {
  test('POST /auth/register registra usuario', async () => {
    const res = await request(app).post('/auth/register').send({ username: 'demo', password: '123456' });
    expect(res.statusCode).toBe(201);
  });

  test('POST /auth/login retorna token', async () => {
    await request(app).post('/auth/register').send({ username: 'demo', password: '123456' });
    const res = await request(app).post('/auth/login').send({ username: 'demo', password: '123456' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('POST /register y /login funcionan como alias', async () => {
    const register = await request(app).post('/register').send({ username: 'alias', password: '123456' });
    expect(register.statusCode).toBe(201);

    const login = await request(app).post('/login').send({ username: 'alias', password: '123456' });
    expect(login.statusCode).toBe(200);
    expect(login.body.token).toBeDefined();
  });
});
