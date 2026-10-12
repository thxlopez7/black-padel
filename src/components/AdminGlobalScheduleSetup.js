"use client";

import { useState, useEffect, useMemo } from "react";

export default function AdminGlobalScheduleSetup({ matches, categories, courts, onBack, onGenerateGlobal }) {
  // Helper local-safe para formatear Date a 'YYYY-MM-DD' sin desfases de huso horario
  const formatDateLocal = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Fecha base inicial: hoy en hora local
  const todayStr = useMemo(() => {
    return formatDateLocal(new Date());
  }, []);

  const [baseDate, setBaseDate] = useState(todayStr);
  const [daysConfig, setDaysConfig] = useState([
    { date: todayStr, startTime: '17:00', endTime: '23:30', phase: 'grupos' }
  ]);
  const [matchDuration, setMatchDuration] = useState(60);
  const [selectedCourts, setSelectedCourts] = useState([]);
  const [showCategoryDetails, setShowCategoryDetails] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inicializar todas las canchas como seleccionadas por defecto
  useEffect(() => {
    if (courts && courts.length > 0 && selectedCourts.length === 0) {
      setSelectedCourts(courts.map(c => c.id));
    }
  }, [courts]);

  // Formateador amigable de fechas: "Jueves 15 de Octubre"
  const formatReadableDate = (dateStr) => {
    if (!dateStr) return { dayName: '', formatted: 'Fecha a definir', full: 'Fecha a definir' };
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      return {
        dayName: days[dateObj.getDay()],
        formatted: `${d} ${months[dateObj.getMonth()]}`,
        full: `${days[dateObj.getDay()]} ${d} ${months[dateObj.getMonth()]}`
      };
    } catch {
      return { dayName: '', formatted: dateStr, full: dateStr };
    }
  };

  const formatShortDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dt = new Date(y, m - 1, d);
      const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      return `${days[dt.getDay()]} ${d} ${months[dt.getMonth()]}`;
    } catch {
      return dateStr;
    }
  };

  // Cálculo de minutos y turnos por bloque de día
  const calculateDaySlots = (day, durationMin, courtsCount) => {
    try {
      const [startH, startM] = (day.startTime || '09:00').split(':').map(Number);
      const [endH, endM] = (day.endTime || '22:00').split(':').map(Number);
      const totalMinutes = (endH * 60 + endM) - (startH * 60 + startM);
      if (totalMinutes <= 0) return { hours: 0, slotsPerCourt: 0, totalSlots: 0 };
      const hours = (totalMinutes / 60).toFixed(1);
      const slotsPerCourt = Math.max(0, Math.floor(totalMinutes / Number(durationMin || 60)));
      const totalSlots = slotsPerCourt * courtsCount;
      return { hours, slotsPerCourt, totalSlots };
    } catch {
      return { hours: 0, slotsPerCourt: 0, totalSlots: 0 };
    }
  };

  // Helper para sumar días a una fecha base (YYYY-MM-DD) sin desfases de huso horario
  const addDaysToDate = (dateStr, daysToAdd) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d + daysToAdd);
    return formatDateLocal(date);
  };

  // Calcula la fecha exacta de inicio para que la plantilla coincida estrictamente con su día
  const getTemplateStartDate = (referenceDateStr, targetDayOfWeek) => {
    const [y, m, d] = referenceDateStr.split('-').map(Number);
    const refDate = new Date(y, m - 1, d);
    const day = refDate.getDay();
    const isoDay = day === 0 ? 7 : day;
    const targetIso = targetDayOfWeek === 0 ? 7 : targetDayOfWeek;
    const diffDays = targetIso - isoDay;
    const targetDate = new Date(y, m - 1, d + diffDays);
    return formatDateLocal(targetDate);
  };

  // Agregar un nuevo día
  const addDay = () => {
    const lastDay = daysConfig[daysConfig.length - 1];
    let nextDateStr = baseDate;
    if (lastDay && lastDay.date) {
      nextDateStr = addDaysToDate(lastDay.date, 1);
    }
    setDaysConfig([
      ...daysConfig,
      {
        date: nextDateStr,
        startTime: lastDay?.startTime || '09:00',
        endTime: lastDay?.endTime || '22:00',
        phase: lastDay?.phase || 'grupos'
      }
    ]);
  };

  // Duplicar un bloque específico
  const duplicateDay = (index) => {
    const target = daysConfig[index];
    const nextDateStr = addDaysToDate(target.date, 1);
    const newDays = [...daysConfig];
    newDays.splice(index + 1, 0, {
      ...target,
      date: nextDateStr
    });
    setDaysConfig(newDays);
  };

  const removeDay = (index) => {
    setDaysConfig(daysConfig.filter((_, i) => i !== index));
  };

  const updateDay = (index, field, value) => {
    const newDays = [...daysConfig];
    newDays[index] = {
      ...newDays[index],
      [field]: value
    };
    setDaysConfig(newDays);
  };

  // Presets de horarios para un día específico
  const applyTimePreset = (index, startTime, endTime) => {
    const newDays = [...daysConfig];
    newDays[index] = {
      ...newDays[index],
      startTime,
      endTime
    };
    setDaysConfig(newDays);
  };

  // Plantillas Rápidas con alineación estricta de días
  const loadTemplate = (type) => {
    const bDate = baseDate || todayStr;

    if (type === 'jue-dom') {
      const startDate = getTemplateStartDate(bDate, 4);
      setBaseDate(startDate);
      setDaysConfig([
        { date: startDate, startTime: '17:30', endTime: '23:30', phase: 'grupos' },
        { date: addDaysToDate(startDate, 1), startTime: '17:30', endTime: '23:30', phase: 'grupos' },
        { date: addDaysToDate(startDate, 2), startTime: '08:30', endTime: '23:30', phase: 'grupos' },
        { date: addDaysToDate(startDate, 3), startTime: '09:00', endTime: '15:00', phase: 'semis' },
        { date: addDaysToDate(startDate, 3), startTime: '16:00', endTime: '21:30', phase: 'finals' }
      ]);
    } else if (type === 'vie-dom') {
      const startDate = getTemplateStartDate(bDate, 5);
      setBaseDate(startDate);
      setDaysConfig([
        { date: startDate, startTime: '17:30', endTime: '23:45', phase: 'grupos' },
        { date: addDaysToDate(startDate, 1), startTime: '08:30', endTime: '23:45', phase: 'grupos' },
        { date: addDaysToDate(startDate, 2), startTime: '09:00', endTime: '14:30', phase: 'semis' },
        { date: addDaysToDate(startDate, 2), startTime: '15:30', endTime: '21:30', phase: 'finals' }
      ]);
    } else if (type === 'sab-dom') {
      const startDate = getTemplateStartDate(bDate, 6);
      setBaseDate(startDate);
      setDaysConfig([
        { date: startDate, startTime: '08:30', endTime: '23:30', phase: 'grupos' },
        { date: addDaysToDate(startDate, 1), startTime: '09:00', endTime: '14:30', phase: 'semis' },
        { date: addDaysToDate(startDate, 1), startTime: '15:30', endTime: '21:30', phase: 'finals' }
      ]);
    } else if (type === '1-dia') {
      const startDate = getTemplateStartDate(bDate, 6);
      setBaseDate(startDate);
      setDaysConfig([
        { date: startDate, startTime: '08:30', endTime: '22:30', phase: 'grupos' }
      ]);
    }
  };

  // ANÁLISIS DEL TORNEO
  const activeMatches = matches.filter(m => !m.is_bye);
  
  const categoryStats = useMemo(() => {
    return categories.map(cat => {
      const catMatches = activeMatches.filter(m => m.category_id === cat.id);
      if (catMatches.length === 0) return null;

      const maxR = Math.max(...catMatches.map(m => m.round_index || 0));
      let catFinals = 0, catSemis = 0, catGrupos = 0;

      catMatches.forEach(m => {
        if (m.round_index === maxR && maxR > 0) catFinals++;
        else if (m.round_index === maxR - 1 && maxR > 1) catSemis++;
        else catGrupos++;
      });

      return {
        id: cat.id,
        name: cat.name,
        totalMatches: catMatches.length,
        grupos: catGrupos,
        semis: catSemis,
        finals: catFinals
      };
    }).filter(Boolean);
  }, [categories, activeMatches]);

  const totalMatches = activeMatches.length;
  const activeCourtsCount = selectedCourts.length;
  
  const daysSlotsAnalysis = useMemo(() => {
    let gruposSlots = 0;
    let semisSlots = 0;
    let finalsSlots = 0;
    let totalMinutesAccum = 0;

    daysConfig.forEach(day => {
      const slotsData = calculateDaySlots(day, matchDuration, activeCourtsCount);
      if (day.phase === 'semis') semisSlots += slotsData.totalSlots;
      else if (day.phase === 'finals') finalsSlots += slotsData.totalSlots;
      else gruposSlots += slotsData.totalSlots;

      const [startH, startM] = (day.startTime || '09:00').split(':').map(Number);
      const [endH, endM] = (day.endTime || '22:00').split(':').map(Number);
      const mins = Math.max(0, (endH * 60 + endM) - (startH * 60 + startM));
      totalMinutesAccum += mins;
    });

    const totalSlots = gruposSlots + semisSlots + finalsSlots;
    const totalClubHours = (totalMinutesAccum / 60).toFixed(1);

    return {
      gruposSlots,
      semisSlots,
      finalsSlots,
      totalSlots,
      totalClubHours
    };
  }, [daysConfig, matchDuration, activeCourtsCount]);

  const slotsBalance = daysSlotsAnalysis.totalSlots - totalMatches;
  const isCapacitySufficient = totalMatches === 0 || slotsBalance >= 0;
  const capacityPercent = totalMatches > 0 
    ? Math.min(100, Math.round((daysSlotsAnalysis.totalSlots / totalMatches) * 100))
    : 100;

  const toggleCourt = (courtId) => {
    if (selectedCourts.includes(courtId)) {
      setSelectedCourts(selectedCourts.filter(id => id !== courtId));
    } else {
      setSelectedCourts([...selectedCourts, courtId]);
    }
  };

  const toggleAllCourts = () => {
    if (selectedCourts.length === courts.length) {
      setSelectedCourts([]);
    } else {
      setSelectedCourts(courts.map(c => c.id));
    }
  };

  const handleConfirmAndApply = async () => {
    setIsSubmitting(true);
    try {
      const courtsSelectedObjs = courts.filter(c => selectedCourts.includes(c.id));
      await onGenerateGlobal({
        daysConfig,
        matchDurationMin: matchDuration,
        courts: courtsSelectedObjs
      });
      setShowConfirmModal(false);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-up max-w-5xl mx-auto w-full px-2 sm:px-4 pb-20 md:pb-12 min-w-0">
      
      {/* 1. BARRA SUPERIOR STICKY: NUNCA SE PIERDE, ACCIÓN SIEMPRE ACCESIBLE */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-md pt-1 pb-3 mb-4 sm:mb-6 border-b border-gray-800 flex items-center justify-between gap-2 min-w-0">
        <div className="flex items-center gap-2 min-w-0 truncate">
          <button 
            type="button"
            onClick={onBack} 
            className="text-gray-400 hover:text-white text-xs bg-gray-900 hover:bg-gray-800 py-1.5 px-2.5 sm:px-3 rounded-xl border border-gray-800 flex items-center gap-1 transition-colors font-medium shrink-0"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            <span className="hidden xs:inline">Volver</span>
          </button>
          
          <h1 className="text-sm sm:text-xl font-bold text-white tracking-tight truncate flex items-center gap-1.5">
            <span>Gestor de Horarios</span>
            <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-red-950/60 text-red-400 border border-red-900/40 shrink-0 hidden xs:inline">
              Auto
            </span>
          </h1>
        </div>

        {/* Acciones y estado instantáneo en la cabecera sticky */}
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-[10px] sm:text-xs font-bold px-2 py-1 rounded-lg border font-mono shrink-0 ${
            totalMatches === 0
              ? 'bg-gray-800/80 text-gray-400 border-gray-700'
              : isCapacitySufficient
                ? 'bg-emerald-950/70 text-emerald-400 border-emerald-800/60'
                : 'bg-amber-950/70 text-amber-400 border-amber-800/60'
          }`}>
            {totalMatches === 0 ? '0 part.' : `${daysSlotsAnalysis.totalSlots}/${totalMatches} turnos`}
          </span>

          <button
            type="button"
            disabled={activeCourtsCount === 0 || daysConfig.length === 0}
            onClick={() => setShowConfirmModal(true)}
            className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all shadow-md shrink-0 ${
              activeCourtsCount === 0 || daysConfig.length === 0
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                : !isCapacitySufficient
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950/50'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-red-950/60'
            }`}
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span>{!isCapacitySufficient ? 'Aplicar (Déficit)' : 'Aplicar'}</span>
          </button>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6 min-w-0">
        
        {/* 2. RESUMEN EJECUTIVO DE CAPACIDAD (KPI CARD) */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3.5 sm:p-5 shadow-xl min-w-0 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-800/80">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-8 h-8 rounded-xl bg-red-950/60 text-red-400 border border-red-900/40 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white font-bold text-sm sm:text-base">Balance de Horarios</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold border shrink-0 ${
                    totalMatches === 0
                      ? 'bg-gray-800 text-gray-400 border-gray-700'
                      : isCapacitySufficient
                        ? 'bg-emerald-950/70 text-emerald-400 border-emerald-800/60'
                        : 'bg-amber-950/70 text-amber-400 border-amber-800/60'
                  }`}>
                    {totalMatches === 0 
                      ? 'Sin partidos cargados' 
                      : isCapacitySufficient 
                        ? `Capacidad Óptima (${slotsBalance > 0 ? `+${slotsBalance} margen` : 'Exacta'})` 
                        : `Déficit: Faltan ${Math.abs(slotsBalance)} turnos`}
                  </span>
                </div>
                <p className="text-gray-400 text-[11px] truncate mt-0.5">
                  {daysConfig.length} {daysConfig.length === 1 ? 'jornada' : 'jornadas'} • {activeCourtsCount} {activeCourtsCount === 1 ? 'cancha' : 'canchas'} • {matchDuration} min/partido
                </p>
              </div>
            </div>

            {/* Desglose de categorías colapsable */}
            {categoryStats.length > 0 && (
              <button
                type="button"
                onClick={() => setShowCategoryDetails(!showCategoryDetails)}
                className="text-[11px] text-gray-400 hover:text-white bg-gray-800/70 hover:bg-gray-800 px-2.5 py-1.5 rounded-lg border border-gray-700/60 transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0"
              >
                <span>{showCategoryDetails ? 'Ocultar Categorías' : 'Ver Categorías'}</span>
                <span className="text-gray-500">{showCategoryDetails ? '▲' : '▼'}</span>
              </button>
            )}
          </div>

          {/* Barra visual de capacidad */}
          <div className="mt-3.5 space-y-1.5">
            <div className="flex justify-between text-[11px] text-gray-400 font-medium">
              <span>Demanda: <strong className="text-white">{totalMatches} partidos</strong></span>
              <span>Disponibles: <strong className={isCapacitySufficient ? 'text-emerald-400' : 'text-amber-400'}>{daysSlotsAnalysis.totalSlots} turnos</strong></span>
            </div>
            <div className="w-full h-2 bg-gray-950 rounded-full overflow-hidden border border-gray-800">
              <div 
                className={`h-full transition-all duration-300 rounded-full ${
                  totalMatches === 0 
                    ? 'bg-gray-700 w-0' 
                    : isCapacitySufficient 
                      ? 'bg-emerald-500' 
                      : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min(100, capacityPercent)}%` }}
              />
            </div>
          </div>

          {/* Desglose colapsable por categoría */}
          {showCategoryDetails && categoryStats.length > 0 && (
            <div className="mt-3.5 pt-3.5 border-t border-gray-800/80 animate-fade-in">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {categoryStats.map(cat => (
                  <div key={cat.id} className="bg-gray-950 border border-gray-800/80 rounded-xl p-2 min-w-0">
                    <span className="text-xs font-bold text-gray-200 block truncate">{cat.name}</span>
                    <span className="text-[10px] text-red-400 font-mono font-semibold block">{cat.totalMatches} partidos</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. PLANTILLAS RÁPIDAS (Configuración en 1 Clic) */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3.5 sm:p-5 shadow-xl min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-800/80">
            <div>
              <h2 className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
                <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Plantillas Rápidas
              </h2>
              <p className="text-gray-400 text-[11px]">Aplica la estructura estándar de fin de semana en un solo clic</p>
            </div>

            {/* Selector de fecha base rápido */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <input 
                type="date" 
                value={baseDate} 
                onChange={e => setBaseDate(e.target.value)}
                className="bg-gray-950 border border-gray-800 text-white rounded-lg px-2.5 py-1 text-xs outline-none focus:border-red-600 font-mono cursor-pointer shrink-0"
              />
              <button
                type="button"
                onClick={() => setBaseDate(todayStr)}
                className={`text-[10px] font-semibold px-2 py-1 rounded-lg border transition-colors shrink-0 ${
                  baseDate === todayStr 
                    ? 'bg-red-950/60 border-red-800 text-red-300' 
                    : 'bg-gray-950 hover:bg-gray-800 border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                Hoy
              </button>
              <button
                type="button"
                onClick={() => setBaseDate(addDaysToDate(todayStr, 7))}
                className="text-[10px] font-semibold bg-gray-950 hover:bg-gray-800 border-gray-800 text-gray-400 hover:text-white px-2 py-1 rounded-lg border transition-colors shrink-0"
              >
                +7d
              </button>
            </div>
          </div>

          {/* Botones de Plantilla Compactos y Responsivos */}
          {(() => {
            const previewJueStart = getTemplateStartDate(baseDate || todayStr, 4);
            const previewVieStart = getTemplateStartDate(baseDate || todayStr, 5);
            const previewSabStart = getTemplateStartDate(baseDate || todayStr, 6);

            return (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 mt-3 min-w-0">
                <button
                  type="button"
                  onClick={() => loadTemplate('jue-dom')}
                  className="bg-gray-950 hover:bg-gray-850 border border-gray-800 hover:border-yellow-600/60 p-2.5 sm:p-3 rounded-xl text-left transition-all group min-w-0"
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-yellow-400 text-xs font-bold truncate">Jue a Dom</span>
                    <span className="text-[9px] font-bold bg-yellow-950/40 text-yellow-300 px-1.5 py-0.2 rounded border border-yellow-800/40 shrink-0">4d</span>
                  </div>
                  <span className="text-gray-400 text-[10px] font-mono block truncate">
                    {formatShortDate(previewJueStart)} - {formatShortDate(addDaysToDate(previewJueStart, 3))}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => loadTemplate('vie-dom')}
                  className="bg-gray-950 hover:bg-gray-850 border border-gray-800 hover:border-red-600/60 p-2.5 sm:p-3 rounded-xl text-left transition-all group min-w-0"
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-red-400 text-xs font-bold truncate">Vie a Dom</span>
                    <span className="text-[9px] font-bold bg-red-950/40 text-red-300 px-1.5 py-0.2 rounded border border-red-800/40 shrink-0">3d</span>
                  </div>
                  <span className="text-gray-400 text-[10px] font-mono block truncate">
                    {formatShortDate(previewVieStart)} - {formatShortDate(addDaysToDate(previewVieStart, 2))}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => loadTemplate('sab-dom')}
                  className="bg-gray-950 hover:bg-gray-850 border border-gray-800 hover:border-blue-600/60 p-2.5 sm:p-3 rounded-xl text-left transition-all group min-w-0"
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-blue-400 text-xs font-bold truncate">Sáb y Dom</span>
                    <span className="text-[9px] font-bold bg-blue-950/40 text-blue-300 px-1.5 py-0.2 rounded border border-blue-800/40 shrink-0">2d</span>
                  </div>
                  <span className="text-gray-400 text-[10px] font-mono block truncate">
                    {formatShortDate(previewSabStart)} - {formatShortDate(addDaysToDate(previewSabStart, 1))}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => loadTemplate('1-dia')}
                  className="bg-gray-950 hover:bg-gray-850 border border-gray-800 hover:border-emerald-600/60 p-2.5 sm:p-3 rounded-xl text-left transition-all group min-w-0"
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-emerald-400 text-xs font-bold truncate">1 Día</span>
                    <span className="text-[9px] font-bold bg-emerald-950/40 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-800/40 shrink-0">Sáb</span>
                  </div>
                  <span className="text-gray-400 text-[10px] font-mono block truncate">
                    {formatShortDate(previewSabStart)}
                  </span>
                </button>
              </div>
            );
          })()}
        </div>

        {/* 4. CRONOGRAMA DE JORNADAS (Tarjetas Limpias y Ajustadas) */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3.5 sm:p-5 shadow-xl min-w-0 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800/80 gap-2">
            <div>
              <h2 className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
                <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Jornadas de Juego
              </h2>
              <p className="text-gray-400 text-[11px]">Define fechas, horas y fases para cada jornada</p>
            </div>
            <button 
              type="button"
              onClick={addDay}
              className="bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-white border border-red-900/50 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shrink-0"
            >
              <span>+ Agregar Día</span>
            </button>
          </div>

          <div className="space-y-3 min-w-0">
            {daysConfig.map((day, idx) => {
              const dateInfo = formatReadableDate(day.date);
              const slotsInfo = calculateDaySlots(day, matchDuration, activeCourtsCount);

              return (
                <div 
                  key={idx} 
                  className="bg-gray-950 border border-gray-800 rounded-xl p-3 sm:p-4 hover:border-gray-700/80 transition-colors shadow-sm min-w-0 overflow-hidden"
                >
                  {/* Encabezado del Bloque */}
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-gray-800/70 min-w-0">
                    <div className="flex items-center gap-2 min-w-0 truncate">
                      <span className="w-5 h-5 rounded-md bg-gray-800 text-gray-300 font-bold text-[11px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white capitalize truncate">
                        {dateInfo.full}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono shrink-0 hidden xs:inline">
                        ({slotsInfo.hours}h)
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="bg-red-950/40 border border-red-900/40 text-red-400 text-[10px] sm:text-xs px-2 py-0.5 rounded-md font-bold font-mono">
                        {slotsInfo.totalSlots} turnos
                      </span>
                      <button
                        type="button"
                        onClick={() => duplicateDay(idx)}
                        title="Duplicar día"
                        className="text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 p-1.5 rounded-lg border border-gray-700 text-xs transition-colors shrink-0"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                      </button>
                      {daysConfig.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDay(idx)}
                          title="Eliminar día"
                          className="text-red-400 hover:text-white bg-red-950/30 hover:bg-red-900/60 p-1.5 rounded-lg border border-red-900/40 text-xs transition-colors shrink-0"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Campos Editables: Fecha, Fase, Horarios */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-2.5 min-w-0">
                    {/* Fecha */}
                    <div className="min-w-0">
                      <label className="block text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-1 truncate">
                        Fecha
                      </label>
                      <input 
                        type="date" 
                        value={day.date} 
                        onChange={e => updateDay(idx, 'date', e.target.value)}
                        className="w-full min-w-0 bg-gray-900 border border-gray-800 text-white rounded-xl px-2.5 py-1.5 text-xs focus:border-red-600 outline-none transition-colors font-mono cursor-pointer box-border"
                      />
                    </div>

                    {/* Fase */}
                    <div className="min-w-0">
                      <label className="block text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-1 truncate">
                        Fase
                      </label>
                      <select 
                        value={day.phase} 
                        onChange={e => updateDay(idx, 'phase', e.target.value)}
                        className="w-full min-w-0 bg-gray-900 border border-gray-800 text-white rounded-xl px-2.5 py-1.5 text-xs focus:border-red-600 outline-none cursor-pointer transition-colors box-border"
                      >
                        <option value="grupos">Fase de Grupos y Cruces</option>
                        <option value="semis">Fase de Semifinales</option>
                        <option value="finals">Fase de Finales</option>
                      </select>
                    </div>

                    {/* Horario Desde */}
                    <div className="min-w-0">
                      <label className="block text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-1 truncate">
                        Apertura
                      </label>
                      <input 
                        type="time" 
                        value={day.startTime} 
                        onChange={e => updateDay(idx, 'startTime', e.target.value)}
                        className="w-full min-w-0 bg-gray-900 border border-gray-800 text-white rounded-xl px-2.5 py-1.5 text-xs focus:border-red-600 outline-none transition-colors font-mono cursor-pointer box-border"
                      />
                    </div>

                    {/* Horario Hasta */}
                    <div className="min-w-0">
                      <label className="block text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-1 truncate">
                        Cierre
                      </label>
                      <input 
                        type="time" 
                        value={day.endTime} 
                        onChange={e => updateDay(idx, 'endTime', e.target.value)}
                        className="w-full min-w-0 bg-gray-900 border border-gray-800 text-white rounded-xl px-2.5 py-1.5 text-xs focus:border-red-600 outline-none transition-colors font-mono cursor-pointer box-border"
                      />
                    </div>
                  </div>

                  {/* Preajustes rápidos de horario para el día */}
                  <div className="mt-2.5 pt-2 border-t border-gray-800/60 flex items-center gap-1.5 flex-wrap min-w-0">
                    <span className="text-[10px] text-gray-500 font-medium shrink-0">Horario rápido:</span>
                    <button
                      type="button"
                      onClick={() => applyTimePreset(idx, '08:30', '14:00')}
                      className="text-[10px] bg-gray-900 hover:bg-gray-800 text-gray-300 px-2 py-0.5 rounded-md border border-gray-800 transition-colors shrink-0"
                    >
                      Mañana (8:30-14h)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyTimePreset(idx, '14:00', '20:00')}
                      className="text-[10px] bg-gray-900 hover:bg-gray-800 text-gray-300 px-2 py-0.5 rounded-md border border-gray-800 transition-colors shrink-0"
                    >
                      Tarde (14-20h)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyTimePreset(idx, '18:00', '23:45')}
                      className="text-[10px] bg-gray-900 hover:bg-gray-800 text-gray-300 px-2 py-0.5 rounded-md border border-gray-800 transition-colors shrink-0"
                    >
                      Noche (18-23:45h)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyTimePreset(idx, '08:30', '23:30')}
                      className="text-[10px] bg-gray-900 hover:bg-gray-800 text-gray-300 px-2 py-0.5 rounded-md border border-gray-800 transition-colors shrink-0"
                    >
                      Completo (8:30-23:30h)
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. CANCHAS ACTIVAS Y DURACIÓN (Ajustados y Compactos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
          
          {/* Canchas Habilitadas */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3.5 sm:p-5 shadow-xl min-w-0">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800/80 gap-2">
              <div>
                <h2 className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
                  <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  Canchas Activas
                </h2>
                <p className="text-gray-400 text-[11px]">{selectedCourts.length} de {courts.length} seleccionadas</p>
              </div>
              {courts.length > 0 && (
                <button
                  type="button"
                  onClick={toggleAllCourts}
                  className="text-[10px] text-red-400 hover:text-white font-bold bg-red-950/40 px-2 py-1 rounded-lg border border-red-900/40 transition-colors shrink-0"
                >
                  {selectedCourts.length === courts.length ? "Deseleccionar" : "Todas"}
                </button>
              )}
            </div>

            <div className="mt-3 min-w-0">
              {courts && courts.length > 0 ? (
                <div className="flex flex-wrap gap-2 min-w-0">
                  {courts.map(c => {
                    const isChecked = selectedCourts.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => toggleCourt(c.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all min-w-0 max-w-full ${
                          isChecked 
                            ? 'bg-red-950/40 border-red-800/80 text-white shadow-sm' 
                            : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                          isChecked ? 'bg-red-600 text-white font-bold' : 'border border-gray-600'
                        }`}>
                          {isChecked ? '✓' : ''}
                        </span>
                        <span className="truncate">{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic p-3 text-center border border-dashed border-gray-800 rounded-lg">
                  No hay canchas registradas.
                </p>
              )}
            </div>
          </div>

          {/* Duración de Partido */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3.5 sm:p-5 shadow-xl min-w-0">
            <div className="pb-3 border-b border-gray-800/80">
              <h2 className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
                <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Duración por Partido
              </h2>
              <p className="text-gray-400 text-[11px]">Minutos asignados a cada turno de juego</p>
            </div>

            <div className="mt-3 space-y-3 min-w-0">
              {/* Botones de selección rápida */}
              <div className="grid grid-cols-4 gap-1.5 min-w-0">
                {[45, 60, 75, 90].map(mins => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setMatchDuration(mins)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all text-center truncate ${
                      matchDuration === mins
                        ? 'bg-red-600 text-white border-red-500 shadow-md'
                        : 'bg-gray-950 text-gray-300 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>

              {/* Input manual */}
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[11px] text-gray-400 shrink-0">Personalizado:</span>
                <input 
                  type="number" 
                  value={matchDuration} 
                  min="30"
                  max="180"
                  step="5"
                  onChange={e => setMatchDuration(Number(e.target.value))} 
                  className="w-20 bg-gray-950 border border-gray-800 text-white rounded-xl px-2.5 py-1 text-xs font-mono font-bold outline-none focus:border-red-600 text-center shrink-0" 
                />
                <span className="text-[11px] text-gray-400 shrink-0">minutos</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6. BOTÓN PRINCIPAL DE APLICACIÓN EN EL FORMULARIO */}
        <div className="pt-2 min-w-0">
          <button 
            type="button"
            disabled={activeCourtsCount === 0 || daysConfig.length === 0}
            onClick={() => setShowConfirmModal(true)} 
            className={`w-full font-bold py-3.5 sm:py-4 px-4 sm:px-6 rounded-2xl shadow-xl transition-all text-xs sm:text-sm flex items-center justify-center gap-2 min-w-0 break-words text-center ${
              activeCourtsCount === 0 || daysConfig.length === 0
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                : !isCapacitySufficient
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950/50'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-red-950/60'
            }`}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span className="truncate">
              {!isCapacitySufficient 
                ? `Aplicar Calendario (${Math.abs(slotsBalance)} turnos de déficit)` 
                : "Aplicar Horarios a Todo el Torneo"}
            </span>
          </button>
        </div>
      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-gray-900 border border-gray-800 w-full max-w-md rounded-2xl p-4 sm:p-6 shadow-2xl animate-fade-up space-y-4 my-auto min-w-0 box-border">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800 text-red-500 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-bold text-base truncate">
                  Confirmar Horarios
                </h3>
                <p className="text-gray-400 text-xs truncate">
                  Resumen de la programación global
                </p>
              </div>
            </div>

            <div className="bg-gray-950 border border-gray-800/80 rounded-xl p-3.5 text-xs space-y-2">
              <div className="flex justify-between py-1 border-b border-gray-900">
                <span className="text-gray-400">Partidos a programar:</span>
                <span className="font-bold text-white">{totalMatches} partidos</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-900">
                <span className="text-gray-400">Turnos generados:</span>
                <span className="font-bold text-red-400">{daysSlotsAnalysis.totalSlots} turnos</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-900">
                <span className="text-gray-400">Canchas a utilizar:</span>
                <span className="font-bold text-white">{activeCourtsCount} canchas</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-900">
                <span className="text-gray-400">Duración de partido:</span>
                <span className="font-bold text-white">{matchDuration} min</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-400">Balance:</span>
                <span className={`font-bold ${isCapacitySufficient ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isCapacitySufficient ? `+${slotsBalance} turnos libres` : `Déficit de ${Math.abs(slotsBalance)} turnos`}
                </span>
              </div>
            </div>

            {!isCapacitySufficient && (
              <div className="bg-amber-950/40 border border-amber-800/50 rounded-xl p-3 text-[11px] text-amber-300 leading-relaxed">
                Aviso: Al haber menos turnos que partidos, {Math.abs(slotsBalance)} partidos quedarán sin horario asignado para su organización manual.
              </div>
            )}

            <p className="text-gray-400 text-xs">
              ¿Deseas sobreescribir los horarios de los cuadros con esta nueva distribución?
            </p>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowConfirmModal(false)}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 transition-colors text-center"
              >
                Volver
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmAndApply}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg shadow-red-950/50 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                    <span>Guardando...</span>
                  </>
                ) : (
                  <span>Sí, Aplicar Horarios</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
