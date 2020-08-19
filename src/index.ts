#!/usr/bin/env node
import yargs from "yargs";
import figlet from "figlet";
import chalk from 'chalk';
import { validateFeature, validatePolicy1 } from './implementations/validate';

yargs
  .usage('$0 <cmd> [args]')
  .command('validate [option]', 'Policy/Feature', (yargs) => {
    yargs.option("policy", {
      alias: "p",
      conflicts: "feature",
    })
      .option("feature", {
        alias: "f",
        conflicts: "policy",
      })
  }, function (argv) {
    console.log(chalk.cyan(figlet.textSync("SupplyAlly Config Validator")));
    if (argv.policy) {
      console.log(chalk.bgMagenta("Validate policy"));
      validatePolicy1(argv.policy);
    } else if (argv.feature) {
      console.log(chalk.bgMagenta("Validate feature"));
      validateFeature(argv.feature);
    }
  })
  .help()
  .argv;
