import React, { useState, useEffect } from 'react';
import { ScenarioResponse, Choice } from '../types';
import { TypewriterText } from './TypewriterText';
import { ChevronRight, Anchor, Truck, Ship, PackageCheck } from 'lucide-react';

interface GameSceneProps {
  scenario: ScenarioResponse;
  onChoiceSelected: (choice: Choice) => void;
  disabled: boolean;
}

export const GameScene: React.FC<GameSceneProps> = ({ scenario, onChoiceSelected, disabled }) => {
  const [textComplete, setTextComplete] = useState(false);

  useEffect(() => {
    setTextComplete(false);
  }, [scenario.narrative]);

  const handleChoice = (choice: Choice) => {
    if (!disabled) {
      onChoiceSelected(choice);
    }
  };

  const getIcon = () => {
    const t = scenario.title.toLowerCase();
    if (t.includes('truck') || t.includes('land') || t.includes('输')) return <Truck className="w-8 h-8 text-brand-500" />;
    if (t.includes('sea') || t.includes('ocean') || t.includes('船')) return <Ship className="w-8 h-8 text-brand-500" />;
    if (t.includes('customs') || t.includes('doc')) return <Anchor className="w-8 h-8 text-brand-500" />;
    return <PackageCheck className="w-8 h-8 text-brand-500" />;
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 flex flex-col h-full w-full animate-fade-in">
      
      {/* Feedback Message (Previous Action Result) */}
      {scenario.feedback && (
        <div className="mb-6 p-4 bg-orange-50 border-l-4 border-orange-400 rounded-r-lg text-orange-800 text-sm shadow-sm flex items-start gap-3">
          <div className="font-bold shrink-0 mt-0.5">系统反馈:</div>
          <div>{scenario.feedback}</div>
        </div>
      )}

      {/* Scenario Card */}
      <div className="bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden mb-6">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          {getIcon()}
          <h2 className="text-xl font-bold text-slate-800">{scenario.title}</h2>
        </div>
        
        <div className="p-6 md:p-8 min-h-[160px]">
          <div className="text-slate-600 text-lg leading-relaxed font-medium">
            <TypewriterText 
              key={scenario.title} // Forces component reset when scenario changes
              text={scenario.narrative} 
              speed={10} 
              onComplete={() => setTextComplete(true)} 
            />
          </div>
        </div>
      </div>

      {/* Choices */}
      <div className={`grid gap-4 transition-all duration-500 ${textComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">请选择你的操作</div>
        
        {scenario.choices.map((choice, idx) => (
          <button
            key={choice.id + idx}
            onClick={() => handleChoice(choice)}
            disabled={disabled}
            className="group relative w-full text-left bg-white hover:bg-brand-50 border-2 border-transparent hover:border-brand-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-sm group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="text-base md:text-lg font-medium text-slate-700 group-hover:text-brand-700 transition-colors">
                  {choice.text}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};