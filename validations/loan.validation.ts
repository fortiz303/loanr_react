import joi from "joi";

export const createRequest = {
  body: joi.object().keys({
    description: joi.string().trim().required(),
    amount: joi.string().trim().required(),
    date: joi.date().required(),
    collateral: joi.string().trim().required(),
  }),
};

export const getLoanById = {
  params: joi.object().keys({
    id: joi.string().trim().required(),
  }),
};
