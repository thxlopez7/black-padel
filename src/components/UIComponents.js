"use client";

import { useState } from "react";

export function PromptModal({ title, placeholder, onConfirm, onCancel }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) onConfirm(value.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-up">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input 
            type="text" 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-gray-950 border border-gray-800 rounded p-3 text-white outline-none focus:border-red-600 transition-colors"
            placeholder={placeholder}
            autoFocus
          />
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-bold">
              Cancelar
            </button>
            <button type="submit" className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-bold transition-colors">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Toast({ message, type = "success", onClose }) {
  if (!message) return null;
  const isError = type === "error";
  return (
    <div role="status" className={`fixed bottom-20 md:bottom-4 right-4 left-4 md:left-auto md:max-w-md z-[110] bg-gray-900 border shadow-lg rounded-lg p-4 flex items-center gap-3 animate-fade-up ${isError ? "border-red-500" : "border-gray-700"}`}>
      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isError ? "bg-red-600/30 text-red-400" : "bg-white/10 text-white"}`}>
        {isError ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path></svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        )}
      </div>
      <p className="text-white text-sm font-medium flex-1">{message}</p>
      <button onClick={onClose} className="ml-2 text-gray-500 hover:text-white" aria-label="Cerrar aviso">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
  );
}

// Nombre de pareja en dos líneas (un jugador por línea) para que entre completo en pantallas chicas
export function PairName({ name, fallback = "A definir" }) {
  if (!name) return <span className="italic opacity-60">{fallback}</span>;
  const players = name.split("&").map(p => p.trim()).filter(Boolean);
  if (players.length < 2) return <span className="break-words">{name}</span>;
  return (
    <span className="flex flex-col leading-tight min-w-0">
      {players.map((p, i) => <span key={i} className="break-words">{p}</span>)}
    </span>
  );
}
