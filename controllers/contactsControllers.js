import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} from "../services/contactsServices.js"
import HttpError from "../helpers/HttpError.js"

import controllersWrapper from "../decorators/controllersWrapper.js"

const getAllContacts = async (_, res) => {
  const allContacts = await listContacts()
  res.json(allContacts)
}

const getOneContact = async (req, res) => {
  const { id } = req.params
  const contactById = await getContactById(id)

  if (!contactById) {
    throw HttpError(404, `Movie with id=${id} not found`)
  }

  res.json(contactById)
}

const createContact = async (req, res) => {
  const newContact = await addContact(req.body)
  res.status(201).json(newContact)
}

const updateContact = async (req, res) => {
  const { id } = req.params
  const result = await updateContactById(id, req.body)

  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`)
  }

  res.json(result)
}

const deleteContact = async (req, res) => {
  const { id } = req.params
  const result = await removeContact(id)

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
  deleteContact: controllersWrapper(deleteContact),
}
