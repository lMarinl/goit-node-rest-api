import Contact from "../models/contact.js"

const listContacts = (filter = {}, query = {}) =>
  Contact.find(filter, undefined, query)

const getContactById = (filter) => Contact.findOne(filter)

const removeContact = (filter) => Contact.findByIdAndDelete(filter)

const addContact = (data) => Contact.create(data)

const updateContactById = (filter, data) =>
  Contact.findOneAndUpdate(filter, data, { new: true })

const updateFavorite = (filter, data) =>
  Contact.findOneAndUpdate(filter, data, { new: true })

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateFavorite,
}
