'use client';

export function ButtonPrint() {
  return (
    <button
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 print:hidden"
      onClick={() => window.print()}
      type="button"
    >
      Imprimir
    </button>
  );
}
