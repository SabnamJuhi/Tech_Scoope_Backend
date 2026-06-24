const Joi = require("joi");

exports.createWidgetSchema =
  Joi.object({
    dashboardId:
      Joi.string().required(),

    type:
      Joi.string().required(),

    title:
      Joi.string().required(),

    config:
      Joi.object().required(),
  });