// src/pages/HistorialTareas.tsx
import React, { useEffect, useState } from "react";
import TablaHistorial from "@/components/TablaHistorial";
import FiltroConLimpieza from "@/components/FiltroConLimpieza";
import { getHistorialTareas } from "@/services/api";
import { Tarea } from "@/types";

const HistorialTareas = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [filtros, setFiltros] = useState({ empresa: "", fecha: "", estado: "" });

  const cargarTareas = async () => {
    const data = await getHistorialTareas(filtros);
    setTareas(data);
  };

  useEffect(() => {
    cargarTareas();
  }, [filtros]);

  const limpiarFiltros = () => {
    setFiltros({ empresa: "", fecha: "", estado: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Historial de Tareas</h1>
      <FiltroConLimpieza filtros={filtros} setFiltros={setFiltros} onLimpiar={limpiarFiltros} />
      <TablaHistorial data={tareas} />
    </div>
  );
};

export default HistorialTareas;
