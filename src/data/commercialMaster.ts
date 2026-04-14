/**
 * ═══════════════════════════════════════════════════════════════
 * BASE COMERCIAL UNIFICADA — FONTE ÚNICA DE VERDADE
 * Origem: "Dados de Preço Placas e Tarugos.xlsx"
 * Última atualização: 2026-03-24
 * ═══════════════════════════════════════════════════════════════
 *
 * Este arquivo concentra todos os dados comerciais de PLACAS e
 * TARUGOS. Os módulos placaCatalog.ts, materials.ts e pricingRules.ts
 * derivam suas estruturas a partir daqui.
 *
 * NÃO lê xlsx em runtime. Todos os dados já estão normalizados.
 */

// ──────────────────────────────────────────────
// Tipos
// ──────────────────────────────────────────────

export type CommercialStatus = "FIXED_PRICE" | "UNAVAILABLE" | "CONSULT_REQUIRED";

export interface CommercialPlateMaterial {
  code: string;
  displayName: string;
  density: number | null;
  active: boolean;
}

export interface CommercialRodMaterial {
  code: string;
  displayName: string;
  baseMaterial: string;
  density: number;
  active: boolean;
}

export interface CommercialPlateRow {
  sheetRow: number;
  materialCode: string;
  sourceMaterial: string;
  sourceProductCode: string | null;
  patternMm: string;
  availableMmRaw: string | number;
  fullSheetPricePerMm: number;
  cutPriceRaw: number | "NT";
}

export interface CommercialRodRow {
  sheetRow: number;
  materialCode: string;
  sourceMaterial: string;
  commercialType: "INTEIRO" | "CORTE";
  below20: number | string;
  from20to150: number | string;
  from151to200: number | string;
  above200: number | string;
}

// ──────────────────────────────────────────────
// Densidades oficiais
// ──────────────────────────────────────────────

export const plateDensities: Record<string, number | null> = {
  ACRILICO: 1.25,
  CELERON: 1.45,
  CELERON_MF: 1.45,
  FENOLITE: 1.35,
  NYLON: 1.32,
  PEAD_NATURAL: 1.0,
  PEAD_PRETO: 1.0,
  PETG: 1.27,
  POLIACETAL_NATURAL: 1.53,
  POLIACETAL_PRETO: 1.53,
  POLICARBONATO: 1.25,
  PP_NATURAL: 0.97,
  PP_PRETO: 0.97,
  PSAI_COLORIDO: 1.06,
  PSAI_CRISTAL: 1.06,
  PSAI_LUMINOSO: 1.06,
  PSAI_PB: 1.06,
  PU: 1.25,
  PVC_EXPANDIDO: null,
  PVC_RIGIDO: 1.5,
  TVE: 1.35,
  PTFE: 2.3,
  UHMW: 0.95,
};

export const rodDensities: Record<string, number> = {
  NYLON_NATURAL: 1.32,
  POLIPROPILENO_NATURAL: 1.0,
  PEAD_NATURAL: 1.0,
  POLIACETAL_NATURAL: 1.53,
  CELERON: 1.45,
  PVC: 1.5,
  TECAST: 1.32,
  TECAST_L: 1.32,
  TECAST_TM: 1.32,
  UHMW: 1.0,
  TEFLON: 2.3,
  POLIURETANO_PU: 1.25,
  NYLON_66: 1.32,
  ACRILICO: 1.25,
};

// ──────────────────────────────────────────────
// Materiais
// ──────────────────────────────────────────────

export const masterPlateMaterials: CommercialPlateMaterial[] = [
  { code: "ACRILICO", displayName: "Acrílico", density: 1.25, active: true },
  { code: "CELERON", displayName: "Celeron", density: 1.45, active: true },
  { code: "CELERON_MF", displayName: "Celeron Malha Fina", density: 1.45, active: true },
  { code: "FENOLITE", displayName: "Fenolite", density: 1.35, active: true },
  { code: "NYLON", displayName: "Nylon", density: 1.32, active: true },
  { code: "PEAD_NATURAL", displayName: "PEAD Natural", density: 1.00, active: true },
  { code: "PEAD_PRETO", displayName: "PEAD Preto", density: 1.00, active: true },
  { code: "PETG", displayName: "PETG", density: 1.27, active: true },
  { code: "POLIACETAL_NATURAL", displayName: "Poliacetal Natural", density: 1.53, active: true },
  { code: "POLIACETAL_PRETO", displayName: "Poliacetal Preto", density: 1.53, active: true },
  { code: "POLICARBONATO", displayName: "Policarbonato", density: 1.25, active: true },
  { code: "PP_NATURAL", displayName: "Polipropileno Natural", density: 0.97, active: true },
  { code: "PP_PRETO", displayName: "Polipropileno Preto", density: 0.97, active: true },
  { code: "PSAI_COLORIDO", displayName: "PSAI Colorido", density: 1.06, active: true },
  { code: "PSAI_CRISTAL", displayName: "PSAI Cristal", density: 1.06, active: true },
  { code: "PSAI_LUMINOSO", displayName: "PSAI Luminoso", density: 1.06, active: true },
  { code: "PSAI_PB", displayName: "PSAI Preto/Branco", density: 1.06, active: true },
  { code: "PU", displayName: "PU", density: 1.25, active: true },
  { code: "PVC_EXPANDIDO", displayName: "PVC Expandido", density: null, active: true },
  { code: "PVC_RIGIDO", displayName: "PVC Rígido", density: 1.50, active: true },
  { code: "PTFE", displayName: "PTFE / Teflon", density: 2.30, active: true },
  { code: "TVE", displayName: "TVE", density: 1.35, active: true },
  { code: "UHMW", displayName: "UHMW", density: 0.95, active: true },
];

