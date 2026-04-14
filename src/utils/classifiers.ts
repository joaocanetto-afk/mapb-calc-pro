export type DiameterRange = "ABAIXO_20" | "DE_20_A_150" | "DE_151_A_200" | "ACIMA_200";
export type CommercialType = "INTEIRO" | "CORTE";
export type PricingMode = "FIXED_PRICE" | "UNAVAILABLE" | "CONSULT_REQUIRED";

export function classifyDiameterRange(diameter: number): DiameterRange {
  if (diameter < 20) return "ABAIXO_20";
  if (diameter <= 150) return "DE_20_A_150";
  if (diameter <= 200) return "DE_151_A_200";
  return "ACIMA_200";
}

export function classifyCommercialType(length: number): CommercialType {
  if (length === 1000 || length === 3000) return "INTEIRO";
  return "CORTE";
}

export const diameterRangeLabels: Record<DiameterRange, string> = {
  ABAIXO_20: "Abaixo de 20 mm",
  DE_20_A_150: "De 20 a 150 mm",
  DE_151_A_200: "De 151 a 200 mm",
  ACIMA_200: "Acima de 200 mm",
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
