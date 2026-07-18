"use client";

export function ConfirmDialog({
  open,
  title,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/30 p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-4 shadow-lg">
        <h3 className="text-sm font-semibold">{title}</h3>
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="rounded-md border border-slate-300 px-3 py-1 text-sm">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="rounded-md bg-brand-500 px-3 py-1 text-sm text-white">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
