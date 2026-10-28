import { supabase } from './supabase';

// Todas las operaciones de escritura devuelven el registro guardado (o true)
// y null/false si la base de datos rechaza la operación, para que la UI informe el error.

function logError(context, error) {
  console.error(`[supabase] ${context}:`, error?.message || error);
}

async function insertOne(table, row, context) {
  const { data, error } = await supabase.from(table).insert([row]).select();
  if (error || !data?.length) {
    logError(context, error);
    return null;
  }
  return data[0];
}

async function updateOne(table, id, updates, context) {
  const { data, error } = await supabase.from(table).update(updates).eq('id', id).select();
  if (error || !data?.length) {
    logError(context, error || 'sin filas actualizadas (revisar permisos RLS)');
    return null;
  }
  return data[0];
}

async function deleteWhere(table, column, value, context) {
  const { error } = await supabase.from(table).delete().eq(column, value);
  if (error) {
    logError(context, error);
    return false;
  }
  return true;
}

async function selectAll(query, context) {
  const { data, error } = await query;
  if (error) logError(context, error);
  return data || [];
}

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

// --- Categorías ---
export const getCategories = () =>
  selectAll(supabase.from('categories').select('*').order('created_at', { ascending: true }), 'getCategories');

export const addCategory = (name, numPairs = 6) =>
  insertOne('categories', { name, num_pairs: numPairs }, 'addCategory');

export const updateCategory = (id, updates) => updateOne('categories', id, updates, 'updateCategory');

export async function deleteCategory(id) {
  // Se borran primero partidos y jugadores por si la base no tiene ON DELETE CASCADE
  if (!(await deleteWhere('matches', 'category_id', id, 'deleteCategory/matches'))) return false;
  if (!(await deleteWhere('players', 'category_id', id, 'deleteCategory/players'))) return false;
  return deleteWhere('categories', 'id', id, 'deleteCategory');
}

// --- Canchas ---
export const getCourts = () =>
  selectAll(supabase.from('courts').select('*').order('created_at', { ascending: true }), 'getCourts');

export const addCourt = (name) => insertOne('courts', { name }, 'addCourt');

export const deleteCourt = (id) => deleteWhere('courts', 'id', id, 'deleteCourt');

// --- Jugadores ---
export const getPlayers = () =>
  selectAll(supabase.from('players').select('*, categories(name)').order('created_at', { ascending: true }), 'getPlayers');

export const addPlayer = (playerData) => insertOne('players', playerData, 'addPlayer');

export const updatePlayer = (id, playerData) => updateOne('players', id, playerData, 'updatePlayer');

export const deletePlayer = (id) => deleteWhere('players', 'id', id, 'deletePlayer');

export const updatePlayerPayment = (playerId, hasPaid) =>
  updateOne('players', playerId, { has_paid: hasPaid }, 'updatePlayerPayment');

// --- Partidos ---
export const getMatches = () =>
  selectAll(
    supabase.from('matches').select('*').order('match_date', { ascending: true }).order('match_time', { ascending: true }),
    'getMatches'
  );

export async function saveGeneratedMatches(matchesArray) {
  const { data, error } = await supabase.from('matches').insert(matchesArray).select();
  if (error || !data) {
    logError('saveGeneratedMatches', error);
    return null;
  }
  return data;
}

export const deleteMatchesByCategory = (categoryId) =>
  deleteWhere('matches', 'category_id', categoryId, 'deleteMatchesByCategory');

export const updateMatch = (id, updates) => updateOne('matches', id, updates, 'updateMatch');
