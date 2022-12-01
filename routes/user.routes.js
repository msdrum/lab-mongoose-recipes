import express from "express";
import UserModel from "../models/User.model.js";

const userRoute = express.Router();

//ROUTES

//CREAT USER AND SHOW JUST THE USERNAME
userRoute.post("/create", async (req, res) => {
  try {
    const form = req.body;

    const newUser = await UserModel.create(form);

    return res.status(201).json(newUser.username);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//EXPORTANDO
export default userRoute;
