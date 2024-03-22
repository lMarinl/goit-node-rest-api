import { Schema, model } from "mongoose"
import hooks from "./hooks.js"

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
)

ContactSchema.post("save", hooks.handleSaveError)

ContactSchema.pre("findOneAndUpdate", hooks.setUpdateSettings)
ContactSchema.post("findOneAndUpdate", hooks.handleSaveError)

const Contact = model("contact", ContactSchema)

export default Contact
