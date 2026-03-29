import { Suspense } from "react";
import { LoginForm } from "./login-form";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign In — British Lookup" };

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
