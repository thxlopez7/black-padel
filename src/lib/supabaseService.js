import { supabase } from './supabase';

// --- AUTH ---
export async function loginAdmin(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function logoutAdmin() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// --- DB ---

// --- SANITIZACIÓN & VALIDACIÓN DEFENSIVA ---
export function sanitizeString(val, maxLength = 100) {
  if (typeof val !== 'string') return val;
  return val
    .replace(/[<>]/g, '') // Eliminar etiquetas HTML para prevenir XSS
    .trim()
    .slice(0, maxLength);
}

export function sanitizeScores(scoreArray) {
  if (!Array.isArray(scoreArray)) return ['', '', ''];
  return scoreArray.slice(0, 3).map(s => {
    if (s === null || s === undefined || s === '') return '';
    const num = parseInt(String(s).trim(), 10);
    return isNaN(num) || num < 0 || num > 99 ? '' : String(num);
  });
}

// Categorías
export async function getCategories() {
  const { data, error } = await supabase.from('categories').select('*').order('created_at', { ascending: true });
  if (error) console.error("Error fetching categories:", error);
  return data || [];
}

export async function addCategory(name, numPairs = 6) {
  const cleanName = sanitizeString(name, 60);
  const cleanNumPairs = Math.max(4, Math.min(64, Number(numPairs) || 6));
  const { data, error } = await supabase.from('categories').insert([{ name: cleanName, num_pairs: cleanNumPairs }]).select();
  if (error) console.error("Error adding category:", error);
  return data ? data[0] : null;
}

export async function deleteCategory(id) {
  // Primero borramos los partidos y jugadores para evitar errores de llave foránea (si no hay CASCADE)
  await supabase.from('matches').delete().eq('category_id', id);
  await supabase.from('players').delete().eq('category_id', id);
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) console.error("Error deleting category:", error);
  return !error;
}

// Canchas
export async function getCourts() {
  const { data, error } = await supabase.from('courts').select('*').order('created_at', { ascending: true });
  if (error) console.error("Error fetching courts:", error);
  return data || [];
}

export async function addCourt(name) {
  const cleanName = sanitizeString(name, 50);
  const { data, error } = await supabase.from('courts').insert([{ name: cleanName }]).select();
  if (error) console.error("Error adding court:", error);
  return data ? data[0] : null;
}

export async function deleteCourt(id) {
  const { error } = await supabase.from('courts').delete().eq('id', id);
  if (error) console.error("Error deleting court:", error);
  return !error;
}

// Jugadores
export async function getPlayers() {
  const { data, error } = await supabase.from('players').select('*, categories(name)').order('created_at', { ascending: false });
  if (error) console.error("Error fetching players:", error);
  return data || [];
}

export async function addPlayer(playerData) {
  const cleanData = {
    ...playerData,
    name: sanitizeString(playerData?.name, 80),
    partner: playerData?.partner ? sanitizeString(playerData.partner, 80) : null,
    phone: playerData?.phone ? sanitizeString(playerData.phone, 30) : null,
  };
  const { data, error } = await supabase.from('players').insert([cleanData]).select();
  if (error) console.error("Error adding player:", error);
  return data ? data[0] : null;
}

export async function updatePlayer(id, playerData) {
  const cleanData = { ...playerData };
  if (cleanData.name !== undefined) cleanData.name = sanitizeString(cleanData.name, 80);
  if (cleanData.partner !== undefined) cleanData.partner = cleanData.partner ? sanitizeString(cleanData.partner, 80) : null;
  if (cleanData.phone !== undefined) cleanData.phone = cleanData.phone ? sanitizeString(cleanData.phone, 30) : null;
  
  const { data, error } = await supabase.from('players').update(cleanData).eq('id', id).select();
  if (error) console.error("Error updating player:", error);
  return data ? data[0] : null;
}

export async function deletePlayer(id) {
  const { error } = await supabase.from('players').delete().eq('id', id);
  if (error) console.error("Error deleting player:", error);
  return !error;
}

// Partidos
export async function getMatches() {
  const { data, error } = await supabase.from('matches').select('*').order('match_date', { ascending: true }).order('match_time', { ascending: true });
  if (error) console.error("Error fetching matches:", error);
  return data || [];
}

export async function saveGeneratedMatches(matchesArray) {
  const cleanMatches = matchesArray.map(m => ({
    ...m,
    p1_name: m.p1_name ? sanitizeString(m.p1_name, 100) : null,
    p2_name: m.p2_name ? sanitizeString(m.p2_name, 100) : null,
    winner: m.winner ? sanitizeString(m.winner, 100) : null,
    round_name: m.round_name ? sanitizeString(m.round_name, 50) : m.round_name
  }));
  const { data, error } = await supabase.from('matches').insert(cleanMatches).select();
  if (error) console.error("Error saving generated matches:", error);
  return data || [];
}

export async function deleteMatchesByCategory(categoryId) {
  const { error } = await supabase.from('matches').delete().eq('category_id', categoryId);
  if (error) console.error("Error deleting old matches:", error);
  return !error;
}

export async function updateCategory(id, updates) {
  const cleanUpdates = { ...updates };
  if (cleanUpdates.name !== undefined) cleanUpdates.name = sanitizeString(cleanUpdates.name, 60);
  const { data, error } = await supabase.from('categories').update(cleanUpdates).eq('id', id).select();
  if (error) console.error("Error updating category:", error);
  return data ? data[0] : null;
}

export async function updateMatch(id, updates) {
  const cleanUpdates = { ...updates };
  if (cleanUpdates.p1_name !== undefined) {
    cleanUpdates.p1_name = cleanUpdates.p1_name ? sanitizeString(cleanUpdates.p1_name, 100) : null;
  }
  if (cleanUpdates.p2_name !== undefined) {
    cleanUpdates.p2_name = cleanUpdates.p2_name ? sanitizeString(cleanUpdates.p2_name, 100) : null;
  }
  if (cleanUpdates.winner !== undefined) {
    cleanUpdates.winner = cleanUpdates.winner ? sanitizeString(cleanUpdates.winner, 100) : null;
  }
  if (cleanUpdates.p1_score !== undefined) {
    cleanUpdates.p1_score = cleanUpdates.p1_score ? sanitizeScores(cleanUpdates.p1_score) : null;
  }
  if (cleanUpdates.p2_score !== undefined) {
    cleanUpdates.p2_score = cleanUpdates.p2_score ? sanitizeScores(cleanUpdates.p2_score) : null;
  }
  if (cleanUpdates.match_time !== undefined && cleanUpdates.match_time) {
    // Validar formato de hora HH:MM
    cleanUpdates.match_time = String(cleanUpdates.match_time).trim().slice(0, 8);
  }

  const { data, error } = await supabase.from('matches').update(cleanUpdates).eq('id', id).select();
  if (error) console.error("Error updating match:", error);
  return data ? data[0] : null;
}

export async function updatePlayerPayment(playerId, hasPaid) {
  const { data, error } = await supabase
    .from('players')
    .update({ has_paid: hasPaid })
    .eq('id', playerId)
    .select();
    
  if (error) {
    console.error("Error updating player payment:", error);
    return null;
  }
  return data[0];
}
