const request = require('supertest');
const fs = require('fs').promises;
const path = require('path');
const app = require('../server');

const TASKS_PATH = path.join(__dirname, '..', 'tareas.json');
const USERS_PATH = path.join(__dirname, '..', 'users.json');

const getToken = async (username) => {
  await request(app).post('/auth/register').send({ username, password: '123456' });
  const login = await request(app).post('/auth/login').send({ username, password: '123456' });
  return login.body.token;
};

beforeEach(async () => {
  await fs.writeFile(TASKS_PATH, '[]');
  await fs.writeFile(USERS_PATH, '[]');
});

describe('Task routes', () => {
  test('GET /tareas requiere token', async () => {
    const res = await request(app).get('/tareas');
    expect(res.statusCode).toBe(401);
  });

  test('CRUD básico de tareas', async () => {
    const token = await getToken('tester');

    const create = await request(app)
      .post('/tareas')
      .set('Authorization', `Bearer ${token}`)
      .send({ titulo: 'Tarea 1', descripcion: 'Descripción' });

    expect(create.statusCode).toBe(201);

    const list = await request(app).get('/tareas').set('Authorization', `Bearer ${token}`);
    expect(list.statusCode).toBe(200);
    expect(Array.isArray(list.body)).toBe(true);
    expect(list.body).toHaveLength(1);

    const taskId = create.body.id;
    const update = await request(app)
      .put(`/tareas/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ titulo: 'Tarea editada' });

    expect(update.statusCode).toBe(200);

    const remove = await request(app)
      .delete(`/tareas/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(remove.statusCode).toBe(200);
  });

  test('cada usuario solo ve sus tareas', async () => {
    const tokenA = await getToken('ana');
    const tokenB = await getToken('bruno');

    await request(app)
      .post('/tareas')
      .set('Authorization', `Bearer ${tokenA}`)
      .send({ titulo: 'Tarea de Ana', descripcion: 'Privada de Ana' });

    const listA = await request(app).get('/tareas').set('Authorization', `Bearer ${tokenA}`);
    const listB = await request(app).get('/tareas').set('Authorization', `Bearer ${tokenB}`);

    expect(listA.statusCode).toBe(200);
    expect(listB.statusCode).toBe(200);
    expect(listA.body).toHaveLength(1);
    expect(listB.body).toHaveLength(0);
  });
});
