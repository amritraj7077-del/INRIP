export const FloatingLegend = () => {
  const legendItems = [
    { color: 'bg-emerald-500', label: 'Metallic Minerals' },
    { color: 'bg-sky-500', label: 'Non-Metallic Minerals' },
    { color: 'bg-purple-500', label: 'Energy Minerals' },
    { color: 'bg-slate-400', label: 'Industrial Minerals' },
    { color: 'bg-amber-500', label: 'Precious Minerals' },
  ];

  return (
    <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl border border-slate-200/80 p-3 text-xs">
      <h4 className="font-bold text-slate-900 pb-2 border-b border-slate-100">Legend</h4>
      <div className="space-y-1.5 pt-2 text-[10px] font-medium text-slate-700">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
            {item.label}
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-[8px]">
            12
          </span>
          Mine Cluster
        </div>
      </div>
    </div>
  );
};
