const setMetadataPodcastUploaded = require('../../../../src/middlewares/podcast/setMetadataPodcastUploaded');

describe('Testing the setMetadataPodcastUploaded', () => {
  const next = jest.fn();

  it('should set the temporary path and the name of the podcast uploaded', async (done) => {
    await setMetadataPodcastUploaded(null, null, next);

    expect(next).toHaveBeenCalledTimes(1);

    done();
  });
});