export const masterRodMaterials: CommercialRodMaterial[] = [
  { code: "NYLON_NATURAL", displayName: "Nylon natural", baseMaterial: "NYLON", density: 1.32, active: true },
  { code: "POLIPROPILENO_NATURAL", displayName: "Polipropileno natural", baseMaterial: "PP", density: 1.00, active: true },
  { code: "PEAD_NATURAL", displayName: "PEAD natural", baseMaterial: "PEAD", density: 1.00, active: true },
  { code: "POLIACETAL_NATURAL", displayName: "Poliacetal natural", baseMaterial: "POLIACETAL", density: 1.53, active: true },
  { code: "CELERON", displayName: "Celeron", baseMaterial: "CELERON", density: 1.45, active: true },
  { code: "PVC", displayName: "PVC", baseMaterial: "PVC", density: 1.50, active: true },
  { code: "TECAST", displayName: "Tecast", baseMaterial: "TECAST", density: 1.32, active: true },
  { code: "TECAST_L", displayName: "Tecast L", baseMaterial: "TECAST_L", density: 1.32, active: true },
  { code: "TECAST_TM", displayName: "Tecast TM", baseMaterial: "TECAST_TM", density: 1.32, active: true },
  { code: "UHMW", displayName: "UHMW", baseMaterial: "UHMW", density: 1.00, active: true },
  { code: "TEFLON", displayName: "Teflon", baseMaterial: "TEFLON", density: 2.30, active: true },
  { code: "POLIURETANO_PU", displayName: "Poliuretano PU", baseMaterial: "POLIURETANO", density: 1.25, active: true },
  { code: "NYLON_66", displayName: "Nylon 6.6", baseMaterial: "NYLON_66", density: 1.32, active: true },
  { code: "ACRILICO", displayName: "Acrílico", baseMaterial: "ACRILICO", density: 1.25, active: true },
];

// ──────────────────────────────────────────────
// Dados brutos — Placas (1 registro = 1 linha da planilha)
// ──────────────────────────────────────────────

