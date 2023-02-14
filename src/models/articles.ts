import client from "../database/database";

export type Article = {
  id: number;
  title: string;
  content: string;
  authorId: number;
  published: Date;
};

export class ArticleController {
  async index(): Promise<Article[]> {
    try {
      // Query And It's data
      const sql = "SELECT * FROM articles";

      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql);

      // Result
      const products = result.rows;

      // Release
      conn.release();

      return products;
    } catch (err) {
      throw new Error(`Unable to fetch products: ${err}`);
    }
  }

  async show(productId: number): Promise<Product | null> {
    try {
      // Query And It's data
      const productData = [productId];
      const sql = "SELECT id, name, price FROM products WHERE id=($1)";

      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql, productData);

      // Result
      const product = result.rows[0];

      if(product === undefined)
        return null;

      // Release
      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Unable to Get Prodcut with ID (${productId}): ${err}`);
    }
  }

  async create(productName: string, productPrice: number): Promise<Product> {
    try {
      // Query And It's data
      const productData = [productName, productPrice];
      const sql ="INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";
      
      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql, productData);

      // Result
      const product = result.rows[0];

      // Release
      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Unable to Create Prodcut with Info (${productName}, ${productPrice}): ${err}`);
    }
  }
}