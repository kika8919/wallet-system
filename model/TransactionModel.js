"use strict";
const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  balance: { type: Number, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  walletId: { type: mongoose.Schema.Types.ObjectId, ref: "Wallet" },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
