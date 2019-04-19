const request = require('supertest');

const routeNotFound = require('../../../src/middlewares/routeNotFound');
const app = require('../../../src/app');

describe('testing the route-not-found middleware', () => {
  it('should call a next function passing a error as parameter', (done) => {
    const next = jest.fn();

    const error = new Error('Route Not Found');

    error.status = 404;

    routeNotFound(null, null, next);

    expect(next).toHaveBeenCalledTimes(1);

    done();
  });
});
