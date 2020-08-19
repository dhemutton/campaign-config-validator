import Joi from 'joi';

const periodTypeInput = ["ROLLING", "FIXED"];
const unitTypeInput = ["PREFIX", "NUMBER"];
const policyTypeInput = ["PURCHASE", "REDEEM"];
const validationTypeInput = ["NRIC", "REGEX"];
const fieldTypeInput = ["CODE_39", "QR", "NULL"];

export const policySchema = Joi.object({
    name: Joi.string()
        .required(),
    category: Joi.string()
        .required(),
    description: Joi.string()
        .required(),
    order: Joi.number()
        .integer()
        .default(0)
        .min(0)
        .max(9999)
        .required(),
    quantity: Joi.object({
        period: Joi.object({
            type: Joi.string()
                .valid(...periodTypeInput)
                .required(),
            cronExpression: Joi.string()
                .required()
        }),
        limit: Joi.number()
            .integer()
            .default(0)
            .min(0)
            .max(9999)
            .required(),
        default: Joi.number()
            .integer()
            .default(0)
            .min(0)
            .max(9999)
            .required(),
        step: Joi.number()
            .integer()
            .default(0)
            .min(0)
            .max(9999)
            .required(),
        unit: Joi.object({
            type: Joi.string()
                .valid(...unitTypeInput)
                .required(),
            label: Joi.string()
                .required()
        }),
    }),
    image: Joi.string()
        .required(),
    type: Joi.string()
        .valid(...policyTypeInput)
        .required(),
    fields: Joi.array().items(
        Joi.object({
            label: Joi.string()
                .required(),
            validation: Joi.string()
                .valid(...validationTypeInput)
                .required(),
            validationRegex: Joi.string()
                .required(),
            input: Joi.object({
                type: Joi.string()
                    .valid(...fieldTypeInput)
                    .required(),
                visible: Joi.boolean()
                    .required(),
                disabled: Joi.boolean()
                    .required(),
            }),
            scanButton: Joi.object({
                type: Joi.string()
                    .valid(...fieldTypeInput)
                    .required(),
                visible: Joi.boolean()
                    .required(),
                disabled: Joi.boolean()
                    .required(),
                text: Joi.string()
            }),

        })
    )
})
