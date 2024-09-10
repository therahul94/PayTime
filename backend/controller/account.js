const { transferMoneyValidation } = require("../inputValidation");
const { accountModel } = require("../model/account");
const mongoose = require("mongoose");
const getBalance = async (req, res) => {
  try {
    const balanceDetails = await accountModel.findOne({ userId: req.userId });
    // .select({ _id: 0, userId: 0, balance: 1 });
    if (balanceDetails) {
      return res.status(200).json({ balance: (balanceDetails.balance / 100).toFixed(2) });
    }
    return res
      .status(400)
      .json({ message: "Something went wrong! Please try again!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Server is not responding!" });
  }
};

const transfer = async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { transferTo, amount } = req.body;
    // input validation
    const { success, error } = transferMoneyValidation(amount);
    if (!success) {
      const errorArr = error.issues.map((err) => {
        return { message: err.message };
      });
      // console.log({ message: errorArr })
      // return ;
      return res.status(411).json({ message: errorArr });
    }

    const transferFromAccount = await accountModel
      .findOne({ userId: req.userId })
      .session(session);
    if(!transferFromAccount){
      await session.abortTransaction();
      return res.status(400).json({message: "Your account data is not available! Please try again!"})
      // console.log({message: "Your account data is not available! Please try again!"});
      // return ;
    }
    if (transferFromAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient Balance" });
      // console.log({ message: "Insufficient Balance" });
      // return ;
    }
    const transferToAccount = await accountModel
      .findOne({ userId: transferTo })
      .session(session);
    if (!transferToAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid Account" });
      // console.log({ message: "Invalid Account" });
      // return ;
    }

    const debitFromAccount = await accountModel
      .updateOne(
        {
          userId: req.userId,
        },
        { $inc: { balance: -(amount * 100) } }
      )
      .session(session);


    if (!debitFromAccount.acknowledged || debitFromAccount.modifiedCount < 1) {
      await session.abortTransaction();
      return res
        .status(400)
        .json({ message: "Transaction failed! Please try again!" });
      // console.log({ message: "Transaction failed! Please try again!" });
      // return ;
    }

    const creditedToAccount = await accountModel
      .updateOne(
        {
          userId: transferTo,
        },
        { $inc: { balance: amount * 100 } }
      )
      .session(session);


    if (
      !creditedToAccount.acknowledged ||
      creditedToAccount.modifiedCount < 1
    ) {
      session.abortTransaction();
      return res.status(400).json({ message: "Transaction failed!" });
      // console.log({ message: "Transaction failed!" });
      // return ;
    }
    session.commitTransaction();
    return res.status(200).json({ message: "Transaction Successful" });
    // console.log({ message: "Transaction Successful" });
    // return ;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server isn't responding!" });
    // console.log({ message: "Server isn't responding!" });
    // return ;
  }
};



module.exports = { getBalance, transfer };
