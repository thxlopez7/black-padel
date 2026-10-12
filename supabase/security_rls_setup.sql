-- ==============================================================================
-- POLÍTICAS DE SEGURIDAD ESENCIALES (ROW LEVEL SECURITY - RLS) PARA SUPABASE
-- Plataforma: R.D Eventos / Torneo de Pádel
-- ==============================================================================
-- 
-- OBJETIVO:
-- 1. Proteger la base de datos contra modificaciones no autorizadas desde la consola
--    del navegador o herramientas externas.
-- 2. Permitir que cualquier visitante (jugador, público general) pueda LEER (SELECT)
--    los cruces, canchas, horarios y categorías sin requerir login ni registro.
-- 3. Exigir autenticación (auth.role() = 'authenticated') para cualquier operación
--    de escritura: INSERT, UPDATE o DELETE (administrador del torneo).
-- ==============================================================================

-- 1. HABILITAR ROW LEVEL SECURITY (RLS) EN TODAS LAS TABLAS DEL TORNEO
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE courts ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- 2. LIMPIAR POLÍTICAS PREVIAS SI EXISTIERAN (Garantiza idempotencia)
DROP POLICY IF EXISTS "Permitir lectura publica de categorias" ON categories;
DROP POLICY IF EXISTS "Permitir modificacion a administradores en categorias" ON categories;

DROP POLICY IF EXISTS "Permitir lectura publica de canchas" ON courts;
DROP POLICY IF EXISTS "Permitir modificacion a administradores en canchas" ON courts;

DROP POLICY IF EXISTS "Permitir lectura publica de jugadores" ON players;
DROP POLICY IF EXISTS "Permitir modificacion a administradores en jugadores" ON players;

DROP POLICY IF EXISTS "Permitir lectura publica de partidos" ON matches;
DROP POLICY IF EXISTS "Permitir modificacion a administradores en partidos" ON matches;

-- 3. POLÍTICAS DE LECTURA PÚBLICA (SELECT: abierta para todos)
-- Permite que los jugadores y público consulten el fixture, resultados y turnos libremente
CREATE POLICY "Permitir lectura publica de categorias"
ON categories FOR SELECT
USING (true);

CREATE POLICY "Permitir lectura publica de canchas"
ON courts FOR SELECT
USING (true);

CREATE POLICY "Permitir lectura publica de jugadores"
ON players FOR SELECT
USING (true);

CREATE POLICY "Permitir lectura publica de partidos"
ON matches FOR SELECT
USING (true);

-- 4. POLÍTICAS DE ESCRITURA EXCLUSIVAS PARA ADMINISTRADOR (INSERT, UPDATE, DELETE)
-- Solo se ejecutan con éxito si la sesión tiene rol 'authenticated' (Login admin exitoso)
CREATE POLICY "Permitir modificacion a administradores en categorias"
ON categories FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Permitir modificacion a administradores en canchas"
ON courts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Permitir modificacion a administradores en jugadores"
ON players FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Permitir modificacion a administradores en partidos"
ON matches FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
