// src/components/layout/Sidebar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  Users,
  FileText,
  ShieldCheck,
  Clock,
  HelpCircle,
  Settings,
  LogOut,
  Archive,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();

  const menu = [
    { to: "/panel", label: "Inicio", icon: <LayoutDashboard /> },
    { to: "/consultas", label: "Consultas", icon: <Search /> },
    { to: "/usuarios", label: "Usuarios", icon: <Users />, roles: ["admin"] },
    { to: "/bases", label: "Bases", icon: <FileText />, roles: ["admin"] },
    { to: "/coincidencias", label: "Coincidencias", icon: <ShieldCheck /> },
    { to: "/tareas", label: "Historial Tareas", icon: <Clock /> },
    { to: "/auditoria", label: "Auditoría", icon: <Archive />, roles: ["admin", "validador"] },
    { to: "/wiki", label: "Ayuda", icon: <HelpCircle /> },
    { to: "/configuracion", label: "Configuración", icon: <Settings />, roles: ["admin"] },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col justify-between">
      <nav className="p-4">
        <h2 className="text-xl font-bold mb-6">PIRA RIESGOS</h2>
        <ul className="space-y-2">
          {menu
            .filter((item) => !item.roles || item.roles.includes(user?.rol || ""))
            .map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                    pathname === item.to ? "bg-gray-800 font-semibold" : ""
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="flex items-center gap-2 p-2 w-full rounded hover:bg-red-700"
        >
          <LogOut /> Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
