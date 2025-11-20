export enum GameStage {
  START = 'START',
  // Standard Full Flow Stages
  CLIENT_INQUIRY = 'CLIENT_INQUIRY',
  CARGO_ANALYSIS = 'CARGO_ANALYSIS',
  LCL_FCL_DECISION = 'LCL_FCL_DECISION',
  CONTAINER_SELECTION = 'CONTAINER_SELECTION',
  INCOTERMS = 'INCOTERMS',
  CARRIER_SELECTION = 'CARRIER_SELECTION',
  ROUTE_PLANNING = 'ROUTE_PLANNING',
  QUOTATION = 'QUOTATION',
  BOOKING = 'BOOKING',
  ORIGIN_INLAND = 'ORIGIN_INLAND',
  WAREHOUSING = 'WAREHOUSING',
  EXPORT_CUSTOMS = 'EXPORT_CUSTOMS',
  BILL_OF_LADING = 'BILL_OF_LADING',
  INSURANCE = 'INSURANCE',
  OCEAN_TRANSIT = 'OCEAN_TRANSIT',
  DOCS_EXCHANGE = 'DOCS_EXCHANGE',
  DESTINATION_NOTIFY = 'DESTINATION_NOTIFY',
  IMPORT_CUSTOMS = 'IMPORT_CUSTOMS',
  DESTINATION_INLAND = 'DESTINATION_INLAND',
  DELIVERY = 'DELIVERY',
  
  // Generic Case Stages (For short scenarios from PDF)
  CASE_SCENARIO_1 = 'CASE_SCENARIO_1',
  CASE_SCENARIO_2 = 'CASE_SCENARIO_2',
  CASE_SCENARIO_3 = 'CASE_SCENARIO_3',
  CASE_SCENARIO_4 = 'CASE_SCENARIO_4',
  
  SUMMARY = 'SUMMARY'
}

export interface PlayerStats {
  trust: number;      // Customer Trust (0-100)
  costEfficiency: number; // Inverse of Customer Cost (0-100). Higher is cheaper for customer.
  commission: number; // Profit for self (0-100)
}

export interface Choice {
  id: string;
  text: string;
  description?: string; // Internal reasoning for the AI
}

export interface ScenarioResponse {
  title: string;
  narrative: string;
  choices: Choice[];
  imagePrompt?: string; // Suggestion for what image to show (abstract)
  feedback?: string; // Feedback on the PREVIOUS choice
  statsDelta?: Partial<PlayerStats>; // How the PREVIOUS choice affected stats (calculated by AI)
}

export interface CaseDefinition {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  flow: GameStage[]; // The sequence of stages for this specific case
}

export interface GameState {
  stage: GameStage;
  stats: PlayerStats;
  history: string[]; // Log of narrative to keep context
  currentScenario: ScenarioResponse | null;
  isLoading: boolean;
  gameOver: boolean;
  gameWon: boolean;
  log: { stage: string; choice: string; result: string }[];
  currentCaseId: string | null; // Track which case is being played
}

export const INITIAL_STATS: PlayerStats = {
  trust: 50,
  costEfficiency: 50,
  commission: 50,
};