export const masterPlateRows: CommercialPlateRow[] = [
  { sheetRow: 2, materialCode: "ACRILICO", sourceMaterial: "Acrílico (1,25 g/cm²)", sourceProductCode: "PACO**", patternMm: "1000 x 2000", availableMmRaw: "02 a 25", fullSheetPricePerMm: 130, cutPriceRaw: 90 },
  { sheetRow: 3, materialCode: "ACRILICO", sourceMaterial: "Acrílico (1,25 g/cm²)", sourceProductCode: "PAC1**", patternMm: "1220 x 2440", availableMmRaw: "02 a 10", fullSheetPricePerMm: 195, cutPriceRaw: 90 },
  { sheetRow: 4, materialCode: "ACRILICO", sourceMaterial: "Acrílico (1,25 g/cm²)", sourceProductCode: "PAC2**", patternMm: "2000 x 3000", availableMmRaw: "02 a 06", fullSheetPricePerMm: 390, cutPriceRaw: 90 },
  { sheetRow: 5, materialCode: "CELERON", sourceMaterial: "Celeron (1,45 g/cm²)", sourceProductCode: "PCE0**", patternMm: "1000 X 1000", availableMmRaw: "0,60, 01 e 1,6", fullSheetPricePerMm: 180, cutPriceRaw: "NT" },
  { sheetRow: 6, materialCode: "CELERON", sourceMaterial: "Celeron (1,45 g/cm²)", sourceProductCode: "PCE0**", patternMm: "1000 X 1000", availableMmRaw: "02 a 70", fullSheetPricePerMm: 130, cutPriceRaw: 95 },
  { sheetRow: 7, materialCode: "CELERON_MF", sourceMaterial: "Celeron Malha Fina(1,45 g/cm²)", sourceProductCode: "PCE0**", patternMm: "1000 X 1000", availableMmRaw: "02 a 70", fullSheetPricePerMm: 180, cutPriceRaw: 140 },
  { sheetRow: 8, materialCode: "FENOLITE", sourceMaterial: "Fenolite (1,35 g/cm²)", sourceProductCode: "PFE0**", patternMm: "1000 X 1240", availableMmRaw: "0,60; 01 e 1,6", fullSheetPricePerMm: 180, cutPriceRaw: "NT" },
  { sheetRow: 9, materialCode: "FENOLITE", sourceMaterial: "Fenolite (1,35 g/cm²)", sourceProductCode: "PFE0**", patternMm: "1000 X 1240", availableMmRaw: "02 a 30", fullSheetPricePerMm: 110, cutPriceRaw: 120 },
  { sheetRow: 10, materialCode: "NYLON", sourceMaterial: "Nylon (1,32 g/cm²)", sourceProductCode: "PNY0**", patternMm: "1000 x 2000", availableMmRaw: "06 a 100", fullSheetPricePerMm: 210, cutPriceRaw: 100 },
  { sheetRow: 11, materialCode: "NYLON", sourceMaterial: "Nylon (1,32 g/cm²)", sourceProductCode: "PNY1**", patternMm: "1000 x 3000", availableMmRaw: "06 a 100", fullSheetPricePerMm: 315, cutPriceRaw: 100 },
  { sheetRow: 12, materialCode: "NYLON", sourceMaterial: "Nylon (1,32 g/cm²)", sourceProductCode: "PNY2**", patternMm: "500 x 3000", availableMmRaw: "06 a 100", fullSheetPricePerMm: 150, cutPriceRaw: 100 },
  { sheetRow: 13, materialCode: "PEAD_NATURAL", sourceMaterial: "PEAD Polietileno (1  g/cm²)", sourceProductCode: "PPE0**", patternMm: "1000 x 2000", availableMmRaw: 1, fullSheetPricePerMm: 90, cutPriceRaw: "NT" },
  { sheetRow: 14, materialCode: "PEAD_NATURAL", sourceMaterial: "PEAD Polietileno (1  g/cm²)", sourceProductCode: "PPE0**", patternMm: "1000 x 2000", availableMmRaw: "02 a 30", fullSheetPricePerMm: 85, cutPriceRaw: 70 },
  { sheetRow: 15, materialCode: "PEAD_NATURAL", sourceMaterial: "PEAD Polietileno (1  g/cm²)", sourceProductCode: "PPE1**", patternMm: "1000 x 3000", availableMmRaw: "03 a 30", fullSheetPricePerMm: 130, cutPriceRaw: 70 },
  { sheetRow: 16, materialCode: "PEAD_NATURAL", sourceMaterial: "PEAD Polietileno (1  g/cm²)", sourceProductCode: "PPE**", patternMm: "1000 x 3000", availableMmRaw: "40 a 100", fullSheetPricePerMm: 180, cutPriceRaw: 85 },
  { sheetRow: 17, materialCode: "PEAD_NATURAL", sourceMaterial: "PEAD Polietileno (1  g/cm²)", sourceProductCode: "PPE2**", patternMm: "500 x 3000", availableMmRaw: "40 a 100", fullSheetPricePerMm: 90, cutPriceRaw: 85 },
  { sheetRow: 18, materialCode: "PEAD_PRETO", sourceMaterial: "PEAD Polietileno Preto (1  g/cm²)", sourceProductCode: "PPE0**P", patternMm: "1000 x 2000", availableMmRaw: 1, fullSheetPricePerMm: 100, cutPriceRaw: "NT" },
  { sheetRow: 19, materialCode: "PEAD_PRETO", sourceMaterial: "PEAD Polietileno Preto (1  g/cm²)", sourceProductCode: "PPE0**P", patternMm: "1000 x 2000", availableMmRaw: "02 a 30", fullSheetPricePerMm: 95, cutPriceRaw: 90 },
  { sheetRow: 20, materialCode: "PEAD_PRETO", sourceMaterial: "PEAD Polietileno Preto (1  g/cm²)", sourceProductCode: "PPE1**P", patternMm: "1000 x 3000", availableMmRaw: "03 a 30", fullSheetPricePerMm: 142, cutPriceRaw: 90 },
  { sheetRow: 21, materialCode: "PETG", sourceMaterial: "PETG (1,27 g/cm²)", sourceProductCode: "PPETG0**", patternMm: "1000 X 2000", availableMmRaw: "0,5 a 1,5", fullSheetPricePerMm: 260, cutPriceRaw: "NT" },
  { sheetRow: 22, materialCode: "PETG", sourceMaterial: "PETG (1,27 g/cm²)", sourceProductCode: "PPETG0**", patternMm: "1000 X 2000", availableMmRaw: "02 a 06", fullSheetPricePerMm: 140, cutPriceRaw: 120 },
  { sheetRow: 23, materialCode: "POLIACETAL_NATURAL", sourceMaterial: "Poliacetal (1 g/cm²)", sourceProductCode: "PPOM0**", patternMm: "1000 x 3000", availableMmRaw: "06 a 100", fullSheetPricePerMm: 270, cutPriceRaw: 110 },
  { sheetRow: 24, materialCode: "POLIACETAL_NATURAL", sourceMaterial: "Poliacetal (1 g/cm²)", sourceProductCode: "PPOM1**", patternMm: "500 x 3000", availableMmRaw: "06 a 100", fullSheetPricePerMm: 150, cutPriceRaw: 110 },
  { sheetRow: 25, materialCode: "POLIACETAL_PRETO", sourceMaterial: "Poliacetal Preto (1 g/cm²)", sourceProductCode: "PPOM0**P", patternMm: "1000 x 3000", availableMmRaw: "06 a 30", fullSheetPricePerMm: 340, cutPriceRaw: 120 },
  { sheetRow: 26, materialCode: "POLIACETAL_PRETO", sourceMaterial: "Poliacetal Preto (1 g/cm²)", sourceProductCode: "PPOM1**P", patternMm: "500 x 3000", availableMmRaw: "08 a 100", fullSheetPricePerMm: 170, cutPriceRaw: 120 },
  { sheetRow: 27, materialCode: "POLICARBONATO", sourceMaterial: "Policarbonato (1,25 g/cm²)", sourceProductCode: "PPCO**", patternMm: "1000 x 2000", availableMmRaw: "02 a 12", fullSheetPricePerMm: 140, cutPriceRaw: 100 },
  { sheetRow: 28, materialCode: "POLICARBONATO", sourceMaterial: "Policarbonato (1,25 g/cm²)", sourceProductCode: "PPC1**", patternMm: "1220 X 2440", availableMmRaw: "02 a 12", fullSheetPricePerMm: 210, cutPriceRaw: 100 },
  { sheetRow: 29, materialCode: "POLICARBONATO", sourceMaterial: "Policarbonato (1,25 g/cm²)", sourceProductCode: "PPC3**", patternMm: "1220 x 3000", availableMmRaw: "02 a 12", fullSheetPricePerMm: 255, cutPriceRaw: 100 },
  { sheetRow: 30, materialCode: "POLICARBONATO", sourceMaterial: "Policarbonato (1,25 g/cm²)", sourceProductCode: "PPC2**", patternMm: "2000 X 3000", availableMmRaw: "02 a 10", fullSheetPricePerMm: 420, cutPriceRaw: 100 },
  { sheetRow: 31, materialCode: "PP_NATURAL", sourceMaterial: "Polipropileno (0,97 g/cm²)", sourceProductCode: "PPP0**", patternMm: "1000 x 2000", availableMmRaw: 1, fullSheetPricePerMm: 90, cutPriceRaw: "NT" },
  { sheetRow: 32, materialCode: "PP_NATURAL", sourceMaterial: "Polipropileno (0,97 g/cm²)", sourceProductCode: "PPP0**", patternMm: "1000 x 2000", availableMmRaw: "02 a 30", fullSheetPricePerMm: 90, cutPriceRaw: 70 },
  { sheetRow: 33, materialCode: "PP_NATURAL", sourceMaterial: "Polipropileno (0,97 g/cm²)", sourceProductCode: "PPP1**", patternMm: "1000 x 3000", availableMmRaw: "03 a 30", fullSheetPricePerMm: 135, cutPriceRaw: 70 },
  { sheetRow: 34, materialCode: "PP_NATURAL", sourceMaterial: "Polipropileno (0,97 g/cm²)", sourceProductCode: "PPP3**", patternMm: "1300 x 4000", availableMmRaw: "03 a 10", fullSheetPricePerMm: 230, cutPriceRaw: 70 },
  { sheetRow: 35, materialCode: "PP_NATURAL", sourceMaterial: "Polipropileno (0,97 g/cm²)", sourceProductCode: "PPP4**", patternMm: "1000 x 3000", availableMmRaw: "40 a 100", fullSheetPricePerMm: 180, cutPriceRaw: 80 },
  { sheetRow: 36, materialCode: "PP_NATURAL", sourceMaterial: "Polipropileno (0,97 g/cm²)", sourceProductCode: "PPP5**", patternMm: "500 x 3000", availableMmRaw: "40 a 100", fullSheetPricePerMm: 90, cutPriceRaw: 80 },
  { sheetRow: 37, materialCode: "PP_PRETO", sourceMaterial: "Polipropileno Preto (0,97 g/cm²)", sourceProductCode: "PPP0**P", patternMm: "1000 x 2000", availableMmRaw: 1, fullSheetPricePerMm: 90, cutPriceRaw: "NT" },
  { sheetRow: 38, materialCode: "PP_PRETO", sourceMaterial: "Polipropileno Preto (0,97 g/cm²)", sourceProductCode: "PPP0**P", patternMm: "1000 x 2000", availableMmRaw: "02 a 30", fullSheetPricePerMm: 80, cutPriceRaw: 80 },
  { sheetRow: 39, materialCode: "PP_PRETO", sourceMaterial: "Polipropileno Preto (0,97 g/cm²)", sourceProductCode: "PPP1**P", patternMm: "1000 x 3000", availableMmRaw: "03 a 30", fullSheetPricePerMm: 120, cutPriceRaw: 80 },
  { sheetRow: 40, materialCode: "PP_PRETO", sourceMaterial: "Polipropileno Preto (0,97 g/cm²)", sourceProductCode: "PPP3**P", patternMm: "1300 x 4000", availableMmRaw: "03 a 10", fullSheetPricePerMm: 210, cutPriceRaw: 80 },
  { sheetRow: 41, materialCode: "PP_PRETO", sourceMaterial: "Polipropileno Preto (0,97 g/cm²)", sourceProductCode: "PPP4**P", patternMm: "1000 x 4000", availableMmRaw: "12, 15, 20,25 e 30", fullSheetPricePerMm: 160, cutPriceRaw: 80 },
  { sheetRow: 42, materialCode: "PSAI_COLORIDO", sourceMaterial: "PSAI Colorido (1,06 g/cm²)", sourceProductCode: "PPS0**CL", patternMm: "1000 X 2000", availableMmRaw: "02 a 06", fullSheetPricePerMm: 90, cutPriceRaw: 70 },
  { sheetRow: 43, materialCode: "PSAI_CRISTAL", sourceMaterial: "PSAI Cristal (1,06 g/cm²)", sourceProductCode: "PPS0**C", patternMm: "1000 X 2000", availableMmRaw: "02 a 06", fullSheetPricePerMm: 90, cutPriceRaw: 70 },
  { sheetRow: 44, materialCode: "PSAI_CRISTAL", sourceMaterial: "PSAI Cristal (1,06 g/cm²)", sourceProductCode: "PPS1**C", patternMm: "1220 x 3000", availableMmRaw: "02 a 03", fullSheetPricePerMm: 170, cutPriceRaw: 70 },
  { sheetRow: 45, materialCode: "PSAI_LUMINOSO", sourceMaterial: "PSAI Luminoso (1,06 g/cm²)", sourceProductCode: "PPS0**L", patternMm: "1000 X 2000", availableMmRaw: "02 a 06", fullSheetPricePerMm: 90, cutPriceRaw: 70 },
  { sheetRow: 46, materialCode: "PSAI_PB", sourceMaterial: "PSAI Preto/Branco (1,06 g/cm²)", sourceProductCode: "PPS0**", patternMm: "1000 X 2000", availableMmRaw: "0,5 X 1,5", fullSheetPricePerMm: 90, cutPriceRaw: "NT" },
  { sheetRow: 47, materialCode: "PSAI_PB", sourceMaterial: "PSAI Preto/Branco (1,06 g/cm²)", sourceProductCode: "PPS0**", patternMm: "1000 X 2000", availableMmRaw: "02 a 06", fullSheetPricePerMm: 70, cutPriceRaw: 70 },
  { sheetRow: 48, materialCode: "PU", sourceMaterial: "PU (1,25 g/cm²)", sourceProductCode: "PPU0**", patternMm: "1000 X 1000", availableMmRaw: "01 a 03", fullSheetPricePerMm: 190, cutPriceRaw: "NT" },
  { sheetRow: 49, materialCode: "PU", sourceMaterial: "PU (1,25 g/cm²)", sourceProductCode: "PPU0**", patternMm: "1000 X 1000", availableMmRaw: "04 a 70", fullSheetPricePerMm: 160, cutPriceRaw: 140 },
  { sheetRow: 50, materialCode: "PU", sourceMaterial: "PU (1,25 g/cm²)", sourceProductCode: "PPU0**", patternMm: "1000 X 1000", availableMmRaw: "03 a 30", fullSheetPricePerMm: 180, cutPriceRaw: "NT" },
  { sheetRow: 51, materialCode: "PVC_EXPANDIDO", sourceMaterial: "PVC Expandido", sourceProductCode: null, patternMm: "1220 x 2440", availableMmRaw: "02 a 30", fullSheetPricePerMm: 50, cutPriceRaw: "NT" },
  { sheetRow: 52, materialCode: "PVC_RIGIDO", sourceMaterial: "PVC Rígido", sourceProductCode: "PPVC**P", patternMm: "1000 X 2000", availableMmRaw: "02 a 30", fullSheetPricePerMm: 180, cutPriceRaw: 110 },
  { sheetRow: 53, materialCode: "TVE", sourceMaterial: "Tecido Fibra de Vidro (1,35 g/cm²)", sourceProductCode: "PTV0**", patternMm: "1020 X 1020", availableMmRaw: "0,6; 1;1,2; 1,5; 2 ou 3", fullSheetPricePerMm: 600, cutPriceRaw: "NT" },
  { sheetRow: 54, materialCode: "TVE", sourceMaterial: "Tecido Fibra de Vidro (1,35 g/cm²)", sourceProductCode: "PTVE1**", patternMm: "1020 X 2040", availableMmRaw: "0,5; 1; 1,5; 2 ou 3", fullSheetPricePerMm: 1100, cutPriceRaw: "NT" },
  { sheetRow: 55, materialCode: "PTFE", sourceMaterial: "Teflon (2,3 g/cm²)", sourceProductCode: "PPTFE0**", patternMm: "1000 x 1000", availableMmRaw: "02 a 30", fullSheetPricePerMm: 430, cutPriceRaw: 230 },
  { sheetRow: 56, materialCode: "PTFE", sourceMaterial: "Teflon (2,3 g/cm²)", sourceProductCode: "PPTFE**", patternMm: "1000 x 1000", availableMmRaw: "0,3 a 1,5", fullSheetPricePerMm: 480, cutPriceRaw: "NT" },
  { sheetRow: 57, materialCode: "PTFE", sourceMaterial: "Teflon (2,3 g/cm²)", sourceProductCode: "PPTFE1**", patternMm: "500 X 500", availableMmRaw: "03 a 60", fullSheetPricePerMm: 110, cutPriceRaw: 230 },
  { sheetRow: 58, materialCode: "UHMW", sourceMaterial: "UHMW (0,95 g/cm²)", sourceProductCode: "PUHMW0**", patternMm: "1000 x 3000", availableMmRaw: "06 a 100", fullSheetPricePerMm: 220, cutPriceRaw: 110 },
  { sheetRow: 59, materialCode: "UHMW", sourceMaterial: "UHMW (0,95 g/cm²)", sourceProductCode: "PUHMW1**", patternMm: "1220 x 3050", availableMmRaw: "06 a 100", fullSheetPricePerMm: 265, cutPriceRaw: 110 },
];

