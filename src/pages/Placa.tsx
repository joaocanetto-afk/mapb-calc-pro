import { useState } from "react";
import { PlacaForm, type PlacaFormData } from "@/components/PlacaForm";
import { PlacaResult } from "@/components/PlacaResult";
import { calculatePlateQuote } from "@/services/placaPricingEngine";
import type { PlateCalculationResult } from "@/data/placaTypes";
import { Square } from "lucide-react";

export default function PlacaPage() {
  const [result, setResult] = useState<PlateCalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleCalculate(data: PlacaFormData) {
    try {
      setError(null);
      const res = calculatePlateQuote(data);
      setResult(res);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro inesperado no cálculo.");
      setResult(null);
    }
  }

  function handleClear() {
    setResult(null);
    setError(null);
  }

  return (
    <div className="container py-6 md:py-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
          <Square className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground font-display">Cálculo de Placa</h1>
          <p className="text-sm text-muted-foreground">Corte sob medida ou placa inteira</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulário */}
        <div className="rounded-xl border border-border bg-card p-5 md:p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Dados da Placa</h2>
          <PlacaForm onCalculate={handleCalculate} onClear={handleClear} />
        </div>

        {/* Resultado */}
        <div className="rounded-xl border border-border bg-card p-5 md:p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Resumo do Cálculo</h2>
          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-4">
              <p className="text-sm font-medium text-destructive">{error}</p>
            </div>
          )}
          {!result && !error && (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Square className="h-12 w-12 mb-3 opacity-20" />
              <p className="text-sm">Preencha os dados e clique em Calcular</p>
            </div>
          )}
          {result && <PlacaResult result={result} />}
        </div>
      </div>
    </div>
  );
}
