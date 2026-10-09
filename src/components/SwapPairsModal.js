"use client";

import { useState } from "react";

export default function SwapPairsModal({
  isOpen,
  onClose,
  category,
  matches = [],
  onSwap
}) {
  const [selectedSlotA, setSelectedSlotA] = useState("");
  const [selectedSlotB, setSelectedSlotB] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen || !category) return null;

  // Filtrar y ordenar los partidos de Zona de esta categoría
  const zoneMatches = matches
    .filter(m => m.match_type === 'ZONE' && String(m.category_id) === String(category.id))
    .sort((a, b) => a.match_index - b.match_index);

  // Armar lista de todos los slots de parejas en las zonas
  const slots = [];
  zoneMatches.forEach(m => {
    slots.push({
      id: `${m.id}-1`,
      matchId: m.id,
      match: m,
      slotNum: 1,
      zoneName: m.round_name,
      pairName: m.p1_name || 'BYE',
      isBye: !m.p1_name || m.p1_name === 'BYE'
    });
    slots.push({
      id: `${m.id}-2`,
      matchId: m.id,
      match: m,
      slotNum: 2,
      zoneName: m.round_name,
      pairName: m.p2_name || 'BYE',
      isBye: !m.p2_name || m.p2_name === 'BYE'
    });
  });

  const slotA = slots.find(s => s.id === selectedSlotA) || slots[0];
  const slotB = slots.find(s => s.id === selectedSlotB) || (slots.length > 1 ? slots[1] : slots[0]);

  const canSwap = slotA && slotB && slotA.id !== slotB.id && !isSaving;

  const handleConfirmSwap = async () => {
    if (!canSwap) return;
    setIsSaving(true);
    try {
      await onSwap(slotA, slotB);
      onClose();
    } catch (err) {
      console.error("Error al intercambiar parejas:", err);
      alert("Hubo un error al guardar el intercambio en la base de datos.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[110] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-fade-up my-auto">
        
        {/* ENCABEZADO */}
        <div className="p-4 sm:p-6 border-b border-gray-800 bg-gray-950 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                Intercambiar Parejas entre Zonas
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Categoría: <span className="text-red-500 font-bold uppercase">{category.name}</span>
              </p>
            </div>
          </div>
          
          <button onClick={onClose} disabled={isSaving} className="text-gray-500 hover:text-white transition-colors p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
          
          <p className="text-xs text-gray-400 leading-relaxed bg-gray-950 p-3 sm:p-3.5 rounded-xl border border-gray-800/80">
            Selecciona dos parejas de cualquier zona para intercambiar sus lugares. Se actualizarán inmediatamente los cruces en la base de datos de Supabase sin necesidad de re-sortear el torneo.
          </p>

          {/* SELECTORES DE PAREJAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            
            {/* PAREJA A */}
            <div className="bg-gray-950 border border-gray-800 rounded-xl p-3.5 sm:p-4">
              <label className="block text-[10px] text-red-400 uppercase tracking-widest font-bold mb-2">
                1. Seleccionar Pareja A
              </label>
              <select
                value={slotA?.id || ""}
                onChange={e => setSelectedSlotA(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-base sm:text-xs text-white focus:border-red-600 outline-none"
              >
                {slots.map(s => (
                  <option key={s.id} value={s.id} disabled={s.id === slotB?.id}>
                    {s.zoneName} - Pareja {s.slotNum}: {s.pairName}
                  </option>
                ))}
              </select>

              <div className="mt-2.5 sm:mt-3 p-2.5 sm:p-3 bg-gray-900/80 rounded-lg border border-gray-800">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold block mb-0.5">Ubicación actual:</span>
                <span className="text-xs font-bold text-white block">{slotA?.zoneName}</span>
                <span className={`text-xs block mt-0.5 truncate ${slotA?.isBye ? 'text-gray-500 italic' : 'text-gray-300 font-semibold'}`}>
                  {slotA?.pairName}
                </span>
              </div>
            </div>

            {/* PAREJA B */}
            <div className="bg-gray-950 border border-gray-800 rounded-xl p-3.5 sm:p-4">
              <label className="block text-[10px] text-red-400 uppercase tracking-widest font-bold mb-2">
                2. Seleccionar Pareja B
              </label>
              <select
                value={slotB?.id || ""}
                onChange={e => setSelectedSlotB(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-base sm:text-xs text-white focus:border-red-600 outline-none"
              >
                {slots.map(s => (
                  <option key={s.id} value={s.id} disabled={s.id === slotA?.id}>
                    {s.zoneName} - Pareja {s.slotNum}: {s.pairName}
                  </option>
                ))}
              </select>

              <div className="mt-3 p-3 bg-gray-900/80 rounded-lg border border-gray-800">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold block mb-1">Ubicación actual:</span>
                <span className="text-xs font-bold text-white block">{slotB?.zoneName}</span>
                <span className={`text-xs block mt-0.5 truncate ${slotB?.isBye ? 'text-gray-500 italic' : 'text-gray-300 font-semibold'}`}>
                  {slotB?.pairName}
                </span>
              </div>
            </div>

          </div>

          {/* VISTA PREVIA DEL CAMBIO */}
          {slotA && slotB && slotA.id !== slotB.id && (
            <div className="bg-gradient-to-br from-gray-950 to-gray-900 border border-gray-800 rounded-xl p-4 shadow-inner">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-3 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Vista previa del resultado:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block">{slotA.zoneName}</span>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-gray-300 font-medium">
                      • {slotA.slotNum === 1 ? slotB.pairName : slotA.match.p1_name || 'BYE'}
                    </p>
                    <p className="text-gray-300 font-medium">
                      • {slotA.slotNum === 2 ? slotB.pairName : slotA.match.p2_name || 'BYE'}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block">{slotB.zoneName}</span>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-gray-300 font-medium">
                      • {slotB.slotNum === 1 ? slotA.pairName : slotB.match.p1_name || 'BYE'}
                    </p>
                    <p className="text-gray-300 font-medium">
                      • {slotB.slotNum === 2 ? slotA.pairName : slotB.match.p2_name || 'BYE'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ACCIONES */}
        <div className="p-4 sm:p-6 border-t border-gray-800 bg-gray-950 flex flex-col-reverse sm:flex-row justify-end gap-2.5">
          <button 
            type="button" 
            onClick={onClose} 
            disabled={isSaving} 
            className="w-full sm:w-auto px-5 py-3 sm:py-2.5 text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider rounded-xl border border-gray-800 hover:bg-gray-800 text-center"
          >
            Cancelar
          </button>

          <button 
            type="button" 
            onClick={handleConfirmSwap} 
            disabled={!canSwap} 
            className="w-full sm:w-auto bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-bold px-6 py-3 sm:py-2.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Guardando intercambio...</span>
              </>
            ) : (
              "Confirmar Intercambio"
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
