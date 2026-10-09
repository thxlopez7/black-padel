"use client";

import { useState } from "react";

export function PromptModal({ title, placeholder, onConfirm, onCancel }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) onConfirm(value.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-3 sm:p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-up">
        <div className="p-4 sm:p-6 border-b border-gray-800">
          <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <input 
            type="text" 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-base sm:text-sm text-white outline-none focus:border-red-600 transition-colors"
            placeholder={placeholder}
            autoFocus
          />
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-2">
            <button 
              type="button" 
              onClick={onCancel} 
              className="w-full sm:w-auto px-4 py-2.5 sm:py-2 text-gray-400 hover:text-white transition-colors text-xs font-bold rounded-lg border border-gray-800 hover:bg-gray-800 text-center uppercase tracking-wider"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="w-full sm:w-auto bg-red-700 hover:bg-red-600 text-white px-5 py-2.5 sm:py-2 rounded-lg text-xs font-bold transition-colors text-center uppercase tracking-wider"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 left-3 sm:left-auto sm:max-w-sm z-[120] bg-gray-900/95 backdrop-blur-md border border-red-600/50 shadow-2xl rounded-xl p-3.5 sm:p-4 flex items-center gap-3 animate-fade-up">
      <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center text-red-500 shrink-0">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
      </div>
      <p className="text-white text-xs sm:text-sm font-medium flex-1">{message}</p>
      <button onClick={onClose} className="p-1 text-gray-400 hover:text-white shrink-0">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
  );
}
