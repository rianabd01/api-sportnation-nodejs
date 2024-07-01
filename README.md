# API SportNation e-commerce

Using Expressjs and Prisma ORM (THIS API IS UNDER DEVELOPMENT)

### Features

- Login using JWT Token
- Customer Registration with nodemailer and argon2 hashing (OTP, Pass)
- Re-Send OTP after 1 minutes
- cron job every 02.00 am (Destroy OTP unverivied)

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

**_Response_**

```json
{
  "data": [
    {
      "id": 1,
      "name": "910 Geist ekiden",
      "stock": 10
    },
    {
      "id": 2,
      "name": "Adidas Samba",
      "stock": 13
    }
  ]
}
```

### Login

/login

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

### Login

/cart/:productId

**_request_**

```json
"Authorization": "Bearer {token}"
```

Api-key: ComingSoon

**_response_**

```json
{
  "data": {
    "cartId": 1,
    "customerId": 1,
    "quantity": 1,
    "productId": 1
  }
}
```
