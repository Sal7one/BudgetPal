import client from "../database/database";

export type User = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  password_digest: string;
};

export class UserController {

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      // Query And It's data
      const userData = [email];
      const sql = "SELECT id, email, firstname, lastname, password_digest FROM users WHERE email=($1)";

      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql, userData);

      // Result
      const user = result.rows[0];

      if(user === undefined)
      return null;

      // Release
      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Unable to Get user with ID (${email}): ${err}`);
    }
  }

  async show(id: number): Promise<User | null> {
    try {
      // Query And It's data
      const userData = [id];
      const sql = "SELECT id, email, firstname, lastname FROM users WHERE id=($1)";

      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql, userData);

      // Result
      const user = result.rows[0];

      if(user === undefined)
      return null;

      // Release
      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Unable to Get user with ID (${id}): ${err}`);
    }
  }

  async create(email :string, firstname: string, lastname: string, passHash: string): Promise<User | null> {
    try {

      // Query And It's data
      const userData = [email, firstname, lastname, passHash];
      const sql =
        "INSERT INTO users (email, firstname, lastname, password_digest)" +
        "VALUES($1, $2, $3, $4) RETURNING id, email, firstname, lastname";

      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql, userData);

      // Result
      const user = result.rows[0];
      
      // Release
      conn.release();

      return user;
    } catch (err) {
      const error =  " " +err
      if(error.includes("users_email_key") || error.includes("already exists"))
      return null
      throw new Error(
        `unable create user (${firstname} ${lastname}): ${err}`
      );
    }
  }
}