// ──────────────────────────────────────────────
// Dados brutos — Tarugos (1 registro = 1 linha da planilha)
// ──────────────────────────────────────────────

export const masterRodRows: CommercialRodRow[] = [
  { sheetRow: 2, materialCode: "NYLON_NATURAL", sourceMaterial: "Nylon natural", commercialType: "INTEIRO", below20: 75, from20to150: 60, above150: 65 },
  { sheetRow: 3, materialCode: "NYLON_NATURAL", sourceMaterial: "Nylon natural", commercialType: "CORTE", below20: 80, from20to150: 70, above150: 75 },
  { sheetRow: 4, materialCode: "POLIPROPILENO_NATURAL", sourceMaterial: "Polipropileno natural", commercialType: "INTEIRO", below20: 60, from20to150: 50, above150: 68 },
  { sheetRow: 5, materialCode: "POLIPROPILENO_NATURAL", sourceMaterial: "Polipropileno natural", commercialType: "CORTE", below20: 65, from20to150: 55, above150: 68 },
  { sheetRow: 6, materialCode: "PEAD_NATURAL", sourceMaterial: "PEAD natural", commercialType: "INTEIRO", below20: 60, from20to150: 50, above150: 65 },
  { sheetRow: 7, materialCode: "PEAD_NATURAL", sourceMaterial: "PEAD natural", commercialType: "CORTE", below20: 65, from20to150: 60, above150: 70 },
  { sheetRow: 8, materialCode: "POLIACETAL_NATURAL", sourceMaterial: "Poliacetal natural", commercialType: "INTEIRO", below20: 70, from20to150: 60, above150: 70 },
  { sheetRow: 9, materialCode: "POLIACETAL_NATURAL", sourceMaterial: "Poliacetal natural", commercialType: "CORTE", below20: 75, from20to150: 65, above150: 75 },
  { sheetRow: 10, materialCode: "CELERON", sourceMaterial: "Celeron", commercialType: "INTEIRO", below20: 215, from20to150: 200, above150: 190 },
  { sheetRow: 11, materialCode: "CELERON", sourceMaterial: "Celeron", commercialType: "CORTE", below20: 270, from20to150: 240, above150: 250 },
  { sheetRow: 12, materialCode: "PVC", sourceMaterial: "PVC", commercialType: "INTEIRO", below20: 85, from20to150: 70, above150: 75 },
  { sheetRow: 13, materialCode: "PVC", sourceMaterial: "PVC", commercialType: "CORTE", below20: 98, from20to150: 80, above150: 88 },
  { sheetRow: 14, materialCode: "TECAST", sourceMaterial: "Tecast", commercialType: "INTEIRO", below20: "N.T", from20to150: 150, above150: 180 },
  { sheetRow: 15, materialCode: "TECAST", sourceMaterial: "Tecast", commercialType: "CORTE", below20: "N.T", from20to150: 160, above150: 195 },
  { sheetRow: 16, materialCode: "TECAST_L", sourceMaterial: "Tecast L", commercialType: "INTEIRO", below20: "Sob. Consulta", from20to150: 180, above150: 180 },
  { sheetRow: 17, materialCode: "TECAST_L", sourceMaterial: "Tecast L", commercialType: "CORTE", below20: "N.T", from20to150: "N.T", above150: "N.T" },
  { sheetRow: 18, materialCode: "TECAST_TM", sourceMaterial: "Tecast TM", commercialType: "INTEIRO", below20: "N.T", from20to150: 180, above150: 195 },
  { sheetRow: 19, materialCode: "TECAST_TM", sourceMaterial: "Tecast TM", commercialType: "CORTE", below20: "N.T", from20to150: 200, above150: 210 },
  { sheetRow: 20, materialCode: "UHMW", sourceMaterial: "UHMW", commercialType: "INTEIRO", below20: 100, from20to150: 90, above150: 100 },
  { sheetRow: 21, materialCode: "UHMW", sourceMaterial: "UHMW", commercialType: "CORTE", below20: 120, from20to150: 110, above150: 125 },
  { sheetRow: 22, materialCode: "TEFLON", sourceMaterial: "Teflon", commercialType: "INTEIRO", below20: 230, from20to150: 180, above150: 190 },
  { sheetRow: 23, materialCode: "TEFLON", sourceMaterial: "Teflon", commercialType: "CORTE", below20: 290, from20to150: 230, above150: 240 },
  { sheetRow: 24, materialCode: "POLIURETANO_PU", sourceMaterial: "Poliuretano PU", commercialType: "INTEIRO", below20: 120, from20to150: 130, above150: 130 },
  { sheetRow: 25, materialCode: "POLIURETANO_PU", sourceMaterial: "Poliuretano PU", commercialType: "CORTE", below20: 140, from20to150: 130, above150: 140 },
  { sheetRow: 26, materialCode: "NYLON_66", sourceMaterial: "Nylon 6.6", commercialType: "INTEIRO", below20: 200, from20to150: 185, above150: "N.T" },
  { sheetRow: 27, materialCode: "NYLON_66", sourceMaterial: "Nylon 6.6", commercialType: "CORTE", below20: 230, from20to150: 230, above150: "N.T" },
  { sheetRow: 28, materialCode: "ACRILICO", sourceMaterial: "Acrílico", commercialType: "INTEIRO", below20: "Sob. Consulta", from20to150: "Sob. Consulta", above150: "Sob. Consulta" },
  { sheetRow: 29, materialCode: "ACRILICO", sourceMaterial: "Acrílico", commercialType: "CORTE", below20: "Sob. Consulta", from20to150: "Sob. Consulta", above150: "Sob. Consulta" },
];

