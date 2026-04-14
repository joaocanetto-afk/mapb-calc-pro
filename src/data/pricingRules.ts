/**
 * Regras de preço do módulo TARUGO — derivadas de commercialMaster.ts
 */
import type { DiameterRange, CommercialType, PricingMode } from "@/utils/classifiers";
import { masterRodRows, normalizePriceCell } from "./commercialMaster";

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

type RangeKey = "below20" | "from20to150" | "from151to200" | "above200";
const RANGE_MAP: { key: RangeKey; range: DiameterRange; label: string }[] = [
  { key: "below20", range: "ABAIXO_20", label: "abaixo de 20 mm" },
  { key: "from20to150", range: "DE_20_A_150", label: "de 20 a 150 mm" },
  { key: "from151to200", range: "DE_151_A_200", label: "de 151 a 200 mm" },
  { key: "above200", range: "ACIMA_200", label: "acima de 200 mm" },
];

function derivePricingRules(): PricingRule[] {
  const rules: PricingRule[] = [];

  for (const row of masterRodRows) {
    const typeLower = row.commercialType === "INTEIRO" ? "inteiro" : "corte";

    for (const { key, range, label } of RANGE_MAP) {
      const cell = row[key];
      const { status, price } = normalizePriceCell(cell);

      const suffix =
        status === "UNAVAILABLE" ? " - N.T." :
        status === "CONSULT_REQUIRED" ? " - Sob. Consulta" : "";

      const id = `${row.materialCode}_${row.commercialType}_${range}`;

      rules.push({
        id,
        materialCode: row.materialCode,
        commercialType: row.commercialType,
        diameterRange: range,
        pricingMode: status,
        pricePerKg: price,
        active: true,
        description: `${row.sourceMaterial}, ${typeLower}, ${label}${suffix}`,
      });
    }
  }

  return rules;
}

export const pricingRules: PricingRule[] = derivePricingRules();

export function getActivePricingRules(): PricingRule[] {
  return pricingRules.filter((r) => r.active);
}
