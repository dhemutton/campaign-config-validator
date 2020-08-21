import Joi from 'joi';

const flowTypeInput = ["DEFAULT", "MERCHANT"];
const idTypeInput = ["STRING", "NUMBER"];
const scannerTypeInput = ["CODE_39", "QR"];
const validationTypeInput = ["NRIC", "REGEX"];

export const featureSchema = Joi.object({
    campaignName: Joi.string()
        .required(),
    minAppBuildVersion: Joi.number()
        .integer()
        .default(0)
        .min(0)
        .max(9999)
        .required(),
    minAppBinaryVersion: Joi.string()
        .default("3.0.0")
        .required(),
    flowType: Joi.string()
        .valid(...flowTypeInput)
        .default("DEFAULT")
        .required(),
    id: Joi.object({
        type: Joi.string()
            .valid(...idTypeInput)
            .required(),
        scannerType: Joi.string()
            .valid(...scannerTypeInput)
            .default("CODE_39")
            .required(),
        validation: Joi.string()
            .valid(...validationTypeInput)
            .required(),
        validationRegex: Joi.string()
            .required(),
    }).required(),
    transactionGrouping: Joi.boolean()
        .required()
})
