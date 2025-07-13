// src/utils/exportHelpers.ts
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToExcel = (data: any[], fileName: string) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Datos");
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};

export const exportToPDF = (columns: string[], data: any[], fileName: string) => {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [columns],
    body: data.map((row) => columns.map((col) => row[col] ?? "")),
  });
  doc.save(`${fileName}.pdf`);
};
