const Joi = require("joi");

const createArticleValidation = async (data) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(300).required(),
        caption: Joi.string().min(5).max(500).required(),
        content : Joi.string(),
        section : Joi.string(),
        topics : Joi.string(),
        description : Joi.string(),
        views : Joi.string(),
        writer : Joi.string(),
        publisher : Joi.string(),
        keywords : Joi.string(),
        imgUrl : Joi.string()
    });
    const validation_result = schema.validate(data);
    return validation_result;
}

const updateArticleValidation = async (data) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(300).required(),
        caption: Joi.string().min(5).max(500).required(),
        markdown : Joi.string(),
        section : Joi.string(),
        topics : Joi.string(),
        description : Joi.string(),
        views : Joi.string(),
        writer : Joi.string(),
        publisher : Joi.string(),
        keywords : Joi.string(),
});
    const validation_result = schema.validate(data);
    return validation_result;
}

module.exports = {
    createArticleValidation : createArticleValidation,
    updateArticleValidation : updateArticleValidation
}