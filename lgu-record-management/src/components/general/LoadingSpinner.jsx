export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/85 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-20 h-20">
          {/* Background ring */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>

          {/* Spinning ring */}
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>

          {/* Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img src="/lgu-logo.png" alt="Loading" className="w-9 h-9 object-contain rounded-full" />
          </div>
        </div>

        {/* Text */}
        <p className="text-sm font-medium text-slate-600">{label}</p>
      </div>
    </div>
  );
}
