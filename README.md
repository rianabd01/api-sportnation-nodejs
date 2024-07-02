# API SportNation e-commerce

Using Expressjs and Prisma ORM (THIS API IS UNDER DEVELOPMENT)

### Features

- Login using JWT Token
- Customer Registration with nodemailer and argon2 hashing (OTP, Pass)
- cron job every 02.00 am (Destroy OTP unverivied) => next work

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

### Get products

/products

**_Request_**
Api-key: ComingSoon

**_query_**

- orderBy=cheap or expensive
- range=100000-300000

**_example_**
http://localhost:3456/products?sortBy=expensive&range=100000-10000000

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

### Register

/auth/register
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

### OTP

/auth/otp
**_request_**

```json
{
  "email": "email@gmail.com",
  "otpVal": "112233"
}
```

**_response_**

```json
OTP verification success
```

### Login

auth/login

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

### Add to cart

/cart/:id

**_request_**

```json
"Authorization": "Bearer {token}"
```

Api-key: ComingSoon

**_response_**

```json
success add product to cart
```

### Order

/order

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

```json
order succesfully
```
