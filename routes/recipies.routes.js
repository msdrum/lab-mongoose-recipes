import express from "express";
import RecipeModel from "../models/Recipe.model.js";

const recipeRoute = express.Router();

//ROTAS

//CREATE

recipeRoute.post("/create", async (req, res) => {
  try {
    const form = req.body;

    const newRecipe = await RecipeModel.create(form);

    console.log(newRecipe.title);

    return res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something got wrong when trying to create a new recipe." });
  }
});

//GET JUST TITLES

recipeRoute.get("/all-recipies-title", async (req, res) => {
  try {
    const recipies = await RecipeModel.find({}, { title: 1 });

    return res.status(200).json(recipies);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

export default recipeRoute;
