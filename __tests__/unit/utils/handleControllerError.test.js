const handleControllerError = require('../../../src/utils/handleControllerError');

describe('Testing handleControllerError', () => {
  const next = jest.fn();
  const err = {};

  beforeEach(() => {
    err.status = {};
    err.errors = {};

    next.mockClear();
  });

  it('should set status code for 400 and call next once', () => {
    err.errors.someFieldError = 'Field Error';

    handleControllerError(err, next);

    expect(err.status).toBe(400);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should set status code for 500 and call next once', () => {
    handleControllerError(err, next);

    expect(err.status).toBe(500);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
