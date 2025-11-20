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
    title: "实训课程：全流程海运操作",
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
    title: "案例 1：铁路转空运的费用争议",
    description: "真实案例改编。货物因单证问题被扣，需要退运并转空运。如何处理由此产生的巨额费用争议，并挽回大客户？",
    difficulty: "Hard",
    tags: ["危机公关", "多式联运", "索赔谈判"],
    flow: [GameStage.CASE_SCENARIO_1, GameStage.CASE_SCENARIO_2, GameStage.CASE_SCENARIO_3, GameStage.SUMMARY]
  },
  {
    id: "case_5",
    title: "案例 5：突发港口拥堵的货运重排",
    description: "宁波港因台风拥堵，服装客户面临违约风险。在等待、转港、空运之间做出最优决策。",
    difficulty: "Medium",
    tags: ["突发事件", "成本计算", "时效管理"],
    flow: [GameStage.CASE_SCENARIO_1, GameStage.CASE_SCENARIO_2, GameStage.CASE_SCENARIO_3, GameStage.SUMMARY]
  },
  {
    id: "case_10",
    title: "案例 10：精密仪器进口海关估价争议",
    description: "海关认为申报价格过低，要求补税。你需要协助客户准备材料，处理行政复议，平衡税费成本。",
    difficulty: "Hard",
    tags: ["进口清关", "海关估价", "合规"],
    flow: [GameStage.CASE_SCENARIO_1, GameStage.CASE_SCENARIO_2, GameStage.CASE_SCENARIO_3, GameStage.CASE_SCENARIO_4, GameStage.SUMMARY]
  }
];

// --- SCENARIO DATA STORE ---

// We use a nested structure or simply unique keys to differentiate scenarios. 
// To keep it simple with the current architecture, we will map the Generic Stages (CASE_SCENARIO_X) 
// dynamically based on the Case ID in the Service, OR we can flatten the DB here but use composite keys conceptually.
// 
// Limitation: The current app uses `GameStage` as the key. 
// Strategy: The service will need to know which Case is active. 
// Actually, to avoid massive refactoring of the Service, we will stick to the `GameStage` key,
// BUT we will have to swap the content of `CASE_SCENARIO_1` based on the selected case in the App state.
// Wait, that's complex. 
// Better approach: `SCENARIO_DB` will be a function or a map where we look up `CaseID` then `Stage`.
// But for now, let's make `SCENARIO_DB` export a function `getScenario(caseId, stage)`.

export const getScenarioContent = (caseId: string, stage: GameStage) => {
  // 1. Tutorial Case (Standard Flow)
  if (caseId === 'tutorial') {
    return TUTORIAL_DB[stage];
  }
  
  // 2. Specific Cases
  if (caseId === 'case_1') return CASE_1_DB[stage];
  if (caseId === 'case_5') return CASE_5_DB[stage];
  if (caseId === 'case_10') return CASE_10_DB[stage];

  return null;
};


