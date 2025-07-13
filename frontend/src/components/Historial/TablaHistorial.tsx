// src/components/TablaHistorial.tsx
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { format } from "date-fns";

interface HistorialItem {
  id: number;
  fecha: string;
  usuario: string;
  accion: string;
  tipo: string;
  estado: string;
}

interface Props {
  datos: HistorialItem[];
}

const TablaHistorial: React.FC<Props> = ({ datos }) => {
  return (
    <div className="overflow-auto rounded-xl border shadow-sm bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Acción</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {datos.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{format(new Date(item.fecha), "dd/MM/yyyy HH:mm")}</TableCell>
              <TableCell>{item.usuario}</TableCell>
              <TableCell>{item.accion}</TableCell>
              <TableCell>{item.tipo}</TableCell>
              <TableCell>{item.estado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TablaHistorial;
