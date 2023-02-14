# Storefront Backend Project

### DB Setup (Important)

```

**Create user**

```shell
CREATE USER full_stack_user WITH PASSWORD 'password1234';
```

**Create Databases**

```shell
#Dev Database
CREATE DATABASE store_api_dev;

#Test Database
CREATE DATABASE store_api_test;

```

**GRANT all privileges to the user in the created databases**

```shell
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO full_stack_user;
\c store_api_dev
GRANT ALL PRIVILEGES ON DATABASE store_api_dev TO full_stack_user;
ALTER DATABASE store_api_dev OWNER TO full_stack_user;
\c store_api_test
GRANT ALL PRIVILEGES ON DATABASE store_api_test TO full_stack_user;
ALTER DATABASE store_api_test OWNER TO full_stack_user;
```


# Test 

```
 npm run test
 ```


# Api Refrence

Examples 


User route
### /users (GET)
ex:
```Auth: Bearer Token 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjc1OTMzNDc4fQ.R673TIT6Y5LzqAPxhlbkaqXfqqNxGgL5qsbNuIeJz9s
```

Response
```
{
    "users": [
        {
            "id": 1,
            "firstname": "Saleh",
            "lastname": "Alanazi"
        },
        {
            "id": 3,
            "firstname": "asd",
            "lastname": "asd"
        }
    ]
}

```

### /users/:id (GET)
ex: http://localhost:3000/users/2
```Auth: Bearer Token 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjc1OTMzNDc4fQ.R673TIT6Y5LzqAPxhlbkaqXfqqNxGgL5qsbNuIeJz9s
```

Response
```
{
    "user": {
        "id": 2,
        "firstname": "Saleh",
        "lastname": "Alanazi"
    }
}
```

### /users (POST)
AUTH: NONE

BODY RAW JSON
```
{
    "firstname": "asd",
    "lastname": "asd",
    "password": "asd"
}
```
Response
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvdyI6Iig0LGFzZCxhc2QpIn0sImlhdCI6MTY3NTkzNDIyOX0.wAP5JTAs0883PFS87ebDRfvUyg7oem0fYKbEOTsLtcM"
}
```


Products Route

### /products (GET)
AUTH: 
NONE
Response

``` {
    "products": [
        [
            {
                "id": 1,
                "name": "sssss",
                "price": "123"
            },
            {
                "id": 2,
                "name": "BookAboutProgramming",
                "price": "123"
            }
        ]
    ]
}
```


### /products/id (GET)
AUTH: 
NONE
Response

```{
    "product": {
        "id": 2,
        "name": "BookAboutProgramming",
        "price": "123"
    }
}
```

### /products (POST)

AUTH:
 ```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvdyI6Iig0LGFzZCxhc2QpIn0sImlhdCI6MTY3NTkzNDIyOX0.wAP5JTAs0883PFS87ebDRfvUyg7oem0fYKbEOTsLtcM

```

BODY RAW JSON
```

{
    "price": "123",
    "name": "Book About Programming"
}

```

Response
```

{
    "product": {
        "id": 2,
        "name": "BookAboutProgramming",
        "price": "123"
    }
}

```


Orders Route

### /orders GET

AUTH:
 ```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvdyI6Iig0LGFzZCxhc2QpIn0sImlhdCI6MTY3NTkzNDIyOX0.wAP5JTAs0883PFS87ebDRfvUyg7oem0fYKbEOTsLtcM
```

BODY RAW JSON
```
{
    "userId": "2"
}
```
Response
```
{
    "orders": [
        {
            "id": 1,
            "status": "ACTIVE",
            "user_id": 2
        },
        {
            "id": 3,
            "status": "ACTIVE",
            "user_id": 2
        }
    ]
}
```


### /orders POST


AUTH:
 ```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvdyI6Iig0LGFzZCxhc2QpIn0sImlhdCI6MTY3NTkzNDIyOX0.wAP5JTAs0883PFS87ebDRfvUyg7oem0fYKbEOTsLtcM
```

BODY RAW JSON
```
{
    "userId": "2"

```
Response
```
{
    "order": {
        "id": 3,
        "status": "ACTIVE",
        "user_id": 2
    }
}
```

### /orders/id  PUT (ACTIVE, COMPLETE)


AUTH:
 ```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvdyI6Iig0LGFzZCxhc2QpIn0sImlhdCI6MTY3NTkzNDIyOX0.wAP5JTAs0883PFS87ebDRfvUyg7oem0fYKbEOTsLtcM
```

BODY RAW JSON
```
{
    "status": "ACTIVE"
}

```
Response
```
{
    "order": {
        "id": 3,
        "status": "ACTIVE",
        "user_id": 2
    }
}
```

### /orders/id/prodcuts (GET)

AUTH:
 ```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvdyI6Iig0LGFzZCxhc2QpIn0sImlhdCI6MTY3NTkzNDIyOX0.wAP5JTAs0883PFS87ebDRfvUyg7oem0fYKbEOTsLtcM
```

orders/1/prodcuts
BODY RAW JSON
```
NONE

```
Response
```
{
    "orderProducts": [
        {
            "name": "BookAboutProgramming",
            "price": "123",
            "order_id": 1,
            "product_id": 2,
            "product_quantity": 7
        }
    ]
}
```

### /orders/id/prodcuts (POST)

AUTH:
 ```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvdyI6Iig0LGFzZCxhc2QpIn0sImlhdCI6MTY3NTkzNDIyOX0.wAP5JTAs0883PFS87ebDRfvUyg7oem0fYKbEOTsLtcM
```

orders/1/products

(If product is already added the quantity gets summed)


BODY RAW JSON
```
{
    "productId": "2",
    "quantity": "3"
}

```
Response
```
{
    "orderProduct": {
        "id": 1,
        "product_quantity": 7,
        "product_id": 2,
        "order_id": 1
    }
}

There is a ".env.example" file provided please put the credentials then rename it to be ".env"

After that to test the application you can run

`npm run test`

and if you want to run the "Dev" version run below commands

`db-migrate up`


