import type { DiameterRange, CommercialType, PricingMode } from "@/utils/classifiers";

export interface PricingRule {
  id: string;
  materialCode: string;
  commercialType: CommercialType;
  diameterRange: DiameterRange;
  pricingMode: PricingMode;
  pricePerKg: number | null;
  active: boolean;
  description: string;
}

export const pricingRules: PricingRule[] = [
  // NYLON NATURAL
  { id: "NYLON_NATURAL_INTEIRO_ABAIXO_20", materialCode: "NYLON_NATURAL", commercialType: "INTEIRO", diameterRange: "ABAIXO_20", pricingMode: "FIXED_PRICE", pricePerKg: 65.00, active: true, description: "Nylon natural, inteiro, abaixo de 20 mm" },
  { id: "NYLON_NATURAL_INTEIRO_20_150", materialCode: "NYLON_NATURAL", commercialType: "INTEIRO", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 55.00, active: true, description: "Nylon natural, inteiro, de 20 a 150 mm" },
  { id: "NYLON_NATURAL_INTEIRO_ACIMA_150", materialCode: "NYLON_NATURAL", commercialType: "INTEIRO", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 58.00, active: true, description: "Nylon natural, inteiro, acima de 150 mm" },
  { id: "NYLON_NATURAL_CORTE_ABAIXO_20", materialCode: "NYLON_NATURAL", commercialType: "CORTE", diameterRange: "ABAIXO_20", pricingMode: "FIXED_PRICE", pricePerKg: 78.00, active: true, description: "Nylon natural, corte, abaixo de 20 mm" },
  { id: "NYLON_NATURAL_CORTE_20_150", materialCode: "NYLON_NATURAL", commercialType: "CORTE", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 64.00, active: true, description: "Nylon natural, corte, de 20 a 150 mm" },
  { id: "NYLON_NATURAL_CORTE_ACIMA_150", materialCode: "NYLON_NATURAL", commercialType: "CORTE", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 67.00, active: true, description: "Nylon natural, corte, acima de 150 mm" },

  // POLIPROPILENO NATURAL
  { id: "POLIPROPILENO_NATURAL_INTEIRO_ABAIXO_20", materialCode: "POLIPROPILENO_NATURAL", commercialType: "INTEIRO", diameterRange: "ABAIXO_20", pricingMode: "FIXED_PRICE", pricePerKg: 55.00, active: true, description: "Polipropileno natural, inteiro, abaixo de 20 mm" },
  { id: "POLIPROPILENO_NATURAL_INTEIRO_20_150", materialCode: "POLIPROPILENO_NATURAL", commercialType: "INTEIRO", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 45.00, active: true, description: "Polipropileno natural, inteiro, de 20 a 150 mm" },
  { id: "POLIPROPILENO_NATURAL_INTEIRO_ACIMA_150", materialCode: "POLIPROPILENO_NATURAL", commercialType: "INTEIRO", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 55.00, active: true, description: "Polipropileno natural, inteiro, acima de 150 mm" },
  { id: "POLIPROPILENO_NATURAL_CORTE_ABAIXO_20", materialCode: "POLIPROPILENO_NATURAL", commercialType: "CORTE", diameterRange: "ABAIXO_20", pricingMode: "FIXED_PRICE", pricePerKg: 60.00, active: true, description: "Polipropileno natural, corte, abaixo de 20 mm" },
  { id: "POLIPROPILENO_NATURAL_CORTE_20_150", materialCode: "POLIPROPILENO_NATURAL", commercialType: "CORTE", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 50.00, active: true, description: "Polipropileno natural, corte, de 20 a 150 mm" },
  { id: "POLIPROPILENO_NATURAL_CORTE_ACIMA_150", materialCode: "POLIPROPILENO_NATURAL", commercialType: "CORTE", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 60.00, active: true, description: "Polipropileno natural, corte, acima de 150 mm" },

  // PEAD NATURAL
  { id: "PEAD_NATURAL_INTEIRO_ABAIXO_20", materialCode: "PEAD_NATURAL", commercialType: "INTEIRO", diameterRange: "ABAIXO_20", pricingMode: "FIXED_PRICE", pricePerKg: 55.00, active: true, description: "PEAD natural, inteiro, abaixo de 20 mm" },
  { id: "PEAD_NATURAL_INTEIRO_20_150", materialCode: "PEAD_NATURAL", commercialType: "INTEIRO", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 45.00, active: true, description: "PEAD natural, inteiro, de 20 a 150 mm" },
  { id: "PEAD_NATURAL_INTEIRO_ACIMA_150", materialCode: "PEAD_NATURAL", commercialType: "INTEIRO", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 55.00, active: true, description: "PEAD natural, inteiro, acima de 150 mm" },
  { id: "PEAD_NATURAL_CORTE_ABAIXO_20", materialCode: "PEAD_NATURAL", commercialType: "CORTE", diameterRange: "ABAIXO_20", pricingMode: "FIXED_PRICE", pricePerKg: 60.00, active: true, description: "PEAD natural, corte, abaixo de 20 mm" },
  { id: "PEAD_NATURAL_CORTE_20_150", materialCode: "PEAD_NATURAL", commercialType: "CORTE", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 55.00, active: true, description: "PEAD natural, corte, de 20 a 150 mm" },
  { id: "PEAD_NATURAL_CORTE_ACIMA_150", materialCode: "PEAD_NATURAL", commercialType: "CORTE", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 60.00, active: true, description: "PEAD natural, corte, acima de 150 mm" },

  // POLIACETAL NATURAL
  { id: "POLIACETAL_NATURAL_INTEIRO_ABAIXO_20", materialCode: "POLIACETAL_NATURAL", commercialType: "INTEIRO", diameterRange: "ABAIXO_20", pricingMode: "FIXED_PRICE", pricePerKg: 65.00, active: true, description: "Poliacetal natural, inteiro, abaixo de 20 mm" },
  { id: "POLIACETAL_NATURAL_INTEIRO_20_150", materialCode: "POLIACETAL_NATURAL", commercialType: "INTEIRO", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 55.00, active: true, description: "Poliacetal natural, inteiro, de 20 a 150 mm" },
  { id: "POLIACETAL_NATURAL_INTEIRO_ACIMA_150", materialCode: "POLIACETAL_NATURAL", commercialType: "INTEIRO", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 60.00, active: true, description: "Poliacetal natural, inteiro, acima de 150 mm" },
  { id: "POLIACETAL_NATURAL_CORTE_ABAIXO_20", materialCode: "POLIACETAL_NATURAL", commercialType: "CORTE", diameterRange: "ABAIXO_20", pricingMode: "FIXED_PRICE", pricePerKg: 70.00, active: true, description: "Poliacetal natural, corte, abaixo de 20 mm" },
  { id: "POLIACETAL_NATURAL_CORTE_20_150", materialCode: "POLIACETAL_NATURAL", commercialType: "CORTE", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 60.00, active: true, description: "Poliacetal natural, corte, de 20 a 150 mm" },
  { id: "POLIACETAL_NATURAL_CORTE_ACIMA_150", materialCode: "POLIACETAL_NATURAL", commercialType: "CORTE", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 65.00, active: true, description: "Poliacetal natural, corte, acima de 150 mm" },

  // CELERON
  { id: "CELERON_INTEIRO_ABAIXO_20", materialCode: "CELERON", commercialType: "INTEIRO", diameterRange: "ABAIXO_20", pricingMode: "FIXED_PRICE", pricePerKg: 207.00, active: true, description: "Celeron, inteiro, abaixo de 20 mm" },
  { id: "CELERON_INTEIRO_20_150", materialCode: "CELERON", commercialType: "INTEIRO", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 186.00, active: true, description: "Celeron, inteiro, de 20 a 150 mm" },
  { id: "CELERON_INTEIRO_ACIMA_150", materialCode: "CELERON", commercialType: "INTEIRO", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 180.00, active: true, description: "Celeron, inteiro, acima de 150 mm" },
  { id: "CELERON_CORTE_ABAIXO_20", materialCode: "CELERON", commercialType: "CORTE", diameterRange: "ABAIXO_20", pricingMode: "FIXED_PRICE", pricePerKg: 248.00, active: true, description: "Celeron, corte, abaixo de 20 mm" },
  { id: "CELERON_CORTE_20_150", materialCode: "CELERON", commercialType: "CORTE", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 227.00, active: true, description: "Celeron, corte, de 20 a 150 mm" },
  { id: "CELERON_CORTE_ACIMA_150", materialCode: "CELERON", commercialType: "CORTE", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 230.00, active: true, description: "Celeron, corte, acima de 150 mm" },

  // PVC
  { id: "PVC_INTEIRO_ABAIXO_20", materialCode: "PVC", commercialType: "INTEIRO", diameterRange: "ABAIXO_20", pricingMode: "FIXED_PRICE", pricePerKg: 78.00, active: true, description: "PVC, inteiro, abaixo de 20 mm" },
  { id: "PVC_INTEIRO_20_150", materialCode: "PVC", commercialType: "INTEIRO", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 65.00, active: true, description: "PVC, inteiro, de 20 a 150 mm" },
  { id: "PVC_INTEIRO_ACIMA_150", materialCode: "PVC", commercialType: "INTEIRO", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 69.00, active: true, description: "PVC, inteiro, acima de 150 mm" },
  { id: "PVC_CORTE_ABAIXO_20", materialCode: "PVC", commercialType: "CORTE", diameterRange: "ABAIXO_20", pricingMode: "FIXED_PRICE", pricePerKg: 90.00, active: true, description: "PVC, corte, abaixo de 20 mm" },
  { id: "PVC_CORTE_20_150", materialCode: "PVC", commercialType: "CORTE", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 75.00, active: true, description: "PVC, corte, de 20 a 150 mm" },
  { id: "PVC_CORTE_ACIMA_150", materialCode: "PVC", commercialType: "CORTE", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 80.00, active: true, description: "PVC, corte, acima de 150 mm" },

  // TECAST
  { id: "TECAST_INTEIRO_ABAIXO_20", materialCode: "TECAST", commercialType: "INTEIRO", diameterRange: "ABAIXO_20", pricingMode: "UNAVAILABLE", pricePerKg: null, active: true, description: "Tecast, inteiro, abaixo de 20 mm - N.T." },
  { id: "TECAST_INTEIRO_20_150", materialCode: "TECAST", commercialType: "INTEIRO", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 140.00, active: true, description: "Tecast, inteiro, de 20 a 150 mm" },
  { id: "TECAST_INTEIRO_ACIMA_150", materialCode: "TECAST", commercialType: "INTEIRO", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 160.00, active: true, description: "Tecast, inteiro, acima de 150 mm" },
  { id: "TECAST_CORTE_ABAIXO_20", materialCode: "TECAST", commercialType: "CORTE", diameterRange: "ABAIXO_20", pricingMode: "UNAVAILABLE", pricePerKg: null, active: true, description: "Tecast, corte, abaixo de 20 mm - N.T." },
  { id: "TECAST_CORTE_20_150", materialCode: "TECAST", commercialType: "CORTE", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 150.00, active: true, description: "Tecast, corte, de 20 a 150 mm" },
  { id: "TECAST_CORTE_ACIMA_150", materialCode: "TECAST", commercialType: "CORTE", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 180.00, active: true, description: "Tecast, corte, acima de 150 mm" },

  // TECAST L
  { id: "TECAST_L_INTEIRO_ABAIXO_20", materialCode: "TECAST_L", commercialType: "INTEIRO", diameterRange: "ABAIXO_20", pricingMode: "CONSULT_REQUIRED", pricePerKg: null, active: true, description: "Tecast L, inteiro, abaixo de 20 mm - Sob. Consulta" },
  { id: "TECAST_L_INTEIRO_20_150", materialCode: "TECAST_L", commercialType: "INTEIRO", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 170.00, active: true, description: "Tecast L, inteiro, de 20 a 150 mm" },
  { id: "TECAST_L_INTEIRO_ACIMA_150", materialCode: "TECAST_L", commercialType: "INTEIRO", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 180.00, active: true, description: "Tecast L, inteiro, acima de 150 mm" },
  { id: "TECAST_L_CORTE_ABAIXO_20", materialCode: "TECAST_L", commercialType: "CORTE", diameterRange: "ABAIXO_20", pricingMode: "UNAVAILABLE", pricePerKg: null, active: true, description: "Tecast L, corte, abaixo de 20 mm - N.T." },
  { id: "TECAST_L_CORTE_20_150", materialCode: "TECAST_L", commercialType: "CORTE", diameterRange: "DE_20_A_150", pricingMode: "UNAVAILABLE", pricePerKg: null, active: true, description: "Tecast L, corte, de 20 a 150 mm - N.T." },
  { id: "TECAST_L_CORTE_ACIMA_150", materialCode: "TECAST_L", commercialType: "CORTE", diameterRange: "ACIMA_150", pricingMode: "UNAVAILABLE", pricePerKg: null, active: true, description: "Tecast L, corte, acima de 150 mm - N.T." },

  // TECAST TM
  { id: "TECAST_TM_INTEIRO_ABAIXO_20", materialCode: "TECAST_TM", commercialType: "INTEIRO", diameterRange: "ABAIXO_20", pricingMode: "UNAVAILABLE", pricePerKg: null, active: true, description: "Tecast TM, inteiro, abaixo de 20 mm - N.T." },
  { id: "TECAST_TM_INTEIRO_20_150", materialCode: "TECAST_TM", commercialType: "INTEIRO", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 170.00, active: true, description: "Tecast TM, inteiro, de 20 a 150 mm" },
  { id: "TECAST_TM_INTEIRO_ACIMA_150", materialCode: "TECAST_TM", commercialType: "INTEIRO", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 180.00, active: true, description: "Tecast TM, inteiro, acima de 150 mm" },
  { id: "TECAST_TM_CORTE_ABAIXO_20", materialCode: "TECAST_TM", commercialType: "CORTE", diameterRange: "ABAIXO_20", pricingMode: "UNAVAILABLE", pricePerKg: null, active: true, description: "Tecast TM, corte, abaixo de 20 mm - N.T." },
  { id: "TECAST_TM_CORTE_20_150", materialCode: "TECAST_TM", commercialType: "CORTE", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 190.00, active: true, description: "Tecast TM, corte, de 20 a 150 mm" },
  { id: "TECAST_TM_CORTE_ACIMA_150", materialCode: "TECAST_TM", commercialType: "CORTE", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 195.00, active: true, description: "Tecast TM, corte, acima de 150 mm" },

  // UHMW
  { id: "UHMW_INTEIRO_ABAIXO_20", materialCode: "UHMW", commercialType: "INTEIRO", diameterRange: "ABAIXO_20", pricingMode: "FIXED_PRICE", pricePerKg: 90.00, active: true, description: "UHMW, inteiro, abaixo de 20 mm" },
  { id: "UHMW_INTEIRO_20_150", materialCode: "UHMW", commercialType: "INTEIRO", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 85.00, active: true, description: "UHMW, inteiro, de 20 a 150 mm" },
  { id: "UHMW_INTEIRO_ACIMA_150", materialCode: "UHMW", commercialType: "INTEIRO", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 90.00, active: true, description: "UHMW, inteiro, acima de 150 mm" },
  { id: "UHMW_CORTE_ABAIXO_20", materialCode: "UHMW", commercialType: "CORTE", diameterRange: "ABAIXO_20", pricingMode: "FIXED_PRICE", pricePerKg: 110.00, active: true, description: "UHMW, corte, abaixo de 20 mm" },
  { id: "UHMW_CORTE_20_150", materialCode: "UHMW", commercialType: "CORTE", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 100.00, active: true, description: "UHMW, corte, de 20 a 150 mm" },
  { id: "UHMW_CORTE_ACIMA_150", materialCode: "UHMW", commercialType: "CORTE", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 110.00, active: true, description: "UHMW, corte, acima de 150 mm" },

  // TEFLON
  { id: "TEFLON_INTEIRO_ABAIXO_20", materialCode: "TEFLON", commercialType: "INTEIRO", diameterRange: "ABAIXO_20", pricingMode: "FIXED_PRICE", pricePerKg: 190.00, active: true, description: "Teflon, inteiro, abaixo de 20 mm" },
  { id: "TEFLON_INTEIRO_20_150", materialCode: "TEFLON", commercialType: "INTEIRO", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 170.00, active: true, description: "Teflon, inteiro, de 20 a 150 mm" },
  { id: "TEFLON_INTEIRO_ACIMA_150", materialCode: "TEFLON", commercialType: "INTEIRO", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 175.00, active: true, description: "Teflon, inteiro, acima de 150 mm" },
  { id: "TEFLON_CORTE_ABAIXO_20", materialCode: "TEFLON", commercialType: "CORTE", diameterRange: "ABAIXO_20", pricingMode: "FIXED_PRICE", pricePerKg: 280.00, active: true, description: "Teflon, corte, abaixo de 20 mm" },
  { id: "TEFLON_CORTE_20_150", materialCode: "TEFLON", commercialType: "CORTE", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 220.00, active: true, description: "Teflon, corte, de 20 a 150 mm" },
  { id: "TEFLON_CORTE_ACIMA_150", materialCode: "TEFLON", commercialType: "CORTE", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 230.00, active: true, description: "Teflon, corte, acima de 150 mm" },

  // POLIURETANO PU
  { id: "POLIURETANO_PU_INTEIRO_ABAIXO_20", materialCode: "POLIURETANO_PU", commercialType: "INTEIRO", diameterRange: "ABAIXO_20", pricingMode: "FIXED_PRICE", pricePerKg: 110.00, active: true, description: "Poliuretano PU, inteiro, abaixo de 20 mm" },
  { id: "POLIURETANO_PU_INTEIRO_20_150", materialCode: "POLIURETANO_PU", commercialType: "INTEIRO", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 95.00, active: true, description: "Poliuretano PU, inteiro, de 20 a 150 mm" },
  { id: "POLIURETANO_PU_INTEIRO_ACIMA_150", materialCode: "POLIURETANO_PU", commercialType: "INTEIRO", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 95.00, active: true, description: "Poliuretano PU, inteiro, acima de 150 mm" },
  { id: "POLIURETANO_PU_CORTE_ABAIXO_20", materialCode: "POLIURETANO_PU", commercialType: "CORTE", diameterRange: "ABAIXO_20", pricingMode: "FIXED_PRICE", pricePerKg: 130.00, active: true, description: "Poliuretano PU, corte, abaixo de 20 mm" },
  { id: "POLIURETANO_PU_CORTE_20_150", materialCode: "POLIURETANO_PU", commercialType: "CORTE", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 120.00, active: true, description: "Poliuretano PU, corte, de 20 a 150 mm" },
  { id: "POLIURETANO_PU_CORTE_ACIMA_150", materialCode: "POLIURETANO_PU", commercialType: "CORTE", diameterRange: "ACIMA_150", pricingMode: "FIXED_PRICE", pricePerKg: 130.00, active: true, description: "Poliuretano PU, corte, acima de 150 mm" },

  // NYLON 6.6
  { id: "NYLON_66_INTEIRO_ABAIXO_20", materialCode: "NYLON_66", commercialType: "INTEIRO", diameterRange: "ABAIXO_20", pricingMode: "FIXED_PRICE", pricePerKg: 190.00, active: true, description: "Nylon 6.6, inteiro, abaixo de 20 mm" },
  { id: "NYLON_66_INTEIRO_20_150", materialCode: "NYLON_66", commercialType: "INTEIRO", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 170.00, active: true, description: "Nylon 6.6, inteiro, de 20 a 150 mm" },
  { id: "NYLON_66_INTEIRO_ACIMA_150", materialCode: "NYLON_66", commercialType: "INTEIRO", diameterRange: "ACIMA_150", pricingMode: "UNAVAILABLE", pricePerKg: null, active: true, description: "Nylon 6.6, inteiro, acima de 150 mm - N.T." },
  { id: "NYLON_66_CORTE_ABAIXO_20", materialCode: "NYLON_66", commercialType: "CORTE", diameterRange: "ABAIXO_20", pricingMode: "FIXED_PRICE", pricePerKg: 220.00, active: true, description: "Nylon 6.6, corte, abaixo de 20 mm" },
  { id: "NYLON_66_CORTE_20_150", materialCode: "NYLON_66", commercialType: "CORTE", diameterRange: "DE_20_A_150", pricingMode: "FIXED_PRICE", pricePerKg: 210.00, active: true, description: "Nylon 6.6, corte, de 20 a 150 mm" },
  { id: "NYLON_66_CORTE_ACIMA_150", materialCode: "NYLON_66", commercialType: "CORTE", diameterRange: "ACIMA_150", pricingMode: "UNAVAILABLE", pricePerKg: null, active: true, description: "Nylon 6.6, corte, acima de 150 mm - N.T." },
];

export function getActivePricingRules(): PricingRule[] {
  return pricingRules.filter((r) => r.active);
}
