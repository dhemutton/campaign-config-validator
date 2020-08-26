#!/usr/bin/env node
import yargsInteractive from "yargs-interactive";
import figlet from "figlet";
import chalk from 'chalk';
import { validateFeature, validatePolicy1 } from './implementations/validate';

const options: yargsInteractive.Option = {
  interactive: { default: true },
  type: {
    type: "list",
    describe: "Select config type:",
    choices: ["Feature", "Policy"]
  },
  name: {
    type: "input",
    describe: "Enter config name:",
  },
  filePath: {
    type: "input",
    describe: "Enter file path:",
  }
};
console.log(chalk.cyan(figlet.textSync("SupplyAlly Config Validator")));

yargsInteractive()
  .usage("$0 <command> [args]")
  .interactive(options)
  .then(result => {
    console.log(`\nResult is:\n` + `- Type: ${result.type}\n` + `- Name: ${result.name}\n` + `- File path: ${result.filePath}\n`);
    if (result.type == 'Feature') {
      console.log(chalk.bgMagenta("Validate feature"));
      validateFeature(result.name, result.filePath);
    } else if (result.type == 'Policy') {
      console.log(chalk.bgMagenta("Validate policy"));
      validatePolicy1(result.name, result.filePath);
    }
  });


// yargsInteractive()
//   .usage('$0 <cmd> [args]')
//   .command('validate [option]', 'Policy/Feature', (yargs) => {
//     yargs.option("policy", {
//       alias: "p",
//       conflicts: "feature",
//       interactive: { default: true },
//     })
//       .option("feature", {
//         alias: "f",
//         conflicts: "policy",
//         interactive: { default: true },
//       })
//   }, function (argv) {
//     console.log(chalk.cyan(figlet.textSync("SupplyAlly Config Validator")));
//     if (argv.policy) {
//       console.log(chalk.bgMagenta("Validate policy"));
//       let result = validatePolicy1(argv.policy);
//     } else if (argv.feature) {
//       console.log(chalk.bgMagenta("Validate feature"));
//       if (validateFeature(argv.feature)) {
//         console.log("Enter parameter name:");
//       }
//     }
//   })
//   .help()
//   .argv;
