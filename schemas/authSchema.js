import Joi from "joi"

import { emailRegexp } from "../constants/userConstants.js"

const userSignupSchema = Joi.object({
  userName: Joi.string(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(3).required(),
})

const userSignInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(3).required(),
})

export default {
  userSignupSchema,
  userSignInSchema,
}
