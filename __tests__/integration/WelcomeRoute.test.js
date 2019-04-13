const request = require('supertest');
const app = require('../../src/app');

describe('Welcome Route', () => {
  it('returns proper response', async () => {
    const { status, body } = await request(app).get('/mind-cast/api/v1');

    expect(status).toBe(200);
    expect(!!body.message).toBe(true);
    expect(typeof body.message).toBe('string');
    expect(body.message).toBe('UHUL! The API is UP && RUNNING!!!');
  });
});
