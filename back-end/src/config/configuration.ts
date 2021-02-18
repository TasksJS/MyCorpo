export default () => ({
  app_secret: process.env.APP_SECRET,
  bcrypt_rounds: parseInt(process.env.BCRYPT_ROUNDS) || 10,
  dev: process.env.MODE === 'dev',
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
  },
});
