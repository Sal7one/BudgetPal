import { Pool } from 'pg';

import {
  ENV,
  POSTGRES_PASS,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PROD_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PORT
} from '../utils/constatns';

let client: Pool;

const PORT_NUMBER: number = parseInt(<string>POSTGRES_PORT, 10) || 5432;

if (ENV === 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    port: PORT_NUMBER,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASS
  });
} else if (ENV === 'prod') {
  client = new Pool({
    host: POSTGRES_HOST,
    port: PORT_NUMBER,
    database: POSTGRES_PROD_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASS
  });
} else {

  client = new Pool({
    host: POSTGRES_HOST,
    port: PORT_NUMBER,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASS as string
  });
}

export default client;
