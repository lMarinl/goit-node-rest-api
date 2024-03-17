import contactsServices from "../services/contactsServices.js"
import HttpError from "../helpers/HttpError.js"
import controllersWrapper from "../decorators/controllersWrapper.js"

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user
  const { page = 1, limit = 10 } = req.query
  const skip = (page - 1) * limit
  const allContacts = await contactsServices.listContacts(
    { owner },
    { skip, limit }
  )

  res.json(allContacts)
}

const getOneContact = async (req, res) => {
  const { id } = req.params
  const { _id: owner } = req.user
  const contactById = await contactsServices.getContactById({ _id: id, owner })

  if (!contactById) {
    throw HttpError(404, `Contact with id=${id} not found`)
  }

  res.json(contactById)
}

const createContact = async (req, res) => {
  const { _id: owner } = req.user
  const newContact = await contactsServices.addContact({ ...req.body, owner })

  res.status(201).json(newContact)
}

const updateContact = async (req, res) => {
  const { id } = req.params
  const { _id: owner } = req.user

  if (!req.body || Object.keys(req.body).length === 0) {
    throw HttpError(400, "Body must have at least one field")
  }

  const result = await contactsServices.updateContactById(
    { _id: id, owner },
    req.body
  )

  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`)
  }
  res.json(result)
}

const updateStatusContact = async (req, res) => {
  const { id } = req.params
  const { favorite } = req.body

  if (!req.body || Object.keys(req.body).length === 0) {
    throw HttpError(400, "The body must have a field - favorite")
  }

  const result = await contactsServices.updateFavorite(id, favorite)

  if (!result) {
    throw HttpError(404, "Not found")
  }

  res.json(result)
}

const deleteContact = async (req, res) => {
  const { id } = req.params
  const { _id: owner } = req.user
  const result = await contactsServices.removeContact({ _id: id, owner })

  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`)
  }

  res.status(200).json(result)
}

export default {
  getAllContacts: controllersWrapper(getAllContacts),
  getOneContact: controllersWrapper(getOneContact),
  createContact: controllersWrapper(createContact),
  updateContact: controllersWrapper(updateContact),
  updateStatusContact: controllersWrapper(updateStatusContact),
  deleteContact: controllersWrapper(deleteContact),
}
