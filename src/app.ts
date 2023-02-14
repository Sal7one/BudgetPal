import express from 'express';
import bodyParser from 'body-parser';
import usersRouter from "./handlers/users";
import articleRoutes from "./handlers/articles";
import itemsRouter from "./handlers/items";
import cors from 'cors';

const app: express.Application = express();
const port = process.env.PORT || 80
const address = `localhost:${port}`;

app.use(cors({
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Methods",
  ],
  "methods": 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  "preflightContinue": true,
  "origin": '*',
}));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

usersRouter(app)
articleRoutes(app)
itemsRouter(app)

app.get('/', (req: express.Request, res: express.Response) => {
  res
  .status(200)
  .json({ message: "Try /users, /products /orders" });
});

const jsonErorr = { success: false, message: '404 Not Found' };
app.get('*', (req: express.Request, res: express.Response) => {
  res
  .status(404)
  .json(jsonErorr);
});


app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});

export default app