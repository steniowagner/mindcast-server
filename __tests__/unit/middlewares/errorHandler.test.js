const request = require('supertest');

const errorHandler = require('../../../src/middlewares/errorHandler');
const app = require('../../../src/app');

describe('testing the error-handler middleware', () => {
  const next = jest.fn();

  let req;
  let res;
  let err;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };

    err = {
      message: null,
      status: null,
    };

    res = {
      code: null,
      data: null,
      status(status) {
        this.code = status;
        return this;
      },
      send(payload) {
        this.data = payload;
      },
    };

    next.mockClear();
  });

  it('should handle a default Internal Error', (done) => {
    errorHandler(new Error('Internal Server Error'), req, res, next);

    expect(res).toHaveProperty('code', 500);
    expect(res).toHaveProperty('data', { message: 'Internal Server Error' });

    done();
  });

  it('should handle a generic Error', (done) => {
    const genericError = new Error('Generic Error');

    genericError.status = 123;

    errorHandler(genericError, req, res, next);

    expect(res).toHaveProperty('code', 123);
    expect(res).toHaveProperty('data', { message: 'Generic Error' });

    done();
  });
});
