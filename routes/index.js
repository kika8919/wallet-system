const express = require("express");

const router = express.Router();

const {
  setupWallet,
  creditDebitAmount,
  fetchTransactions,
  getWalletDetails,
} = require("../controller/wallet.controller");

router.post("/setup", setupWallet);

router.post("/transact/:walletId", creditDebitAmount);

router.get("/transactions", fetchTransactions);

router.get("/wallet/:id", getWalletDetails);

module.exports = router;
