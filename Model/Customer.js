import mongoose from "mongoose";
import Joi from "joi";

const customerSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  isGold: { type: Boolean, default: false },
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().required(),
    isGold: Joi.boolean().required(),
  });

  return schema.validate(customer);
}

export { Customer, validateCustomer as validate };
