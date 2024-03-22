import jwt from "jsonwebtoken"
import HttpError from "../helpers/HttpError.js"
import controllersWrapper from "../decorators/controllersWrapper.js"
import services from "../services/authServices.js"

const { SECRET_KEY } = process.env

const userRegistration = async (req, res) => {
  const { email } = req.body
  const user = await services.findUser({ email })
  if (user) {
    throw HttpError(409, `Email  ${email}  is already in use `)
  }
  const newUser = await services.registration(req.body)

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: "starter",
    },
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

  await services.updateUser({ _id: id }, { token })

  res.json({
    token: token,
    user: {
      email: email,
      subscription: "starter",
    },
  })
}

const userLogout = async (req, res) => {
  const { _id } = req.user
  await services.updateUser({ _id }, { token: null })

  res.status(204).json({ message: "Not authorized" })
}

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user

  res.json({ email, subscription })
}

export default {
  userRegistration: controllersWrapper(userRegistration),
  userLogin: controllersWrapper(userLogin),
  userLogout: controllersWrapper(userLogout),
  getCurrent: controllersWrapper(getCurrent),
}
