import type { TarugoCalculationResult } from "@/services/pricingEngine";
import { formatBRL, formatWeight, formatMm, formatDensity } from "@/utils/formatters";
import { diameterRangeLabels, lengthTypeLabels } from "@/utils/classifiers";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface TarugoResultProps {
  result: TarugoCalculationResult;
}

export function TarugoResult({ result }: TarugoResultProps) {
  return (
    <div className="space-y-5">
      {result.warning && (
        <div className="flex items-start gap-3 rounded-lg bg-warning/10 border border-warning/30 p-4">
          <AlertTriangle className="h-5 w-5 text-warning mt-0.5 shrink-0" />
          <p className="text-sm font-medium text-warning-foreground">{result.warning}</p>
        </div>
      )}

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Dados de Entrada</h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <span className="text-muted-foreground">Material</span>
          <span className="font-medium text-foreground">{result.material}</span>
          <span className="text-muted-foreground">Diâmetro</span>
          <span className="font-medium text-foreground">{formatMm(result.diameter)}</span>
          <span className="text-muted-foreground">Comprimento</span>
          <span className="font-medium text-foreground">{formatMm(result.length)}</span>
          <span className="text-muted-foreground">Quantidade</span>
          <span className="font-medium text-foreground">{result.quantity}</span>
        </div>
      </div>

      <hr className="border-border" />

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Dados Técnicos</h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <span className="text-muted-foreground">Densidade comercial</span>
          <span className="font-medium text-foreground">{formatDensity(result.density)}</span>
          <span className="text-muted-foreground">Faixa de diâmetro</span>
          <span className="font-medium text-foreground">{diameterRangeLabels[result.diameterRange]}</span>
          <span className="text-muted-foreground">Tipo de comprimento</span>
          <span className="font-medium text-foreground">{lengthTypeLabels[result.lengthType]}</span>
          <span className="text-muted-foreground">Peso unitário</span>
          <span className="font-medium text-foreground">{formatWeight(result.unitWeightKg)}</span>
          <span className="text-muted-foreground">Peso total</span>
          <span className="font-medium text-foreground">{formatWeight(result.totalWeightKg)}</span>
        </div>
      </div>

      {result.pricePerKg !== null && (
        <>
          <hr className="border-border" />
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Dados Comerciais</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-muted-foreground">Valor por kg</span>
              <span className="font-medium text-foreground">{formatBRL(result.pricePerKg)}</span>
              <span className="text-muted-foreground">Regra aplicada</span>
              <span className="font-medium text-foreground text-xs">{result.ruleDescription}</span>
            </div>
          </div>

          <hr className="border-border" />

          <div className="rounded-lg bg-accent p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-accent-foreground/70 mb-3">Total</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <span className="text-sm text-accent-foreground/70">Valor unitário</span>
              <span className="text-sm font-bold text-accent-foreground">{formatBRL(result.unitPrice!)}</span>
              <span className="text-sm text-accent-foreground/70">Valor total</span>
              <span className="text-lg font-bold text-primary">{formatBRL(result.totalPrice!)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-success" />
            Cálculo realizado com sucesso
          </div>
        </>
      )}
    </div>
  );
}
