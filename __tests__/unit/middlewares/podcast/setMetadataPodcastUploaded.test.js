const setMetadataPodcastUploaded = require('../../../../src/middlewares/podcast/setMetadataPodcastUploaded');

describe('Testing the setMetadataPodcastUploaded', () => {
  const next = jest.fn();

  it('should call next after set the temporary path and the name of the podcast uploaded', async (done) => {
    const res = {
      locals: {},
    };

    expect.assertions(1);

    await setMetadataPodcastUploaded(null, res, next);

    expect(next).toHaveBeenCalledTimes(1);

    done();
  });
});
