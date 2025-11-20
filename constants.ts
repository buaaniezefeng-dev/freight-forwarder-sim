import { GameStage } from './types';

export const STAGE_TITLES: Record<GameStage, string> = {
  [GameStage.START]: "初始化",
  
  // Full Flow
  [GameStage.CLIENT_INQUIRY]: "1. 客户咨询 (Inquiry)",
  [GameStage.CARGO_ANALYSIS]: "2. 货物分析 (Cargo Analysis)",
  [GameStage.LCL_FCL_DECISION]: "3. 拼箱与整箱决策 (LCL vs FCL)",
  [GameStage.CONTAINER_SELECTION]: "4. 箱型与尺寸选择 (Container Selection)",
  [GameStage.INCOTERMS]: "5. 贸易术语确认 (Incoterms)",
  [GameStage.CARRIER_SELECTION]: "6. 船公司选择 (Carrier Selection)",
  [GameStage.ROUTE_PLANNING]: "7. 航线规划 (Route Planning)",
  [GameStage.QUOTATION]: "8. 最终报价 (Quotation)",
  [GameStage.BOOKING]: "9. 订舱操作 (Booking)",
  [GameStage.ORIGIN_INLAND]: "10. 起运地内陆运输 (Origin Inland)",
  [GameStage.WAREHOUSING]: "11. 仓库装箱/集货 (Warehousing)",
  [GameStage.EXPORT_CUSTOMS]: "12. 出口报关 (Export Customs)",
  [GameStage.BILL_OF_LADING]: "13. 提单确认 (Bill of Lading)",
  [GameStage.INSURANCE]: "14. 货运保险 (Insurance)",
  [GameStage.OCEAN_TRANSIT]: "15. 海运途中 (Ocean Transit)",
  [GameStage.DOCS_EXCHANGE]: "16. 单证交接 (Docs Exchange)",
  [GameStage.DESTINATION_NOTIFY]: "17. 到货通知 (Arrival Notice)",
  [GameStage.IMPORT_CUSTOMS]: "18. 目的港清关 (Import Customs)",
  [GameStage.DESTINATION_INLAND]: "19. 目的地配送 (Destination Delivery)",
  [GameStage.DELIVERY]: "20. 最终交付 (Final Delivery)",

  // Generic Case Stages
  [GameStage.CASE_SCENARIO_1]: "关键任务一：方案选择",
  [GameStage.CASE_SCENARIO_2]: "关键任务二：费用与执行",
  [GameStage.CASE_SCENARIO_3]: "关键任务三：长期维护与收尾",
  [GameStage.CASE_SCENARIO_4]: "额外挑战",

  [GameStage.SUMMARY]: "结案报告 (Mission Report)"
};

export const MAX_STAT = 100;
export const MIN_STAT = 0;