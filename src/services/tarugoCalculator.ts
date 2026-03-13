export function calculateTarugoVolumeMm3(diameter: number, length: number): number {
  const radius = diameter / 2;
  return Math.PI * radius * radius * length;
}

export function calculateTarugoWeightKg(diameter: number, length: number, density: number): number {
  const volumeMm3 = calculateTarugoVolumeMm3(diameter, length);
  return (volumeMm3 * density) / 1_000_000;
}
