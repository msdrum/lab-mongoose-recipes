import express from "express";
import UserModel from "../models/User.model.js";
import RecipeModel from "../models/Recipe.model.js";

const userRoute = express.Router();

//ROUTES

//CREAT A NEW USER
userRoute.post("/create", async (req, res) => {
  try {
    const form = req.body;

    const newUser = await UserModel.create(form);

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

// GET BY ID
userRoute.get("/read/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId).populate("recipes");

    if (!user) {
      return res.status(400).json({ msg: " User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//EXPORTANDO
export default userRoute;
