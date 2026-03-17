export type PlateMode = "CUT" | "FULL_SHEET";
export type PlateCutStatus = "ALLOWED" | "NT";

export type PlateStatus =
  | "CALCULATED"
  | "BLOCKED"
  | "FULL_SHEET_ONLY"
  | "UNAVAILABLE"
  | "VALIDATION_ERROR";

export interface PlateMaterial {
  code: string;
  displayName: string;
  density: number | null;
  active: boolean;
}

export interface PlatePatternRule {
  id: string;
  materialCode: string;
  standardWidthMm: number;
  standardLengthMm: number;
  availableThicknessesMm: number[];
  fullSheetPricePerMm: number;
  cutPricePerKg: number | null;
  cutStatus: PlateCutStatus;
}

export interface PlateCalculationInput {
  mode: PlateMode;
  materialCode: string;
  thicknessMm: number;
  widthMm?: number;
  lengthMm?: number;
  patternId?: string;
  quantity: number;
}

export interface PatternOption {
  ruleId: string;
  widthMm: number;
  lengthMm: number;
  areaMm2: number;
}

export interface SuggestedFullSheet {
  patternId: string;
  standardWidthMm: number;
  standardLengthMm: number;
  pricePerMm: number;
  unitPrice: number;
  totalPrice: number;
}

export interface PlateCalculationResult {
  mode: PlateMode;
  material: string;
  density: number | null;
  thicknessMm: number;
  widthMm: number | null;
  lengthMm: number | null;
  standardWidthMm: number | null;
  standardLengthMm: number | null;
  quantity: number;
  rotationApplied: boolean;
  unitVolumeMm3: number | null;
  unitWeightKg: number | null;
  totalWeightKg: number | null;
  pricePerKg: number | null;
  pricePerMm: number | null;
  unitPrice: number | null;
  totalPrice: number | null;
  status: PlateStatus;
  statusMessage: string;
  appliedRuleDescription: string | null;
  availablePatterns: PatternOption[];
  suggestedFullSheet: SuggestedFullSheet | null;
}
