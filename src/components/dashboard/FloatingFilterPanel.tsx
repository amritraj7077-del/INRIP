import { useState } from 'react';

export const FloatingFilterPanel = () => {
  const [filters, setFilters] = useState({
    mineral: '',
    state: '',
    district: '',
    mineType: '',
    status: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    console.log('Applying filters:', filters);
    // TODO: Connect to existing Supabase fetch logic
  };

  const resetFilters = () => {
    setFilters({
      mineral: '',
      state: '',
      district: '',
      mineType: '',
      status: ''
    });
  };

  return (
    <div className="absolute top-20 left-4 z-20 w-52 bg-white/95 backdrop-blur rounded-2xl shadow-xl border border-slate-200/80 p-4 space-y-3 text-xs">
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <h3 className="font-bold text-slate-900">Filters</h3>
        <button onClick={resetFilters} className="text-[10px] text-sky-600 font-semibold hover:underline">
          Reset
        </button>
      </div>

      <div className="space-y-2.5 text-[11px]">
        <div>
          <label className="text-[10px] text-slate-400 font-medium">Mineral Type</label>
          <select 
            value={filters.mineral}
            onChange={(e) => handleFilterChange('mineral', e.target.value)}
            className="w-full mt-1 p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
          >
            <option value="">All Minerals</option>
            <option value="iron">Iron Ore</option>
            <option value="bauxite">Bauxite</option>
            <option value="coal">Coal</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-medium">State / UT</label>
          <select 
            value={filters.state}
            onChange={(e) => handleFilterChange('state', e.target.value)}
            className="w-full mt-1 p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
          >
            <option value="">All States</option>
            <option value="odisha">Odisha</option>
            <option value="jharkhand">Jharkhand</option>
            <option value="mp">Madhya Pradesh</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-medium">District</label>
          <select 
            value={filters.district}
            onChange={(e) => handleFilterChange('district', e.target.value)}
            className="w-full mt-1 p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
          >
            <option value="">All Districts</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-medium">Mine Type</label>
          <select 
            value={filters.mineType}
            onChange={(e) => handleFilterChange('mineType', e.target.value)}
            className="w-full mt-1 p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
          >
            <option value="">All Types</option>
            <option value="open">Opencast</option>
            <option value="underground">Underground</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-medium">Status</label>
          <select 
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full mt-1 p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
          >
            <option value="">All Status</option>
            <option value="active">Active Lease</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      <button 
        onClick={applyFilters}
        className="w-full py-2 bg-brand-yellow hover:bg-brand-yellowHover text-slate-900 font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 mt-2"
      >
        Apply Filters
      </button>
    </div>
  );
};
