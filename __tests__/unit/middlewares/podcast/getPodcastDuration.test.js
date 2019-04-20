const mp3Duration = require('mp3-duration');
const { promisify } = require('util');

const getPodcastDuration = require('../../../../src/middlewares/podcast/getPodcastDuration');

const duration = promisify(mp3Duration);

describe('testing the getPodcastDuration middleware', () => {
  const next = jest.fn();
  let res;

  beforeEach(() => {
    res = {
      locals: {},
    };

    next.mockClear();
  });

  it('should set duration of the file on res.locals and call next', async (done) => {
    res.locals.filePath = `${__dirname}/audio-test-files/test`;

    await getPodcastDuration(null, res, next);

    expect(next).toHaveBeenCalledTimes(1);

    done();
  });
});
