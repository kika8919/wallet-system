"use strict";
const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  balance: { type: Number, required: true },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
});

walletSchema.methods.toJSONWallet = function () {
  return {
    id: this._id,
    name: this.name,
    balance: this.balance.toFixed(4),
    date: this.date,
  };
};

walletSchema.methods.toJSONWalletWithTransactionId = function () {
  return {
    id: this._id,
    name: this.name,
    balance: this.balance.toFixed(4),
    date: this.date,
    transactionId: this.transactionId,
  };
};

module.exports = mongoose.model("Wallet", walletSchema);
