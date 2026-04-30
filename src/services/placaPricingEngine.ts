import type {
  PlateCalculationInput,
  PlateCalculationResult,
  PatternOption,
  SuggestedFullSheet,
  PlatePatternRule,
} from "@/data/placaTypes";
import {
  getPlateMaterialByCode,
  getCompatiblePatterns,
  getPatternById,
  getAvailableThicknessesForMaterial,
} from "@/data/placaCatalog";
import {
  calculatePlateVolumeMm3,
  calculatePlateWeightKg,
  calculateFullSheetPrice,
  calculatePlateCutPrice,
} from "./placaCalculator";
import { applyMinimumCutUnitPrice } from "@/utils/minimumPricing";

// ──────────────────────────────────────────────
// Seleção do menor padrão compatível para corte
// ──────────────────────────────────────────────

interface BestPatternResult {
  rule: PlatePatternRule;
  rotationApplied: boolean;
}

function pieceFitsInPattern(
  pieceW: number,
  pieceL: number,
  patW: number,
  patL: number
): { fits: boolean; rotated: boolean } {
  if (pieceW <= patW && pieceL <= patL) return { fits: true, rotated: false };
  if (pieceL <= patW && pieceW <= patL) return { fits: true, rotated: true };
  return { fits: false, rotated: false };
}

export function findBestPlatePattern(
  materialCode: string,
  thicknessMm: number,
  widthMm: number,
  lengthMm: number
): { best: BestPatternResult | null; available: PatternOption[] } {
  const rules = getCompatiblePatterns(materialCode, thicknessMm);
  const available: PatternOption[] = rules.map((r) => ({
    ruleId: r.id,
    widthMm: r.standardWidthMm,
    lengthMm: r.standardLengthMm,
    areaMm2: r.standardWidthMm * r.standardLengthMm,
  }));

  let best: BestPatternResult | null = null;
  let bestArea = Infinity;
  let bestLength = Infinity;
  let bestWidth = Infinity;

  for (const rule of rules) {
    const { fits, rotated } = pieceFitsInPattern(
      widthMm,
      lengthMm,
      rule.standardWidthMm,
      rule.standardLengthMm
    );
    if (!fits) continue;

    const area = rule.standardWidthMm * rule.standardLengthMm;
    const len = rule.standardLengthMm;
    const wid = rule.standardWidthMm;

    if (
      area < bestArea ||
      (area === bestArea && len < bestLength) ||
      (area === bestArea && len === bestLength && wid < bestWidth)
    ) {
      best = { rule, rotationApplied: rotated };
      bestArea = area;
      bestLength = len;
      bestWidth = wid;
    }
  }

  return { best, available };
}

// ──────────────────────────────────────────────
// Sugestão de placa inteira (para fallback no corte)
// ──────────────────────────────────────────────

function buildFullSheetSuggestion(
  rules: PlatePatternRule[],
  thicknessMm: number,
  widthMm?: number,
  lengthMm?: number,
  quantity: number = 1
): SuggestedFullSheet | null {
  // Filter rules that support this thickness
  const eligible = rules.filter((r) =>
    r.availableThicknessesMm.includes(thicknessMm)
  );
  if (eligible.length === 0) return null;

  // If dimensions given, try to find smallest pattern that fits
  let chosen: PlatePatternRule | null = null;
  if (widthMm && lengthMm) {
    let bestArea = Infinity;
    for (const r of eligible) {
      const { fits } = pieceFitsInPattern(widthMm, lengthMm, r.standardWidthMm, r.standardLengthMm);
      if (fits) {
        const area = r.standardWidthMm * r.standardLengthMm;
        if (area < bestArea) {
          chosen = r;
          bestArea = area;
        }
      }
    }
  }

  // If no fit or no dimensions, pick smallest sheet
  if (!chosen) {
    chosen = eligible.reduce((a, b) =>
      a.standardWidthMm * a.standardLengthMm <= b.standardWidthMm * b.standardLengthMm ? a : b
    );
  }

  const unitPrice = calculateFullSheetPrice(chosen.fullSheetPricePerMm, thicknessMm);
  return {
    patternId: chosen.id,
    standardWidthMm: chosen.standardWidthMm,
    standardLengthMm: chosen.standardLengthMm,
    pricePerMm: chosen.fullSheetPricePerMm,
    unitPrice,
    totalPrice: unitPrice * quantity,
  };
}

