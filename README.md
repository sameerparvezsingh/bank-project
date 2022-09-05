# Capstone Product

The Capstone Product is a banking solution using which users would be able to inquire on account balance and make funds transfer to another internal account.

## Run Locally

Clone the project

```bash
  git clone ''
```

Go to the project directory

For Accounts Microservice

```bash
  cd capstone-product-v3\accounts-microservice
  npm install
  node index.js
```

For Payment Microservice

```bash
  cd capstone-product-v3\payments-microservice
  npm install
  node Payment.js
```

For Authentication Microservice

```bash
  cd capstone-product-v3\authentication-microservice
  npm install
  npm run server

```

For Frontend:

```bash
  cd capstone-product-v3\frontend
  npm init -y
  npm start
```

## Database Schema

### Account Table

| Parameter       | Type             | Description             |
| :-------------- | :--------------- | :---------------------- |
| `accountnumber` | `character(120)` | Account number to fetch |
| `balanceamt`    | `numeric(17,2)`  | Balance amount          |
| `limitamt`      | `numeric(17,2)`  | Limit amount            |
| `lienamount`    | `numeric(17,2)`  | Lien amount             |
| `effectivebal`  | `numeric(17,2)`  | Lien amount             |
| `currency`      | `character(3)`   | Currency Type           |

### Currency Codes

| Parameter             | Type            | Description          |
| :-------------------- | :-------------- | :------------------- |
| `currencycode `       | `character(3)`  | Currency code        |
| `currencydescription` | `character(40)` | Currency Description |

### Currency Converting Table

| Parameter      | Type            | Description                  |
| :------------- | :-------------- | :--------------------------- |
| `fromcurrency` | `character(3)`  | Currency of sender account   |
| `tocurrency`   | ` character(3)` | Currency of receiver account |
| `value`        | `numeric(10,2)` | Value                        |

### User Accounts

| Parameter       | Type             | Description     |
| :-------------- | :--------------- | :-------------- |
| `userid`        | `character(10)`  | User ID         |
| `accountnumber` | ` character(10)` | Account numbers |

### Login Details

| Parameter  | Type            | Description |
| :--------- | :-------------- | :---------- |
| `userid`   | `character(10)` | User ID     |
| `password` | `character(10)` | Password    |

### Transaction Table(MongoDB)

| Parameter         | Type              | Description               |
| :---------------- | :---------------- | :------------------------ |
| `from_account_id` | `character(40)`   | Sender's Account Number   |
| `to_account_id`   | `character(40)`   | Reciever's Account Number |
| `amount`          | `numeric(40)`     | Amount                    |
| `currency`        | `character(13,4)` | Currency                  |
| `description`     | `character(20)`   | Description               |

## API Reference

1. #### Get Account Balance

```http
  GET http://<api_host>:3000/balance_inquiry
```

- ##### POST JSON data

```json
{
  "userid": "c1",
  "accountNumber": "SB501"
}
```

| Parameter    | Type     | Description                              |
| :----------- | :------- | :--------------------------------------- |
| `account_id` | `string` | **Required**. Id of the account to fetch |

- ##### Received JSON data if account exists

```json
{
  "Account Number": "SB501",
  "Balance Amount": "INR 500.00",
  "Limit Amount": "INR 0.0",
  "Lien Amount": "INR 0.0",
  "Effective_Balance": "INR 500.00"
}
```

- ##### Received JSON data if account does not exists

```json
{
  "Error": "Account Not Found"
}
```

2. #### Initiate Fund Transafer

```http
  POST http://<api_host>:5005/fund_transfer
```

- ##### POST JSON data

```json
{
  "from_account": "SB501",
  "to_account": "SB502",
  "amount": 100,
  "currency": "INR",
  "description": "Rent"
}
```

| Parameter      | Type        | Description                            |
| :------------- | :---------- | :------------------------------------- |
| `from_account` | `character` | **Required**. Sender's Account ID      |
| `to_account`   | `character` | **Required**. Receiver's Account ID    |
| `amount`       | `float`     | **Required**. Amount to be transferred |
| `currency`     | `character` | **Required**. Currency                 |
| `description`  | `character` | **Optional**. Description              |

- ##### Received JSON data after Transaction Success

```json
{
  "Transaction Number": "86aXXXXXXXXXX8f773e",
  "Receiver Account Number": "SB502",
  "Amount": "INR 100",
  "Description": "Rent"
}
```

- ##### Received JSON data if sender account does not exists

```json
{
  "Error": "Sender Account Not Found",
  "Transaction_State": "Failed"
}
```

- ##### Received JSON data if Receiver account does not exists

```json
{
  "Error": "Receiver Account Not Found",
  "Transaction_State": "Failed"
}
```

- ##### Received JSON data if sender account does not have sufficient balance

```json
{
  "Error": "Insufficient Balance",
  "Transaction_State": "Failed"
}
```

3. #### Get Mini-Statement

```http
  POST http://<api_host>:5005/Mini_Statement
```

- ##### POST JSON data

```json
{
  "accountnumber": "SB501"
}
```

| Parameter        | Type     | Description                              |
| :--------------- | :------- | :--------------------------------------- |
| `Account_Number` | `string` | **Required**. Id of the account to fetch |

- ##### Received data if account exists

Total Available Balance: 101.97 USD

```
| Transaction ID  | Transaction Type | Transaction Amount | Associated Account Number | Description | Transaction Date and Time |
| :-------------- | :--------------- | :----------------- | ------------------------- | ----------- | ------------------------- |
| c19XXXXXXXXXXXX | credited         | 1 USD              | SB501                     | Rent        | 2021-12-17 03:24:18       |
| 99cXXXXXXXXXXXX | debited          | 1 USD              | SB502                     | NA          | 2021-12-17 03:24:18       |

```

- ##### Received JSON data if account does not exists

Account Not Found

## Other References:

We have not hardcoded any of the data parameter's in our program we opted to
include a default.json configuratio file. so that during deployment user can change parameters without the need of changing the code.

### Config File Parameters - default.json:

| Parameter                       | Type      | Description                     |
| :------------------------------ | :-------- | :------------------------------ |
| `postgresDatabaseConnectionURL` | `url`     | MySQL DB Server Hostname        |
| `mongoDBConnectionURL`          | `string`  | MySQL User's ID                 |
| `PORT_BALANCE_INQUIRY`          | `integer` | Port for accounts microservice  |
| `PORT_AUTHENTICATION_MS`        | `integer` | Port for authentication service |
| `PORT_FRONTEND`                 | `integer` | Port for frontend               |
| `PORT_PAYMENTS_MICROSERVICE`    | `integer` | Port for payments microservice  |

## Running Tests

To run Unit.tests for the Backend, run the following command

```bash
  cd <directory to run test in>

  npm run test

```

## Authors

- @sameerparvezsingh

## Feedback

If you have any feedback or suggestions on improving this codebase, reach out to us on MS teams.

```

```
