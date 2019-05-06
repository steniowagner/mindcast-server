const mp3Duration = require('mp3-duration');
const { promisify } = require('util');

const getPodcastDurationInSeconds = require('../../../../src/middlewares/podcast/getPodcastDurationInSeconds');

const duration = promisify(mp3Duration);

describe('testing the getPodcastDurationInSeconds middleware', () => {
  const next = jest.fn();
  const res = {};

  beforeEach(() => {
    res.locals = {};
    res.status = null;
  });

  it('should call next after set duration of the file on res.locals', async (done) => {
    const [rootPath] = __dirname.split('unit');

    res.locals.filePath = `${rootPath}test.mp3`;

    res.status = status => ({
      send: payload => ({ payload, status }),
    });

    await getPodcastDurationInSeconds(null, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(Math.floor(res.locals.durationInSeconds)).toBe(29);

    done();
  });

  it('should return an error if filePath is missed', async (done) => {
    res.locals = {};

    res.status = status => ({
      send: payload => ({ payload, status }),
    });

    const result = await getPodcastDurationInSeconds(null, res, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(Object.keys(res.locals).length).toBe(0);
    expect(result.payload).toHaveProperty('message', 'File is required');
    expect(result.status).toBe(400);

    done();
  });

  it('should goes to the catch block when some internal error occurs', async (done) => {
    res.locals = null;

    const expectError = new TypeError(
      "Cannot destructure property `filePath` of 'undefined' or 'null'.",
    );

    await getPodcastDurationInSeconds(null, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expectError);
    expect(res.locals).toBeNull();

    done();
  });
});
