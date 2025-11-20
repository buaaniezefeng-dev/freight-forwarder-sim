import React, { useState, useEffect, useCallback } from 'react';
import { GameStage, GameState, INITIAL_STATS, Choice } from './types';
import { STAGE_TITLES, MAX_STAT, MIN_STAT } from './constants';
import { AVAILABLE_CASES } from './services/gameData';
import { generateScenario } from './services/geminiService';
import { StatsDisplay } from './components/StatsDisplay';
import { GameScene } from './components/GameScene';
import { SummaryScreen } from './components/SummaryScreen';
import { Loader2, Ship, PlayCircle, BookOpen, AlertTriangle, Anchor } from 'lucide-react';

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
        const previousChoiceText = gameState.log.length > 0 ? gameState.log[gameState.log.length - 1].choice : null;
        
        const response = await generateScenario(
          gameState.stage,
          gameState.stats,
          previousChoiceText,
          gameState.history,
          gameState.currentCaseId
        );

        // Apply stats delta hiddenly
        // Note: In the new refactor, geminiService might return empty delta if feedback lookup is missing. 
        // But we'll keep the logic here.
        let newStats = { ...gameState.stats };
        if (response.statsDelta) {
           newStats.trust = Math.min(MAX_STAT, Math.max(MIN_STAT, newStats.trust + (response.statsDelta.trust || 0)));
           newStats.costEfficiency = Math.min(MAX_STAT, Math.max(MIN_STAT, newStats.costEfficiency + (response.statsDelta.costEfficiency || 0)));
           newStats.commission = Math.min(MAX_STAT, Math.max(MIN_STAT, newStats.commission + (response.statsDelta.commission || 0)));
        }

        // Check for Game Over due to stats (Optional: disable for generic cases if needed, but good to keep)
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
    return (
      <div className="min-h-screen flex flex-col p-6 bg-slate-50 relative overflow-y-auto">
        {/* Decorative Background */}
        <div className="fixed inset-0 bg-brand-50 opacity-50 z-0"></div>
        <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-b from-brand-100/50 to-transparent z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          
          <div className="text-center mb-12 pt-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AVAILABLE_CASES.map((scenario) => (
              <div 
                key={scenario.id} 
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 group cursor-pointer flex flex-col"
                onClick={() => startGame(scenario.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`
                    px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                    ${scenario.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' : 
                      scenario.difficulty === 'Medium' ? 'bg-blue-100 text-blue-700' : 
                      'bg-orange-100 text-orange-700'}
                  `}>
                    {scenario.difficulty}
                  </div>
                  <PlayCircle className="text-slate-300 group-hover:text-brand-500 transition-colors w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-brand-600 transition-colors">
                  {scenario.title}
                </h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">
                  {scenario.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                   {scenario.tags.map(tag => (
                     <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-md">
                       #{tag}
                     </span>
                   ))}
                </div>
              </div>
            ))}
            
            {/* Coming Soon Placeholder */}
            <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 border-dashed flex flex-col items-center justify-center text-slate-400 min-h-[200px]">
               <AlertTriangle className="mb-2 w-8 h-8 opacity-50" />
               <span className="font-medium">更多案例更新中...</span>
            </div>
          </div>
          
          <div className="mt-12 text-center text-xs text-slate-400 pb-8">
             v2.1.0 | 内部培训专用系统
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