import Joi from 'joi';

const textTypeInput = ["STRING", "PHONE_NUMBER"]
const scanButtonTypeInput = ["QR", "CODE_39"]
const periodTypeInput = ["CRON", "ROLLING"]
const policyTypeInput = ["PURCHASE", "REDEEM"]

export const policySchema = Joi.object({
    name: Joi.string()
        .required(),
    category: Joi.string()
        .required(),
    categoryType: Joi.string(),
    order: Joi.number()
        .integer()
        .default(0)
        .min(0)
        .max(9999)
        .required(),
    alert: Joi.object({
        threshold: Joi.number()
            .integer()
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
            }),
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
        periodExpression: [Joi.string().required(), Joi.number().required()],
        limit: Joi.number()
            .integer()
            .min(1)
            .max(9999)
            .required(),
        default: Joi.number()
            .integer()
            .min(1)
            .max(9999)
            .required(),
        checkoutLimit: Joi.number()
            .integer()
            .min(1)
            .max(9999),
    }),
    type: Joi.string()
        .valid(...policyTypeInput)
        .required(),
})
