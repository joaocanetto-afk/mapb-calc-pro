import type { PlateCalculationResult } from "@/data/placaTypes";
import { formatBRL, formatWeight, formatMm, formatDensity } from "@/utils/formatters";
import { AlertTriangle, CheckCircle2, Ban, Info, ShieldAlert } from "lucide-react";

interface PlacaResultProps {
  result: PlateCalculationResult;
}

export function PlacaResult({ result }: PlacaResultProps) {
  const isCalculated = result.status === "CALCULATED";
  const isBlocked = result.status === "BLOCKED";
  const isFullSheetOnly = result.status === "FULL_SHEET_ONLY";
  const isUnavailable = result.status === "UNAVAILABLE";
  const isValidationError = result.status === "VALIDATION_ERROR";

  return (
    <div className="space-y-5">
      {/* Status messages */}
      {isBlocked && (
        <div className="flex items-start gap-3 rounded-lg bg-destructive/10 border border-destructive/30 p-4">
          <Ban className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
          <p className="text-sm font-medium text-destructive">{result.statusMessage}</p>
        </div>
      )}

      {isUnavailable && (
        <div className="flex items-start gap-3 rounded-lg bg-destructive/10 border border-destructive/30 p-4">
          <ShieldAlert className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
          <p className="text-sm font-medium text-destructive">{result.statusMessage}</p>
        </div>
      )}

      {isValidationError && (
        <div className="flex items-start gap-3 rounded-lg bg-warning/10 border border-warning/30 p-4">
          <AlertTriangle className="h-5 w-5 text-warning mt-0.5 shrink-0" />
          <p className="text-sm font-medium text-warning-foreground">{result.statusMessage}</p>
        </div>
      )}

      {isFullSheetOnly && (
        <div className="flex items-start gap-3 rounded-lg bg-warning/10 border border-warning/30 p-4">
          <Info className="h-5 w-5 text-warning mt-0.5 shrink-0" />
          <p className="text-sm font-medium text-warning-foreground">{result.statusMessage}</p>
        </div>
      )}

      {/* Dados de entrada */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Dados de Entrada</h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <span className="text-muted-foreground">Material</span>
          <span className="font-medium text-foreground">{result.material}</span>
          <span className="text-muted-foreground">Espessura</span>
          <span className="font-medium text-foreground">{formatMm(result.thicknessMm)}</span>
          {result.mode === "CUT" && result.widthMm !== null && (
            <>
              <span className="text-muted-foreground">Largura</span>
              <span className="font-medium text-foreground">{formatMm(result.widthMm)}</span>
            </>
          )}
          {result.mode === "CUT" && result.lengthMm !== null && (
            <>
              <span className="text-muted-foreground">Comprimento</span>
              <span className="font-medium text-foreground">{formatMm(result.lengthMm)}</span>
            </>
          )}
          {result.standardWidthMm !== null && (
            <>
              <span className="text-muted-foreground">Padrão</span>
              <span className="font-medium text-foreground">{result.standardWidthMm} × {result.standardLengthMm} mm</span>
            </>
          )}
          <span className="text-muted-foreground">Modo</span>
          <span className="font-medium text-foreground">{result.mode === "CUT" ? "Corte sob medida" : "Placa inteira"}</span>
          <span className="text-muted-foreground">Quantidade</span>
          <span className="font-medium text-foreground">{result.quantity}</span>
        </div>
      </div>

      {/* Dados técnicos */}
      {(isCalculated || isFullSheetOnly) && (
        <>
          <hr className="border-border" />
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Dados Técnicos</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {result.density !== null && (
                <>
                  <span className="text-muted-foreground">Densidade comercial</span>
                  <span className="font-medium text-foreground">{formatDensity(result.density)}</span>
                </>
              )}
              {result.unitWeightKg !== null && (
                <>
                  <span className="text-muted-foreground">Peso unitário</span>
                  <span className="font-medium text-foreground">{formatWeight(result.unitWeightKg)}</span>
                </>
              )}
              {result.totalWeightKg !== null && (
                <>
                  <span className="text-muted-foreground">Peso total</span>
                  <span className="font-medium text-foreground">{formatWeight(result.totalWeightKg)}</span>
                </>
              )}
              {result.rotationApplied && (
                <>
                  <span className="text-muted-foreground">Rotação</span>
                  <span className="font-medium text-foreground">Peça rotacionada para encaixe</span>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* Dados comerciais — preço calculado */}
      {isCalculated && (
        <>
          <hr className="border-border" />
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Dados Comerciais</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {result.pricePerKg !== null && (
                <>
                  <span className="text-muted-foreground">Valor por kg</span>
                  <span className="font-medium text-foreground">{formatBRL(result.pricePerKg)}</span>
                </>
              )}
              {result.pricePerMm !== null && (
                <>
                  <span className="text-muted-foreground">Valor por mm</span>
                  <span className="font-medium text-foreground">{formatBRL(result.pricePerMm)}</span>
                </>
              )}
              {result.appliedRuleDescription && (
                <>
                  <span className="text-muted-foreground">Regra aplicada</span>
                  <span className="font-medium text-foreground text-xs">{result.appliedRuleDescription}</span>
                </>
              )}
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
        </>
      )}

      {/* Sugestão de placa inteira (quando corte bloqueado) */}
      {isFullSheetOnly && result.suggestedFullSheet && (
        <>
          <hr className="border-border" />
          <div className="rounded-lg bg-accent p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-accent-foreground/70 mb-3">Sugestão: Placa Inteira</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-accent-foreground/70">Padrão</span>
              <span className="font-medium text-accent-foreground">{result.suggestedFullSheet.standardWidthMm} × {result.suggestedFullSheet.standardLengthMm} mm</span>
              <span className="text-accent-foreground/70">Valor por mm</span>
              <span className="font-medium text-accent-foreground">{formatBRL(result.suggestedFullSheet.pricePerMm)}</span>
              <span className="text-accent-foreground/70">Valor unitário</span>
              <span className="font-bold text-accent-foreground">{formatBRL(result.suggestedFullSheet.unitPrice)}</span>
              {result.quantity > 1 && (
                <>
                  <span className="text-accent-foreground/70">Valor total</span>
                  <span className="font-bold text-primary">{formatBRL(result.suggestedFullSheet.totalPrice)}</span>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* Status footer */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {isCalculated && <><CheckCircle2 className="h-4 w-4 text-success" />Status: Preço calculado</>}
        {isBlocked && <><Ban className="h-4 w-4 text-destructive" />Status: Bloqueado</>}
        {isFullSheetOnly && <><Info className="h-4 w-4 text-warning" />Status: Somente placa inteira</>}
        {isUnavailable && <><ShieldAlert className="h-4 w-4 text-destructive" />Status: Indisponível</>}
        {isValidationError && <><AlertTriangle className="h-4 w-4 text-warning" />Status: Erro de validação</>}
      </div>
    </div>
  );
}
