-- Cruces fijados a mano por el organizador (2º partido de zona, cuadro, semis y final):
-- la cascada automática no reemplaza las parejas de estos partidos.
alter table matches add column if not exists manual_pairs boolean not null default false;
