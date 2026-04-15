import { describe, it, expect } from "vitest";
import { classifyDiameterRange, classifyCommercialType } from "@/utils/classifiers";
import { calculateTarugoWeightKg } from "@/services/tarugoCalculator";
import { calculateTarugoPrice } from "@/services/pricingEngine";
import { getAllowedDiametersForMaterial, isDiameterAllowedForMaterial } from "@/data/rodDiameterRules";

describe("Tarugo — Classificação de diâmetro (4 faixas)", () => {
  it("classifica abaixo de 20 (fronteira 19)", () => {
    expect(classifyDiameterRange(10)).toBe("ABAIXO_20");
    expect(classifyDiameterRange(19)).toBe("ABAIXO_20");
  });
  it("classifica de 20 a 150 (fronteiras 20 e 150)", () => {
    expect(classifyDiameterRange(20)).toBe("DE_20_A_150");
    expect(classifyDiameterRange(100)).toBe("DE_20_A_150");
    expect(classifyDiameterRange(150)).toBe("DE_20_A_150");
  });
  it("classifica de 151 a 200 (fronteiras 151 e 200)", () => {
    expect(classifyDiameterRange(151)).toBe("DE_151_A_200");
    expect(classifyDiameterRange(180)).toBe("DE_151_A_200");
    expect(classifyDiameterRange(200)).toBe("DE_151_A_200");
  });
  it("classifica acima de 200 (fronteira 210)", () => {
    expect(classifyDiameterRange(210)).toBe("ACIMA_200");
    expect(classifyDiameterRange(300)).toBe("ACIMA_200");
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

describe("Tarugo — Disponibilidade de diâmetros por material", () => {
  it("TECAST aceita 320 e 500", () => {
    expect(isDiameterAllowedForMaterial("TECAST", 320)).toBe(true);
    expect(isDiameterAllowedForMaterial("TECAST", 500)).toBe(true);
  });
  it("TECAST aceita 300 (base)", () => {
    expect(isDiameterAllowedForMaterial("TECAST", 300)).toBe(true);
  });
  it("NYLON_NATURAL não aceita 320", () => {
    expect(isDiameterAllowedForMaterial("NYLON_NATURAL", 320)).toBe(false);
  });
  it("PVC não aceita 350", () => {
    expect(isDiameterAllowedForMaterial("PVC", 350)).toBe(false);
  });
  it("UHMW não aceita 400", () => {
    expect(isDiameterAllowedForMaterial("UHMW", 400)).toBe(false);
  });
  it("materiais comuns aceitam 300", () => {
    expect(isDiameterAllowedForMaterial("NYLON_NATURAL", 300)).toBe(true);
    expect(isDiameterAllowedForMaterial("PVC", 300)).toBe(true);
    expect(isDiameterAllowedForMaterial("POLIACETAL_NATURAL", 300)).toBe(true);
  });
  it("TECAST retorna 41 diâmetros, outros retornam 36", () => {
    expect(getAllowedDiametersForMaterial("TECAST").length).toBe(41);
    expect(getAllowedDiametersForMaterial("NYLON_NATURAL").length).toBe(36);
  });
});

describe("Tarugo — Engine rejeita diâmetro inválido para material", () => {
  it("NYLON_NATURAL + 320mm lança erro", () => {
    expect(() => calculateTarugoPrice({ materialCode: "NYLON_NATURAL", diameter: 320, length: 1000, quantity: 1 }))
      .toThrow("Este material não possui disponibilidade para o diâmetro informado.");
  });
  it("PVC + 350mm lança erro", () => {
    expect(() => calculateTarugoPrice({ materialCode: "PVC", diameter: 350, length: 500, quantity: 1 }))
      .toThrow("Este material não possui disponibilidade para o diâmetro informado.");
  });
  it("TECAST + 320mm não lança erro", () => {
    expect(() => calculateTarugoPrice({ materialCode: "TECAST", diameter: 320, length: 1000, quantity: 1 }))
      .not.toThrow();
  });
});

describe("Tarugo — Regras de preço (planilha atualizada, 4 faixas)", () => {
  it("NYLON_NATURAL 50mm x 1000mm FIXED_PRICE R$ 60/kg", () => {
    const result = calculateTarugoPrice({ materialCode: "NYLON_NATURAL", diameter: 50, length: 1000, quantity: 2 });
    expect(result.pricingMode).toBe("FIXED_PRICE");
    expect(result.pricePerKg).toBe(60);
    const expectedWeight = calculateTarugoWeightKg(50, 1000, 1.32);
    expect(result.unitPrice).toBeCloseTo(expectedWeight * 60, 1);
    expect(result.totalPrice).toBeCloseTo(expectedWeight * 60 * 2, 1);
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

  it("ACRILICO 50mm x 1000mm CONSULT_REQUIRED", () => {
    const result = calculateTarugoPrice({ materialCode: "ACRILICO", diameter: 50, length: 1000, quantity: 1 });
    expect(result.pricingMode).toBe("CONSULT_REQUIRED");
    expect(result.unitPrice).toBeNull();
  });

  it("TECAST_L INTEIRO 180mm → DE_151_A_200 FIXED_PRICE R$ 180/kg", () => {
    const result = calculateTarugoPrice({ materialCode: "TECAST_L", diameter: 180, length: 1000, quantity: 1 });
    expect(result.diameterRange).toBe("DE_151_A_200");
    expect(result.pricingMode).toBe("FIXED_PRICE");
    expect(result.pricePerKg).toBe(180);
  });

  it("TECAST_L INTEIRO 230mm → ACIMA_200 UNAVAILABLE", () => {
    const result = calculateTarugoPrice({ materialCode: "TECAST_L", diameter: 230, length: 1000, quantity: 1 });
    expect(result.diameterRange).toBe("ACIMA_200");
    expect(result.pricingMode).toBe("UNAVAILABLE");
    expect(result.unitPrice).toBeNull();
  });

  it("NYLON_66 INTEIRO 180mm → DE_151_A_200 FIXED_PRICE R$ 212.75/kg", () => {
    const result = calculateTarugoPrice({ materialCode: "NYLON_66", diameter: 180, length: 1000, quantity: 1 });
    expect(result.diameterRange).toBe("DE_151_A_200");
    expect(result.pricingMode).toBe("FIXED_PRICE");
    expect(result.pricePerKg).toBe(212.75);
  });

  it("NYLON_66 INTEIRO 230mm → ACIMA_200 UNAVAILABLE", () => {
    const result = calculateTarugoPrice({ materialCode: "NYLON_66", diameter: 230, length: 1000, quantity: 1 });
    expect(result.diameterRange).toBe("ACIMA_200");
    expect(result.pricingMode).toBe("UNAVAILABLE");
    expect(result.unitPrice).toBeNull();
  });
});
