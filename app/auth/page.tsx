"use client";

import { useState } from "react";
import { AuthForm } from "@/components/auth-form";
import { useSearchParams } from "next/navigation";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [mode, setMode] = useState<"signin" | "signup" | "forgot-password" | "reset-password">(
    token ? "reset-password" : "signin"
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <AuthForm 
        mode={mode} 
        token={token || undefined} 
        onModeChange={setMode} 
      />
    </div>
  );
}