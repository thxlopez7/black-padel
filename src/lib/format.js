const WEEKDAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

// La base devuelve la hora como "HH:MM:SS"; en pantalla se muestra "HH:MM"
export const formatTime = (time) => (time ? String(time).slice(0, 5) : '');

// "Sáb 01/11 · 09:00" o "Fecha a definir"
export function formatMatchSchedule(match) {
  if (!match.match_date) return 'Fecha a definir';
  const [y, m, d] = match.match_date.split('-').map(Number);
  const weekday = WEEKDAYS[new Date(y, m - 1, d).getDay()];
  const time = formatTime(match.match_time);
  return `${weekday} ${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}${time ? ` · ${time}` : ''}`;
}

export const scheduleSortKey = (match) =>
  `${match.match_date || '9999-12-31'}T${formatTime(match.match_time) || '99:99'}`;

// Fecha local en formato YYYY-MM-DD (toISOString usa UTC y puede adelantar un día)
export function toLocalDateString(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function addDays(dateStr, days) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return toLocalDateString(new Date(y, m - 1, d + days));
}
