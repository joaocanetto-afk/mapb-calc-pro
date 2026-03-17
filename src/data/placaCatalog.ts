import type { PlateMaterial, PlatePatternRule } from "./placaTypes";

// ──────────────────────────────────────────────
// Materiais do módulo PLACA (fonte de verdade independente do TARUGO)
// ──────────────────────────────────────────────

export const plateMaterials: PlateMaterial[] = [
  { code: "NYLON", displayName: "Nylon", density: 1.32, active: true },
  { code: "PP_NATURAL", displayName: "Polipropileno Natural", density: 0.97, active: true },
  { code: "PP_PRETO", displayName: "Polipropileno Preto", density: 0.97, active: true },
  { code: "PEAD_NATURAL", displayName: "PEAD Natural", density: 1.00, active: true },
  { code: "PEAD_PRETO", displayName: "PEAD Preto", density: 1.00, active: true },
  { code: "POLIACETAL_NATURAL", displayName: "Poliacetal Natural", density: 1.53, active: true },
  { code: "POLIACETAL_PRETO", displayName: "Poliacetal Preto", density: 1.53, active: true },
  { code: "UHMW", displayName: "UHMW", density: 0.95, active: true },
  { code: "PTFE", displayName: "PTFE / Teflon", density: 2.30, active: true },
  { code: "ACRILICO", displayName: "Acrílico", density: 1.25, active: true },
  { code: "POLICARBONATO", displayName: "Policarbonato", density: 1.25, active: true },
  { code: "PETG", displayName: "PETG", density: 1.27, active: true },
  { code: "PSAI_PB", displayName: "PSAI Preto/Branco", density: 1.06, active: true },
  { code: "PSAI_COLORIDO", displayName: "PSAI Colorido", density: 1.06, active: true },
  { code: "PSAI_CRISTAL", displayName: "PSAI Cristal", density: 1.06, active: true },
  { code: "PSAI_LUMINOSO", displayName: "PSAI Luminoso", density: 1.06, active: true },
  { code: "PVC_RIGIDO", displayName: "PVC Rígido", density: 1.50, active: true },
  { code: "TVE", displayName: "TVE", density: 1.35, active: true },
  { code: "FENOLITE", displayName: "Fenolite", density: 1.35, active: true },
  { code: "CELERON", displayName: "Celeron", density: 1.45, active: true },
  { code: "CELERON_MF", displayName: "Celeron Malha Fina", density: 1.45, active: true },
  { code: "PU", displayName: "PU", density: 1.25, active: true },
  { code: "PVC_EXPANDIDO", displayName: "PVC Expandido", density: null, active: true },
];

export function getActivePlateMaterials(): PlateMaterial[] {
  return plateMaterials.filter((m) => m.active);
}

export function getPlateMaterialByCode(code: string): PlateMaterial | undefined {
  return plateMaterials.find((m) => m.code === code && m.active);
}

// ──────────────────────────────────────────────
// Pool global de espessuras (mm)
// ──────────────────────────────────────────────

const T = (from: number, to: number): number[] => {
  const pool = [0.3, 0.5, 0.6, 1, 1.2, 1.5, 1.6, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100];
  return pool.filter((t) => t >= from && t <= to);
};

// ──────────────────────────────────────────────
// Regras de padrão/preço normalizadas da planilha
// ──────────────────────────────────────────────

