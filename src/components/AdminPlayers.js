"use client";

import { useState } from "react";
import { addPlayer, deletePlayer, updatePlayer } from "../lib/supabaseService";

export default function AdminPlayers({ players, categories, onBack, onPlayersUpdate, showToast }) {
  const [selectedCatId, setSelectedCatId] = useState("all");
  
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSavePlayer = async () => {
    if (!name1) {
      showToast("Debes ingresar al menos el nombre del Jugador 1");
      return;
    }
    
    const targetCat = categoryId || (selectedCatId !== "all" ? selectedCatId : null);
    const playerData = {
      name: name1,
      partner: name2 || null,
      category_id: targetCat
    };

    if (editingId) {
      const updated = await updatePlayer(editingId, playerData);
      if (updated) {
        onPlayersUpdate(updated, "update");
        setEditingId(null);
        setName1("");
        setName2("");
        setCategoryId("");
        showToast("Jugador actualizado");
      } else {
        showToast("Error al actualizar");
      }
    } else {
      const added = await addPlayer(playerData);
      if (added) {
        onPlayersUpdate(added, "add");
        setName1("");
        setName2("");
        setCategoryId("");
        showToast("Jugador registrado con éxito");
      } else {
        showToast("Error al registrar el jugador");
      }
    }
  };

  const handleEditClick = (p) => {
    setEditingId(p.id);
    setName1(p.name);
    setName2(p.partner || "");
    setCategoryId(p.category_id || "");
  };

  const handleDeletePlayer = async (id) => {
    if (confirm("¿Seguro que quieres eliminar este jugador?")) {
      const success = await deletePlayer(id);
      if (success) {
        onPlayersUpdate({ id }, "delete");
        showToast("Jugador eliminado");
      } else {
        showToast("Error al eliminar el jugador");
      }
    }
  };

  const filteredPlayers = selectedCatId === "all" 
    ? players 
    : players.filter(p => p.category_id === selectedCatId);

  return (
    <div className="animate-fade-up max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-400 hover:text-white text-xs flex items-center gap-2 transition-colors bg-gray-900 py-2 px-4 rounded border border-gray-800 uppercase tracking-widest font-semibold">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Volver
          </button>
          <h2 className="text-2xl font-light text-white">Directorio de <span className="font-bold text-red-500">Jugadores</span></h2>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* SIDEBAR / CHIPS HORIZONTALES EN MÓVIL: Filtros por Categoria */}
        <div className="lg:col-span-1 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 custom-scrollbar flex-nowrap">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-2 hidden lg:block">Filtrar por Categoría</h3>
          <button 
            onClick={() => setSelectedCatId("all")}
            className={`flex-shrink-0 text-left px-3.5 py-2.5 lg:py-3 rounded-xl border transition-all text-xs lg:text-sm font-semibold whitespace-nowrap ${selectedCatId === "all" ? 'bg-red-950/60 border-red-800 text-red-400 shadow-md' : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800'}`}
          >
            Todos ({players.length})
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
          
          {/* Formulario Arriba */}
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 sm:p-5 mb-6 sm:mb-8">
             <h3 className="text-xs sm:text-sm font-bold text-white mb-3 sm:mb-4 uppercase tracking-wider flex justify-between items-center">
               <span>{editingId ? 'Editando Pareja / Jugador' : 'Inscribir Nueva Pareja'}</span>
               {editingId && (
                 <button 
                   onClick={() => { setEditingId(null); setName1(''); setName2(''); setCategoryId(''); }} 
                   className="text-xs text-red-400 hover:underline font-normal"
                 >
                   Cancelar
                 </button>
               )}
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 items-end">
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">Jugador 1 *</label>
                  <input type="text" value={name1} onChange={e => setName1(e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-base sm:text-sm text-white outline-none focus:border-red-600 transition-colors" placeholder="Ej: Juan Pérez" />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">Jugador 2 (Pareja)</label>
                  <input type="text" value={name2} onChange={e => setName2(e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-base sm:text-sm text-white outline-none focus:border-red-600 transition-colors" placeholder="Ej: Carlos Gómez" />
                </div>
                {selectedCatId === "all" && !editingId ? (
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">Categoría *</label>
                    <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-base sm:text-sm text-white outline-none focus:border-red-600 transition-colors">
                      <option value="">Seleccionar Categoría</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                ) : editingId ? (
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">Categoría *</label>
                    <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-base sm:text-sm text-white outline-none focus:border-red-600 transition-colors">
                      <option value="">Sin Categoría</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                ) : null}
                
                <button onClick={handleSavePlayer} className={`w-full ${editingId ? 'bg-white text-gray-900 hover:bg-gray-200' : 'bg-red-700 text-white hover:bg-red-600'} font-bold py-3 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md sm:col-span-2 md:col-span-full mt-1`}>
                  {editingId ? 'Guardar Cambios' : `Inscribir Pareja`}
                </button>
             </div>
          </div>

          {/* Lista de Jugadores Filtrada */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-gray-800 pb-2">
              <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                {selectedCatId === "all" ? "Todos los inscriptos" : categories.find(c=>c.id===selectedCatId)?.name}
              </h3>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                {filteredPlayers.length} parejas
              </span>
            </div>
            
            <div className="space-y-2.5 overflow-y-auto max-h-[500px] custom-scrollbar pr-1 sm:pr-2">
              {filteredPlayers.length === 0 ? (
                <div className="text-sm text-gray-500 italic p-6 text-center border border-dashed border-gray-800 rounded-xl">No hay jugadores en esta categoría.</div>
              ) : (
                filteredPlayers.map(p => {
                  const catName = categories.find(c => c.id === p.category_id)?.name || p.categories?.name || 'Sin categoría';
                  return (
                    <div key={p.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-950 p-3.5 sm:p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors gap-3">
                      <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
                        <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-950/40 border border-red-800/40 flex items-center justify-center text-red-500 font-bold text-xs sm:text-sm uppercase">
                          {p.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm text-white font-bold break-words">{p.name} {p.partner ? `& ${p.partner}` : ''}</div>
                          {selectedCatId === "all" && <div className="text-[10px] text-red-400 uppercase tracking-widest mt-0.5 truncate">{catName}</div>}
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t border-gray-900 sm:border-0">
                        <button onClick={() => handleEditClick(p)} className="flex-1 sm:flex-initial text-xs text-gray-300 hover:text-white bg-gray-900 py-1.5 px-3 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors flex items-center justify-center gap-1 font-semibold" title="Editar Jugador">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                          <span>Editar</span>
                        </button>
                        <button onClick={() => handleDeletePlayer(p.id)} className="flex-1 sm:flex-initial text-xs text-red-400 hover:text-red-300 bg-red-950/30 py-1.5 px-3 rounded-lg border border-red-900/40 hover:border-red-800 transition-colors flex items-center justify-center gap-1 font-semibold" title="Eliminar Jugador">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          <span>Eliminar</span>
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
    </div>
  );
}
