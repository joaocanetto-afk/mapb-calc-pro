import { Construction } from "lucide-react";

export default function PlacaPage() {
  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-muted mb-6">
          <Construction className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-xl font-bold text-foreground font-display mb-2">Módulo de Placa</h1>
        <p className="text-muted-foreground">Módulo de Placa em desenvolvimento</p>
      </div>
    </div>
  );
}
