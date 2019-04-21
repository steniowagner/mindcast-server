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

  it('should call next after set duration of the file on res.locals', async (done) => {
    res.locals.filePath = `${__dirname}/audio-test/test-audio-file.mp3`;

    await getPodcastDuration(null, res, next);

    expect(next).toHaveBeenCalledTimes(1);

    done();
  });
});
