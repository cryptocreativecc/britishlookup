"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function UnlockIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className={className}>
      <path d="M208,76H100V56a28,28,0,0,1,28-28c13.51,0,25.65,9.62,28.24,22.39a12,12,0,1,0,23.52-4.78C174.87,21.5,153.1,4,128,4A52.06,52.06,0,0,0,76,56V76H48A20,20,0,0,0,28,96V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V96A20,20,0,0,0,208,76Zm-4,128H52V100H204Z" />
    </svg>
  );
}

function maskPhone(phone: string) {
  const digits = phone.replace(/\s/g, "");
  if (digits.length <= 5) return phone;
  return digits.slice(0, 5) + "*".repeat(digits.length - 5);
}

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  return local + "@" + "*".repeat(domain.length);
}

interface ContactCardProps {
  address?: string;
  town?: string;
  postcode?: string;
  phone?: string;
  email?: string;
  website?: string;
}

export function ContactCard({ address, town, postcode, phone, email, website }: ContactCardProps) {
  const [unlocked, setUnlocked] = useState(false);
  const hasHidden = !!phone || !!email;

  const locationLine = address
    ? `${address}${postcode ? `, ${postcode}` : ""}`
    : town
      ? `${town}${postcode ? `, ${postcode}` : ""}`
      : null;

  return (
    <Card>
      <CardContent>
        <h3 className="font-semibold text-text mb-3">Contact Details</h3>
        <div className="space-y-2 text-sm text-text-muted">
          {locationLine && <p>📍 {locationLine}</p>}
          {phone && (
            <p>📞 {unlocked ? (
              <a href={`tel:${phone}`} className="hover:text-brand">{phone}</a>
            ) : maskPhone(phone)}</p>
          )}
          {email && (
            <p>✉️ {unlocked ? (
              <a href={`mailto:${email}`} className="hover:text-brand">{email}</a>
            ) : maskEmail(email)}</p>
          )}
        </div>

        {hasHidden && !unlocked && (
          <button
            onClick={() => setUnlocked(true)}
            className="mt-3 flex items-center gap-1.5 text-sm text-brand hover:text-brand-dark transition-colors font-medium"
          >
            <UnlockIcon className="w-4 h-4" />
            Unlock contact details
          </button>
        )}

        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer" className="mt-4 block">
            <Button className="w-full">Visit Website</Button>
          </a>
        )}
      </CardContent>
    </Card>
  );
}
