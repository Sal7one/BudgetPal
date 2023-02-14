CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  category_id integer REFERENCES categories(id),
  user_id     integer REFERENCES users(id),
  item_name VARCHAR(255) NOT NULL,
  item_price float NOT NULL, 
  bought timestamp default current_timestamp
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(255) NOT NULL
);

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title text NOT NULL,
  body text NOT NULL,
  image_url text NOT NULL,
  published timestamp default current_timestamp
);


CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 firstname VARCHAR(100) NOT NULL,
 lastname VARCHAR(100) NOT NULL,
 password_digest VARCHAR(100) NOT NULL
 );