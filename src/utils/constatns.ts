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
  Categories = ["",
    'food',
    'transportation',
    'entertainment',
    'utilities',
    'medical & healthcare',
    'investing and savings',
    'insurance',
    'housing',
    'miscellaneous',
  ],
} = process.env;

