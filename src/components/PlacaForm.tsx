import { useState, useMemo } from "react";
import { getActivePlateMaterials, getAvailableThicknessesForMaterial, getCompatiblePatterns } from "@/data/placaCatalog";
import type { PlateMode } from "@/data/placaTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calculator, RotateCcw } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface PlacaFormData {
  mode: PlateMode;
  materialCode: string;
  thicknessMm: number;
  widthMm?: number;
  lengthMm?: number;
  patternId?: string;
  quantity: number;
}

interface PlacaFormProps {
  onCalculate: (data: PlacaFormData) => void;
  onClear: () => void;
}

export function PlacaForm({ onCalculate, onClear }: PlacaFormProps) {
  const [mode, setMode] = useState<PlateMode>("CUT");
  const [materialCode, setMaterialCode] = useState("");
  const [thickness, setThickness] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [patternId, setPatternId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const materials = getActivePlateMaterials();

  const thicknesses = useMemo(() => {
    if (!materialCode) return [];
    return getAvailableThicknessesForMaterial(materialCode);
  }, [materialCode]);

  const patterns = useMemo(() => {
    if (!materialCode || !thickness) return [];
    return getCompatiblePatterns(materialCode, parseFloat(thickness));
  }, [materialCode, thickness]);

  function clearErr(key: string) {
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function handleMaterialChange(v: string) {
    setMaterialCode(v);
    setThickness("");
    setPatternId("");
    clearErr("materialCode");
  }

  function handleThicknessChange(v: string) {
    setThickness(v);
    setPatternId("");
    clearErr("thickness");
  }

  function handleModeChange(v: string) {
    setMode(v as PlateMode);
    setErrors({});
  }

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!materialCode) errs.materialCode = "Selecione um material.";
    if (!thickness) errs.thickness = "Selecione uma espessura.";

    if (mode === "CUT") {
      const w = parseFloat(width);
      const l = parseFloat(length);
      if (!width || isNaN(w) || w <= 0) errs.width = "Informe uma largura válida.";
      else if (w < 30) errs.width = "A largura mínima para corte é 30 mm.";
      if (!length || isNaN(l) || l <= 0) errs.length = "Informe um comprimento válido.";
      else if (l < 30) errs.length = "O comprimento mínimo para corte é 30 mm.";
    } else {
      if (!patternId) errs.patternId = "Selecione um padrão válido.";
    }

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
      mode,
      materialCode,
      thicknessMm: parseFloat(thickness),
      widthMm: mode === "CUT" ? parseFloat(width) : undefined,
      lengthMm: mode === "CUT" ? parseFloat(length) : undefined,
      patternId: mode === "FULL_SHEET" ? patternId : undefined,
      quantity: parseInt(quantity, 10),
    });
  }

  function handleClear() {
    setMaterialCode("");
    setThickness("");
    setWidth("");
    setLength("");
    setPatternId("");
    setQuantity("1");
    setErrors({});
    onClear();
  }

  const formatThickness = (t: number) => (t < 1 ? `${t.toFixed(1).replace(".", ",")} mm` : t % 1 === 0 ? `${t} mm` : `${t.toFixed(1).replace(".", ",")} mm`);

  return (
    <div className="space-y-5">
      <Tabs value={mode} onValueChange={handleModeChange}>
        <TabsList className="grid w-full grid-cols-2 h-11">
          <TabsTrigger value="CUT" className="text-sm font-medium">Corte sob medida</TabsTrigger>
          <TabsTrigger value="FULL_SHEET" className="text-sm font-medium">Placa inteira</TabsTrigger>
        </TabsList>
      </Tabs>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Material */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Material</Label>
          <Select value={materialCode} onValueChange={handleMaterialChange}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Selecione o material" />
            </SelectTrigger>
            <SelectContent>
              {materials.map((m) => (
                <SelectItem key={m.code} value={m.code}>{m.displayName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.materialCode && <p className="text-sm text-destructive">{errors.materialCode}</p>}
        </div>

        {/* Espessura */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Espessura (mm)</Label>
          <Select value={thickness} onValueChange={handleThicknessChange} disabled={thicknesses.length === 0}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder={materialCode ? "Selecione a espessura" : "Selecione o material primeiro"} />
            </SelectTrigger>
            <SelectContent>
              {thicknesses.map((t) => (
                <SelectItem key={t} value={String(t)}>{formatThickness(t)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.thickness && <p className="text-sm text-destructive">{errors.thickness}</p>}
          {materialCode && thicknesses.length > 0 && (
            <p className="text-xs text-muted-foreground">{thicknesses.length} espessura(s) disponível(is)</p>
          )}
        </div>

        {mode === "CUT" ? (
          <>
            {/* Largura */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Largura (mm)</Label>
              <Input
                type="number"
                placeholder="Ex: 500"
                className="h-11"
                value={width}
                min={1}
                onChange={(e) => { setWidth(e.target.value); clearErr("width"); }}
              />
              {errors.width && <p className="text-sm text-destructive">{errors.width}</p>}
            </div>

            {/* Comprimento */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Comprimento (mm)</Label>
              <Input
                type="number"
                placeholder="Ex: 1000"
                className="h-11"
                value={length}
                min={1}
                onChange={(e) => { setLength(e.target.value); clearErr("length"); }}
              />
              {errors.length && <p className="text-sm text-destructive">{errors.length}</p>}
            </div>
          </>
        ) : (
          /* Padrão */
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Padrão</Label>
            <Select value={patternId} onValueChange={(v) => { setPatternId(v); clearErr("patternId"); }} disabled={patterns.length === 0}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder={thickness ? "Selecione o padrão" : "Selecione a espessura primeiro"} />
              </SelectTrigger>
              <SelectContent>
                {patterns.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.standardWidthMm} × {p.standardLengthMm} mm</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.patternId && <p className="text-sm text-destructive">{errors.patternId}</p>}
          </div>
        )}

        {/* Quantidade */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Quantidade</Label>
          <Input
            type="number"
            className="h-11"
            value={quantity}
            min={1}
            step={1}
            onChange={(e) => { setQuantity(e.target.value); clearErr("quantity"); }}
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
    </div>
  );
}
