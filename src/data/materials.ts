export interface Material {
  code: string;
  displayName: string;
  baseMaterial: string;
  density: number;
  active: boolean;
}

export const materials: Material[] = [
  { code: "NYLON", displayName: "NYLON", baseMaterial: "NYLON", density: 1.32, active: true },
  { code: "PP", displayName: "PP", baseMaterial: "PP", density: 1.00, active: true },
  { code: "PEAD", displayName: "PEAD", baseMaterial: "PEAD", density: 1.00, active: true },
  { code: "UHMW", displayName: "UHMW", baseMaterial: "UHMW", density: 1.00, active: true },
  { code: "POLIACETAL", displayName: "POLIACETAL", baseMaterial: "POLIACETAL", density: 1.53, active: true },
  { code: "CELERON", displayName: "CELERON", baseMaterial: "CELERON", density: 1.45, active: true },
  { code: "TEFLON", displayName: "TEFLON", baseMaterial: "TEFLON", density: 2.30, active: true },
  { code: "POLIURETANO", displayName: "POLIURETANO", baseMaterial: "POLIURETANO", density: 1.25, active: true },
];

export function getActiveMaterials(): Material[] {
  return materials.filter((m) => m.active);
}

export function getMaterialByCode(code: string): Material | undefined {
  return materials.find((m) => m.code === code && m.active);
}
