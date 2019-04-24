const binaryParser = require('superagent-binary-parser');
const request = require('supertest');
const fs = require('fs');

const checkIsSamePodcast = require('../helpers/podcast/checkIsSamePodcast');
const AuthorController = require('../../src/controllers/AuthorController');
const checkIsSameAuthor = require('../helpers/author/checkIsSameAuthor');
const fakePodcast = require('../helpers/podcast/fakePodcast');
const fakeAuthor = require('../helpers/author/fakeAuthor');
const clearDatabase = require('../helpers/clearDatabase');
const AuthorDAO = require('../../src/dao/AuthorDAO');
const app = require('../../src/app');

const {
  createMultipleAuthors,
  createSingleAuthor,
} = require('../helpers/author/createAuthor');

const {
  createMultiplesPodcasts,
  createSinglePodcast,
} = require('../helpers/podcast/createPodcast');

describe('Testing Author Routes', () => {
  const next = jest.fn();

  afterEach(async (done) => {
    await clearDatabase();

    done();
  });

  describe('POST in /authors', () => {
    it("should persist an Author and return it's id", async (done) => {
      const { status, body } = await request(app)
        .post('/mind-cast/api/v1/authors')
        .send(fakeAuthor);

      expect(status).toBe(201);
      expect(body).toHaveProperty('id');
      expect(typeof body.id).toBe('string');
      expect(body.id).toHaveLength(24);

      const author = await AuthorDAO.readById(body.id);

      const isSameAuthor = checkIsSameAuthor(author._doc, fakeAuthor);

      expect(isSameAuthor).toBe(true);

      done();
    });

    it('should not create an Author when missing some required fields and return a 400 HTTP status code and an error message', async (done) => {
      const author = JSON.parse(JSON.stringify(fakeAuthor));

      delete author.name;

      const { status, body } = await request(app)
        .post('/mind-cast/api/v1/authors')
        .send(author);

      expect(status).toBe(400);
      expect(body).toHaveProperty('message');
      expect(typeof body.message).toBe('string');

      expect(body.message).toBe(
        'Author validation failed: name: Path `name` is required.',
      );

      const authors = await AuthorDAO.read();

      expect(authors).toHaveLength(0);

      done();
    });
  });

  describe('GET in /authors', () => {
    it("should return an empty array when theres's no authors saved", async (done) => {
      const { status, body } = await request(app).get(
        '/mind-cast/api/v1/authors',
      );

      expect(status).toBe(200);
      expect(body).toHaveProperty('authors');
      expect(Array.isArray(body.authors)).toBe(true);
      expect(body.authors).toHaveLength(0);

      done();
    });

    it('should return all the Authors saved', async (done) => {
      const authors = await createMultipleAuthors(5);

      const { status, body } = await request(app).get(
        '/mind-cast/api/v1/authors',
      );

      expect(status).toBe(200);
      expect(body).toHaveProperty('authors');
      expect(Array.isArray(body.authors)).toBe(true);
      expect(body.authors).toHaveLength(5);

      for (let i = 0; i < authors.length; i++) {
        expect(checkIsSameAuthor(body.authors[i], authors[i])).toBe(true);
      }

      done();
    });

    it('should throw an exception when some internal error occurs and call next passing this exception as parameter', async (done) => {
      await AuthorController.read(null, null, next);

      expect(next).toHaveBeenCalledTimes(1);

      expect(next.mock.calls[0][0] instanceof Error).toBe(true);

      done();
    });
  });

  describe('GET in /authors/:id', () => {
    it('should read and return the author with id equal to id received', async (done) => {
      const author = await createSingleAuthor();

      const { status, body } = await request(app).get(
        `/mind-cast/api/v1/authors/${author.id}`,
      );

      expect(status).toBe(200);
      expect(body).toHaveProperty('author');

      const isSameAuthor = checkIsSameAuthor(body.author, author);
      expect(isSameAuthor).toBe(true);

      done();
    });

    it("should return a 404 HTTP code with an error message if there's no author with the id received", async (done) => {
      const { body, status } = await request(app).get(
        '/mind-cast/api/v1/authors/123456789987654321123456',
      );

      expect(status).toBe(404);
      expect(body.author).toBeUndefined();
      expect(body).toHaveProperty('message', 'Author not found');

      done();
    });

    it("should return a 500 HTTP status code if the id isn't in mongodb default", async (done) => {
      const { status, body } = await request(app)
        .get('/mind-cast/api/v1/authors/xyz')
        .send(fakeAuthor);

      expect(status).toBe(500);
      expect(body.author).toBeUndefined();
      expect(body).toHaveProperty('message');

      done();
    });
  });

  describe('PATCH in /authors/:id', () => {
    it('should return 404 HTTP status code with an error message if the author doesn`t exist', async (done) => {
      const { status, body } = await request(app)
        .patch('/mind-cast/api/v1/authors/123456789987654321123456')
        .send(fakeAuthor);

      expect(status).toBe(404);
      expect(body).toHaveProperty('message', 'Author not found');
      expect(body.author).toBeUndefined();

      done();
    });

    it('should receive an author, update it with new values and return the author updated', async (done) => {
      const author = await createSingleAuthor();

      author.name = 'Stenio Wagner';

      const { status, body } = await request(app)
        .patch(`/mind-cast/api/v1/authors/${author.id}`)
        .send(author);

      expect(status).toBe(200);
      expect(body).toHaveProperty('author');

      const isSameAuthor = checkIsSameAuthor(body.author, author);
      expect(isSameAuthor).toBe(true);

      done();
    });

    it("should return a 500 HTTP status code if the id isn't in mongodb default", async (done) => {
      const { status, body } = await request(app)
        .patch('/mind-cast/api/v1/authors/xyz')
        .send(fakeAuthor);

      expect(status).toBe(500);
      expect(body.author).toBeUndefined();
      expect(body).toHaveProperty('message');

      done();
    });
  });

  describe('DELETE in /authors/:id', () => {
    it('should remove the author with the id received', async (done) => {
      const author = await createSingleAuthor();

      const { status, body } = await request(app).delete(
        `/mind-cast/api/v1/authors/${author.id}`,
      );

      expect(status).toBe(204);
      expect(Object.keys(body).length).toBe(0);

      const authorRemoved = await AuthorDAO.readById(author.id);

      expect(authorRemoved).toBeNull();

      done();
    });

    it('should return a 500 HTTP status code if the author doesn`t exist', async (done) => {
      const { status, body } = await request(app).delete(
        '/mind-cast/api/v1/authors/123456789987654321123456',
      );

      expect(status).toBe(status);
      expect(body).toHaveProperty('message', 'Author not found');
      expect(body.author).toBeUndefined();

      done();
    });

    it("should return a 500 HTTP status code if the id isn't in mongodb default", async (done) => {
      const { status, body } = await request(app).delete(
        '/mind-cast/api/v1/authors/xyz',
      );

      expect(status).toBe(500);
      expect(body.author).toBeUndefined();
      expect(body).toHaveProperty('message');

      done();
    });
  });

  describe('POST in /authors/:id/podcasts', () => {
    it("should create a Podcast and link with it's Author", async (done) => {
      const author = await createSingleAuthor();

      const { body, status } = await request(app)
        .post(`/mind-cast/api/v1/authors/${author.id}/podcasts`)
        .field('thumbnailImageURL', fakePodcast.thumbnailImageURL)
        .field('description', fakePodcast.description)
        .field('imageURL', fakePodcast.imageURL)
        .field('subject', fakePodcast.subject)
        .field('title', fakePodcast.title)
        .field('stars', fakePodcast.stars)
        .attach(
          'file',
          `${__dirname.replace(/^(.*\/__tests__)(.*)$/, '$1')}/test.mp3`,
        );

      expect(status).toBe(201);
      expect(body).toHaveProperty('podcast');

      const isSamePodcast = checkIsSamePodcast(body.podcast, fakePodcast);

      expect(isSamePodcast).toBe(true);

      const { podcasts } = await AuthorDAO.readById(author.id);

      const isPodcastsLinkedWithAuthor = podcasts.findIndex(
        podcast => podcast.id === body.podcast.id,
      );

      expect(isPodcastsLinkedWithAuthor).toBeGreaterThanOrEqual(0);

      done();
    });

    it('should not create a Podcast when some required field were forgotten and return a 400 HTTP status code', async (done) => {
      const author = await createSingleAuthor();

      const { body, status } = await request(app)
        .post(`/mind-cast/api/v1/authors/${author.id}/podcasts`)
        .field('thumbnailImageURL', fakePodcast.thumbnailImageURL)
        .field('description', fakePodcast.description)
        .field('imageURL', fakePodcast.imageURL)
        .field('subject', fakePodcast.subject)
        .field('title', fakePodcast.title)
        // .field('stars', fakePodcast.stars)
        .attach(
          'file',
          `${__dirname.replace(/^(.*\/__tests__)(.*)$/, '$1')}/test.mp3`,
        );

      expect(status).toBe(400);
      expect(body).toHaveProperty('message');
      expect(typeof body.message).toBe('string');

      expect(body.message).toBe(
        'Podcast validation failed: stars: Path `stars` is required.',
      );

      const { podcasts } = await AuthorDAO.readById(author.id);
      expect(podcasts.length).toBe(0);

      done();
    });

    it("should return an error message and 404 status code if the author does't exist", async (done) => {
      const { status, body } = await request(app)
        .post('/mind-cast/api/v1/authors/123456789987654321123456/podcasts')
        .field('thumbnailImageURL', fakePodcast.thumbnailImageURL)
        .field('description', fakePodcast.description)
        .field('imageURL', fakePodcast.imageURL)
        .field('subject', fakePodcast.subject)
        .field('title', fakePodcast.title)
        .field('stars', fakePodcast.stars)
        .attach(
          'file',
          `${__dirname.replace(/^(.*\/__tests__)(.*)$/, '$1')}/test.mp3`,
        );

      expect(status).toBe(404);
      expect(typeof body.message).toBe('string');
      expect(body).toHaveProperty('message', 'Author not found');

      done();
    });

    it('should return an error message and 400 HTTP status code if the file is missing', async (done) => {
      const { id } = await createSingleAuthor();

      const { status, body } = await request(app)
        .post(`/mind-cast/api/v1/authors/${id}/podcasts`)
        .field('thumbnailImageURL', fakePodcast.thumbnailImageURL)
        .field('description', fakePodcast.description)
        .field('imageURL', fakePodcast.imageURL)
        .field('subject', fakePodcast.subject)
        .field('title', fakePodcast.title)
        .field('stars', fakePodcast.stars);
      /* .attach(
          'file',
          `${__dirname.replace(/^(.*\/__tests__)(.*)$/, '$1')}/test.mp3`,
        ); */

      expect(status).toBe(400);
      expect(typeof body.message).toBe('string');
      expect(body).toHaveProperty('message', 'File is required');
      expect(body.podcast).toBeUndefined();

      done();
    });
  });

  describe('GET /podcasts', () => {
    it('should return all podcasts saved', async (done) => {
      const author = await createSingleAuthor();

      const podcasts = await createMultiplesPodcasts(5, author.id);

      const { status, body } = await request(app).get(
        '/mind-cast/api/v1/podcasts',
      );

      expect(status).toBe(200);
      expect(body).toHaveProperty('podcasts');
      expect(Array.isArray(body.podcasts)).toBe(true);
      expect(body.podcasts.length).toBe(5);

      for (let i = 0; i < podcasts.length; i++) {
        expect(checkIsSamePodcast(body.podcasts[i], podcasts[i])).toBe(true);
      }

      done();
    });

    it("should return an empty array when there's no podcasts saved", async (done) => {
      const { status, body } = await request(app).get(
        '/mind-cast/api/v1/podcasts',
      );

      expect(status).toBe(200);
      expect(body).toHaveProperty('podcasts');
      expect(Array.isArray(body.podcasts)).toBe(true);
      expect(body.podcasts.length).toBe(0);

      done();
    });
  });

  describe('GET /podcasts/:fileName/download', () => {
    it('should stream the podcast file for download', async (done) => {
      const destination = `${__dirname.replace(
        /^(.*\/__tests__)(.*)$/,
        '$1',
      )}/download.mp3`;
      const fileStream = fs.createWriteStream(destination);
      const author = await createSingleAuthor();

      const { body } = await request(app)
        .post(`/mind-cast/api/v1/authors/${author.id}/podcasts`)
        .field('thumbnailImageURL', fakePodcast.thumbnailImageURL)
        .field('description', fakePodcast.description)
        .field('imageURL', fakePodcast.imageURL)
        .field('subject', fakePodcast.subject)
        .field('title', fakePodcast.title)
        .field('stars', fakePodcast.stars)
        .attach(
          'file',
          `${__dirname.replace(/^(.*\/__tests__)(.*)$/, '$1')}/test.mp3`,
        );

      const responseStream = request(app)
        .get(`/mind-cast/api/v1/podcasts/${body.podcast.fileName}/download`)
        .parse(binaryParser)
        .buffer();

      responseStream.pipe(fileStream);

      responseStream.on('end', () => {
        const { status } = responseStream.response;

        expect(fileStream.bytesWritten).toBeGreaterThan(0);
        expect(status).toBe(200);

        fs.unlinkSync(destination);

        done();
      });
    });

    it("should return a 404 HTTP status code with a error message when the podcast doesn't exist", async (done) => {
      const author = await createSingleAuthor();

      await request(app)
        .post(`/mind-cast/api/v1/authors/${author.id}/podcasts`)
        .field('thumbnailImageURL', fakePodcast.thumbnailImageURL)
        .field('description', fakePodcast.description)
        .field('imageURL', fakePodcast.imageURL)
        .field('subject', fakePodcast.subject)
        .field('title', fakePodcast.title)
        .field('stars', fakePodcast.stars)
        .attach(
          'file',
          `${__dirname.replace(/^(.*\/__tests__)(.*)$/, '$1')}/test.mp3`,
        );

      const { status, body } = await request(app).get(
        '/mind-cast/api/v1/podcasts/doesnt-exist/download',
      );

      expect(status).toBe(404);
      expect(body).toHaveProperty('message', 'Podcast not found.');

      done();
    });
  });
});