// ──────────────────────────────────────────────
// Helpers de normalização
// ──────────────────────────────────────────────

const THICKNESS_POOL = [0.3, 0.5, 0.6, 1, 1.2, 1.5, 1.6, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100];

function brNum(s: string): number {
  return parseFloat(s.replace(",", ".").trim());
}

/**
 * Converte o texto bruto de espessuras da planilha em array numérico.
 * Suporta: "02 a 25", "0,5 a 1,5", "0,60, 01 e 1,6", "0,6; 1;1,2; 1,5; 2 ou 3",
 *          "12, 15, 20,25 e 30", "0,5 X 1,5", valor único numérico.
 */
export function parseThicknessRange(raw: string | number): number[] {
  if (typeof raw === "number") return THICKNESS_POOL.includes(raw) ? [raw] : [];

  const s = raw.trim();

  // Range: "NN a MM" ou "NN X MM" (case-insensitive)
  const rangeMatch = s.match(/^(\d[\d,.]*)[\s]*(?:a|x)[\s]*(\d[\d,.]*)$/i);
  if (rangeMatch) {
    const from = brNum(rangeMatch[1]);
    const to = brNum(rangeMatch[2]);
    return THICKNESS_POOL.filter((t) => t >= from && t <= to);
  }

  // List: normalizar separadores e parsear
  const normalized = s.replace(/\s+ou\s+/gi, ";").replace(/\s+e\s+/gi, ";");
  const result: number[] = [];

  for (const segment of normalized.split(";")) {
    const parts = segment.split(",");
    let i = 0;
    while (i < parts.length) {
      const trimmed = parts[i].trim();
      if (!trimmed) { i++; continue; }
      // Tentar como decimal brasileiro: verificar se junto com a próxima parte forma um valor do pool
      if (i + 1 < parts.length) {
        const decimal = brNum(trimmed + "," + parts[i + 1].trim());
        if (THICKNESS_POOL.includes(decimal)) {
          result.push(decimal);
          i += 2;
          continue;
        }
      }
      const num = brNum(trimmed);
      if (!isNaN(num) && THICKNESS_POOL.includes(num)) {
        result.push(num);
      }
      i++;
    }
  }

  return [...new Set(result)].sort((a, b) => a - b);
}

