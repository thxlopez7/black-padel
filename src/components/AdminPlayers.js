"use client";

import { useState } from "react";
import { addPlayer, deletePlayer, updatePlayer } from "../lib/supabaseService";
import { normalizePairName, samePair } from "../lib/tournamentLogic";

const labelOf = (p) => normalizePairName(`${p.name}${p.partner ? ' & ' + p.partner : ''}`);

export default function AdminPlayers({ players, categories, matches = [], onBack, onPlayersUpdate, onPairRenamed, showToast }) {
  const [selectedCatId, setSelectedCatId] = useState("all");
  
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editingId, setEditingId] = useState(null);

  const resetForm = () => {
    setEditingId(null);
    setName1("");
    setName2("");
    setCategoryId("");
  };

  const handleSavePlayer = async () => {
    const player1 = normalizePairName(name1).replace(/&/g, '').trim();
    const player2 = normalizePairName(name2).replace(/&/g, '').trim();
    if (!player1) return showToast("Ingresa el nombre del jugador 1.", "error");

    const targetCat = categoryId || (selectedCatId !== "all" ? selectedCatId : null);
    if (!targetCat) return showToast("Selecciona una categoría.", "error");

    const label = labelOf({ name: player1, partner: player2 });
    const duplicated = players.some(p => p.id !== editingId && p.category_id === targetCat && samePair(labelOf(p), label));
    if (duplicated) return showToast("Esa pareja ya está en la categoría.", "error");
    if (label.toUpperCase() === 'BYE') return showToast("Nombre no válido.", "error");

    const original = editingId ? players.find(p => p.id === editingId) : null;
    const inDraw = original && isInDraw(original);
    if (inDraw && original.category_id !== targetCat) {
      return showToast("Ya juega en el cuadro de su categoría. No se puede mover.", "error");
    }

    const playerData = {
      name: player1,
      partner: player2 || null,
      category_id: targetCat
    };
    const targetCategory = categories.find(c => c.id === targetCat);
    const drawDone = targetCategory && ['bracket', 'americano'].includes(targetCategory.current_step);
    const drawNotice = drawDone && !inDraw ? " Sumala al cuadro desde Configurar torneo." : "";

    if (editingId) {
      const updated = await updatePlayer(editingId, playerData);
      if (!updated) return showToast("No se pudo actualizar la pareja.", "error");
      onPlayersUpdate(updated, "update");
      if (inDraw && !samePair(labelOf(original), label) && !(await onPairRenamed(targetCat, labelOf(original), label))) {
        return showToast("Se guardó, pero el cuadro no se pudo actualizar.", "error");
      }
      resetForm();
      showToast("Pareja actualizada." + drawNotice);
    } else {
      const added = await addPlayer(playerData);
      if (!added) return showToast("No se pudo registrar la pareja.", "error");
      onPlayersUpdate(added, "add");
      resetForm();
      showToast("Pareja registrada." + drawNotice);
    }
  };

  const handleEditClick = (p) => {
    setEditingId(p.id);
    setName1(p.name);
    setName2(p.partner || "");
    setCategoryId(p.category_id || "");
  };

  // ¿La pareja ya figura en el cuadro de su categoría?
  const isInDraw = (p) => matches.some(m => m.category_id === p.category_id && [m.p1_name, m.p2_name].some(n => n && samePair(n, labelOf(p))));

  const handleDeletePlayer = async (id) => {
    const player = players.find(p => p.id === id);
    const message = player && isInDraw(player)
      ? "Ya está en el cuadro y seguirá ahí (cargá W.O. si se retira). ¿Eliminar?"
      : "¿Eliminar esta pareja?";
    if (confirm(message)) {
      const success = await deletePlayer(id);
      if (success) {
        onPlayersUpdate({ id }, "delete");
        showToast("Pareja eliminada.");
      } else {
        showToast("No se pudo eliminar la pareja.", "error");
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
          <h2 className="text-2xl font-light text-white">Parejas <span className="font-bold text-red-500">inscriptas</span></h2>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR: Filtros por Categoria */}
        <div className="lg:col-span-1 flex flex-col gap-2">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-2">Categoría</h3>
          <button 
            onClick={() => setSelectedCatId("all")}
            className={`text-left px-4 py-3 rounded-xl border transition-all text-sm font-semibold ${selectedCatId === "all" ? 'bg-red-600/10 border-red-600/50 text-red-500 shadow-md' : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800'}`}
          >
            Todos los Jugadores
          </button>
          {categories.map(c => (
            <button 
              key={c.id}
              onClick={() => setSelectedCatId(c.id)}
              className={`text-left px-4 py-3 rounded-xl border transition-all text-sm font-semibold flex justify-between items-center ${selectedCatId === c.id ? 'bg-red-600/10 border-red-600/50 text-red-500 shadow-md' : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800'}`}
            >
              <span className="truncate">{c.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${selectedCatId === c.id ? 'bg-red-600/20 text-red-300' : 'bg-gray-800'}`}>
                {players.filter(p => p.category_id === c.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="lg:col-span-3 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col h-fit">
          
          {/* Formulario Arriba */}
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-5 mb-8">
             <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest flex justify-between items-center">
               <span>{editingId ? 'Editar pareja' : 'Nueva pareja'}</span>
               {editingId && <button onClick={resetForm} className="text-xs text-red-400 hover:underline">Cancelar</button>}
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1.5 font-medium">Jugador 1</label>
                  <input type="text" value={name1} onChange={e => setName1(e.target.value)} className="w-full bg-black border border-gray-800 rounded p-2.5 text-sm text-white outline-none focus:border-red-600 transition-colors" placeholder="Nombre y apellido" />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1.5 font-medium">Jugador 2 (opcional)</label>
                  <input type="text" value={name2} onChange={e => setName2(e.target.value)} className="w-full bg-black border border-gray-800 rounded p-2.5 text-sm text-white outline-none focus:border-red-600 transition-colors" placeholder="Nombre y apellido" />
                </div>
                {selectedCatId === "all" && !editingId ? (
                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1.5 font-medium">Categoría</label>
                    <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full bg-black border border-gray-800 rounded p-2.5 text-sm text-white outline-none focus:border-red-600 transition-colors">
                      <option value="">Categoría</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                ) : editingId ? (
                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1.5 font-medium">Categoría</label>
                    <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full bg-black border border-gray-800 rounded p-2.5 text-sm text-white outline-none focus:border-red-600 transition-colors">
                      <option value="">Categoría</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                ) : null}
                
                <button onClick={handleSavePlayer} className={`w-full ${editingId ? 'bg-white text-gray-900 hover:bg-gray-300' : 'bg-red-600 text-white hover:bg-red-500'} font-bold py-2.5 rounded text-xs uppercase tracking-widest transition-all shadow-md md:col-span-full mt-2`}>
                  {editingId ? 'Guardar cambios' : `Agregar a ${selectedCatId === "all" ? 'la categoría seleccionada' : categories.find(c=>c.id===selectedCatId)?.name}`}
                </button>
             </div>
          </div>

          {/* Lista de Jugadores Filtrada */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest border-b border-gray-800 pb-2">
              Mostrando: {selectedCatId === "all" ? "Todas las categorías" : categories.find(c=>c.id===selectedCatId)?.name}
            </h3>
            
            <div className="space-y-3 md:overflow-y-auto md:max-h-[500px] md:overscroll-contain custom-scrollbar pr-2">
              {filteredPlayers.length === 0 ? (
                <div className="text-sm text-gray-500 italic p-4 text-center border border-dashed border-gray-800 rounded-lg">No hay parejas inscriptas.</div>
              ) : (
                filteredPlayers.map(p => {
                  const catName = categories.find(c => c.id === p.category_id)?.name || p.categories?.name || 'Sin categoría';
                  return (
                    <div key={p.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-950 p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors group gap-4">
                      <div className="flex items-center gap-4 w-full sm:w-auto overflow-hidden">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-red-500 font-bold text-sm uppercase">
                          {p.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm text-white font-bold break-words">{p.name} {p.partner ? `& ${p.partner}` : ''}</div>
                          {selectedCatId === "all" && <div className="text-[10px] text-red-500 uppercase tracking-widest mt-0.5 truncate">{catName}</div>}
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto justify-end opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEditClick(p)} className="shrink-0 text-gray-400 hover:text-gray-300 bg-gray-900 p-2 rounded-lg border border-gray-800 hover:border-white/50 transition-colors" title="Editar pareja">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                        <button onClick={() => handleDeletePlayer(p.id)} className="shrink-0 text-gray-400 hover:text-red-400 bg-gray-900 p-2 rounded-lg border border-gray-800 hover:border-red-500/50 transition-colors" title="Eliminar pareja">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
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
