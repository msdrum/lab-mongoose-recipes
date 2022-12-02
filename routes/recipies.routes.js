import express from "express";
import RecipeModel from "../models/Recipe.model.js";
import UserModel from "../models/User.model.js";

const recipeRoute = express.Router();

//ROTAS

//CREATE A NEW RECIPE AND PUT ON USER RECIPE FIELD
recipeRoute.post("/create/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    //Creating the new recipe in the recipe collection and connecting with userId
    const newRecipe = await RecipeModel.create({ ...req.body, user: userId });

    //Put the new recipe in the user recipe field
    const userUpdated = await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: {
          recipes: newRecipe._id,
        },
      },
      { new: true, runValidators: true }
    );

    return res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});

//CREATE A RECIPIE

recipeRoute.post("/create", async (req, res) => {
  try {
    const form = req.body;

    const newRecipe = await RecipeModel.create(form);

    // console.log(newRecipe.title);

    return res.status(201).json(newRecipe.title);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something got wrong when trying to create a new recipe." });
  }
});

//CREATE MANY RECIPIES

recipeRoute.post("/create-many-recipies", async (req, res) => {
  try {
    const newRecipies = await RecipeModel.insertMany([...req.body]);

    return res.status(201).json(newRecipies);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//EDIT ONE RECIPE

recipeRoute.put("/one-recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const selectedRecipe = await RecipeModel.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(selectedRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//DELETE ONE
recipeRoute.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const delectedRecipe = await RecipeModel.deleteOne(
      { _id: id },
      { new: true, runValidators: true }
    );
    return res.status(200).json(delectedRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//GET ALL RECIPIES

recipeRoute.get("/all-recipies", async (req, res) => {
  try {
    const recipies = await RecipeModel.find({});

    return res.status(200).json(recipies);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
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
