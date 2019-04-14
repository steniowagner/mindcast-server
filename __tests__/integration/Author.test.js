const mockingoose = require('mockingoose').default;
const mongoose = require('mongoose');
const request = require('supertest');

const AuthorFactory = require('../factories/Author');
const app = require('../../src/app');

const Author = mongoose.model('Author');

describe('POST in /author', () => {
  it('it should return the id of the new Author', async (done) => {
    const author = await AuthorFactory;

    const response = await request(app)
      .post('/mind-cast/api/v1/author')
      .send(author);

    expect(response).toHaveProperty('status', 201);
    expect(response).toHaveProperty('body');
    expect(response.body).toHaveProperty('id');
    expect(typeof response.body.id).toBe('string');
    expect(response.body.id).toHaveLength(24);

    done();
  });

  it('it should persist an Author on Database', async (done) => {
    const author = await AuthorFactory;

    mockingoose(Author).toReturn(author, 'save');

    const { id } = await Author.create(author);

    expect(typeof id).toBe('string');
    expect(id).toHaveLength(24);

    done();
  });

  it('it should not create an Author when missing some required fields', async (done) => {
    const author = await AuthorFactory;

    const authorKeys = Object.keys(author);
    const MAX = authorKeys.length - 1;
    const MIN = 0;

    const RANDOM_KEY_INDEX = Math.floor(Math.random() * (MAX - MIN + 0)) + MIN;
    const randomField = authorKeys[RANDOM_KEY_INDEX];

    delete author[randomField];

    const response = await request(app)
      .post('/mind-cast/api/v1/author')
      .send(author);

    expect(response).toHaveProperty('status', 400);
    expect(response.body).toHaveProperty('message');
    expect(typeof response.body.message).toBe('string');

    done();
  });
});
