// src/pages/Auditoria.tsx
import React, { useEffect, useState } from "react";
import { getAuditoriaEventos } from "@/services/api";
import TablaAuditoria from "@/components/TablaAuditoria";
import FiltroConLimpieza from "@/components/FiltroConLimpieza";
import { EventoAuditoria } from "@/types";

const Auditoria = () => {
  const [eventos, setEventos] = useState<EventoAuditoria[]>([]);
  const [filtros, setFiltros] = useState({ usuario: "", tipo: "", fecha: "" });

  const cargarAuditoria = async () => {
    const data = await getAuditoriaEventos(filtros);
    setEventos(data);
  };

  useEffect(() => {
    cargarAuditoria();
  }, [filtros]);

  const limpiarFiltros = () => {
    setFiltros({ usuario: "", tipo: "", fecha: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Registro de Auditoría</h1>
      <FiltroConLimpieza filtros={filtros} setFiltros={setFiltros} onLimpiar={limpiarFiltros} />
      <TablaAuditoria data={eventos} />
    </div>
  );
};

export default Auditoria;
