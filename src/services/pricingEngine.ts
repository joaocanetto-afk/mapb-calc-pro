import { classifyDiameterRange, classifyLengthType, type DiameterRange, type LengthType } from "@/utils/classifiers";
import { getActivePricingRules, type PricingRule } from "@/data/pricingRules";
import { getMaterialByCode } from "@/data/materials";
import { calculateTarugoWeightKg } from "./tarugoCalculator";

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
  lengthType: LengthType;
  unitWeightKg: number;
  totalWeightKg: number;
  pricePerKg: number | null;
  unitPrice: number | null;
  totalPrice: number | null;
  ruleDescription: string | null;
  warning: string | null;
}

export function getApplicablePricingRule(
  materialCode: string,
  diameter: number,
  length: number
): { rule: PricingRule | null; diameterRange: DiameterRange; lengthType: LengthType } {
  const diameterRange = classifyDiameterRange(diameter);
  const lengthType = classifyLengthType(length);
  const rules = getActivePricingRules();
  const rule = rules.find(
    (r) => r.materialCode === materialCode && r.diameterRange === diameterRange && r.lengthType === lengthType
  ) ?? null;
  return { rule, diameterRange, lengthType };
}

export function calculateTarugoPrice(input: TarugoCalculationInput): TarugoCalculationResult {
  const material = getMaterialByCode(input.materialCode);
  if (!material) {
    throw new Error("Material não encontrado.");
  }

  const { rule, diameterRange, lengthType } = getApplicablePricingRule(
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
  let warning: string | null = null;

  if (rule) {
    pricePerKg = rule.pricePerKg;
    unitPrice = unitWeightKg * pricePerKg;
    totalPrice = unitPrice * input.quantity;
    ruleDescription = rule.description;
  } else {
    warning = "Preço não cadastrado para esta combinação de faixa de diâmetro e comprimento.";
  }

  return {
    material: material.displayName,
    density: material.density,
    diameter: input.diameter,
    length: input.length,
    quantity: input.quantity,
    diameterRange,
    lengthType,
    unitWeightKg,
    totalWeightKg,
    pricePerKg,
    unitPrice,
    totalPrice,
    ruleDescription,
    warning,
  };
}
