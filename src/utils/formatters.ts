const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatBRL(value: number): string {
  return brlFormatter.format(value);
}

export function formatWeight(value: number): string {
  return value.toFixed(4).replace(".", ",") + " kg";
}

export function formatMm(value: number): string {
  return `${value} mm`;
}

export function formatDensity(value: number): string {
  return `${value.toFixed(2).replace(".", ",")} g/cm³`;
}
