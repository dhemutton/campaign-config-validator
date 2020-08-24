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
      "default": 1,
      "checkoutLimit": 1
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

  describe("identifiers", () => {
    it("should be invalid without identifiers", async () => {
      const policy = { ...omit(cloneDeep(policyInput), "identifiers") };
      const results = policySchema.validate(policy);
      expect(results).toHaveProperty("error.details",
        [{ "context": { "key": "identifiers", "label": "identifiers" }, "message": "\"identifiers\" is required", "path": ["identifiers"], "type": "any.required" }])
    });

    describe("label", () => {
      it("should be invalid without label", async () => {
        const policy = { ...omit(cloneDeep(policyInput), "identifiers[0].label") };
        const results = policySchema.validate(policy);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "label", "label": "identifiers[0].label" }, "message": "\"identifiers[0].label\" is required", "path": ["identifiers", 0, "label"], "type": "any.required" }])
      });
    });

    describe("uniqueColName", () => {
      it("should be valid without uniqueColName", async () => {
        const policy = { ...omit(cloneDeep(policyInput), "identifiers[0].uniqueColName") };
        const results = policySchema.validate(policy);
        expect(results).toHaveProperty("value", policy);
      });
    });

    describe("validationRegex", () => {
      it("should be valid without validationRegex", async () => {
        const policy = { ...omit(cloneDeep(policyInput), "identifiers[0].validationRegex") };
        const results = policySchema.validate(policy);
        expect(results).toHaveProperty("value", policy);
      });
    });

    describe("textInput", () => {
      it("should be invalid without textInput", async () => {
        const policy = { ...omit(cloneDeep(policyInput), "identifiers[0].textInput") };
        const results = policySchema.validate(policy);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "textInput", "label": "identifiers[0].textInput" }, "message": "\"identifiers[0].textInput\" is required", "path": ["identifiers", 0, "textInput"], "type": "any.required" }])
      });

      describe("type", () => {
        it("should be invalid without type", async () => {
          const policy = { ...omit(cloneDeep(policyInput), "identifiers[0].textInput.type") };
          const results = policySchema.validate(policy);
          expect(results).toHaveProperty("error.details",
            [{ "context": { "key": "type", "label": "identifiers[0].textInput.type" }, "message": "\"identifiers[0].textInput.type\" is required", "path": ["identifiers", 0, "textInput", "type"], "type": "any.required" }])
        });

        it("should be invalid if type is not STRING/PHONE_NUMBER", async () => {
          const policy = { ...cloneDeep(policyInput) };
          policy.identifiers[0].textInput.type = "test";
          const results = policySchema.validate(policy);
          expect(results).toHaveProperty("error.details",
            [{ "context": { "key": "type", "label": "identifiers[0].textInput.type", "valids": ["STRING", "PHONE_NUMBER"], "value": "test" }, "message": "\"identifiers[0].textInput.type\" must be one of [STRING, PHONE_NUMBER]", "path": ["identifiers", 0, "textInput", "type"], "type": "any.only" }])
        });
      });

      describe("visible", () => {
        it("should be invalid without visible", async () => {
          const policy = { ...omit(cloneDeep(policyInput), "identifiers[0].textInput.visible") };
          const results = policySchema.validate(policy);
          expect(results).toHaveProperty("error.details",
            [{ "context": { "key": "visible", "label": "identifiers[0].textInput.visible" }, "message": "\"identifiers[0].textInput.visible\" is required", "path": ["identifiers", 0, "textInput", "visible"], "type": "any.required" }])
        });
      });

      describe("disabled", () => {
        it("should be invalid without disabled", async () => {
          const policy = { ...omit(cloneDeep(policyInput), "identifiers[0].textInput.disabled") };
          const results = policySchema.validate(policy);
          expect(results).toHaveProperty("error.details",
            [{ "context": { "key": "disabled", "label": "identifiers[0].textInput.disabled" }, "message": "\"identifiers[0].textInput.disabled\" is required", "path": ["identifiers", 0, "textInput", "disabled"], "type": "any.required" }])
        });
      });
    });

    describe("scanButton", () => {
      it("should be invalid without scanButton", async () => {
        const policy = { ...omit(cloneDeep(policyInput), "identifiers[0].scanButton") };
        const results = policySchema.validate(policy);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "scanButton", "label": "identifiers[0].scanButton" }, "message": "\"identifiers[0].scanButton\" is required", "path": ["identifiers", 0, "scanButton"], "type": "any.required" }])
      });

      describe("type", () => {
        it("should be valid without type", async () => {
          const policy = { ...omit(cloneDeep(policyInput), "identifiers[0].scanButton.type") };
          const results = policySchema.validate(policy);
          expect(results).toHaveProperty("value", policy);
        });

        it("should be invalid if type is not QR/CODE_39", async () => {
          const policy = { ...cloneDeep(policyInput) };
          policy.identifiers[0].scanButton.type = "test";
          const results = policySchema.validate(policy);
          expect(results).toHaveProperty("error.details",
            [{ "context": { "key": "type", "label": "identifiers[0].scanButton.type", "valids": ["QR", "CODE_39"], "value": "test" }, "message": "\"identifiers[0].scanButton.type\" must be one of [QR, CODE_39]", "path": ["identifiers", 0, "scanButton", "type"], "type": "any.only" }])
        });
      });

      describe("visible", () => {
        it("should be invalid without visible", async () => {
          const policy = { ...omit(cloneDeep(policyInput), "identifiers[0].scanButton.visible") };
          const results = policySchema.validate(policy);
          expect(results).toHaveProperty("error.details",
            [{ "context": { "key": "visible", "label": "identifiers[0].scanButton.visible" }, "message": "\"identifiers[0].scanButton.visible\" is required", "path": ["identifiers", 0, "scanButton", "visible"], "type": "any.required" }])
        });
      });

      describe("disabled", () => {
        it("should be invalid without disabled", async () => {
          const policy = { ...omit(cloneDeep(policyInput), "identifiers[0].scanButton.disabled") };
          const results = policySchema.validate(policy);
          expect(results).toHaveProperty("error.details",
            [{ "context": { "key": "disabled", "label": "identifiers[0].scanButton.disabled" }, "message": "\"identifiers[0].scanButton.disabled\" is required", "path": ["identifiers", 0, "scanButton", "disabled"], "type": "any.required" }])
        });
      });
    });
  });

  describe("quantity", () => {
    it("should be invalid without quantity", async () => {
      const policy = { ...omit(cloneDeep(policyInput), "quantity") };
      const results = policySchema.validate(policy);
      expect(results).toHaveProperty("error.details",
        [{ "context": { "key": "quantity", "label": "quantity" }, "message": "\"quantity\" is required", "path": ["quantity"], "type": "any.required" }])
    });

    describe("period", () => {
      it("should be invalid without period", async () => {
        const policy = { ...omit(cloneDeep(policyInput), "quantity.period") };
        const results = policySchema.validate(policy);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "period", "label": "quantity.period" }, "message": "\"quantity.period\" is required", "path": ["quantity", "period"], "type": "any.required" }])
      });
    });

    describe("periodType", () => {
      it("should be invalid without periodType", async () => {
        const policy = { ...omit(cloneDeep(policyInput), "quantity.periodType") };
        const results = policySchema.validate(policy);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "periodType", "label": "quantity.periodType" }, "message": "\"quantity.periodType\" is required", "path": ["quantity", "periodType"], "type": "any.required" }])
      });

      it("should be invalid if periodType is not CRON/ROLLING", async () => {
        const policy = { ...cloneDeep(policyInput) };
        policy.quantity.periodType = "test";
        const results = policySchema.validate(policy);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "periodType", "label": "quantity.periodType", "valids": ["CRON", "ROLLING"], "value": "test" }, "message": "\"quantity.periodType\" must be one of [CRON, ROLLING]", "path": ["quantity", "periodType"], "type": "any.only" }])
      });
    });

    describe("periodExpression", () => {
      it("should be invalid without periodExpression", async () => {
        const policy = { ...omit(cloneDeep(policyInput), "quantity.periodExpression") };
        const results = policySchema.validate(policy);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "periodExpression", "label": "quantity.periodExpression" }, "message": "\"quantity.periodExpression\" is required", "path": ["quantity", "periodExpression"], "type": "any.required" }])
      });
    });

    describe("limit", () => {
      it("should be invalid without limit", async () => {
        const policy = { ...omit(cloneDeep(policyInput), "quantity.limit") };
        const results = policySchema.validate(policy);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "limit", "label": "quantity.limit" }, "message": "\"quantity.limit\" is required", "path": ["quantity", "limit"], "type": "any.required" }])
      });
    });

    describe("default", () => {
      it("should be invalid without default", async () => {
        const policy = { ...omit(cloneDeep(policyInput), "quantity.default") };
        const results = policySchema.validate(policy);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "default", "label": "quantity.default" }, "message": "\"quantity.default\" is required", "path": ["quantity", "default"], "type": "any.required" }])
      });

      it("should be invalid if 0", async () => {
        const policy = { ...cloneDeep(policyInput) };
        policy.quantity.default = 0;
        const results = policySchema.validate(policy);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "default", "label": "quantity.default", "limit": 1, "value": 0 }, "message": "\"quantity.default\" must be greater than or equal to 1", "path": ["quantity", "default"], "type": "number.min" }])
      });

      it("should be invalid if negative", async () => {
        const policy = { ...cloneDeep(policyInput) };
        policy.quantity.default = -1;
        const results = policySchema.validate(policy);
        expect(results).toHaveProperty("error.details",
        [{ "context": { "key": "default", "label": "quantity.default", "limit": 1, "value": -1 }, "message": "\"quantity.default\" must be greater than or equal to 1", "path": ["quantity", "default"], "type": "number.min" }])
      });
    });

    describe("checkoutLimit", () => {
      it("should be valid without checkoutLimit", async () => {
        const policy = { ...omit(cloneDeep(policyInput), "quantity.checkoutLimit") };
        const results = policySchema.validate(policy);
        expect(results).toHaveProperty("value", policy);
      });

      it("should be invalid if 0", async () => {
        const policy = { ...cloneDeep(policyInput) };
        policy.quantity.checkoutLimit = 0;
        const results = policySchema.validate(policy);
        expect(results).toHaveProperty("error.details",
          [{ "context": { "key": "checkoutLimit", "label": "quantity.checkoutLimit", "limit": 1, "value": 0 }, "message": "\"quantity.checkoutLimit\" must be greater than or equal to 1", "path": ["quantity", "checkoutLimit"], "type": "number.min" }])
      });

      it("should be invalid if negative", async () => {
        const policy = { ...cloneDeep(policyInput) };
        policy.quantity.checkoutLimit = -1;
        const results = policySchema.validate(policy);
        expect(results).toHaveProperty("error.details",
        [{ "context": { "key": "checkoutLimit", "label": "quantity.checkoutLimit", "limit": 1, "value": -1 }, "message": "\"quantity.checkoutLimit\" must be greater than or equal to 1", "path": ["quantity", "checkoutLimit"], "type": "number.min" }])
      });
    });
  });

  describe("type", () => {
    it("should be invalid without type", async () => {
      const policy = { ...omit(cloneDeep(policyInput), "type") };
      const results = policySchema.validate(policy);
      expect(results).toHaveProperty("error.details",
        [{ "context": { "key": "type", "label": "type" }, "message": "\"type\" is required", "path": ["type"], "type": "any.required" }])
    });

    it("should be invalid if type is not PURCHASE/REDEEM", async () => {
      const policy = { ...cloneDeep(policyInput) };
      policy.type = "test";
      const results = policySchema.validate(policy);
      expect(results).toHaveProperty("error.details",
        [{ "context": { "key": "type", "label": "type", "valids": ["PURCHASE", "REDEEM"], "value": "test" }, "message": "\"type\" must be one of [PURCHASE, REDEEM]", "path": ["type"], "type": "any.only" }])
    });
  });
});
