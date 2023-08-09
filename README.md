# Wallet Management APIs

This document provides information about a set of APIs for managing wallets, including initializing wallets, crediting/debiting amounts, fetching transactions, and retrieving wallet details.

## 1. Initialize Wallet

### Endpoint: `POST /setup`

Setup a new wallet with an initial balance.

**Request:**

```
POST /setup
```

Content-Type: application/json

```json
{
  "balance": 20,
  "name": "Hello world"
}
```

**Response:**

Status: 200 OK

```json
{
  "id": "4349349843",
  "balance": 20,
  "transactionId": "4349349843",
  "name": "Hello world",
  "date": "<JS Date obj>"
}
```

## 2. Credit/Debit Amount

### Endpoint: `POST /transact/:walletId`

Credit or debit the requested amount to the wallet.

**Request:**

```
POST /transact/12345
```

Content-Type: application/json

```json
{
  "amount": 10,
  "description": "Recharge"
}
```

For credit, the amount is a positive number, for debit, it's a negative number.

**Response:**

Status: 200 OK

```json
{
  "balance": 30,
  "transactionId": "8328832323"
}
```

Note: The amount can be a decimal up to 4 precision points.

## 3. Fetch Transactions

### Endpoint: `GET /transactions`

Fetch recent transactions for a given wallet.

**Request:**

```
GET /transactions?walletId=2434343&skip=10&limit=25
```

**Response:**

Status: 200 OK

```json
[
  {
    "_id": "transaction_id",
    "walletId": "2434343",
    "amount": 10.5,
    "balance": 30,
    "description": "Purchase",
    "date": "<JS Date obj>",
    "type": "CREDIT"
  },
  {
    "_id": "transaction_id",
    "walletId": "2434343",
    "amount": -5.25,
    "balance": 24.75,
    "description": "Withdrawal",
    "date": "<JS Date obj>",
    "type": "DEBIT"
  }
]
```

## 4. Get Wallet Details

### Endpoint: `GET /wallet/:id`

Fetch details of a wallet by its ID.

**Request:**

```
GET /wallet/12345
```

**Response:**

Status: 200 OK

```json
{
  "id": "12345",
  "balance": 24.75,
  "name": "Sample Wallet",
  "date": "<JS Date obj>"
}
```
