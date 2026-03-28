import { Suspense } from "react";
import { LoginForm } from "./login-form";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Login" };

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
