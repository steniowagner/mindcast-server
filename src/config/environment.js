require('dotenv').config({
  path: process.env.NODE_ENV === 'development' ? '.env.development' : '',
});

const config = {
  development: {
    MONGO_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT,
  },
};

module.exports = config[process.env.NODE_ENV];
