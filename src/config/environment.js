require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env' : `.env.${process.env.NODE_ENV}`,
});

const config = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
};

module.exports = config;
