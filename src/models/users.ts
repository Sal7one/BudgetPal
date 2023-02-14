import client from "../database/database";
import bcrypt from "bcrypt";
import { PEPPER, SALT_ROUNDS } from "../utils/constatns";

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserController {
  async index(): Promise<User[]> {
    try {
      // Query And It's data
      const sql = "SELECT id, firstname, lastname FROM users";

      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql);

      const users = result.rows;

      // Release
      conn.release();

      return users;
    } catch (err) {
      throw new Error(`Unable to fetch users: ${err}`);
    }
  }

  async show(id: number): Promise<User | null> {
    try {
      // Query And It's data
      const userData = [id];
      const sql = "SELECT id, firstname, lastname FROM users WHERE id=($1)";

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

  async create(firstname: string, lastname: string, password: string): Promise<User> {
    try {
      // Prepare data
      const hash = bcrypt.hashSync(
        password + PEPPER,
        parseInt(SALT_ROUNDS as string)
      );

      // Query And It's data
      const userData = [firstname, lastname, hash];
      const sql =
        "INSERT INTO users (firstname, lastname, password_digest)" +
        "VALUES($1, $2, $3) RETURNING *";

      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql, userData);

      // Result
      const user = result.rows[0];
      
      // Release
      conn.release();

      return user;
    } catch (err) {
      throw new Error(
        `unable create user (${firstname} ${lastname}): ${err}`
      );
    }
  }
}