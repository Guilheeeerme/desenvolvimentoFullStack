import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Criando modelo/Schema
// prettier-ignore
const accountSchema = new Schema({
  _id:     { type: ObjectId },
  agencia: { type: Number, required: true },
  conta:   { type: Number, required: true },
  name:    { type: String, required: true },
  balance: { type: Number, min: 0 },
});

const accountModel = mongoose.model("accounts", accountSchema);
export { accountModel };
