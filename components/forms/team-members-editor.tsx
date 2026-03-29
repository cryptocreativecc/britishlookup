"use client";

export interface TeamMemberInput {
  name: string;
  role: string;
  photo: string;
  linkedin: string;
  twitter: string;
}

interface Props {
  value: TeamMemberInput[];
  onChange: (members: TeamMemberInput[]) => void;
}

const inputClass = "w-full h-10 px-3 rounded-[var(--radius-btn)] border border-border bg-white text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand";

export function TeamMembersEditor({ value, onChange }: Props) {
  const add = () => onChange([...value, { name: "", role: "", photo: "", linkedin: "", twitter: "" }]);
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const update = (i: number, field: keyof TeamMemberInput, val: string) => {
    const next = [...value];
    next[i] = { ...next[i], [field]: val };
    onChange(next);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-text">Team Members</label>
        <button type="button" onClick={add} className="text-xs text-brand hover:text-brand-dark font-medium">+ Add member</button>
      </div>
      {value.length === 0 && <p className="text-xs text-text-muted">No team members added yet.</p>}
      <div className="space-y-3">
        {value.map((m, i) => (
          <div key={i} className="p-3 border border-border rounded-lg bg-surface space-y-2">
            <div className="flex gap-2">
              <input placeholder="Full name *" value={m.name} onChange={(e) => update(i, "name", e.target.value)} className={inputClass} />
              <button type="button" onClick={() => remove(i)} className="text-red-500 hover:text-red-700 text-xs shrink-0 px-2">✕</button>
            </div>
            <input placeholder="Role / Title" value={m.role} onChange={(e) => update(i, "role", e.target.value)} className={inputClass} />
            <input placeholder="Photo URL (optional)" value={m.photo} onChange={(e) => update(i, "photo", e.target.value)} className={inputClass} />
            <div className="grid grid-cols-2 gap-2">
              <input placeholder="LinkedIn URL" value={m.linkedin} onChange={(e) => update(i, "linkedin", e.target.value)} className={inputClass} />
              <input placeholder="X / Twitter URL" value={m.twitter} onChange={(e) => update(i, "twitter", e.target.value)} className={inputClass} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
