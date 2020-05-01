import Joi from '@hapi/joi';

const requestBodyVlidation = {
    validateRegister: (req, res, next) => {
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
            phone: Joi.number().required(),
            name: Joi.string().required(),
        });
        const value = schema.validate(req.body, { abortEarly: false });
        if(value.error) {
            return res.status(401).json({"status": false, "error": value.error.message});
        }
        next();
    }
}

export default requestBodyVlidation;