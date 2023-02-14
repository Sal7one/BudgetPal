import OrderController, { Order, OrderProduct } from "../models/orders";
import { Product, ProductController } from "../models/articles";
import { User, UserController } from "../models/users";
import client from "../database/database";

const userController = new UserController();
const productController = new ProductController();
const orderController = new OrderController();


let commonUser1 : User;
let commonUser2 : User;
let commonProduct1 : Product;
let commonProduct2 : Product;
let commonOrder1 : Order;
let commonOrder2: Order;

beforeAll(async () => {
  const conn = await client.connect();
  try {
        // Query And It's data
        const sql1 ="DELETE FROM users;";
        const sql2 ="DELETE FROM products;";
        const sql3 ="DELETE FROM orders;";
        const sql4 ="DELETE FROM order_products;";
        
        // Connection
        await conn.query(sql4);
        await conn.query(sql3);
        await conn.query(sql2);
        await conn.query(sql1);
    
      const newUser1: User = {
        id: 0,
        firstname: "Saleh",
        lastname: "Alanazi",
        password: "123456789"
      };
    
      const newUser2: User = {
        id: 0,
        firstname: "Michle",
        lastname: "Jay",
        password: "123456789"
      };
     const user1 = await userController.create(
        newUser1.firstname,
        newUser1.lastname,
        newUser1.password
        );
    
     const user2 = await userController.create(
        newUser2.firstname,
        newUser2.lastname,
        newUser2.password
          );
    
      const prodcut1: Product = {
            id: 0,
            name: "Book About Movies",
            price: 200,
          };
    
          
      const prodcut2: Product = {
        id: 0,
        name: "Book About TV Shows",
        price: 250,
      };
    
    const actualprodcut1 = await productController.create(
      prodcut1.name,
      prodcut1.price);
    
      const actualprodcut2 = await productController.create(
        prodcut2.name,
        prodcut2.price);
    
          const order1: Order = {
            id: 0,
            userId: user1.id,
            status: "ACTIVE"
          };
    
          const order2: Order = {
            id: 0,
            userId: user2.id,
            status: "complete"
          };
    
          const actualorder1 = await orderController.create(
            order1.userId,
             order1.status
            );
    
            const actualorder2 =  await orderController.create(
              order2.userId,
               order2.status
              );
    
          const orderProduct1: OrderProduct = {
                id: 0,
                prodcutId: actualprodcut1.id,
                orderId: actualorder1.id,
                prodcutQuantity: 15
              };
    
          const orderProduct2: OrderProduct = {
                id: 0,
                prodcutId: actualprodcut2.id,
                orderId: actualorder2.id,
                prodcutQuantity: 6
              };
    
            await orderController.addOrderProducts(
              orderProduct1.orderId,
              orderProduct1.prodcutId,
              orderProduct1.prodcutQuantity);
    
            await orderController.addOrderProducts(
              orderProduct2.orderId,
              orderProduct2.prodcutId,
              orderProduct2.prodcutQuantity);
    
  } catch (error) {
    console.log("Error setting up: " + error)
  }
  
  // Query And It's data
  const users ="SELECT * FROM users LIMIT 2;";
  const userResults = await conn.query(users);
  commonUser1 = userResults.rows[0];
  commonUser2 = userResults.rows[1];

  // Query And It's data
  const products ="SELECT * FROM products LIMIT 2;";
  const prodcutsResults = await conn.query(products);
  commonProduct1 = prodcutsResults.rows[0];
  commonProduct2 = prodcutsResults.rows[1];

  // Query And It's data
  const orders ="SELECT * FROM orders LIMIT 2;";
  const ordersResults = await conn.query(orders);
  commonOrder1 = ordersResults.rows[0];
  commonOrder2 = ordersResults.rows[1];

  conn.release();
});

export { 
  commonUser1, commonUser2, 
  commonProduct1, commonProduct2, 
  commonOrder1, commonOrder2
}