import React, { useState, useEffect, useCallback } from 'react';
import { GameStage, GameState, INITIAL_STATS, Choice } from './types';
import { MAX_STAT, MIN_STAT } from './constants';
import { AVAILABLE_CASES } from './services/gameData';
import { generateScenario } from './services/geminiService';
import { StatsDisplay } from './components/StatsDisplay';
import { GameScene } from './components/GameScene';
import { SummaryScreen } from './components/SummaryScreen';
import { Loader2, Ship, PlayCircle, BookOpen, Trophy } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    stage: GameStage.START,
    stats: { ...INITIAL_STATS },
    history: [],
    currentScenario: null,
    isLoading: false,
    gameOver: false,
    gameWon: false,
    log: [],
    currentCaseId: null
  });

  const startGame = (caseId: string) => {
    const selectedCase = AVAILABLE_CASES.find(c => c.id === caseId);
    if (!selectedCase) return;

    setGameState({
      stage: selectedCase.flow[0],
      stats: { ...INITIAL_STATS },
      history: ["System initialized."],
      currentScenario: null,
      isLoading: true,
      gameOver: false,
      gameWon: false,
      log: [],
      currentCaseId: caseId
    });
  };

  // Effect to trigger logic when stage changes or game starts
  useEffect(() => {
    const loadScenario = async () => {
      if (gameState.stage === GameStage.START || gameState.stage === GameStage.SUMMARY) return;
      
      if (gameState.currentScenario && !gameState.isLoading) return;

      try {
        const lastLogEntry = gameState.log.length > 0 ? gameState.log[gameState.log.length - 1] : null;
        const previousChoiceText = lastLogEntry ? lastLogEntry.choice : null;
        const previousStage = lastLogEntry ? (lastLogEntry.stage as GameStage) : null;
        
        const response = await generateScenario(
          gameState.stage,
          gameState.stats,
          previousChoiceText,
          previousStage,
          gameState.history,
          gameState.currentCaseId
        );

        // Apply stats delta hiddenly
        let newStats = { ...gameState.stats };
        if (response.statsDelta) {
           newStats.trust = Math.min(MAX_STAT, Math.max(MIN_STAT, newStats.trust + (response.statsDelta.trust || 0)));
           newStats.costEfficiency = Math.min(MAX_STAT, Math.max(MIN_STAT, newStats.costEfficiency + (response.statsDelta.costEfficiency || 0)));
           newStats.commission = Math.min(MAX_STAT, Math.max(MIN_STAT, newStats.commission + (response.statsDelta.commission || 0)));
        }

        // Check for Game Over due to stats
        if (newStats.trust <= 0 || newStats.costEfficiency <= 0 || newStats.commission <= 0) {
          setGameState(prev => ({
            ...prev,
            stats: newStats,
            currentScenario: response, 
            isLoading: false,
            gameOver: true,
            gameWon: false
          }));
          return;
        }

        setGameState(prev => ({
          ...prev,
          stats: newStats,
          currentScenario: response,
          isLoading: false
        }));

      } catch (error) {
        console.error("Failed to load scenario", error);
        setGameState(prev => ({ ...prev, isLoading: false }));
      }
    };

    if (gameState.isLoading && !gameState.gameOver) {
      loadScenario();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.isLoading, gameState.stage]);


  const handleChoiceSelected = useCallback((choice: Choice) => {
    setGameState(prev => {
      if (!prev.currentCaseId) return prev;

      const selectedCase = AVAILABLE_CASES.find(c => c.id === prev.currentCaseId);
      if (!selectedCase) return prev;

      const newHistory = [...prev.history, `Stage: ${prev.stage}`, `Scenario: ${prev.currentScenario?.title}`, `Action: ${choice.text}`];
      
      const newLog = [...prev.log, { 
        stage: prev.stage, 
        choice: choice.text, 
        result: "Processed" 
      }];

      // Find current stage index in the specific case flow
      const currentFlowIndex = selectedCase.flow.indexOf(prev.stage);
      const nextStage = currentFlowIndex < selectedCase.flow.length - 1 ? selectedCase.flow[currentFlowIndex + 1] : GameStage.SUMMARY;
      
      const isGameFinished = nextStage === GameStage.SUMMARY;

      return {
        ...prev,
        stage: nextStage,
        history: newHistory,
        log: newLog,
        isLoading: !isGameFinished,
        gameOver: isGameFinished,
        gameWon: isGameFinished, 
        currentScenario: null 
      };
    });
  }, []);

  // -- RENDER --

  if (gameState.stage === GameStage.START) {
    const tutorialCase = AVAILABLE_CASES.find(c => c.id === 'tutorial');
    const practiceCases = AVAILABLE_CASES.filter(c => c.id !== 'tutorial');

    return (
      <div className="min-h-screen flex flex-col p-6 bg-slate-50 relative overflow-y-auto">
        {/* Decorative Background */}
        <div className="fixed inset-0 bg-brand-50 opacity-50 z-0"></div>
        <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-b from-brand-100/50 to-transparent z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          
          <div className="text-center mb-10 pt-8">
            <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-600 shadow-sm">
              <Ship size={40} />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-800 mb-2 tracking-tight">
              国际货运模拟实训中心
            </h1>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">
              International Freight Forwarding Sim
            </p>
          </div>

          {/* Tutorial Section */}
          {tutorialCase && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4 px-2">
                <BookOpen className="text-brand-600 w-5 h-5" />
                <h2 className="text-xl font-bold text-slate-700">基础实训课程</h2>
              </div>
              <div 
                onClick={() => startGame(tutorialCase.id)}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-brand-100 hover:border-brand-300 group cursor-pointer flex flex-col md:flex-row gap-6 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                  推荐必修
                </div>
                <div className="bg-brand-50 p-4 rounded-xl flex-shrink-0 flex items-center justify-center w-full md:w-24 h-24 text-brand-500">
                  <Ship size={32} />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-brand-600 transition-colors">
                    {tutorialCase.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {tutorialCase.description}
                  </p>
                  <div className="flex gap-2">
                    {tutorialCase.tags.map(tag => (
                       <span key={tag} className="text-xs bg-brand-50 text-brand-600 px-2 py-1 rounded-md border border-brand-100">
                         #{tag}
                       </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-center md:justify-end">
                   <button className="bg-brand-600 text-white px-6 py-2 rounded-full font-bold text-sm group-hover:scale-105 transition-transform shadow-lg shadow-brand-200">
                     开始学习
                   </button>
                </div>
              </div>
            </div>
          )}

          {/* Practice Cases Grid */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4 px-2">
              <Trophy className="text-amber-500 w-5 h-5" />
              <h2 className="text-xl font-bold text-slate-700">进阶案例挑战</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {practiceCases.map((scenario) => (
                <div 
                  key={scenario.id} 
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 group cursor-pointer flex flex-col relative overflow-hidden"
                  onClick={() => startGame(scenario.id)}
                >
                  <div className={`absolute top-0 left-0 w-1 h-full ${
                    scenario.difficulty === 'Easy' ? 'bg-emerald-400' : 
                    scenario.difficulty === 'Medium' ? 'bg-blue-400' : 
                    'bg-orange-400'
                  }`}></div>

                  <div className="flex justify-between items-start mb-3 pl-3">
                    <div className={`
                      px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                      ${scenario.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600' : 
                        scenario.difficulty === 'Medium' ? 'bg-blue-50 text-blue-600' : 
                        'bg-orange-50 text-orange-600'}
                    `}>
                      {scenario.difficulty}
                    </div>
                    <PlayCircle className="text-slate-200 group-hover:text-brand-500 transition-colors w-6 h-6" />
                  </div>
                  
                  <h3 className="pl-3 text-lg font-bold text-slate-800 mb-2 group-hover:text-brand-600 transition-colors line-clamp-1">
                    {scenario.title}
                  </h3>
                  <p className="pl-3 text-slate-500 text-sm mb-4 leading-relaxed flex-grow line-clamp-3">
                    {scenario.description}
                  </p>
                  
                  <div className="pl-3 flex flex-wrap gap-2 mt-auto">
                    {scenario.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded border border-slate-200">
                        {tag}
                      </span>
                    ))}
                    {scenario.tags.length > 2 && (
                      <span className="text-[10px] text-slate-400 py-1">+{scenario.tags.length - 2}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center text-xs text-slate-400 pb-8">
             v2.2.0 | 内部培训专用系统
          </div>
        </div>
      </div>
    );
  }

  if (gameState.stage === GameStage.SUMMARY || (gameState.gameOver && !gameState.isLoading)) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <SummaryScreen 
          stats={gameState.stats} 
          historyLog={gameState.log} 
          onRestart={() => setGameState({ ...gameState, stage: GameStage.START })}
          gameWon={gameState.gameWon}
        />
      </div>
    );
  }

  // Calculate progress based on the SPECIFIC CASE flow
  const currentCase = AVAILABLE_CASES.find(c => c.id === gameState.currentCaseId);
  const currentFlow = currentCase ? currentCase.flow : [];
  const currentStageIndex = currentFlow.indexOf(gameState.stage);
  const totalGameStages = currentFlow.length - 1; 

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      <StatsDisplay 
        currentStage={gameState.stage} 
        currentStageIndex={currentStageIndex}
        totalStages={totalGameStages}
        stats={gameState.stats}
      />
      
      <main className="flex-grow flex flex-col relative z-10 max-w-5xl mx-auto w-full pt-6">
        {gameState.isLoading ? (
          <div className="flex-grow flex flex-col items-center justify-center text-slate-400 space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-brand-500" />
            <div className="text-center">
              <p className="text-lg font-bold text-slate-600">正在加载场景数据...</p>
              <p className="text-xs">System Processing...</p>
            </div>
          </div>
        ) : gameState.currentScenario ? (
          <GameScene 
            scenario={gameState.currentScenario} 
            onChoiceSelected={handleChoiceSelected}
            disabled={gameState.isLoading}
          />
        ) : null}
      </main>
    </div>
  );
};

export default App;