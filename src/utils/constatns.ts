import dotenv from 'dotenv';

dotenv.config();

export const {
  ENV,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_PROD_DB,
  POSTGRES_USER,
  POSTGRES_PASS,
  POSTGRES_PORT,
  JWT_SECRET,
  SALT_ROUNDS,
  PEPPER,
  STATUS_ACTIVE = "ACTIVE",
  STATUS_COMPLETE = "COMPLETE",
} = process.env;



