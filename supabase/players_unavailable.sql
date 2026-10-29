-- Franjas en las que una pareja no puede jugar: [{ "date": "AAAA-MM-DD", "from": "HH:MM", "to": "HH:MM" }].
-- "to" 00:00 termina a la medianoche (00:00 a 00:00 es el día completo). El gestor de horarios no programa
-- a la pareja en esas franjas y el editor de partidos avisa si se la pone ahí a mano.
alter table players add column if not exists unavailable jsonb not null default '[]'::jsonb;
