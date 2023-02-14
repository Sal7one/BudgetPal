import client from "../database/database";

export type Item = {
  id: number;
  owner_id: number;
  category_id: number;
  name: string;
  price: string;
  dateBought: Date;
};

export class ItemController {
  async index(
    userId: number
  ): Promise<Item[]> {
    try {

      // Query And It's data
      let dataForUserItemsQuery = [userId];
      const sql = `SELECT it.item_name, it.item_price, c.category_name
      FROM items AS it
      INNER JOIN categories as c ON c.id = it.category_id
      WHERE it.user_id = ($1)`;

      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql, dataForUserItemsQuery);

      // Result
      const items = result.rows;

      // Release
      conn.release();

      return items;
    } catch (err) {
      throw new Error(`Unable to fetch Items: ${err}`);
    }
  }

  async create(
    itemName: string,
    itemPrice: number,
    userId: number,
    categoryId: number
     ): Promise<Item> {
    try {
      // Query And It's data
      let itemDataQuery = [
        itemName, itemPrice,
        userId, categoryId];

      const sql =`INSERT INTO items (item_name, item_price, userId, categoryId)`
       + ` VALUES($1, $2, $3, $4) RETURNING *`;
      
      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql, itemDataQuery);

      // Result
      const item = result.rows[0];

      // Release
      conn.release();

      return item;
    } catch (err) {
      throw new Error(`Unable to Create Item  Err: ${err} `);
    }
  }
}