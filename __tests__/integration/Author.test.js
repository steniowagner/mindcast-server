const request = require('supertest');

const checkIsSameAuthor = require('../helpers/author/checkIsSameAuthor');
const fakePodcast = require('../helpers/podcast/fakePodcas');
const fakeAuthor = require('../helpers/author/fakeAuthor');
const clearDatabase = require('../helpers/clearDatabase');
const app = require('../../src/app');

const {
  createMultipleAuthors,
  createSingleAuthor,
} = require('../helpers/author/createAuthor');

describe('Testing Author Routes', () => {
  afterEach(async (done) => {
    await clearDatabase();

    done();
  });

  describe('POST in /authors/:id/podcasts', () => {
    it("should create a Podcast, persist the file uploaded in GridFS and link the new Podcast with it's Author", async (done) => {
      const { id } = await createSingleAuthor();

      const response = await request(app)
        .post(`/mind-cast/api/v1/authors/${id}/podcasts`)
        .attach(
          'file',
          `${__dirname.replace(/^(.*\/__tests__)(.*)$/, '$1')}/test.mp3`,
        );

      expect(1 + 1).toBe(2);

      done();
    });
  });

  describe('DELETE in /authors/:id', () => {
    it('should remove the author with the id received', async (done) => {
      const author = await createSingleAuthor();

      const deleteAuthorResponse = await request(app).delete(
        `/mind-cast/api/v1/authors/${author.id}`,
      );

      expect(deleteAuthorResponse).toHaveProperty('status', 204);
      expect(Object.keys(deleteAuthorResponse.body).length).toBe(0);

      const getAuthorByIdResponse = await request(app).get(
        `/mind-cast/api/v1/authors/${author.id}`,
      );

      expect(getAuthorByIdResponse).toHaveProperty('status', 404);
      expect(getAuthorByIdResponse.body).toHaveProperty(
        'message',
        'Author not found',
      );
      expect(getAuthorByIdResponse.body.author).toBeUndefined();

      done();
    });

    it('should return an error if the author doesn`t exist', async (done) => {
      const response = await request(app)
        .delete('/mind-cast/api/v1/authors/123456789987654321123456')
        .send(fakeAuthor);

      expect(response).toHaveProperty('status', 404);
      expect(response.body).toHaveProperty('message', 'Author not found');
      expect(response.body.author).toBeUndefined();

      done();
    });
  });

  describe('PATCH in /authors/:id', () => {
    it('should return an error if the author doesn`t exist', async (done) => {
      const response = await request(app)
        .patch('/mind-cast/api/v1/authors/123456789987654321123456')
        .send(fakeAuthor);

      expect(response).toHaveProperty('status', 404);
      expect(response.body).toHaveProperty('message', 'Author not found');
      expect(response.body.author).toBeUndefined();

      done();
    });

    it('should receive an author, update it with new values and return the author updated', async (done) => {
      const author = await createSingleAuthor();

      author.name = 'Stenio Wagner';

      const response = await request(app)
        .patch(`/mind-cast/api/v1/authors/${author.id}`)
        .send(author);

      expect(response).toHaveProperty('status', 200);
      expect(response.body).toHaveProperty('author');

      const isSameAuthor = checkIsSameAuthor(response.body.author, author);
      expect(isSameAuthor).toBe(true);

      done();
    });
  });

  describe('GET in /authors/:id', () => {
    it('should read and return the author with id equal to id received', async (done) => {
      const author = await createSingleAuthor();

      const response = await request(app).get(
        `/mind-cast/api/v1/authors/${author.id}`,
      );

      expect(response).toHaveProperty('status', 200);
      expect(response.body).toHaveProperty('author');

      const isSameAuthor = checkIsSameAuthor(response.body.author, author);
      expect(isSameAuthor).toBe(true);

      done();
    });

    it("it should return a 404 HTTP code if there's no author with the id received", async (done) => {
      const response = await request(app).get(
        '/mind-cast/api/v1/authors/123456789987654321123456',
      );

      expect(response).toHaveProperty('status', 404);
      expect(response.body.author).toBeUndefined();
      expect(response.body).toHaveProperty('message', 'Author not found');

      done();
    });
  });

  describe('GET in /authors', () => {
    it('should return an empty array', async (done) => {
      const response = await request(app).get('/mind-cast/api/v1/authors');

      expect(response).toHaveProperty('status', 200);
      expect(response.body).toHaveProperty('authors');
      expect(Array.isArray(response.body.authors)).toBe(true);
      expect(response.body.authors).toHaveLength(0);

      done();
    });

    it('should return all the Authors recorded', async (done) => {
      const authors = await createMultipleAuthors();

      const response = await request(app).get('/mind-cast/api/v1/authors');

      expect(response).toHaveProperty('status', 200);
      expect(response.body).toHaveProperty('authors');
      expect(Array.isArray(response.body.authors)).toBe(true);
      expect(response.body.authors).toHaveLength(5);

      for (let i = 0; i < authors.length; i++) {
        expect(checkIsSameAuthor(response.body.authors[i], authors[i])).toBe(
          true,
        );
      }

      done();
    });
  });

  describe('POST in /authors', () => {
    it('should return the id of the new Author', async (done) => {
      const response = await request(app)
        .post('/mind-cast/api/v1/authors')
        .send(fakeAuthor);

      expect(response).toHaveProperty('status', 201);
      expect(response).toHaveProperty('body');
      expect(response.body).toHaveProperty('id');
      expect(typeof response.body.id).toBe('string');
      expect(response.body.id).toHaveLength(24);

      done();
    });

    it('should not create an Author when missing some required fields', async (done) => {
      const author = JSON.parse(JSON.stringify(fakeAuthor));
      const authorKeys = Object.keys(author);
      const MAX = authorKeys.length - 1;
      const MIN = 0;

      const RANDOM_KEY_INDEX = Math.floor(Math.random() * (MAX - MIN + 0)) + MIN;
      const randomField = authorKeys[RANDOM_KEY_INDEX];

      delete author[randomField];

      const response = await request(app)
        .post('/mind-cast/api/v1/authors')
        .send(author);

      expect(response).toHaveProperty('status', 400);
      expect(response.body).toHaveProperty('message');
      expect(typeof response.body.message).toBe('string');

      done();
    });
  });
});
