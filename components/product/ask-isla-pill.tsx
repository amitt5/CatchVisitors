export function AskIslaPill({ className }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 bg-[#544CD1] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg ${className ?? ""}`}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z" />
      </svg>
      Ask Isla
    </div>
  );
}
