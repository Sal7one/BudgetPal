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
      WHERE it.user_id = ($1) ORDER BY bought DESC`;

      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql, dataForUserItemsQuery);

      // Result
      const items = result.rows;

      // Release
      conn.release();

      return items;
    } catch (err) {
      throw new Error(`Unable to fetch Items of user with id of ${userId}): ${err}`);
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

      const sql =`INSERT INTO items (item_name, item_price, user_id, category_id)`
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
      console.log(err)
      throw new Error(`Unable to Create Item  Err: ${err} `);
    }
  }

  async remove(
    itemId: number,
    userId: number
  ) : Promise<boolean> {
    try {

      // Query And It's data
      let dataForUserItemsQuery = [itemId,userId];
      const sql = `DELETE
      FROM items
      WHERE id = ($1) AND user_id = ($2)`;

      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql, dataForUserItemsQuery);

      // Release
      conn.release();

      const isDeleted = result.rowCount > 0

      return isDeleted;
    } catch (err) {
      console.log(err)
      throw new Error(`Unable to fetch Items of user with id of ${userId}): ${err}`);
    }
  }
}