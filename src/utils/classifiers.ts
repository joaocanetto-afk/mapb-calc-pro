export type DiameterRange = "ABAIXO_20" | "DE_20_A_150" | "ACIMA_150";
export type CommercialType = "INTEIRO" | "CORTE";
export type PricingMode = "FIXED_PRICE" | "UNAVAILABLE" | "CONSULT_REQUIRED";

export function classifyDiameterRange(diameter: number): DiameterRange {
  if (diameter < 20) return "ABAIXO_20";
  if (diameter <= 150) return "DE_20_A_150";
  return "ACIMA_150";
}

export function classifyCommercialType(length: number): CommercialType {
  if (length === 1000 || length === 3000) return "INTEIRO";
  return "CORTE";
}

export const diameterRangeLabels: Record<DiameterRange, string> = {
  ABAIXO_20: "Abaixo de 20 mm",
  DE_20_A_150: "De 20 a 150 mm",
  ACIMA_150: "Acima de 150 mm",
};

export const commercialTypeLabels: Record<CommercialType, string> = {
  INTEIRO: "Inteiro (1000 ou 3000 mm)",
  CORTE: "Corte",
};

export const pricingModeLabels: Record<PricingMode, string> = {
  FIXED_PRICE: "Preço calculado",
  UNAVAILABLE: "Indisponível",
  CONSULT_REQUIRED: "Sob consulta",
};
