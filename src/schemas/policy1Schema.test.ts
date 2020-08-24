import { policySchema } from './policy1';
import { cloneDeep, omit } from "lodash";

describe("validatePolicy", () => {
  let policyInput =
  {
    "category": "tt-token",
    "name": "TT Token",
    "order": 1,
    "identifiers": [
      {
        "label": "Device code",
        "uniqueColName": "device-code",
        "validationRegex": "^[A-F0-9]{12}$",
        "textInput": {
          "disabled": true,
          "visible": true,
          "type": "STRING"
        },
        "scanButton": {
          "disabled": false,
          "visible": true,
          "type": "QR"
        }
      },
      {
        "label": "Contact number",
        "textInput": {
          "disabled": false,
          "visible": true,
          "type": "PHONE_NUMBER"
        },
        "scanButton": {
          "disabled": true,
          "visible": false
        }
      }
    ],
    "quantity": {
      "period": -1,
      "periodType": "CRON",
      "periodExpression": "*/5 * * * *",
      "limit": 1,
      "default": 1
    },
    "type": "REDEEM"
  }
  it("should accept valid policy", async () => {
    const results = policySchema.validate(policyInput);
    expect(results).toHaveProperty("value", policyInput);
  });

  describe("name", () => {
    it("should be invalid without name", async () => {
      const policy = { ...omit(cloneDeep(policyInput), "name") };
      const results = policySchema.validate(policy);
      expect(results).toHaveProperty("error.details",
        [{ "context": { "key": "name", "label": "name" }, "message": "\"name\" is required", "path": ["name"], "type": "any.required" }])
    });
  });

  describe("category", () => {
    it("should be invalid without category", async () => {
      const policy = { ...omit(cloneDeep(policyInput), "category") };
      const results = policySchema.validate(policy);
      expect(results).toHaveProperty("error.details",
        [{ "context": { "key": "category", "label": "category" }, "message": "\"category\" is required", "path": ["category"], "type": "any.required" }])
    });
  });

  describe("categoryType", () => {
    it("should be valid without categoryType", async () => {
      const policy = { ...cloneDeep(policyInput) };
      const results = policySchema.validate(policy);
      expect(results).toHaveProperty("value", policy);
    });
  });

  describe("order", () => {
    it("should be invalid without order", async () => {
      const policy = { ...omit(cloneDeep(policyInput), "order") };
      const results = policySchema.validate(policy);
      expect(results).toHaveProperty("error.details",
        [{ "context": { "key": "order", "label": "order" }, "message": "\"order\" is required", "path": ["order"], "type": "any.required" }])
    });

    it("should be invalid if 0", async () => {
      const policy = { ...cloneDeep(policyInput) };
      policy.order = 0;
      const results = policySchema.validate(policy);
      expect(results).toHaveProperty("error.details",
        [{ "context": { "key": "order", "label": "order", "limit": 1, "value": 0 }, "message": "\"order\" must be greater than or equal to 1", "path": ["order"], "type": "number.min" }])
    });

    it("should be invalid if negative", async () => {
      const policy = { ...cloneDeep(policyInput) };
      policy.order = -1;
      const results = policySchema.validate(policy);
      expect(results).toHaveProperty("error.details",
        [{ "context": { "key": "order", "label": "order", "limit": 1, "value": -1 }, "message": "\"order\" must be greater than or equal to 1", "path": ["order"], "type": "number.min" }])
    });
  });

  describe("alert", () => {
    it("should be valid without alert", async () => {
      const policy = { ...cloneDeep(policyInput) };
      const results = policySchema.validate(policy);
      expect(results).toHaveProperty("value", policy);
    });

    describe("threshold", () => {
      it("should be invalid if 0", async () => {
        const policy = { ...cloneDeep(policyInput), alert: { threshold: 0, label: "*chargeable" } };
        const results = policySchema.validate(policy);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "threshold", "label": "alert.threshold", "limit": 1, "value": 0 }, "message": "\"alert.threshold\" must be greater than or equal to 1", "path": ["alert", "threshold"], "type": "number.min" }])
      });

      it("should be invalid if negative", async () => {
        const policy = { ...cloneDeep(policyInput), alert: { threshold: -1, label: "*chargeable" } };
        const results = policySchema.validate(policy);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "threshold", "label": "alert.threshold", "limit": 1, "value": -1 }, "message": "\"alert.threshold\" must be greater than or equal to 1", "path": ["alert", "threshold"], "type": "number.min" }])
      });
    });

    describe("label", () => {
      it("should be invalid without label", async () => {
        const policy = { ...cloneDeep(policyInput), alert: { threshold: 1 } };
        const results = policySchema.validate(policy);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "label", "label": "alert.label" }, "message": "\"alert.label\" is required", "path": ["alert", "label"], "type": "any.required" }])
      });
    });
  });

});
