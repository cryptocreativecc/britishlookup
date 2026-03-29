"use client";

export interface FAQInput {
  question: string;
  answer: string;
}

interface Props {
  value: FAQInput[];
  onChange: (faqs: FAQInput[]) => void;
}

const inputClass = "w-full h-10 px-3 rounded-[var(--radius-btn)] border border-border bg-white text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand";

export function FAQEditor({ value, onChange }: Props) {
  const add = () => onChange([...value, { question: "", answer: "" }]);
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const update = (i: number, field: keyof FAQInput, val: string) => {
    const next = [...value];
    next[i] = { ...next[i], [field]: val };
    onChange(next);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-text">Frequently Asked Questions</label>
        <button type="button" onClick={add} className="text-xs text-brand hover:text-brand-dark font-medium">+ Add question</button>
      </div>
      {value.length === 0 && <p className="text-xs text-text-muted">No FAQs added yet.</p>}
      <div className="space-y-3">
        {value.map((faq, i) => (
          <div key={i} className="p-3 border border-border rounded-lg bg-surface space-y-2">
            <div className="flex gap-2">
              <input placeholder="Question *" value={faq.question} onChange={(e) => update(i, "question", e.target.value)} className={inputClass} />
              <button type="button" onClick={() => remove(i)} className="text-red-500 hover:text-red-700 text-xs shrink-0 px-2">✕</button>
            </div>
            <textarea
              placeholder="Answer *"
              value={faq.answer}
              onChange={(e) => update(i, "answer", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-[var(--radius-btn)] border border-border bg-white text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
