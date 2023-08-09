"use strict";
const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  balance: { type: Number, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now() },
  walletId: { type: mongoose.Schema.Types.ObjectId, ref: "Wallet" },
  type: { type: String },
  description: { type: String },
});

TransactionSchema.methods.toTransactionJSON = function () {
  return {
    id: this._id,
    balance: this.balance.toFixed(4),
    amount: this.amount.toFixed(4),
    walletId: this.walletId,
    description: this.description,
    date: this.date,
  };
};

module.exports = mongoose.model("Transaction", TransactionSchema);
