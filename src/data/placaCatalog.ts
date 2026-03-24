/**
 * Catálogo de placas — derivado de commercialMaster.ts
 */
import type { PlateMaterial, PlatePatternRule } from "./placaTypes";
import {
  masterPlateMaterials,
  masterPlateRows,
  parseThicknessRange,
  parsePatternDimensions,
} from "./commercialMaster";

// ──────────────────────────────────────────────
// Materiais do módulo PLACA
// ──────────────────────────────────────────────

export const plateMaterials: PlateMaterial[] = masterPlateMaterials.map((m) => ({
  code: m.code,
  displayName: m.displayName,
  density: m.density,
  active: m.active,
}));

export function getActivePlateMaterials(): PlateMaterial[] {
  return plateMaterials.filter((m) => m.active);
}

export function getPlateMaterialByCode(code: string): PlateMaterial | undefined {
  return plateMaterials.find((m) => m.code === code && m.active);
}

// ──────────────────────────────────────────────
// Derivação automática das regras de padrão
// ──────────────────────────────────────────────

function derivePlatePatternRules(): PlatePatternRule[] {
  const rules: PlatePatternRule[] = [];

  for (const row of masterPlateRows) {
    // PU é tratado manualmente abaixo por causa de sobreposição + regra de negócio
    if (row.materialCode === "PU") continue;

    const { width, length } = parsePatternDimensions(row.patternMm);
    const thicknesses = parseThicknessRange(row.availableMmRaw);
    const cutStatus = row.cutPriceRaw === "NT" ? ("NT" as const) : ("ALLOWED" as const);
    const cutPrice = typeof row.cutPriceRaw === "number" ? row.cutPriceRaw : null;

    rules.push({
      id: `${row.materialCode}_${width}x${length}_r${row.sheetRow}`,
      materialCode: row.materialCode,
      standardWidthMm: width,
      standardLengthMm: length,
      availableThicknessesMm: thicknesses,
      fullSheetPricePerMm: row.fullSheetPricePerMm,
      cutPricePerKg: cutPrice,
      cutStatus,
    });
  }

  // ── PU — tratamento especial ──
  // Linhas 48 (01-03, fullSheet=190, NT), 49 (04-70, fullSheet=160, cut=140), 50 (03-30, fullSheet=180, NT)
  // Regra de negócio: PU corta a partir de 3mm.
  // Espessura 3: fullSheet=180 (linha 50), cut=140 (preço linha 49), ALLOWED (regra negócio)
  rules.push({
    id: "PU_1000x1000_1_2",
    materialCode: "PU",
    standardWidthMm: 1000,
    standardLengthMm: 1000,
    availableThicknessesMm: [1, 1.2, 1.5, 1.6, 2],
    fullSheetPricePerMm: 190, // linha 48
    cutPricePerKg: null,
    cutStatus: "NT",
  });
  rules.push({
    id: "PU_1000x1000_3",
    materialCode: "PU",
    standardWidthMm: 1000,
    standardLengthMm: 1000,
    availableThicknessesMm: [3],
    fullSheetPricePerMm: 180, // linha 50
    cutPricePerKg: 140, // preço da linha 49 — regra de negócio permite corte a partir de 3mm
    cutStatus: "ALLOWED",
  });
  rules.push({
    id: "PU_1000x1000_4_70",
    materialCode: "PU",
    standardWidthMm: 1000,
    standardLengthMm: 1000,
    availableThicknessesMm: [4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 70],
    fullSheetPricePerMm: 160, // linha 49
    cutPricePerKg: 140, // linha 49
    cutStatus: "ALLOWED",
  });

  return rules;
}

export const platePatternRules: PlatePatternRule[] = derivePlatePatternRules();

// ──────────────────────────────────────────────
// Helpers de consulta
// ──────────────────────────────────────────────

export function getRulesForMaterial(materialCode: string): PlatePatternRule[] {
  return platePatternRules.filter((r) => r.materialCode === materialCode);
}

export function getAvailableThicknessesForMaterial(materialCode: string): number[] {
  const rules = getRulesForMaterial(materialCode);
  const set = new Set<number>();
  for (const r of rules) {
    for (const t of r.availableThicknessesMm) {
      set.add(t);
    }
  }
  return Array.from(set).sort((a, b) => a - b);
}

export function getCompatiblePatterns(materialCode: string, thicknessMm: number): PlatePatternRule[] {
  return platePatternRules.filter(
    (r) => r.materialCode === materialCode && r.availableThicknessesMm.includes(thicknessMm)
  );
}

export function getPatternById(id: string): PlatePatternRule | undefined {
  return platePatternRules.find((r) => r.id === id);
}
