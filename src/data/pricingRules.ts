import type { DiameterRange, LengthType } from "@/utils/classifiers";

export interface PricingRule {
  id: string;
  materialCode: string;
  diameterRange: DiameterRange;
  lengthType: LengthType;
  pricePerKg: number;
  active: boolean;
  description: string;
}

export const pricingRules: PricingRule[] = [
  {
    id: "NYLON_LT20_STANDARD",
    materialCode: "NYLON",
    diameterRange: "MENOR_QUE_20",
    lengthType: "PADRAO_SEM_SOBRA",
    pricePerKg: 65.0,
    active: true,
    description: "NYLON, diâmetro menor que 20, comprimento 1000 ou 3000",
  },
  {
    id: "NYLON_LT20_CUSTOM",
    materialCode: "NYLON",
    diameterRange: "MENOR_QUE_20",
    lengthType: "MEDIDA_COM_REBARBA_OU_RETALHO",
    pricePerKg: 78.0,
    active: true,
    description: "NYLON, diâmetro menor que 20, comprimento diferente de 1000 e 3000",
  },
  {
    id: "NYLON_20_150_STANDARD",
    materialCode: "NYLON",
    diameterRange: "DE_20_A_150",
    lengthType: "PADRAO_SEM_SOBRA",
    pricePerKg: 55.0,
    active: true,
    description: "NYLON, diâmetro entre 20 e 150, comprimento 1000 ou 3000",
  },
  {
    id: "NYLON_20_150_CUSTOM",
    materialCode: "NYLON",
    diameterRange: "DE_20_A_150",
    lengthType: "MEDIDA_COM_REBARBA_OU_RETALHO",
    pricePerKg: 64.0,
    active: true,
    description: "NYLON, diâmetro entre 20 e 150, comprimento diferente de 1000 e 3000",
  },
  {
    id: "NYLON_GT150_STANDARD",
    materialCode: "NYLON",
    diameterRange: "MAIOR_QUE_150",
    lengthType: "PADRAO_SEM_SOBRA",
    pricePerKg: 58.0,
    active: true,
    description: "NYLON, diâmetro maior que 150, comprimento 1000 ou 3000",
  },
  {
    id: "NYLON_GT150_CUSTOM",
    materialCode: "NYLON",
    diameterRange: "MAIOR_QUE_150",
    lengthType: "MEDIDA_COM_REBARBA_OU_RETALHO",
    pricePerKg: 67.0,
    active: true,
    description: "NYLON, diâmetro maior que 150, comprimento diferente de 1000 e 3000",
  },
];

export function getActivePricingRules(): PricingRule[] {
  return pricingRules.filter((r) => r.active);
}
