import { featureSchema } from "./feature";
import { validate } from "../implementations/validate";

describe("validateFeature", () => {
  let feature =
  {
    campaignName: "CDC Vouchers",
    minAppBuildVersion: 0,
    minAppBinaryVersion: "3.0.0",
    flowType: "DEFAULT",
    id: {
      type: "STRING",
      scannerType: "CODE_39",
      validation: "NRIC",
      validationRegex: "^[a-zA-Z0-9-_ ]+$"
    },
    transactionGrouping: true
  }

  beforeAll(() => {
  });
});
