"use client";

import { useState } from "react";

export default function AutoPilotModal({
  isOpen,
  onClose,
  categories = [],
  players = [],
  matches = [],
  onConfirm
}) {
  const [confirmText, setConfirmText] = useState("");
  const [acknowledgedWipe, setAcknowledgedWipe] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // Estadísticas del torneo actual
  const matchesWithWinner = matches.filter(m => m.winner && m.winner !== 'null' && !m.is_bye);
  const hasExistingMatches = matches.length > 0;
  const hasActiveBrackets = categories.some(c => c.current_step === 'bracket');
  
  const isConfirmationMatched = confirmText.trim().toUpperCase() === "SORTEAR";
  const canProceed = isConfirmationMatched && acknowledgedWipe && !isProcessing;

  const handleExecute = async () => {
    if (!canProceed) return;
    setIsProcessing(true);
    try {
      await onConfirm();
      handleClose();
    } catch (error) {
      console.error("Error ejecutando piloto automático:", error);
      alert("Ocurrió un error al ejecutar el Piloto Automático.");
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (isProcessing) return;
    setConfirmText("");
    setAcknowledgedWipe(false);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-fade-up my-auto max-h-[95vh] flex flex-col">
        
        {/* ENCABEZADO */}
        <div className="p-4 sm:p-6 border-b border-gray-800 bg-gray-950 flex justify-between items-start shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.2)] shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                Piloto Automático
                <span className="text-[10px] bg-pink-950/60 text-pink-400 border border-pink-800/60 px-2 py-0.5 rounded font-mono">
                  Sorteo Global
                </span>
              </h2>
              <p className="text-xs text-gray-400 mt-0.5 font-medium line-clamp-1 sm:line-clamp-none">
                Generador masivo de cuadros para todas las categorías del torneo
              </p>
            </div>
          </div>
          
          <button 
            onClick={handleClose} 
            disabled={isProcessing} 
            className="text-gray-500 hover:text-white transition-colors p-1.5 disabled:opacity-30 shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto custom-scrollbar flex-1">
          
          {/* QUÉ HACE ESTA FUNCIÓN */}
          <div className="bg-gray-950/70 border border-gray-800 rounded-xl p-4">
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ¿Qué realiza el Piloto Automático?
            </h3>
            <ul className="text-xs text-gray-400 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-pink-400 font-bold">•</span>
                <span><strong>Sorteo Aleatorio Imparcial:</strong> Distribuye aleatoriamente a todas las parejas inscriptas en las Zonas de cada categoría.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400 font-bold">•</span>
                <span><strong>Creación de Llaves:</strong> Estructura automáticamente los cuadros eliminatorios (Octavos, Cuartos, Semifinales y Final).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400 font-bold">•</span>
                <span><strong>Preparación del Torneo:</strong> Deja el fixture 100% listo para luego abrir el <em>Gestor de Horarios</em> y programar canchas y turnos.</span>
              </li>
            </ul>
          </div>

          {/* DIAGNÓSTICO DEL TORNEO ACTUAL */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-gray-950 border border-gray-800 rounded-xl p-3">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Categorías</p>
              <p className="text-lg font-bold text-white mt-1">{categories.length}</p>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-xl p-3">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Jugadores</p>
              <p className="text-lg font-bold text-white mt-1">{players.length}</p>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-xl p-3">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Partidos Actuales</p>
              <p className="text-lg font-bold text-white mt-1">{matches.length}</p>
            </div>
          </div>

          {/* ADVERTENCIA SEGÚN EL ESTADO */}
          {matchesWithWinner.length > 0 ? (
            <div className="bg-red-950/30 border border-red-800/80 rounded-xl p-4 flex gap-3 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
              <div className="text-red-500 flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  ¡Atención Crítica! Hay {matchesWithWinner.length} partidos ya disputados con ganador
                </p>
                <p className="text-xs text-red-300/80 mt-1">
                  Si ejecutas el Piloto Automático, <strong>se perderán todos los resultados y marcadores cargados</strong>. Todos los cuadros volverán a cero.
                </p>
              </div>
            </div>
          ) : hasActiveBrackets || hasExistingMatches ? (
            <div className="bg-yellow-950/30 border border-yellow-800/60 rounded-xl p-4 flex gap-3">
              <div className="text-yellow-500 flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
                  Reemplazo de cruces actuales
                </p>
                <p className="text-xs text-yellow-300/80 mt-1">
                  Ya existen cuadros creados. Esta acción los sobreescribirá con un nuevo sorteo para todas las categorías.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-950/30 border border-emerald-800/60 rounded-xl p-4 flex gap-3">
              <div className="text-emerald-500 flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Listo para inicio de torneo
                </p>
                <p className="text-xs text-emerald-300/80 mt-1">
                  No hay partidos creados aún. El Piloto Automático generará los cruces oficiales por primera vez.
                </p>
              </div>
            </div>
          )}

          {/* PROTOCOLO DE SEGURIDAD OBLIGATORIO */}
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 space-y-3">
            <p className="text-[11px] font-bold text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Confirmación de Seguridad
            </p>

            <label className="flex items-start gap-2.5 cursor-pointer pt-1">
              <input 
                type="checkbox" 
                checked={acknowledgedWipe} 
                onChange={e => setAcknowledgedWipe(e.target.checked)} 
                disabled={isProcessing}
                className="accent-pink-600 w-4 h-4 mt-0.5 rounded cursor-pointer"
              />
              <span className="text-xs text-gray-300 leading-snug select-none">
                Confirmo que deseo generar un nuevo sorteo para <strong>todas las {categories.length} categorías</strong> y entiendo que se reemplazarán los cruces existentes.
              </span>
            </label>

            <div>
              <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 font-bold">
                Escribe la palabra <span className="text-pink-400 font-mono tracking-wider font-black">SORTEAR</span> para desbloquear el botón:
              </label>
              <input 
                type="text" 
                value={confirmText} 
                onChange={e => setConfirmText(e.target.value)} 
                disabled={isProcessing} 
                placeholder="Escribe SORTEAR aquí" 
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 sm:p-2.5 text-base sm:text-sm text-white placeholder-gray-600 focus:border-pink-500 outline-none uppercase font-mono tracking-wider transition-colors"
              />
            </div>
          </div>

        </div>

        {/* ACCIONES */}
        <div className="p-4 sm:p-6 border-t border-gray-800 bg-gray-950 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 shrink-0">
          <button 
            type="button" 
            onClick={handleClose} 
            disabled={isProcessing} 
            className="w-full sm:w-auto px-5 py-3 sm:py-2.5 text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider rounded-lg border border-gray-800 hover:bg-gray-800 disabled:opacity-50 text-center"
          >
            Cancelar
          </button>
          
          <button 
            type="button" 
            onClick={handleExecute} 
            disabled={!canProceed} 
            className={`w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              canProceed 
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] cursor-pointer' 
                : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed opacity-60'
            }`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generando Sorteos...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Ejecutar Piloto Automático</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
