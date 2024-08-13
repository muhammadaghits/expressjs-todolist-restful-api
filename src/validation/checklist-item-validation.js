import Joi from "joi";

const createChecklistItemValidation = Joi.object({
    itemName: Joi.string().max(100).required(),
    isDone: Joi.boolean().required()
});

const updateChecklistItemValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
    itemName: Joi.string().max(100).optional(),
    isDone: Joi.boolean().required()
});

const getChecklistItemValidation = Joi.number().min(1).positive().required();

export {
    createChecklistItemValidation,
    getChecklistItemValidation,
    updateChecklistItemValidation
}
