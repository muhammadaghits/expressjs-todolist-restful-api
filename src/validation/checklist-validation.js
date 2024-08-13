import Joi from "joi";

const createChecklistValidation = Joi.object({
    name: Joi.string().max(100).required(),
});

const getChecklistValidation = Joi.number().positive().required();

const updateChecklistValidation = Joi.object({
    id: Joi.number().positive().required(),
    name: Joi.string().max(100).required()
});

const searchChecklistValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().optional()
})

export {
    createChecklistValidation,
    getChecklistValidation,
    updateChecklistValidation,
    searchChecklistValidation
}
