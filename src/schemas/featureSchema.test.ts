import { featureSchema } from './feature';
import { cloneDeep, omit } from "lodash";

describe("validateFeature", () => {
  let featureInput =
  {
    campaignName: "CDC Vouchers",
    minAppBuildVersion: 0,
    minAppBinaryVersion: "3.0.0",
    flowType: "DEFAULT",
    id: {
      type: "STRING",
      scannerType: "CODE_39",
      validation: "REGEX",
      validationRegex: "^[a-zA-Z0-9-_ ]+$"
    },
    transactionGrouping: true
  }
  it("should accept valid feature", async () => {
    const results = featureSchema.validate(featureInput);
    expect(results).toHaveProperty("value", featureInput);
  });

  describe("campaignName", () => {
    it("should be invalid without campaignName", async () => {
      const feature = { ...omit(cloneDeep(featureInput), "campaignName") };
      const results = featureSchema.validate(feature);
      expect(results).toHaveProperty("error.details",
        [{ "context": { "key": "campaignName", "label": "campaignName" }, "message": "\"campaignName\" is required", "path": ["campaignName"], "type": "any.required" }])
    });
  });

  describe("minAppBuildVersion", () => {
    it("should be invalid without minAppBuildVersion", async () => {
      const feature = { ...omit(cloneDeep(featureInput), "minAppBuildVersion") };
      const results = featureSchema.validate(feature);
      expect(results).toHaveProperty("error.details",
        [{ "context": { "key": "minAppBuildVersion", "label": "minAppBuildVersion" }, "message": "\"minAppBuildVersion\" is required", "path": ["minAppBuildVersion"], "type": "any.required" }])
    });

    it("should be invalid if negative", async () => {
      const feature = { ...cloneDeep(featureInput)};
      feature.minAppBuildVersion = -1;
      const results = featureSchema.validate(feature);
      expect(results).toHaveProperty("error.details",
        [{ "context": { "key": "minAppBuildVersion", "label": "minAppBuildVersion", "limit": 0, "value": -1 }, "message": "\"minAppBuildVersion\" must be greater than or equal to 0", "path": ["minAppBuildVersion"], "type": "number.min" }])
    });

  });

  describe("minAppBinaryVersion", () => {
    it("should be invalid without minAppBinaryVersion", async () => {
      const feature = { ...omit(cloneDeep(featureInput), "minAppBinaryVersion") };
      const results = featureSchema.validate(feature);
      expect(results).toHaveProperty("error.details",
        [{ "context": { "key": "minAppBinaryVersion", "label": "minAppBinaryVersion" }, "message": "\"minAppBinaryVersion\" is required", "path": ["minAppBinaryVersion"], "type": "any.required" }])
    });

    it("should be invalid if minAppBinaryVersion is negative", async () => {
      const feature = { ...omit(cloneDeep(featureInput), "minAppBinaryVersion") };
      const results = featureSchema.validate(feature);
      expect(results).toHaveProperty("error.details",
        [{ "context": { "key": "minAppBinaryVersion", "label": "minAppBinaryVersion" }, "message": "\"minAppBinaryVersion\" is required", "path": ["minAppBinaryVersion"], "type": "any.required" }])
    });
  });

  describe("flowType", () => {
    it("should be invalid without flowType", async () => {
      const feature = { ...omit(cloneDeep(featureInput), "flowType") };
      const results = featureSchema.validate(feature);
      expect(results).toHaveProperty("error.details",
        [{ "context": { "key": "flowType", "label": "flowType" }, "message": "\"flowType\" is required", "path": ["flowType"], "type": "any.required" }])
    });

    it("should be invalid if flowType is not DEFAULT/MERCHANT", async () => {
      const feature = { ...cloneDeep(featureInput)};
      feature.flowType = "test";
      const results = featureSchema.validate(feature);
      expect(results).toHaveProperty("error.details",
        [{ "context": { "key": "flowType", "label": "flowType", "valids": ["DEFAULT", "MERCHANT"], "value": "test" }, "message": "\"flowType\" must be one of [DEFAULT, MERCHANT]", "path": ["flowType"], "type": "any.only" }])
    });
  });

  describe("id", () => {
    it("should be invalid without id", async () => {
      const feature = { ...omit(cloneDeep(featureInput), "id") };
      const results = featureSchema.validate(feature);
      expect(results).toHaveProperty("error.details",
        [{ "context": { "key": "id", "label": "id" }, "message": "\"id\" is required", "path": ["id"], "type": "any.required" }])
    });

    describe("type", () => {
      it("should be invalid without type", async () => {
        const feature = { ...omit(cloneDeep(featureInput), "id.type") };
        const results = featureSchema.validate(feature);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "type", "label": "id.type" }, "message": "\"id.type\" is required", "path": ["id", "type"], "type": "any.required" }])
      });

      it("should be invalid if idType is not STRING/NUMBER", async () => {
        const feature = { ...cloneDeep(featureInput)};
        feature.id.type = "test";
        const results = featureSchema.validate(feature);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "type", "label": "id.type", "valids": ["STRING", "NUMBER"], "value": "test" }, "message": "\"id.type\" must be one of [STRING, NUMBER]", "path":["id", "type"], "type": "any.only" }])
      });
    });

    describe("scannerType", () => {
      it("should be invalid without scannerType", async () => {
        const feature = { ...omit(cloneDeep(featureInput), "id.scannerType") };
        const results = featureSchema.validate(feature);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "scannerType", "label": "id.scannerType" }, "message": "\"id.scannerType\" is required", "path": ["id", "scannerType"], "type": "any.required" }])
      });

      it("should be invalid if scannerType is not CODE_39/QR", async () => {
        const feature = { ...cloneDeep(featureInput)};
        feature.id.scannerType = "test";
        const results = featureSchema.validate(feature);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "scannerType", "label": "id.scannerType", "valids": ["CODE_39", "QR"], "value": "test" }, "message": "\"id.scannerType\" must be one of [CODE_39, QR]", "path":["id", "scannerType"], "type": "any.only" }])
      });
    });

    describe("validation", () => {
      it("should be invalid without validation", async () => {
        const feature = { ...omit(cloneDeep(featureInput), "id.validation") };
        const results = featureSchema.validate(feature);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "validation", "label": "id.validation" }, "message": "\"id.validation\" is required", "path": ["id", "validation"], "type": "any.required" }])
      });

      it("should be invalid if validationTypeInput is not NRIC/REGEX", async () => {
        const feature = { ...cloneDeep(featureInput)};
        feature.id.validation = "test";
        const results = featureSchema.validate(feature);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "validation", "label": "id.validation", "valids": ["NRIC", "REGEX"], "value": "test" }, "message": "\"id.validation\" must be one of [NRIC, REGEX]", "path":["id", "validation"], "type": "any.only" }])
      });
    });

    describe("validationRegex", () => {
      it("should be invalid without validationRegex if validation is REGEX", async () => {
        const feature = { ...omit(cloneDeep(featureInput), "id.validationRegex") };
        const results = featureSchema.validate(feature);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "validationRegex", "label": "id.validationRegex" }, "message": "\"id.validationRegex\" is required", "path": ["id", "validationRegex"], "type": "any.required" }])
      });

      it("should be valid without validationRegex if validation is not REGEX", async () => {
        const feature = { ...omit(cloneDeep(featureInput), "id.validationRegex") };
        feature.id.validation = "NRIC";
        const results = featureSchema.validate(feature);
        expect(results).toHaveProperty("value", feature);
      });
    });
  });

  describe("transactionGrouping", () => {
    it("should be invalid without transactionGrouping", async () => {
      const feature = { ...omit(cloneDeep(featureInput), "transactionGrouping") };
      const results = featureSchema.validate(feature);
      expect(results).toHaveProperty("error.details",
        [{ "context": { "key": "transactionGrouping", "label": "transactionGrouping" }, "message": "\"transactionGrouping\" is required", "path": ["transactionGrouping"], "type": "any.required" }])
    });
  });
});
