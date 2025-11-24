import React, { useEffect, useState } from 'react';
import { PlayerStats } from '../types';
import { generateSummary } from '../services/geminiService';
import { RotateCcw, Award, AlertTriangle, FileText } from 'lucide-react';

interface SummaryScreenProps {
  stats: PlayerStats;
  historyLog: { stage: string; choice: string; result: string }[];
  onRestart: () => void;
  gameWon: boolean;
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({ stats, historyLog, onRestart, gameWon }) => {
  const [analysis, setAnalysis] = useState<string>('正在生成业务复盘报告...');

  useEffect(() => {
    generateSummary(historyLog, stats).then(setAnalysis).catch(() => setAnalysis("数据解析失败"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalScore = Math.round((stats.trust + stats.costEfficiency + stats.commission) / 3);

  // Grading Scale: S (90+), A (80+), B (60+), C (<60)
  let grade = 'C';
  if (totalScore >= 90) grade = 'S';
  else if (totalScore >= 80) grade = 'A';
  else if (totalScore >= 60) grade = 'B';

  // If game is technically won (finished flow) but score is low (C), we still show "Pass" but maybe with a different color/text
  const isHighQuality = totalScore >= 60; 

  return (
    <div className="max-w-2xl mx-auto p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-slate-200">
        
        {/* Header Area */}
        <div className={`${gameWon ? 'bg-brand-600' : 'bg-slate-800'} p-10 text-center text-white relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>
          
          {gameWon ? (
            <Award className="w-16 h-16 mx-auto mb-4 text-brand-200" />
          ) : (
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-orange-400" />
          )}
          
          <h1 className="text-3xl font-bold mb-2 tracking-tight">
            {gameWon ? "实训结束 - 考核完成" : "实训结束 - 考核中止"}
          </h1>
          <p className="text-brand-100 opacity-80 text-sm uppercase tracking-widest">Mission Debriefing</p>
        </div>

        {/* Score Section */}
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50">
           <div className="flex justify-between items-center">
              <div className="text-center">
                 <div className="text-sm text-slate-500 font-medium mb-1">综合评分</div>
                 <div className="text-4xl font-black text-slate-800">{totalScore}</div>
              </div>
              <div className="text-center px-8 border-x border-slate-200">
                 <div className="text-sm text-slate-500 font-medium mb-1">等级</div>
                 <div className={`text-5xl font-black ${grade === 'S' || grade === 'A' ? 'text-brand-600' : grade === 'B' ? 'text-blue-500' : 'text-amber-500'}`}>
                   {grade}
                 </div>
              </div>
              <div className="text-center">
                 <div className="text-sm text-slate-500 font-medium mb-1">结果</div>
                 <div className={`text-lg font-bold ${isHighQuality ? 'text-slate-700' : 'text-amber-600'}`}>
                   {grade === 'S' ? "完美" : grade === 'A' ? "优秀" : grade === 'B' ? "良好" : "待改进"}
                 </div>
              </div>
           </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Detailed Stats */}
          <div className="grid grid-cols-3 gap-4">
            <StatBox label="客户信任" value={stats.trust} color="text-emerald-600" bg="bg-emerald-50" />
            <StatBox label="成本控制" value={stats.costEfficiency} color="text-blue-600" bg="bg-blue-50" />
            <StatBox label="个人佣金" value={stats.commission} color="text-amber-600" bg="bg-amber-50" />
          </div>

          {/* Analysis Text */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
            <div className="flex items-center gap-2 mb-3 text-slate-800 font-bold">
              <FileText size={18} className="text-brand-500"/>
              业务导师评语
            </div>
            <p className="text-slate-600 whitespace-pre-wrap leading-relaxed text-sm md:text-base">
              {analysis}
            </p>
          </div>

          <button
            onClick={onRestart}
            className="w-full group flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-brand-500/30 transition-all hover:-translate-y-1"
          >
            <RotateCcw size={20} className="group-hover:-rotate-180 transition-transform duration-500"/>
            <span>重新开始实训</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ label, value, color, bg }: any) => (
  <div className={`flex flex-col items-center justify-center p-3 rounded-lg ${bg}`}>
    <span className="text-xs text-slate-500 font-medium mb-1">{label}</span>
    <span className={`text-xl font-bold ${color}`}>{value}</span>
  </div>
);