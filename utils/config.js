const {
  NODE_ENV,
  PORT = 3000,
  DATABASE_PROD,
  JWT_SECRET_PROD,
} = process.env;

const JWT_SECRET_DEV = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9';
const DATABASE_DEV = 'mongodb://localhost:3000/bitfilmsdb';

module.exports = {
  NODE_ENV,
  PORT,
  DATABASE_PROD,
  DATABASE_DEV,
  JWT_SECRET_PROD,
  JWT_SECRET_DEV,
};