// ──────────────────────────────────────────────
// Motor principal
// ──────────────────────────────────────────────

function makeEmpty(
  input: PlateCalculationInput,
  materialName: string,
  density: number | null,
  status: PlateCalculationResult["status"],
  statusMessage: string,
  extras?: Partial<PlateCalculationResult>
): PlateCalculationResult {
  return {
    mode: input.mode,
    material: materialName,
    density,
    thicknessMm: input.thicknessMm,
    widthMm: input.widthMm ?? null,
    lengthMm: input.lengthMm ?? null,
    standardWidthMm: null,
    standardLengthMm: null,
    quantity: input.quantity,
    rotationApplied: false,
    unitVolumeMm3: null,
    unitWeightKg: null,
    totalWeightKg: null,
    pricePerKg: null,
    pricePerMm: null,
    unitPrice: null,
    totalPrice: null,
    status,
    statusMessage,
    appliedRuleDescription: null,
    availablePatterns: [],
    suggestedFullSheet: null,
    calculatedUnitPriceBeforeMinimum: null,
    calculatedTotalPriceBeforeMinimum: null,
    minimumPriceApplied: false,
    minimumUnitPrice: null,
    ...extras,
  };
}

export function calculatePlateQuote(
  input: PlateCalculationInput
): PlateCalculationResult {
  const material = getPlateMaterialByCode(input.materialCode);
  if (!material) {
    return makeEmpty(input, input.materialCode, null, "VALIDATION_ERROR", "Material não encontrado.");
  }

  const name = material.displayName;
  const density = material.density;

  // Validate thickness available for this material
  const allThicknesses = getAvailableThicknessesForMaterial(input.materialCode);
  if (!allThicknesses.includes(input.thicknessMm)) {
    return makeEmpty(input, name, density, "VALIDATION_ERROR", "Esta espessura não está disponível para este material.");
  }

  const compatibleRules = getCompatiblePatterns(input.materialCode, input.thicknessMm);
  const availablePatterns: PatternOption[] = compatibleRules.map((r) => ({
    ruleId: r.id,
    widthMm: r.standardWidthMm,
    lengthMm: r.standardLengthMm,
    areaMm2: r.standardWidthMm * r.standardLengthMm,
  }));

  // ═══════════ FULL SHEET MODE ═══════════
  if (input.mode === "FULL_SHEET") {
    if (!input.patternId) {
      return makeEmpty(input, name, density, "VALIDATION_ERROR", "Selecione um padrão válido.", { availablePatterns });
    }

    const rule = getPatternById(input.patternId);
    if (!rule || rule.materialCode !== input.materialCode || !rule.availableThicknessesMm.includes(input.thicknessMm)) {
      return makeEmpty(input, name, density, "VALIDATION_ERROR", "Padrão inválido para este material e espessura.", { availablePatterns });
    }

    const unitPrice = calculateFullSheetPrice(rule.fullSheetPricePerMm, input.thicknessMm);
    const totalPrice = unitPrice * input.quantity;

    // Calculate weight for info purposes
    let unitWeightKg: number | null = null;
    let totalWeightKg: number | null = null;
    let unitVolumeMm3: number | null = null;
    if (density !== null) {
      unitVolumeMm3 = calculatePlateVolumeMm3(input.thicknessMm, rule.standardWidthMm, rule.standardLengthMm);
      unitWeightKg = calculatePlateWeightKg(input.thicknessMm, rule.standardWidthMm, rule.standardLengthMm, density);
      totalWeightKg = unitWeightKg * input.quantity;
    }

    return {
      mode: "FULL_SHEET",
      material: name,
      density,
      thicknessMm: input.thicknessMm,
      widthMm: null,
      lengthMm: null,
      standardWidthMm: rule.standardWidthMm,
      standardLengthMm: rule.standardLengthMm,
      quantity: input.quantity,
      rotationApplied: false,
      unitVolumeMm3,
      unitWeightKg,
      totalWeightKg,
      pricePerKg: null,
      pricePerMm: rule.fullSheetPricePerMm,
      unitPrice,
      totalPrice,
      status: "CALCULATED",
      statusMessage: "Preço calculado",
      appliedRuleDescription: `${name}, placa inteira ${rule.standardWidthMm}×${rule.standardLengthMm} mm, ${input.thicknessMm} mm`,
      availablePatterns,
      suggestedFullSheet: null,
      calculatedUnitPriceBeforeMinimum: unitPrice,
      calculatedTotalPriceBeforeMinimum: totalPrice,
      minimumPriceApplied: false,
      minimumUnitPrice: null,
    };
  }

  // ═══════════ CUT MODE ═══════════
  const widthMm = input.widthMm!;
  const lengthMm = input.lengthMm!;

  // Min size check
  if (widthMm < 30 || lengthMm < 30) {
    const msg = widthMm < 30
      ? "A largura mínima para corte é 30 mm."
      : "O comprimento mínimo para corte é 30 mm.";
    return makeEmpty(input, name, density, "BLOCKED", msg, { availablePatterns });
  }

  // Below 2mm → full sheet only
  if (input.thicknessMm < 2) {
    const suggestion = buildFullSheetSuggestion(compatibleRules, input.thicknessMm, widthMm, lengthMm, input.quantity);
    return makeEmpty(input, name, density, "FULL_SHEET_ONLY", "Abaixo de 2mm apenas placa inteira.", {
      availablePatterns,
      suggestedFullSheet: suggestion,
    });
  }

  // PU special rule: below 3mm → full sheet only
  if (input.materialCode === "PU" && input.thicknessMm < 3) {
    const suggestion = buildFullSheetSuggestion(compatibleRules, input.thicknessMm, widthMm, lengthMm, input.quantity);
    return makeEmpty(input, name, density, "FULL_SHEET_ONLY", "PU: abaixo de 3mm apenas placa inteira.", {
      availablePatterns,
      suggestedFullSheet: suggestion,
    });
  }

  // Find best pattern for cut
  const { best, available } = findBestPlatePattern(input.materialCode, input.thicknessMm, widthMm, lengthMm);
  const patternsForResult = available.length > 0 ? available : availablePatterns;

  if (!best) {
    // Check if ANY pattern exists but piece is too big
    if (compatibleRules.length > 0) {
      const suggestion = buildFullSheetSuggestion(compatibleRules, input.thicknessMm, widthMm, lengthMm, input.quantity);
      return makeEmpty(input, name, density, "BLOCKED", "Não existe padrão compatível com estas dimensões.", {
        availablePatterns: patternsForResult,
        suggestedFullSheet: suggestion,
      });
    }
    return makeEmpty(input, name, density, "UNAVAILABLE", "Nenhuma regra de preço foi encontrada para esta combinação.", {
      availablePatterns: patternsForResult,
    });
  }

  const rule = best.rule;

  // Check NT for cut
  if (rule.cutStatus === "NT" || rule.cutPricePerKg === null) {
    // All compatible rules NT?
    const allNT = compatibleRules.every((r) => r.cutStatus === "NT" || r.cutPricePerKg === null);
    if (allNT) {
      const suggestion = buildFullSheetSuggestion(compatibleRules, input.thicknessMm, widthMm, lengthMm, input.quantity);
      return makeEmpty(input, name, density, "FULL_SHEET_ONLY", "Material disponível somente como placa inteira.", {
        availablePatterns: patternsForResult,
        suggestedFullSheet: suggestion,
      });
    }
    // Try to find a cut-allowed rule that fits
    const cutRules = compatibleRules.filter((r) => r.cutStatus === "ALLOWED" && r.cutPricePerKg !== null);
    let altBest: BestPatternResult | null = null;
    let altBestArea = Infinity;
    for (const r of cutRules) {
      const { fits, rotated } = pieceFitsInPattern(widthMm, lengthMm, r.standardWidthMm, r.standardLengthMm);
      if (fits) {
        const area = r.standardWidthMm * r.standardLengthMm;
        if (area < altBestArea) {
          altBest = { rule: r, rotationApplied: rotated };
          altBestArea = area;
        }
      }
    }
    if (!altBest) {
      const suggestion = buildFullSheetSuggestion(compatibleRules, input.thicknessMm, widthMm, lengthMm, input.quantity);
      return makeEmpty(input, name, density, "FULL_SHEET_ONLY", "Este material não está disponível para corte nesta espessura.", {
        availablePatterns: patternsForResult,
        suggestedFullSheet: suggestion,
      });
    }
    // Use alternative
    return buildCutResult(input, name, density, altBest, patternsForResult);
  }

  // Density check
  if (density === null) {
    return makeEmpty(input, name, density, "BLOCKED", "Este material não possui densidade cadastrada para cálculo de corte.", {
      availablePatterns: patternsForResult,
    });
  }

  return buildCutResult(input, name, density, best, patternsForResult);
}

