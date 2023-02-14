# BudgetPal Backend Side Project

### DB Setup 


**Create user**

Connect To DB as postgres user (root)
```shell
CREATE USER saleh WITH PASSWORD '1234';
ALTER ROLE saleh WITH SUPERUSER;

```

**Create Databases**

Connect to postgres as the user you made (saleh)
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
GRANT ALL PRIVILEGES ON DATABASE budgetpal TO saleh;
ALTER DATABASE budgetpal OWNER TO saleh;
\c budgetpal_test
GRANT ALL PRIVILEGES ON DATABASE budgetpal_test TO saleh;
ALTER DATABASE budgetpal_test OWNER TO saleh;
```

- Run SQL Commands to create tables from db.sql
``

# Api Refrence

Examples 

User route

### /users/ (GET)
ex: http://localhost:3000/users

```Auth: Bearer Token 

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJTYWxlaCIsImxhc3RuYW1lIjoiQWxhbmF6aSIsInBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQwNSRoMEhvWFdGTVhHUEIxcTZpMGZ5dVhlOU90Zko5SE52TDlJTHFCZjVaeTc5WDBFTVg5aXBCbSJ9LCJpYXQiOjE2NzYzODQyMDZ9.8GI_FzRDGtExDJncg5imBvV1jt9HgF52EHUCI6rHtRw
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
    "firstname": "Saleh",
    "lastname": "Alanazi",
    "password": "1234"
}
```
Response
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJTYWxlaCIsImxhc3RuYW1lIjoiQWxhbmF6aSIsInBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQwNSRoMEhvWFdGTVhHUEIxcTZpMGZ5dVhlOU90Zko5SE52TDlJTHFCZjVaeTc5WDBFTVg5aXBCbSJ9LCJpYXQiOjE2NzYzODQyMDZ9.8GI_FzRDGtExDJncg5imBvV1jt9HgF52EHUCI6rHtRw"
}
```


Items Route

### /items (GET)
AUTH: 

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJTYWxlaCIsImxhc3RuYW1lIjoiQWxhbmF6aSIsInBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQwNSRoMEhvWFdGTVhHUEIxcTZpMGZ5dVhlOU90Zko5SE52TDlJTHFCZjVaeTc5WDBFTVg5aXBCbSJ9LCJpYXQiOjE2NzYzODQyMDZ9.8GI_FzRDGtExDJncg5imBvV1jt9HgF52EHUCI6rHtRw
```
Response
``` 

{
    "items": [
        {
            "item_name": "DinnerAtMcDownlaods",
            "item_price": 545.15,
            "category_name": "Food"
        },
        {
            "item_name": "DinnerAtKFc",
            "item_price": 55.15,
            "category_name": "Food"
        }
    ]
}
```


### /items (POST)

AUTH:
 ```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJTYWxlaCIsImxhc3RuYW1lIjoiQWxhbmF6aSIsInBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQwNSRoMEhvWFdGTVhHUEIxcTZpMGZ5dVhlOU90Zko5SE52TDlJTHFCZjVaeTc5WDBFTVg5aXBCbSJ9LCJpYXQiOjE2NzYzODQyMDZ9.8GI_FzRDGtExDJncg5imBvV1jt9HgF52EHUCI6rHtRw

```

BODY RAW JSON
```

{
    "itemName": "Dinner At KFc",
    "category": "Food",
    "price": 55.15
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


Articles Route

### /articles GET

AUTH: NONE

BODY RAW JSON
```
NONE
```
Response
```{
    "articles": [
            {
                "id": 1,
                "title": "An aritcle with a broken Image! ",
                "body": "Thanks for reading!",
                "image_url": "https://www.google.com/salehonepics.jpg",
                "published": "2023-02-14T13:33:49.887Z"
            },
            {
                "id": 2,
                "title": "An Article with no image from the author",
                "body": " Go buy some land or something I dont know ",
                "image_url": "",
                "published": "2023-02-14T13:33:53.272Z"
            }
    ]
}
```


### /articles POST


AUTH: NONE (For Admin use only feature won't be provided in App)

BODY RAW JSON
```
            {
                "title": "An Article with no image from the author",
                "body": " Go buy some land or something I dont know ",
                "image_url": "",
            }

```
Response
```
            {
                "id": 3,
                "title": "An Article with no image from the author",
                "body": " Go buy some land or something I dont know ",
                "image_url": "",
                "published": "2023-02-14T13:33:53.272Z"
            }
```

``
# Test 

```
 npm run test
 
 ```

There is a ".env.example" file provided please put the credentials then rename it to be ".env"

After that to test the application you can run

`npm run test`

and if you want to run the "Dev" version run below commands

`db-migrate up`


