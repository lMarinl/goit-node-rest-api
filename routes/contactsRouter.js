import express from "express"
import contactsControllers from "../controllers/contactsControllers.js"
import validateBody from "../helpers/validateBody.js"
import schemas from "../schemas/contactsSchemas.js"
import isValidId from "../middlewares/isValidId.js"

const contactsRouter = express.Router()

contactsRouter.get("/", contactsControllers.getAllContacts)

contactsRouter.get("/:id", isValidId, contactsControllers.getOneContact)

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteContact)

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  contactsControllers.createContact
)

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(schemas.updateContactSchema),
  contactsControllers.updateContact
)

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.favoriteSchema),
  contactsControllers.updateStatusContact
)
export default contactsRouter
