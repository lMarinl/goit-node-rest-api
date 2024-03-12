import { isValidObjectId } from "mongoose"
import HttpError from "../helpers/HttpError.js"

const isValidId = (req, _, next) => {
  const { _id } = req.params
  if (!isValidObjectId(_id)) {
    return next(HttpError(404, `${_id} is not a valid id`))
  }
  next()
}

export default isValidId