export const platePatternRules: PlatePatternRule[] = [
  // ── NYLON ──
  { id: "NYLON_1000x2000", materialCode: "NYLON", standardWidthMm: 1000, standardLengthMm: 2000, availableThicknessesMm: T(6, 100), fullSheetPricePerMm: 210, cutPricePerKg: 95, cutStatus: "ALLOWED" },
  { id: "NYLON_1000x3000", materialCode: "NYLON", standardWidthMm: 1000, standardLengthMm: 3000, availableThicknessesMm: T(6, 100), fullSheetPricePerMm: 315, cutPricePerKg: 95, cutStatus: "ALLOWED" },
  { id: "NYLON_500x3000", materialCode: "NYLON", standardWidthMm: 500, standardLengthMm: 3000, availableThicknessesMm: T(6, 100), fullSheetPricePerMm: 150, cutPricePerKg: 95, cutStatus: "ALLOWED" },

  // ── POLIPROPILENO NATURAL ──
  { id: "PP_NAT_1000x2000_1", materialCode: "PP_NATURAL", standardWidthMm: 1000, standardLengthMm: 2000, availableThicknessesMm: [1], fullSheetPricePerMm: 90, cutPricePerKg: null, cutStatus: "NT" },
  { id: "PP_NAT_1000x2000_2_30", materialCode: "PP_NATURAL", standardWidthMm: 1000, standardLengthMm: 2000, availableThicknessesMm: T(2, 30), fullSheetPricePerMm: 70, cutPricePerKg: 60, cutStatus: "ALLOWED" },
  { id: "PP_NAT_1000x3000_3_30", materialCode: "PP_NATURAL", standardWidthMm: 1000, standardLengthMm: 3000, availableThicknessesMm: T(3, 30), fullSheetPricePerMm: 120, cutPricePerKg: 60, cutStatus: "ALLOWED" },
  { id: "PP_NAT_1300x4000", materialCode: "PP_NATURAL", standardWidthMm: 1300, standardLengthMm: 4000, availableThicknessesMm: T(3, 10), fullSheetPricePerMm: 208, cutPricePerKg: 60, cutStatus: "ALLOWED" },
  { id: "PP_NAT_1000x3000_40_100", materialCode: "PP_NATURAL", standardWidthMm: 1000, standardLengthMm: 3000, availableThicknessesMm: T(40, 100), fullSheetPricePerMm: 180, cutPricePerKg: 70, cutStatus: "ALLOWED" },
  { id: "PP_NAT_500x3000_40_100", materialCode: "PP_NATURAL", standardWidthMm: 500, standardLengthMm: 3000, availableThicknessesMm: T(40, 100), fullSheetPricePerMm: 90, cutPricePerKg: 70, cutStatus: "ALLOWED" },

  // ── POLIPROPILENO PRETO ──
  { id: "PP_PRE_1000x2000_1", materialCode: "PP_PRETO", standardWidthMm: 1000, standardLengthMm: 2000, availableThicknessesMm: [1], fullSheetPricePerMm: 90, cutPricePerKg: null, cutStatus: "NT" },
  { id: "PP_PRE_1000x2000_2_30", materialCode: "PP_PRETO", standardWidthMm: 1000, standardLengthMm: 2000, availableThicknessesMm: T(2, 30), fullSheetPricePerMm: 70, cutPricePerKg: 75, cutStatus: "ALLOWED" },
  { id: "PP_PRE_1000x3000_3_30", materialCode: "PP_PRETO", standardWidthMm: 1000, standardLengthMm: 3000, availableThicknessesMm: T(3, 30), fullSheetPricePerMm: 120, cutPricePerKg: 75, cutStatus: "ALLOWED" },
  { id: "PP_PRE_1300x4000", materialCode: "PP_PRETO", standardWidthMm: 1300, standardLengthMm: 4000, availableThicknessesMm: T(3, 10), fullSheetPricePerMm: 208, cutPricePerKg: 75, cutStatus: "ALLOWED" },
  { id: "PP_PRE_1000x4000_12_30", materialCode: "PP_PRETO", standardWidthMm: 1000, standardLengthMm: 4000, availableThicknessesMm: [12, 15, 20, 25, 30], fullSheetPricePerMm: 160, cutPricePerKg: 75, cutStatus: "ALLOWED" },

  // ── PEAD NATURAL ──
  { id: "PEAD_NAT_1000x2000_1", materialCode: "PEAD_NATURAL", standardWidthMm: 1000, standardLengthMm: 2000, availableThicknessesMm: [1], fullSheetPricePerMm: 90, cutPricePerKg: null, cutStatus: "NT" },
  { id: "PEAD_NAT_1000x2000_2_30", materialCode: "PEAD_NATURAL", standardWidthMm: 1000, standardLengthMm: 2000, availableThicknessesMm: T(2, 30), fullSheetPricePerMm: 70, cutPricePerKg: 60, cutStatus: "ALLOWED" },
  { id: "PEAD_NAT_1000x3000_3_30", materialCode: "PEAD_NATURAL", standardWidthMm: 1000, standardLengthMm: 3000, availableThicknessesMm: T(3, 30), fullSheetPricePerMm: 120, cutPricePerKg: 60, cutStatus: "ALLOWED" },
  { id: "PEAD_NAT_1000x3000_40_100", materialCode: "PEAD_NATURAL", standardWidthMm: 1000, standardLengthMm: 3000, availableThicknessesMm: T(40, 100), fullSheetPricePerMm: 180, cutPricePerKg: 75, cutStatus: "ALLOWED" },
  { id: "PEAD_NAT_500x3000_40_100", materialCode: "PEAD_NATURAL", standardWidthMm: 500, standardLengthMm: 3000, availableThicknessesMm: T(40, 100), fullSheetPricePerMm: 90, cutPricePerKg: 75, cutStatus: "ALLOWED" },

  // ── PEAD PRETO ──
  { id: "PEAD_PRE_1000x2000_1", materialCode: "PEAD_PRETO", standardWidthMm: 1000, standardLengthMm: 2000, availableThicknessesMm: [1], fullSheetPricePerMm: 90, cutPricePerKg: null, cutStatus: "NT" },
  { id: "PEAD_PRE_1000x2000_2_30", materialCode: "PEAD_PRETO", standardWidthMm: 1000, standardLengthMm: 2000, availableThicknessesMm: T(2, 30), fullSheetPricePerMm: 80, cutPricePerKg: 80, cutStatus: "ALLOWED" },
  { id: "PEAD_PRE_1000x3000_3_30", materialCode: "PEAD_PRETO", standardWidthMm: 1000, standardLengthMm: 3000, availableThicknessesMm: T(3, 30), fullSheetPricePerMm: 120, cutPricePerKg: 80, cutStatus: "ALLOWED" },

  // ── POLIACETAL NATURAL ──
  { id: "POM_NAT_1000x3000", materialCode: "POLIACETAL_NATURAL", standardWidthMm: 1000, standardLengthMm: 3000, availableThicknessesMm: T(6, 100), fullSheetPricePerMm: 270, cutPricePerKg: 95, cutStatus: "ALLOWED" },
  { id: "POM_NAT_500x3000", materialCode: "POLIACETAL_NATURAL", standardWidthMm: 500, standardLengthMm: 3000, availableThicknessesMm: T(6, 100), fullSheetPricePerMm: 150, cutPricePerKg: 95, cutStatus: "ALLOWED" },

  // ── POLIACETAL PRETO ──
  { id: "POM_PRE_1000x3000", materialCode: "POLIACETAL_PRETO", standardWidthMm: 1000, standardLengthMm: 3000, availableThicknessesMm: T(6, 30), fullSheetPricePerMm: 280, cutPricePerKg: 100, cutStatus: "ALLOWED" },
  { id: "POM_PRE_500x3000", materialCode: "POLIACETAL_PRETO", standardWidthMm: 500, standardLengthMm: 3000, availableThicknessesMm: [8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100], fullSheetPricePerMm: 140, cutPricePerKg: 100, cutStatus: "ALLOWED" },

  // ── UHMW ──
  { id: "UHMW_1000x3000", materialCode: "UHMW", standardWidthMm: 1000, standardLengthMm: 3000, availableThicknessesMm: T(6, 100), fullSheetPricePerMm: 220, cutPricePerKg: 110, cutStatus: "ALLOWED" },
  { id: "UHMW_1220x3050", materialCode: "UHMW", standardWidthMm: 1220, standardLengthMm: 3050, availableThicknessesMm: T(6, 100), fullSheetPricePerMm: 265, cutPricePerKg: 110, cutStatus: "ALLOWED" },

  // ── PTFE / TEFLON ──
  { id: "PTFE_1000x1000_THIN", materialCode: "PTFE", standardWidthMm: 1000, standardLengthMm: 1000, availableThicknessesMm: [0.3, 0.5, 1, 1.2, 1.5], fullSheetPricePerMm: 480, cutPricePerKg: null, cutStatus: "NT" },
  { id: "PTFE_1000x1000_2_30", materialCode: "PTFE", standardWidthMm: 1000, standardLengthMm: 1000, availableThicknessesMm: T(2, 30), fullSheetPricePerMm: 430, cutPricePerKg: 230, cutStatus: "ALLOWED" },
  { id: "PTFE_500x500", materialCode: "PTFE", standardWidthMm: 500, standardLengthMm: 500, availableThicknessesMm: T(3, 60), fullSheetPricePerMm: 110, cutPricePerKg: 230, cutStatus: "ALLOWED" },

  // ── ACRÍLICO ──
  { id: "ACRILICO_1000x2000", materialCode: "ACRILICO", standardWidthMm: 1000, standardLengthMm: 2000, availableThicknessesMm: T(2, 25), fullSheetPricePerMm: 120, cutPricePerKg: 80, cutStatus: "ALLOWED" },
  { id: "ACRILICO_1220x2440", materialCode: "ACRILICO", standardWidthMm: 1220, standardLengthMm: 2440, availableThicknessesMm: T(2, 10), fullSheetPricePerMm: 180, cutPricePerKg: 80, cutStatus: "ALLOWED" },
  { id: "ACRILICO_2000x3000", materialCode: "ACRILICO", standardWidthMm: 2000, standardLengthMm: 3000, availableThicknessesMm: T(2, 6), fullSheetPricePerMm: 360, cutPricePerKg: 80, cutStatus: "ALLOWED" },

  // ── POLICARBONATO ──
  { id: "PC_1000x2000", materialCode: "POLICARBONATO", standardWidthMm: 1000, standardLengthMm: 2000, availableThicknessesMm: T(2, 12), fullSheetPricePerMm: 130, cutPricePerKg: 95, cutStatus: "ALLOWED" },
  { id: "PC_1220x2440", materialCode: "POLICARBONATO", standardWidthMm: 1220, standardLengthMm: 2440, availableThicknessesMm: T(2, 12), fullSheetPricePerMm: 195, cutPricePerKg: 95, cutStatus: "ALLOWED" },
  { id: "PC_1220x3000", materialCode: "POLICARBONATO", standardWidthMm: 1220, standardLengthMm: 3000, availableThicknessesMm: T(2, 12), fullSheetPricePerMm: 235, cutPricePerKg: 95, cutStatus: "ALLOWED" },
  { id: "PC_2000x3000", materialCode: "POLICARBONATO", standardWidthMm: 2000, standardLengthMm: 3000, availableThicknessesMm: T(2, 10), fullSheetPricePerMm: 390, cutPricePerKg: 95, cutStatus: "ALLOWED" },

  // ── PETG ──
  { id: "PETG_1000x2000_THIN", materialCode: "PETG", standardWidthMm: 1000, standardLengthMm: 2000, availableThicknessesMm: [0.5, 1, 1.2, 1.5], fullSheetPricePerMm: 240, cutPricePerKg: null, cutStatus: "NT" },
  { id: "PETG_1000x2000_2_6", materialCode: "PETG", standardWidthMm: 1000, standardLengthMm: 2000, availableThicknessesMm: T(2, 6), fullSheetPricePerMm: 130, cutPricePerKg: 95, cutStatus: "ALLOWED" },

  // ── PSAI PRETO/BRANCO ──
  { id: "PSAI_PB_1000x2000_THIN", materialCode: "PSAI_PB", standardWidthMm: 1000, standardLengthMm: 2000, availableThicknessesMm: [0.5, 1, 1.2, 1.5], fullSheetPricePerMm: 80, cutPricePerKg: null, cutStatus: "NT" },
  { id: "PSAI_PB_1000x2000_2_6", materialCode: "PSAI_PB", standardWidthMm: 1000, standardLengthMm: 2000, availableThicknessesMm: T(2, 6), fullSheetPricePerMm: 60, cutPricePerKg: 60, cutStatus: "ALLOWED" },

  // ── PSAI COLORIDO ──
  { id: "PSAI_COL_1000x2000", materialCode: "PSAI_COLORIDO", standardWidthMm: 1000, standardLengthMm: 2000, availableThicknessesMm: T(2, 6), fullSheetPricePerMm: 80, cutPricePerKg: 60, cutStatus: "ALLOWED" },

  // ── PSAI CRISTAL ──
  { id: "PSAI_CRIS_1000x2000", materialCode: "PSAI_CRISTAL", standardWidthMm: 1000, standardLengthMm: 2000, availableThicknessesMm: T(2, 6), fullSheetPricePerMm: 80, cutPricePerKg: 70, cutStatus: "ALLOWED" },
  { id: "PSAI_CRIS_1220x3000", materialCode: "PSAI_CRISTAL", standardWidthMm: 1220, standardLengthMm: 3000, availableThicknessesMm: [2, 3], fullSheetPricePerMm: 150, cutPricePerKg: 70, cutStatus: "ALLOWED" },

  // ── PSAI LUMINOSO ──
  { id: "PSAI_LUM_1000x2000", materialCode: "PSAI_LUMINOSO", standardWidthMm: 1000, standardLengthMm: 2000, availableThicknessesMm: T(2, 6), fullSheetPricePerMm: 80, cutPricePerKg: 70, cutStatus: "ALLOWED" },

  // ── PVC RÍGIDO ──
  { id: "PVC_RIG_1000x2000", materialCode: "PVC_RIGIDO", standardWidthMm: 1000, standardLengthMm: 2000, availableThicknessesMm: T(2, 30), fullSheetPricePerMm: 180, cutPricePerKg: 98, cutStatus: "ALLOWED" },

  // ── TVE ──
  { id: "TVE_1020x1020", materialCode: "TVE", standardWidthMm: 1020, standardLengthMm: 1020, availableThicknessesMm: [0.6, 1, 1.2, 1.5, 2, 3], fullSheetPricePerMm: 500, cutPricePerKg: null, cutStatus: "NT" },
  { id: "TVE_1020x2040", materialCode: "TVE", standardWidthMm: 1020, standardLengthMm: 2040, availableThicknessesMm: [0.5, 1, 1.5, 2, 3], fullSheetPricePerMm: 950, cutPricePerKg: null, cutStatus: "NT" },

  // ── FENOLITE ──
  { id: "FENOLITE_1000x1240_THIN", materialCode: "FENOLITE", standardWidthMm: 1000, standardLengthMm: 1240, availableThicknessesMm: [0.6, 1, 1.6], fullSheetPricePerMm: 150, cutPricePerKg: null, cutStatus: "NT" },
  { id: "FENOLITE_1000x1240_2_30", materialCode: "FENOLITE", standardWidthMm: 1000, standardLengthMm: 1240, availableThicknessesMm: T(2, 30), fullSheetPricePerMm: 98, cutPricePerKg: 120, cutStatus: "ALLOWED" },

  // ── CELERON ──
  { id: "CELERON_1000x1000_THIN", materialCode: "CELERON", standardWidthMm: 1000, standardLengthMm: 1000, availableThicknessesMm: [0.6, 1, 1.6], fullSheetPricePerMm: 150, cutPricePerKg: null, cutStatus: "NT" },
  { id: "CELERON_1000x1000_2_70", materialCode: "CELERON", standardWidthMm: 1000, standardLengthMm: 1000, availableThicknessesMm: T(2, 70), fullSheetPricePerMm: 110, cutPricePerKg: 95, cutStatus: "ALLOWED" },

  // ── CELERON MALHA FINA ──
  { id: "CELERON_MF_1000x1000", materialCode: "CELERON_MF", standardWidthMm: 1000, standardLengthMm: 1000, availableThicknessesMm: T(2, 70), fullSheetPricePerMm: 140, cutPricePerKg: 140, cutStatus: "ALLOWED" },

  // ── PU ──
  { id: "PU_1000x1000_1_2", materialCode: "PU", standardWidthMm: 1000, standardLengthMm: 1000, availableThicknessesMm: [1, 1.2, 1.5, 1.6, 2], fullSheetPricePerMm: 180, cutPricePerKg: null, cutStatus: "NT" },
  { id: "PU_1000x1000_3", materialCode: "PU", standardWidthMm: 1000, standardLengthMm: 1000, availableThicknessesMm: [3], fullSheetPricePerMm: 180, cutPricePerKg: 130, cutStatus: "ALLOWED" },
  { id: "PU_1000x1000_4_70", materialCode: "PU", standardWidthMm: 1000, standardLengthMm: 1000, availableThicknessesMm: T(4, 70), fullSheetPricePerMm: 150, cutPricePerKg: 130, cutStatus: "ALLOWED" },

  // ── PVC EXPANDIDO ──
  { id: "PVC_EXP_1220x2440", materialCode: "PVC_EXPANDIDO", standardWidthMm: 1220, standardLengthMm: 2440, availableThicknessesMm: T(2, 30), fullSheetPricePerMm: 35, cutPricePerKg: null, cutStatus: "NT" },
];

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
