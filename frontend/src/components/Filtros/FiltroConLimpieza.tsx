// src/components/FiltroConLimpieza.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

interface Props {
  filtros: { [clave: string]: string };
  setFiltros: (val: { [clave: string]: string }) => void;
  onBuscar: () => void;
}

const FiltroConLimpieza: React.FC<Props> = ({ filtros, setFiltros, onBuscar }) => {
  const limpiarFiltros = () => {
    const camposVacios = Object.fromEntries(Object.keys(filtros).map((k) => [k, ""]));
    setFiltros(camposVacios);
    onBuscar();
  };

  return (
    <div className="flex flex-wrap items-end gap-2 p-2 bg-muted/50 rounded-xl">
      <Input
        placeholder="Buscar por nombre..."
        value={filtros.nombre || ""}
        onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
        className="w-64"
      />
      <Input
        placeholder="Buscar por documento..."
        value={filtros.documento || ""}
        onChange={(e) => setFiltros({ ...filtros, documento: e.target.value })}
        className="w-64"
      />
      <Button onClick={onBuscar} variant="default">
        Buscar
      </Button>
      <Button onClick={limpiarFiltros} variant="ghost" className="text-destructive">
        <XIcon className="w-4 h-4 mr-1" />
        Limpiar filtros
      </Button>
    </div>
  );
};

export default FiltroConLimpieza;
