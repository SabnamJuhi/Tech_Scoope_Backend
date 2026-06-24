const Joi = require("joi");

exports.createWorkspaceSchema =
  Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
  });