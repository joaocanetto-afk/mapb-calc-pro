import { describe, it, expect } from "vitest";
import { getAvailableThicknessesForMaterial, getCompatiblePatterns } from "@/data/placaCatalog";
import { findBestPlatePattern, calculatePlateQuote } from "@/services/placaPricingEngine";
import { calculatePlateWeightKg, calculateFullSheetPrice } from "@/services/placaCalculator";

describe("Placa — Espessuras disponíveis", () => {
  it("retorna espessuras para UHMW", () => {
    const t = getAvailableThicknessesForMaterial("UHMW");
    expect(t).toContain(6);
    expect(t).toContain(100);
    expect(t).not.toContain(1);
  });

  it("retorna espessuras para PU incluindo finas", () => {
    const t = getAvailableThicknessesForMaterial("PU");
    expect(t).toContain(1);
    expect(t).toContain(3);
    expect(t).toContain(70);
  });
});

describe("Placa — Seleção do menor padrão", () => {
  it("UHMW 1000x2000 peça cabe em 1000x3000", () => {
    const { best } = findBestPlatePattern("UHMW", 8, 1000, 2000);
    expect(best).not.toBeNull();
    expect(best!.rule.standardWidthMm).toBe(1000);
    expect(best!.rule.standardLengthMm).toBe(3000);
  });

  it("PTFE 500x280 cabe em 500x500", () => {
    const { best } = findBestPlatePattern("PTFE", 4, 500, 280);
    expect(best).not.toBeNull();
    expect(best!.rule.standardWidthMm).toBe(500);
    expect(best!.rule.standardLengthMm).toBe(500);
  });

  it("rotaciona peça quando necessário", () => {
    // Acrílico 30x2000 at 10mm → 1000x2000 pattern (30<=1000, 2000<=2000)
    const { best } = findBestPlatePattern("ACRILICO", 10, 30, 2000);
    expect(best).not.toBeNull();
    expect(best!.rule.standardWidthMm).toBe(1000);
    expect(best!.rule.standardLengthMm).toBe(2000);
  });
});

describe("Placa — Bloqueio abaixo de 2mm", () => {
  it("bloqueia corte e sugere placa inteira", () => {
    const result = calculatePlateQuote({
      mode: "CUT",
      materialCode: "PSAI_PB",
      thicknessMm: 1,
      widthMm: 500,
      lengthMm: 500,
      quantity: 1,
    });
    expect(result.status).toBe("FULL_SHEET_ONLY");
    expect(result.statusMessage).toContain("2mm");
    expect(result.suggestedFullSheet).not.toBeNull();
  });
});

describe("Placa — PU corta a partir de 3mm", () => {
  it("bloqueia corte PU 2mm", () => {
    const result = calculatePlateQuote({
      mode: "CUT",
      materialCode: "PU",
      thicknessMm: 2,
      widthMm: 500,
      lengthMm: 500,
      quantity: 1,
    });
    expect(result.status).toBe("FULL_SHEET_ONLY");
  });

  it("permite corte PU 3mm", () => {
    const result = calculatePlateQuote({
      mode: "CUT",
      materialCode: "PU",
      thicknessMm: 3,
      widthMm: 500,
      lengthMm: 500,
      quantity: 1,
    });
    expect(result.status).toBe("CALCULATED");
    expect(result.pricePerKg).toBe(130);
  });
});

describe("Placa — PVC Expandido bloqueado para corte", () => {
  it("retorna somente placa inteira", () => {
    const result = calculatePlateQuote({
      mode: "CUT",
      materialCode: "PVC_EXPANDIDO",
      thicknessMm: 5,
      widthMm: 500,
      lengthMm: 500,
      quantity: 1,
    });
    expect(result.status).toBe("FULL_SHEET_ONLY");
  });
});

describe("Placa — Cálculo de corte", () => {
  it("UHMW 1000x2000x8mm", () => {
    const weight = calculatePlateWeightKg(8, 1000, 2000, 0.95);
    expect(weight).toBeCloseTo(15.2, 1);
    const result = calculatePlateQuote({
      mode: "CUT",
      materialCode: "UHMW",
      thicknessMm: 8,
      widthMm: 1000,
      lengthMm: 2000,
      quantity: 1,
    });
    expect(result.status).toBe("CALCULATED");
    expect(result.unitWeightKg).toBeCloseTo(15.2, 1);
    expect(result.totalPrice).toBeCloseTo(1672, 0);
  });

  it("PTFE 500x280x4mm", () => {
    const result = calculatePlateQuote({
      mode: "CUT",
      materialCode: "PTFE",
      thicknessMm: 4,
      widthMm: 500,
      lengthMm: 280,
      quantity: 1,
    });
    expect(result.status).toBe("CALCULATED");
    expect(result.totalPrice).toBeCloseTo(296.24, 1);
  });

  it("Acrílico 30x2000x10mm", () => {
    const result = calculatePlateQuote({
      mode: "CUT",
      materialCode: "ACRILICO",
      thicknessMm: 10,
      widthMm: 30,
      lengthMm: 2000,
      quantity: 1,
    });
    expect(result.status).toBe("CALCULATED");
    expect(result.totalPrice).toBeCloseTo(60.0, 0);
  });
});

describe("Placa — PU 510x700x2mm corte bloqueado com sugestão", () => {
  it("sugere placa inteira 1000x1000", () => {
    const result = calculatePlateQuote({
      mode: "CUT",
      materialCode: "PU",
      thicknessMm: 2,
      widthMm: 510,
      lengthMm: 700,
      quantity: 1,
    });
    expect(result.status).toBe("FULL_SHEET_ONLY");
    expect(result.suggestedFullSheet).not.toBeNull();
    expect(result.suggestedFullSheet!.standardWidthMm).toBe(1000);
    expect(result.suggestedFullSheet!.standardLengthMm).toBe(1000);
    expect(result.suggestedFullSheet!.unitPrice).toBeCloseTo(360, 0);
  });
});

describe("Placa — Placa inteira", () => {
  it("calcula Nylon 1000x2000 10mm", () => {
    const price = calculateFullSheetPrice(210, 10);
    expect(price).toBe(2100);

    const result = calculatePlateQuote({
      mode: "FULL_SHEET",
      materialCode: "NYLON",
      thicknessMm: 10,
      patternId: "NYLON_1000x2000",
      quantity: 1,
    });
    expect(result.status).toBe("CALCULATED");
    expect(result.unitPrice).toBe(2100);
  });
});

describe("Placa — NT tratamento", () => {
  it("TVE todo NT para corte", () => {
    const rules = getCompatiblePatterns("TVE", 2);
    expect(rules.length).toBeGreaterThan(0);
    expect(rules.every((r) => r.cutStatus === "NT")).toBe(true);

    const result = calculatePlateQuote({
      mode: "CUT",
      materialCode: "TVE",
      thicknessMm: 2,
      widthMm: 500,
      lengthMm: 500,
      quantity: 1,
    });
    expect(result.status).toBe("FULL_SHEET_ONLY");
  });
});
