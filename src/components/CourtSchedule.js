"use client";

export default function CourtSchedule({ court, matches, categories, onBack }) {
  // Filtrar los partidos que corresponden a esta cancha, que no sean "BYE", y ordenarlos por fecha y hora
  const courtMatches = matches
    .filter(m => m.court_id && String(m.court_id) === String(court.id) && !m.is_bye)
    .sort((a, b) => {
      let da = new Date((a.match_date || '2099-01-01') + 'T' + (a.match_time || '00:00'));
      let db = new Date((b.match_date || '2099-01-01') + 'T' + (b.match_time || '00:00'));
      return da - db;
    });

  return (
    <div className="animate-fade-up max-w-4xl mx-auto w-full px-2 sm:px-4 min-w-0">
      <button 
        onClick={onBack} 
        className="mb-3 sm:mb-4 text-gray-400 hover:text-white text-xs flex items-center gap-1.5 transition-colors bg-gray-900 py-2 px-3.5 rounded-xl border border-gray-800 font-semibold"
      >
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        <span>Volver al Panel</span>
      </button>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3.5 sm:p-6 shadow-2xl min-w-0 overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-4 border-b border-gray-800 pb-3 min-w-0">
          <h2 className="text-base sm:text-xl font-light text-white truncate min-w-0">
            Partidos en <span className="font-bold text-red-500">{court.name}</span>
          </h2>
          <span className="text-[10px] sm:text-xs bg-gray-950 text-gray-400 border border-gray-800 px-2.5 py-1 rounded-lg font-mono shrink-0">
            {courtMatches.length} {courtMatches.length === 1 ? 'partido' : 'partidos'}
          </span>
        </div>
        
        <div className="space-y-3 max-h-[620px] overflow-y-auto custom-scrollbar pr-1 min-w-0">
          {courtMatches.length === 0 ? (
            <p className="text-xs sm:text-sm text-gray-500 italic p-6 text-center border border-dashed border-gray-800 rounded-xl">
              No hay partidos programados en esta cancha.
            </p>
          ) : (
            courtMatches.map(m => {
              const catName = categories.find(c => c.id === m.category_id)?.name || 'Categoría Desconocida';
              const p1Score = m.p1_score || ['','',''];
              const p2Score = m.p2_score || ['','',''];
              const isWOP1 = m.is_wo && m.winner === m.p1_name;
              const isWOP2 = m.is_wo && m.winner === m.p2_name;
              
              const isP1Winner = m.winner === m.p1_name && m.p1_name;
              const isP2Winner = m.winner === m.p2_name && m.p2_name;

              const dateStr = m.match_date ? `${m.match_date.split('-').reverse().join('/')}` : 'A definir';
              const timeStr = m.match_time ? m.match_time.slice(0, 5) : '';

              return (
                <div key={m.id} className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700/80 transition-colors min-w-0 box-border">
                  {/* Encabezado del partido */}
                  <div className="bg-gray-900/80 text-gray-300 text-[10px] sm:text-[11px] font-bold tracking-wide uppercase px-3 sm:px-4 py-2 flex items-center justify-between gap-2 border-b border-gray-800 min-w-0">
                    <span className="truncate min-w-0">{m.round_name} • {catName}</span>
                    <span className="text-red-400 font-mono shrink-0 whitespace-nowrap text-[10px] sm:text-xs font-semibold">
                      {dateStr} {timeStr}
                    </span>
                  </div>

                  {/* Pareja 1 */}
                  <div className={`grid grid-cols-[1fr_30px_30px_30px] sm:grid-cols-[1fr_34px_34px_34px] items-center h-10 border-b border-gray-800 min-w-0 ${isP1Winner ? 'bg-white/5 font-bold text-white' : 'text-gray-300'}`}>
                    <div className="px-3 sm:px-4 truncate min-w-0 text-xs">
                      {m.p1_name || <span className="italic opacity-50">Esperando...</span>}
                    </div>
                    <div className="border-l border-gray-800 text-center text-xs flex items-center justify-center h-full bg-gray-900 font-mono">
                      {isWOP1 ? 'W' : p1Score[0]}
                    </div>
                    <div className="border-l border-gray-800 text-center text-xs flex items-center justify-center h-full bg-gray-900 font-mono">
                      {isWOP1 ? 'O' : p1Score[1]}
                    </div>
                    <div className="border-l border-gray-800 text-center text-xs flex items-center justify-center h-full bg-gray-900 font-mono">
                      {p1Score[2]}
                    </div>
                  </div>

                  {/* Pareja 2 */}
                  <div className={`grid grid-cols-[1fr_30px_30px_30px] sm:grid-cols-[1fr_34px_34px_34px] items-center h-10 min-w-0 ${isP2Winner ? 'bg-white/5 font-bold text-white' : 'text-gray-300'}`}>
                    <div className="px-3 sm:px-4 truncate min-w-0 text-xs">
                      {m.p2_name || <span className="italic opacity-50">Esperando...</span>}
                    </div>
                    <div className="border-l border-gray-800 text-center text-xs flex items-center justify-center h-full bg-gray-900 font-mono">
                      {isWOP2 ? 'W' : p2Score[0]}
                    </div>
                    <div className="border-l border-gray-800 text-center text-xs flex items-center justify-center h-full bg-gray-900 font-mono">
                      {isWOP2 ? 'O' : p2Score[1]}
                    </div>
                    <div className="border-l border-gray-800 text-center text-xs flex items-center justify-center h-full bg-gray-900 font-mono">
                      {p2Score[2]}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
