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
