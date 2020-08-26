import Joi from 'joi';

const textTypeInput = ["STRING", "PHONE_NUMBER"];
const scanButtonTypeInput = ["QR", "CODE_39"];
const periodTypeInput = ["CRON", "ROLLING"];
const policyTypeInput = ["PURCHASE", "REDEEM"];
const unitTypeInput = ["PREFIX", "POSTFIX"];

export const policySchema = Joi.object({
    name: Joi.string()
        .required(),
    category: Joi.string()
        .required(),
    categoryType: Joi.string(),
    image: Joi.string(),
    unit: Joi.string()
        .valid(...unitTypeInput),
    order: Joi.number()
        .integer()
        .default(1)
        .min(1)
        .max(9999)
        .required(),
    alert: Joi.object({
        threshold: Joi.number()
            .integer()
            .min(1)
            .max(9999)
            .required(),
        label: Joi.string()
            .required(),
    }),
    identifiers: Joi.array().items(
        Joi.object({
            label: Joi.string()
                .required(),
            uniqueColName: Joi.string(),
            validationRegex: Joi.string(),
            textInput: Joi.object({
                type: Joi.string()
                    .valid(...textTypeInput)
                    .required(),
                visible: Joi.boolean()
                    .required(),
                disabled: Joi.boolean()
                    .required(),
            }).required(),
            scanButton: Joi.object({
                type: Joi.string()
                    .valid(...scanButtonTypeInput),
                visible: Joi.boolean()
                    .required(),
                disabled: Joi.boolean()
                    .required(),
            }),
        })
    ),
    quantity: Joi.object({
        period: Joi.number()
            .integer()
            .required(),
        periodType: Joi.string()
            .valid(...periodTypeInput)
            .required(),
        periodExpression: Joi.alternatives(Joi.string(), Joi.number()).required(),
        limit: Joi.number()
            .integer()
            .min(1)
            .max(9999)
            .required(),
        default: Joi.number()
            .integer()
            .min(1)
            .max(9999),
        step: Joi.number()
            .integer()
            .min(1)
            .max(9999),
        checkoutLimit: Joi.number()
            .integer()
            .min(1)
            .max(9999),
    }).required(),
    type: Joi.string()
        .valid(...policyTypeInput)
        .required(),
})
