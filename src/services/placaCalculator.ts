/** Cálculos puros de geometria e peso para placas */

export function calculatePlateVolumeMm3(
  thicknessMm: number,
  widthMm: number,
  lengthMm: number
): number {
  return thicknessMm * widthMm * lengthMm;
}

export function calculatePlateWeightKg(
  thicknessMm: number,
  widthMm: number,
  lengthMm: number,
  density: number
): number {
  const volumeMm3 = calculatePlateVolumeMm3(thicknessMm, widthMm, lengthMm);
  return (volumeMm3 * density) / 1_000_000;
}

export function calculateFullSheetPrice(
  pricePerMm: number,
  thicknessMm: number
): number {
  return pricePerMm * thicknessMm;
}

export function calculatePlateCutPrice(
  weightKg: number,
  pricePerKg: number
): number {
  return weightKg * pricePerKg;
}
