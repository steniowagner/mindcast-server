const setMetadataPodcastUploaded = require('../../../../src/middlewares/podcast/setMetadataPodcastUploaded');

describe('Testing the setMetadataPodcastUploaded', () => {
  const next = jest.fn();
  const res = {};
  let req = {};

  beforeEach(() => {
    res.locals = {};
    res.status = null;

    req = {};
  });

  it('should call next after set the temporary path and the name of the file uploaded', () => {
    req.file = {};
    req.file.filename = 'filename';

    setMetadataPodcastUploaded(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(null);
    expect(res.locals).toHaveProperty('filePath', 'undefined/filename');
    expect(res.locals).toHaveProperty('fileName', 'filename');
  });

  it('should return an error when file is missing', () => {
    req.file = false;

    res.status = status => ({
      send: payload => ({ payload, status }),
    });

    const result = setMetadataPodcastUploaded(req, res, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(Object.keys(res.locals).length).toBe(0);
    expect(result.payload).toHaveProperty('message', 'File is required');
    expect(result.status).toBe(400);
  });

  it('should goes to the catch block when some internal error occurs', () => {
    res.locals = {};

    setMetadataPodcastUploaded(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.locals.filePath).toBeUndefined();
    expect(res.locals.fileName).toBeUndefined();
  });
});
