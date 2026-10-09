"use client";

import { useState } from "react";
import { updatePlayerPayment } from "../lib/supabaseService";

export default function AdminPayments({ players, categories, onBack, onPlayersUpdate, showToast }) {
  const [selectedCatId, setSelectedCatId] = useState("all");

  const handleTogglePayment = async (player) => {
    const newStatus = !player.has_paid;
    const updatedPlayer = await updatePlayerPayment(player.id, newStatus);
    if (updatedPlayer) {
      onPlayersUpdate(updatedPlayer, "update");
    } else {
      showToast("Aviso: Debes crear la columna 'has_paid' BOOLEAN en la tabla 'players' en Supabase para guardar pagos permanentemente.");
      // Actualizamos localmente para que puedan seguir probando
      onPlayersUpdate({...player, has_paid: newStatus}, "update");
    }
  };

  const filteredPlayers = selectedCatId === "all" 
    ? players 
    : players.filter(p => p.category_id === selectedCatId);

  const paidCount = filteredPlayers.filter(p => p.has_paid).length;
  const totalCount = filteredPlayers.length;

  return (
    <div className="animate-fade-up max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-400 hover:text-white text-xs flex items-center gap-2 transition-colors bg-gray-900 py-2 px-4 rounded border border-gray-800 uppercase tracking-widest font-semibold">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Volver
          </button>
          <h2 className="text-2xl font-light text-white">Control de <span className="font-bold text-gray-300">Pagos e Inscripciones</span></h2>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* SIDEBAR / CHIPS HORIZONTALES EN MÓVIL: Filtros por Categoria */}
        <div className="lg:col-span-1 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 custom-scrollbar flex-nowrap">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-2 hidden lg:block">Seleccionar Categoría</h3>
          <button 
            onClick={() => setSelectedCatId("all")}
            className={`flex-shrink-0 text-left px-3.5 py-2.5 lg:py-3 rounded-xl border transition-all text-xs lg:text-sm font-semibold whitespace-nowrap ${selectedCatId === "all" ? 'bg-red-950/60 border-red-800 text-red-400 shadow-md' : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800'}`}
          >
            Vista General ({players.length})
          </button>
          {categories.map(c => {
            const count = players.filter(p => p.category_id === c.id).length;
            return (
              <button 
                key={c.id}
                onClick={() => setSelectedCatId(c.id)}
                className={`flex-shrink-0 text-left px-3.5 py-2.5 lg:py-3 rounded-xl border transition-all text-xs lg:text-sm font-semibold flex items-center justify-between gap-3 whitespace-nowrap ${selectedCatId === c.id ? 'bg-red-950/60 border-red-800 text-red-400 shadow-md' : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800'}`}
              >
                <span>{c.name}</span>
                <span className="text-[10px] text-gray-500 font-mono">({count})</span>
              </button>
            );
          })}
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="lg:col-span-3 bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col h-fit">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 border-b border-gray-800 pb-4 gap-4">
             <div>
               <h3 className="text-base sm:text-lg font-bold text-white">
                 {selectedCatId === "all" ? "Todos los inscriptos" : categories.find(c=>c.id===selectedCatId)?.name}
               </h3>
               <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-widest">Aprobación de estado de cuenta</p>
             </div>
             
             <div className="flex items-center gap-4 bg-gray-950 border border-gray-800 px-4 py-2 rounded-xl self-stretch sm:self-auto justify-around sm:justify-start">
                <div className="text-center">
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Total Inscriptos</p>
                   <p className="text-lg font-bold text-white">{totalCount}</p>
                </div>
                <div className="w-px h-8 bg-gray-800"></div>
                <div className="text-center">
                   <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">Abonaron</p>
                   <p className="text-lg font-bold text-emerald-400">{paidCount}</p>
                </div>
             </div>
          </div>
          
          <div className="space-y-3 overflow-y-auto max-h-[600px] custom-scrollbar pr-1 sm:pr-2">
            {filteredPlayers.length === 0 ? (
              <div className="text-sm text-gray-500 italic p-6 text-center border border-dashed border-gray-800 rounded-xl">No hay jugadores para mostrar en esta categoría.</div>
            ) : (
              filteredPlayers.map(p => {
                const catName = categories.find(c => c.id === p.category_id)?.name || p.categories?.name || 'Sin categoría';
                return (
                  <div key={p.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-950 p-3.5 sm:p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
                      <div className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-xs sm:text-sm font-bold uppercase transition-colors ${p.has_paid ? 'bg-emerald-950/40 border-emerald-700/50 text-emerald-400' : 'bg-gray-800 border-gray-700 text-gray-500'}`}>
                        {p.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-white break-words">{p.name} {p.partner ? `& ${p.partner}` : ''}</div>
                        {selectedCatId === "all" && <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5 truncate">{catName}</div>}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t border-gray-900 sm:border-0">
                      <span className={`shrink-0 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg border ${p.has_paid ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60' : 'bg-gray-900 text-gray-400 border-gray-800'}`}>
                        {p.has_paid ? '✓ Abonado' : 'Pendiente'}
                      </span>
                      <button 
                        onClick={() => handleTogglePayment(p)}
                        className={`shrink-0 relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${p.has_paid ? 'bg-emerald-600' : 'bg-gray-800 border border-gray-700'}`}
                        title={p.has_paid ? "Marcar como impago" : "Marcar como pagado"}
                      >
                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${p.has_paid ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
