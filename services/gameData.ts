import { GameStage, PlayerStats, CaseDefinition } from '../types';

export interface Outcome {
  feedback: string;
  statsDelta: Partial<PlayerStats>;
}

// Helper for stats shorthand
const delta = (trust: number, cost: number, comm: number) => ({ trust, costEfficiency: cost, commission: comm });

// --- CASE DEFINITIONS ---

export const AVAILABLE_CASES: CaseDefinition[] = [
  {
    id: "tutorial",
    title: "新手必修：全流程海运操作",
    description: "从零开始处理一票出口德国的精密电子产品。包含20个标准操作环节，适合新手熟悉全套流程。",
    difficulty: "Easy",
    tags: ["标准流程", "出口", "精密仪器"],
    flow: [
      GameStage.CLIENT_INQUIRY, GameStage.CARGO_ANALYSIS, GameStage.LCL_FCL_DECISION, GameStage.CONTAINER_SELECTION,
      GameStage.INCOTERMS, GameStage.CARRIER_SELECTION, GameStage.ROUTE_PLANNING, GameStage.QUOTATION,
      GameStage.BOOKING, GameStage.ORIGIN_INLAND, GameStage.WAREHOUSING, GameStage.EXPORT_CUSTOMS,
      GameStage.BILL_OF_LADING, GameStage.INSURANCE, GameStage.OCEAN_TRANSIT, GameStage.DOCS_EXCHANGE,
      GameStage.DESTINATION_NOTIFY, GameStage.IMPORT_CUSTOMS, GameStage.DESTINATION_INLAND, GameStage.DELIVERY,
      GameStage.SUMMARY
    ]
  },
  {
    id: "case_1",
    title: "案例 1：铁路转空运争议",
    description: "中欧班列单证缺失导致货物滞留。在巨额滞留费和转运成本面前，如何处理由于操作失误引发的费用争议？",
    difficulty: "Hard",
    tags: ["多式联运", "危机公关", "索赔谈判"],
    flow: [GameStage.CASE_SCENARIO_1, GameStage.CASE_SCENARIO_2, GameStage.CASE_SCENARIO_3, GameStage.SUMMARY]
  },
  {
    id: "case_2",
    title: "案例 2：手机首发空运急件",
    description: "某知名手机品牌新品发布，工厂生产延误。你需要安排“Next Flight Out”紧急空运，在天价包机费和违约风险中博弈。",
    difficulty: "Medium",
    tags: ["空运", "包机", "时效管理"],
    flow: [GameStage.CASE_SCENARIO_1, GameStage.CASE_SCENARIO_2, GameStage.CASE_SCENARIO_3, GameStage.SUMMARY]
  },
  {
    id: "case_3",
    title: "案例 3：隐瞒危险品申报",
    description: "客户将锂电池产品作为普通货物订舱。面对高额运费差价的诱惑和船舶起火的风险，你将如何抉择？",
    difficulty: "Hard",
    tags: ["危险品", "合规", "海事安全"],
    flow: [GameStage.CASE_SCENARIO_1, GameStage.CASE_SCENARIO_2, GameStage.CASE_SCENARIO_3, GameStage.SUMMARY]
  },
  {
    id: "case_4",
    title: "案例 4：冷冻海鲜断电事故",
    description: "发往日本的冷冻鳗鱼在码头因插头脱落解冻变质。船公司、码头、车队互相推诿，你需要依据温度记录仪定责。",
    difficulty: "Hard",
    tags: ["冷链物流", "货损理赔", "责任判定"],
    flow: [GameStage.CASE_SCENARIO_1, GameStage.CASE_SCENARIO_2, GameStage.CASE_SCENARIO_3, GameStage.SUMMARY]
  },
  {
    id: "case_5",
    title: "案例 5：港口拥堵与不可抗力",
    description: "宁波港台风拥堵，服装客户面临交期违约。是等待原船、陆运转港还是部分空运？",
    difficulty: "Medium",
    tags: ["突发事件", "方案优化", "调度"],
    flow: [GameStage.CASE_SCENARIO_1, GameStage.CASE_SCENARIO_2, GameStage.CASE_SCENARIO_3, GameStage.SUMMARY]
  },
  {
    id: "case_6",
    title: "案例 6：信用证倒签提单陷阱",
    description: "货物赶不上信用证规定的最晚装船期，工厂请求你“帮忙”倒签提单日期。这是行业潜规则还是诈骗红线？",
    difficulty: "Hard",
    tags: ["信用证", "单证欺诈", "法律风险"],
    flow: [GameStage.CASE_SCENARIO_1, GameStage.CASE_SCENARIO_2, GameStage.CASE_SCENARIO_3, GameStage.SUMMARY]
  },
  {
    id: "case_7",
    title: "案例 7：超大件设备项目物流",
    description: "出口一套大型石油管道设备，无法装入普通集装箱。涉及开顶柜(Open Top)操作、绑扎加固及道路勘测。",
    difficulty: "Medium",
    tags: ["特种柜", "OOG", "项目物流"],
    flow: [GameStage.CASE_SCENARIO_1, GameStage.CASE_SCENARIO_2, GameStage.CASE_SCENARIO_3, GameStage.SUMMARY]
  },
  {
    id: "case_8",
    title: "案例 8：知识产权海关查验",
    description: "出口鞋类产品被海关查验，怀疑侵犯某大牌商标权。客户声称是“自主品牌”，你需要协助处理海关扣货程序。",
    difficulty: "Medium",
    tags: ["海关查验", "知识产权", "法务"],
    flow: [GameStage.CASE_SCENARIO_1, GameStage.CASE_SCENARIO_2, GameStage.CASE_SCENARIO_3, GameStage.SUMMARY]
  },
  {
    id: "case_9",
    title: "案例 9：亚马逊FBA头程税务",
    description: "客户想把一批货发到美国亚马逊仓库，为了省税想低报价格并使用你的美国公司税号清关。风险与利润的博弈。",
    difficulty: "Medium",
    tags: ["跨境电商", "DDP", "税务合规"],
    flow: [GameStage.CASE_SCENARIO_1, GameStage.CASE_SCENARIO_2, GameStage.CASE_SCENARIO_3, GameStage.SUMMARY]
  },
  {
    id: "case_10",
    title: "案例 10：进口海关估价争议",
    description: "进口精密仪器被海关质疑申报价格过低，面临补税罚款。协助客户准备价格磋商材料及行政复议。",
    difficulty: "Hard",
    tags: ["进口清关", "海关估价", "行政复议"],
    flow: [GameStage.CASE_SCENARIO_1, GameStage.CASE_SCENARIO_2, GameStage.CASE_SCENARIO_3, GameStage.CASE_SCENARIO_4, GameStage.SUMMARY]
  }
];

