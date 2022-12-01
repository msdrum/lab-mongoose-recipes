import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  },
  isChef: {
    type: Boolean,
    default: false,
  },
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

const UserModel = model("User", userSchema);

export default UserModel;
