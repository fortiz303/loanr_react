import joi from "joi";
export const login = {
  body: joi.object().keys({
    email: joi.string().email().lowercase().trim().required(),
    password: joi.string().trim().required(),
  }),
};

export const register = {
  body: joi.object().keys({
    name: joi.string().trim().required(),
    email: joi.string().email().required(),
    username: joi.string().trim().required(),
    password: joi.string().trim().required(),
    id_type: joi.string().trim().required(),
    country: joi.string().optional(),
    number: joi.string().required(),
    expiry: joi.date().optional(),
  }),
};
  