function buildCutResult(
  input: PlateCalculationInput,
  name: string,
  density: number | null,
  best: BestPatternResult,
  availablePatterns: PatternOption[]
): PlateCalculationResult {
  const rule = best.rule;
  const widthMm = input.widthMm!;
  const lengthMm = input.lengthMm!;

  if (density === null) {
    return makeEmpty(input, name, density, "BLOCKED", "Este material não possui densidade cadastrada para cálculo de corte.", {
      availablePatterns,
    });
  }

  const unitVolumeMm3 = calculatePlateVolumeMm3(input.thicknessMm, widthMm, lengthMm);
  const unitWeightKg = calculatePlateWeightKg(input.thicknessMm, widthMm, lengthMm, density);
  const totalWeightKg = unitWeightKg * input.quantity;
  const pricePerKg = rule.cutPricePerKg!;
  const calculatedUnitPrice = calculatePlateCutPrice(unitWeightKg, pricePerKg);
  const minimumResult = applyMinimumCutUnitPrice(calculatedUnitPrice, input.quantity, true);
  const unitPrice = minimumResult.finalUnitPrice;
  const totalPrice = minimumResult.finalTotalPrice;

  return {
    mode: "CUT",
    material: name,
    density,
    thicknessMm: input.thicknessMm,
    widthMm,
    lengthMm,
    standardWidthMm: rule.standardWidthMm,
    standardLengthMm: rule.standardLengthMm,
    quantity: input.quantity,
    rotationApplied: best.rotationApplied,
    unitVolumeMm3,
    unitWeightKg,
    totalWeightKg,
    pricePerKg,
    pricePerMm: null,
    unitPrice,
    totalPrice,
    status: "CALCULATED",
    statusMessage: minimumResult.minimumPriceApplied
      ? "Preço mínimo de corte aplicado"
      : "Preço calculado",
    appliedRuleDescription: `${name}, corte, padrão ${rule.standardWidthMm}×${rule.standardLengthMm} mm, ${input.thicknessMm} mm`,
    availablePatterns,
    suggestedFullSheet: null,
    calculatedUnitPriceBeforeMinimum: minimumResult.calculatedUnitPriceBeforeMinimum,
    calculatedTotalPriceBeforeMinimum: minimumResult.calculatedTotalPriceBeforeMinimum,
    minimumPriceApplied: minimumResult.minimumPriceApplied,
    minimumUnitPrice: minimumResult.minimumUnitPrice,
  };
}

