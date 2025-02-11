import { User } from "../models/user.model.js";
import { Meeting } from "../models/meeting.model.js";

import httpStatus from "http-status";
import bcrypt from "bcrypt";
import crypto from "crypto";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const isPassworCorrect = await bcrypt.compare(password, user.password);

    if (isPassworCorrect) {
      let token = crypto.randomBytes(20).toString("hex");
      user.token = token;

      await user.save();
      return res.status(httpStatus.OK).json({ token: token });
    }else{
      return res.status(httpStatus.UNAUTHORIZED).json({message: "Invalid username or password"});
    }
  } catch (error) {
    console.log("Error in login Controller: ", error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({ message: "All fields are reuired." });
  }
  if(password.length < 6){
    return res.status(400).json({ message: "Password must be at least 6 characters"});
  }
  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User already exists" });
    }

    const hashedPassword = (await bcrypt.hash(password, 10)).toString();

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(httpStatus.CREATED).json({ message: "User registered" });
  } catch (error) {
    console.log("Error in register controller: ", error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

const getUserHistory = async (req, res) => {
  const {token} = req.query;
  
  try {
    const user = await User.findOne({token: token});
    const meetings = await Meeting.find({user_id: user.username});
    res.json(meetings);
  } catch (error) {
    console.log(error);
    res.json({message: `Something went wrong: ${error}`});
  }
}

const addToHistory = async (req, res) => {
  const {token, meeting_code} = req.body;

  try {
    const user = await User.findOne({token: token});

    const newMeeting = new Meeting({
      user_id: user.username,
      meetingCode: meeting_code
    })

    await newMeeting.save();

    res.status(httpStatus.CREATED).json({message: "Added code to history"});
  } catch (error) {
    res.json({message: `Something went wrong ${error}`});
  }
}

export { login, register, getUserHistory, addToHistory };
