export type DiameterRange = "MENOR_QUE_20" | "DE_20_A_150" | "MAIOR_QUE_150";
export type LengthType = "PADRAO_SEM_SOBRA" | "MEDIDA_COM_REBARBA_OU_RETALHO";

export function classifyDiameterRange(diameter: number): DiameterRange {
  if (diameter < 20) return "MENOR_QUE_20";
  if (diameter <= 150) return "DE_20_A_150";
  return "MAIOR_QUE_150";
}

export function classifyLengthType(length: number): LengthType {
  if (length === 1000 || length === 3000) return "PADRAO_SEM_SOBRA";
  return "MEDIDA_COM_REBARBA_OU_RETALHO";
}

export const diameterRangeLabels: Record<DiameterRange, string> = {
  MENOR_QUE_20: "Menor que 20 mm",
  DE_20_A_150: "De 20 a 150 mm",
  MAIOR_QUE_150: "Maior que 150 mm",
};

export const lengthTypeLabels: Record<LengthType, string> = {
  PADRAO_SEM_SOBRA: "Padrão (1000 ou 3000 mm)",
  MEDIDA_COM_REBARBA_OU_RETALHO: "Medida com rebarba/retalho",
};
