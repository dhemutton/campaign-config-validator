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
      validation: "NRIC",
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
  });

  describe("minAppBinaryVersion", () => {
    it("should be invalid without minAppBinaryVersion", async () => {
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
          [{ "context": { "key": "type", "label": "id.type" }, "message": "\"id.type\" is required", "path": ["id","type"], "type": "any.required" }])
      });
    });

    describe("scannerType", () => {
      it("should be invalid without scannerType", async () => {
        const feature = { ...omit(cloneDeep(featureInput), "id.scannerType") };
        const results = featureSchema.validate(feature);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "scannerType", "label": "id.scannerType" }, "message": "\"id.scannerType\" is required", "path": ["id","scannerType"], "type": "any.required" }])
      });
    });

    describe("validation", () => {
      it("should be invalid without validation", async () => {
        const feature = { ...omit(cloneDeep(featureInput), "id.validation") };
        const results = featureSchema.validate(feature);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "validation", "label": "id.validation" }, "message": "\"id.validation\" is required", "path": ["id","validation"], "type": "any.required" }])
      });
    });

    describe("validationRegex", () => {
      it("should be invalid without validationRegex", async () => {
        const feature = { ...omit(cloneDeep(featureInput), "id.validationRegex") };
        const results = featureSchema.validate(feature);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "validationRegex", "label": "id.validationRegex" }, "message": "\"id.validationRegex\" is required", "path": ["id","validationRegex"], "type": "any.required" }])
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
