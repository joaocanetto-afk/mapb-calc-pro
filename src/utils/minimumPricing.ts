/**
 * Regra comercial transversal: preço mínimo de corte por peça.
 * Para cortar uma peça (TARUGO ou PLACA), cobramos no mínimo R$ 15,00 por unidade.
 */

export const MINIMUM_CUT_UNIT_PRICE = 15;

export interface MinimumPriceResult {
  calculatedUnitPriceBeforeMinimum: number;
  calculatedTotalPriceBeforeMinimum: number;
  finalUnitPrice: number;
  finalTotalPrice: number;
  minimumPriceApplied: boolean;
  minimumUnitPrice: number;
}

export function applyMinimumCutUnitPrice(
  calculatedUnitPrice: number,
  quantity: number,
  shouldApplyMinimum: boolean
): MinimumPriceResult {
  const minimumPriceApplied =
    shouldApplyMinimum && calculatedUnitPrice < MINIMUM_CUT_UNIT_PRICE;
  const finalUnitPrice = minimumPriceApplied
    ? MINIMUM_CUT_UNIT_PRICE
    : calculatedUnitPrice;

  return {
    calculatedUnitPriceBeforeMinimum: calculatedUnitPrice,
    calculatedTotalPriceBeforeMinimum: calculatedUnitPrice * quantity,
    finalUnitPrice,
    finalTotalPrice: finalUnitPrice * quantity,
    minimumPriceApplied,
    minimumUnitPrice: MINIMUM_CUT_UNIT_PRICE,
  };
}
