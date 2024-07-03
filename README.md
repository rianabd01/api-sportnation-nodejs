# API SportNation e-commerce

Using Expressjs and Prisma ORM (THIS API IS UNDER DEVELOPMENT)

### Features

- Login using JWT Token
- Customer Registration with nodemailer and argon2 hashing (Verify link, Pass)
- cron job every 02.00 am (Destroy verify unverivied) => next work

### DEV NOTES

- Can replace customer if isActive = false even email and user exist

### Requirements

- Node v20.13.1
- pnpm (install npm i -g pnpm)

### Usage

- open the terminal and run "pnpm install"
- setting .env (example ".env.example")
- run "pnpm run dev" for development
- open url

### BASE URL: http://localhost:3456/

## 1. Get products

`GET /products`

**_Request_**

Api-key: ComingSoon

**_query_**

- orderBy=cheap or expensive
- range=100000-300000

**_example_**

`http://localhost:3456/products?sortBy=expensive&range=100000-10000000`

**_Response_**

```json
{
  "data": [
    {
      "productId": 4,
      "name": "Under Armour Stephen Curry",
      "price": 6000000,
      "description": "Lorem ipsum",
      "stockQuantity": 4
    },
    {
      "productId": 3,
      "name": "Onitsuka",
      "price": 1450000,
      "description": "Lorem ipsum",
      "stockQuantity": 12
    }
  ]
}
```

## 2. Register

`POST /auth/register`

**_request_**

```json
{
  "fullName": "name",
  "email": "email@gmail.com",
  "phoneNumber": "01234566",
  "username": "user",
  "password": "pass"
}
```

**_response_**

```json
Registration success, please verify the otp and check your email
```

## 3. Verify link

`GET /auth/verify-link`

**_request_**

**_query_**

```json
verifyToken = token,
userEmail = email@email.com
```

**_example_**

`http://localhost:3456/auth/verify-account?verifyToken=kLoR22oFsyKD3YzYOp_9&userEmail=email@email.com`

**_response_**

`Verification success`

## 4. Login

`POST /auth/login`

**_request_**

```json
{ "username": "your username", "password": "your password" }
```

**_response_**

```json
{
  "token": "{token}",
  "customerId": "1",
  "fullName": "fullname"
}
```

## 5. Add to cart

`POST /cart/:id`

**_request_**

`"Authorization": "Bearer {token}"`

Api-key: ComingSoon

**_response_**

```json
success add product to cart
```

## 6. Order

POST /order

**_request_**

```json
"Authorization": "Bearer {token}"
```

body:

```json
{
  "products": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 2
    }
  ],
  "shipmentId": 2,
  "paymentMethod": "COD"
}
```

Api-key: ComingSoon

**_response_**

`order succesfully`