// --- SCENARIO DATA STORE ---

export const getScenarioContent = (caseId: string, stage: GameStage) => {
  if (caseId === 'tutorial') return TUTORIAL_DB[stage];
  if (caseId === 'case_1') return CASE_1_DB[stage];
  if (caseId === 'case_2') return CASE_2_DB[stage];
  if (caseId === 'case_3') return CASE_3_DB[stage];
  if (caseId === 'case_4') return CASE_4_DB[stage];
  if (caseId === 'case_5') return CASE_5_DB[stage];
  if (caseId === 'case_6') return CASE_6_DB[stage];
  if (caseId === 'case_7') return CASE_7_DB[stage];
  if (caseId === 'case_8') return CASE_8_DB[stage];
  if (caseId === 'case_9') return CASE_9_DB[stage];
  if (caseId === 'case_10') return CASE_10_DB[stage];

  return null;
};

// --- CASE DATABASES ---

const CASE_1_DB: Record<string, any> = {
  [GameStage.CASE_SCENARIO_1]: {
    title: "责任认定与费用分摊",
    narrative: "【场景描述】\n您承接A供应链公司委托：通过“渝新欧”铁路将燕麦片运至波兰。因客户仅能提供卫生证书，缺失植物检疫证书被扣。转空运产生额外费用7万元。客户要求赔偿，但双方有大额合作前景。\n\n你需要决定如何处理争议：",
    choices: [
      {
        id: "A",
        text: "拒绝退款，按合同办事",
        outcome: { feedback: "虽然维护了公司利益，但客户立即终止合作，长期佣金损失严重。", statsDelta: delta(-30, 10, -10) }
      },
      {
        id: "B",
        text: "全额赔偿，自行承担损失",
        outcome: { feedback: "虽保留了客户，但你个人和分公司需承担巨额亏损，KPI归零。", statsDelta: delta(20, -30, -20) }
      },
      {
        id: "C",
        text: "协商分摊：免除代理费，分担部分杂费",
        outcome: { feedback: "完美的折中。双方分摊损失，客户看到你的诚意，合作得以维持。", statsDelta: delta(10, 5, 5) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_2]: {
    title: "退款金额核算",
    narrative: "客户同意协商。需核算退款。客户已付8万保证金，铁路运费2.5万，杂费7万。如何给出最终数字？",
    choices: [
      {
        id: "A",
        text: "简单扣除所有发生费用",
        outcome: { feedback: "客户觉得你在斤斤计较，谈判陷入僵局。", statsDelta: delta(-10, 5, 0) }
      },
      {
        id: "B",
        text: "退还保证金 - 运费 - 50%杂费",
        outcome: { feedback: "计算精准，体现共担风险精神，客户签字确认。", statsDelta: delta(10, 5, 5) }
      },
      {
        id: "C",
        text: "全额退还保证金",
        outcome: { feedback: "财务部拒绝审批，你被骂了一顿。", statsDelta: delta(0, -10, -5) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_3]: {
    title: "关系修复",
    narrative: "危机解除。为修复关系，你打算：",
    choices: [
      {
        id: "A",
        text: "冷处理，避免尴尬",
        outcome: { feedback: "客户关系逐渐冷淡。", statsDelta: delta(-10, 0, -5) }
      },
      {
        id: "B",
        text: "承诺后续3单给予佣金折扣",
        outcome: { feedback: "客户感受到了诚意，追加了新订单。", statsDelta: delta(15, -5, 10) }
      },
      {
        id: "C",
        text: "推销VIP服务",
        outcome: { feedback: "客户觉得你只想赚钱，反感。", statsDelta: delta(-20, 10, 5) }
      }
    ]
  }
};

const CASE_2_DB: Record<string, any> = {
  [GameStage.CASE_SCENARIO_1]: {
    title: "紧急空运方案决策",
    narrative: "【场景描述】\n某手机品牌新品发布在即，因屏幕供应问题，成品出厂推迟了3天。若走普通商业航班(3-4天)肯定赶不上发布会，面临巨额违约金。客户焦急万分。\n你需要立即给出方案：",
    choices: [
      {
        id: "A",
        text: "推荐商业航班直飞，赌一把时效",
        outcome: { feedback: "舱位爆满被拉货，货物延误，客户发布会开天窗，你被起诉。", statsDelta: delta(-50, 10, -20) }
      },
      {
        id: "B",
        text: "立即联系包机 (Charter)，费用是普货的5倍",
        outcome: { feedback: "虽然贵，但是唯一能保证时效的方案。客户毫不犹豫地接受了。", statsDelta: delta(20, -20, 20) }
      },
      {
        id: "C",
        text: "建议改为手提急件 (On Board Courier)",
        outcome: { feedback: "几吨的货做手提？不仅成本天价，且根本操作不了。不专业。", statsDelta: delta(-10, -10, 0) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_2]: {
    title: "地面操作协调",
    narrative: "客户确认包机。但起飞前4小时，机场地勤表示货物包装不符合航空板型要求，需要重新打板，但这会错过起飞窗口。",
    choices: [
      {
        id: "A",
        text: "给地勤塞红包请求通融",
        outcome: { feedback: "航空安全红线不可触碰！你被举报，面临吊销执照风险。", statsDelta: delta(-30, -10, -50) }
      },
      {
        id: "B",
        text: "紧急调派专业打包团队现场重组，并申请延误30分钟起飞",
        outcome: { feedback: "展现了强大的现场解决能力。虽然惊险，但货物赶上了飞机。", statsDelta: delta(15, -5, 10) }
      },
      {
        id: "C",
        text: "通知客户只能改签下一班",
        outcome: { feedback: "包机改签费用巨大，且依然误事。客户崩溃。", statsDelta: delta(-20, -10, -10) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_3]: {
    title: "目的港清关提货",
    narrative: "飞机落地。为了确货第一时间送达会场，你需要安排清关和派送。",
    choices: [
      {
        id: "A",
        text: "走普通报关流程",
        outcome: { feedback: "海关排队导致货物在机场卡了一天。前面的努力白费了。", statsDelta: delta(-10, 0, 0) }
      },
      {
        id: "B",
        text: "提前申报“暂时进出口”或“ATA单证册”",
        outcome: { feedback: "对于参展/发布会货物，这是最快的通关方式。专业！", statsDelta: delta(10, 0, 10) }
      }
    ]
  }
};

const CASE_3_DB: Record<string, any> = {
  [GameStage.CASE_SCENARIO_1]: {
    title: "危险品识别",
    narrative: "【场景描述】\n客户委托出口一批“电动滑板车”。发票上品名写的是“运动器材”。你注意到该产品含有大容量锂电池。客户暗示：“按普货走吧，省钱省事，以前都没查。”",
    choices: [
      {
        id: "A",
        text: "听客户的，按普货订舱",
        outcome: { feedback: "这是严重违规！锂电池属于9类危险品。一旦起火，你将承担刑事责任。", statsDelta: delta(-20, 20, -50) }
      },
      {
        id: "B",
        text: "坚决拒绝，要求按 DG (危险品) 申报",
        outcome: { feedback: "坚持原则。虽然客户嫌麻烦，但你规避了灭顶之灾。", statsDelta: delta(5, -10, 0) }
      },
      {
        id: "C",
        text: "让客户提供 MSDS 和 UN38.3 鉴定报告再决定",
        outcome: { feedback: "最专业的做法。先看报告确认类别，再按规操作。", statsDelta: delta(10, 0, 5) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_2]: {
    title: "海事申报与包装",
    narrative: "经鉴定，该电池功率超过100Wh，必须走危险品通道。船公司要求提供危包证，但工厂办不下来。",
    choices: [
      {
        id: "A",
        text: "找黄牛买一份假的危包证",
        outcome: { feedback: "海事局联网核查，假证秒被识破。货被扣，人被抓。", statsDelta: delta(-50, 0, -50) }
      },
      {
        id: "B",
        text: "建议更换为符合危规的包装，并补办正规手续",
        outcome: { feedback: "虽然船期推迟了一周，但手续合规，货物安全出运。", statsDelta: delta(10, -5, 5) }
      },
      {
        id: "C",
        text: "改走香港渠道，那边查得松",
        outcome: { feedback: "虽然也是一种路径（香港实施不同规则），但增加了陆运到香港的风险和成本。", statsDelta: delta(0, -10, 5) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_3]: {
    title: "长期合规建议",
    narrative: "货物安全抵达。客户抱怨这次太折腾，想换个不这么死板的货代。",
    choices: [
      {
        id: "A",
        text: "为了留住客户，承诺下次想办法“灵活操作”",
        outcome: { feedback: "你在给自己埋雷。早晚出事。", statsDelta: delta(-10, 0, 0) }
      },
      {
        id: "B",
        text: "给客户发一份《海运危险品事故案例集锦》",
        outcome: { feedback: "触目惊心的案例教育了客户。他们意识到你是为了他们好。", statsDelta: delta(15, 0, 5) }
      }
    ]
  }
};

const CASE_4_DB: Record<string, any> = {
  [GameStage.CASE_SCENARIO_1]: {
    title: "事故定责初判",
    narrative: "【场景描述】\n一柜冷冻烤鳗运抵日本，收货人投诉货物化冻变质，温度记录仪显示中间有10小时温度飙升。船公司说码头没插电，码头说车队送晚了。你需要初步判断。",
    choices: [
      {
        id: "A",
        text: "直接拒绝赔付，让客户自己找保险",
        outcome: { feedback: "客户震怒。虽然保险会赔，但你作为物流管家的失职让人失望。", statsDelta: delta(-20, 0, 0) }
      },
      {
        id: "B",
        text: "立即提取温度记录仪数据，对照各环节交接单 (EIR)",
        outcome: { feedback: "用数据说话。找出了断链的具体时间点。", statsDelta: delta(10, 0, 0) }
      },
      {
        id: "C",
        text: "先承诺公司全额赔偿",
        outcome: { feedback: "货值高达百万，公司赔不起。你太冲动了。", statsDelta: delta(5, -50, -20) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_2]: {
    title: "证据链分析",
    narrative: "数据显示：集装箱进码头后3小时温度开始上升，持续8小时后恢复。查码头记录，该时段插座故障跳闸。",
    choices: [
      {
        id: "A",
        text: "向码头提出正式索赔",
        outcome: { feedback: "码头通常有免责条款或赔偿限额，但这是必须走的流程。", statsDelta: delta(5, 5, 0) }
      },
      {
        id: "B",
        text: "协助客户向保险公司报案，提供码头故障证明",
        outcome: { feedback: "最快挽回客户损失的办法。保险公司代位求偿比你更专业。", statsDelta: delta(10, 0, 5) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_3]: {
    title: "残值处理",
    narrative: "货物虽化冻但未完全腐坏。日本收货人拒收。这批货怎么处理？",
    choices: [
      {
        id: "A",
        text: "运回国内",
        outcome: { feedback: "运回运费+进口税可能超过货值，得不偿失。", statsDelta: delta(-5, -10, 0) }
      },
      {
        id: "B",
        text: "在当地低价拍卖或销毁",
        outcome: { feedback: "止损的最佳方案。减少了滞港费和堆存费。", statsDelta: delta(5, 5, 0) }
      }
    ]
  }
};

const CASE_5_DB: Record<string, any> = {
  [GameStage.CASE_SCENARIO_1]: {
    title: "运输路线调整",
    narrative: "【场景描述】\n宁波港因台风拥堵，预计晚开7天。客户合同约定迟一天罚款1万。你需要做出路线决策：",
    choices: [
      {
        id: "A",
        text: "等待原船期",
        outcome: { feedback: "客户被罚7万，订单减少。", statsDelta: delta(-20, 5, -10) }
      },
      {
        id: "B",
        text: "转至上海港装船 (陆运+3000)",
        outcome: { feedback: "虽然有额外费用，但保住了信誉，最优解。", statsDelta: delta(20, -10, 5) }
      },
      {
        id: "C",
        text: "海陆空联运",
        outcome: { feedback: "操作过于复杂，风险不可控。", statsDelta: delta(-5, -5, 0) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_2]: {
    title: "额外费用分摊",
    narrative: "转港产生了额外费用。这笔钱该由谁出？",
    choices: [
      {
        id: "A",
        text: "全部由客户承担",
        outcome: { feedback: "客户无奈接受，但体验差。", statsDelta: delta(-5, 10, 0) }
      },
      {
        id: "B",
        text: "申请分摊：客户出陆运，公司补差价",
        outcome: { feedback: "合情合理。信用提升。", statsDelta: delta(15, -5, 5) }
      },
      {
        id: "C",
        text: "自己承担所有",
        outcome: { feedback: "成本控制不及格。", statsDelta: delta(5, -20, -10) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_3]: {
    title: "后续防范",
    narrative: "为防止类似情况，你建议：",
    choices: [
      {
        id: "A",
        text: "购买运输延误险",
        outcome: { feedback: "专业的增值建议。", statsDelta: delta(10, 0, 5) }
      },
      {
        id: "B",
        text: "只走大船东",
        outcome: { feedback: "大船东也怕台风。", statsDelta: delta(0, 0, 0) }
      }
    ]
  }
};

const CASE_6_DB: Record<string, any> = {
  [GameStage.CASE_SCENARIO_1]: {
    title: "倒签提单请求",
    narrative: "【场景描述】\n信用证 (L/C) 要求最晚装船期是10月30日，但船实际11月2日才开。工厂为了能顺利结汇，请求你签发10月30日的提单 (倒签)。",
    choices: [
      {
        id: "A",
        text: "坚决拒绝，如实签发",
        outcome: { feedback: "工厂因‘不符点’被银行拒付，损失惨重，骂你死板。但你守住了法律底线。", statsDelta: delta(-10, 0, 0) }
      },
      {
        id: "B",
        text: "同意倒签，前提是工厂出具保函",
        outcome: { feedback: "倒签提单是欺诈行为！保函在法律上无效。一旦买家发现行情不好借机拒付，你和公司需全额赔偿。", statsDelta: delta(10, 0, -50) }
      },
      {
        id: "C",
        text: "建议客户联系买家修改信用证效期",
        outcome: { feedback: "虽然花点改证费和时间，但是唯一合规合法的解决路径。", statsDelta: delta(5, -5, 5) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_2]: {
    title: "改证沟通",
    narrative: "客户听取建议去联系买家，但买家迟迟不回邮件。船快开了，舱单需要截止。",
    choices: [
      {
        id: "A",
        text: "先按实际日期截单，等改证下来再说",
        outcome: { feedback: "稳妥。即使改证不成功，顶多是信用证转托收，不会构成欺诈。", statsDelta: delta(5, 0, 0) }
      },
      {
        id: "B",
        text: "先按倒签日期截单，赌买家会同意",
        outcome: { feedback: "你在拿职业生涯赌博。", statsDelta: delta(-10, 0, -20) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_3]: {
    title: "单证审核",
    narrative: "最终买家同意延期。在制作提单时，你发现品名和信用证上有一个字母的差异。",
    choices: [
      {
        id: "A",
        text: "严格按照信用证照抄，哪怕是错别字",
        outcome: { feedback: "正确！信用证遵循‘单单一致’原则，必须每一个字母都一样。", statsDelta: delta(5, 0, 5) }
      },
      {
        id: "B",
        text: "帮忙纠正错别字",
        outcome: { feedback: "好心办坏事。纠正了反而成了‘不符点’。", statsDelta: delta(-5, 0, 0) }
      }
    ]
  }
};

const CASE_7_DB: Record<string, any> = {
  [GameStage.CASE_SCENARIO_1]: {
    title: "特种柜方案选择",
    narrative: "【场景描述】\n客户要运一台大型锅炉，尺寸超高超宽。无法装入普通集装箱。你需要制定方案。",
    choices: [
      {
        id: "A",
        text: "使用 40FR (框架柜/Flat Rack)",
        outcome: { feedback: "适合超宽超高货物。正解。", statsDelta: delta(5, 0, 5) }
      },
      {
        id: "B",
        text: "使用 40OT (开顶柜/Open Top)",
        outcome: { feedback: "OT柜只适合超高，不适合超宽。这台锅炉装进去会卡住。", statsDelta: delta(-10, 0, 0) }
      },
      {
        id: "C",
        text: "建议走散杂船 (Break Bulk)",
        outcome: { feedback: "如果货物极其巨大，散杂船是选项。但对于单一设备，班轮特种柜通常频率更稳。", statsDelta: delta(0, 0, 0) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_2]: {
    title: "绑扎与加固",
    narrative: "框架柜的绑扎至关重要。船公司要求出具第三方绑扎证明。",
    choices: [
      {
        id: "A",
        text: "让拖车司机随便绑一下",
        outcome: { feedback: "极度危险！海上风浪会导致货物移位甚至坠海。", statsDelta: delta(-20, 0, -20) }
      },
      {
        id: "B",
        text: "聘请专业绑扎公司，使用钢丝绳和花篮螺丝",
        outcome: { feedback: "专业。确保了航行安全，船公司顺利放舱。", statsDelta: delta(10, -5, 5) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_3]: {
    title: "道路运输许可",
    narrative: "货物抵达目的港。由于超宽，普通卡车无法上路配送。",
    choices: [
      {
        id: "A",
        text: "不管那么多，趁半夜偷偷运",
        outcome: { feedback: "在国外被路政抓到罚款是天价，且可能被扣车。", statsDelta: delta(-30, 0, -10) }
      },
      {
        id: "B",
        text: "申请超限运输许可证，并安排引导车",
        outcome: { feedback: "合规操作。虽然费用高、审批慢，但是唯一途径。", statsDelta: delta(5, -5, 5) }
      }
    ]
  }
};

const CASE_8_DB: Record<string, any> = {
  [GameStage.CASE_SCENARIO_1]: {
    title: "海关侵权嫌疑",
    narrative: "【场景描述】\n海关查验通知：你代理出口的休闲鞋上有类似‘耐克’的钩子图案，涉嫌侵犯知识产权。货物被扣留。客户坚称是自己设计的。",
    choices: [
      {
        id: "A",
        text: "立即通知客户，要求提供品牌授权书或不侵权证明",
        outcome: { feedback: "标准流程。必须先确认法律事实。", statsDelta: delta(5, 0, 0) }
      },
      {
        id: "B",
        text: "帮客户辩解说这只是装饰花纹",
        outcome: { feedback: "海关只认法律文书，口头辩解无用。", statsDelta: delta(-5, 0, 0) }
      },
      {
        id: "C",
        text: "弃货不管了",
        outcome: { feedback: "作为申报单位，你可能要承担连带罚款责任。", statsDelta: delta(-10, 0, -10) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_2]: {
    title: "权利人确权",
    narrative: "海关联系了权利人（品牌方）。品牌方确认侵权并申请海关扣货。客户慌了，问能不能通过‘关系’捞出来。",
    choices: [
      {
        id: "A",
        text: "严词拒绝，告知必须走法律程序",
        outcome: { feedback: "正确。此时任何灰色操作都会把你拖下水。", statsDelta: delta(5, 0, 0) }
      },
      {
        id: "B",
        text: "尝试贿赂海关查验科",
        outcome: { feedback: "违法行为！", statsDelta: delta(-50, 0, -50) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_3]: {
    title: "处罚与善后",
    narrative: "货物最终被没收销毁，海关开出罚单。客户拒付罚款和仓租柜租。",
    choices: [
      {
        id: "A",
        text: "向海关申请减免",
        outcome: { feedback: "可以尝试，但概率不大。", statsDelta: delta(0, 0, 0) }
      },
      {
        id: "B",
        text: "依据《货运代理协议》起诉客户追偿",
        outcome: { feedback: "如果合同签署完善，这是维护公司权益的最后手段。", statsDelta: delta(0, 0, 5) }
      }
    ]
  }
};

const CASE_9_DB: Record<string, any> = {
  [GameStage.CASE_SCENARIO_1]: {
    title: "DDP 进口商抬头 (IOR)",
    narrative: "【场景描述】\n客户发货去美国亚马逊 FBA 仓。做 DDP (完税后交货)。客户没有美国公司，想借用你们的美国代理公司作为‘进口商’ (IOR) 进行清关。",
    choices: [
      {
        id: "A",
        text: "同意借用，收一笔手续费",
        outcome: { feedback: "风险极大！如果客户货物有质量问题或侵权，IOR要承担全部法律责任。", statsDelta: delta(-10, 10, -20) }
      },
      {
        id: "B",
        text: "拒绝，要求客户购买‘进口商Bond’",
        outcome: { feedback: "正规操作。虽然客户要多花钱买Bond，但责任划分清晰。", statsDelta: delta(5, -5, 5) }
      },
      {
        id: "C",
        text: "建议低申报货值来避税",
        outcome: { feedback: "美国海关对电商查验极严，低申报会被处以数倍罚款。", statsDelta: delta(-10, 5, -10) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_2]: {
    title: "关税支付",
    narrative: "美国加征关税，税率从10%涨到了25%。客户觉得税太高，想弃货。",
    choices: [
      {
        id: "A",
        text: "告知弃货也会产生销毁费，且会影响信誉",
        outcome: { feedback: "陈清利害，迫使客户面对现实。", statsDelta: delta(5, 0, 0) }
      },
      {
        id: "B",
        text: "帮客户垫付关税",
        outcome: { feedback: "千万别！很多货代死于帮客户垫税后客户跑路。", statsDelta: delta(5, -30, -20) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_3]: {
    title: "FBA 送仓预约",
    narrative: "货物清关放行。亚马逊仓库爆仓，预约不到送货时间。免租期快到了。",
    choices: [
      {
        id: "A",
        text: "不管预约，直接送过去碰运气",
        outcome: { feedback: "亚马逊会直接拒收！产生高额退货运费。", statsDelta: delta(-20, -10, 0) }
      },
      {
        id: "B",
        text: "安排海外仓中转暂存，等待预约",
        outcome: { feedback: "虽然有仓储费，但这是唯一可行的方案。", statsDelta: delta(10, -5, 5) }
      }
    ]
  }
};

const CASE_10_DB: Record<string, any> = {
  [GameStage.CASE_SCENARIO_1]: {
    title: "进口申报策略",
    narrative: "【场景描述】\n上海M公司从德国进口精密仪器，申报价格CIF 450万。海关认为价格偏低，可能涉及漏税。现在需要申报：",
    choices: [
      {
        id: "A",
        text: "按合同价格申报，不准备材料",
        outcome: { feedback: "极大概率被质疑，进入估价程序会非常麻烦。", statsDelta: delta(-10, 0, 0) }
      },
      {
        id: "B",
        text: "准备完整的价格证明（发票、付汇凭证）",
        outcome: { feedback: "标准做法。有理有据，身正不怕影子斜。", statsDelta: delta(10, 5, 0) }
      },
      {
        id: "C",
        text: "申请价格预裁定",
        outcome: { feedback: "最稳妥的做法，提前沟通，避免后续被动。", statsDelta: delta(15, 0, 5) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_2]: {
    title: "海关质疑应对",
    narrative: "海关发出《价格质疑通知书》。要求解释为何低于市场价。",
    choices: [
      {
        id: "A",
        text: "拒绝提供补充材料",
        outcome: { feedback: "大忌！海关将直接按市场高价核定。", statsDelta: delta(-20, -20, 0) }
      },
      {
        id: "B",
        text: "提供证明 + 解释（如旧款促销）",
        outcome: { feedback: "专业。海关接受解释的概率很大。", statsDelta: delta(10, 5, 5) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_3]: {
    title: "税费计算与准备",
    narrative: "海关最终还是决定重新估价。你需要帮客户计算风险。",
    choices: [
      {
        id: "A",
        text: "按申报价格计算，忽略风险",
        outcome: { feedback: "过于乐观，一旦补税，客户资金链可能断裂。", statsDelta: delta(-10, -5, 0) }
      },
      {
        id: "B",
        text: "建议客户缴纳保证金先放行",
        outcome: { feedback: "既不耽误使用货物，又争取了磋商时间。高明。", statsDelta: delta(10, 5, 5) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_4]: {
    title: "行政复议决策",
    narrative: "海关核定完税价格为680万。客户不服。",
    choices: [
      {
        id: "A",
        text: "放弃复议，交钱了事",
        outcome: { feedback: "客户损失资金。", statsDelta: delta(-5, -10, 0) }
      },
      {
        id: "B",
        text: "申请行政复议 + 聘请专业律师",
        outcome: { feedback: "唯一的翻盘机会，展现专业价值。", statsDelta: delta(10, -5, 10) }
      }
    ]
  }
};

const TUTORIAL_DB: Record<GameStage, any> = {
  [GameStage.START]: { title: "", narrative: "", choices: [] }, 
  [GameStage.SUMMARY]: { title: "", narrative: "", choices: [] }, 
  [GameStage.CASE_SCENARIO_1]: { title: "", narrative: "", choices: [] }, 
  [GameStage.CASE_SCENARIO_2]: { title: "", narrative: "", choices: [] }, 
  [GameStage.CASE_SCENARIO_3]: { title: "", narrative: "", choices: [] }, 
  [GameStage.CASE_SCENARIO_4]: { title: "", narrative: "", choices: [] }, 

  [GameStage.CLIENT_INQUIRY]: {
    title: "1. 客户咨询 (Inquiry)",
    narrative: "你收到一家大型电子制造厂的询盘。客户名为“宏达科技”，计划出口一批精密电子元器件到德国汉堡。客户经理语气急促，强调这批货赶着上生产线，绝对不能延误，但同时也暗示之前的货代收费太高。作为业务员，你需要确立第一印象。",
    choices: [
      {
        id: "A",
        text: "承诺时效优先，价格好商量",
        outcome: { feedback: "客户对你的态度很满意，但你给自己挖了个价格坑。", statsDelta: delta(10, -5, 0) }
      },
      {
        id: "B",
        text: "详细询问货物参数，展现专业性",
        outcome: { feedback: "客户觉得你很专业，虽然略显繁琐，但建立了信任。", statsDelta: delta(5, 0, 0) }
      },
      {
        id: "C",
        text: "直接报出一个极低的市场揽货价",
        outcome: { feedback: "客户对低价很感兴趣，但对你的服务质量心存疑虑。", statsDelta: delta(-5, 5, 5) }
      }
    ]
  },

  [GameStage.CARGO_ANALYSIS]: {
    title: "2. 货物分析 (Cargo Analysis)",
    narrative: "客户发来了货物清单：总共 28 个托盘，总体积 26 CBM (立方米)，总重量 18 吨。货物为精密仪器，怕潮湿，怕震动。你需要分析这批货物的特性来决定后续操作。",
    choices: [
      {
        id: "A",
        text: "建议购买高额保险并打木箱加固",
        outcome: { feedback: "方案很稳妥，但客户觉得包装成本大幅上升了。", statsDelta: delta(5, -10, 0) }
      },
      {
        id: "B",
        text: "确认托盘尺寸，计算是否能装入普柜",
        outcome: { feedback: "标准的专业操作，精准计算避免了浪费。", statsDelta: delta(5, 5, 5) }
      },
      {
        id: "C",
        text: "不看细节，直接按大概体积报价",
        outcome: { feedback: "你忽略了精密仪器的特性，为后续埋下了隐患。", statsDelta: delta(-10, 0, 5) }
      }
    ]
  },

  [GameStage.LCL_FCL_DECISION]: {
    title: "3. 拼箱与整箱决策 (LCL vs FCL)",
    narrative: "货物 26 CBM。20GP集装箱通常装 28-30 CBM，但这批货有托盘可能装不下；走拼箱 (LCL) 费用可能比整箱 (FCL) 更高且不安全。你需要做出专业判断。",
    choices: [
      {
        id: "A",
        text: "为了安全，强烈建议包一个 20GP 整箱",
        outcome: { feedback: "20GP可能装不下26CBM的托盘货！你可能面临爆柜风险。", statsDelta: delta(-5, -5, 0) }
      },
      {
        id: "B",
        text: "建议走拼箱 (LCL)，按体积计费",
        outcome: { feedback: "拼箱多次装卸容易损坏精密仪器，且26CBM的拼箱费比整箱还贵。", statsDelta: delta(-10, -10, 10) }
      },
      {
        id: "C",
        text: "建议使用 40GP 或 40HQ，虽然空一点但最稳妥",
        outcome: { feedback: "虽然会有空间浪费，但对于精密仪器和26CBM托盘货，这是最合理的整箱方案。", statsDelta: delta(10, -5, 5) }
      }
    ]
  },

  [GameStage.CONTAINER_SELECTION]: {
    title: "4. 箱型与尺寸选择 (Container Selection)",
    narrative: "基于刚才的分析，客户最终同意走整箱。现在需要确定具体的集装箱类型。货物高度较高，且不能倒置。",
    choices: [
      {
        id: "A",
        text: "预订 40GP (标准干货箱)",
        outcome: { feedback: "中规中矩的选择，适合大部分货物。", statsDelta: delta(0, 0, 0) }
      },
      {
        id: "B",
        text: "预订 40HQ (高柜)，价格只比GP贵一点",
        outcome: { feedback: "明智！HQ容积更大，对于抛货或高托盘更友好，性价比极高。", statsDelta: delta(5, 5, 0) }
      },
      {
        id: "C",
        text: "预订 20GP x 2",
        outcome: { feedback: "两个小柜的运费远高于一个大柜，客户对你的成本控制能力表示怀疑。", statsDelta: delta(-5, -15, 10) }
      }
    ]
  },

  [GameStage.INCOTERMS]: {
    title: "5. 贸易术语确认 (Incoterms)",
    narrative: "工厂询问报价条款。德国买家希望货物送到汉堡港口即可，剩下的他们自己处理。工厂希望你在报价中包含运费。",
    choices: [
      {
        id: "A",
        text: "报价 FOB Shenzhen (船上交货)",
        outcome: { feedback: "FOB条款下，海运费由买家承担，你不应该报运费给工厂。专业性扣分。", statsDelta: delta(-10, 0, 0) }
      },
      {
        id: "B",
        text: "报价 CIF Hamburg (成本+保险+运费)",
        outcome: { feedback: "正确。CIF条款包含了运费和保险，符合工厂需求，且你能掌握海运控制权。", statsDelta: delta(5, 0, 10) }
      },
      {
        id: "C",
        text: "报价 DDP Hamburg (完税后交货)",
        outcome: { feedback: "DDP风险极大，包含进口清关和关税，买家只要求到港，你做得太多了。", statsDelta: delta(0, -10, 5) }
      }
    ]
  },

  [GameStage.CARRIER_SELECTION]: {
    title: "6. 船公司选择 (Carrier Selection)",
    narrative: "你需要订舱了。目前去汉堡有三条船可选：\n1. Maersk (马士基)：直航，25天，价格 $3000。\n2. EMC (长荣)：中转一次，32天，价格 $2400。\n3. 小船东：中转两次，40天+，价格 $1800。",
    choices: [
      {
        id: "A",
        text: "选择 Maersk (顶级服务)",
        outcome: { feedback: "客户对时效满意，但运费成本较高。", statsDelta: delta(10, -10, 0) }
      },
      {
        id: "B",
        text: "选择 EMC (性价平衡)",
        outcome: { feedback: "平衡的选择。时效可接受，价格适中。", statsDelta: delta(5, 5, 5) }
      },
      {
        id: "C",
        text: "选择廉价小船东",
        outcome: { feedback: "虽然便宜，但船期极不稳定，对于赶工期的精密仪器风险巨大。", statsDelta: delta(-15, 15, 10) }
      }
    ]
  },

  [GameStage.ROUTE_PLANNING]: {
    title: "7. 航线规划 (Route Planning)",
    narrative: "这周台风“梅花”正在接近台湾海峡，可能会影响部分航线。你需要确认最终路径。",
    choices: [
      {
        id: "A",
        text: "坚持原定航线，赌台风转向",
        outcome: { feedback: "赌徒心态。虽然没产生额外费用，但增加了巨大延误风险。", statsDelta: delta(-5, 5, 5) }
      },
      {
        id: "B",
        text: "改挂靠新加坡中转的船，避开台风区",
        outcome: { feedback: "虽然时间稍长，但保证了货物安全，体现了风险管理能力。", statsDelta: delta(5, -5, 0) }
      },
      {
        id: "C",
        text: "通知客户可能延误，不作调整",
        outcome: { feedback: "诚实告知是好的，但缺乏主动解决问题的方案。", statsDelta: delta(0, 0, 0) }
      }
    ]
  },

  [GameStage.QUOTATION]: {
    title: "8. 最终报价 (Quotation)",
    narrative: "综合以上选择，你需要给客户发正式报价单了。除了海运费，还有各种附加费 (THC, DOC, Seal Fee)。",
    choices: [
      {
        id: "A",
        text: "All-in 价，一口价包干",
        outcome: { feedback: "简单明了，客户喜欢，但如果后续有涨价由于你没列明细，只能自己亏。", statsDelta: delta(5, 0, -5) }
      },
      {
        id: "B",
        text: "列明各项费用，实报实销",
        outcome: { feedback: "最透明的方式，财务合规，客户最信任。", statsDelta: delta(10, 0, 0) }
      },
      {
        id: "C",
        text: "低运费 + 高杂费 (把利润藏在杂费里)",
        outcome: { feedback: "行业潜规则。运费看着便宜吸引了客户，但杂费账单发过去时客户会发飙。", statsDelta: delta(-10, 5, 15) }
      }
    ]
  },

  [GameStage.BOOKING]: {
    title: "9. 订舱操作 (Booking)",
    narrative: "向船公司发送托书 (Booking Request)。此时正值旺季，舱位紧张。",
    choices: [
      {
        id: "A",
        text: "如实申报货物名为“精密电子控制器”",
        outcome: { feedback: "正常操作。船公司审核顺利。", statsDelta: delta(5, 0, 0) }
      },
      {
        id: "B",
        text: "申报为“普通五金件”以避免敏感货查验",
        outcome: { feedback: "这是虚假申报！一旦海关查验发现品名不符，将面临巨额罚款甚至扣货。", statsDelta: delta(-20, 0, 0) }
      },
      {
        id: "C",
        text: "加钱付“保舱费” (Diamond Tier)",
        outcome: { feedback: "确保了旺季舱位，虽然成本增加，但保证了发货。", statsDelta: delta(5, -5, 5) }
      }
    ]
  },

  [GameStage.ORIGIN_INLAND]: {
    title: "10. 起运地内陆运输 (Origin Inland)",
    narrative: "S/O (装货单) 下来了。工厂在东莞，港口在深圳盐田。需要安排车辆去工厂装货。",
    choices: [
      {
        id: "A",
        text: "安排大型集卡拖车 (Trucking) 到厂做柜",
        outcome: { feedback: "最标准的门到港操作，时效快。", statsDelta: delta(5, 0, 0) }
      },
      {
        id: "B",
        text: "让工厂自己找车送货到码头仓库",
        outcome: { feedback: "省事，但如果工厂车辆不合规或误了截港时间，责任不好划分。", statsDelta: delta(0, 5, 0) }
      },
      {
        id: "C",
        text: "安排“双拖” (一车两柜) 拼车",
        outcome: { feedback: "如果是两个20GP可以双拖省钱，但你是40HQ！根本拖不了，业务失误。", statsDelta: delta(-5, 0, 0) }
      }
    ]
  },

  [GameStage.WAREHOUSING]: {
    title: "11. 仓库装箱/集货 (Warehousing)",
    narrative: "货物正在装柜。监装员发来照片，发现工厂包装有些破损，且装柜时没有加固。",
    choices: [
      {
        id: "A",
        text: "立刻暂停，要求工厂更换包装并加固",
        outcome: { feedback: "虽然耽误了几小时，但避免了海上颠簸导致的货损，非常负责。", statsDelta: delta(10, -5, 0) }
      },
      {
        id: "B",
        text: "拍照留底，照常发货，并在提单备注",
        outcome: { feedback: "典型的甩锅行为。虽然免责，但客户收到坏货后不会再找你。", statsDelta: delta(-10, 0, 0) }
      },
      {
        id: "C",
        text: "视而不见，赶船期要紧",
        outcome: { feedback: "极度不负责任。精密仪器几乎百分百会损坏。", statsDelta: delta(-20, 0, 0) }
      }
    ]
  },

  [GameStage.EXPORT_CUSTOMS]: {
    title: "12. 出口报关 (Export Customs)",
    narrative: "货柜进入码头堆场。需要向海关申报。这批电子产品涉及出口退税。",
    choices: [
      {
        id: "A",
        text: "正规代理报关，核对所有HS编码",
        outcome: { feedback: "稳妥。虽然需要整理单证，但确保了退税顺畅。", statsDelta: delta(5, 0, 0) }
      },
      {
        id: "B",
        text: "买单出口 (借用他人核销单)",
        outcome: { feedback: "违规操作！客户是正规大厂需要退税，买单会导致客户无法退税，大事故！", statsDelta: delta(-30, 5, 10) }
      },
      {
        id: "C",
        text: "模糊申报品名以加快通关",
        outcome: { feedback: "有被海关查验扣货的风险。", statsDelta: delta(-5, 0, 0) }
      }
    ]
  },

  [GameStage.BILL_OF_LADING]: {
    title: "13. 提单确认 (Bill of Lading)",
    narrative: "船开了。船公司签发了提单草稿 (Draft B/L)。需要确认提单内容。",
    choices: [
      {
        id: "A",
        text: "出船东单 (MBL) 给客户",
        outcome: { feedback: "MBL直接由船公司签发，目的港提货方便，但你失去了对货权的控制。", statsDelta: delta(0, 5, -5) }
      },
      {
        id: "B",
        text: "出货代单 (HBL) 给客户",
        outcome: { feedback: "标准操作。你在目的港有代理，可以用HBL控制货权，防止买家无单提货。", statsDelta: delta(5, 0, 5) }
      },
      {
        id: "C",
        text: "直接做电放 (Telex Release)",
        outcome: { feedback: "客户还没付全款你就电放？风险极大，一旦买家提货不付款，你全责。", statsDelta: delta(-10, 0, 0) }
      }
    ]
  },

  [GameStage.INSURANCE]: {
    title: "14. 货运保险 (Insurance)",
    narrative: "因为是CIF条款，你需要代买保险。货物价值 50 万美元。",
    choices: [
      {
        id: "A",
        text: "购买 ICC (A) 一切险",
        outcome: { feedback: "最全面的保障，涵盖水渍、偷窃等。对于高值电子产品是必须的。", statsDelta: delta(5, -5, 5) }
      },
      {
        id: "B",
        text: "购买 ICC (C) 平安险",
        outcome: { feedback: "平安险只赔全损（如沉船），不赔部分损坏。对于精密仪器来说太吝啬了。", statsDelta: delta(-5, 5, 0) }
      },
      {
        id: "C",
        text: "告诉客户保险太贵，赌运气不买",
        outcome: { feedback: "CIF条款强制要求卖方买保险。你这是违约。", statsDelta: delta(-15, 0, 0) }
      }
    ]
  },

  [GameStage.OCEAN_TRANSIT]: {
    title: "15. 海运途中 (Ocean Transit)",
    narrative: "船行驶至苏伊士运河时，发来通知说遭遇堵塞，预计延误 5 天。",
    choices: [
      {
        id: "A",
        text: "立即通知客户，并提供实时船舶定位链接",
        outcome: { feedback: "信息透明。客户虽然不爽延误，但感激你的及时通知。", statsDelta: delta(5, 0, 0) }
      },
      {
        id: "B",
        text: "隐瞒消息，等到港了再说",
        outcome: { feedback: "等到港才发现晚了，客户会暴怒，且影响工厂生产计划。", statsDelta: delta(-10, 0, 0) }
      },
      {
        id: "C",
        text: "忽悠客户说是因为海关查验延误",
        outcome: { feedback: "撒谎容易被拆穿，且把锅甩给海关显得不专业。", statsDelta: delta(-5, 0, 0) }
      }
    ]
  },

  [GameStage.DOCS_EXCHANGE]: {
    title: "16. 单证交接 (Docs Exchange)",
    narrative: "货物快到港了。你需要将正本提单、发票、箱单寄给客户（或买家）。",
    choices: [
      {
        id: "A",
        text: "使用国际快递 (DHL/FedEx) 寄送",
        outcome: { feedback: "安全、快速、可追踪。标准做法。", statsDelta: delta(5, 0, 0) }
      },
      {
        id: "B",
        text: "使用平邮寄送以省钱",
        outcome: { feedback: "如果提单丢了，重开提单需要抵押 200% 货值保证金一年！你为了省几十块钱冒了天大的险。", statsDelta: delta(-20, 5, 0) }
      },
      {
        id: "C",
        text: "扫描件发邮件，正本自己留着",
        outcome: { feedback: "除非做了电放，否则买家凭扫描件无法提货。会导致滞港费。", statsDelta: delta(-5, 0, 0) }
      }
    ]
  },

  [GameStage.DESTINATION_NOTIFY]: {
    title: "17. 到货通知 (Arrival Notice)",
    narrative: "船到达汉堡港。你的德国代理需要联系收货人。",
    choices: [
      {
        id: "A",
        text: "提前 3 天发送《到货通知书》",
        outcome: { feedback: "给了收货人充足时间准备清关资料。优秀。", statsDelta: delta(5, 0, 0) }
      },
      {
        id: "B",
        text: "船到之后再联系",
        outcome: { feedback: "太晚了！德国免堆期很短，可能会产生滞箱费。", statsDelta: delta(-5, 0, 0) }
      },
      {
        id: "C",
        text: "坐等收货人来联系我们",
        outcome: { feedback: "被动服务。收货人可能不知道船已经到了。", statsDelta: delta(-10, 0, 0) }
      }
    ]
  },

  [GameStage.IMPORT_CUSTOMS]: {
    title: "18. 目的港清关 (Import Customs)",
    narrative: "德国海关对这批货进行抽查。需要提供 CE 认证证书。",
    choices: [
      {
        id: "A",
        text: "马上联系工厂索要 CE 证书并扫描发送",
        outcome: { feedback: "反应迅速，解决了问题。", statsDelta: delta(5, 0, 0) }
      },
      {
        id: "B",
        text: "伪造一份 CE 证书",
        outcome: { feedback: "在德国伪造文件？这是犯罪行为！", statsDelta: delta(-50, 0, 0) }
      },
      {
        id: "C",
        text: "告诉海关这是样品，不需要认证",
        outcome: { feedback: "26 CBM 的样品？海关不会信的。", statsDelta: delta(-10, 0, 0) }
      }
    ]
  },

  [GameStage.DESTINATION_INLAND]: {
    title: "19. 目的地配送 (Destination Delivery)",
    narrative: "清关放行。需要从汉堡港送到柏林的仓库。",
    choices: [
      {
        id: "A",
        text: "安排集卡直送 (Truck)",
        outcome: { feedback: "速度快，门到门。德国卡车运费较高，但最可靠。", statsDelta: delta(5, -5, 0) }
      },
      {
        id: "B",
        text: "安排铁路运输 (Rail) + 短驳",
        outcome: { feedback: "欧洲铁路网发达，成本较低，但需要二次转运，时间稍长。", statsDelta: delta(0, 5, 5) }
      },
      {
        id: "C",
        text: "安排莱茵河驳船 (Barge)",
        outcome: { feedback: "柏林不在莱茵河畔！地理知识欠缺，方案不可行。", statsDelta: delta(-10, 0, 0) }
      }
    ]
  },

  [GameStage.DELIVERY]: {
    title: "20. 最终交付 (Final Delivery)",
    narrative: "货物送达客户仓库。需要签收 POD (签收单)。",
    choices: [
      {
        id: "A",
        text: "确认外包装完好，请客户签字盖章",
        outcome: { feedback: "完美的闭环。", statsDelta: delta(10, 0, 10) }
      },
      {
        id: "B",
        text: "卸货就走，忘记拿签收单",
        outcome: { feedback: "如果没有POD，客户赖账说没收到货怎么办？", statsDelta: delta(-5, 0, 0) }
      },
      {
        id: "C",
        text: "强迫司机索要小费",
        outcome: { feedback: "损害公司形象。", statsDelta: delta(-5, 0, 0) }
      }
    ]
  }
};

export const SCENARIO_DB = TUTORIAL_DB; // Default export mostly for type checking, but unused logic