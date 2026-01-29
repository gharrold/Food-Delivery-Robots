
const request = require('supertest');
let app;

describe('Robot Service API', () => {
  beforeAll(() => {
    app = require('./server');
  });

  test('GET /robots returns robots array', async () => {
    const res = await request(app).get('/robots');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.robots)).toBe(true);
  });

  test('POST /move moves robots', async () => {
    const res1 = await request(app).get('/robots');
    const before = res1.body.robots;
    const res2 = await request(app).post('/move').send({ meters: 5 });
    expect(res2.statusCode).toBe(200);
    expect(Array.isArray(res2.body.robots)).toBe(true);
    expect(res2.body.robots).not.toEqual(before);
  });

  test('POST /reset resets robots', async () => {
    const res = await request(app).post('/reset').send({ count: 10 });
    expect(res.statusCode).toBe(200);
    expect(res.body.robots.length).toBe(10);
  });

  test('POST /start-auto and /stop-auto', async () => {
    const res1 = await request(app).post('/start-auto').send({ meters: 2, intervalMs: 100 });
    expect(res1.statusCode).toBe(200);
    expect(res1.body.status).toBe('started');
    const res2 = await request(app).post('/stop-auto');
    expect(res2.statusCode).toBe(200);
    expect(res2.body.status).toBe('stopped');
  });
});

describe('Robot Service API - error and edge cases', () => {
  beforeAll(() => {
    app = require('./server');
  });

  test('POST /move with invalid meters returns 200 and does not crash', async () => {
    const res = await request(app).post('/move').send({ meters: 'not-a-number' });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.robots)).toBe(true);
  });

  test('POST /reset with invalid count returns 200 and uses default', async () => {
    const res = await request(app).post('/reset').send({ count: 'bad' });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.robots)).toBe(true);
    // Should use default count (20)
    expect(res.body.robots.length).toBeGreaterThan(0);
  });

  test('POST /start-auto with invalid body returns 200 and starts', async () => {
    const res = await request(app).post('/start-auto').send({ meters: 'bad', intervalMs: 'bad' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('started');
  });

  test('POST /stop-auto without start returns 200 and stopped', async () => {
    const res = await request(app).post('/stop-auto');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('stopped');
  });

  test('GET unknown endpoint returns 404', async () => {
    const res = await request(app).get('/notfound');
    expect(res.statusCode).toBe(404);
  });

  test('POST unknown endpoint returns 404', async () => {
    const res = await request(app).post('/notfound');
    expect(res.statusCode).toBe(404);
  });
});
