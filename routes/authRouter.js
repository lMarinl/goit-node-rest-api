import express from "express"

import validateBody from "../helpers/validateBody.js"
import schemas from "../schemas/authSchema.js"
import authControllers from "../controllers/authControllers.js"

const authRouter = express.Router()

authRouter.post(
  "/register",
  validateBody(schemas.userSignupSchema),
  authControllers.userRegistration
)

authRouter.post(
  "/login",
  validateBody(schemas.userSignInSchema),
  authControllers.userLogin
)

export default authRouter
