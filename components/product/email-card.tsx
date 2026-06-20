import type { ReactNode } from "react";

export function EmailCard({
  subject,
  recipient,
  recipientEmail,
  children,
  action,
  className,
}: {
  subject: string;
  recipient: string;
  recipientEmail: string;
  children: ReactNode;
  action?: string;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-2xl border border-black/[0.06] shadow-xl p-5 ${className ?? ""}`}>
      <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-black/[0.06]">
        <div className="w-8 h-8 rounded-full bg-[#02524b] text-white flex items-center justify-center text-[11px] font-semibold shrink-0">
          IS
        </div>
        <div className="min-w-0">
          <div className="text-xs text-gray-400">From</div>
          <div className="text-sm font-medium text-gray-900 truncate">Isla the AI Agent</div>
        </div>
        <div className="ml-auto text-right min-w-0">
          <div className="text-xs text-gray-400">To</div>
          <div className="text-xs text-gray-500 truncate">{recipientEmail}</div>
        </div>
      </div>
      <div className="text-sm font-semibold text-gray-900 mb-2">{subject}</div>
      <div className="text-sm text-gray-600 leading-relaxed space-y-2">{children}</div>
      {action && (
        <button className="mt-4 bg-[#1a1a1a] text-white text-sm font-medium px-4 py-2 rounded-lg">
          {action}
        </button>
      )}
    </div>
  );
}
