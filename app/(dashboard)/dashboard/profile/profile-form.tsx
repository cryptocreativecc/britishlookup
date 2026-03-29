"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function ProfileForm({ user }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState("");

  async function handleProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        body: form,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Update failed");
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handlePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPwLoading(true);
    setPwError("");
    setPwSuccess(false);
    const form = new FormData(e.currentTarget);
    if (form.get("newPassword") !== form.get("confirmPassword")) {
      setPwError("Passwords do not match");
      setPwLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/profile/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword: form.get("oldPassword"),
          newPassword: form.get("newPassword"),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Update failed");
      }
      setPwSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setPwError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setPwLoading(false);
    }
  }

  const inputClass = "w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand";

  return (
    <div className="space-y-6 max-w-lg">
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold text-text mb-4">Profile Details</h2>
          {error && <div className="mb-4 rounded-lg bg-red-50 text-red-700 p-3 text-sm">{error}</div>}
          {success && <div className="mb-4 rounded-lg bg-green-50 text-green-700 p-3 text-sm">Profile updated!</div>}

          <form onSubmit={handleProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Name</label>
              <input name="name" defaultValue={user.name} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Email</label>
              <input value={user.email} disabled className={`${inputClass} opacity-50 cursor-not-allowed`} />
              <p className="text-xs text-text-muted mt-1">Email cannot be changed</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Avatar</label>
              <input name="avatar" type="file" accept="image/*" className="text-sm" />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving…" : "Save Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold text-text mb-4">Change Password</h2>
          {pwError && <div className="mb-4 rounded-lg bg-red-50 text-red-700 p-3 text-sm">{pwError}</div>}
          {pwSuccess && <div className="mb-4 rounded-lg bg-green-50 text-green-700 p-3 text-sm">Password updated!</div>}

          <form onSubmit={handlePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Current Password</label>
              <input name="oldPassword" type="password" required minLength={8} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">New Password</label>
              <input name="newPassword" type="password" required minLength={8} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Confirm New Password</label>
              <input name="confirmPassword" type="password" required minLength={8} className={inputClass} />
            </div>
            <Button type="submit" disabled={pwLoading}>
              {pwLoading ? "Updating…" : "Change Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
