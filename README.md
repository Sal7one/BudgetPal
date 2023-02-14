# BudgetPal Backend Side Project

### DB Setup 


**Create user**

```shell
CREATE USER saleh WITH PASSWORD '1234';
```

**Create Databases**

```shell
#Dev Database
CREATE DATABASE budgetpal;

#Test Database
CREATE DATABASE budgetpal_test;
```

**GRANT all privileges to the user in the created databases**

```shell
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO saleh;
\c budgetpal
GRANT ALL PRIVILEGES ON DATABASE store_api_dev TO saleh;
ALTER DATABASE store_api_dev OWNER TO saleh;
\c budgetpal_test
GRANT ALL PRIVILEGES ON DATABASE store_api_test TO saleh;
ALTER DATABASE store_api_test OWNER TO saleh;
```

# Test 

```
 npm run test
 
 ```

# Api Refrence

Examples 


User route

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

### /items (GET)
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


### /items (POST)

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

### /articles GET

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


### /articles POST


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

There is a ".env.example" file provided please put the credentials then rename it to be ".env"

After that to test the application you can run

`npm run test`

and if you want to run the "Dev" version run below commands

`db-migrate up`


