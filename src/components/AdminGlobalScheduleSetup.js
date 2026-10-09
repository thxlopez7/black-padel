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
  const [showHelp, setShowHelp] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inicializar todas las canchas como seleccionadas por defecto
  useEffect(() => {
    if (courts && courts.length > 0 && selectedCourts.length === 0) {
      setSelectedCourts(courts.map(c => c.id));
    }
  }, [courts]);

  // Formateador amigable de fechas: "Jueves, 15 de Octubre"
  const formatReadableDate = (dateStr) => {
    if (!dateStr) return { dayName: '', formatted: 'Fecha a definir', full: 'Fecha a definir' };
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      return {
        dayName: days[dateObj.getDay()],
        formatted: `${d} de ${months[dateObj.getMonth()]}`,
        full: `${days[dateObj.getDay()]} ${d} de ${months[dateObj.getMonth()]}`
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
  // targetDayOfWeek: 4 = Jueves, 5 = Viernes, 6 = Sábado, 0 = Domingo
  const getTemplateStartDate = (referenceDateStr, targetDayOfWeek) => {
    const [y, m, d] = referenceDateStr.split('-').map(Number);
    const refDate = new Date(y, m - 1, d);
    const day = refDate.getDay();
    // En ISO week: Lunes = 1 ... Domingo = 7
    const isoDay = day === 0 ? 7 : day;
    const targetIso = targetDayOfWeek === 0 ? 7 : targetDayOfWeek;
    const diffDays = targetIso - isoDay;
    const targetDate = new Date(y, m - 1, d + diffDays);
    return formatDateLocal(targetDate);
  };

  // Agregar un nuevo día (por defecto al día siguiente del último configurado)
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
    newDays[index][field] = value;
    setDaysConfig(newDays);
  };

  // Presets de horarios para un día específico
  const applyTimePreset = (index, startTime, endTime) => {
    const newDays = [...daysConfig];
    newDays[index].startTime = startTime;
    newDays[index].endTime = endTime;
    setDaysConfig(newDays);
  };

  // Plantillas Rápidas con alineación estricta de días
  const loadTemplate = (type) => {
    const bDate = baseDate || todayStr;

    if (type === 'jue-dom') {
      // 4 Días: Jueves a Domingo (5 bloques de juego)
      const startDate = getTemplateStartDate(bDate, 4); // Garantiza JUEVES
      setBaseDate(startDate);
      setDaysConfig([
        { date: startDate, startTime: '17:30', endTime: '23:30', phase: 'grupos' }, // Jueves
        { date: addDaysToDate(startDate, 1), startTime: '17:30', endTime: '23:30', phase: 'grupos' }, // Viernes
        { date: addDaysToDate(startDate, 2), startTime: '08:30', endTime: '23:30', phase: 'grupos' }, // Sábado
        { date: addDaysToDate(startDate, 3), startTime: '09:00', endTime: '15:00', phase: 'semis' },  // Domingo Semis
        { date: addDaysToDate(startDate, 3), startTime: '16:00', endTime: '21:30', phase: 'finals' } // Domingo Finales
      ]);
    } else if (type === 'vie-dom') {
      // 3 Días: Viernes a Domingo (4 bloques de juego)
      const startDate = getTemplateStartDate(bDate, 5); // Garantiza VIERNES
      setBaseDate(startDate);
      setDaysConfig([
        { date: startDate, startTime: '17:30', endTime: '23:45', phase: 'grupos' }, // Viernes
        { date: addDaysToDate(startDate, 1), startTime: '08:30', endTime: '23:45', phase: 'grupos' }, // Sábado
        { date: addDaysToDate(startDate, 2), startTime: '09:00', endTime: '14:30', phase: 'semis' },  // Domingo Semis
        { date: addDaysToDate(startDate, 2), startTime: '15:30', endTime: '21:30', phase: 'finals' } // Domingo Finales
      ]);
    } else if (type === 'sab-dom') {
      // 2 Días: Fin de semana (3 bloques de juego)
      const startDate = getTemplateStartDate(bDate, 6); // Garantiza SÁBADO
      setBaseDate(startDate);
      setDaysConfig([
        { date: startDate, startTime: '08:30', endTime: '23:30', phase: 'grupos' }, // Sábado
        { date: addDaysToDate(startDate, 1), startTime: '09:00', endTime: '14:30', phase: 'semis' },  // Domingo Semis
        { date: addDaysToDate(startDate, 1), startTime: '15:30', endTime: '21:30', phase: 'finals' } // Domingo Finales
      ]);
    } else if (type === '1-dia') {
      // 1 Día: Torneo Relámpago (Sábado)
      const startDate = getTemplateStartDate(bDate, 6); // Garantiza SÁBADO
      setBaseDate(startDate);
      setDaysConfig([
        { date: startDate, startTime: '08:30', endTime: '22:30', phase: 'grupos' } // Sábado completo
      ]);
    }
  };

  // ANÁLISIS DEL TORNEO Y ESTIMADOR DE CAPACIDAD
  const activeMatches = matches.filter(m => !m.is_bye);
  
  // Desglose por categoría y etapas
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

      // Extraer fuerza de categoría para mostrar prioridad
      const numMatch = cat.name.match(/(\d+)/);
      const strength = numMatch ? parseInt(numMatch[1]) : 99;

      return {
        id: cat.id,
        name: cat.name,
        strength,
        totalMatches: catMatches.length,
        grupos: catGrupos,
        semis: catSemis,
        finals: catFinals
      };
    }).filter(Boolean);
  }, [categories, activeMatches]);

  const totalMatches = activeMatches.length;
  const totalGrupos = categoryStats.reduce((sum, c) => sum + c.grupos, 0);
  const totalSemis = categoryStats.reduce((sum, c) => sum + c.semis, 0);
  const totalFinals = categoryStats.reduce((sum, c) => sum + c.finals, 0);

  // Turnos generados por los días y canchas seleccionadas
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

  // Tiempo requerido de cancha para el torneo
  const matchHoursRequired = (totalMatches * (matchDuration / 60)).toFixed(1);
  const clubHoursRequired = activeCourtsCount > 0 
    ? (totalMatches * (matchDuration / 60) / activeCourtsCount).toFixed(1) 
    : 0;

  // Balance Capacidad vs Demanda
  const slotsBalance = daysSlotsAnalysis.totalSlots - totalMatches;
  const isCapacitySufficient = totalMatches === 0 || slotsBalance >= 0;
  const capacityPercent = totalMatches > 0 
    ? Math.min(100, Math.round((daysSlotsAnalysis.totalSlots / totalMatches) * 100))
    : 100;

  // Toggle de selección de todas las canchas
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
    <div className="animate-fade-up max-w-5xl mx-auto w-full mt-2 pb-16">
      {/* Botón de regreso */}
      <button 
        onClick={onBack} 
        className="mb-4 text-gray-400 hover:text-white text-xs bg-gray-900 hover:bg-gray-800 py-2 px-4 rounded-lg border border-gray-800 flex items-center gap-2 transition-colors font-medium shadow-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Volver al Panel Principal
      </button>

      <div className="bg-gray-900 border border-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl space-y-8">
        
        {/* Cabecera del Gestor */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-800 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-950/60 text-red-400 border border-red-900/40">
                Master Scheduler
              </span>
              <span className="text-gray-500 text-xs">•</span>
              <span className="text-gray-400 text-xs font-semibold">Circuito Black Pádel</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-white tracking-wide">
              Gestor de Horarios y <span className="font-bold text-red-500">Programador Global</span>
            </h2>
            <p className="text-gray-400 text-xs mt-1 max-w-2xl">
              Configura las jornadas de juego, duración de turnos y canchas activas. El sistema distribuirá automáticamente todos los cruces respetando orden de rondas y asignando los mejores horarios a las categorías principales.
            </p>
          </div>

          <button 
            type="button"
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-2 text-xs bg-gray-800/80 hover:bg-gray-800 text-gray-300 hover:text-white px-3.5 py-2 rounded-xl border border-gray-700 transition-all self-start md:self-auto shadow-sm"
          >
            <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{showHelp ? "Ocultar Explicación" : "¿Cómo entender este cuadro?"}</span>
          </button>
        </div>

        {/* GUÍA DIDÁCTICA DESPLEGABLE */}
        {showHelp && (
          <div className="bg-gray-950 border border-yellow-700/30 rounded-2xl p-6 animate-fade-up text-xs space-y-4 shadow-xl">
            <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
              <div className="w-7 h-7 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center font-bold">
                💡
              </div>
              <h3 className="text-white font-bold text-sm tracking-wide">
                Guía Rápida para Organizar los Horarios del Torneo
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 leading-relaxed">
              <div className="bg-gray-900/70 p-4 rounded-xl border border-gray-800/80 space-y-1.5">
                <p className="font-bold text-yellow-400 text-xs flex items-center gap-1.5">
                  <span>🎾</span> ¿Qué es un Turno?
                </p>
                <p className="text-gray-400 text-[11px]">
                  Un turno es una franja de tiempo en una cancha (ej: 60 minutos en Cancha 1). Para jugar 1 partido necesitas 1 turno.
                </p>
              </div>
              <div className="bg-gray-900/70 p-4 rounded-xl border border-gray-800/80 space-y-1.5">
                <p className="font-bold text-yellow-400 text-xs flex items-center gap-1.5">
                  <span>⏱️</span> ¿Qué significa "Horas de Club Requeridas"?
                </p>
                <p className="text-gray-400 text-[11px]">
                  Si tienes 24 partidos de 60 min (24 horas totales de juego) y usas 3 canchas en paralelo, el club debe estar abierto durante <strong>8 horas</strong> (24 ÷ 3 = 8 hrs).
                </p>
              </div>
              <div className="bg-gray-900/70 p-4 rounded-xl border border-gray-800/80 space-y-1.5">
                <p className="font-bold text-yellow-400 text-xs flex items-center gap-1.5">
                  <span>🛡️</span> Margen de Seguridad Recomendado
                </p>
                <p className="text-gray-400 text-[11px]">
                  Se recomienda tener al menos un 10% a 15% de turnos libres extras. Esto absorbe partidos que van a 3 sets con tie-break y da tiempo para descanso y calentamiento.
                </p>
              </div>
              <div className="bg-gray-900/70 p-4 rounded-xl border border-gray-800/80 space-y-1.5">
                <p className="font-bold text-yellow-400 text-xs flex items-center gap-1.5">
                  <span>⭐</span> Prioridad Prime Time de Categorías
                </p>
                <p className="text-gray-400 text-[11px]">
                  Las categorías de mayor nivel (ej: 1ra, 2da, 3ra) se programan automáticamente en los horarios estelares de la noche con mayor afluencia de público, mientras que las categorías iniciales juegan más temprano.
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-[11px] italic bg-gray-900 p-3 rounded-lg border border-gray-800">
              📌 <strong>Nota:</strong> Una vez aplicado el horario global, puedes editar cualquier partido individualmente haciendo clic sobre él en el cuadro para moverlo si algún jugador tiene una restricción horaria específica.
            </p>
          </div>
        )}

        {/* 1. SECCIÓN ESTIMADOR DE HORAS Y DIAGNÓSTICO EN TIEMPO REAL */}
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden">
          {/* Luz decorativa de fondo */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Encabezado del Estimador */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-800/80 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-950/40 border border-red-800/40 text-red-500 flex items-center justify-center shadow-inner">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-base tracking-wide flex items-center gap-2">
                  Estimador de Capacidad y Carga Horaria
                </h3>
                <p className="text-gray-400 text-xs">
                  {categories.length} categorías registradas • {activeCourtsCount} canchas seleccionadas • {matchDuration} min/partido
                </p>
              </div>
            </div>

            {/* Badge de estado del torneo */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Demanda:</span>
              <span className="bg-gray-900 border border-gray-800 text-gray-300 font-bold text-xs px-2.5 py-1 rounded-lg">
                {totalMatches} partidos a disputar
              </span>
            </div>
          </div>

          {/* SEMÁFORO DE VIABILIDAD (Capacidad vs Demanda) */}
          <div className="mt-5 mb-6">
            {totalMatches === 0 ? (
              <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 flex items-center gap-3 text-xs text-gray-400">
                <span className="text-lg">ℹ️</span>
                <div>
                  <strong className="text-gray-300 block">No hay partidos activos en los cuadros</strong>
                  Aún no has generado los cruces de las categorías. Utiliza el botón <strong>"Piloto Automático"</strong> en el panel de inicio para armar los grupos y llaves antes de asignar horarios.
                </div>
              </div>
            ) : isCapacitySufficient ? (
              <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-900/50 text-emerald-400 flex items-center justify-center flex-shrink-0 text-lg border border-emerald-700/40">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                      ¡Capacidad Confirmada! Horarios Suficientes
                      <span className="bg-emerald-900/60 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-mono border border-emerald-700/50">
                        {capacityPercent}% cubierto
                      </span>
                    </h4>
                    <p className="text-gray-300 text-xs mt-0.5">
                      Tienes <strong>{daysSlotsAnalysis.totalSlots} turnos disponibles</strong> generados en tus días y canchas para <strong>{totalMatches} partidos</strong>. 
                      {slotsBalance > 0 ? (
                        <span className="text-emerald-300 font-medium ml-1">
                          Cuentas con un margen de seguridad de +{slotsBalance} turnos libres.
                        </span>
                      ) : (
                        <span className="text-yellow-400 font-medium ml-1">
                          Capacidad exacta (0 turnos sobrantes).
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 self-end md:self-auto">
                  <span className="inline-block px-3 py-1 bg-emerald-900/40 border border-emerald-700/50 text-emerald-300 font-bold text-xs rounded-lg uppercase tracking-wider">
                    Viable para Jugar
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-red-950/40 border border-red-800/50 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-900/50 text-red-400 flex items-center justify-center flex-shrink-0 text-lg border border-red-700/40 animate-pulse">
                    ⚠️
                  </div>
                  <div>
                    <h4 className="text-red-400 font-bold text-sm flex items-center gap-2">
                      Atención: Faltan {Math.abs(slotsBalance)} turnos para cubrir todos los partidos
                      <span className="bg-red-900/60 text-red-300 text-[10px] px-2 py-0.5 rounded-full font-mono border border-red-700/50">
                        Solo {capacityPercent}% cubierto
                      </span>
                    </h4>
                    <p className="text-gray-300 text-xs mt-0.5">
                      Tienes <strong>{totalMatches} partidos</strong> pero tu configuración actual solo genera <strong>{daysSlotsAnalysis.totalSlots} turnos</strong>. 
                      Si aplicas ahora, <strong>{Math.abs(slotsBalance)} partidos quedarán sin fecha ni horario</strong>.
                    </p>
                    <p className="text-red-300 text-[11px] mt-1 font-medium">
                      👉 <strong>Cómo solucionarlo:</strong> Amplía los horarios de cierre, habilita más canchas o añade otro día de juego abajo.
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 self-end md:self-auto">
                  <span className="inline-block px-3 py-1 bg-red-900/40 border border-red-700/50 text-red-300 font-bold text-xs rounded-lg uppercase tracking-wider">
                    Déficit Horario
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 4 TARJETAS DE MÉTRICAS CLARAS Y ENTENDIBLES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
            {/* 1. Partidos a Programar */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-gray-500 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Partidos Totales</span>
                  <span className="text-xs">🏆</span>
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">
                  {totalMatches} <span className="text-xs font-normal text-gray-400">partidos</span>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-gray-800 text-[11px] text-gray-400 space-y-0.5">
                <div className="flex justify-between">
                  <span>Zonas / Grupos:</span>
                  <strong className="text-gray-200">{totalGrupos}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Semis y Finales:</span>
                  <strong className="text-gray-200">{totalSemis + totalFinals}</strong>
                </div>
              </div>
            </div>

            {/* 2. Turnos Disponibles */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-gray-500 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Turnos Disponibles</span>
                  <span className="text-xs">📅</span>
                </div>
                <div className="text-2xl font-bold text-red-500 tracking-tight">
                  {daysSlotsAnalysis.totalSlots} <span className="text-xs font-normal text-gray-400">turnos</span>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-gray-800 text-[11px] text-gray-400 space-y-0.5">
                <div className="flex justify-between">
                  <span>En {daysConfig.length} bloques:</span>
                  <strong className="text-gray-200">{daysSlotsAnalysis.totalClubHours} hrs club</strong>
                </div>
                <div className="flex justify-between">
                  <span>Canchas activas:</span>
                  <strong className="text-gray-200">{activeCourtsCount}</strong>
                </div>
              </div>
            </div>

            {/* 3. Horas de Club Necesarias */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-gray-500 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Apertura de Club</span>
                  <span className="text-xs">⏱️</span>
                </div>
                <div className="text-2xl font-bold text-yellow-500 tracking-tight">
                  {clubHoursRequired} <span className="text-xs font-normal text-gray-400">hrs/cancha</span>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-gray-800 text-[11px] text-gray-400 space-y-0.5">
                <div className="flex justify-between">
                  <span>Horas juego acum.:</span>
                  <strong className="text-gray-200">{matchHoursRequired} hrs</strong>
                </div>
                <p className="text-[10px] text-gray-500">
                  Tiempo simultáneo con {activeCourtsCount} canchas
                </p>
              </div>
            </div>

            {/* 4. Margen de Seguridad */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-gray-500 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Margen de Turnos</span>
                  <span className="text-xs">🛡️</span>
                </div>
                <div className={`text-2xl font-bold tracking-tight ${slotsBalance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {slotsBalance >= 0 ? `+${slotsBalance}` : slotsBalance} <span className="text-xs font-normal text-gray-400">turnos</span>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-gray-800 text-[11px] text-gray-400">
                {slotsBalance > 3 ? (
                  <p className="text-emerald-400/90 font-medium">Margen óptimo para imprevistos o descansos</p>
                ) : slotsBalance >= 0 ? (
                  <p className="text-yellow-400/90 font-medium">Margen ajustado pero suficiente</p>
                ) : (
                  <p className="text-red-400/90 font-medium">Déficit: {Math.abs(slotsBalance)} partidos sin turno</p>
                )}
              </div>
            </div>
          </div>

          {/* DESGLOSE POR CATEGORÍA (Colapsable / Informativo) */}
          {categoryStats.length > 0 && (
            <div className="mt-5 pt-4 border-t border-gray-800/80">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Desglose de Partidos por Categoría y Prioridad
                </span>
                <span className="text-[10px] text-gray-500 italic">
                  Las categorías con menor número (1ra, 2da...) juegan en los horarios más tarde (Prime Time)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {categoryStats.map(cat => (
                  <div key={cat.id} className="bg-gray-900/60 border border-gray-800/80 rounded-lg p-2.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-gray-200">{cat.name}</span>
                      <span className="block text-[10px] text-gray-500">
                        {cat.grupos} grupos • {cat.semis} semis • {cat.finals} final
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-red-400">{cat.totalMatches} part.</span>
                      <span className="block text-[9px] text-gray-400">
                        {cat.strength <= 2 ? '⭐ Prime Night' : cat.strength <= 4 ? 'Tar/Noche' : 'Turno Normal'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 2. PLANTILLAS RÁPIDAS DE TORNEO */}
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-800 gap-3">
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <span>⚡</span> Plantillas Rápidas de Torneo
              </h3>
              <p className="text-gray-400 text-xs">
                Carga con 1 solo clic los días exactos para cada formato de fin de semana.
              </p>
            </div>

            {/* Selector de Fecha de Referencia y botones de salto rápido */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-xl">
                <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Semana / Fecha:</label>
                <input 
                  type="date" 
                  value={baseDate} 
                  onChange={e => setBaseDate(e.target.value)}
                  className="bg-transparent text-white text-xs outline-none cursor-pointer focus:text-red-400 font-mono"
                />
              </div>
              <button
                type="button"
                onClick={() => setBaseDate(todayStr)}
                className={`text-[10px] font-bold px-2.5 py-1.5 rounded-xl border transition-colors ${
                  baseDate === todayStr 
                    ? 'bg-red-950/60 border-red-800 text-red-300' 
                    : 'bg-gray-900 hover:bg-gray-800 border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                Esta Semana
              </button>
              <button
                type="button"
                onClick={() => setBaseDate(addDaysToDate(todayStr, 7))}
                className="text-[10px] font-bold bg-gray-900 hover:bg-gray-800 border-gray-800 text-gray-400 hover:text-white px-2.5 py-1.5 rounded-xl border transition-colors"
              >
                Próxima Semana (+7d)
              </button>
            </div>
          </div>

          {/* Tarjetas de Plantillas con Vista Previa de Fechas Reales */}
          {(() => {
            const previewJueStart = getTemplateStartDate(baseDate || todayStr, 4);
            const previewVieStart = getTemplateStartDate(baseDate || todayStr, 5);
            const previewSabStart = getTemplateStartDate(baseDate || todayStr, 6);

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Jueves a Domingo */}
                <button
                  type="button"
                  onClick={() => loadTemplate('jue-dom')}
                  className="bg-gray-900/90 hover:bg-gray-800/90 border border-gray-800 hover:border-yellow-600/70 p-3.5 rounded-xl text-left transition-all group shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-yellow-500 text-sm font-bold group-hover:scale-102 transition-transform">
                        Jueves a Domingo
                      </span>
                      <span className="text-[10px] bg-yellow-950/40 text-yellow-400 border border-yellow-800/40 px-1.5 py-0.5 rounded font-mono font-bold">
                        4 Días
                      </span>
                    </div>
                    <span className="text-gray-200 text-xs font-semibold block mt-1">
                      {formatShortDate(previewJueStart)} al {formatShortDate(addDaysToDate(previewJueStart, 3))}
                    </span>
                  </div>
                  <span className="text-gray-400 text-[10px] block mt-2 pt-2 border-t border-gray-800/80">
                    Jue y Vie tarde • Sáb todo el día • Dom semis/finales
                  </span>
                </button>

                {/* Viernes a Domingo */}
                <button
                  type="button"
                  onClick={() => loadTemplate('vie-dom')}
                  className="bg-gray-900/90 hover:bg-gray-800/90 border border-gray-800 hover:border-red-600/70 p-3.5 rounded-xl text-left transition-all group shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-red-400 text-sm font-bold group-hover:scale-102 transition-transform">
                        Viernes a Domingo
                      </span>
                      <span className="text-[10px] bg-red-950/40 text-red-400 border border-red-800/40 px-1.5 py-0.5 rounded font-mono font-bold">
                        3 Días
                      </span>
                    </div>
                    <span className="text-gray-200 text-xs font-semibold block mt-1">
                      {formatShortDate(previewVieStart)} al {formatShortDate(addDaysToDate(previewVieStart, 2))}
                    </span>
                  </div>
                  <span className="text-gray-400 text-[10px] block mt-2 pt-2 border-t border-gray-800/80">
                    Vie tarde • Sáb todo el día • Dom semis/finales
                  </span>
                </button>

                {/* Sábado y Domingo */}
                <button
                  type="button"
                  onClick={() => loadTemplate('sab-dom')}
                  className="bg-gray-900/90 hover:bg-gray-800/90 border border-gray-800 hover:border-blue-600/70 p-3.5 rounded-xl text-left transition-all group shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-blue-400 text-sm font-bold group-hover:scale-102 transition-transform">
                        Sábado y Domingo
                      </span>
                      <span className="text-[10px] bg-blue-950/40 text-blue-400 border border-blue-800/40 px-1.5 py-0.5 rounded font-mono font-bold">
                        2 Días
                      </span>
                    </div>
                    <span className="text-gray-200 text-xs font-semibold block mt-1">
                      {formatShortDate(previewSabStart)} al {formatShortDate(addDaysToDate(previewSabStart, 1))}
                    </span>
                  </div>
                  <span className="text-gray-400 text-[10px] block mt-2 pt-2 border-t border-gray-800/80">
                    Sáb intensivo • Dom semis y finales
                  </span>
                </button>

                {/* Torneo 1 Día */}
                <button
                  type="button"
                  onClick={() => loadTemplate('1-dia')}
                  className="bg-gray-900/90 hover:bg-gray-800/90 border border-gray-800 hover:border-emerald-600/70 p-3.5 rounded-xl text-left transition-all group shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-emerald-400 text-sm font-bold group-hover:scale-102 transition-transform">
                        Torneo 1 Día
                      </span>
                      <span className="text-[10px] bg-emerald-950/40 text-emerald-400 border border-emerald-800/40 px-1.5 py-0.5 rounded font-mono font-bold">
                        1 Día
                      </span>
                    </div>
                    <span className="text-gray-200 text-xs font-semibold block mt-1">
                      {formatShortDate(previewSabStart)}
                    </span>
                  </div>
                  <span className="text-gray-400 text-[10px] block mt-2 pt-2 border-t border-gray-800/80">
                    Sábado continuo de 08:30 a 22:30
                  </span>
                </button>
              </div>
            );
          })()}
        </div>

        {/* 3. CONFIGURACIÓN DETALLADA DE DÍAS Y HORARIOS */}
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-800 gap-3">
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <span>📅</span> Cronograma de Días y Bloques Horarios
              </h3>
              <p className="text-gray-400 text-xs">
                Ajusta las fechas, rango de horas y fase deportiva de cada jornada.
              </p>
            </div>
            <button 
              type="button"
              onClick={addDay}
              className="bg-red-950/40 hover:bg-red-950/80 text-red-400 hover:text-white border border-red-900/60 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              + Agregar Bloque de Día
            </button>
          </div>

          <div className="space-y-4">
            {daysConfig.map((day, idx) => {
              const dateInfo = formatReadableDate(day.date);
              const slotsInfo = calculateDaySlots(day, matchDuration, activeCourtsCount);

              return (
                <div 
                  key={idx} 
                  className="bg-gray-900/90 border border-gray-800 rounded-2xl p-4 md:p-5 hover:border-gray-700 transition-colors shadow-lg"
                >
                  {/* Fila superior: Fecha, Badge de día y estadísticas del bloque */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-800/80">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-gray-800 text-gray-300 font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="text-sm font-bold text-white capitalize">
                          {dateInfo.full}
                        </span>
                        <span className="text-[11px] text-gray-400 ml-2">
                          ({slotsInfo.hours} horas de juego)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="bg-red-950/40 border border-red-900/40 text-red-400 text-xs px-2.5 py-0.5 rounded-lg font-bold">
                        {slotsInfo.totalSlots} turnos ({slotsInfo.slotsPerCourt} por cancha)
                      </span>
                      <button
                        type="button"
                        onClick={() => duplicateDay(idx)}
                        title="Duplicar para el día siguiente"
                        className="text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 p-1.5 rounded-lg border border-gray-700 text-xs transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                      </button>
                      {daysConfig.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDay(idx)}
                          title="Eliminar este bloque"
                          className="text-red-400 hover:text-white bg-red-950/30 hover:bg-red-900/60 p-1.5 rounded-lg border border-red-900/40 text-xs transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Fila intermedia: Campos editables */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 mt-3.5 items-end">
                    {/* Selector de Fecha */}
                    <div className="md:col-span-3">
                      <label className="block text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-1">
                        Fecha Calendario
                      </label>
                      <input 
                        type="date" 
                        value={day.date} 
                        onChange={e => updateDay(idx, 'date', e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl p-3 sm:p-2.5 text-base sm:text-xs focus:border-red-600 outline-none transition-colors"
                      />
                    </div>

                    {/* Selector de Fase Deportiva */}
                    <div className="md:col-span-3">
                      <label className="block text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-1">
                        Fase Asignada
                      </label>
                      <select 
                        value={day.phase} 
                        onChange={e => updateDay(idx, 'phase', e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl p-3 sm:p-2.5 text-base sm:text-xs focus:border-red-600 outline-none cursor-pointer transition-colors"
                      >
                        <option value="grupos">🎾 Grupos y Cruces Previos</option>
                        <option value="semis">🏆 Solo Semifinales</option>
                        <option value="finals">🥇 Solo Finales</option>
                      </select>
                    </div>

                    {/* Horario de Inicio */}
                    <div className="md:col-span-3">
                      <label className="block text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-1">
                        Hora Apertura (24h)
                      </label>
                      <div className="flex items-center gap-1 bg-gray-950 border border-gray-800 rounded-xl p-1">
                        <select 
                          value={day.startTime.split(':')[0]} 
                          onChange={e => {
                            const m = day.startTime.split(':')[1] || '00';
                            updateDay(idx, 'startTime', `${e.target.value}:${m}`);
                          }}
                          className="bg-transparent text-white text-base sm:text-xs p-2 sm:p-1.5 focus:text-red-400 outline-none cursor-pointer flex-1 text-center font-mono font-bold"
                        >
                          {Array.from({length: 24}, (_, i) => i.toString().padStart(2, '0')).map(h => (
                            <option key={h} value={h} className="bg-gray-900">{h} hs</option>
                          ))}
                        </select>
                        <span className="text-gray-500 font-bold">:</span>
                        <select 
                          value={day.startTime.split(':')[1]} 
                          onChange={e => {
                            const h = day.startTime.split(':')[0] || '09';
                            updateDay(idx, 'startTime', `${h}:${e.target.value}`);
                          }}
                          className="bg-transparent text-white text-base sm:text-xs p-2 sm:p-1.5 focus:text-red-400 outline-none cursor-pointer flex-1 text-center font-mono font-bold"
                        >
                          {['00', '15', '30', '45'].map(m => (
                            <option key={m} value={m} className="bg-gray-900">{m} m</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Horario de Cierre */}
                    <div className="md:col-span-3">
                      <label className="block text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-1">
                        Hora Cierre (24h)
                      </label>
                      <div className="flex items-center gap-1 bg-gray-950 border border-gray-800 rounded-xl p-1">
                        <select 
                          value={day.endTime.split(':')[0]} 
                          onChange={e => {
                            const m = day.endTime.split(':')[1] || '00';
                            updateDay(idx, 'endTime', `${e.target.value}:${m}`);
                          }}
                          className="bg-transparent text-white text-base sm:text-xs p-2 sm:p-1.5 focus:text-red-400 outline-none cursor-pointer flex-1 text-center font-mono font-bold"
                        >
                          {Array.from({length: 24}, (_, i) => i.toString().padStart(2, '0')).map(h => (
                            <option key={h} value={h} className="bg-gray-900">{h} hs</option>
                          ))}
                        </select>
                        <span className="text-gray-500 font-bold">:</span>
                        <select 
                          value={day.endTime.split(':')[1]} 
                          onChange={e => {
                            const h = day.endTime.split(':')[0] || '22';
                            updateDay(idx, 'endTime', `${h}:${e.target.value}`);
                          }}
                          className="bg-transparent text-white text-base sm:text-xs p-2 sm:p-1.5 focus:text-red-400 outline-none cursor-pointer flex-1 text-center font-mono font-bold"
                        >
                          {['00', '15', '30', '45'].map(m => (
                            <option key={m} value={m} className="bg-gray-900">{m} m</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Fila inferior: Botones de preajuste de horario rápido para este día */}
                  <div className="mt-3 pt-2.5 border-t border-gray-800/60 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] text-gray-500 font-medium">Ajuste rápido:</span>
                    <button
                      type="button"
                      onClick={() => applyTimePreset(idx, '08:30', '14:00')}
                      className="text-[10px] bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 py-0.5 rounded border border-gray-700/80 transition-colors"
                    >
                      Mañana (08:30 - 14:00)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyTimePreset(idx, '14:00', '20:00')}
                      className="text-[10px] bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 py-0.5 rounded border border-gray-700/80 transition-colors"
                    >
                      Tarde (14:00 - 20:00)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyTimePreset(idx, '18:00', '23:45')}
                      className="text-[10px] bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 py-0.5 rounded border border-gray-700/80 transition-colors"
                    >
                      Noche (18:00 - 23:45)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyTimePreset(idx, '08:30', '23:30')}
                      className="text-[10px] bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 py-0.5 rounded border border-gray-700/80 transition-colors"
                    >
                      Día Completo (08:30 - 23:30)
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. CANCHAS DISPONIBLES Y DURACIÓN DE PARTIDO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Canchas Disponibles */}
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                  <span>🏟️</span> Canchas Habilitadas
                </h3>
                <p className="text-gray-400 text-xs">
                  {selectedCourts.length} de {courts.length} canchas seleccionadas
                </p>
              </div>
              {courts.length > 0 && (
                <button
                  type="button"
                  onClick={toggleAllCourts}
                  className="text-[10px] text-red-400 hover:text-white uppercase font-bold bg-red-950/30 px-2.5 py-1 rounded border border-red-900/40 transition-colors"
                >
                  {selectedCourts.length === courts.length ? "Deseleccionar Todas" : "Seleccionar Todas"}
                </button>
              )}
            </div>

            {courts && courts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {courts.map(c => {
                  const isChecked = selectedCourts.includes(c.id);
                  return (
                    <label 
                      key={c.id} 
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-red-950/20 border-red-800/60 text-white' 
                          : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={isChecked} 
                        onChange={e => {
                          if (e.target.checked) setSelectedCourts([...selectedCourts, c.id]);
                          else setSelectedCourts(selectedCourts.filter(id => id !== c.id));
                        }} 
                        className="accent-red-600 w-4 h-4 rounded"
                      />
                      <div className="truncate">
                        <span className="text-xs font-bold block truncate">{c.name}</span>
                        <span className="text-[10px] text-gray-500 block">
                          {isChecked ? "Activa para programación" : "No utilizada"}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic p-3 text-center border border-dashed border-gray-800 rounded-lg">
                No hay canchas registradas en la base de datos.
              </p>
            )}
          </div>

          {/* Duración del Partido */}
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
            <div className="pb-3 border-b border-gray-800">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <span>⏱️</span> Duración por Partido
              </h3>
              <p className="text-gray-400 text-xs">
                Tiempo asignado a cada turno en cancha.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {[45, 60, 75, 90].map(mins => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setMatchDuration(mins)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      matchDuration === mins
                        ? 'bg-red-700 text-white border-red-600 shadow-md shadow-red-950/50'
                        : 'bg-gray-900 text-gray-300 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    {mins} min
                    {mins === 60 && <span className="block text-[8px] font-normal opacity-80">Estándar</span>}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-1">
                  O especificar minutos manuales:
                </label>
                <input 
                  type="number" 
                  value={matchDuration} 
                  min="30"
                  max="180"
                  step="5"
                  onChange={e => setMatchDuration(Number(e.target.value))} 
                  className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl p-3 sm:p-2.5 focus:border-red-600 outline-none text-base sm:text-xs font-mono font-bold" 
                />
              </div>

              <p className="text-[11px] text-gray-400 italic bg-gray-900 p-2.5 rounded-lg border border-gray-800/80">
                💡 60 minutos con punto de oro es el formato recomendado para torneos amateurs con alta cantidad de parejas.
              </p>
            </div>
          </div>
        </div>

        {/* 5. BOTÓN DE APLICACIÓN DEL CALENDARIO */}
        <div className="pt-2">
          <button 
            type="button"
            disabled={activeCourtsCount === 0 || daysConfig.length === 0}
            onClick={() => setShowConfirmModal(true)} 
            className={`w-full font-bold py-4 px-6 rounded-2xl shadow-xl transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-3 ${
              activeCourtsCount === 0 || daysConfig.length === 0
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                : !isCapacitySufficient
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950/50'
                  : 'bg-red-700 hover:bg-red-600 text-white shadow-red-950/60 hover:shadow-red-700/30'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span>
              {!isCapacitySufficient 
                ? `Revisar y Aplicar Calendario (${Math.abs(slotsBalance)} turnos de déficit)` 
                : "Aplicar Calendario Inteligente a Todo el Torneo"}
            </span>
          </button>
          
          <p className="text-center text-gray-500 text-[11px] mt-2.5">
            🔒 Esta acción organizará todos los partidos cronológicamente y asignará canchas según el nivel de cada categoría.
          </p>
        </div>
      </div>

      {/* MODAL DE CONFIRMACIÓN ELEGANTE */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-gray-900 border border-gray-800 w-full max-w-lg rounded-2xl p-4 sm:p-6 shadow-2xl animate-fade-up space-y-4 sm:space-y-5 my-auto">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800 text-red-500 flex items-center justify-center text-lg shrink-0">
                🗓️
              </div>
              <div>
                <h3 className="text-white font-bold text-base">
                  Confirmar Programación Global
                </h3>
                <p className="text-gray-400 text-xs">
                  Resumen de asignación de turnos para el torneo
                </p>
              </div>
            </div>

            <div className="bg-gray-950 border border-gray-800/80 rounded-xl p-4 text-xs space-y-2.5">
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
                <span className="text-gray-400">Duración por partido:</span>
                <span className="font-bold text-white">{matchDuration} minutos</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-400">Margen de seguridad:</span>
                <span className={`font-bold ${slotsBalance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {slotsBalance >= 0 ? `+${slotsBalance} turnos libres` : `⚠️ Déficit de ${Math.abs(slotsBalance)} turnos`}
                </span>
              </div>
            </div>

            {!isCapacitySufficient && (
              <div className="bg-amber-950/40 border border-amber-800/50 rounded-xl p-3 text-[11px] text-amber-300 leading-relaxed">
                ⚠️ <strong>Aviso importante:</strong> Al haber menos turnos que partidos, {Math.abs(slotsBalance)} partidos quedarán sin horario asignado para que los programes manualmente más adelante.
              </div>
            )}

            <p className="text-gray-400 text-xs leading-relaxed">
              ¿Deseas sobreescribir los horarios actuales de todos los cuadros con esta nueva distribución?
            </p>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 sm:gap-3 pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowConfirmModal(false)}
                className="w-full sm:w-auto px-5 py-3 sm:py-2.5 text-xs font-bold text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 transition-colors text-center"
              >
                Volver a Ajustar
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmAndApply}
                className="w-full sm:w-auto px-6 py-3 sm:py-2.5 text-xs font-bold text-white bg-red-700 hover:bg-red-600 rounded-xl shadow-lg shadow-red-950/50 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                    <span>Guardando Calendario...</span>
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
