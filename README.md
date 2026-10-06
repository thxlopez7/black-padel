# Circuito Black Pádel - Sistema de Gestión y Fixture

Sistema de software diseñado y desarrollado exclusivamente para la administración, visualización y automatización de torneos del **Circuito Black Pádel**. Este sistema proporciona una plataforma robusta para la gestión de categorías, jugadores, canchas y cruces de partidos, optimizando el tiempo y reduciendo el margen de error en la organización deportiva.

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
   - Identidad visual sobria e institucional, reflejando el branding de Black Pádel.

## Requisitos del Sistema

- **Entorno de Ejecución:** Node.js (v18.x o superior)
- **Framework Principal:** Next.js (React)
- **Base de Datos y Autenticación:** Supabase (PostgreSQL)
- **Estilos:** Tailwind CSS

## Instrucciones de Despliegue en Vercel

El proyecto está configurado para ser desplegado en la plataforma Vercel de manera directa y optimizada. Siga los pasos detallados a continuación para llevar el sistema a un entorno de producción:

1. **Sincronización con GitHub:**
   Asegúrese de que el código fuente esté actualizado en el repositorio principal:
   `https://github.com/thxlopez7/black-padel`

2. **Configuración en Vercel:**
   - Inicie sesión en [Vercel](https://vercel.com).
   - Seleccione la opción "Add New Project" y conecte su cuenta de GitHub.
   - Importe el repositorio `black-padel`.

3. **Variables de Entorno (Crucial):**
   Durante la configuración del proyecto en Vercel, debe agregar las siguientes variables de entorno en la sección "Environment Variables". Los valores deben coincidir exactamente con los provistos por su proyecto de Supabase:
   - `NEXT_PUBLIC_SUPABASE_URL` = [URL de su instancia Supabase]
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = [Clave anónima pública de Supabase]
   - `ADMIN_PASSWORD` = [Contraseña segura para el panel de administración]

4. **Despliegue (Deploy):**
   - No es necesario modificar los "Build & Development Settings" ya que Vercel detectará automáticamente que es un proyecto Next.js.
   - Haga clic en el botón "Deploy". Vercel compilará la aplicación y la publicará en una URL segura.

5. **Actualizaciones Posteriores:**
   Cualquier cambio empujado (push) a la rama `main` en GitHub desencadenará un redespliegue automático en Vercel, manteniendo el sistema actualizado sin intervención manual.

## Consideraciones de Seguridad y Administración

- **Panel de Administración:** El acceso al sistema de gestión está protegido mediante autenticación. Se recomienda utilizar contraseñas alfanuméricas complejas en la variable `ADMIN_PASSWORD`.
- **Integridad de Datos:** Cualquier eliminación de categorías o uso del "Piloto Automático" resulta en la purga irreversible de datos de cuadros vigentes. Se recomienda utilizar estas funciones únicamente en las fases de planificación inicial del torneo.

---
*Diseñado y desarrollado para Black Pádel.*
