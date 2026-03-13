import { useState } from "react";
import { getActiveMaterials } from "@/data/materials";
import { allowedDiameters } from "@/data/allowedDiameters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calculator, RotateCcw } from "lucide-react";

export interface TarugoFormData {
  materialCode: string;
  diameter: number;
  length: number;
  quantity: number;
}

interface TarugoFormProps {
  onCalculate: (data: TarugoFormData) => void;
  onClear: () => void;
}

export function TarugoForm({ onCalculate, onClear }: TarugoFormProps) {
  const [materialCode, setMaterialCode] = useState("");
  const [diameter, setDiameter] = useState("");
  const [length, setLength] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const activeMaterials = getActiveMaterials();

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!materialCode) errs.materialCode = "Selecione um material.";
    if (!diameter) errs.diameter = "Selecione um diâmetro.";
    const len = parseFloat(length);
    if (!length || isNaN(len) || len <= 0) errs.length = "Informe um comprimento válido.";
    const qty = parseInt(quantity, 10);
    if (!quantity || isNaN(qty) || qty < 1) errs.quantity = "Informe uma quantidade válida.";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    onCalculate({
      materialCode,
      diameter: parseInt(diameter, 10),
      length: parseFloat(length),
      quantity: parseInt(quantity, 10),
    });
  }

  function handleClear() {
    setMaterialCode("");
    setDiameter("");
    setLength("");
    setQuantity("1");
    setErrors({});
    onClear();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="material" className="text-sm font-medium text-foreground">Material</Label>
        <Select value={materialCode} onValueChange={(v) => { setMaterialCode(v); setErrors((e) => ({ ...e, materialCode: "" })); }}>
          <SelectTrigger id="material" className="h-11">
            <SelectValue placeholder="Selecione o material" />
          </SelectTrigger>
          <SelectContent>
            {activeMaterials.map((m) => (
              <SelectItem key={m.code} value={m.code}>{m.displayName}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.materialCode && <p className="text-sm text-destructive">{errors.materialCode}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="diameter" className="text-sm font-medium text-foreground">Diâmetro (mm)</Label>
        <Select value={diameter} onValueChange={(v) => { setDiameter(v); setErrors((e) => ({ ...e, diameter: "" })); }}>
          <SelectTrigger id="diameter" className="h-11">
            <SelectValue placeholder="Selecione o diâmetro" />
          </SelectTrigger>
          <SelectContent>
            {allowedDiameters.map((d) => (
              <SelectItem key={d} value={String(d)}>{d} mm</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.diameter && <p className="text-sm text-destructive">{errors.diameter}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="length" className="text-sm font-medium text-foreground">Comprimento (mm)</Label>
        <Input
          id="length"
          type="number"
          placeholder="Ex: 1000"
          className="h-11"
          value={length}
          min={1}
          onChange={(e) => { setLength(e.target.value); setErrors((er) => ({ ...er, length: "" })); }}
        />
        {errors.length && <p className="text-sm text-destructive">{errors.length}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity" className="text-sm font-medium text-foreground">Quantidade</Label>
        <Input
          id="quantity"
          type="number"
          className="h-11"
          value={quantity}
          min={1}
          step={1}
          onChange={(e) => { setQuantity(e.target.value); setErrors((er) => ({ ...er, quantity: "" })); }}
        />
        {errors.quantity && <p className="text-sm text-destructive">{errors.quantity}</p>}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1 h-12 text-base font-semibold gap-2">
          <Calculator className="h-5 w-5" />
          Calcular
        </Button>
        <Button type="button" variant="outline" className="h-12 px-5 gap-2" onClick={handleClear}>
          <RotateCcw className="h-4 w-4" />
          Limpar
        </Button>
      </div>
    </form>
  );
}