/** Converte "1000 x 2000" ou "1000 X 2000" em { width, length }. */
export function parsePatternDimensions(text: string): { width: number; length: number } {
  const parts = text.split(/\s*[xX×]\s*/);
  return { width: parseInt(parts[0], 10), length: parseInt(parts[1], 10) };
}

/** Normaliza uma célula de preço bruto (número, "N.T", "Sob. Consulta"). */
export function normalizePriceCell(val: number | string): { status: CommercialStatus; price: number | null } {
  if (typeof val === "number") return { status: "FIXED_PRICE", price: val };
  const s = val.trim().toLowerCase();
  if (s.includes("n.t") || s === "nt") return { status: "UNAVAILABLE", price: null };
  if (s.includes("sob")) return { status: "CONSULT_REQUIRED", price: null };
  return { status: "UNAVAILABLE", price: null };
}

// ──────────────────────────────────────────────
// Validação de integridade (dev-time)
// ──────────────────────────────────────────────

export function validateCommercialData(): string[] {
  const warnings: string[] = [];

  // Detectar sobreposição de espessuras para placas (mesmo material + padrão)
  const plateMap = new Map<string, { rows: number[]; thicknesses: Set<number> }>();
  for (const row of masterPlateRows) {
    const { width, length } = parsePatternDimensions(row.patternMm);
    const key = `${row.materialCode}|${width}x${length}`;
    const thicknesses = parseThicknessRange(row.availableMmRaw);
    if (!plateMap.has(key)) {
      plateMap.set(key, { rows: [row.sheetRow], thicknesses: new Set(thicknesses) });
    } else {
      const entry = plateMap.get(key)!;
      const overlap = thicknesses.filter((t) => entry.thicknesses.has(t));
      if (overlap.length > 0) {
        warnings.push(`⚠ Sobreposição: ${row.materialCode} ${width}x${length} (linhas ${entry.rows.join(",")} e ${row.sheetRow}) — espessuras: ${overlap.join(", ")}`);
      }
      entry.rows.push(row.sheetRow);
      thicknesses.forEach((t) => entry.thicknesses.add(t));
    }
  }

  // Verificar densidade ausente para materiais com corte
  for (const row of masterPlateRows) {
    if (row.cutPriceRaw !== "NT" && typeof row.cutPriceRaw === "number") {
      const mat = masterPlateMaterials.find((m) => m.code === row.materialCode);
      if (mat && mat.density === null) {
        warnings.push(`⚠ ${row.materialCode} (linha ${row.sheetRow}) tem preço de corte mas densidade é null.`);
      }
    }
  }

  // Verificar produto sem código
  for (const row of masterPlateRows) {
    if (!row.sourceProductCode) {
      warnings.push(`ℹ ${row.materialCode} (linha ${row.sheetRow}) sem código de produto fonte.`);
    }
  }

  if (import.meta.env?.DEV && warnings.length > 0) {
    console.group("📋 Validação da base comercial");
    warnings.forEach((w) => console.warn(w));
    console.groupEnd();
  }

  return warnings;
}

// Executar validação em desenvolvimento
if (import.meta.env?.DEV) {
  validateCommercialData();
}
