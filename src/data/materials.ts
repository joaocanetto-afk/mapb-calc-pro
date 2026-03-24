/**
 * Materiais do módulo TARUGO — derivados de commercialMaster.ts
 */
import { masterRodMaterials } from "./commercialMaster";

export interface Material {
  code: string;
  displayName: string;
  baseMaterial: string;
  density: number;
  active: boolean;
}

export const materials: Material[] = masterRodMaterials.map((m) => ({
  code: m.code,
  displayName: m.displayName,
  baseMaterial: m.baseMaterial,
  density: m.density,
  active: m.active,
}));

export function getActiveMaterials(): Material[] {
  return materials.filter((m) => m.active);
}

export function getMaterialByCode(code: string): Material | undefined {
  return materials.find((m) => m.code === code && m.active);
}
