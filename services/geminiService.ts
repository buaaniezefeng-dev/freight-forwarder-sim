import { GameStage, PlayerStats, ScenarioResponse } from "../types";
import { getScenarioContent } from "./gameData";

// Simulate network delay for immersion
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateScenario = async (
  currentStage: GameStage,
  _currentStats: PlayerStats,
  previousChoiceText: string | null,
  previousStage: GameStage | null,
  _historySummary: string[],
  currentCaseId: string | null
): Promise<ScenarioResponse> => {
  
  // Simulate processing time
  await delay(600);

  if (!currentCaseId) {
     return {
      title: "错误",
      narrative: "未选择案例 ID。",
      choices: [{ id: "err", text: "返回" }],
      statsDelta: { trust: 0, costEfficiency: 0, commission: 0 }
    };
  }

  // 1. Calculate impact of Previous Choice
  // We look up what the player chose in the PREVIOUS stage to determine the stats delta and feedback
  // that should be applied/shown at the start of THIS stage.
  let feedback = "";
  let statsDelta = { trust: 0, costEfficiency: 0, commission: 0 };

  if (previousStage && previousChoiceText) {
      const prevStageData = getScenarioContent(currentCaseId, previousStage);
      if (prevStageData && prevStageData.choices) {
          const selectedChoice = prevStageData.choices.find((c: any) => c.text === previousChoiceText);
          if (selectedChoice && selectedChoice.outcome) {
              feedback = selectedChoice.outcome.feedback || "";
              statsDelta = selectedChoice.outcome.statsDelta || statsDelta;
          }
      }
  }

  // 2. Get the content for the requested (current) stage based on Case ID
  const stageData = getScenarioContent(currentCaseId, currentStage);

  if (!stageData) {
    return {
      title: "数据缺失",
      narrative: `无法加载案例 ${currentCaseId} 的 ${currentStage} 阶段数据。`,
      choices: [{ id: "err", text: "继续" }],
      statsDelta: { trust: 0, costEfficiency: 0, commission: 0 }
    };
  }

  return {
    title: stageData.title,
    narrative: stageData.narrative,
    choices: stageData.choices.map((c: any) => ({
      id: c.id,
      text: c.text
    })),
    feedback: feedback,
    statsDelta: statsDelta
  };
};

export const generateSummary = async (_log: { stage: string; choice: string; result: string }[], finalStats: PlayerStats) => {
    await delay(1000);
    
    const totalScore = Math.round((finalStats.trust + finalStats.costEfficiency + finalStats.commission) / 3);
    
    let grade = 'F';
    if (totalScore > 90) grade = 'S';
    else if (totalScore > 80) grade = 'A';
    else if (totalScore > 70) grade = 'B';
    else if (totalScore > 60) grade = 'C';

    let comment = "";
    if (grade === 'S') comment = "完美的货代操作！你精准平衡了各方利益，展现了极高的专业素养。客户将成为你的忠实伙伴。";
    else if (grade === 'A') comment = "非常优秀的操作。虽然有细微瑕疵，但整体流程把控得当，是一名值得信赖的高级业务员。";
    else if (grade === 'B') comment = "表现合格。能完成基本运输任务，但在成本控制或风险规避上还有提升空间。";
    else if (grade === 'C') comment = "勉强完成任务。过程中存在不少风险点，客户满意度一般，需要加强专业知识学习。";
    else comment = "操作彻底失败。你的决策导致了严重的后果，可能面临索赔或客户流失。请重新复盘学习。";

    // Add specific advice based on lowest stat
    if (finalStats.trust < 50) comment += "\n\n特别建议：你的客户信用度过低。在货代行业，诚信是立身之本，不要为了短期利益牺牲服务质量。";
    else if (finalStats.costEfficiency < 50) comment += "\n\n特别建议：你的成本控制能力较弱。需要更熟悉市场价格和物流方案优化，帮客户省钱就是帮自己赚钱。";
    else if (finalStats.commission < 50) comment += "\n\n特别建议：你的盈利能力不足。虽然服务好了客户，但公司也需要生存。在合规的前提下学会合理定价。";

    return comment;
}