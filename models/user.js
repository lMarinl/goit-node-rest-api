import { Schema, model } from "mongoose"

import hooks from "./hooks.js"
import { emailRegexp } from "../constants/userConstants.js"

const UserSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    match: emailRegexp,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
},{versionKey: false})

UserSchema.post("save", hooks.handleSaveError)

UserSchema.pre("findOneAndUpdate", hooks.setUpdateSettings)
UserSchema.post("findOneAndUpdate", hooks.handleSaveError)

const User = model("user", UserSchema)
export default User
