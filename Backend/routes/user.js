require("dotenv").config();
const express = require("express");
const signupSchema = require("../validations/signupSchema");
const signInSchema = require("../validations/signinSchema");
const router = express.Router();
const User = require("../models/User");
const Account = require("../models/Account");
const jwt = require("jsonwebtoken");
const secret = process.env.JWTSecret;
const bcrypt = require("bcrypt");
const authMiddleware = require("../middlewares/auth");
const updateUserSchema = require("../validations/updateUserSchema");

// sign in route
router.post("/signup", async (request, response) => {
  try {
    const body = request.body;
    const parsedData = signupSchema.safeParse(body);

    // validating input
    if (!parsedData.success) {
      response.status(400).json({
        message: "Incorrect Inputs Please  enter valid inputs",
      });
      return;
    }

    const user = await User.findOne({
      username: body.username,
    });

    if (user) {
      response.status(403).json({
        message: "user already exist, please try login",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const dbUser = await User.create({
      username: body.username,
      firstname: body.firstname,
      lastname: body.lastname,
      password: hashedPassword,
    });

    await Account.create({
      user: dbUser._id,
      balance: 1 + Math.random() * 10000,
    });

    const token = jwt.sign(
      {
        userId: dbUser._id,
      },
      secret
    );

    response.status(200).json({
      message: "User  Created Succesfully",
      token,
    });
    return;
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Internal Server error",
    });
    return;
  }
});

// sign in route
router.post("/signin", async (request, response) => {
  try {
    const body = request.body;
    const parsedData = signInSchema.safeParse(body);

    if (!parsedData.success) {
      response.status(400).json({
        message: "Incorrect Inputs Please  enter valid inputs",
      });
      return;
    }

    const user = await User.findOne({
      username: body.username,
    });

    if (!user) {
      response.status(403).json({
        message: "user does not exists, please sign up",
      });
      return;
    }

    const isMatch = await bcrypt.compare(body.password, user.password);

    if (!isMatch) {
      response.status(401).json({
        message: "Incorrect Password Please try again",
      });
      return;
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      secret
    );

    response.status(200).json({
      message: "User  sign in  Succesfully",
      token,
    });
    return;
  } catch (error) {
    response.status(500).json({
      message: "Internal Server error",
    });
    console.log(error);
    return;
  }
});

router.put("/", authMiddleware, async (request, response) => {
  const success = updateUserSchema.safeParse(request.body).success;

  if (!success) {
    response.status(400).json({
      message: "Incorrect Inputs Please  enter valid inputs",
    });
    return;
  }

  try {
    const updateData = {};
    if (request.body.firstname) {
      updateData.firstname = request.body.firstname;
    }
    if (request.body.lastname) {
      updateData.lastname = request.body.lastname;
    }
    if (request.body.password) {
      const hashedPassword = await bcrypt.hash(request.body.password, 10);
      updateData.password = hashedPassword;
    }

    if (Object.keys(updateData).length === 0) {
      return response
        .status(400)
        .json({ message: "No fields provided for update" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      request.userId,

      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      response.status(404).json({
        message: "User not found",
      });
      return;
    }

    response.status(200).json({
      message: "User info Updated succesfully",
    });
    return;
  } catch (error) {
    response.status(500).json({
      message: "Internal Server error",
    });
    console.log(error);
    return;
  }
});

router.get("/bulk", authMiddleware, async (request, response) => {
  try {
    const filter = request.query.filter || "";

    const users = await User.find({
      $or: [
        {
          firstname: { $regex: filter, $options: "i" },
        },
        {
          lastname: { $regex: filter, $options: "i" },
        },
      ],
    });

    if (users.length === 0) {
      response.status(200).json({
        message: "No User Found",
      });
      return;
    }

    const filteredUsers = users.map((user) => {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    });
    response.status(200).json({
      filteredUsers,
    });
    return;
  } catch (error) {
    response.status(500).json({
      message: "Internal Server error",
    });
    console.log(error);
    return;
  }
});

module.exports = router;
