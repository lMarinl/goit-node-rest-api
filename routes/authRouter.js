import express from "express"

import validateBody from "../helpers/validateBody.js"
import schemas from "../schemas/authSchema.js"
import authControllers from "../controllers/authControllers.js"
import authenticate from "../middlewares/authenticate.js"

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
authRouter.post("/logout", authenticate, authControllers.userLogout)

authRouter.get("/current", authenticate, authControllers.getCurrent)

export default authRouter
