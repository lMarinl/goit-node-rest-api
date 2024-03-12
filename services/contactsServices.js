import fs from "fs/promises"
import path from "path"
import { nanoid } from "nanoid"
import Contact from "../models/contact.js"

const contactsPath = path.resolve("db", "contacts.json")

const listContacts = () => Contact.find()

const getContactById = (_id) => Contact.findById(_id)

const removeContact = (_id) => Contact.findByIdAndDelete(_id)

const addContact = (data) => Contact.create(data)

const updateContactById = (_id, data) => Contact.findByIdAndUpdate(_id, data)

const updateFavorite = (_id, data) =>
  Contact.findByIdAndUpdate(_id, data, {
    new: true,
  })

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateFavorite,
}
