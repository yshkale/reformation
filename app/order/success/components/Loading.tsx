"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50">
      <Loader2 className="h-12 w-12 animate-spin text-neutral-800 mb-4" />
      <h2 className="text-xl font-medium text-neutral-800">
        Processing your order...
      </h2>
      <p className="text-neutral-500 mt-2">
        Please wait while we confirm your purchase
      </p>
    </div>
  );
}
