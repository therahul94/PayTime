const { createHashpassword, verifyPassword } = require("../hashpassword");
const {
  userValidation,
  userSigninValidation,
  updateUserValidation,
  searching,
} = require("../inputValidation");
const { usermodel } = require("../model/user");
const { accountModel } = require("../model/account");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  // input validation
  const result = userValidation(req.body);
  if (!result.success) {
    const errorArr = result.error.issues?.map((val) => {
      return { message: val.message };
    });
    return res.status(411).json({ message: errorArr });
  }

  // if username already exist
  const userAvail = await usermodel.findOne({ username: result.data.username });
  if (userAvail) {
    return res.status(411).json({ message: "Username available!" });
  }

  // hash password
  const hashedpwd = await createHashpassword(result.data.password);
  const createNewUser = await usermodel.create({
    firstName: result.data.firstName,
    lastName: result.data.lastName,
    username: result.data.username,
    password: hashedpwd,
  });

  const jwttoken = jwt.sign({ userId: createNewUser._id }, JWT_SECRET);
  if (createNewUser) {
    const amount = Math.ceil(Math.random()*100000) * 100;
    const createAccount = await accountModel.create({
      userId: createNewUser._id,
      balance: amount,
    });
    if (!createAccount) {
      return res
        .status(400)
        .json({ message: "Something went wrong! Please signup again!" });
    }
    return res
      .status(201)
      .json({ message: "Sign up successful", token: jwttoken });
  }
};

const signin = async (req, res) => {
  try {
    // input validation
    const result = userSigninValidation(req.body);
    if (!result.success) {
      const errorArr = result.error.issues?.map((val) => {
        return { message: val.message };
      });
      return res.status(411).json({ message: errorArr });
    }

    const findUser = await usermodel.findOne({
      username: result.data.username,
    });
    if (!findUser) {
      return res
        .status(411)
        .json({ message: "Username not available! Please signup" });
    }

    // password validation
    const isVerified = await verifyPassword(
      findUser.password,
      result.data.password
    );
    if (!isVerified) {
      return res
        .status(411)
        .json({ message: "Access Denied! Invalid password" });
    }

    //generate Token
    const token = jwt.sign({ userId: findUser._id }, JWT_SECRET);
    if (!token) {
      return res.status(411).json({ message: "Error while logging in" });
    }
    return res.status(200).json({ token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server is not responding!" });
  }
};

const updateUser = async (req, res) => {
  try {
    // input validation
    const result = updateUserValidation(req.body);
    if (!result.success) {
      const errorArr = result.error.issues?.map((val) => {
        message: val.message;
      });
      return res.status(411).json({ message: errorArr });
    }

    const userDetails = await usermodel.findOne({ _id: req.userId });

    if (!userDetails) {
      return res
        .status(400)
        .json({ message: "Invalid Token or the user is not available" });
    }

    let obj = {};
    if (result.data?.firstName) {
      obj.firstName = result.data.firstName;
    }
    if (result.data?.lastName) {
      obj.lastName = result.data.lastName;
    }
    if (result.data?.password) {
      const hashedpwd = await createHashpassword(result.data.password);
      obj.password = hashedpwd;
    }

    console.log("obj", obj);

    const updatedUser = await usermodel.updateOne(
      { _id: req.userId },
      {
        $set: obj,
      }
    );

    if (updatedUser.acknowledged && updatedUser.modifiedCount >= 1) {
      return res.status(200).json({ message: "updated successfully..." });
    } else if (!updateUser.acknowledged) {
      return res.status(400).json({ message: "User is not updated!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server is not responding!" });
  }
};

const searchUser = async (req, res) => {
  const filter = req.query.filter || "";
  const result = searching(filter);
  if (!result.success) {
    const errorArr = result.error.issues?.map((val) => {
      message: val.message;
    });
    return res.status(411).json({ message: errorArr });
  }
  const filteredUser = await usermodel.find({
    $or: [
      { firstName: { $regex: result.data, $options: "i" } },
      { lastName: { $regex: result.data, $options: "i" } },
    ],
  });
  if (filteredUser.length) {
    return res.status(200).json({
      users: filteredUser.map((user) => {
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          _id: user._id,
        };
      }),
    });
  }
  return res.status(400).json({ message: "User is not available!" });
};

module.exports = { signup, signin, updateUser, searchUser };
