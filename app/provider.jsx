"use client"
import React from 'react'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import AuthProvider from './AuthProvider';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
function Provider({ children }) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
    return (
        <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center   z-50">
            <Loader2 className="w-12 h-12  animate-spin" />
        </div>}>
            <ConvexProvider client={convex}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </ConvexProvider>
        </Suspense>
    )
}

export default Provider