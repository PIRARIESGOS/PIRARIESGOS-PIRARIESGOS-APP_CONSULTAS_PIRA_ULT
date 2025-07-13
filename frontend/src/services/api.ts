// src/services/api.ts
import axios from "axios";
import { getToken } from "./authStore";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para incluir token en cada solicitud
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Ejemplo: Obtener coincidencias con filtros
export const getCoincidencias = async (filtros: any) => {
  const response = await api.post("/coincidencias/buscar", filtros);
  return response.data;
};

// Obtener historial de tareas
export const getHistorialTareas = async (filtros: any) => {
  const response = await api.post("/tareas/historial", filtros);
  return response.data;
};

// Obtener eventos de auditoría
export const getAuditoriaEventos = async (filtros: any) => {
  const response = await api.post("/auditoria/listar", filtros);
  return response.data;
};

// Exportar coincidencias o tareas
export const exportarResultados = async (tipo: string, filtros: any) => {
  const response = await api.post(`/exportar/${tipo}`, filtros, {
    responseType: "blob",
  });
  return response.data;
};

export default api;
