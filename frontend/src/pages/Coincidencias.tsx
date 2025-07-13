// src/pages/Coincidencias.tsx
import React, { useEffect, useState } from "react";
import TablaCoincidencias from "@/components/TablaCoincidencias";
import FiltroConLimpieza from "@/components/FiltroConLimpieza";
import { getCoincidencias } from "@/services/api";
import { Coincidencia } from "@/types";

const Coincidencias = () => {
  const [coincidencias, setCoincidencias] = useState<Coincidencia[]>([]);
  const [filtros, setFiltros] = useState({ empresa: "", estado: "", fecha: "" });

  const cargarCoincidencias = async () => {
    const data = await getCoincidencias(filtros);
    setCoincidencias(data);
  };

  useEffect(() => {
    cargarCoincidencias();
  }, [filtros]);

  const limpiarFiltros = () => {
    setFiltros({ empresa: "", estado: "", fecha: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Coincidencias Detectadas</h1>
      <FiltroConLimpieza filtros={filtros} setFiltros={setFiltros} onLimpiar={limpiarFiltros} />
      <TablaCoincidencias data={coincidencias} />
    </div>
  );
};

export default Coincidencias;
