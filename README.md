# R.D Eventos - Sistema de Gestión y Fixture

Sistema de software diseñado y desarrollado exclusivamente para la administración, visualización y automatización de torneos de **R.D Eventos**. Este sistema proporciona una plataforma robusta para la gestión de categorías, jugadores, canchas y cruces de partidos, optimizando el tiempo y reduciendo el margen de error en la organización deportiva.

## Características Principales

1. **Gestión Integral de Categorías y Jugadores**
   - Creación y administración de categorías personalizadas.
   - Registro de parejas inscritas y control de pagos.
   - Asignación de cupos y listados de espera automáticos.

2. **Piloto Automático y Generación de Cuadros**
   - Generación algorítmica de sorteos y cruces para todas las fases (grupos, eliminatorias, finales).
   - Estructuración automática de cuadros basada en la cantidad de parejas inscritas.
   - Distribución equitativa y aleatoria para garantizar la integridad deportiva.

3. **Gestor de Horarios Avanzado (Calendario Global)**
   - Asignación inteligente de horarios y canchas para la totalidad de los partidos del torneo.
   - Estimador de viabilidad de horas basado en la cantidad de categorías y canchas habilitadas.
   - Respeto de prioridades horarias, garantizando que las fases finales se disputen en horarios centrales y de mayor afluencia.
   - Prevención de superposiciones y tiempos de descanso obligatorios entre partidos para los jugadores.

4. **Interfaz Pública Optimizada (Mobile First)**
   - Diseño responsivo adaptado para la consulta en tiempo real desde dispositivos móviles.
   - Visualización clara y concisa de resultados, horarios y próximos enfrentamientos por cancha.
   - Identidad visual sobria e institucional de R.D Eventos.

## Requisitos del Sistema

- **Entorno de Ejecución:** Node.js (v18.x o superior)
- **Framework Principal:** Next.js (React)
- **Base de Datos y Autenticación:** Supabase (PostgreSQL & Supabase Auth)
- **Estilos:** Tailwind CSS

## Instrucciones de Despliegue en Vercel

El proyecto está configurado para ser desplegado en la plataforma Vercel de manera directa y optimizada:

1. **Sincronización con GitHub:**
   Asegúrese de que el código fuente esté actualizado en el repositorio principal:
   `https://github.com/thxlopez7/black-padel`

2. **Configuración en Vercel:**
   - Inicie sesión en [Vercel](https://vercel.com).
   - Importe el repositorio y asigne el dominio personalizado `https://www.rdeventos.online`.

3. **Variables de Entorno (Crucial):**
   Durante la configuración del proyecto en Vercel, debe agregar las siguientes variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL` = [URL de su instancia Supabase]
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = [Clave anónima pública de Supabase]

4. **Despliegue (Deploy):**
   Cualquier cambio empujado (push) a la rama `main` en GitHub desencadenará un redespliegue automático en Vercel.

## Consideraciones de Seguridad y Administración

- **Panel de Administración:** El acceso al sistema de gestión está protegido mediante Supabase Auth con Row-Level Security (RLS) en la base de datos. Los administradores se gestionan desde el panel de Supabase (Authentication -> Users).
- **Integridad de Datos:** Las modificaciones de resultados se propagan automáticamente por el cuadro del torneo en tiempo real.

---
*Diseñado y desarrollado para R.D Eventos.*
