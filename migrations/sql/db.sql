
CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 firstname VARCHAR(100) NOT NULL,
 lastname VARCHAR(100) NOT NULL,
 password_digest VARCHAR(100) NOT NULL
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



 CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  category_id integer REFERENCES categories(id),
  user_id     integer REFERENCES users(id),
  item_name VARCHAR(255) NOT NULL,
  item_price float NOT NULL, 
  bought timestamp default current_timestamp
);


insert into categories (category_name) VAlUES ('Food');
insert into categories (category_name) VAlUES ('Transportation');
insert into categories (category_name) VAlUES ('Entertainment');
insert into categories (category_name) VAlUES ('Utilities');
insert into categories (category_name) VAlUES ('Medical & Healthcare');
insert into categories (category_name) VAlUES ('Investing and Savings');
insert into categories (category_name) VAlUES ('Insurance');
insert into categories (category_name) VAlUES ('Housing');
insert into categories (category_name) VAlUES ('Miscellaneous');