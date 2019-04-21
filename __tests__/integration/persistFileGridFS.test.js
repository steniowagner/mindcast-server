const GridFs = require('gridfs-stream');
const mongoose = require('mongoose');
const fs = require('fs');

const persistFileGridFS = require('../../src/utils/persistFileGridFS');
const { DATABASE_URL } = require('../../src/config/environment');
const clearDatabase = require('../helpers/clearDatabase');

describe('Testing persistFileGridFS', () => {
  const testDir = `${__dirname.replace(/^(.*\/__tests__)(.*)$/, '$1')}`;
  const tempDir = `${testDir}/test-temp`;
  const filePath = `${tempDir}/test.mp3`;

  beforeAll(async (done) => {
    await mongoose.connect(DATABASE_URL);
    done();
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });

  it('should persist the file received on GridFS and remove the uploaded file from the temporary directory', async (done) => {
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    fs.copyFileSync(`${testDir}/test.mp3`, `${tempDir}/test.mp3`);

    const isFilePersisted = await persistFileGridFS('test', filePath);
    expect(isFilePersisted).toBe(true);

    const isFilexExists = fs.existsSync(filePath);
    expect(isFilexExists).toBe(false);

    fs.rmdirSync(tempDir);

    done();
  }, 120000);

  it('should raise an excpetion if fileName is missed', async (done) => {
    const exec = async () => {
      try {
        return Promise.reject(await persistFileGridFS(null, filePath));
      } catch (error) {
        throw error;
      }
    };

    await expect(exec()).rejects.toThrow(new Error('fileName is required'));

    done();
  });

  it('should raise an excpetion if filePath is missed', async (done) => {
    const exec = async () => {
      try {
        return Promise.reject(await persistFileGridFS('test', null));
      } catch (error) {
        throw error;
      }
    };

    await expect(exec()).rejects.toThrow(new Error('filePath is required'));

    done();
  });

  it("should raise an excpetion if the file does't exsists", async (done) => {
    const exec = async () => {
      try {
        return Promise.reject(
          await persistFileGridFS('test', 'path/not/exists'),
        );
      } catch (error) {
        throw error;
      }
    };

    await expect(exec()).rejects.toThrow(new Error("File doen't exist"));

    done();
  });
});
