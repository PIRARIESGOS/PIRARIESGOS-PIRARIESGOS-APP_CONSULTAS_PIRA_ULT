import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#34D399", "#FBBF24", "#EF4444", "#3B82F6"];

const EstadisticasResumen: React.FC = () => {
  const [resumen, setResumen] = useState({
    tareas_totales: 0,
    tareas_completadas: 0,
    coincidencias: 0,
    usuarios_activos: 0,
  });

  useEffect(() => {
    axios.get("/api/estadisticas/resumen").then((res) => {
      setResumen(res.data);
    });
  }, []);

  const dataChart = [
    { name: "Completadas", value: resumen.tareas_completadas },
    { name: "Pendientes", value: resumen.tareas_totales - resumen.tareas_completadas },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 p-6">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">Tareas</h3>
          <p>Total: {resumen.tareas_totales}</p>
          <p>Completadas: {resumen.tareas_completadas}</p>
          <div className="h-48 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataChart}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  label
                >
                  {dataChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">Resumen General</h3>
          <ul className="text-sm space-y-1">
            <li>Coincidencias encontradas: <strong>{resumen.coincidencias}</strong></li>
            <li>Usuarios activos: <strong>{resumen.usuarios_activos}</strong></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default EstadisticasResumen;

TablaCoincidencias.tsx
// src/components/TablaCoincidencias.tsx
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Coincidencia } from "@/types";

interface Props {
  coincidencias: Coincidencia[];
}

const TablaCoincidencias: React.FC<Props> = ({ coincidencias }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Documento</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Base Coincidente</TableHead>
            <TableHead>Nivel</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coincidencias.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.documento}</TableCell>
              <TableCell>{c.nombre}</TableCell>
              <TableCell>{c.base_origen}</TableCell>
              <TableCell>
                <Badge
                  className={
                    c.nivel === "Alto"
                      ? "bg-red-600"
                      : c.nivel === "Medio"
                      ? "bg-yellow-500"
                      : "bg-green-600"
                  }
                >
                  {c.nivel}
                </Badge>
              </TableCell>
              <TableCell>{c.estado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TablaCoincidencias;


FiltroConLimpieza.tsx
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
