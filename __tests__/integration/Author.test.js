const mockingoose = require('mockingoose').default;
const mongoose = require('mongoose');
const request = require('supertest');

const AuthorFactory = require('../factories/Author');
const app = require('../../src/app');

const Author = mongoose.model('Author');

describe('GET in /author', () => {
  it('it shoudl return an empty array', async (done) => {
    const authors = [];
    mockingoose(Author).toReturn(authors, 'find');

    const response = await request(app).get('/mind-cast/api/v1/author');

    expect(response).toHaveProperty('status', 200);
    expect(response.body).toHaveProperty('authors');
    expect(Array.isArray(response.body.authors)).toBe(true);
    expect(response.body.authors).toHaveLength(0);

    done();
  });

  it('it should return all the Authors recorded', async (done) => {
    const author = await AuthorFactory;
    const authors = Array(5).fill(author);
    console.log(typeof author._id, author._id);
    mockingoose(Author).toReturn(authors, 'find');

    const response = await request(app).get('/mind-cast/api/v1/author');

    expect(response).toHaveProperty('status', 200);
    expect(response.body).toHaveProperty('authors');
    expect(Array.isArray(response.body.authors)).toBe(true);
    expect(response.body.authors).toHaveLength(5);

    for (let i = 0; i < authors.length; i++) {
      expect(response.body.authors[i]).toHaveProperty('about', author.about);
      expect(typeof response.body.authors[i].about).toBe('string');

      expect(response.body.authors[i]).toHaveProperty('name', author.name);
      expect(typeof response.body.authors[i].name).toBe('string');

      expect(response.body.authors[i]).toHaveProperty('_id');
      expect(response.body.authors[i]).toHaveProperty(
        'thumbnailProfileImageURL',
        author.thumbnailProfileImageURL,
      );
      expect(typeof response.body.authors[i].thumbnailProfileImageURL).toBe(
        'string',
      );

      expect(response.body.authors[i]).toHaveProperty(
        'profileImageURL',
        author.profileImageURL,
      );
      expect(typeof response.body.authors[i].profileImageURL).toBe('string');

      response.body.authors[i].categories.forEach((category) => {
        expect(author.categories.includes(category)).toBe(true);
        expect(typeof category).toBe('string');
      });
    }

    done();
  });
});

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
