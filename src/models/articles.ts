import client from "../database/database";

export type Article = {
  id: number;
  title: string;
  body: string;
  image_url: string;
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

  async create(
    articleTitle: string,
    articleBody: string,
    image: string,
     ): Promise<Article> {
    try {
      // Query And It's data
      const productData = [
        articleTitle, articleBody,
         image];

      const sql =`INSERT INTO articles (title, body, image)`
       + ` VALUES($1, $2, $3) RETURNING *`;
      
      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql, productData);

      // Result
      const product = result.rows[0];

      // Release
      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Unable to Create Prodcut with Info (${articleTitle}, ${articleBody}): ${err}`);
    }
  }
}