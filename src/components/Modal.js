"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Modales abiertos a la vez: el fondo se libera recién cuando se cierra el último
let openCount = 0;
let savedScrollY = 0;

function lockBody() {
  if (openCount++ > 0) return;
  // position: fixed congela el fondo también en iOS, donde overflow: hidden no alcanza
  savedScrollY = window.scrollY;
  Object.assign(document.body.style, { position: "fixed", top: `-${savedScrollY}px`, left: "0", right: "0", width: "100%" });
}

function unlockBody() {
  if (--openCount > 0) return;
  Object.assign(document.body.style, { position: "", top: "", left: "", right: "", width: "" });
  window.scrollTo(0, savedScrollY);
}

/**
 * Ventana modal: bloquea el fondo, el contenido largo se desplaza dentro de la tarjeta
 * y cierra con Escape o tocando afuera. Portal a <body>: los contenedores animados (transform)
 * rompen el posicionamiento fixed.
 */
export default function Modal({ title, onClose, children, zIndex = "z-[100]" }) {
  // onClose suele ser una función nueva en cada render: se guarda en una ref para no volver a bloquear el fondo
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);
  useEffect(() => {
    lockBody();
    const onKey = (e) => { if (e.key === "Escape") closeRef.current?.(); };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockBody();
    };
  }, []);

  return createPortal(
    <div
      className={`fixed inset-0 ${zIndex} bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overscroll-contain`}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md max-h-[calc(100dvh-2rem)] flex flex-col overflow-hidden shadow-2xl animate-fade-up">
        <div className="flex justify-between items-center gap-3 px-6 py-4 border-b border-gray-800 bg-gray-950 shrink-0">
          <h3 className="text-lg font-bold text-red-500 uppercase tracking-wider min-w-0 flex items-center gap-2">{title}</h3>
          {onClose && (
            <button type="button" onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1 -m-1" aria-label="Cerrar">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="overflow-y-auto overscroll-contain custom-scrollbar">{children}</div>
      </div>
    </div>,
    document.body
  );
}
