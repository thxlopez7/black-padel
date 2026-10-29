"use client";

import { useState } from "react";
import { loginAdmin } from "../lib/supabaseService";
import Modal from "./Modal";

export default function AdminLogin({ onLoginSuccess, onCancel }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      await loginAdmin(email, password);
      onLoginSuccess();
    } catch {
      setErrorMsg("Correo o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      onClose={onCancel}
      title={<>
        <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        Acceso de administración
      </>}
    >
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded text-sm text-center">
              {errorMsg}
            </div>
          )}
          
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5 font-bold">Correo electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded p-3 text-white outline-none focus:border-red-600 transition-colors"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5 font-bold">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded p-3 text-white outline-none focus:border-red-600 transition-colors"
              
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg mt-4 uppercase tracking-widest transition-colors flex justify-center items-center gap-2"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : "Ingresar"}
          </button>
        </form>
    </Modal>
  );
}
