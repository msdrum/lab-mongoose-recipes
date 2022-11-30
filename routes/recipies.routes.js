import express from "express";
import RecipeModel from "../models/Recipe.model.js";

const recipeRoute = express.Router();

//ROTAS

//CREATE

recipeRoute.post("/create", async (req, res) => {
  try {
    const form = req.body;

    const newRecipe = await RecipeModel.create(form);

    return res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something got wrong when trying to create a new recipe." });
  }
});

export default recipeRoute;
