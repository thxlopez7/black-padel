(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/AdminLogin.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminLogin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseService.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AdminLogin({ onLoginSuccess, onCancel }) {
    _s();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [errorMsg, setErrorMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginAdmin"])(email, password);
            onLoginSuccess();
        } catch (err) {
            setErrorMsg("Credenciales inválidas. Verifica tu correo y contraseña.");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-up",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 border-b border-gray-800 flex justify-between items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold text-white flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5 text-red-500",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2",
                                        d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminLogin.js",
                                        lineNumber: 31,
                                        columnNumber: 105
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminLogin.js",
                                    lineNumber: 31,
                                    columnNumber: 13
                                }, this),
                                "Acceso Administrador"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminLogin.js",
                            lineNumber: 30,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onCancel,
                            className: "text-gray-500 hover:text-white transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: "2",
                                    d: "M6 18L18 6M6 6l12 12"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminLogin.js",
                                    lineNumber: 35,
                                    columnNumber: 92
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminLogin.js",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdminLogin.js",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AdminLogin.js",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "p-6 space-y-4",
                    children: [
                        errorMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded text-sm text-center",
                            children: errorMsg
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdminLogin.js",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-gray-400 text-xs uppercase tracking-widest mb-1.5 font-bold",
                                    children: "Correo Electrónico"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminLogin.js",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    value: email,
                                    onChange: (e)=>setEmail(e.target.value),
                                    className: "w-full bg-gray-950 border border-gray-800 rounded p-3 text-white outline-none focus:border-red-600 transition-colors",
                                    placeholder: "admin@copaprimavera.com",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminLogin.js",
                                    lineNumber: 48,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminLogin.js",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-gray-400 text-xs uppercase tracking-widest mb-1.5 font-bold",
                                    children: "Contraseña"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminLogin.js",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    value: password,
                                    onChange: (e)=>setPassword(e.target.value),
                                    className: "w-full bg-gray-950 border border-gray-800 rounded p-3 text-white outline-none focus:border-red-600 transition-colors",
                                    placeholder: "••••••••",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminLogin.js",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminLogin.js",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: loading,
                            className: "w-full bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg mt-4 uppercase tracking-widest transition-colors flex justify-center items-center gap-2",
                            children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "animate-spin h-5 w-5 text-white",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        className: "opacity-25",
                                        cx: "12",
                                        cy: "12",
                                        r: "10",
                                        stroke: "currentColor",
                                        strokeWidth: "4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminLogin.js",
                                        lineNumber: 75,
                                        columnNumber: 96
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        className: "opacity-75",
                                        fill: "currentColor",
                                        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminLogin.js",
                                        lineNumber: 75,
                                        columnNumber: 197
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminLogin.js",
                                lineNumber: 75,
                                columnNumber: 15
                            }, this) : "Ingresar"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdminLogin.js",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AdminLogin.js",
                    lineNumber: 39,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AdminLogin.js",
            lineNumber: 28,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/AdminLogin.js",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s(AdminLogin, "SPBS/8DUMvU939c5M+BN99rtCeU=");
