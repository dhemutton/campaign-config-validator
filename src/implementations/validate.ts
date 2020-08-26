import { featureSchema } from '../schemas/feature';
import { policySchema as policySchema1 } from '../schemas/policy1';
import { policySchema as policySchema2 } from '../schemas/policy2';
import fs from 'fs';
import chalk from 'chalk';
import { putParameter } from '../services/putParameter'

export const validateFeature = (name: string, arg: any) => {
    const feature = JSON.parse(fs.readFileSync(arg, 'utf8'));
    let results = validate(feature, featureSchema);
    if (results) {
        console.log(chalk.green("Successfully validated feature!"));
        putParameter(name, JSON.stringify(feature)).then(() => {
            console.log("Successfully sent to AWS Param Store!");
        }).catch(error => {
            console.log(`Error sending to AWS Param Store: ${error}`);
        })
    } else {
        console.log(chalk.red("Fix errors above before validating again!"));
    }
}

export const validatePolicy1 = (name: string, arg: any) => {
    const policies = JSON.parse(fs.readFileSync(arg, 'utf8'));
    let count = 1;
    let valid = 0;
    policies.forEach((policy: any) => {
        console.log(`Validating ${count}/${policies.length}`);
        let results = validate(policy, policySchema1);
        if (results) {
            valid++;
        }
        count++;
    });
    if (valid == policies.length) {
        console.log(chalk.green("Successfully validated all policies!"));
        putParameter(name, JSON.stringify(policies)).then(() => {
            console.log("Successfully sent to AWS Param Store!");
        }).catch(error => {
            console.log(`Error sending to AWS Param Store: ${error}`);
        })
    } else {
        console.log(chalk.red("Fix errors above before validating again!"));
    }
}

export const validatePolicy2 = (arg: any) => {
    validate(arg, policySchema2);
}

export const validate = (arg: any, schema: any): boolean => {
    console.log("Validating...");
    const { error, value } = schema.validate(arg);
    if (error) {
        console.log(chalk.red("Failure!"));
        console.log(error.details);
        return false;
    } else {
        console.log("OK!");
        return true;
    }
};