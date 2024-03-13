const handleSaveError = (error, data, next) => {
  error.status = 400
  next()
}

const setUpdateSettings = function (next) {
  this.getOptions.new = true
  this.getOptions.runValidators = true
  next()
}

export default { handleSaveError, setUpdateSettings }
