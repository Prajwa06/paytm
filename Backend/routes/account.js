const express = require("express");
const authMiddleware = require("../middlewares/auth");
const Account = require("../models/Account");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (request, response) => {
  console.log("backend hit")
  try {
    const account = await Account.findOne({
      user: request.userId,
    });

    if (!account) {
      response.status(404).json({
        message: "No account found",
      });
    }

    response.status(200).json({
      balance: account.balance,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Internal Server error",
    });
  }
});

router.post("/transfer", authMiddleware, async (request, response) => {
  const session = await mongoose.startSession();
  const amount = Number(request.body.amount);
  const {to}=request.body;

  if(isNaN(amount) || amount<=0 || !to){
    response.status(403).json({
        message:"Please enter a Valid Input"
    });
    return;
  }

  session.startTransaction();

  const account = await Account.findOne({
    user: request.userId,
  }).session(session);

  if (!account) {
    await session.abortTransaction();
    response.status(403).json({
      message: "Invalid user",
    });
    return;
  }
  if (amount > account.balance) {
    await session.abortTransaction();
    response.status(200).json({
      message: "Insufficient balance",
    });
    return;
  }
  let toAccount;
 try {
     toAccount = await Account.findOne({
        user: to,
      }).session(session);
      if (!toAccount) {
        await session.abortTransaction();
        response.status(403).json({
          message: "Invalid user",
        });
        return;
      }
      
 } catch (error) {
   
        response.status(403).json({
          message: "Invalid user",
        });
        return;
      
 }
  

  await Account.updateOne(
    { user: request.userId },
    { $inc: { balance: -amount }, },
    {session}
  );
  await Account.updateOne(
    { user: to },
    { $inc: { balance: amount } },
    {session}
  )

  await session.commitTransaction();
  response.status(200).json({
    message: "Transfer Succesful",
  });
  return;
});

module.exports = router;
