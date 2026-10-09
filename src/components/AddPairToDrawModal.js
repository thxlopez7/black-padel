"use client";

import { useState } from "react";
import { addPlayer, updateMatch } from "../lib/supabaseService";

export default function AddPairToDrawModal({
  isOpen,
  onClose,
  category,
  matches = [],
  onPlayerAdded,
  onMatchUpdated,
  showToast
}) {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !category) return null;

  // Filtrar y ordenar los partidos de Zona de esta categoría
  const zoneMatches = matches
    .filter(m => m.match_type === 'ZONE' && String(m.category_id) === String(category.id))
    .sort((a, b) => a.match_index - b.match_index);

  // Armar lista de todos los slots de zonas
  const slots = [];
  zoneMatches.forEach(m => {
    const isP1Bye = !m.p1_name || m.p1_name === 'BYE';
    const isP2Bye = !m.p2_name || m.p2_name === 'BYE';

    slots.push({
      id: `${m.id}-1`,
      matchId: m.id,
      match: m,
      slotNum: 1,
      zoneName: m.round_name,
      currentPair: m.p1_name || 'BYE',
      rivalPair: m.p2_name || 'BYE',
      isBye: isP1Bye
    });

    slots.push({
      id: `${m.id}-2`,
      matchId: m.id,
      match: m,
      slotNum: 2,
      zoneName: m.round_name,
      currentPair: m.p2_name || 'BYE',
      rivalPair: m.p1_name || 'BYE',
      isBye: isP2Bye
    });
  });

  const byeSlots = slots.filter(s => s.isBye);
  const selectedSlot = slots.find(s => s.id === selectedSlotId) || byeSlots[0] || slots[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!player1Name.trim()) {
      alert("Debes ingresar al menos el nombre del Jugador 1.");
      return;
    }

    if (!selectedSlot) {
      alert("Debes seleccionar una zona/slot para ubicar a la pareja.");
      return;
    }

    setIsSubmitting(true);
    try {
      const p1 = player1Name.trim();
      const p2 = player2Name.trim();
      const pairFullName = `${p1}${p2 ? ' & ' + p2 : ''}`;

      // 1. Guardar la pareja en la tabla 'players' de Supabase
      const newPlayerData = {
        name: p1,
        partner: p2 || null,
        category_id: category.id
      };
      const createdPlayer = await addPlayer(newPlayerData);

      // 2. Actualizar el partido en la tabla 'matches' de Supabase
      const match = selectedSlot.match;
      const isSlot1 = selectedSlot.slotNum === 1;

      const newP1Name = isSlot1 ? pairFullName : match.p1_name;
      const newP2Name = !isSlot1 ? pairFullName : match.p2_name;

      const isP1Bye = !newP1Name || newP1Name === 'BYE';
      const isP2Bye = !newP2Name || newP2Name === 'BYE';
      const hasBye = isP1Bye || isP2Bye;

      let autoWinner = null;
      let isComplete = false;
      if (isP1Bye && !isP2Bye) { autoWinner = newP2Name; isComplete = true; }
      else if (isP2Bye && !isP1Bye) { autoWinner = newP1Name; isComplete = true; }

      const matchUpdates = {
        p1_name: newP1Name,
        p2_name: newP2Name,
        is_bye: hasBye,
        is_wo: isComplete,
        winner: autoWinner,
        p1_score: null,
        p2_score: null
      };

      const updatedMatch = await updateMatch(match.id, matchUpdates);

      if (updatedMatch) {
        if (createdPlayer && onPlayerAdded) {
          onPlayerAdded(createdPlayer, "add");
        }
        if (onMatchUpdated) {
          await onMatchUpdated(updatedMatch);
        }
        if (showToast) {
          showToast(`Pareja "${pairFullName}" inscripta en ${selectedSlot.zoneName} con éxito.`);
        }
        handleClose();
      } else {
        alert("Error al asignar la pareja al partido en la base de datos.");
      }
    } catch (err) {
      console.error("Error al inscribir nueva pareja en cuadro:", err);
      alert("Ocurrió un error al guardar la nueva pareja.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setPlayer1Name("");
    setPlayer2Name("");
    setSelectedSlotId("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[110] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-up my-auto">
        
        {/* ENCABEZADO */}
        <div className="p-4 sm:p-6 border-b border-gray-800 bg-gray-950 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                Inscribir Pareja en Cuadro Activo
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Categoría: <span className="text-red-500 font-bold uppercase">{category.name}</span>
              </p>
            </div>
          </div>
          
          <button onClick={handleClose} disabled={isSubmitting} className="text-gray-500 hover:text-white transition-colors p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
          
          <div className="bg-gray-950 p-3 sm:p-3.5 rounded-xl border border-gray-800/80 text-xs text-gray-400">
            Agrega una nueva pareja tardía a una zona existente (reemplazando un pase libre <strong>BYE</strong> o sustituyendo a una pareja que se dio de baja) <strong>sin necesidad de borrar o volver a sortear el cuadro</strong>.
          </div>

          {/* DATOS DE LA NUEVA PAREJA */}
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-3.5 sm:p-4 space-y-3">
            <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest block">
              1. Datos de la Pareja
            </span>

            <div>
              <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">
                Jugador 1 *
              </label>
              <input
                type="text"
                value={player1Name}
                onChange={e => setPlayer1Name(e.target.value)}
                placeholder="Nombre del Jugador 1"
                required
                className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-base sm:text-xs text-white focus:border-red-600 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">
                Jugador 2 (Compañero)
              </label>
              <input
                type="text"
                value={player2Name}
                onChange={e => setPlayer2Name(e.target.value)}
                placeholder="Nombre del Compañero (opcional)"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-base sm:text-xs text-white focus:border-red-600 outline-none transition-colors"
              />
            </div>
          </div>

          {/* ASIGNACIÓN A ZONA */}
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 space-y-3">
            <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest block">
              2. Ubicación en las Zonas
            </span>

            <div>
              <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">
                Seleccionar Zona y Posición
              </label>
              <select
                value={selectedSlot?.id || ""}
                onChange={e => setSelectedSlotId(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:border-red-600 outline-none"
              >
                {byeSlots.length > 0 && (
                  <optgroup label="✨ Huecos Disponibles (BYEs)">
                    {byeSlots.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.zoneName} - Reemplaza BYE (vs {s.rivalPair})
                      </option>
                    ))}
                  </optgroup>
                )}

                <optgroup label="Sustituir Pareja Existente">
                  {slots.filter(s => !s.isBye).map(s => (
                    <option key={s.id} value={s.id}>
                      {s.zoneName} - Reemplaza a "{s.currentPair}"
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {selectedSlot && (
              <div className="p-3 bg-gray-900 rounded-lg border border-gray-800 text-xs">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-1">
                  Resumen de la Asignación:
                </span>
                <p className="text-gray-200">
                  La pareja ingresará a la <strong className="text-red-400">{selectedSlot.zoneName}</strong>.
                </p>
                <p className="text-gray-400 mt-1">
                  Rival de zona: <strong className="text-white">{selectedSlot.rivalPair || 'Esperando...'}</strong>
                </p>
                {selectedSlot.isBye ? (
                  <span className="inline-block mt-2 text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded font-bold">
                    ✓ Habilita el partido para jugarse (elimina el pase directo por BYE).
                  </span>
                ) : (
                  <span className="inline-block mt-2 text-[10px] bg-yellow-950/60 text-yellow-400 border border-yellow-800/60 px-2 py-0.5 rounded font-bold">
                    ⚠️ Reemplazará a la pareja "{selectedSlot.currentPair}".
                  </span>
                )}
              </div>
            )}
          </div>

          {/* ACCIONES */}
          <div className="pt-3 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
            <button 
              type="button" 
              onClick={handleClose} 
              disabled={isSubmitting} 
              className="w-full sm:w-auto px-5 py-3 sm:py-2.5 text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider rounded-lg border border-gray-800 hover:bg-gray-800 text-center"
            >
              Cancelar
            </button>

            <button 
              type="submit" 
              disabled={isSubmitting || !player1Name.trim()} 
              className="w-full sm:w-auto bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-bold px-6 py-3 sm:py-2.5 rounded-lg text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Inscribiendo en Cuadro...</span>
                </>
              ) : (
                "Inscribir y Asignar al Cuadro"
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