_c = AdminLogin;
var _c;
__turbopack_context__.k.register(_c, "AdminLogin");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AdminPayments.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminPayments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseService.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AdminPayments({ players, categories, onBack, onPlayersUpdate, showToast }) {
    _s();
    const [selectedCatId, setSelectedCatId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const handleTogglePayment = async (player)=>{
        const newStatus = !player.has_paid;
        const updatedPlayer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePlayerPayment"])(player.id, newStatus);
        if (updatedPlayer) {
            onPlayersUpdate(updatedPlayer, "update");
        } else {
            showToast("Aviso: Debes crear la columna 'has_paid' BOOLEAN en la tabla 'players' en Supabase para guardar pagos permanentemente.");
            // Actualizamos localmente para que puedan seguir probando
            onPlayersUpdate({
                ...player,
                has_paid: newStatus
            }, "update");
        }
    };
    const filteredPlayers = selectedCatId === "all" ? players : players.filter((p)=>p.category_id === selectedCatId);
    const paidCount = filteredPlayers.filter((p)=>p.has_paid).length;
    const totalCount = filteredPlayers.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate-fade-up max-w-6xl mx-auto w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-6 border-b border-gray-800 pb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onBack,
                            className: "text-gray-400 hover:text-white text-xs flex items-center gap-2 transition-colors bg-gray-900 py-2 px-4 rounded border border-gray-800 uppercase tracking-widest font-semibold",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2",
                                        d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPayments.js",
                                        lineNumber: 33,
                                        columnNumber: 92
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminPayments.js",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, this),
                                "Volver"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminPayments.js",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-light text-white",
                            children: [
                                "Control de ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold text-gray-300",
                                    children: "Pagos e Inscripciones"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminPayments.js",
                                    lineNumber: 36,
                                    columnNumber: 69
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminPayments.js",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AdminPayments.js",
                    lineNumber: 31,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AdminPayments.js",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-4 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-1 flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-2",
                                children: "Seleccionar Categoría"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminPayments.js",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedCatId("all"),
                                className: `text-left px-4 py-3 rounded-xl border transition-all text-sm font-semibold ${selectedCatId === "all" ? 'bg-white/10 border-white/50 text-gray-300 shadow-md' : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800'}`,
                                children: "Vista General"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminPayments.js",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            categories.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedCatId(c.id),
                                    className: `text-left px-4 py-3 rounded-xl border transition-all text-sm font-semibold flex justify-between items-center ${selectedCatId === c.id ? 'bg-white/10 border-white/50 text-gray-300 shadow-md' : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800'}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate",
                                        children: c.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPayments.js",
                                        lineNumber: 57,
                                        columnNumber: 15
                                    }, this)
                                }, c.id, false, {
                                    fileName: "[project]/src/components/AdminPayments.js",
                                    lineNumber: 52,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminPayments.js",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-3 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col h-fit",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-6 border-b border-gray-800 pb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-bold text-white",
                                                children: selectedCatId === "all" ? "Todos los inscriptos" : categories.find((c)=>c.id === selectedCatId)?.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPayments.js",
                                                lineNumber: 66,
                                                columnNumber: 16
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-400 mt-1 uppercase tracking-widest",
                                                children: "Aprobación de estado de cuenta"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPayments.js",
                                                lineNumber: 69,
                                                columnNumber: 16
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPayments.js",
                                        lineNumber: 65,
                                        columnNumber: 14
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4 bg-gray-950 border border-gray-800 px-4 py-2 rounded-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] text-gray-500 uppercase tracking-widest font-bold",
                                                        children: "Total Inscriptos"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPayments.js",
                                                        lineNumber: 74,
                                                        columnNumber: 20
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-lg font-bold text-white",
                                                        children: totalCount
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPayments.js",
                                                        lineNumber: 75,
                                                        columnNumber: 20
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPayments.js",
                                                lineNumber: 73,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-px h-8 bg-gray-800"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPayments.js",
                                                lineNumber: 77,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] text-white uppercase tracking-widest font-bold",
                                                        children: "Abonaron"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPayments.js",
                                                        lineNumber: 79,
                                                        columnNumber: 20
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-lg font-bold text-gray-300",
                                                        children: paidCount
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPayments.js",
                                                        lineNumber: 80,
                                                        columnNumber: 20
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPayments.js",
                                                lineNumber: 78,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPayments.js",
                                        lineNumber: 72,
                                        columnNumber: 14
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPayments.js",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3 overflow-y-auto max-h-[600px] custom-scrollbar pr-2",
                                children: filteredPlayers.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-gray-500 italic p-4 text-center border border-dashed border-gray-800 rounded-lg",
                                    children: "No hay jugadores para mostrar."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminPayments.js",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this) : filteredPlayers.map((p)=>{
                                    const catName = categories.find((c)=>c.id === p.category_id)?.name || p.categories?.name || 'Sin categoría';
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-950 p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4 w-full sm:w-auto overflow-hidden",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `shrink-0 w-10 h-10 rounded-full border flex items-center justify-center text-sm font-bold uppercase transition-colors ${p.has_paid ? 'bg-white/10 border-white/30 text-gray-300' : 'bg-gray-800 border-gray-700 text-gray-500'}`,
                                                        children: p.name.charAt(0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPayments.js",
                                                        lineNumber: 94,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm font-bold text-white break-words",
                                                                children: [
                                                                    p.name,
                                                                    " ",
                                                                    p.partner ? `& ${p.partner}` : ''
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/AdminPayments.js",
                                                                lineNumber: 98,
                                                                columnNumber: 25
                                                            }, this),
                                                            selectedCatId === "all" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-[10px] text-gray-500 uppercase tracking-widest mt-0.5 truncate",
                                                                children: catName
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AdminPayments.js",
                                                                lineNumber: 99,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AdminPayments.js",
                                                        lineNumber: 97,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPayments.js",
                                                lineNumber: 93,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-end w-full sm:w-auto gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `shrink-0 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${p.has_paid ? 'bg-white/10 text-gray-300 border-white/20' : 'bg-gray-800 text-gray-400 border-gray-700'}`,
                                                        children: p.has_paid ? 'Abonado' : 'Pendiente'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPayments.js",
                                                        lineNumber: 104,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleTogglePayment(p),
                                                        className: `shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${p.has_paid ? 'bg-white' : 'bg-gray-700'}`,
                                                        title: p.has_paid ? "Marcar como impago" : "Marcar como pagado",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${p.has_paid ? 'translate-x-6' : 'translate-x-1'}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminPayments.js",
                                                            lineNumber: 112,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPayments.js",
                                                        lineNumber: 107,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPayments.js",
                                                lineNumber: 103,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, p.id, true, {
                                        fileName: "[project]/src/components/AdminPayments.js",
                                        lineNumber: 92,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminPayments.js",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminPayments.js",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdminPayments.js",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AdminPayments.js",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(AdminPayments, "Ivqr4FvnvAA4A2fSJse7D9kgCIw=");
_c = AdminPayments;
var _c;
__turbopack_context__.k.register(_c, "AdminPayments");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AdminPlayers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminPlayers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseService.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AdminPlayers({ players, categories, onBack, onPlayersUpdate, showToast }) {
    _s();
    const [selectedCatId, setSelectedCatId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [name1, setName1] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [name2, setName2] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [categoryId, setCategoryId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleSavePlayer = async ()=>{
        if (!name1) {
            showToast("Debes ingresar al menos el nombre del Jugador 1");
            return;
        }
        const targetCat = categoryId || (selectedCatId !== "all" ? selectedCatId : null);
        const playerData = {
            name: name1,
            partner: name2 || null,
            category_id: targetCat
        };
        if (editingId) {
            const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePlayer"])(editingId, playerData);
            if (updated) {
                onPlayersUpdate(updated, "update");
                setEditingId(null);
                setName1("");
                setName2("");
                setCategoryId("");
                showToast("Jugador actualizado");
            } else {
                showToast("Error al actualizar");
            }
        } else {
            const added = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addPlayer"])(playerData);
            if (added) {
                onPlayersUpdate(added, "add");
                setName1("");
                setName2("");
                setCategoryId("");
                showToast("Jugador registrado con éxito");
            } else {
                showToast("Error al registrar el jugador");
            }
        }
    };
    const handleEditClick = (p)=>{
        setEditingId(p.id);
        setName1(p.name);
        setName2(p.partner || "");
        setCategoryId(p.category_id || "");
    };
    const handleDeletePlayer = async (id)=>{
        if (confirm("¿Seguro que quieres eliminar este jugador?")) {
            const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deletePlayer"])(id);
            if (success) {
                onPlayersUpdate({
                    id
                }, "delete");
                showToast("Jugador eliminado");
            } else {
                showToast("Error al eliminar el jugador");
            }
        }
    };
    const filteredPlayers = selectedCatId === "all" ? players : players.filter((p)=>p.category_id === selectedCatId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate-fade-up max-w-6xl mx-auto w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-6 border-b border-gray-800 pb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onBack,
                            className: "text-gray-400 hover:text-white text-xs flex items-center gap-2 transition-colors bg-gray-900 py-2 px-4 rounded border border-gray-800 uppercase tracking-widest font-semibold",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2",
                                        d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPlayers.js",
                                        lineNumber: 81,
                                        columnNumber: 92
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminPlayers.js",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this),
                                "Volver"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminPlayers.js",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-light text-white",
                            children: [
                                "Directorio de ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold text-red-500",
                                    children: "Jugadores"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminPlayers.js",
                                    lineNumber: 84,
                                    columnNumber: 72
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminPlayers.js",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AdminPlayers.js",
                    lineNumber: 79,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AdminPlayers.js",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-4 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-1 flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-2",
                                children: "Filtrar por Categoría"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminPlayers.js",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedCatId("all"),
                                className: `text-left px-4 py-3 rounded-xl border transition-all text-sm font-semibold ${selectedCatId === "all" ? 'bg-red-600/10 border-red-600/50 text-red-500 shadow-md' : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800'}`,
                                children: "Todos los Jugadores"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminPlayers.js",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            categories.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedCatId(c.id),
                                    className: `text-left px-4 py-3 rounded-xl border transition-all text-sm font-semibold flex justify-between items-center ${selectedCatId === c.id ? 'bg-red-600/10 border-red-600/50 text-red-500 shadow-md' : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "truncate",
                                            children: c.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPlayers.js",
                                            lineNumber: 105,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-[10px] px-2 py-0.5 rounded-full ${selectedCatId === c.id ? 'bg-red-600/20 text-cyan-300' : 'bg-gray-800'}`,
                                            children: players.filter((p)=>p.category_id === c.id).length
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPlayers.js",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, c.id, true, {
                                    fileName: "[project]/src/components/AdminPlayers.js",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminPlayers.js",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-3 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col h-fit",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-950 border border-gray-800 rounded-xl p-5 mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-bold text-white mb-4 uppercase tracking-widest flex justify-between items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: editingId ? 'Editando Jugador' : 'Agregar Nuevo Jugador'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPlayers.js",
                                                lineNumber: 119,
                                                columnNumber: 16
                                            }, this),
                                            editingId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setEditingId(null);
                                                    setName1('');
                                                    setName2('');
                                                    setCategoryId('');
                                                },
                                                className: "text-xs text-red-400 hover:underline",
                                                children: "Cancelar Edición"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPlayers.js",
                                                lineNumber: 120,
                                                columnNumber: 30
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPlayers.js",
                                        lineNumber: 118,
                                        columnNumber: 14
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-3 gap-4 items-end",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-[10px] text-gray-500 uppercase tracking-widest mb-1.5 font-medium",
                                                        children: "Nombre Jugador 1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPlayers.js",
                                                        lineNumber: 124,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: name1,
                                                        onChange: (e)=>setName1(e.target.value),
                                                        className: "w-full bg-black border border-gray-800 rounded p-2.5 text-sm text-white outline-none focus:border-red-600 transition-colors",
                                                        placeholder: "Ej: Juan Perez"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPlayers.js",
                                                        lineNumber: 125,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPlayers.js",
                                                lineNumber: 123,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-[10px] text-gray-500 uppercase tracking-widest mb-1.5 font-medium",
                                                        children: "Nombre Jugador 2 (Opcional)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPlayers.js",
                                                        lineNumber: 128,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: name2,
                                                        onChange: (e)=>setName2(e.target.value),
                                                        className: "w-full bg-black border border-gray-800 rounded p-2.5 text-sm text-white outline-none focus:border-red-600 transition-colors",
                                                        placeholder: "Ej: Carlos Gomez"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPlayers.js",
                                                        lineNumber: 129,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPlayers.js",
                                                lineNumber: 127,
                                                columnNumber: 17
                                            }, this),
                                            selectedCatId === "all" && !editingId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-[10px] text-gray-500 uppercase tracking-widest mb-1.5 font-medium",
                                                        children: "Categoría"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPlayers.js",
                                                        lineNumber: 133,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: categoryId,
                                                        onChange: (e)=>setCategoryId(e.target.value),
                                                        className: "w-full bg-black border border-gray-800 rounded p-2.5 text-sm text-white outline-none focus:border-red-600 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                children: "Seleccionar Categoría"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AdminPlayers.js",
                                                                lineNumber: 135,
                                                                columnNumber: 23
                                                            }, this),
                                                            categories.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: c.id,
                                                                    children: c.name
                                                                }, c.id, false, {
                                                                    fileName: "[project]/src/components/AdminPlayers.js",
                                                                    lineNumber: 136,
                                                                    columnNumber: 44
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AdminPlayers.js",
                                                        lineNumber: 134,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPlayers.js",
                                                lineNumber: 132,
                                                columnNumber: 19
                                            }, this) : editingId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-[10px] text-gray-500 uppercase tracking-widest mb-1.5 font-medium",
                                                        children: "Categoría"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPlayers.js",
                                                        lineNumber: 141,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: categoryId,
                                                        onChange: (e)=>setCategoryId(e.target.value),
                                                        className: "w-full bg-black border border-gray-800 rounded p-2.5 text-sm text-white outline-none focus:border-red-600 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                children: "Sin Categoría"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AdminPlayers.js",
                                                                lineNumber: 143,
                                                                columnNumber: 23
                                                            }, this),
                                                            categories.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: c.id,
                                                                    children: c.name
                                                                }, c.id, false, {
                                                                    fileName: "[project]/src/components/AdminPlayers.js",
                                                                    lineNumber: 144,
                                                                    columnNumber: 44
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AdminPlayers.js",
                                                        lineNumber: 142,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPlayers.js",
                                                lineNumber: 140,
                                                columnNumber: 19
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleSavePlayer,
                                                className: `w-full ${editingId ? 'bg-white text-gray-900 hover:bg-gray-300' : 'bg-red-600 text-gray-900 hover:bg-red-500'} font-bold py-2.5 rounded text-xs uppercase tracking-widest transition-all shadow-md md:col-span-full mt-2`,
                                                children: editingId ? 'Guardar Cambios' : `Agregar a ${selectedCatId === "all" ? 'Categoría Seleccionada' : categories.find((c)=>c.id === selectedCatId)?.name}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPlayers.js",
                                                lineNumber: 149,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPlayers.js",
                                        lineNumber: 122,
                                        columnNumber: 14
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPlayers.js",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-bold text-white mb-4 uppercase tracking-widest border-b border-gray-800 pb-2",
                                        children: [
                                            "Mostrando: ",
                                            selectedCatId === "all" ? "Todos los inscriptos" : categories.find((c)=>c.id === selectedCatId)?.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPlayers.js",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 overflow-y-auto max-h-[500px] custom-scrollbar pr-2",
                                        children: filteredPlayers.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-500 italic p-4 text-center border border-dashed border-gray-800 rounded-lg",
                                            children: "No hay jugadores en esta vista."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPlayers.js",
                                            lineNumber: 163,
                                            columnNumber: 17
                                        }, this) : filteredPlayers.map((p)=>{
                                            const catName = categories.find((c)=>c.id === p.category_id)?.name || p.categories?.name || 'Sin categoría';
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-950 p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors group gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-4 w-full sm:w-auto overflow-hidden",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "shrink-0 w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-red-500 font-bold text-sm uppercase",
                                                                children: p.name.charAt(0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AdminPlayers.js",
                                                                lineNumber: 170,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-white font-bold break-words",
                                                                        children: [
                                                                            p.name,
                                                                            " ",
                                                                            p.partner ? `& ${p.partner}` : ''
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/AdminPlayers.js",
                                                                        lineNumber: 174,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    selectedCatId === "all" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-[10px] text-red-500 uppercase tracking-widest mt-0.5 truncate",
                                                                        children: catName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/AdminPlayers.js",
                                                                        lineNumber: 175,
                                                                        columnNumber: 55
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/AdminPlayers.js",
                                                                lineNumber: 173,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AdminPlayers.js",
                                                        lineNumber: 169,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2 w-full sm:w-auto justify-end opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleEditClick(p),
                                                                className: "shrink-0 text-gray-400 hover:text-gray-300 bg-gray-900 p-2 rounded-lg border border-gray-800 hover:border-white/50 transition-colors",
                                                                title: "Editar Jugador",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "w-4 h-4",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    viewBox: "0 0 24 24",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: "2",
                                                                        d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/AdminPlayers.js",
                                                                        lineNumber: 180,
                                                                        columnNumber: 106
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminPlayers.js",
                                                                    lineNumber: 180,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AdminPlayers.js",
                                                                lineNumber: 179,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleDeletePlayer(p.id),
                                                                className: "shrink-0 text-gray-400 hover:text-red-400 bg-gray-900 p-2 rounded-lg border border-gray-800 hover:border-red-500/50 transition-colors",
                                                                title: "Eliminar Jugador",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "w-4 h-4",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    viewBox: "0 0 24 24",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: "2",
                                                                        d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/AdminPlayers.js",
                                                                        lineNumber: 183,
                                                                        columnNumber: 106
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminPlayers.js",
                                                                    lineNumber: 183,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AdminPlayers.js",
                                                                lineNumber: 182,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AdminPlayers.js",
                                                        lineNumber: 178,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, p.id, true, {
                                                fileName: "[project]/src/components/AdminPlayers.js",
                                                lineNumber: 168,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPlayers.js",
                                        lineNumber: 161,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPlayers.js",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminPlayers.js",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdminPlayers.js",
                lineNumber: 88,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AdminPlayers.js",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_s(AdminPlayers, "0iytffRuQLahIg/tAAa92qWjOkM=");
_c = AdminPlayers;
var _c;
__turbopack_context__.k.register(_c, "AdminPlayers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/BracketView.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BracketView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseService.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
function BracketView({ category, allMatches, courts, mode, onBack, onMatchUpdate }) {
    _s();
    const [editingMatch, setEditingMatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Filtrar partidos de esta categoría
    const matches = allMatches.filter((m)=>m.category_id === category.id);
    // Agrupar
    const zones = matches.filter((m)=>m.match_type === 'ZONE').sort((a, b)=>a.match_index - b.match_index);
    const bracketMatches = matches.filter((m)=>m.match_type === 'BRACKET');
    // Agrupar bracket por rondas
    const bracketByRound = [];
    let maxRound = 0;
    bracketMatches.forEach((m)=>{
        if (m.round_index > maxRound) maxRound = m.round_index;
    });
    for(let i = 1; i <= maxRound; i++){
        bracketByRound.push(bracketMatches.filter((m)=>m.round_index === i).sort((a, b)=>a.match_index - b.match_index));
    }
    const MatchCard = ({ match })=>{
        const isByeMatch = match.is_bye;
        const p1Score = match.p1_score || [
            '',
            '',
            ''
        ];
        const p2Score = match.p2_score || [
            '',
            '',
            ''
        ];
        const isWOP1 = match.is_wo && match.winner === match.p1_name;
        const isWOP2 = match.is_wo && match.winner === match.p2_name;
        const p1IsWinner = match.winner && match.winner === match.p1_name;
        const p2IsWinner = match.winner && match.winner === match.p2_name;
        const hasWinner = match.winner && match.winner !== 'null';
        const p1Classes = `grid grid-cols-[1fr_28px_28px_28px] items-center h-[42px] transition-all relative ${p1IsWinner ? 'bg-red-950/20' : hasWinner ? 'opacity-40' : 'bg-gray-900'}`;
        const p2Classes = `grid grid-cols-[1fr_28px_28px_28px] items-center h-[42px] transition-all relative ${p2IsWinner ? 'bg-red-950/20' : hasWinner ? 'opacity-40' : 'bg-gray-900'}`;
        const scoreBoxClass = (isWinner, hasWinner)=>`border-l border-gray-800 text-center text-[0.8rem] flex items-center justify-center h-full transition-colors ${isWinner ? 'bg-red-600/20 text-red-500 font-black shadow-[inset_0_0_8px_rgba(0,242,254,0.2)]' : hasWinner ? 'bg-gray-900/50 text-gray-500 font-medium' : 'bg-gray-800 text-gray-200 font-semibold'}`;
        const courtName = courts.find((c)=>c.id === match.court_id)?.name || 'Sin Asignar';
        const dateStr = match.match_date ? `${match.match_date.split('-').reverse().join('/')} ${match.match_time || ''}` : 'Fecha a definir';
        const isEditable = mode === 'admin' && match.p1_name && match.p2_name && !isByeMatch;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `bg-gray-950 border ${hasWinner ? 'border-gray-700' : 'border-gray-800'} rounded-lg my-4 relative z-10 overflow-hidden ${isEditable ? 'cursor-pointer hover:border-red-600 hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all transform hover:-translate-y-1 duration-300 group' : ''} ${isByeMatch ? 'opacity-50 grayscale hover:opacity-75 transition-opacity' : ''}`,
            onClick: ()=>isEditable && setEditingMatch(match),
            children: [
                hasWinner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent pointer-events-none"
                }, void 0, false, {
                    fileName: "[project]/src/components/BracketView.js",
                    lineNumber: 70,
                    columnNumber: 23
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `text-[0.65rem] font-black tracking-widest uppercase px-4 py-1.5 flex justify-between items-center transition-colors ${hasWinner ? 'bg-gray-800 text-red-500 border-b border-gray-700' : 'bg-red-700 text-white border-b border-cyan-700'}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex items-center gap-1.5",
                            children: [
                                hasWinner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-3 h-3 text-red-500",
                                    fill: "currentColor",
                                    viewBox: "0 0 20 20",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fillRule: "evenodd",
                                        d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                        clipRule: "evenodd"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/BracketView.js",
                                        lineNumber: 76,
                                        columnNumber: 105
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BracketView.js",
                                    lineNumber: 76,
                                    columnNumber: 27
                                }, this),
                                match.round_name
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this),
                        isEditable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-cyan-200",
                            children: "Editar"
                        }, void 0, false, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 79,
                            columnNumber: 26
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/BracketView.js",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: p1Classes,
                    children: [
                        p1IsWinner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-0 top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_8px_rgba(0,242,254,0.8)]"
                        }, void 0, false, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 83,
                            columnNumber: 26
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `text-[0.75rem] px-4 truncate flex items-center h-full ${p1IsWinner ? 'text-white font-bold' : !match.p1_name ? 'text-gray-500 italic' : 'text-gray-300'}`,
                            children: match.p1_name || 'Esperando...'
                        }, void 0, false, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: scoreBoxClass(p1IsWinner, hasWinner),
                            children: isWOP1 ? 'W' : p1Score[0]
                        }, void 0, false, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: scoreBoxClass(p1IsWinner, hasWinner),
                            children: isWOP1 ? 'O' : p1Score[1]
                        }, void 0, false, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 88,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: scoreBoxClass(p1IsWinner, hasWinner),
                            children: p1Score[2]
                        }, void 0, false, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/BracketView.js",
                    lineNumber: 82,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-[1px] w-full bg-gray-800/50"
                }, void 0, false, {
                    fileName: "[project]/src/components/BracketView.js",
                    lineNumber: 92,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: p2Classes,
                    children: [
                        p2IsWinner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-0 top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_8px_rgba(0,242,254,0.8)]"
                        }, void 0, false, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 95,
                            columnNumber: 26
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `text-[0.75rem] px-4 truncate flex items-center h-full ${p2IsWinner ? 'text-white font-bold' : !match.p2_name ? 'text-gray-500 italic' : 'text-gray-300'}`,
                            children: match.p2_name || 'Esperando...'
                        }, void 0, false, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: scoreBoxClass(p2IsWinner, hasWinner),
                            children: isWOP2 ? 'W' : p2Score[0]
                        }, void 0, false, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: scoreBoxClass(p2IsWinner, hasWinner),
                            children: isWOP2 ? 'O' : p2Score[1]
                        }, void 0, false, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: scoreBoxClass(p2IsWinner, hasWinner),
                            children: p2Score[2]
                        }, void 0, false, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/BracketView.js",
                    lineNumber: 94,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center text-[0.65rem] text-gray-500 font-medium px-4 py-2 bg-gray-900 border-t border-gray-800",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex items-center gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-3 h-3",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2",
                                        d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/BracketView.js",
                                        lineNumber: 106,
                                        columnNumber: 92
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BracketView.js",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this),
                                dateStr
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex items-center gap-1.5 truncate max-w-[50%]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-3 h-3",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: "2",
                                            d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 110,
                                            columnNumber: 92
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: "2",
                                            d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 110,
                                            columnNumber: 253
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BracketView.js",
                                    lineNumber: 110,
                                    columnNumber: 13
                                }, this),
                                courtName
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/BracketView.js",
                    lineNumber: 104,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BracketView.js",
            lineNumber: 63,
            columnNumber: 7
        }, this);
    };
    const renderChampion = ()=>{
        const finalRound = bracketByRound[bracketByRound.length - 1];
        if (finalRound && finalRound.length > 0) {
            const finalMatch = finalRound[0];
            if (finalMatch.winner && finalMatch.winner !== 'BYE') {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute right-0 top-1/2 transform translate-x-[105%] -translate-y-1/2 text-center animate-fade-up z-50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-[10px] text-yellow-500 font-bold uppercase tracking-widest mb-1 drop-shadow-md",
                            children: "Campeones"
                        }, void 0, false, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 125,
                            columnNumber: 14
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border border-yellow-500/50 bg-gray-900 text-white font-black py-3 px-6 rounded-lg inline-block text-sm shadow-[0_0_20px_rgba(234,179,8,0.2)]",
                            children: finalMatch.winner
                        }, void 0, false, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 126,
                            columnNumber: 14
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/BracketView.js",
                    lineNumber: 124,
                    columnNumber: 11
                }, this);
            }
        }
        return null;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-4 flex-shrink-0 border-b border-gray-800 pb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "text-gray-400 hover:text-white text-xs flex items-center gap-1 transition-colors bg-gray-900 py-1.5 px-3 rounded border border-gray-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-3 h-3",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: "2",
                                    d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BracketView.js",
                                    lineNumber: 141,
                                    columnNumber: 90
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/BracketView.js",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            "Volver"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/BracketView.js",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-red-500 font-bold uppercase tracking-widest text-sm",
                        children: category.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/BracketView.js",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BracketView.js",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-900/60 border border-gray-800 rounded-xl flex-grow relative shadow-2xl overflow-x-auto custom-scrollbar",
                style: {
                    minHeight: 'calc(100vh - 180px)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-12 p-8 items-center min-w-max",
                    children: [
                        zones.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col justify-center gap-6 relative min-w-[280px]",
                            children: zones.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MatchCard, {
                                    match: m
                                }, m.id, false, {
                                    fileName: "[project]/src/components/BracketView.js",
                                    lineNumber: 153,
                                    columnNumber: 31
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 152,
                            columnNumber: 13
                        }, this),
                        bracketByRound.map((round, rIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col justify-center gap-6 relative min-w-[280px]",
                                children: [
                                    round.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MatchCard, {
                                            match: m
                                        }, m.id, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 160,
                                            columnNumber: 31
                                        }, this)),
                                    rIndex === bracketByRound.length - 1 && renderChampion()
                                ]
                            }, rIndex, true, {
                                fileName: "[project]/src/components/BracketView.js",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/BracketView.js",
                    lineNumber: 148,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/BracketView.js",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            editingMatch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MatchEditorModal, {
                match: editingMatch,
                courts: courts,
                onClose: ()=>setEditingMatch(null),
                onSave: async (updates)=>{
                    const updatedMatch = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateMatch"])(editingMatch.id, updates);
                    if (updatedMatch) {
                        onMatchUpdate(updatedMatch);
                        setEditingMatch(null);
                    } else {
                        alert("Error al guardar el partido en la base de datos.");
                    }
                }
            }, void 0, false, {
                fileName: "[project]/src/components/BracketView.js",
                lineNumber: 170,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/BracketView.js",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
_s(BracketView, "7vLTABsGX911nWkJOFplnAV818g=");
_c = BracketView;
function MatchEditorModal({ match, courts, onClose, onSave }) {
    _s1();
    const safeArray = (arr)=>Array.isArray(arr) ? arr : [
            '',
            '',
            ''
        ];
    const [date, setDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(match.match_date || '');
    const [time, setTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(match.match_time || '');
    const [courtId, setCourtId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(match.court_id || '');
    const [p1Score, setP1Score] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(safeArray(match.p1_score));
    const [p2Score, setP2Score] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(safeArray(match.p2_score));
    const [isWo, setIsWo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(match.is_wo || false);
    const [winner, setWinner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(match.winner || 'null');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [p1Name, setP1Name] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(match.p1_name || '');
    const [p2Name, setP2Name] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(match.p2_name || '');
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        await onSave({
            match_date: date || null,
            match_time: time || null,
            court_id: courtId || null,
            is_wo: isWo,
            winner: winner === 'null' ? null : winner,
            p1_score: p1Score,
            p2_score: p2Score,
            p1_name: p1Name || null,
            p2_name: p2Name || null
        });
        setLoading(false);
    };
    const updateScore = (playerIdx, setIdx, val)=>{
        if (playerIdx === 1) {
            const newScore = [
                ...p1Score
            ];
            newScore[setIdx] = val;
            setP1Score(newScore);
        } else {
            const newScore = [
                ...p2Score
            ];
            newScore[setIdx] = val;
            setP2Score(newScore);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-up",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center p-6 border-b border-gray-800 bg-gray-950",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-bold text-red-500 uppercase tracking-wider",
                            children: match.round_name
                        }, void 0, false, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 236,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-gray-500 hover:text-white transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: "2",
                                    d: "M6 18L18 6M6 6l12 12"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BracketView.js",
                                    lineNumber: 238,
                                    columnNumber: 93
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/BracketView.js",
                                lineNumber: 238,
                                columnNumber: 14
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 237,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/BracketView.js",
                    lineNumber: 235,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "p-6 space-y-5 max-h-[80vh] overflow-y-auto custom-scrollbar",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-[10px] text-gray-500 uppercase tracking-widest mb-1",
                                            children: "Fecha"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 245,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            value: date,
                                            onChange: (e)=>setDate(e.target.value),
                                            className: "w-full bg-gray-950 border border-gray-700 rounded p-2 text-sm text-white focus:border-red-600 outline-none"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 246,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BracketView.js",
                                    lineNumber: 244,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-[10px] text-gray-500 uppercase tracking-widest mb-1",
                                            children: "Hora"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 249,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "time",
                                            value: time,
                                            onChange: (e)=>setTime(e.target.value),
                                            className: "w-full bg-gray-950 border border-gray-700 rounded p-2 text-sm text-white focus:border-red-600 outline-none"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 250,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BracketView.js",
                                    lineNumber: 248,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-[10px] text-gray-500 uppercase tracking-widest mb-1",
                                            children: "Cancha"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 253,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: courtId,
                                            onChange: (e)=>setCourtId(e.target.value),
                                            className: "w-full bg-gray-950 border border-gray-700 rounded p-2 text-sm text-white focus:border-red-600 outline-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Sin Asignar"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BracketView.js",
                                                    lineNumber: 255,
                                                    columnNumber: 17
                                                }, this),
                                                courts.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: c.id,
                                                        children: c.name
                                                    }, c.id, false, {
                                                        fileName: "[project]/src/components/BracketView.js",
                                                        lineNumber: 256,
                                                        columnNumber: 34
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 254,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BracketView.js",
                                    lineNumber: 252,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 243,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-950 border border-gray-800 rounded-lg p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-[1fr_40px_40px_40px] gap-2 mb-2 text-[10px] text-gray-500 uppercase tracking-widest text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-left",
                                            children: "Pareja"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 263,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: "S1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 263,
                                            columnNumber: 54
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: "S2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 263,
                                            columnNumber: 67
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: "S3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 263,
                                            columnNumber: 80
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BracketView.js",
                                    lineNumber: 262,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-[1fr_40px_40px_40px] gap-2 items-center mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: p1Name,
                                            onChange: (e)=>setP1Name(e.target.value),
                                            placeholder: "Pareja 1",
                                            className: "w-full bg-gray-900 border border-gray-700 rounded p-1.5 text-xs text-white focus:border-red-600 outline-none"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 267,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: "0",
                                            value: p1Score[0],
                                            onChange: (e)=>updateScore(1, 0, e.target.value),
                                            className: "w-full bg-gray-900 border border-gray-700 rounded p-1.5 text-center text-sm text-white focus:border-red-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 268,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: "0",
                                            value: p1Score[1],
                                            onChange: (e)=>updateScore(1, 1, e.target.value),
                                            className: "w-full bg-gray-900 border border-gray-700 rounded p-1.5 text-center text-sm text-white focus:border-red-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 269,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: "0",
                                            value: p1Score[2],
                                            onChange: (e)=>updateScore(1, 2, e.target.value),
                                            className: "w-full bg-gray-900 border border-gray-700 rounded p-1.5 text-center text-sm text-white focus:border-red-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 270,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BracketView.js",
                                    lineNumber: 266,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-[1fr_40px_40px_40px] gap-2 items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: p2Name,
                                            onChange: (e)=>setP2Name(e.target.value),
                                            placeholder: "Pareja 2",
                                            className: "w-full bg-gray-900 border border-gray-700 rounded p-1.5 text-xs text-white focus:border-red-600 outline-none"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 274,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: "0",
                                            value: p2Score[0],
                                            onChange: (e)=>updateScore(2, 0, e.target.value),
                                            className: "w-full bg-gray-900 border border-gray-700 rounded p-1.5 text-center text-sm text-white focus:border-red-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 275,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: "0",
                                            value: p2Score[1],
                                            onChange: (e)=>updateScore(2, 1, e.target.value),
                                            className: "w-full bg-gray-900 border border-gray-700 rounded p-1.5 text-center text-sm text-white focus:border-red-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 276,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: "0",
                                            value: p2Score[2],
                                            onChange: (e)=>updateScore(2, 2, e.target.value),
                                            className: "w-full bg-gray-900 border border-gray-700 rounded p-1.5 text-center text-sm text-white focus:border-red-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 277,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BracketView.js",
                                    lineNumber: 273,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 261,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-950 border border-gray-800 rounded-lg p-4 gap-4 mt-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex items-center gap-2 cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            checked: isWo,
                                            onChange: (e)=>setIsWo(e.target.checked),
                                            className: "w-4 h-4 rounded border-gray-700 bg-gray-900 text-red-600 focus:ring-red-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 283,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-gray-300 font-medium",
                                            children: "Ganador por W.O."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 284,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BracketView.js",
                                    lineNumber: 282,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 w-full sm:w-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] text-gray-500 uppercase tracking-widest whitespace-nowrap",
                                            children: "Ganador:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 288,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: winner,
                                            onChange: (e)=>setWinner(e.target.value),
                                            className: "bg-gray-900 border border-gray-700 rounded p-2 text-xs text-red-500 font-bold focus:border-red-600 outline-none w-full sm:max-w-[150px] truncate",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "null",
                                                    children: "Sin definir"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BracketView.js",
                                                    lineNumber: 290,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: p1Name || match.p1_name,
                                                    children: p1Name || match.p1_name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BracketView.js",
                                                    lineNumber: 291,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: p2Name || match.p2_name,
                                                    children: p2Name || match.p2_name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BracketView.js",
                                                    lineNumber: 292,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/BracketView.js",
                                            lineNumber: 289,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BracketView.js",
                                    lineNumber: 287,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 281,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: loading,
                            className: "w-full bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg mt-2 uppercase tracking-widest text-sm transition-colors shadow-[0_0_15px_rgba(0,242,254,0.1)] hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] flex justify-center items-center gap-2",
                            children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "animate-spin h-5 w-5 text-white",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        className: "opacity-25",
                                        cx: "12",
                                        cy: "12",
                                        r: "10",
                                        stroke: "currentColor",
                                        strokeWidth: "4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/BracketView.js",
                                        lineNumber: 298,
                                        columnNumber: 105
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        className: "opacity-75",
                                        fill: "currentColor",
                                        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/BracketView.js",
                                        lineNumber: 298,
                                        columnNumber: 206
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/BracketView.js",
                                lineNumber: 298,
                                columnNumber: 24
                            }, this) : "Guardar Partido"
                        }, void 0, false, {
                            fileName: "[project]/src/components/BracketView.js",
                            lineNumber: 297,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/BracketView.js",
                    lineNumber: 242,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BracketView.js",
            lineNumber: 234,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/BracketView.js",
        lineNumber: 233,
        columnNumber: 5
    }, this);
}
_s1(MatchEditorModal, "WvT2dKczP8foX8cN5d8ZavGL6fU=");
_c1 = MatchEditorModal;
var _c, _c1;
__turbopack_context__.k.register(_c, "BracketView");
__turbopack_context__.k.register(_c1, "MatchEditorModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CourtSchedule.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CourtSchedule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function CourtSchedule({ court, matches, categories, onBack }) {
    // Filtrar los partidos que corresponden a esta cancha, que no sean "BYE", y ordenarlos por fecha y hora
    const courtMatches = matches.filter((m)=>m.court_id === court.id && !m.is_bye).sort((a, b)=>{
        let da = new Date((a.match_date || '2099-01-01') + 'T' + (a.match_time || '00:00'));
        let db = new Date((b.match_date || '2099-01-01') + 'T' + (b.match_time || '00:00'));
        return da - db;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate-fade-up max-w-4xl mx-auto w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onBack,
                className: "mb-4 text-gray-400 hover:text-white text-xs flex items-center gap-2 transition-colors bg-gray-900 py-2 px-4 rounded border border-gray-800 uppercase tracking-widest font-semibold",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                            d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                        }, void 0, false, {
                            fileName: "[project]/src/components/CourtSchedule.js",
                            lineNumber: 16,
                            columnNumber: 88
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/CourtSchedule.js",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    "Volver al Panel"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CourtSchedule.js",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-light text-white mb-6 border-b border-gray-800 pb-3",
                        children: [
                            "Partidos en ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-red-500",
                                children: court.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/CourtSchedule.js",
                                lineNumber: 22,
                                columnNumber: 23
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/CourtSchedule.js",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2",
                        children: courtMatches.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-500 italic p-4 text-center border border-dashed border-gray-800 rounded-lg",
                            children: "No hay partidos programados en esta cancha."
                        }, void 0, false, {
                            fileName: "[project]/src/components/CourtSchedule.js",
                            lineNumber: 27,
                            columnNumber: 13
                        }, this) : courtMatches.map((m)=>{
                            const catName = categories.find((c)=>c.id === m.category_id)?.name || 'Categoría Desconocida';
                            const p1Score = m.p1_score || [
                                '',
                                '',
                                ''
                            ];
                            const p2Score = m.p2_score || [
                                '',
                                '',
                                ''
                            ];
                            const isWOP1 = m.is_wo && m.winner === m.p1_name;
                            const isWOP2 = m.is_wo && m.winner === m.p2_name;
                            const isP1Winner = m.winner === m.p1_name && m.p1_name;
                            const isP2Winner = m.winner === m.p2_name && m.p2_name;
                            const dateStr = m.match_date ? `${m.match_date.split('-').reverse().join('/')}` : 'Fecha a definir';
                            const timeStr = m.match_time || '';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-950 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-800/50 text-gray-300 text-[10px] font-bold tracking-wider uppercase px-4 py-2 flex justify-between border-b border-gray-800",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    m.round_name,
                                                    " - ",
                                                    catName
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/CourtSchedule.js",
                                                lineNumber: 45,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-600",
                                                children: [
                                                    dateStr,
                                                    " ",
                                                    timeStr
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/CourtSchedule.js",
                                                lineNumber: 46,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/CourtSchedule.js",
                                        lineNumber: 44,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `grid grid-cols-[1fr_30px_30px_30px] items-center h-10 border-b border-gray-800 ${isP1Winner ? 'bg-white/5 font-bold text-white' : 'text-gray-300'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 truncate text-xs",
                                                children: m.p1_name || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "italic opacity-50",
                                                    children: "Esperando..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CourtSchedule.js",
                                                    lineNumber: 49,
                                                    columnNumber: 74
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/CourtSchedule.js",
                                                lineNumber: 49,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-l border-gray-800 text-center text-xs flex items-center justify-center h-full bg-gray-900",
                                                children: isWOP1 ? 'W' : p1Score[0]
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/CourtSchedule.js",
                                                lineNumber: 50,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-l border-gray-800 text-center text-xs flex items-center justify-center h-full bg-gray-900",
                                                children: isWOP1 ? 'O' : p1Score[1]
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/CourtSchedule.js",
                                                lineNumber: 51,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-l border-gray-800 text-center text-xs flex items-center justify-center h-full bg-gray-900",
                                                children: p1Score[2]
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/CourtSchedule.js",
                                                lineNumber: 52,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/CourtSchedule.js",
                                        lineNumber: 48,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `grid grid-cols-[1fr_30px_30px_30px] items-center h-10 ${isP2Winner ? 'bg-white/5 font-bold text-white' : 'text-gray-300'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 truncate text-xs",
                                                children: m.p2_name || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "italic opacity-50",
                                                    children: "Esperando..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CourtSchedule.js",
                                                    lineNumber: 55,
                                                    columnNumber: 74
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/CourtSchedule.js",
                                                lineNumber: 55,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-l border-gray-800 text-center text-xs flex items-center justify-center h-full bg-gray-900",
                                                children: isWOP2 ? 'W' : p2Score[0]
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/CourtSchedule.js",
                                                lineNumber: 56,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-l border-gray-800 text-center text-xs flex items-center justify-center h-full bg-gray-900",
                                                children: isWOP2 ? 'O' : p2Score[1]
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/CourtSchedule.js",
                                                lineNumber: 57,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-l border-gray-800 text-center text-xs flex items-center justify-center h-full bg-gray-900",
                                                children: p2Score[2]
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/CourtSchedule.js",
                                                lineNumber: 58,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/CourtSchedule.js",
                                        lineNumber: 54,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, m.id, true, {
                                fileName: "[project]/src/components/CourtSchedule.js",
                                lineNumber: 43,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/CourtSchedule.js",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CourtSchedule.js",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CourtSchedule.js",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = CourtSchedule;
var _c;
__turbopack_context__.k.register(_c, "CourtSchedule");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/TournamentApp.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TournamentApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tournamentLogic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tournamentLogic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BracketView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BracketView.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdminPlayers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AdminPlayers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CourtSchedule$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CourtSchedule.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdminPayments$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AdminPayments.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdminLogin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AdminLogin.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UIComponents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/UIComponents.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
function AdminGlobalScheduleSetup({ matches, categories, courts, onBack, onGenerateGlobal }) {
    _s();
    const [daysConfig, setDaysConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            date: new Date().toISOString().split('T')[0],
            startTime: '09:00',
            endTime: '22:00',
            phase: 'grupos'
        }
    ]);
    const [matchDuration, setMatchDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(60);
    const [selectedCourts, setSelectedCourts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminGlobalScheduleSetup.useEffect": ()=>{
            if (courts && courts.length > 0 && selectedCourts.length === 0) {
                setSelectedCourts(courts.map({
                    "AdminGlobalScheduleSetup.useEffect": (c)=>c.id
                }["AdminGlobalScheduleSetup.useEffect"]));
            }
        }
    }["AdminGlobalScheduleSetup.useEffect"], [
        courts
    ]);
    const addDay = ()=>{
        const lastDay = daysConfig[daysConfig.length - 1];
        const nextDate = new Date(lastDay.date);
        nextDate.setDate(nextDate.getDate() + 1);
        setDaysConfig([
            ...daysConfig,
            {
                date: nextDate.toISOString().split('T')[0],
                startTime: lastDay.startTime,
                endTime: lastDay.endTime,
                phase: lastDay.phase
            }
        ]);
    };
    const removeDay = (index)=>{
        setDaysConfig(daysConfig.filter((_, i)=>i !== index));
    };
    const updateDay = (index, field, value)=>{
        const newDays = [
            ...daysConfig
        ];
        newDays[index][field] = value;
        setDaysConfig(newDays);
    };
    const loadWeekendTemplate = ()=>{
        const baseDateStr = daysConfig[0]?.date || new Date().toISOString().split('T')[0];
        // Usamos 'T12:00:00' para evitar bugs de zona horaria al sumar días
        const baseDate = new Date(baseDateStr + 'T12:00:00');
        const formatD = (d)=>d.toISOString().split('T')[0];
        const d0 = formatD(baseDate);
        const d1 = formatD(new Date(baseDate.getTime() + 86400000));
        const d2 = formatD(new Date(baseDate.getTime() + 86400000 * 2));
        const d3 = formatD(new Date(baseDate.getTime() + 86400000 * 3));
        setDaysConfig([
            {
                date: d0,
                startTime: '17:00',
                endTime: '23:45',
                phase: 'grupos'
            },
            {
                date: d1,
                startTime: '17:00',
                endTime: '23:45',
                phase: 'grupos'
            },
            {
                date: d2,
                startTime: '08:00',
                endTime: '23:45',
                phase: 'grupos'
            },
            {
                date: d3,
                startTime: '09:00',
                endTime: '15:00',
                phase: 'semis'
            },
            {
                date: d3,
                startTime: '16:00',
                endTime: '21:00',
                phase: 'finals'
            } // 5 horas
        ]);
    };
    const activeMatches = matches.filter((m)=>!m.is_bye);
    let gruposCount = 0, semisCount = 0, finalsCount = 0;
    categories.forEach((cat)=>{
        const catMatches = activeMatches.filter((m)=>m.category_id === cat.id);
        if (catMatches.length === 0) return;
        const maxR = Math.max(...catMatches.map((m)=>m.round_index || 0));
        catMatches.forEach((m)=>{
            if (m.round_index === maxR && maxR > 0) finalsCount++;
            else if (m.round_index === maxR - 1 && maxR > 1) semisCount++;
            else gruposCount++;
        });
    });
    const durationH = Number(matchDuration) / 60;
    const cCount = courts.length > 0 ? courts.length : 1;
    const hGrupos = Math.ceil(gruposCount * durationH / cCount);
    const hSemis = Math.ceil(semisCount * durationH / cCount);
    const hFinals = Math.ceil(finalsCount * durationH / cCount);
    const jHrs = Math.ceil(hGrupos * 0.25);
    const vHrs = Math.ceil(hGrupos * 0.25);
    const sHrs = hGrupos - jHrs - vHrs;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate-fade-up max-w-4xl mx-auto w-full mt-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onBack,
                className: "mb-4 text-gray-400 hover:text-white text-xs bg-gray-900 py-1.5 px-3 rounded border border-gray-800",
                children: "Volver al Panel"
            }, void 0, false, {
                fileName: "[project]/src/components/TournamentApp.js",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-light text-white mb-6 border-b border-gray-800 pb-3",
                        children: [
                            "Auto-Programador ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-red-500",
                                children: "Global"
                            }, void 0, false, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 96,
                                columnNumber: 108
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8 bg-gray-950 border border-red-950/30 rounded-xl p-5 shadow-[0_0_15px_rgba(0,242,254,0.05)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 mb-4 border-b border-gray-800 pb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-full bg-red-950/40 text-red-500 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: "2",
                                                d: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 102,
                                                columnNumber: 94
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TournamentApp.js",
                                            lineNumber: 102,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-white font-bold text-sm tracking-widest uppercase",
                                                children: "Estimador de Horas (Jue - Dom)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 105,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500 text-[10px] uppercase",
                                                children: [
                                                    "Basado en ",
                                                    categories.length,
                                                    " categorías, ",
                                                    courts.length,
                                                    " canchas y ",
                                                    matchDuration,
                                                    " min/partido"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 106,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 104,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-900 border border-gray-800 rounded-lg p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500 text-[9px] uppercase tracking-widest font-bold",
                                                children: "Jueves (Grupos)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 111,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-500 font-bold text-lg",
                                                children: [
                                                    jHrs,
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-normal",
                                                        children: "hrs/cancha"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 112,
                                                        columnNumber: 68
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 112,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-900 border border-gray-800 rounded-lg p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500 text-[9px] uppercase tracking-widest font-bold",
                                                children: "Viernes (Grupos)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 115,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-500 font-bold text-lg",
                                                children: [
                                                    vHrs,
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-normal",
                                                        children: "hrs/cancha"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 116,
                                                        columnNumber: 68
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 116,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 114,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-900 border border-gray-800 rounded-lg p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500 text-[9px] uppercase tracking-widest font-bold",
                                                children: "Sábado (Grupos)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 119,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-500 font-bold text-lg",
                                                children: [
                                                    sHrs,
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-normal",
                                                        children: "hrs/cancha"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 120,
                                                        columnNumber: 68
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 120,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 118,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-900 border border-gray-800 rounded-lg p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500 text-[9px] uppercase tracking-widest font-bold",
                                                children: "Domingo (Llaves)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 123,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-400 font-bold text-lg",
                                                children: [
                                                    hSemis + hFinals,
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-normal",
                                                        children: "hrs/cancha"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 124,
                                                        columnNumber: 80
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 124,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-gray-500 text-[10px] uppercase tracking-widest",
                                        children: "Días de Competencia y Horarios"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 131,
                                        columnNumber: 14
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: loadWeekendTemplate,
                                                className: "bg-yellow-900/30 hover:bg-yellow-900/60 text-yellow-500 text-[10px] uppercase font-bold py-1 px-3 rounded border border-yellow-800 transition-colors",
                                                children: "⚡ Cargar Plantilla Jue-Dom"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 133,
                                                columnNumber: 16
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: addDay,
                                                className: "bg-red-950/30 hover:bg-red-950/60 text-red-500 text-[10px] uppercase font-bold py-1 px-3 rounded border border-red-900 transition-colors",
                                                children: "+ Agregar Día"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 136,
                                                columnNumber: 16
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 132,
                                        columnNumber: 14
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 130,
                                columnNumber: 12
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-3",
                                children: daysConfig.map((day, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap md:flex-nowrap gap-3 items-end bg-gray-950 p-3 rounded-xl border border-gray-800",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-gray-600 text-[9px] uppercase tracking-widest mb-1",
                                                        children: "Fecha"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 146,
                                                        columnNumber: 20
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "date",
                                                        value: day.date,
                                                        onChange: (e)=>updateDay(idx, 'date', e.target.value),
                                                        className: "w-full bg-gray-900 border border-gray-800 text-white rounded p-2 focus:border-red-600 outline-none text-sm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 147,
                                                        columnNumber: 20
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 145,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-gray-600 text-[9px] uppercase tracking-widest mb-1",
                                                        children: "Fase Asignada"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 150,
                                                        columnNumber: 20
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: day.phase,
                                                        onChange: (e)=>updateDay(idx, 'phase', e.target.value),
                                                        className: "w-full bg-gray-900 border border-gray-800 text-white rounded p-2 focus:border-red-600 outline-none text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "grupos",
                                                                children: "Grupos y Eliminatorias Previas"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/TournamentApp.js",
                                                                lineNumber: 152,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "semis",
                                                                children: "Solo Semifinales"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/TournamentApp.js",
                                                                lineNumber: 153,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "finals",
                                                                children: "Solo Finales"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/TournamentApp.js",
                                                                lineNumber: 154,
                                                                columnNumber: 22
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 151,
                                                        columnNumber: 20
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 149,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-auto",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-gray-600 text-[9px] uppercase tracking-widest mb-1",
                                                        children: "Inicio (24h)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 158,
                                                        columnNumber: 20
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: day.startTime.split(':')[0],
                                                                onChange: (e)=>{
                                                                    const m = day.startTime.split(':')[1];
                                                                    updateDay(idx, 'startTime', `${e.target.value}:${m}`);
                                                                },
                                                                className: "bg-gray-900 border border-gray-800 text-white rounded p-2 focus:border-red-600 outline-none text-sm text-center cursor-pointer",
                                                                children: Array.from({
                                                                    length: 24
                                                                }, (_, i)=>i.toString().padStart(2, '0')).map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: h,
                                                                        children: h
                                                                    }, h, false, {
                                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                                        lineNumber: 164,
                                                                        columnNumber: 100
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/TournamentApp.js",
                                                                lineNumber: 160,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-500 font-bold",
                                                                children: ":"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/TournamentApp.js",
                                                                lineNumber: 166,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: day.startTime.split(':')[1],
                                                                onChange: (e)=>{
                                                                    const h = day.startTime.split(':')[0];
                                                                    updateDay(idx, 'startTime', `${h}:${e.target.value}`);
                                                                },
                                                                className: "bg-gray-900 border border-gray-800 text-white rounded p-2 focus:border-red-600 outline-none text-sm text-center cursor-pointer",
                                                                children: [
                                                                    '00',
                                                                    '15',
                                                                    '30',
                                                                    '45'
                                                                ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: m,
                                                                        children: m
                                                                    }, m, false, {
                                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                                        lineNumber: 171,
                                                                        columnNumber: 56
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/TournamentApp.js",
                                                                lineNumber: 167,
                                                                columnNumber: 22
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 159,
                                                        columnNumber: 20
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 157,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-auto",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-gray-600 text-[9px] uppercase tracking-widest mb-1",
                                                        children: "Cierre (24h)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 176,
                                                        columnNumber: 20
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: day.endTime.split(':')[0],
                                                                onChange: (e)=>{
                                                                    const m = day.endTime.split(':')[1];
                                                                    updateDay(idx, 'endTime', `${e.target.value}:${m}`);
                                                                },
                                                                className: "bg-gray-900 border border-gray-800 text-white rounded p-2 focus:border-red-600 outline-none text-sm text-center cursor-pointer",
                                                                children: Array.from({
                                                                    length: 24
                                                                }, (_, i)=>i.toString().padStart(2, '0')).map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: h,
                                                                        children: h
                                                                    }, h, false, {
                                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                                        lineNumber: 182,
                                                                        columnNumber: 100
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/TournamentApp.js",
                                                                lineNumber: 178,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-500 font-bold",
                                                                children: ":"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/TournamentApp.js",
                                                                lineNumber: 184,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: day.endTime.split(':')[1],
                                                                onChange: (e)=>{
                                                                    const h = day.endTime.split(':')[0];
                                                                    updateDay(idx, 'endTime', `${h}:${e.target.value}`);
                                                                },
                                                                className: "bg-gray-900 border border-gray-800 text-white rounded p-2 focus:border-red-600 outline-none text-sm text-center cursor-pointer",
                                                                children: [
                                                                    '00',
                                                                    '15',
                                                                    '30',
                                                                    '45'
                                                                ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: m,
                                                                        children: m
                                                                    }, m, false, {
                                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                                        lineNumber: 189,
                                                                        columnNumber: 56
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/TournamentApp.js",
                                                                lineNumber: 185,
                                                                columnNumber: 22
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 177,
                                                        columnNumber: 20
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 175,
                                                columnNumber: 18
                                            }, this),
                                            daysConfig.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>removeDay(idx),
                                                className: "bg-red-900/20 text-red-400 p-2 rounded hover:bg-red-900/40 border border-red-900/30 transition-colors h-[38px] flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: "2",
                                                        d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 195,
                                                        columnNumber: 101
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                    lineNumber: 195,
                                                    columnNumber: 22
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 194,
                                                columnNumber: 20
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 144,
                                        columnNumber: 16
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 142,
                                columnNumber: 12
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-gray-500 text-[10px] uppercase tracking-widest mb-2",
                                children: "Duración del Partido (minutos)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 204,
                                columnNumber: 12
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: matchDuration,
                                onChange: (e)=>setMatchDuration(Number(e.target.value)),
                                className: "w-full md:w-1/3 bg-gray-950 border border-gray-800 text-white rounded p-2 focus:border-red-600 outline-none text-sm"
                            }, void 0, false, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 205,
                                columnNumber: 12
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-gray-500 text-[10px] uppercase tracking-widest mb-2",
                                children: "Canchas Disponibles"
                            }, void 0, false, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 209,
                                columnNumber: 12
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-3",
                                children: courts && courts.length > 0 ? courts.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-2 bg-gray-950 border border-gray-800 px-3 py-2 rounded-lg cursor-pointer hover:border-gray-600 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: selectedCourts.includes(c.id),
                                                onChange: (e)=>{
                                                    if (e.target.checked) setSelectedCourts([
                                                        ...selectedCourts,
                                                        c.id
                                                    ]);
                                                    else setSelectedCourts(selectedCourts.filter((id)=>id !== c.id));
                                                },
                                                className: "accent-red-600 w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 213,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-bold text-gray-200",
                                                children: c.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 222,
                                                columnNumber: 18
                                            }, this)
                                        ]
                                    }, c.id, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 212,
                                        columnNumber: 16
                                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-500",
                                    children: "No hay canchas configuradas"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TournamentApp.js",
                                    lineNumber: 224,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 210,
                                columnNumber: 12
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 208,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onGenerateGlobal({
                                daysConfig,
                                matchDurationMin: matchDuration,
                                courts: courts.filter((c)=>selectedCourts.includes(c.id))
                            }),
                        className: "w-full bg-red-700 hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-950/50 transition-all uppercase tracking-widest text-sm",
                        children: "Aplicar Calendario Inteligente a todo el Torneo"
                    }, void 0, false, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 228,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TournamentApp.js",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TournamentApp.js",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
_s(AdminGlobalScheduleSetup, "Ba+jHagOEndsXwkrQ2O7oFKhGQM=");
_c = AdminGlobalScheduleSetup;
function AdminSetup({ category, players, courts, onBack, onGenerate }) {
    _s1();
    const categoryPlayers = players.filter((p)=>p.category_id === category.id);
    const initialPairs = Array(category.num_pairs || 6).fill('');
    categoryPlayers.forEach((p, idx)=>{
        if (idx < initialPairs.length) {
            initialPairs[idx] = `${p.name}${p.partner ? ' & ' + p.partner : ''}`;
        }
    });
    const [numPairs, setNumPairs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(category.num_pairs || 6);
    const [pairs, setPairs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialPairs);
    const handleNumPairsChange = (e)=>{
        const newNum = parseInt(e.target.value);
        setNumPairs(newNum);
        const newPairs = [
            ...pairs
        ];
        while(newPairs.length < newNum)newPairs.push('');
        setPairs(newPairs.slice(0, newNum));
    };
    const handlePairChange = (index, val)=>{
        const newPairs = [
            ...pairs
        ];
        newPairs[index] = val;
        setPairs(newPairs);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate-fade-up max-w-4xl mx-auto w-full mt-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onBack,
                className: "mb-4 text-gray-400 hover:text-white text-xs bg-gray-900 py-1.5 px-3 rounded border border-gray-800",
                children: "Volver al Panel"
            }, void 0, false, {
                fileName: "[project]/src/components/TournamentApp.js",
                lineNumber: 267,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-800 pb-5 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-light text-white",
                                        children: [
                                            "Inscripción ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-red-500",
                                                children: category.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 273,
                                                columnNumber: 72
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 273,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-400 mt-1",
                                        children: 'Si dejas espacios en blanco, se generarán "Pases Directos" (BYEs).'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 274,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full md:w-48",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-gray-500 text-[9px] uppercase tracking-widest mb-1",
                                        children: "Tamaño del Cuadro"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 277,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: numPairs,
                                        onChange: handleNumPairsChange,
                                        className: "w-full bg-gray-950 border border-gray-800 text-white rounded p-2 focus:border-red-600 outline-none cursor-pointer text-sm font-mono",
                                        children: [
                                            6,
                                            8,
                                            10,
                                            12,
                                            14,
                                            16,
                                            18,
                                            20,
                                            22,
                                            24,
                                            26,
                                            28,
                                            30,
                                            32
                                        ].map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: n,
                                                children: [
                                                    n,
                                                    " Parejas"
                                                ]
                                            }, n, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 279,
                                                columnNumber: 67
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 278,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 276,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1",
                        children: pairs.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-gray-500 text-[10px] mb-1 uppercase tracking-widest font-medium",
                                        children: [
                                            "Pareja ",
                                            i + 1,
                                            " ",
                                            i % 2 === 0 ? '(ZONA ' + String.fromCharCode(65 + i / 2) + ')' : ''
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 287,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: p === 'BYE' ? '' : p,
                                        onChange: (e)=>handlePairChange(i, e.target.value),
                                        placeholder: "Dejar en blanco para generar BYE automático",
                                        className: "bg-gray-950 border border-gray-800 text-gray-200 rounded p-2 focus:border-red-600 outline-none text-sm w-full transition-colors"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 290,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 286,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 284,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 pt-6 border-t border-gray-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-bold text-white uppercase tracking-widest mb-2",
                                        children: "Gestión del Cuadro de Eliminación"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 303,
                                        columnNumber: 13
                                    }, this),
                                    category.current_step === 'bracket' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-red-950/20 border border-red-900 rounded p-3 mb-4 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-2 h-2 rounded-full bg-red-600 animate-pulse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 307,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-500 text-xs font-bold uppercase tracking-widest",
                                                        children: "Cuadro Generado y Activo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 308,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 306,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>onBack('view_bracket'),
                                                        className: "bg-red-700 hover:bg-red-600 text-white text-xs py-1.5 px-3 rounded font-bold transition-colors",
                                                        children: "Ir al Cuadro"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 311,
                                                        columnNumber: 20
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            if (confirm('¿Estás seguro de que quieres borrar el cuadro entero? Perderás todos los resultados cargados.')) {
                                                                onBack('delete_bracket');
                                                            }
                                                        },
                                                        className: "bg-red-900/40 hover:bg-red-900/80 text-red-400 border border-red-900/50 text-xs py-1.5 px-3 rounded font-bold transition-colors",
                                                        children: "Borrar Cuadro"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 314,
                                                        columnNumber: 20
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 310,
                                                columnNumber: 18
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 305,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-950 border border-gray-800 rounded p-3 mb-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-500 text-xs font-bold uppercase tracking-widest",
                                            children: "Aún no se ha generado un cuadro para esta categoría."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TournamentApp.js",
                                            lineNumber: 325,
                                            columnNumber: 18
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 324,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 302,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row gap-4 mt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            onGenerate(numPairs, pairs, false);
                                        },
                                        className: "w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 font-bold py-3 px-6 rounded-lg text-xs uppercase tracking-widest transition-colors",
                                        children: "Generar (Orden Inscriptos)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 331,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            onGenerate(numPairs, pairs, true);
                                        },
                                        className: "w-full neon-button bg-red-600/10 font-bold py-3 px-6 rounded-lg text-xs uppercase tracking-widest flex justify-center items-center gap-2",
                                        children: "Generar Sorteo Aleatorio"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 336,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 330,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 301,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TournamentApp.js",
                lineNumber: 270,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TournamentApp.js",
        lineNumber: 266,
        columnNumber: 5
    }, this);
}
_s1(AdminSetup, "l+RHVmxflQS0Q14O1qjuyJYnWhw=");
_c1 = AdminSetup;
function TournamentApp({ initialCategories }) {
    _s2();
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialCategories || []);
    const [courts, setCourts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [players, setPlayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [matches, setMatches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("public");
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("home");
    const [activeCatId, setActiveCatId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeCourtId, setActiveCourtId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [toastMessage, setToastMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [promptConfig, setPromptConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [expandedPair, setExpandedPair] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [publicPlayersCatId, setPublicPlayersCatId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const showToast = (msg)=>{
        setToastMessage(msg);
        setTimeout(()=>setToastMessage(""), 3000);
    };
    const handleAddCategory = ()=>{
        setPromptConfig({
            title: "Nueva Categoría",
            placeholder: "Ej: 7ma Caballeros",
            onConfirm: async (name)=>{
                setPromptConfig(null);
                const newCat = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addCategory"])(name);
                if (newCat) {
                    setCategories([
                        ...categories,
                        newCat
                    ]);
                    showToast("Categoría agregada exitosamente");
                }
            }
        });
    };
    const handleAddCourt = ()=>{
        setPromptConfig({
            title: "Agregar Cancha",
            placeholder: "Ej: Pilar Padel 1",
            onConfirm: async (name)=>{
                setPromptConfig(null);
                const newCourt = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addCourt"])(name);
                if (newCourt) {
                    setCourts([
                        ...courts,
                        newCourt
                    ]);
                    showToast("Cancha agregada exitosamente");
                }
            }
        });
    };
    const handleGenerateTournament = async (numPairs, pairs, isRandom)=>{
        // Rellenamos los vacíos con 'BYE'
        const finalPairs = pairs.map((p)=>p.trim() || 'BYE');
        const { generatedMatches } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tournamentLogic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateTournamentMatches"])(activeCatId, numPairs, finalPairs, isRandom);
        // Actualizamos la categoría
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateCategory"])(activeCatId, {
            num_pairs: numPairs,
            current_step: 'bracket'
        });
        setCategories(categories.map((c)=>c.id === activeCatId ? {
                ...c,
                num_pairs: numPairs,
                current_step: 'bracket'
            } : c));
        // Limpiamos los partidos viejos de la base de datos para esta categoría
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteMatchesByCategory"])(activeCatId);
        // Guardamos los nuevos partidos en la DB
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveGeneratedMatches"])(generatedMatches);
        // Recargamos los partidos al estado local
        const fetchedMatches = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMatches"])();
        setMatches(fetchedMatches);
        showToast("Sorteo generado con éxito.");
        setView("bracket");
    };
    const handleGenerateGlobalSchedule = async (config)=>{
        if (!confirm("¿Estás seguro de sobreescribir todos los horarios actuales? Esto asignará nuevos turnos a todos los partidos basándose en las prioridades.")) return;
        showToast("Calculando y guardando calendario...");
        const newSchedule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tournamentLogic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateGlobalSchedule"])(matches, categories, config);
        const updates = newSchedule.filter((m)=>!m.is_bye && m.id).map((m)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateMatch"])(m.id, {
                match_date: m.match_date,
                match_time: m.match_time,
                court_id: m.court_id
            }));
        await Promise.all(updates);
        const fetchedMatches = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMatches"])();
        setMatches(fetchedMatches);
        showToast("Calendario global aplicado con éxito.");
        setView("admin_home");
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TournamentApp.useEffect": ()=>{
            const loadData = {
                "TournamentApp.useEffect.loadData": async ()=>{
                    const currentSession = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSession"])();
                    setSession(currentSession);
                    if (currentSession) {
                        setMode("admin");
                        setView("admin_home");
                    }
                    const fetchedCourts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCourts"])();
                    setCourts(fetchedCourts);
                    const fetchedPlayers = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPlayers"])();
                    setPlayers(fetchedPlayers);
                    const fetchedMatches = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMatches"])();
                    setMatches(fetchedMatches);
                }
            }["TournamentApp.useEffect.loadData"];
            loadData();
            // Setup Supabase Realtime Subscriptions
            const channel = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel('tournament-updates').on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'matches'
            }, {
                "TournamentApp.useEffect.channel": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMatches"])().then(setMatches);
                }
            }["TournamentApp.useEffect.channel"]).on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'players'
            }, {
                "TournamentApp.useEffect.channel": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPlayers"])().then(setPlayers);
                }
            }["TournamentApp.useEffect.channel"]).on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'categories'
            }, {
                "TournamentApp.useEffect.channel": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategories"])().then(setCategories);
                }
            }["TournamentApp.useEffect.channel"]).on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'courts'
            }, {
                "TournamentApp.useEffect.channel": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCourts"])().then(setCourts);
                }
            }["TournamentApp.useEffect.channel"]).subscribe();
            return ({
                "TournamentApp.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(channel);
                }
            })["TournamentApp.useEffect"];
        }
    }["TournamentApp.useEffect"], []);
    const handleAutoPilot = async ()=>{
        if (!confirm("¿Piloto Automático? Esto borrará TODOS los cuadros actuales, cerrará inscripciones, sorteará los cruces aleatoriamente para TODAS las categorías y te dejará listo para usar el Gestor de Horarios. ¿Deseas continuar?")) return;
        showToast("Piloto Automático iniciado. Generando sorteos...");
        for (const cat of categories){
            const catPlayers = players.filter((p)=>p.category_id === cat.id);
            const numPairs = cat.num_pairs || 6;
            const pairs = Array(numPairs).fill('');
            catPlayers.forEach((p, idx)=>{
                if (idx < pairs.length) {
                    pairs[idx] = `${p.name}${p.partner ? ' & ' + p.partner : ''}`;
                }
            });
            const finalPairs = pairs.map((p)=>p.trim() || 'BYE');
            const { generatedMatches } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tournamentLogic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateTournamentMatches"])(cat.id, numPairs, finalPairs, true);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteMatchesByCategory"])(cat.id);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveGeneratedMatches"])(generatedMatches);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateCategory"])(cat.id, {
                current_step: 'bracket'
            });
        }
        const fetchedMatches = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMatches"])();
        setMatches(fetchedMatches);
        const fetchedCat = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategories"])();
        setCategories(fetchedCat);
        showToast("Piloto Automático finalizado. Puede utilizar el Gestor de Horarios.");
    };
    const handleMatchUpdate = async (updatedMatch)=>{
        // 1. Actualizar estado local del partido editado
        let currentMatches = matches.map((m)=>m.id === updatedMatch.id ? updatedMatch : m);
        setMatches([
            ...currentMatches
        ]);
        let queue = [
            updatedMatch
        ];
        while(queue.length > 0){
            const currentUpdate = queue.shift();
            // 2. Revisar si hay que avanzar al ganador a la siguiente ronda (propagarLlave)
            const propagations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tournamentLogic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["advanceWinner"])(currentMatches, currentUpdate);
            if (propagations && propagations.length > 0) {
                for (const prop of propagations){
                    const advancedMatch = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateMatch"])(prop.matchId, prop.updates);
                    if (advancedMatch) {
                        currentMatches = currentMatches.map((m)=>m.id === advancedMatch.id ? advancedMatch : m);
                        // Si el partido avanzado ganó automáticamente (porque el rival era BYE), lo encolamos para que siga propagando
                        if (prop.updates.winner) {
                            queue.push(advancedMatch);
                        }
                    }
                }
                setMatches([
                    ...currentMatches
                ]);
            }
        }
    };
    const handlePlayersUpdate = (player, action)=>{
        if (action === "add") setPlayers([
            ...players,
            player
        ]);
        if (action === "delete") setPlayers(players.filter((p)=>p.id !== player.id));
        if (action === "update") setPlayers(players.map((p)=>p.id === player.id ? player : p));
    };
    const handleDeleteCategory = async (id, name)=>{
        if (confirm(`¿Estás seguro de eliminar la categoría "${name}"? Se borrarán todos los jugadores inscriptos y partidos. Esta acción es IRREVERSIBLE.`)) {
            const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteCategory"])(id);
            if (success) {
                setCategories(categories.filter((c)=>c.id !== id));
                showToast(`Categoría ${name} eliminada.`);
            } else {
                alert("Error al eliminar la categoría.");
            }
        }
    };
    const handleDeleteCourt = async (id, name)=>{
        if (confirm(`¿Estás seguro de eliminar la cancha "${name}"?`)) {
            const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteCourt"])(id);
            if (success) {
                setCourts(courts.filter((c)=>c.id !== id));
                showToast(`Cancha ${name} eliminada.`);
            } else {
                alert("Error al eliminar la cancha.");
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "w-full bg-black/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 h-16 flex justify-between items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-3",
                            onClick: ()=>{
                                setMode("public");
                                setView("home");
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-xl md:text-2xl font-title text-white tracking-widest",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/logo.png",
                                    alt: "Black Club",
                                    className: "h-16 md:h-20 w-auto object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TournamentApp.js",
                                    lineNumber: 582,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 581,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/TournamentApp.js",
                            lineNumber: 577,
                            columnNumber: 11
                        }, this),
                        mode === "public" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "hidden md:flex gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    onClick: ()=>setView("home"),
                                    className: `text-sm font-semibold uppercase tracking-widest cursor-pointer hover:text-red-500 transition-colors ${view === "home" ? "text-red-500 border-b-2 border-red-500" : "text-gray-400"}`,
                                    children: "Inicio & Torneo"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TournamentApp.js",
                                    lineNumber: 588,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    onClick: ()=>setView("players"),
                                    className: `text-sm font-semibold uppercase tracking-widest cursor-pointer hover:text-red-500 transition-colors ${view === "players" ? "text-red-500 border-b-2 border-red-500" : "text-gray-400"}`,
                                    children: "Jugadores"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TournamentApp.js",
                                    lineNumber: 591,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/TournamentApp.js",
                            lineNumber: 587,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: mode === "public" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-1.5 px-4 rounded text-xs transition-colors border border-gray-700",
                                onClick: ()=>{
                                    if (session) {
                                        setMode("admin");
                                        setView("admin_home");
                                    } else {
                                        setView("admin_login");
                                    }
                                },
                                children: "Acceso Admin"
                            }, void 0, false, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 599,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-1.5 px-4 rounded text-xs transition-colors border border-gray-700",
                                        onClick: ()=>{
                                            setMode("public");
                                            setView("home");
                                        },
                                        children: "Volver al Torneo"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 614,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "bg-red-900/40 hover:bg-red-900/80 text-red-400 font-semibold py-1.5 px-4 rounded text-xs transition-colors border border-red-900/50",
                                        onClick: async ()=>{
                                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutAdmin"])();
                                            setSession(null);
                                            setMode("public");
                                            setView("home");
                                            showToast("Sesión cerrada");
                                        },
                                        children: "Cerrar Sesión"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 623,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 613,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/TournamentApp.js",
                            lineNumber: 597,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/TournamentApp.js",
                    lineNumber: 576,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/TournamentApp.js",
                lineNumber: 575,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-7xl mx-auto p-4 py-8 pb-24 md:pb-8",
                children: [
                    view === "admin_login" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdminLogin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onLoginSuccess: async ()=>{
                            const currentSession = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSession"])();
                            setSession(currentSession);
                            setMode("admin");
                            setView("admin_home");
                            showToast("Sesión iniciada correctamente.");
                        },
                        onCancel: ()=>setView("home")
                    }, void 0, false, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 644,
                        columnNumber: 11
                    }, this),
                    mode === "public" && view === "home" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-up",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-8 flex flex-col gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-950/80 backdrop-blur-sm flex justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/flyer.png",
                                            alt: "Flyer Black Padel",
                                            className: "w-full max-w-2xl h-auto object-contain",
                                            onError: (e)=>{
                                                e.target.src = "https://placehold.co/800x400/0a192f/bfff00?text=COPA+PRIMAVERA+FLYER";
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TournamentApp.js",
                                            lineNumber: 660,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 659,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-title text-white mb-6 border-b border-gray-800 pb-3 uppercase tracking-wider",
                                                children: [
                                                    "Selecciona tu ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-red-500",
                                                        children: "Categoría"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 663,
                                                        columnNumber: 138
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 663,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
                                                children: categories.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-500 italic col-span-full",
                                                    children: "No hay categorías disponibles aún."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                    lineNumber: 666,
                                                    columnNumber: 21
                                                }, this) : categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "w-full text-left bg-gray-950/80 backdrop-blur-sm border border-gray-800 hover:border-red-600 rounded-xl p-5 transition-all shadow-md group",
                                                        onClick: ()=>{
                                                            setActiveCatId(cat.id);
                                                            setView("bracket");
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-xl font-title font-bold text-white group-hover:text-red-500 transition-colors uppercase tracking-widest",
                                                                children: cat.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/TournamentApp.js",
                                                                lineNumber: 670,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-500 mt-2 font-medium",
                                                                children: cat.current_step === "bracket" ? "Ver Cuadro y Resultados" : "Pendiente de Sorteo"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/TournamentApp.js",
                                                                lineNumber: 671,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, cat.id, true, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 669,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 664,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 662,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 658,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-4 bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col h-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-light text-white mb-6 border-b border-gray-800 pb-3",
                                        children: [
                                            "Calendario de ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-red-500",
                                                children: "Partidos"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 681,
                                                columnNumber: 110
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 681,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-3 flex-grow overflow-y-auto max-h-[600px] custom-scrollbar pr-2",
                                        children: courts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500 italic text-center py-10",
                                            children: "Próximamente horarios de cada cancha..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TournamentApp.js",
                                            lineNumber: 684,
                                            columnNumber: 19
                                        }, this) : courts.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-center bg-gray-950 p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-bold text-gray-200",
                                                        children: c.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 688,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setActiveCourtId(c.id);
                                                            setView("court_schedule");
                                                        },
                                                        className: "bg-red-600/10 text-red-500 border border-red-600/20 px-3 py-1.5 rounded text-xs font-bold transition-colors hover:bg-red-600 hover:text-gray-900",
                                                        children: "Ver Partidos"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 689,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, c.id, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 687,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 682,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 680,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 656,
                        columnNumber: 11
                    }, this),
                    mode === "public" && view === "players" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-fade-up max-w-7xl mx-auto flex flex-col md:flex-row gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:w-64 flex-shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl font-title text-white mb-6 border-b border-gray-800 pb-4 uppercase tracking-widest",
                                        children: [
                                            "Jugadores ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-red-500",
                                                children: "Confirmados"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 707,
                                                columnNumber: 136
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 707,
                                        columnNumber: 18
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex overflow-x-auto md:flex-col gap-3 pb-4 md:pb-0 custom-scrollbar",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setPublicPlayersCatId("all"),
                                                className: `whitespace-nowrap px-5 py-4 rounded-xl border text-sm font-bold transition-all shadow-lg text-left ${publicPlayersCatId === "all" ? "bg-red-600/10 border-red-500 text-red-500" : "bg-gray-950/80 backdrop-blur-md border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white"}`,
                                                children: "TODAS LAS CATEGORÍAS"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 710,
                                                columnNumber: 21
                                            }, this),
                                            categories.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setPublicPlayersCatId(c.id),
                                                    className: `whitespace-nowrap px-5 py-4 rounded-xl border text-sm font-bold transition-all shadow-lg text-left ${publicPlayersCatId === c.id ? "bg-red-600/10 border-red-500 text-red-500" : "bg-gray-950/80 backdrop-blur-md border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white"}`,
                                                    children: c.name.toUpperCase()
                                                }, c.id, false, {
                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                    lineNumber: 717,
                                                    columnNumber: 24
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 709,
                                        columnNumber: 18
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 706,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: (()=>{
                                    const filteredPlayers = publicPlayersCatId === "all" ? players : players.filter((p)=>p.category_id === publicPlayersCatId);
                                    if (filteredPlayers.length === 0) {
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-950/80 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-xl text-center mt-4 md:mt-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-400 font-bold uppercase tracking-widest text-sm",
                                                children: "No hay jugadores confirmados para esta selección."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 736,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TournamentApp.js",
                                            lineNumber: 735,
                                            columnNumber: 23
                                        }, this);
                                    }
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 md:mt-0",
                                        children: filteredPlayers.map((p)=>{
                                            const catName = categories.find((c)=>c.id === p.category_id)?.name || p.categories?.name || 'Sin Categoría';
                                            const isExpanded = expandedPair === p.id;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col relative mb-4",
                                                children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-2 animate-fade-up",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-gray-950/80 backdrop-blur-md border border-red-600/50 rounded-xl p-4 flex items-center gap-4 shadow-[0_0_15px_rgba(0,212,255,0.1)]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-12 h-12 rounded-full bg-gray-900 border-2 border-red-600 flex items-center justify-center text-red-500 font-bold text-lg",
                                                                    children: p.name.charAt(0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                                    lineNumber: 752,
                                                                    columnNumber: 38
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-bold text-white text-base uppercase",
                                                                    children: p.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                                    lineNumber: 753,
                                                                    columnNumber: 38
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                            lineNumber: 751,
                                                            columnNumber: 34
                                                        }, this),
                                                        p.partner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-xl p-4 flex items-center gap-4 shadow-lg ml-6 relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute -left-6 top-1/2 w-6 h-px bg-gray-700"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                                    lineNumber: 757,
                                                                    columnNumber: 40
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute -left-6 bottom-1/2 w-px h-[calc(50%+1rem)] bg-gray-700"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                                    lineNumber: 758,
                                                                    columnNumber: 40
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-10 h-10 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center text-gray-400 font-bold",
                                                                    children: p.partner.charAt(0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                                    lineNumber: 759,
                                                                    columnNumber: 40
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-bold text-gray-300 text-sm uppercase",
                                                                    children: p.partner
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                                    lineNumber: 760,
                                                                    columnNumber: 40
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                            lineNumber: 756,
                                                            columnNumber: 36
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setExpandedPair(null),
                                                            className: "text-[10px] text-gray-400 hover:text-red-500 mt-2 uppercase tracking-widest flex items-center gap-1 w-max",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "w-3 h-3",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    viewBox: "0 0 24 24",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: "2",
                                                                        d: "M5 15l7-7 7 7"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                                        lineNumber: 764,
                                                                        columnNumber: 115
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                                    lineNumber: 764,
                                                                    columnNumber: 36
                                                                }, this),
                                                                "Ocultar Pareja"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                            lineNumber: 763,
                                                            columnNumber: 34
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                    lineNumber: 750,
                                                    columnNumber: 31
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    onClick: ()=>setExpandedPair(p.id),
                                                    className: "relative cursor-pointer group h-28 w-full",
                                                    children: [
                                                        p.partner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute top-2 left-2 right-[-8px] bottom-[-8px] bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl transition-all duration-300 group-hover:top-3 group-hover:left-3 shadow-md opacity-80 flex items-end justify-end p-3",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-500 font-title text-sm tracking-widest uppercase truncate max-w-[150px]",
                                                                children: p.partner
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/TournamentApp.js",
                                                                lineNumber: 776,
                                                                columnNumber: 39
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                            lineNumber: 775,
                                                            columnNumber: 36
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 bg-gray-950/90 backdrop-blur-md border border-gray-700 rounded-xl flex flex-col justify-center p-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1 shadow-xl",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "text-sm font-bold text-white uppercase truncate",
                                                                    children: p.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                                    lineNumber: 781,
                                                                    columnNumber: 38
                                                                }, this),
                                                                p.partner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "text-sm font-bold text-gray-400 uppercase truncate mt-0.5",
                                                                    children: [
                                                                        "& ",
                                                                        p.partner
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                                    lineNumber: 782,
                                                                    columnNumber: 52
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-auto pt-3",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "inline-block bg-red-600/10 text-red-500 text-[9px] uppercase tracking-widest px-2 py-1 rounded border border-red-600/20 font-bold w-max",
                                                                        children: catName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                                        lineNumber: 785,
                                                                        columnNumber: 40
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                                    lineNumber: 784,
                                                                    columnNumber: 38
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                            lineNumber: 780,
                                                            columnNumber: 34
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                    lineNumber: 769,
                                                    columnNumber: 31
                                                }, this)
                                            }, p.id, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 748,
                                                columnNumber: 27
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 742,
                                        columnNumber: 21
                                    }, this);
                                })()
                            }, void 0, false, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 729,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 704,
                        columnNumber: 12
                    }, this),
                    mode === "admin" && view === "admin_home" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-fade-up",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-800 pb-4 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-4xl font-title text-white uppercase tracking-widest",
                                                children: [
                                                    "Panel de ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-red-500",
                                                        children: "Administración"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 806,
                                                        columnNumber: 99
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 806,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold",
                                                children: "Dashboard General - Circuito Black Pádel"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 807,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 805,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setView("admin_global_schedule"),
                                                className: "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white font-semibold py-2 px-4 rounded-lg text-xs transition-colors shadow-md flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-4 h-4",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: "2",
                                                            d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                            lineNumber: 811,
                                                            columnNumber: 98
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 811,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Gestor de Horarios"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 810,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setView("admin_payments"),
                                                className: "bg-red-600/10 text-red-500 border border-red-600/20 hover:bg-red-600 hover:text-gray-900 font-semibold py-2 px-4 rounded-lg text-xs transition-colors shadow-md flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-4 h-4",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: "2",
                                                            d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                            lineNumber: 815,
                                                            columnNumber: 98
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 815,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Inscripciones"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 814,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleAutoPilot,
                                                className: "bg-pink-500/10 text-pink-400 border border-pink-500/20 hover:bg-pink-500 hover:text-white font-semibold py-2 px-4 rounded-lg text-xs transition-colors shadow-md flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-4 h-4",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: "2",
                                                            d: "M13 10V3L4 14h7v7l9-11h-7z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                            lineNumber: 819,
                                                            columnNumber: 98
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 819,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Piloto Automático"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 818,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setView("admin_players"),
                                                className: "bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg text-xs transition-colors border border-gray-600 shadow-md flex items-center gap-2 hidden md:flex",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-4 h-4",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: "2",
                                                            d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                            lineNumber: 823,
                                                            columnNumber: 98
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 823,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Jugadores"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 822,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 809,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 804,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4 shadow-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-12 h-12 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-6 h-6",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: "2",
                                                        d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 833,
                                                        columnNumber: 99
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                    lineNumber: 833,
                                                    columnNumber: 20
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 832,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-500 text-[10px] uppercase tracking-widest font-bold",
                                                        children: "Total Jugadores"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 836,
                                                        columnNumber: 20
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-2xl font-bold text-white",
                                                        children: players.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 837,
                                                        columnNumber: 20
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 835,
                                                columnNumber: 18
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 831,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4 shadow-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-12 h-12 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-6 h-6",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: "2",
                                                        d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 842,
                                                        columnNumber: 99
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                    lineNumber: 842,
                                                    columnNumber: 20
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 841,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-500 text-[10px] uppercase tracking-widest font-bold",
                                                        children: "Categorías Activas"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 845,
                                                        columnNumber: 20
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-2xl font-bold text-white",
                                                        children: categories.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 846,
                                                        columnNumber: 20
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 844,
                                                columnNumber: 18
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 840,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4 shadow-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-12 h-12 bg-white/20 text-gray-300 rounded-full flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-6 h-6",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: "2",
                                                        d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 851,
                                                        columnNumber: 99
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                    lineNumber: 851,
                                                    columnNumber: 20
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 850,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-500 text-[10px] uppercase tracking-widest font-bold",
                                                        children: "Canchas Habilitadas"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 854,
                                                        columnNumber: 20
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-2xl font-bold text-white",
                                                        children: courts.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 855,
                                                        columnNumber: 20
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 853,
                                                columnNumber: 18
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 849,
                                        columnNumber: 16
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 830,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-center mb-6 border-b border-gray-800 pb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-bold text-white",
                                                        children: "Categorías del Torneo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 864,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "bg-red-600 text-gray-900 hover:bg-red-500 font-bold py-1.5 px-3 rounded text-[10px] uppercase tracking-widest transition-colors shadow-lg",
                                                        onClick: handleAddCategory,
                                                        children: "+ Nueva Categoría"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 865,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 863,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-4 mb-4 overflow-y-auto max-h-[500px] custom-scrollbar pr-2",
                                                children: [
                                                    categories.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-500 text-sm italic",
                                                        children: "No hay categorías. Crea una nueva."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 870,
                                                        columnNumber: 49
                                                    }, this),
                                                    categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col bg-gray-950 border border-gray-800 p-4 rounded-xl group hover:border-gray-700 transition-colors",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex justify-between items-start mb-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-white font-bold text-lg",
                                                                                    children: cat.name
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                                                    lineNumber: 875,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center gap-2 mt-1",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-[10px] font-bold text-red-500 bg-red-950/30 px-2 py-0.5 rounded border border-red-900 uppercase tracking-widest",
                                                                                            children: [
                                                                                                cat.num_pairs,
                                                                                                " Parejas"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                                                            lineNumber: 877,
                                                                                            columnNumber: 33
                                                                                        }, this),
                                                                                        cat.current_step === 'bracket' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-[10px] font-bold text-gray-300 bg-gray-800/30 px-2 py-0.5 rounded border border-gray-700 uppercase tracking-widest",
                                                                                            children: "Cuadro Activo"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                                                            lineNumber: 878,
                                                                                            columnNumber: 68
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                                                    lineNumber: 876,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                                            lineNumber: 874,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>handleDeleteCategory(cat.id, cat.name),
                                                                            className: "text-gray-600 hover:text-red-400 p-1 transition-colors",
                                                                            title: "Eliminar Categoría",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                className: "w-5 h-5",
                                                                                fill: "none",
                                                                                stroke: "currentColor",
                                                                                viewBox: "0 0 24 24",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                    strokeLinecap: "round",
                                                                                    strokeLinejoin: "round",
                                                                                    strokeWidth: "2",
                                                                                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                                                    lineNumber: 882,
                                                                                    columnNumber: 110
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/TournamentApp.js",
                                                                                lineNumber: 882,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                                            lineNumber: 881,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                                    lineNumber: 873,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>{
                                                                                setActiveCatId(cat.id);
                                                                                setView("admin_setup");
                                                                            },
                                                                            className: "flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs py-2 rounded-lg border border-gray-700 transition-colors",
                                                                            children: "Gestionar Cuadro"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                                            lineNumber: 886,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>{
                                                                                setActiveCatId(cat.id);
                                                                                setView("bracket");
                                                                            },
                                                                            className: `flex-1 font-semibold text-xs py-2 rounded-lg border transition-colors ${cat.current_step === 'bracket' ? 'bg-red-600/10 hover:bg-red-600/20 text-red-500 border-red-600/30' : 'bg-gray-900 text-gray-700 border-gray-800 cursor-not-allowed'}`,
                                                                            disabled: cat.current_step !== 'bracket',
                                                                            children: "Ver Resultados"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                                            lineNumber: 887,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                                    lineNumber: 885,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, cat.id, true, {
                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                            lineNumber: 872,
                                                            columnNumber: 24
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 869,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 862,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col h-fit",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-center mb-6 border-b border-gray-800 pb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-bold text-white",
                                                        children: "Canchas Habilitadas"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 903,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "bg-white text-gray-900 hover:bg-gray-300 font-bold py-1.5 px-3 rounded text-[10px] uppercase tracking-widest transition-colors shadow-lg",
                                                        onClick: handleAddCourt,
                                                        children: "+ Agregar Cancha"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 904,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 902,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-3 mb-4 overflow-y-auto max-h-[350px] custom-scrollbar pr-2",
                                                children: [
                                                    courts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-500 text-sm italic",
                                                        children: "No hay canchas registradas."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TournamentApp.js",
                                                        lineNumber: 909,
                                                        columnNumber: 45
                                                    }, this),
                                                    courts.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between items-center bg-gray-950 border border-gray-800 p-4 rounded-xl group hover:border-gray-700 transition-colors",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 border border-gray-700",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                className: "w-4 h-4",
                                                                                fill: "none",
                                                                                stroke: "currentColor",
                                                                                viewBox: "0 0 24 24",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                    strokeLinecap: "round",
                                                                                    strokeLinejoin: "round",
                                                                                    strokeWidth: "2",
                                                                                    d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                                                    lineNumber: 914,
                                                                                    columnNumber: 111
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/TournamentApp.js",
                                                                                lineNumber: 914,
                                                                                columnNumber: 32
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                                            lineNumber: 913,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-white font-bold",
                                                                            children: c.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                                            lineNumber: 916,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                                    lineNumber: 912,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>{
                                                                                setActiveCourtId(c.id);
                                                                                setView("court_schedule");
                                                                            },
                                                                            className: "bg-white/10 text-gray-300 border border-white/20 px-3 py-1.5 rounded text-xs font-bold transition-colors hover:bg-white hover:text-gray-900",
                                                                            children: "Turnos"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                                            lineNumber: 919,
                                                                            columnNumber: 30
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>handleDeleteCourt(c.id, c.name),
                                                                            className: "bg-red-900/10 text-red-400 hover:bg-red-900/40 border border-red-900/20 p-1.5 rounded transition-colors",
                                                                            title: "Eliminar Cancha",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                className: "w-4 h-4",
                                                                                fill: "none",
                                                                                stroke: "currentColor",
                                                                                viewBox: "0 0 24 24",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                    strokeLinecap: "round",
                                                                                    strokeLinejoin: "round",
                                                                                    strokeWidth: "2",
                                                                                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                                                    lineNumber: 926,
                                                                                    columnNumber: 112
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/TournamentApp.js",
                                                                                lineNumber: 926,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                                            lineNumber: 925,
                                                                            columnNumber: 30
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/TournamentApp.js",
                                                                    lineNumber: 918,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, c.id, true, {
                                                            fileName: "[project]/src/components/TournamentApp.js",
                                                            lineNumber: 911,
                                                            columnNumber: 24
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 908,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 901,
                                        columnNumber: 16
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 860,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 803,
                        columnNumber: 11
                    }, this),
                    mode === "admin" && view === "admin_players" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdminPlayers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        players: players,
                        categories: categories,
                        onBack: ()=>setView("admin_home"),
                        onPlayersUpdate: handlePlayersUpdate,
                        showToast: showToast
                    }, void 0, false, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 938,
                        columnNumber: 11
                    }, this),
                    mode === "admin" && view === "admin_payments" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdminPayments$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        players: players,
                        categories: categories,
                        onBack: ()=>setView("admin_home"),
                        onPlayersUpdate: handlePlayersUpdate,
                        showToast: showToast
                    }, void 0, false, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 948,
                        columnNumber: 11
                    }, this),
                    mode === "admin" && view === "admin_global_schedule" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AdminGlobalScheduleSetup, {
                        matches: matches,
                        categories: categories,
                        courts: courts,
                        onBack: ()=>setView("admin_home"),
                        onGenerateGlobal: handleGenerateGlobalSchedule
                    }, void 0, false, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 958,
                        columnNumber: 11
                    }, this),
                    mode === "admin" && view === "admin_setup" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AdminSetup, {
                        category: categories.find((c)=>c.id === activeCatId),
                        players: players,
                        courts: courts,
                        onBack: async (action)=>{
                            if (action === 'view_bracket') {
                                setView('bracket');
                            } else if (action === 'delete_bracket') {
                                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteMatchesByCategory"])(activeCatId);
                                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateCategory"])(activeCatId, {
                                    current_step: 'registration'
                                });
                                setCategories(categories.map((c)=>c.id === activeCatId ? {
                                        ...c,
                                        current_step: 'registration'
                                    } : c));
                                const fetchedMatches = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMatches"])();
                                setMatches(fetchedMatches);
                                showToast("Cuadro eliminado con éxito");
                            } else {
                                setView("admin_home");
                            }
                        },
                        onGenerate: handleGenerateTournament
                    }, void 0, false, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 968,
                        columnNumber: 11
                    }, this),
                    view === "bracket" && activeCatId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BracketView$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        category: categories.find((c)=>c.id === activeCatId),
                        allMatches: matches,
                        courts: courts,
                        mode: mode,
                        onBack: ()=>setView(mode === "admin" ? "admin_home" : "home"),
                        onMatchUpdate: handleMatchUpdate
                    }, void 0, false, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 991,
                        columnNumber: 11
                    }, this),
                    view === "court_schedule" && activeCourtId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CourtSchedule$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        court: courts.find((c)=>c.id === activeCourtId),
                        matches: matches,
                        categories: categories,
                        onBack: ()=>setView(mode === "admin" ? "admin_home" : "home")
                    }, void 0, false, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 1002,
                        columnNumber: 11
                    }, this),
                    mode === "public" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "mt-16 pt-8 border-t border-gray-800/50 flex flex-col items-center justify-center text-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-gray-500 text-xs font-medium tracking-wide",
                                children: [
                                    "Diseñado y desarrollado para ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-white",
                                        children: "Black Pádel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 1013,
                                        columnNumber: 44
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 1012,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "https://www.instagram.com/heythia_/",
                                        target: "_blank",
                                        rel: "noreferrer",
                                        className: "text-gray-400 hover:text-red-500 transition-colors",
                                        title: "Instagram",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-5 h-5",
                                            fill: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                fillRule: "evenodd",
                                                d: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
                                                clipRule: "evenodd"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 1017,
                                                columnNumber: 82
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TournamentApp.js",
                                            lineNumber: 1017,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 1016,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "https://www.linkedin.com/in/thiago-lopez-284507219",
                                        target: "_blank",
                                        rel: "noreferrer",
                                        className: "text-gray-400 hover:text-red-500 transition-colors",
                                        title: "LinkedIn",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-5 h-5",
                                            fill: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                fillRule: "evenodd",
                                                d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
                                                clipRule: "evenodd"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TournamentApp.js",
                                                lineNumber: 1020,
                                                columnNumber: 82
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TournamentApp.js",
                                            lineNumber: 1020,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TournamentApp.js",
                                        lineNumber: 1019,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 1015,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] text-gray-600 font-bold tracking-widest uppercase",
                                children: "Circuito Black Pádel v2.0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 1023,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 1011,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TournamentApp.js",
                lineNumber: 641,
                columnNumber: 7
            }, this),
            promptConfig && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UIComponents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PromptModal"], {
                title: promptConfig.title,
                placeholder: promptConfig.placeholder,
                onConfirm: promptConfig.onConfirm,
                onCancel: ()=>setPromptConfig(null)
            }, void 0, false, {
                fileName: "[project]/src/components/TournamentApp.js",
                lineNumber: 1032,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UIComponents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toast"], {
                message: toastMessage,
                onClose: ()=>setToastMessage("")
            }, void 0, false, {
                fileName: "[project]/src/components/TournamentApp.js",
                lineNumber: 1040,
                columnNumber: 7
            }, this),
            mode === "public" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-800 flex justify-between px-8 py-3 z-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setView("home"),
                        className: `flex flex-col items-center gap-1 transition-colors ${view === "home" ? "text-red-500" : "text-gray-500 hover:text-gray-300"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: "2",
                                    d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TournamentApp.js",
                                    lineNumber: 1045,
                                    columnNumber: 94
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 1045,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-bold uppercase tracking-widest",
                                children: "Torneo"
                            }, void 0, false, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 1046,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 1044,
                        columnNumber: 12
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setView("home"),
                        className: "flex flex-col items-center justify-center transform -translate-y-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/logo.png",
                                alt: "Black Club",
                                className: "h-6 w-auto"
                            }, void 0, false, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 1050,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/TournamentApp.js",
                            lineNumber: 1049,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 1048,
                        columnNumber: 12
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setView("players"),
                        className: `flex flex-col items-center gap-1 transition-colors ${view === "players" ? "text-red-500" : "text-gray-500 hover:text-gray-300"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: "2",
                                    d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TournamentApp.js",
                                    lineNumber: 1054,
                                    columnNumber: 94
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 1054,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-bold uppercase tracking-widest",
                                children: "Jugadores"
                            }, void 0, false, {
                                fileName: "[project]/src/components/TournamentApp.js",
                                lineNumber: 1055,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TournamentApp.js",
                        lineNumber: 1053,
                        columnNumber: 12
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TournamentApp.js",
                lineNumber: 1043,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TournamentApp.js",
        lineNumber: 574,
        columnNumber: 5
    }, this);
}
_s2(TournamentApp, "ZQ0fuelbsQHeJpCu5VtXztzxzu8=");
_c2 = TournamentApp;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "AdminGlobalScheduleSetup");
__turbopack_context__.k.register(_c1, "AdminSetup");
__turbopack_context__.k.register(_c2, "TournamentApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/UIComponents.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PromptModal",
    ()=>PromptModal,
    "Toast",
    ()=>Toast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function PromptModal({ title, placeholder, onConfirm, onCancel }) {
    _s();
    const [value, setValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (value.trim()) onConfirm(value.trim());
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-up",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 border-b border-gray-800",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold text-white",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/UIComponents.js",
                        lineNumber: 17,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/UIComponents.js",
                    lineNumber: 16,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "p-6 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: value,
                            onChange: (e)=>setValue(e.target.value),
                            className: "w-full bg-gray-950 border border-gray-800 rounded p-3 text-white outline-none focus:border-red-600 transition-colors",
                            placeholder: placeholder,
                            autoFocus: true
                        }, void 0, false, {
                            fileName: "[project]/src/components/UIComponents.js",
                            lineNumber: 20,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end gap-3 pt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onCancel,
                                    className: "px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-bold",
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/UIComponents.js",
                                    lineNumber: 29,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-bold transition-colors",
                                    children: "Guardar"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/UIComponents.js",
                                    lineNumber: 32,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/UIComponents.js",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/UIComponents.js",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/UIComponents.js",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/UIComponents.js",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(PromptModal, "dBtK6I2q1m3rcfzPBa0nrbv/iCI=");
_c = PromptModal;
function Toast({ message, onClose }) {
    if (!message) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-4 right-4 z-[60] bg-gray-900 border border-red-600/50 shadow-lg rounded-lg p-4 flex items-center gap-3 animate-fade-up",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center text-red-500",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: "M5 13l4 4L19 7"
                    }, void 0, false, {
                        fileName: "[project]/src/components/UIComponents.js",
                        lineNumber: 47,
                        columnNumber: 88
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/UIComponents.js",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/UIComponents.js",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-white text-sm font-medium",
                children: message
            }, void 0, false, {
                fileName: "[project]/src/components/UIComponents.js",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClose,
                className: "ml-2 text-gray-500 hover:text-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: "M6 18L18 6M6 6l12 12"
                    }, void 0, false, {
                        fileName: "[project]/src/components/UIComponents.js",
                        lineNumber: 51,
                        columnNumber: 88
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/UIComponents.js",
                    lineNumber: 51,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/UIComponents.js",
                lineNumber: 50,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/UIComponents.js",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c1 = Toast;
var _c, _c1;
__turbopack_context__.k.register(_c, "PromptModal");
__turbopack_context__.k.register(_c1, "Toast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/supabase.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://zbyspaglbpiflqatxqjn.supabase.co");
const supabaseKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieXNwYWdsYnBpZmxxYXR4cWpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzMDE2MjgsImV4cCI6MjEwNjg3NzYyOH0.DBn2BEUVhW_lg9pcIgHZdDSi5PBAb1R7jGszbIopvrA");
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseKey);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/supabaseService.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addCategory",
    ()=>addCategory,
    "addCourt",
    ()=>addCourt,
    "addPlayer",
    ()=>addPlayer,
    "deleteCategory",
    ()=>deleteCategory,
    "deleteCourt",
    ()=>deleteCourt,
    "deleteMatchesByCategory",
    ()=>deleteMatchesByCategory,
    "deletePlayer",
    ()=>deletePlayer,
    "getCategories",
    ()=>getCategories,
    "getCourts",
    ()=>getCourts,
    "getMatches",
    ()=>getMatches,
    "getPlayers",
    ()=>getPlayers,
    "getSession",
    ()=>getSession,
    "loginAdmin",
    ()=>loginAdmin,
    "logoutAdmin",
    ()=>logoutAdmin,
    "saveGeneratedMatches",
    ()=>saveGeneratedMatches,
    "updateCategory",
    ()=>updateCategory,
    "updateMatch",
    ()=>updateMatch,
    "updatePlayer",
    ()=>updatePlayer,
    "updatePlayerPayment",
    ()=>updatePlayerPayment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.js [app-client] (ecmascript)");
;
async function loginAdmin(email, password) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithPassword({
        email,
        password
    });
    if (error) throw error;
    return data;
}
async function logoutAdmin() {
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
    if (error) throw error;
}
async function getSession() {
    const { data: { session } } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
    return session;
}
async function getCategories() {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('categories').select('*').order('created_at', {
        ascending: true
    });
    if (error) console.error("Error fetching categories:", error);
    return data || [];
}
async function addCategory(name, numPairs = 6) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('categories').insert([
        {
            name,
            num_pairs: numPairs
        }
    ]).select();
    if (error) console.error("Error adding category:", error);
    return data ? data[0] : null;
}
async function deleteCategory(id) {
    // Primero borramos los partidos y jugadores para evitar errores de llave foránea (si no hay CASCADE)
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('matches').delete().eq('category_id', id);
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('players').delete().eq('category_id', id);
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('categories').delete().eq('id', id);
    if (error) console.error("Error deleting category:", error);
    return !error;
}
async function getCourts() {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('courts').select('*').order('created_at', {
        ascending: true
    });
    if (error) console.error("Error fetching courts:", error);
    return data || [];
}
async function addCourt(name) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('courts').insert([
        {
            name
        }
    ]).select();
    if (error) console.error("Error adding court:", error);
    return data ? data[0] : null;
}
async function deleteCourt(id) {
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('courts').delete().eq('id', id);
    if (error) console.error("Error deleting court:", error);
    return !error;
}
async function getPlayers() {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('players').select('*, categories(name)').order('created_at', {
        ascending: false
    });
    if (error) console.error("Error fetching players:", error);
    return data || [];
}
async function addPlayer(playerData) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('players').insert([
        playerData
    ]).select();
    if (error) console.error("Error adding player:", error);
    return data ? data[0] : null;
}
async function updatePlayer(id, playerData) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('players').update(playerData).eq('id', id).select();
    if (error) console.error("Error updating player:", error);
    return data ? data[0] : null;
}
async function deletePlayer(id) {
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('players').delete().eq('id', id);
    if (error) console.error("Error deleting player:", error);
    return !error;
}
async function getMatches() {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('matches').select('*').order('match_date', {
        ascending: true
    }).order('match_time', {
        ascending: true
    });
    if (error) console.error("Error fetching matches:", error);
    return data || [];
}
async function saveGeneratedMatches(matchesArray) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('matches').insert(matchesArray).select();
    if (error) console.error("Error saving generated matches:", error);
    return data || [];
}
async function deleteMatchesByCategory(categoryId) {
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('matches').delete().eq('category_id', categoryId);
    if (error) console.error("Error deleting old matches:", error);
    return !error;
}
async function updateCategory(id, updates) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('categories').update(updates).eq('id', id).select();
    if (error) console.error("Error updating category:", error);
    return data ? data[0] : null;
}
async function updateMatch(id, updates) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('matches').update(updates).eq('id', id).select();
    if (error) console.error("Error updating match:", error);
    return data ? data[0] : null;
}
async function updatePlayerPayment(playerId, hasPaid) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('players').update({
        has_paid: hasPaid
    }).eq('id', playerId).select();
    if (error) {
        console.error("Error updating player payment:", error);
        return null;
    }
    return data[0];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/tournamentLogic.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BRACKET_MAPS",
    ()=>BRACKET_MAPS,
    "advanceWinner",
    ()=>advanceWinner,
    "createEmptyScore",
    ()=>createEmptyScore,
    "generateGlobalSchedule",
    ()=>generateGlobalSchedule,
    "generateTournamentMatches",
    ()=>generateTournamentMatches,
    "getRoundNames",
    ()=>getRoundNames
]);
const BRACKET_MAPS = {
    6: [
        'WA',
        'BYE',
        'WC',
        'LB',
        'WB',
        'BYE',
        'LC',
        'LA'
    ],
    8: [
        'WA',
        'LB',
        'WC',
        'LD',
        'WB',
        'LC',
        'WD',
        'LA'
    ],
    10: [
        'WA',
        'BYE',
        'WE',
        'BYE',
        'WC',
        'BYE',
        'LD',
        'LB',
        'WB',
        'BYE',
        'LE',
        'LC',
        'WD',
        'BYE',
        'LA',
        'BYE'
    ],
    12: [
        'WA',
        'BYE',
        'WE',
        'LF',
        'WC',
        'BYE',
        'LD',
        'LB',
        'WB',
        'BYE',
        'WF',
        'LC',
        'WD',
        'BYE',
        'LE',
        'LA'
    ],
    14: [
        'WA',
        'BYE',
        'WE',
        'LF',
        'WC',
        'LD',
        'WG',
        'LB',
        'WB',
        'BYE',
        'WF',
        'LC',
        'WD',
        'LE',
        'LG',
        'LA'
    ],
    16: [
        'WA',
        'LB',
        'WE',
        'LF',
        'WC',
        'LD',
        'WG',
        'LH',
        'WB',
        'LC',
        'WF',
        'LE',
        'WD',
        'LG',
        'WH',
        'LA'
    ],
    18: [
        'WA',
        'BYE',
        'LF',
        'LH',
        'WE',
        'BYE',
        'LB',
        'BYE',
        'WC',
        'BYE',
        'LD',
        'BYE',
        'WG',
        'BYE',
        'WI',
        'BYE',
        'WB',
        'BYE',
        'LI',
        'LA',
        'WF',
        'BYE',
        'LC',
        'BYE',
        'WD',
        'BYE',
        'LE',
        'BYE',
        'WH',
        'BYE',
        'LG',
        'BYE'
    ],
    20: [
        'WA',
        'BYE',
        'LD',
        'LF',
        'WE',
        'BYE',
        'LB',
        'BYE',
        'WC',
        'BYE',
        'LH',
        'LJ',
        'WG',
        'BYE',
        'WI',
        'BYE',
        'WB',
        'BYE',
        'LE',
        'LG',
        'WF',
        'BYE',
        'LC',
        'BYE',
        'WD',
        'BYE',
        'LI',
        'LA',
        'WH',
        'BYE',
        'WJ',
        'BYE'
    ],
    22: [
        'WA',
        'BYE',
        'LD',
        'LF',
        'WG',
        'BYE',
        'WK',
        'LB',
        'WC',
        'BYE',
        'LH',
        'LJ',
        'WE',
        'BYE',
        'WI',
        'BYE',
        'WB',
        'BYE',
        'LC',
        'LE',
        'WF',
        'BYE',
        'LG',
        'LI',
        'WD',
        'BYE',
        'LK',
        'LA',
        'WH',
        'BYE',
        'WJ',
        'BYE'
    ],
    24: [
        'WA',
        'BYE',
        'LF',
        'LH',
        'WE',
        'BYE',
        'WI',
        'LB',
        'WC',
        'BYE',
        'LJ',
        'LL',
        'WG',
        'BYE',
        'WK',
        'LD',
        'WB',
        'BYE',
        'LG',
        'LI',
        'WF',
        'BYE',
        'WJ',
        'LC',
        'WD',
        'BYE',
        'LK',
        'LA',
        'WH',
        'BYE',
        'WL',
        'LE'
    ],
    26: [
        'WA',
        'BYE',
        'LJ',
        'LL',
        'WE',
        'BYE',
        'WG',
        'LB',
        'WC',
        'BYE',
        'WI',
        'LD',
        'WK',
        'LF',
        'WM',
        'LH',
        'WB',
        'BYE',
        'LI',
        'LK',
        'WF',
        'BYE',
        'WH',
        'LC',
        'WD',
        'BYE',
        'LM',
        'LA',
        'WJ',
        'LE',
        'WL',
        'LG'
    ],
    28: [
        'WA',
        'BYE',
        'LL',
        'LN',
        'WE',
        'LB',
        'WG',
        'LD',
        'WC',
        'BYE',
        'WI',
        'LF',
        'WK',
        'LH',
        'WM',
        'LJ',
        'WB',
        'BYE',
        'LM',
        'LA',
        'WF',
        'LC',
        'WH',
        'LE',
        'WD',
        'BYE',
        'WJ',
        'LG',
        'WL',
        'LI',
        'WN',
        'LK'
    ],
    30: [
        'WA',
        'BYE',
        'LL',
        'WE',
        'WI',
        'LH',
        'LD',
        'WM',
        'WC',
        'LN',
        'LJ',
        'WG',
        'WK',
        'LF',
        'LB',
        'WO',
        'WB',
        'BYE',
        'LK',
        'WF',
        'WJ',
        'LG',
        'LC',
        'WN',
        'WD',
        'LM',
        'LI',
        'WH',
        'WL',
        'LE',
        'LA',
        'LO'
    ],
    32: [
        'WA',
        'LP',
        'LL',
        'WE',
        'WI',
        'LH',
        'LD',
        'WM',
        'WC',
        'LN',
        'LJ',
        'WG',
        'WK',
        'LF',
        'LB',
        'WO',
        'WB',
        'LO',
        'LK',
        'WF',
        'WJ',
        'LG',
        'LC',
        'WN',
        'WD',
        'LM',
        'LI',
        'WH',
        'WL',
        'LE',
        'LA',
        'WP'
    ]
};
function getRoundNames(numRounds) {
    if (numRounds === 3) return [
        'Cuartos',
        'Semis',
        'Final'
    ];
    if (numRounds === 4) return [
        'Octavos',
        'Cuartos',
        'Semis',
        'Final'
    ];
    if (numRounds === 5) return [
        '16avos',
        'Octavos',
        'Cuartos',
        'Semis',
        'Final'
    ];
    return [
        'Ronda 1',
        'Ronda 2',
        'Ronda 3',
        'Ronda 4',
        'Ronda 5'
    ];
}
function createEmptyScore() {
    return {
        p1: [
            '',
            '',
            ''
        ],
        p2: [
            '',
            '',
            ''
        ]
    };
}
function generateTournamentMatches(categoryId, numPairs, pairsList, isRandom) {
    let pairs = [
        ...pairsList
    ];
    if (isRandom) {
        for(let i = pairs.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [pairs[i], pairs[j]] = [
                pairs[j],
                pairs[i]
            ];
        }
    }
    let generatedMatches = [];
    // 1. ZONAS
    let pairIndex = 0;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numZones = numPairs / 2;
    for(let i = 0; i < numZones; i++){
        let p1 = pairs[pairIndex++];
        let p2 = pairs[pairIndex++];
        let autoWinner = null;
        let isComplete = false;
        if (p1 === 'BYE' && p2 !== 'BYE') {
            autoWinner = p2;
            isComplete = true;
        } else if (p2 === 'BYE' && p1 !== 'BYE') {
            autoWinner = p1;
            isComplete = true;
        } else if (p1 === 'BYE' && p2 === 'BYE') {
            autoWinner = 'BYE';
            isComplete = true;
        }
        generatedMatches.push({
            category_id: categoryId,
            match_type: 'ZONE',
            round_name: 'ZONA ' + alphabet[i],
            round_index: 0,
            match_index: i,
            p1_name: p1,
            p2_name: p2,
            winner: autoWinner,
            is_wo: isComplete,
            is_bye: p1 === 'BYE' || p2 === 'BYE'
        });
    }
    // 2. BRACKET (First Round)
    let mapTemplate = BRACKET_MAPS[numPairs];
    let numRounds = Math.log2(mapTemplate.length);
    let rNames = getRoundNames(numRounds);
    for(let i = 0; i < mapTemplate.length; i += 2){
        let p1Code = mapTemplate[i];
        let p2Code = mapTemplate[i + 1];
        let mIndex = i / 2;
        let matchLetter = String.fromCharCode(65 + mIndex);
        let matchId = rNames[0] + ' ' + matchLetter;
        let formatSource = (code)=>{
            if (!code || code === 'BYE') return 'BYE';
            if (code.startsWith('W')) return `Zona ${code.substring(1)} 1º`;
            if (code.startsWith('L')) return `Zona ${code.substring(1)} 2º`;
            return code;
        };
        generatedMatches.push({
            category_id: categoryId,
            match_type: 'BRACKET',
            round_name: matchId,
            round_index: 1,
            match_index: mIndex,
            p1_name: formatSource(p1Code),
            p2_name: formatSource(p2Code),
            is_bye: p1Code === 'BYE' || p2Code === 'BYE'
        });
    }
    // Bracket subsequent rounds can be generated dynamically or pre-generated empty
    // Let's pre-generate them empty for simplicity
    let currentRoundCount = mapTemplate.length / 2;
    let rIndex = 2;
    while(currentRoundCount > 1){
        currentRoundCount = currentRoundCount / 2;
        for(let i = 0; i < currentRoundCount; i++){
            let matchLetter = String.fromCharCode(65 + i);
            let matchId = rNames[rIndex - 1] + ' ' + matchLetter;
            generatedMatches.push({
                category_id: categoryId,
                match_type: 'BRACKET',
                round_name: matchId,
                round_index: rIndex,
                match_index: i,
                p1_name: null,
                p2_name: null,
                is_bye: false
            });
        }
        rIndex++;
    }
    return {
        pairs,
        generatedMatches
    };
}
function advanceWinner(matchesList, updatedMatch) {
    let updatesArray = [];
    // SI SE ACTUALIZÓ UNA ZONA
    if (updatedMatch.match_type === 'ZONE') {
        // Para una zona (ej. "ZONA A"), extraemos la letra "A"
        const zoneLetter = updatedMatch.round_name.replace('ZONA ', '').trim();
        const winnerLabel = `Zona ${zoneLetter} 1º`;
        const loserLabel = `Zona ${zoneLetter} 2º`;
        const winnerName = updatedMatch.winner;
        const loserName = updatedMatch.winner === updatedMatch.p1_name ? updatedMatch.p2_name : updatedMatch.winner === updatedMatch.p2_name ? updatedMatch.p1_name : null;
        if (!winnerName || !loserName) return [];
        // Buscar si hay partidos en el bracket que estén esperando a este ganador o perdedor
        matchesList.forEach((m)=>{
            if (m.match_type === 'BRACKET') {
                let matchUpdates = {};
                let needsUpdate = false;
                // Reemplazar Winner
                if (m.p1_name === winnerLabel) {
                    matchUpdates.p1_name = winnerName;
                    needsUpdate = true;
                }
                if (m.p2_name === winnerLabel) {
                    matchUpdates.p2_name = winnerName;
                    needsUpdate = true;
                }
                // Reemplazar Loser
                if (m.p1_name === loserLabel) {
                    matchUpdates.p1_name = loserName;
                    needsUpdate = true;
                }
                if (m.p2_name === loserLabel) {
                    matchUpdates.p2_name = loserName;
                    needsUpdate = true;
                }
                if (needsUpdate) {
                    // Chequeo de Auto-BYE
                    if (matchUpdates.p1_name && m.p2_name === 'BYE') matchUpdates.winner = matchUpdates.p1_name;
                    if (matchUpdates.p2_name && m.p1_name === 'BYE') matchUpdates.winner = matchUpdates.p2_name;
                    updatesArray.push({
                        matchId: m.id,
                        updates: matchUpdates
                    });
                }
            }
        });
        return updatesArray;
    }
    // SI SE ACTUALIZÓ EL BRACKET
    if (updatedMatch.match_type === 'BRACKET') {
        const nextRoundIndex = updatedMatch.round_index + 1;
        const nextMatchIndex = Math.floor(updatedMatch.match_index / 2);
        const isTop = updatedMatch.match_index % 2 === 0;
        const nextMatch = matchesList.find((m)=>m.category_id === updatedMatch.category_id && m.match_type === 'BRACKET' && m.round_index === nextRoundIndex && m.match_index === nextMatchIndex);
        if (!nextMatch) return []; // No hay siguiente partido (ej. Final)
        let matchUpdates = {};
        if (isTop) {
            matchUpdates.p1_name = updatedMatch.winner;
        } else {
            matchUpdates.p2_name = updatedMatch.winner;
        }
        // Auto-BYE
        if (matchUpdates.p1_name && nextMatch.p2_name === 'BYE') matchUpdates.winner = matchUpdates.p1_name;
        if (matchUpdates.p2_name && nextMatch.p1_name === 'BYE') matchUpdates.winner = matchUpdates.p2_name;
        return [
            {
                matchId: nextMatch.id,
                updates: matchUpdates
            }
        ];
    }
    return [];
}
function generateGlobalSchedule(allMatches, categories, config) {
    const { daysConfig, matchDurationMin, courts } = config;
    // 1. Determinar nivel de categoría. Buscamos el número en el nombre ("1ra" -> 1, "8va" -> 8).
    // Mientras menor sea el número, MÁS fuerte es la categoría y MÁS tarde debe jugar.
    const getCatStrength = (catId)=>{
        const cat = categories.find((c)=>c.id === catId);
        if (!cat) return 99; // Si no tiene, se asume débil
        const match = cat.name.match(/(\d+)/);
        return match ? parseInt(match[1]) : 99;
    };
    // 2. Generar "Pools" de slots disponibles basados en las fases configuradas
    let regularSlots = [];
    let semiSlots = [];
    let finalSlots = [];
    if (daysConfig && daysConfig.length > 0) {
        for (let day of daysConfig){
            let [startH, startM] = day.startTime.split(':').map(Number);
            let [endH, endM] = day.endTime.split(':').map(Number);
            let currentSlotTime = startH * 60 + startM;
            const endSlotTime = endH * 60 + endM;
            const duration = Number(matchDurationMin);
            while(currentSlotTime + duration <= endSlotTime){
                for (let court of courts){
                    let h = Math.floor(currentSlotTime / 60);
                    let m = currentSlotTime % 60;
                    let timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
                    let slot = {
                        date: day.date,
                        time: timeStr,
                        courtId: court.id,
                        datetime: new Date(`${day.date}T${timeStr}:00`)
                    };
                    if (day.phase === 'semis') semiSlots.push(slot);
                    else if (day.phase === 'finals') finalSlots.push(slot);
                    else regularSlots.push(slot); // grupos y eliminatorias previas
                }
                currentSlotTime += duration;
            }
        }
    }
    // Ordenar slots globalmente de manera cronológica
    regularSlots.sort((a, b)=>a.datetime - b.datetime);
    semiSlots.sort((a, b)=>a.datetime - b.datetime);
    finalSlots.sort((a, b)=>a.datetime - b.datetime);
    let scheduledMatches = [];
    const matchesToSchedule = allMatches.filter((m)=>!m.is_bye);
    // Función para obtener la última ronda de una categoría
    const getCatMaxRound = (catId)=>{
        const catMatches = matchesToSchedule.filter((m)=>m.category_id === catId);
        if (catMatches.length === 0) return 0;
        return Math.max(...catMatches.map((m)=>m.round_index || 0));
    };
    // 3. Asignar slots respetando Rondas y Prioridades
    const globalMaxRound = Math.max(...matchesToSchedule.map((m)=>m.round_index || 0));
    for(let r = 0; r <= globalMaxRound; r++){
        // Filtramos partidos de esta ronda particular (para respetar dependencia deportiva)
        let roundMatches = matchesToSchedule.filter((m)=>m.round_index === r);
        if (roundMatches.length === 0) continue;
        // EL TRUCO DE PRIORIDAD: Ordenar partidos.
        // Categorías débiles (números grandes, ej. 8) van primero en el array.
        // Categorías fuertes (números chicos, ej. 1) van al final.
        roundMatches.sort((a, b)=>{
            return getCatStrength(b.category_id) - getCatStrength(a.category_id);
        });
        for(let i = 0; i < roundMatches.length; i++){
            let m = roundMatches[i];
            let catMaxRound = getCatMaxRound(m.category_id);
            // Determinar qué fase es este partido para esta categoría en particular
            let phase = 'grupos';
            if (m.round_index === catMaxRound && catMaxRound > 0) phase = 'finals';
            else if (m.round_index === catMaxRound - 1 && catMaxRound > 1) phase = 'semis';
            // Elegir el pool correspondiente
            let targetPool = phase === 'finals' ? finalSlots : phase === 'semis' ? semiSlots : regularSlots;
            // Fallback: si el usuario no configuró bloques específicos para semis o finales,
            // usamos el bloque regular por defecto.
            if (targetPool.length === 0 && phase !== 'grupos') {
                targetPool = regularSlots;
            }
            let s = targetPool.shift();
            if (s) {
                m.match_date = s.date;
                m.match_time = s.time;
                m.court_id = s.courtId;
            } else {
                // Si nos quedamos sin slots (días/horas insuficientes), quedan sin horario
                m.match_date = null;
                m.match_time = null;
                m.court_id = null;
            }
            scheduledMatches.push(m);
        }
    }
    // Devolvemos la lista modificada y los que eran BYE (que no necesitan slot)
    const byeMatches = allMatches.filter((m)=>m.is_bye);
    return [
        ...scheduledMatches,
        ...byeMatches
    ];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1-r7q2q._.js.map