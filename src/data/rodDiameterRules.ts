/**
 * Regras de disponibilidade de diâmetros por material — módulo TARUGO.
 *
 * Regra comercial:
 * - Diâmetros até 300 mm são disponíveis para todos os materiais.
 * - Diâmetros acima de 300 mm (320, 350, 400, 450, 500) existem APENAS para TECAST.
 */

export const baseRodDiameters: number[] = [
  6, 8, 10, 12, 15, 20, 22, 25, 28, 30, 32, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80,
  90, 100, 110, 120, 130, 140, 150, 160, 180, 200, 210, 230, 250, 280, 300,
];

export const extraTecastDiameters: number[] = [320, 350, 400, 450, 500];

const TECAST_CODE = "TECAST";

export function getAllowedDiametersForMaterial(materialCode: string): number[] {
  if (materialCode === TECAST_CODE) {
    return [...baseRodDiameters, ...extraTecastDiameters];
  }
  return baseRodDiameters;
}

export function isDiameterAllowedForMaterial(materialCode: string, diameter: number): boolean {
  return getAllowedDiametersForMaterial(materialCode).includes(diameter);
}
