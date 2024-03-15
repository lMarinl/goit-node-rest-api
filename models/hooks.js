const handleSaveError = (error, data, next) => {
  let { name, code } = error
  error.status = (name = "MongoServerError" && code === 11000) ? 409 : 400
  next()
}

const setUpdateSettings = function (next) {
  this.getOptions.new = true
  this.getOptions.runValidators = true
  next()
}

export default { handleSaveError, setUpdateSettings }
