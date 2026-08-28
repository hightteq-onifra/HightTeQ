(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/context/CartContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartProvider",
    ()=>CartProvider,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const parsePrice = (price)=>{
    const numeric = price.replace(/[^0-9]/g, '');
    return Number(numeric || 0);
};
const CartProvider = ({ children })=>{
    _s();
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isInitialized, setIsInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartProvider.useEffect": ()=>{
            try {
                const savedCart = localStorage.getItem('highteq_cart');
                if (savedCart) {
                    const parsed = JSON.parse(savedCart);
                    const normalized = parsed.map({
                        "CartProvider.useEffect.normalized": (item)=>({
                                ...item,
                                quantity: item.quantity || 1,
                                priceNumeric: item.priceNumeric || parsePrice(item.price || '0')
                            })
                    }["CartProvider.useEffect.normalized"]);
                    setCart(normalized);
                }
            } catch (e) {
                console.error('Erreur lecture localStorage:', e);
            } finally{
                setIsInitialized(true);
            }
        }
    }["CartProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartProvider.useEffect": ()=>{
            if (isInitialized) {
                try {
                    localStorage.setItem('highteq_cart', JSON.stringify(cart));
                } catch (e) {
                    console.error('Erreur écriture localStorage:', e);
                }
            }
        }
    }["CartProvider.useEffect"], [
        cart,
        isInitialized
    ]);
    const addToCart = (product)=>{
        setCart((prev)=>{
            const existing = prev.find((item)=>item.id === product.id);
            if (existing) {
                return prev.map((item)=>item.id === product.id ? {
                        ...item,
                        quantity: item.quantity + 1
                    } : item);
            }
            return [
                ...prev,
                {
                    ...product,
                    quantity: 1,
                    priceNumeric: parsePrice(product.price)
                }
            ];
        });
    };
    const updateQuantity = (id, delta)=>{
        setCart((prev)=>prev.flatMap((item)=>{
                if (item.id !== id) return [
                    item
                ];
                const nextQuantity = item.quantity + delta;
                if (nextQuantity <= 0) return [];
                return [
                    {
                        ...item,
                        quantity: nextQuantity
                    }
                ];
            }));
    };
    const removeFromCart = (id)=>{
        setCart((prev)=>prev.filter((item)=>item.id !== id));
    };
    const clearCart = ()=>{
        setCart([]);
    };
    const totals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CartProvider.useMemo[totals]": ()=>{
            const totalArticles = cart.reduce({
                "CartProvider.useMemo[totals].totalArticles": (sum, item)=>sum + item.quantity
            }["CartProvider.useMemo[totals].totalArticles"], 0);
            const totalPrice = cart.reduce({
                "CartProvider.useMemo[totals].totalPrice": (sum, item)=>sum + item.priceNumeric * item.quantity
            }["CartProvider.useMemo[totals].totalPrice"], 0);
            return {
                totalItems: totalArticles,
                totalArticles,
                totalPrice
            };
        }
    }["CartProvider.useMemo[totals]"], [
        cart
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: {
            cart,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            ...totals
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/CartContext.tsx",
        lineNumber: 125,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CartProvider, "2iykotNZXMZy4+9CzfLV6MEM9WY=");
_c = CartProvider;
const useCart = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (!context) {
        throw new Error('useCart doit être utilisé dans un CartProvider');
    }
    return context;
};
_s1(useCart, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "CartProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_context_CartContext_tsx_0242mrk._.js.map