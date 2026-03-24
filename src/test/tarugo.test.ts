import { describe, it, expect } from "vitest";
import { classifyDiameterRange, classifyCommercialType } from "@/utils/classifiers";
import { calculateTarugoWeightKg } from "@/services/tarugoCalculator";
import { calculateTarugoPrice } from "@/services/pricingEngine";

describe("Tarugo — Classificação de diâmetro", () => {
  it("classifica abaixo de 20", () => {
    expect(classifyDiameterRange(10)).toBe("ABAIXO_20");
    expect(classifyDiameterRange(15)).toBe("ABAIXO_20");
  });
  it("classifica de 20 a 150", () => {
    expect(classifyDiameterRange(20)).toBe("DE_20_A_150");
    expect(classifyDiameterRange(100)).toBe("DE_20_A_150");
    expect(classifyDiameterRange(150)).toBe("DE_20_A_150");
  });
  it("classifica acima de 150", () => {
    expect(classifyDiameterRange(160)).toBe("ACIMA_150");
    expect(classifyDiameterRange(300)).toBe("ACIMA_150");
  });
});

describe("Tarugo — Classificação do tipo comercial", () => {
  it("INTEIRO para 1000 e 3000", () => {
    expect(classifyCommercialType(1000)).toBe("INTEIRO");
    expect(classifyCommercialType(3000)).toBe("INTEIRO");
  });
  it("CORTE para outros valores", () => {
    expect(classifyCommercialType(500)).toBe("CORTE");
    expect(classifyCommercialType(1500)).toBe("CORTE");
    expect(classifyCommercialType(2000)).toBe("CORTE");
  });
});

describe("Tarugo — Cálculo de peso", () => {
  it("calcula peso do Nylon 50mm x 1000mm", () => {
    const weight = calculateTarugoWeightKg(50, 1000, 1.32);
    expect(weight).toBeCloseTo(2.5918, 3);
  });
});

describe("Tarugo — Regras de preço (planilha atualizada)", () => {
  it("NYLON_NATURAL 50mm x 1000mm FIXED_PRICE", () => {
    const result = calculateTarugoPrice({ materialCode: "NYLON_NATURAL", diameter: 50, length: 1000, quantity: 2 });
    expect(result.pricingMode).toBe("FIXED_PRICE");
    expect(result.pricePerKg).toBe(60); // atualizado: era 55, agora 60
    expect(result.unitPrice).toBeCloseTo(2.5918 * 60, 1);
    expect(result.totalPrice).toBeCloseTo(2.5918 * 60 * 2, 1);
  });

  it("TECAST 10mm x 500mm UNAVAILABLE", () => {
    const result = calculateTarugoPrice({ materialCode: "TECAST", diameter: 10, length: 500, quantity: 1 });
    expect(result.pricingMode).toBe("UNAVAILABLE");
    expect(result.unitPrice).toBeNull();
    expect(result.totalPrice).toBeNull();
  });

  it("TECAST_L 10mm x 1000mm CONSULT_REQUIRED", () => {
    const result = calculateTarugoPrice({ materialCode: "TECAST_L", diameter: 10, length: 1000, quantity: 1 });
    expect(result.pricingMode).toBe("CONSULT_REQUIRED");
    expect(result.unitPrice).toBeNull();
  });

  it("ACRILICO 50mm x 1000mm CONSULT_REQUIRED (novo material)", () => {
    const result = calculateTarugoPrice({ materialCode: "ACRILICO", diameter: 50, length: 1000, quantity: 1 });
    expect(result.pricingMode).toBe("CONSULT_REQUIRED");
    expect(result.unitPrice).toBeNull();
  });
});
