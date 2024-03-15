import jwt from "jsonwebtoken"
import HttpError from "../helpers/HttpError.js"
import controllersWrapper from "../decorators/controllersWrapper.js"
import services from "../services/authServices.js"

const { SECRET_KEY } = process.env

// const decodeToken = jwt.decode(token)

// try {
//   const { _id } = jwt.verify(token, SECRET_KEY)
// } catch (error) {}

const userRegistration = async (req, res) => {
  const { email } = req.body
  const user = await services.findUser({ email })
  if (user) {
    throw HttpError(409, `Email  ${email}  is already in use `)
  }
  const newUser = await services.registration(req.body)

  res.status(201).json({
    email: newUser.email,
    subscription: "starter",
  })
}

const userLogin = async (req, res) => {
  const { email, password } = req.body

  const user = await services.findUser({ email })

  if (!user) {
    throw HttpError(401, "Email or password is wrong")
  }

  const comparePassword = await services.validatePassword(
    password,
    user.password
  )

  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong")
  }

  const { _id: id } = user
  const payload = { id }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" })

  res.json({ token })
}

export default {
  userRegistration: controllersWrapper(userRegistration),
  userLogin: controllersWrapper(userLogin),
}
