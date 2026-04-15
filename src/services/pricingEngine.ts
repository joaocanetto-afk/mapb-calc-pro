import { classifyDiameterRange, classifyCommercialType, type DiameterRange, type CommercialType, type PricingMode } from "@/utils/classifiers";
import { getActivePricingRules, type PricingRule } from "@/data/pricingRules";
import { getMaterialByCode } from "@/data/materials";
import { calculateTarugoWeightKg } from "./tarugoCalculator";
import { isDiameterAllowedForMaterial } from "@/data/rodDiameterRules";

export interface TarugoCalculationInput {
  materialCode: string;
  diameter: number;
  length: number;
  quantity: number;
}

export interface TarugoCalculationResult {
  material: string;
  density: number;
  diameter: number;
  length: number;
  quantity: number;
  diameterRange: DiameterRange;
  commercialType: CommercialType;
  pricingMode: PricingMode | null;
  unitWeightKg: number;
  totalWeightKg: number;
  pricePerKg: number | null;
  unitPrice: number | null;
  totalPrice: number | null;
  ruleDescription: string | null;
  statusMessage: string;
}

export function getApplicablePricingRule(
  materialCode: string,
  diameter: number,
  length: number
): { rule: PricingRule | null; diameterRange: DiameterRange; commercialType: CommercialType } {
  const diameterRange = classifyDiameterRange(diameter);
  const commercialType = classifyCommercialType(length);
  const rules = getActivePricingRules();
  const rule = rules.find(
    (r) => r.materialCode === materialCode && r.diameterRange === diameterRange && r.commercialType === commercialType
  ) ?? null;
  return { rule, diameterRange, commercialType };
}

export function calculateTarugoPrice(input: TarugoCalculationInput): TarugoCalculationResult {
  const material = getMaterialByCode(input.materialCode);
  if (!material) {
    throw new Error("Material não encontrado.");
  }

  if (!isDiameterAllowedForMaterial(input.materialCode, input.diameter)) {
    throw new Error("Este material não possui disponibilidade para o diâmetro informado.");
  }

  const { rule, diameterRange, commercialType } = getApplicablePricingRule(
    input.materialCode,
    input.diameter,
    input.length
  );

  const unitWeightKg = calculateTarugoWeightKg(input.diameter, input.length, material.density);
  const totalWeightKg = unitWeightKg * input.quantity;

  let pricePerKg: number | null = null;
  let unitPrice: number | null = null;
  let totalPrice: number | null = null;
  let ruleDescription: string | null = null;
  let pricingMode: PricingMode | null = null;
  let statusMessage: string;

  if (!rule) {
    statusMessage = "Preço não cadastrado para esta combinação.";
  } else {
    pricingMode = rule.pricingMode;
    ruleDescription = rule.description;

    switch (rule.pricingMode) {
      case "FIXED_PRICE":
        pricePerKg = rule.pricePerKg;
        unitPrice = unitWeightKg * pricePerKg!;
        totalPrice = unitPrice * input.quantity;
        statusMessage = "Preço calculado";
        break;
      case "UNAVAILABLE":
        statusMessage = "Material indisponível nesta faixa de diâmetro para este tipo de medida.";
        break;
      case "CONSULT_REQUIRED":
        statusMessage = "Preço sob consulta. Consulte o fornecedor antes de vender este material.";
        break;
    }
  }

  return {
    material: material.displayName,
    density: material.density,
    diameter: input.diameter,
    length: input.length,
    quantity: input.quantity,
    diameterRange,
    commercialType,
    pricingMode,
    unitWeightKg,
    totalWeightKg,
    pricePerKg,
    unitPrice,
    totalPrice,
    ruleDescription,
    statusMessage,
  };
}
