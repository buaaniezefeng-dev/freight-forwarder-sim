import React from 'react';
import { STAGE_TITLES } from '../constants';
import { GameStage } from '../types';
import { Briefcase, TrendingUp, DollarSign, ShieldCheck } from 'lucide-react';

interface StatsDisplayProps {
  currentStage: GameStage;
  currentStageIndex: number;
  totalStages: number;
  stats: { trust: number; costEfficiency: number; commission: number };
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ currentStage, currentStageIndex, totalStages, stats }) => {
  
  const progressPercentage = Math.min(100, Math.max(0, ((currentStageIndex) / (totalStages)) * 100));
  
  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3">
        
        {/* Top Row: Title and Progress */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-3">
          <div className="flex items-center gap-3">
             <div className="bg-brand-100 p-2 rounded-lg text-brand-600">
               <Briefcase size={20} />
             </div>
             <div>
                <h1 className="font-bold text-slate-800 text-sm md:text-base">国际货运实训</h1>
                <div className="text-xs text-slate-500 font-medium">
                  阶段 {currentStageIndex + 1} / {totalStages}: {STAGE_TITLES[currentStage]}
                </div>
             </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full md:w-64">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>进度</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-3">
          <StatItem 
            icon={<ShieldCheck size={16} />} 
            label="客户信任" 
            value={stats.trust} 
            color="text-emerald-600" 
            bgColor="bg-emerald-50"
            barColor="bg-emerald-500"
          />
          <StatItem 
            icon={<TrendingUp size={16} />} 
            label="成本控制" 
            value={stats.costEfficiency} 
            color="text-blue-600" 
            bgColor="bg-blue-50"
            barColor="bg-blue-500"
          />
          <StatItem 
            icon={<DollarSign size={16} />} 
            label="个人佣金" 
            value={stats.commission} 
            color="text-amber-600" 
            bgColor="bg-amber-50"
            barColor="bg-amber-500"
          />
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ icon, label, value, color, bgColor, barColor }: any) => (
  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
    <div className={`p-1.5 rounded-md ${bgColor} ${color} hidden sm:block`}>
      {icon}
    </div>
    <div className="w-full">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-xs font-semibold text-slate-600">{label}</span>
        <span className={`text-sm font-bold ${color}`}>{value}</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden w-full">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${barColor}`} 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  </div>
);
