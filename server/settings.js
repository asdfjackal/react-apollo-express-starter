function envOrDefault(env, defaultValue) {
  return process.env[env] || defaultValue;
}

const PORT = envOrDefault('PORT', 4000);
const JWT_SECRET = envOrDefault('JWT_SECRET', 'secret-key');
const PG_URI = envOrDefault('PG_URI', 'postgres://asdfjackal:test@localhost:5432/asdfjackal');

export {
  PORT,
  JWT_SECRET,
  PG_URI,
};
