#!/usr/bin/env node
import yargs from "yargs";
import { validateFeature, validatePolicy1 } from './implementations/validate'

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
    if (argv.policy) {
      console.log("Validate policy")
      validatePolicy1(argv.policy);
    } else if (argv.feature) {
      console.log("Validate feature")
      validateFeature(argv.feature);
    }
  })
  .help()
  .argv;
