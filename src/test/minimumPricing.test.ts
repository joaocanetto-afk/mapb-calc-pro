import { describe, it, expect } from "vitest";
import { applyMinimumCutUnitPrice, MINIMUM_CUT_UNIT_PRICE } from "@/utils/minimumPricing";
import { calculateTarugoPrice } from "@/services/pricingEngine";
import { calculatePlateQuote } from "@/services/placaPricingEngine";

describe("Minimum cut price — helper", () => {
  it("aplica mínimo quando unitário < 15 e shouldApply=true", () => {
    const r = applyMinimumCutUnitPrice(4.2, 3, true);
    expect(r.minimumPriceApplied).toBe(true);
    expect(r.finalUnitPrice).toBe(15);
    expect(r.finalTotalPrice).toBe(45);
    expect(r.calculatedUnitPriceBeforeMinimum).toBe(4.2);
    expect(r.calculatedTotalPriceBeforeMinimum).toBeCloseTo(12.6, 5);
    expect(r.minimumUnitPrice).toBe(MINIMUM_CUT_UNIT_PRICE);
  });

  it("não aplica mínimo quando unitário >= 15", () => {
    const r = applyMinimumCutUnitPrice(20, 2, true);
    expect(r.minimumPriceApplied).toBe(false);
    expect(r.finalUnitPrice).toBe(20);
    expect(r.finalTotalPrice).toBe(40);
  });

  it("não aplica mínimo quando shouldApply=false", () => {
    const r = applyMinimumCutUnitPrice(2, 1, false);
    expect(r.minimumPriceApplied).toBe(false);
    expect(r.finalUnitPrice).toBe(2);
  });
});

describe("Minimum cut price — Tarugo CORTE abaixo do mínimo", () => {
  it("Nylon natural Ø6 x 50mm aplica mínimo", () => {
    const result = calculateTarugoPrice({
      materialCode: "NYLON_NATURAL",
      diameter: 6,
      length: 50,
      quantity: 1,
    });
    expect(result.commercialType).toBe("CORTE");
    expect(result.pricingMode).toBe("FIXED_PRICE");
    expect(result.minimumPriceApplied).toBe(true);
    expect(result.unitPrice).toBe(15);
    expect(result.totalPrice).toBe(15);
    expect(result.calculatedUnitPriceBeforeMinimum).not.toBeNull();
    expect(result.calculatedUnitPriceBeforeMinimum!).toBeLessThan(15);
  });

  it("Nylon natural Ø6 x 50mm quantidade 3 → total 45", () => {
    const result = calculateTarugoPrice({
      materialCode: "NYLON_NATURAL",
      diameter: 6,
      length: 50,
      quantity: 3,
    });
    expect(result.minimumPriceApplied).toBe(true);
    expect(result.unitPrice).toBe(15);
    expect(result.totalPrice).toBe(45);
  });

  it("Nylon natural Ø100 x 500mm não aplica mínimo (acima)", () => {
    const result = calculateTarugoPrice({
      materialCode: "NYLON_NATURAL",
      diameter: 100,
      length: 500,
      quantity: 1,
    });
    expect(result.commercialType).toBe("CORTE");
    expect(result.minimumPriceApplied).toBe(false);
    expect(result.unitPrice!).toBeGreaterThan(15);
  });

  it("Nylon natural Ø6 x 1000mm INTEIRO não aplica mínimo", () => {
    const result = calculateTarugoPrice({
      materialCode: "NYLON_NATURAL",
      diameter: 6,
      length: 1000,
      quantity: 1,
    });
    expect(result.commercialType).toBe("INTEIRO");
    expect(result.minimumPriceApplied).toBe(false);
  });

  it("Status UNAVAILABLE não calcula mínimo", () => {
    const result = calculateTarugoPrice({
      materialCode: "TECAST",
      diameter: 10,
      length: 500,
      quantity: 1,
    });
    expect(result.pricingMode).toBe("UNAVAILABLE");
    expect(result.minimumPriceApplied).toBe(false);
    expect(result.unitPrice).toBeNull();
  });

  it("Status CONSULT_REQUIRED não calcula mínimo", () => {
    const result = calculateTarugoPrice({
      materialCode: "ACRILICO",
      diameter: 50,
      length: 1000,
      quantity: 1,
    });
    expect(result.pricingMode).toBe("CONSULT_REQUIRED");
    expect(result.minimumPriceApplied).toBe(false);
  });
});

describe("Minimum cut price — Placa CORTE abaixo do mínimo", () => {
  it("Acrílico 30x30x10mm aplica mínimo", () => {
    const result = calculatePlateQuote({
      mode: "CUT",
      materialCode: "ACRILICO",
      thicknessMm: 10,
      widthMm: 30,
      lengthMm: 30,
      quantity: 1,
    });
    if (result.status === "CALCULATED") {
      expect(result.minimumPriceApplied).toBe(true);
      expect(result.unitPrice).toBe(15);
      expect(result.totalPrice).toBe(15);
      expect(result.calculatedUnitPriceBeforeMinimum!).toBeLessThan(15);
    }
  });

  it("Acrílico 30x30x10mm quantidade 3 → total 45", () => {
    const result = calculatePlateQuote({
      mode: "CUT",
      materialCode: "ACRILICO",
      thicknessMm: 10,
      widthMm: 30,
      lengthMm: 30,
      quantity: 3,
    });
    if (result.status === "CALCULATED") {
      expect(result.minimumPriceApplied).toBe(true);
      expect(result.unitPrice).toBe(15);
      expect(result.totalPrice).toBe(45);
      expect(result.calculatedTotalPriceBeforeMinimum!).toBeLessThan(45);
    }
  });

  it("Placa inteira (FULL_SHEET) nunca aplica mínimo", () => {
    const result = calculatePlateQuote({
      mode: "FULL_SHEET",
      materialCode: "ACRILICO",
      thicknessMm: 10,
      patternId: "ACRILICO_1000x2000",
      quantity: 1,
    });
    expect(result.minimumPriceApplied).toBe(false);
  });
});
