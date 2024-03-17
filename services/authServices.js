import bcrypt from "bcrypt"

import User from "../models/user.js"

const registration = async (data) => {
  const { password } = data
  const hashPassword = await bcrypt.hash(password, 10)
  return User.create({ ...data, password: hashPassword })
}

const findUser = (filter) => User.findOne(filter)

const validatePassword = (password, hashPassword) =>
  bcrypt.compare(password, hashPassword)

const updateUser = (filter, data) => User.findOneAndUpdate(filter, data)

export default {
  registration,
  findUser,
  validatePassword,
  updateUser,
}
