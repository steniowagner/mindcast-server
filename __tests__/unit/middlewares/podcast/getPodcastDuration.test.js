const getPodcastDuration = require('../../../../src/middlewares/podcast/getPodcastDuration');

describe('testing the getPodcastDuration middleware', () => {
  const next = jest.fn();
  const res = {
    locals: {
      durationInSeconds: null,
    },
  };

  beforeEach(() => {
    res.locals.durationInSeconds = null;

    next.mockClear();
  });

  it('should set res.locals.duration and call next function - 01', () => {
    res.locals.durationInSeconds = 60 * 12;

    getPodcastDuration(null, res, next);

    expect(res.locals).toHaveProperty('duration', '12:00');

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should set res.locals.duration and call next function - 02', () => {
    res.locals.durationInSeconds = 60 * 5 + 5;

    getPodcastDuration(null, res, next);

    expect(res.locals).toHaveProperty('duration', '05:05');

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should set res.locals.duration and call next function - 03', () => {
    res.locals.durationInSeconds = 60 * 5;

    getPodcastDuration(null, res, next);

    expect(res.locals).toHaveProperty('duration', '05:00');

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should set res.locals.duration and call next function - 04', () => {
    res.locals.durationInSeconds = 60 * 5 + 43;

    getPodcastDuration(null, res, next);

    expect(res.locals).toHaveProperty('duration', '05:43');

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should set res.locals.duration and call next function - 05', () => {
    res.locals.durationInSeconds = 83;

    getPodcastDuration(null, res, next);

    expect(res.locals).toHaveProperty('duration', '01:23');

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should set res.locals.duration and call next function - 06', () => {
    res.locals.durationInSeconds = 60;

    getPodcastDuration(null, res, next);

    expect(res.locals).toHaveProperty('duration', '01:00');

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should set res.locals.duration and call next function - 07', () => {
    res.locals.durationInSeconds = 14;

    getPodcastDuration(null, res, next);

    expect(res.locals).toHaveProperty('duration', '00:14');

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should set res.locals.duration and call next function - 08', () => {
    res.locals.durationInSeconds = 62;

    getPodcastDuration(null, res, next);

    expect(res.locals).toHaveProperty('duration', '01:02');

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should set res.locals.duration and call next function - 09', () => {
    res.locals.durationInSeconds = 0;

    getPodcastDuration(null, res, next);

    expect(res.locals).toHaveProperty('duration', '00:00');

    expect(next).toHaveBeenCalledTimes(1);
  });
});
