export interface Material {
  code: string;
  displayName: string;
  baseMaterial: string;
  density: number;
  active: boolean;
}

export const materials: Material[] = [
  { code: "NYLON_NATURAL", displayName: "Nylon natural", baseMaterial: "NYLON", density: 1.32, active: true },
  { code: "POLIPROPILENO_NATURAL", displayName: "Polipropileno natural", baseMaterial: "PP", density: 1.00, active: true },
  { code: "PEAD_NATURAL", displayName: "PEAD natural", baseMaterial: "PEAD", density: 1.00, active: true },
  { code: "POLIACETAL_NATURAL", displayName: "Poliacetal natural", baseMaterial: "POLIACETAL", density: 1.53, active: true },
  { code: "CELERON", displayName: "Celeron", baseMaterial: "CELERON", density: 1.45, active: true },
  { code: "PVC", displayName: "PVC", baseMaterial: "PVC", density: 1.50, active: true },
  { code: "TECAST", displayName: "Tecast", baseMaterial: "TECAST", density: 1.32, active: true },
  { code: "TECAST_L", displayName: "Tecast L", baseMaterial: "TECAST_L", density: 1.32, active: true },
  { code: "TECAST_TM", displayName: "Tecast TM", baseMaterial: "TECAST_TM", density: 1.32, active: true },
  { code: "UHMW", displayName: "UHMW", baseMaterial: "UHMW", density: 1.00, active: true },
  { code: "TEFLON", displayName: "Teflon", baseMaterial: "TEFLON", density: 2.30, active: true },
  { code: "POLIURETANO_PU", displayName: "Poliuretano PU", baseMaterial: "POLIURETANO", density: 1.25, active: true },
  { code: "NYLON_66", displayName: "Nylon 6.6", baseMaterial: "NYLON_66", density: 1.32, active: true },
];

export function getActiveMaterials(): Material[] {
  return materials.filter((m) => m.active);
}

export function getMaterialByCode(code: string): Material | undefined {
  return materials.find((m) => m.code === code && m.active);
}