const CASE_1_DB: Record<string, any> = {
  [GameStage.CASE_SCENARIO_1]: {
    title: "责任认定与费用分摊方案选择",
    narrative: "【场景描述】\n您承接A供应链公司委托：通过“渝新欧”铁路将丹麦燕麦片运至重庆。行至波兰口岸时，因客户仅能提供卫生证书，缺失植物检疫证书正本被扣。协调退运至荷兰后转空运，产生空运费5.8万、仓储费6200、处置费3539元。客户要求退还剩余保证金并索赔额外费用，但双方仍有大额合作前景。\n\n你需要决定如何处理这笔费用争议：",
    choices: [
      {
        id: "A",
        text: "拒绝退款，主张全部额外费用由客户承担",
        outcome: { feedback: "虽然维护了公司短期利益，但客户立即终止合作，导致佣金损失逾10万元，信用评级下降。", statsDelta: delta(-30, 10, -10) }
      },
      {
        id: "B",
        text: "退还剩余保证金并赔偿额外费用，自行承担损失",
        outcome: { feedback: "你承担了所有责任。短期亏损32,400元，但保留了客户，后续可挽回损失。", statsDelta: delta(20, -20, -10) }
      },
      {
        id: "C",
        text: "与客户协商：扣除铁路运费+50%额外费用，退还部分保证金",
        outcome: { feedback: "完美的折中方案。双方分摊损失，客户满意度保留80%，长期合作得以维持。", statsDelta: delta(10, 5, 5) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_2]: {
    title: "保证金退还金额的核算",
    narrative: "经过初步沟通，客户同意了协商方案。现在需要核算具体的退款金额。客户已支付81,354元保证金，铁路运费25,748.6元，额外杂费总计约6.7万元。\n你需要给出一个精确的计算结果来说服财务和客户：",
    choices: [
      {
        id: "A",
        text: "简单粗暴：保证金 - 铁路运费 - 全部杂费",
        outcome: { feedback: "客户觉得你没有诚意，这和让客户全赔没区别。", statsDelta: delta(-10, 5, 0) }
      },
      {
        id: "B",
        text: "退还 22,805.4 元 (扣除运费及50%额外费用)",
        outcome: { feedback: "计算精准，有理有据。体现了双方共担风险的精神。", statsDelta: delta(10, 5, 5) }
      },
      {
        id: "C",
        text: "全额退还保证金，费用以后再说",
        outcome: { feedback: "财务部拒绝了你的申请。公司不可能在没有结清费用的情况下退款。", statsDelta: delta(0, -10, -5) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_3]: {
    title: "长期合作关系的维护",
    narrative: "危机暂时解除，货物最终通过空运抵达重庆。为了修复这段波折带来的关系裂痕，你打算：",
    choices: [
      {
        id: "A",
        text: "不再主动联系，避免尴尬",
        outcome: { feedback: "客户关系逐渐冷淡，最终流失。", statsDelta: delta(-10, 0, -5) }
      },
      {
        id: "B",
        text: "承诺后续合作给予 5% 佣金优惠",
        outcome: { feedback: "既给了面子又给了里子。客户感受到了诚意，追加了新订单。", statsDelta: delta(15, -5, 10) }
      },
      {
        id: "C",
        text: "推销更贵的VIP服务以弥补亏损",
        outcome: { feedback: "客户觉得你只想赚钱，反感倍增。", statsDelta: delta(-20, 10, 5) }
      }
    ]
  }
};

const CASE_5_DB: Record<string, any> = {
  [GameStage.CASE_SCENARIO_1]: {
    title: "运输路线调整",
    narrative: "【场景描述】\n你为E公司安排宁波至洛杉矶的服装运输（CIF），原定6月10日开航。开航前3天突发通知：宁波港因台风预计拥堵7天。客户合同约定“延迟交货每日罚0.5%货款”。\n你需要做出路线决策：",
    choices: [
      {
        id: "A",
        text: "等待原船期 (交货延迟7天，面临违约金)",
        outcome: { feedback: "客户被罚扣除1万元违约金，非常不满，后续订单减少30%。", statsDelta: delta(-20, 5, -10) }
      },
      {
        id: "B",
        text: "转至上海港装船 (陆运+3000，舱位+5000，可按时)",
        outcome: { feedback: "虽然增加了8000元成本，但保住了信誉和后续订单，是最优解。", statsDelta: delta(20, -10, 5) }
      },
      {
        id: "C",
        text: "拆分货物：30%空运 + 70%海运",
        outcome: { feedback: "空运成本太高（额外2万），虽然解决了急货，但整体利润被严重压缩。", statsDelta: delta(10, -20, -5) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_2]: {
    title: "违约金与额外成本平衡",
    narrative: "假如你选择了转港方案，产生了8000元额外费用。这笔钱该由谁出？",
    choices: [
      {
        id: "A",
        text: "全部由客户承担，毕竟台风是不可抗力",
        outcome: { feedback: "客户虽然无奈接受，但觉得你没有担当，服务体验差。", statsDelta: delta(-5, 10, 0) }
      },
      {
        id: "B",
        text: "向客户申请分摊 3,000 元陆运费，公司承担舱位差价",
        outcome: { feedback: "合情合理。客户感激你承担了大头，信用评级提升。", statsDelta: delta(15, -5, 5) }
      },
      {
        id: "C",
        text: "全部由自己/公司承担，不敢告诉客户",
        outcome: { feedback: "虽然客户满意，但你这个月白干了。成本控制不及格。", statsDelta: delta(5, -20, -10) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_3]: {
    title: "后续服务与复盘",
    narrative: "货物顺利按时发出。事后为了防止类似情况：",
    choices: [
      {
        id: "A",
        text: "建议客户购买“运输延误险”",
        outcome: { feedback: "专业的增值建议，客户觉得你很为他们着想。", statsDelta: delta(10, 0, 5) }
      },
      {
        id: "B",
        text: "以后只推荐大船东，不走廉价航线",
        outcome: { feedback: "虽然大船东由于天气也可能延误，但整体服务更好。", statsDelta: delta(5, -5, 0) }
      },
      {
        id: "C",
        text: "不做任何改变，台风只是运气不好",
        outcome: { feedback: "缺乏风险意识。", statsDelta: delta(-5, 0, 0) }
      }
    ]
  }
};

const CASE_10_DB: Record<string, any> = {
  [GameStage.CASE_SCENARIO_1]: {
    title: "进口申报策略",
    narrative: "【场景描述】\n上海M公司从德国进口精密仪器（货值约500万），申报价格为CIF上海450万。海关认为价格“明显偏低”，可能涉及低报漏税。\n现在需要提交申报，你会：",
    choices: [
      {
        id: "A",
        text: "按合同价格申报，不准备证明材料",
        outcome: { feedback: "被海关质疑的概率极高，一旦进入估价程序会非常麻烦。", statsDelta: delta(-10, 0, 0) }
      },
      {
        id: "B",
        text: "按合同申报，并准备完整的价格证明（发票、付汇凭证）",
        outcome: { feedback: "标准且正确的做法。有理有据，身正不怕影子斜。", statsDelta: delta(10, 5, 0) }
      },
      {
        id: "C",
        text: "申报前先咨询海关估价部门，确认价格是否合理",
        outcome: { feedback: "最稳妥的做法，也就是“预裁定”或提前沟通，避免后续被动。", statsDelta: delta(15, 0, 5) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_2]: {
    title: "海关质疑应对",
    narrative: "海关发出了《价格质疑通知书》。要求进一步解释为何价格低于市场价。",
    choices: [
      {
        id: "A",
        text: "不配合海关调查，拒绝提供补充材料",
        outcome: { feedback: "大忌！这会导致海关直接按市场高价核定，税款大增。", statsDelta: delta(-20, -20, 0) }
      },
      {
        id: "B",
        text: "提供完整的价格证明 + 专业评估报告 + 解释（如旧款促销）",
        outcome: { feedback: "非常专业。海关接受解释的概率很大。", statsDelta: delta(10, 5, 5) }
      },
      {
        id: "C",
        text: "找关系试图“搞定”",
        outcome: { feedback: "违规且高风险，可能导致企业被降级稽查。", statsDelta: delta(-30, -10, -10) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_3]: {
    title: "税费计算与准备",
    narrative: "海关最终还是决定重新估价。你需要帮客户计算风险。",
    choices: [
      {
        id: "A",
        text: "按申报价格计算，不考虑海关估价风险",
        outcome: { feedback: "过于乐观，一旦补税，客户资金链可能断裂。", statsDelta: delta(-10, -5, 0) }
      },
      {
        id: "B",
        text: "预估可能的海关估价，建议客户预留税费准备金",
        outcome: { feedback: "专业的财务建议，帮助客户规避了资金风险。", statsDelta: delta(10, 5, 0) }
      },
      {
        id: "C",
        text: "精确计算各种税费（关税、增值税、滞纳金）",
        outcome: { feedback: "精准的专业能力体现。", statsDelta: delta(10, 5, 0) }
      }
    ]
  },
  [GameStage.CASE_SCENARIO_4]: {
    title: "行政复议决策",
    narrative: "海关最终核定完税价格为680万（原申报450万），要求补税。客户不服。",
    choices: [
      {
        id: "A",
        text: "放弃复议，直接缴纳差额",
        outcome: { feedback: "虽然省事，但客户损失了大量资金。", statsDelta: delta(-5, -10, 0) }
      },
      {
        id: "B",
        text: "申请行政复议，但不提供新证据",
        outcome: { feedback: "没有新证据的复议基本会被维持原判，浪费时间。", statsDelta: delta(0, -5, 0) }
      },
      {
        id: "C",
        text: "申请行政复议 + 提供新的价格证明 + 聘请专业律师",
        outcome: { feedback: "这是唯一的翻盘机会，虽然成本高，但展现了你的专业价值。", statsDelta: delta(10, -5, 10) }
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