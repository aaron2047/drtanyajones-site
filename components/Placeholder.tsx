export function Placeholder({ children = "Placeholder" }: { children?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-dashed border-brass bg-brass/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brass">
      {children}
    </span>
  );
}
