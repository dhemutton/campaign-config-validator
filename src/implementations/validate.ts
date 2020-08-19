import { featureSchema } from '../schemas/feature';
import { policySchema as policySchema1 } from '../schemas/policy1';
import { policySchema as policySchema2 } from '../schemas/policy2';
import fs from 'fs'

export const validateFeature = (arg: any) => {
    const feature = JSON.parse(fs.readFileSync(arg, 'utf8'));
    let results = validate(feature, featureSchema);
}

export const validatePolicy1 = (arg: any) => {
    const policies = JSON.parse(fs.readFileSync(arg, 'utf8'));
    let count = 1;
    let valid = 0;
    policies.forEach((policy: any) => {
        console.log(`Validating ${count}/${policies.length}`)
        let results = validate(policy, policySchema1);
        if (results) {
            valid++;
        }
        count++;
    })
    if (valid == policies.length) {
        console.log("Successfully validated all policies!")
    }
}

export const validatePolicy2 = (arg: any) => {
    validate(arg, policySchema2)
}

const validate = (arg: any, schema: any): boolean => {
    console.log("Validating...")
    const { error, value } = schema.validate(arg);
    if (error) {
        console.log("Failure!")
        console.log(error.details)
        return false;
    } else {
        console.log("OK!")
        console.log("Valid: ", value)
        return true;
    }
};