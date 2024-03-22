import jwt from "jsonwebtoken"
import HttpError from "../helpers/HttpError.js"
import services from "../services/authServices.js"
const { SECRET_KEY } = process.env

const authenticate = async (req, _, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return next(HttpError(401, "Not authorized"))
  }

  const [bearer, token] = authorization.split(" ")
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Bearer not found"))
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY)

    const user = await services.findUser({ _id: id })
    if (!user || !user.token) {
      return next(HttpError(401, "Not authorized"))
    }

    req.user = user
    next()
  } catch (error) {
    next(HttpError(401, error.message))
  }
}

export default authenticate
