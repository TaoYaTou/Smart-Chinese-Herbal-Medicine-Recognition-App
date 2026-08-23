App({
  globalData: {
    baseUrl: 'https://flask-dc08-297375-8-1469139774.sh.run.tcloudbase.com', 
    HERB_DB : {
      '艾叶': {
        name: '艾叶',
        scientific: 'Artemisia argyi',
        taste: '辛、苦、温',
        meridian: '肝、脾、肾经',
        efficacy: '温经止血、散寒止痛',
        indications: '虚寒性出血、月经不调、腹痛',
        caution: '阴虚血热者慎用。'
      },
      '阿胶': {
        name: '阿胶',
        scientific: 'Equus asinus L.',
        taste: '甘、平',
        meridian: '肺、肝、肾经',
        efficacy: '补血滋阴、润燥止血',
        indications: '血虚萎黄、眩晕心悸、肌痿无力',
        caution: '脾胃虚弱、消化不良者慎用。'
      },
      '白扁豆': {
        name: '白扁豆',
        scientific: 'Dolichos lablab L.',
        taste: '甘、微温',
        meridian: '脾、胃经',
        efficacy: '健脾化湿、和中消暑',
        indications: '脾胃虚弱、食欲不振、暑湿吐泻',
        caution: '不宜与某些中药同用，具体请遵医嘱。'
      },
      '百部': {
        name: '百部',
        scientific: 'Stemona sessilifolia',
        taste: '甘、苦、微温',
        meridian: '肺经',
        efficacy: '润肺止咳、杀虫灭虱',
        indications: '新久咳嗽、百日咳、蛲虫病',
        caution: '脾胃虚弱者慎用。'
      },
      '白矾': {
        name: '白矾',
        scientific: 'Alunite',
        taste: '酸、涩、寒',
        meridian: '肺、脾、肝、大肠经',
        efficacy: '解毒杀虫、燥湿止痒',
        indications: '湿疹、疥癣、痔疮、便血',
        caution: '体虚者慎用。'
      },
      '百合': {
        name: '百合',
        scientific: 'Lilium brownii',
        taste: '甘、微寒',
        meridian: '肺、心经',
        efficacy: '养阴润肺、清心安神',
        indications: '阴虚久咳、痰中带血、虚烦惊悸',
        caution: '风寒咳嗽、脾胃虚寒者慎用。'
      },
      '白花蛇舌草': {
        name: '白花蛇舌草',
        scientific: 'Hedyotis diffusa',
        taste: '苦、甘、寒',
        meridian: '心、肝、脾经',
        efficacy: '清热解毒、利湿通淋',
        indications: '咽喉肿痛、肠痈、毒蛇咬伤',
        caution: '孕妇慎用。'
      },
      '白蔻': {
        name: '白蔻',
        scientific: 'Amomum kravanh',
        taste: '辛、温',
        meridian: '脾、胃经',
        efficacy: '化湿行气、温中止呕',
        indications: '湿阻中焦、脘腹胀满、呕吐',
        caution: '阴虚血燥者慎用。'
      },
      '白茅根': {
        name: '白茅根',
        scientific: 'Imperata cylindrica',
        taste: '甘、寒',
        meridian: '肺、胃、膀胱经',
        efficacy: '凉血止血、清热利尿',
        indications: '血热出血、热病烦渴、水肿',
        caution: '脾胃虚寒者慎用。'
      },
      '白芍': {
        name: '白芍',
        scientific: 'Paeonia lactiflora',
        taste: '苦、酸、微寒',
        meridian: '肝、脾经',
        efficacy: '养血调经、柔肝止痛',
        indications: '月经不调、胁痛腹痛、自汗盗汗',
        caution: '虚寒证不宜单用。'
      },
      '白头翁': {
        name: '白头翁',
        scientific: 'Pulsatilla chinensis',
        taste: '苦、寒',
        meridian: '胃、大肠经',
        efficacy: '清热解毒、凉血止痢',
        indications: '热毒血痢、湿热痢疾',
        caution: '虚寒泻痢者忌用。'
      },
      '白术': {
        name: '白术',
        scientific: 'Atractylodes macrocephala',
        taste: '苦、甘、温',
        meridian: '脾、胃经',
        efficacy: '健脾益气、燥湿利水',
        indications: '脾虚食少、腹胀泄泻、水肿',
        caution: '阴虚内热者慎用。'
      },
      '柏子仁': {
        name: '柏子仁',
        scientific: 'Platycladus orientalis',
        taste: '甘、平',
        meridian: '心、肾、大肠经',
        efficacy: '养心安神、润肠通便',
        indications: '虚烦失眠、心悸怔忡、肠燥便秘',
        caution: '便溏多痰者慎用。'
      },
      '巴戟天': {
        name: '巴戟天',
        scientific: 'Morinda officinalis',
        taste: '辛、甘、微温',
        meridian: '肾、肝经',
        efficacy: '补肾阳、强筋骨、祛风湿',
        indications: '阳痿遗精、腰膝酸软、风湿痹痛',
        caution: '阴虚火旺者忌用。'
      },
      '板蓝根': {
        name: '板蓝根',
        scientific: 'Isatis indigotica',
        taste: '苦、寒',
        meridian: '心、胃经',
        efficacy: '清热解毒、凉血利咽',
        indications: '温疫时毒、发热咽痛、痄腮',
        caution: '脾胃虚寒者慎用。'
      },
      '半夏': {
        name: '半夏',
        scientific: 'Pinellia ternata',
        taste: '辛、温',
        meridian: '脾、胃、肺经',
        efficacy: '燥湿化痰、降逆止呕',
        indications: '痰湿咳嗽、呕吐反胃、痞满',
        caution: '阴虚燥咳、血证者慎用。'
      },
      '北沙参块': {
        name: '北沙参块',
        scientific: 'Glehnia littoralis',
        taste: '甘、微寒',
        meridian: '肺、胃经',
        efficacy: '养阴清肺、益胃生津',
        indications: '肺热燥咳、胃阴不足、口干咽燥',
        caution: '风寒咳嗽、脾胃虚寒者慎用。'
      },
      '北沙参条': {
        name: '北沙参条',
        scientific: 'Glehnia littoralis',
        taste: '甘、微寒',
        meridian: '肺、胃经',
        efficacy: '养阴清肺、益胃生津',
        indications: '肺热燥咳、胃阴不足、口干咽燥',
        caution: '风寒咳嗽、脾胃虚寒者慎用。'
      },
      '鳖甲': {
        name: '鳖甲',
        scientific: 'Trionyx sinensis',
        taste: '咸、平',
        meridian: '肝、肾经',
        efficacy: '滋阴潜阳、软坚散结',
        indications: '阴虚发热、胁下痞块、经闭',
        caution: '脾胃虚寒者慎用。'
      },
      '苍术': {
        name: '苍术',
        scientific: 'Atractylodes lancea',
        taste: '辛、苦、温',
        meridian: '脾、胃、肝经',
        efficacy: '燥湿健脾、祛风散寒',
        indications: '湿阻中焦、风寒湿痹、夜盲',
        caution: '阴虚内热者慎用。'
      },
      '草果': {
        name: '草果',
        scientific: 'Amomum tsaoko',
        taste: '辛、温',
        meridian: '脾、胃经',
        efficacy: '燥湿温中、截疟除痰',
        indications: '寒湿中阻、脘腹胀痛、疟疾',
        caution: '阴虚血少者慎用。'
      },
      '草蔻': {
        name: '草蔻',
        scientific: 'Alpinia katsumadai',
        taste: '辛、温',
        meridian: '脾、胃经',
        efficacy: '燥湿行气、温中止呕',
        indications: '寒湿内阻、脘腹胀满、呕逆',
        caution: '阴虚血燥者慎用。'
      },
      '侧柏叶': {
        name: '侧柏叶',
        scientific: 'Platycladus orientalis',
        taste: '苦、涩、寒',
        meridian: '肺、肝、脾经',
        efficacy: '凉血止血、化痰止咳',
        indications: '血热出血、肺热咳嗽、脱发',
        caution: '孕妇慎用。'
      },
      '柴胡': {
        name: '柴胡',
        scientific: 'Bupleurum chinense',
        taste: '辛、苦、微寒',
        meridian: '肝、胆、肺经',
        efficacy: '和解表里、疏肝解郁',
        indications: '感冒发热、胸胁胀痛、月经不调',
        caution: '肝阳上亢、阴虚火旺者慎用。'
      },
      '蝉蜕': {
        name: '蝉蜕',
        scientific: 'Cryptotympana pustulata',
        taste: '甘、寒',
        meridian: '肺、肝经',
        efficacy: '疏散风热、透疹止痒',
        indications: '风热感冒、麻疹不透、目赤翳障',
        caution: '孕妇慎用。'
      },
      '陈皮': {
        name: '陈皮',
        scientific: 'Citrus reticulata',
        taste: '苦、辛、温',
        meridian: '脾、肺经',
        efficacy: '理气健脾、燥湿化痰',
        indications: '脘腹胀满、食少吐泻、咳嗽痰多',
        caution: '阴虚燥咳者慎用。'
      },
      '沉香': {
        name: '沉香',
        scientific: 'Aquilaria sinensis',
        taste: '辛、苦、微温',
        meridian: '脾、胃、肾经',
        efficacy: '行气止痛、温中止呕',
        indications: '胸腹胀痛、胃寒呕吐、肾虚喘息',
        caution: '阴虚火旺者慎用。'
      },
      '赤芍': {
        name: '赤芍',
        scientific: 'Paeonia veitchii',
        taste: '苦、微寒',
        meridian: '肝经',
        efficacy: '清热凉血、散瘀止痛',
        indications: '温毒发斑、目赤肿痛、瘀血经闭',
        caution: '血寒经闭者忌用。'
      },
      '赤石脂': {
        name: '赤石脂',
        scientific: 'Kaolinite',
        taste: '甘、酸、涩、温',
        meridian: '脾、胃、大肠经',
        efficacy: '涩肠止泻、收敛止血',
        indications: '久泻久痢、便血、崩漏',
        caution: '湿热积滞者忌用。'
      },
      '虫草': {
        name: '虫草',
        scientific: 'Cordyceps sinensis',
        taste: '甘、平',
        meridian: '肺、肾经',
        efficacy: '补肾益肺、止血化痰',
        indications: '肾虚阳痿、久咳虚喘、劳嗽咯血',
        caution: '表邪未尽者慎用。'
      },
      '穿山甲': {
        name: '穿山甲',
        scientific: 'Manis pentadactyla',
        taste: '咸、微寒',
        meridian: '肝、胃经',
        efficacy: '活血通经、下乳消痈',
        indications: '经闭癥瘕、乳汁不通、痈肿疮毒',
        caution: '孕妇忌用。'
      },
      '穿心莲': {
        name: '穿心莲',
        scientific: 'Andrographis paniculata',
        taste: '苦、寒',
        meridian: '心、肺、大肠经',
        efficacy: '清热解毒、凉血消肿',
        indications: '咽喉肿痛、痢疾、毒蛇咬伤',
        caution: '脾胃虚寒者慎用。'
      },
      '磁石': {
        name: '磁石',
        scientific: 'Magnetite',
        taste: '咸、寒',
        meridian: '心、肝、肾经',
        efficacy: '镇惊安神、平肝潜阳',
        indications: '心悸失眠、头晕目眩、耳鸣耳聋',
        caution: '脾胃虚弱者慎用。'
      },
      '大腹皮': {
        name: '大腹皮',
        scientific: 'Areca catechu',
        taste: '辛、微温',
        meridian: '脾、胃、大肠、小肠经',
        efficacy: '行气宽中、利水消肿',
        indications: '脘腹胀满、水肿脚气、小便不利',
        caution: '孕妇慎用。'
      },
      '党参': {
        name: '党参',
        scientific: 'Codonopsis pilosula',
        taste: '甘、平',
        meridian: '脾、肺经',
        efficacy: '补中益气、健脾益肺',
        indications: '脾肺气虚、气短心悸、食少便溏',
        caution: '实热证者慎用。'
      },
      '丹参': {
        name: '丹参',
        scientific: 'Salvia miltiorrhiza',
        taste: '苦、微寒',
        meridian: '心、肝经',
        efficacy: '活血祛瘀、通经止痛',
        indications: '胸痹心痛、月经不调、痈肿疮毒',
        caution: '孕妇慎用。'
      },
      '大青叶': {
        name: '大青叶',
        scientific: 'Isatis indigotica',
        taste: '苦、寒',
        meridian: '心、胃经',
        efficacy: '清热解毒、凉血消斑',
        indications: '温病发热、发斑发疹、咽喉肿痛',
        caution: '脾胃虚寒者慎用。'
      },
      '大血藤': {
        name: '大血藤',
        scientific: 'Sargentodoxa cuneata',
        taste: '苦、平',
        meridian: '大肠、肝经',
        efficacy: '清热解毒、活血祛风',
        indications: '肠痈腹痛、风湿痹痛、跌打损伤',
        caution: '孕妇慎用。'
      },
      '地骨皮': {
        name: '地骨皮',
        scientific: 'Lycium chinense',
        taste: '甘、寒',
        meridian: '肺、肝、肾经',
        efficacy: '凉血除蒸、清肺降火',
        indications: '阴虚发热、肺热咳嗽、血热出血',
        caution: '外感风寒者慎用。'
      },
      '地龙': {
        name: '地龙',
        scientific: 'Pheretima aspergillum',
        taste: '咸、寒',
        meridian: '肝、脾、膀胱经',
        efficacy: '清热息风、通络平喘',
        indications: '高热惊厥、关节痹痛、肺热哮喘',
        caution: '脾胃虚寒者慎用。'
      },
      '地榆': {
        name: '地榆',
        scientific: 'Sanguisorba officinalis',
        taste: '苦、酸、涩、微寒',
        meridian: '肝、大肠经',
        efficacy: '凉血止血、解毒敛疮',
        indications: '便血、痔血、烫伤、湿疹',
        caution: '虚寒出血者慎用。'
      },
      '杜仲': {
        name: '杜仲',
        scientific: 'Eucommia ulmoides',
        taste: '甘、微辛、温',
        meridian: '肝、肾经',
        efficacy: '补肝肾、强筋骨、安胎',
        indications: '腰膝酸软、阳痿遗精、胎动不安',
        caution: '阴虚火旺者慎用。'
      },
      '防风': {
        name: '防风',
        scientific: 'Saposhnikovia divaricata',
        taste: '辛、甘、微温',
        meridian: '膀胱、肝、脾经',
        efficacy: '祛风解表、胜湿止痛',
        indications: '外感风寒、头痛身痛、风湿痹痛',
        caution: '阴虚火旺者慎用。'
      },
      '佛手': {
        name: '佛手',
        scientific: 'Citrus medica',
        taste: '辛、苦、温',
        meridian: '肝、脾、胃、肺经',
        efficacy: '疏肝理气、和胃止痛',
        indications: '肝胃气滞、胸胁胀痛、食欲不振',
        caution: '阴虚血燥者慎用。'
      },
      '茯苓': {
        name: '茯苓',
        scientific: 'Poria cocos',
        taste: '甘、淡、平',
        meridian: '心、肺、脾、肾经',
        efficacy: '利水渗湿、健脾宁心',
        indications: '水肿尿少、脾虚食少、心悸失眠',
        caution: '虚寒滑精者慎用。'
      },
      '覆盆子': {
        name: '覆盆子',
        scientific: 'Rubus chingii',
        taste: '甘、酸、微温',
        meridian: '肝、肾经',
        efficacy: '益肾固精缩尿',
        indications: '阳痿早泄、遗精滑精、遗尿尿频',
        caution: '肾虚火旺者慎用。'
      },
      '附子': {
        name: '附子',
        scientific: 'Aconitum carmichaelii',
        taste: '辛、甘、大热',
        meridian: '心、肾、脾经',
        efficacy: '回阳救逆、补火助阳',
        indications: '亡阳证、肾阳不足、寒湿痹痛',
        caution: '孕妇忌用。'
      },
      '甘草': {
        name: '甘草',
        scientific: 'Glycyrrhiza uralensis',
        taste: '甘、平',
        meridian: '心、肺、脾、胃经',
        efficacy: '补脾益气、清热解毒、祛痰止咳',
        indications: '脾胃虚弱、咳嗽痰多、疮疡肿毒',
        caution: '不宜与甘遂、大戟、芫花同用。'
      },
      '干姜': {
        name: '干姜',
        scientific: 'Zingiber officinale',
        taste: '辛、热',
        meridian: '脾、胃、肺、肾经',
        efficacy: '温中散寒、回阳通脉',
        indications: '脘腹冷痛、呕吐泄泻、寒饮喘咳',
        caution: '阴虚火旺者忌用。'
      },
      '葛根': {
        name: '葛根',
        scientific: 'Pueraria lobata',
        taste: '甘、辛、凉',
        meridian: '脾、胃、肺经',
        efficacy: '解肌退热、生津止渴',
        indications: '外感发热、项背强痛、消渴',
        caution: '脾胃虚寒者慎用。'
      },
      '枸杞子': {
        name: '枸杞子',
        scientific: 'Lycium barbarum',
        taste: '甘、平',
        meridian: '肝、肾经',
        efficacy: '滋补肝肾、益精明目',
        indications: '肝肾阴虚、视力减退、腰膝酸软',
        caution: '外感实热、脾虚便溏者慎用。'
      },
      '钩藤': {
        name: '钩藤',
        scientific: 'Uncaria rhynchophylla',
        taste: '甘、凉',
        meridian: '肝、心包经',
        efficacy: '清热平肝、息风止痉',
        indications: '肝火上炎、头痛眩晕、小儿惊风',
        caution: '阴虚火旺者慎用。'
      },
      '贯众': {
        name: '贯众',
        scientific: 'Cyrtomium fortunei',
        taste: '苦、微寒',
        meridian: '肝、脾经',
        efficacy: '清热解毒、凉血止血',
        indications: '风热感冒、血热出血、虫积腹痛',
        caution: '脾胃虚寒者慎用。'
      },
      '谷芽': {
        name: '谷芽',
        scientific: 'Setaria italica',
        taste: '甘、温',
        meridian: '脾、胃经',
        efficacy: '消食和中、健脾开胃',
        indications: '食积不化、腹胀、食欲不振',
        caution: '胃酸过多者慎用。'
      },
      '合欢皮': {
        name: '合欢皮',
        scientific: 'Albizia julibrissin',
        taste: '甘、平',
        meridian: '心、肝、肺经',
        efficacy: '解郁安神、活血消肿',
        indications: '心神不安、失眠健忘、痈肿',
        caution: '孕妇慎用。'
      },
      '何首乌': {
        name: '何首乌',
        scientific: 'Polygonum multiflorum',
        taste: '苦、甘、涩、微温',
        meridian: '肝、肾经',
        efficacy: '补肝肾、益精血、乌须发',
        indications: '肝肾阴虚、须发早白、腰膝酸软',
        caution: '大便溏泄者慎用。'
      },
      '红花': {
        name: '红花',
        scientific: 'Carthamus tinctorius',
        taste: '辛、温',
        meridian: '心、肝经',
        efficacy: '活血通经、散瘀止痛',
        indications: '经闭痛经、跌打损伤、痈肿',
        caution: '孕妇忌用。'
      },
      '红蔻': {
        name: '红蔻',
        scientific: 'Alpinia galanga',
        taste: '辛、温',
        meridian: '脾、胃经',
        efficacy: '燥湿温中、行气止痛',
        indications: '脘腹冷痛、食积腹胀',
        caution: '阴虚血燥者慎用。'
      },
      '厚朴': {
        name: '厚朴',
        scientific: 'Magnolia officinalis',
        taste: '苦、辛、温',
        meridian: '脾、胃、肺、大肠经',
        efficacy: '行气消积、燥湿除满',
        indications: '脘腹胀痛、食积气滞、咳喘',
        caution: '阴虚津亏者慎用。'
      },
      '槐花': {
        name: '槐花',
        scientific: 'Sophora japonica',
        taste: '苦、微寒',
        meridian: '肝、大肠经',
        efficacy: '凉血止血、清肝泻火',
        indications: '便血、痔血、肝火上炎',
        caution: '脾胃虚寒者慎用。'
      },
      '黄柏': {
        name: '黄柏',
        scientific: 'Phellodendron chinense',
        taste: '苦、寒',
        meridian: '肾、膀胱经',
        efficacy: '清热燥湿、泻火除蒸',
        indications: '湿热泻痢、黄疸、遗精、盗汗',
        caution: '脾胃虚寒者慎用。'
      },
      '黄精': {
        name: '黄精',
        scientific: 'Polygonatum sibiricum',
        taste: '甘、平',
        meridian: '脾、肺、肾经',
        efficacy: '补气养阴、健脾润肺',
        indications: '脾胃虚弱、肺虚燥咳、精血不足',
        caution: '中寒泄泻者慎用。'
      },
      '黄芩': {
        name: '黄芩',
        scientific: 'Scutellaria baicalensis',
        taste: '苦、寒',
        meridian: '肺、胆、脾、大肠经',
        efficacy: '清热燥湿、泻火解毒',
        indications: '肺热咳嗽、湿热黄疸、痈肿疮毒',
        caution: '脾胃虚寒者慎用。'
      },
      '火麻仁': {
        name: '火麻仁',
        scientific: 'Cannabis sativa',
        taste: '甘、平',
        meridian: '脾、胃、大肠经',
        efficacy: '润肠通便',
        indications: '肠燥便秘',
        caution: '孕妇及便溏者慎用。'
      },
      '虎杖': {
        name: '虎杖',
        scientific: 'Polygonum cuspidatum',
        taste: '苦、寒',
        meridian: '肝、胆、肺经',
        efficacy: '利湿退黄、清热解毒',
        indications: '湿热黄疸、淋浊带下、疮疡肿毒',
        caution: '孕妇慎用。'
      },
      '僵蚕': {
        name: '僵蚕',
        scientific: 'Bombyx mori',
        taste: '咸、辛、平',
        meridian: '肝、肺经',
        efficacy: '息风止痉、祛风止痛',
        indications: '惊风抽搐、头痛、咽痛',
        caution: '阴虚火旺者慎用。'
      },
      '姜黄': {
        name: '姜黄',
        scientific: 'Curcuma longa',
        taste: '辛、苦、温',
        meridian: '肝、脾经',
        efficacy: '破血行气、通经止痛',
        indications: '胸胁刺痛、经闭、风湿肩臂疼痛',
        caution: '孕妇忌用。'
      },
      '鸡内金': {
        name: '鸡内金',
        scientific: 'Gallus gallus domesticus',
        taste: '甘、平',
        meridian: '脾、胃、小肠、膀胱经',
        efficacy: '健胃消食、涩精止遗',
        indications: '食积不化、小儿疳积、遗精遗尿',
        caution: '脾虚无积者慎用。'
      },
      '荆芥': {
        name: '荆芥',
        scientific: 'Schizonepeta tenuifolia',
        taste: '辛、微温',
        meridian: '肺、肝经',
        efficacy: '解表散风、透疹止痒',
        indications: '风寒感冒、头痛、麻疹不透',
        caution: '表虚自汗者慎用。'
      },
      '金钱草': {
        name: '金钱草',
        scientific: 'Lysimachia christinae',
        taste: '甘、淡、微寒',
        meridian: '肝、胆、肾、膀胱经',
        efficacy: '利湿退黄、利尿通淋',
        indications: '湿热黄疸、石淋、痈肿',
        caution: '脾胃虚寒者慎用。'
      },
      '金银花': {
        name: '金银花',
        scientific: 'Lonicera japonica',
        taste: '甘、寒',
        meridian: '肺、心、胃经',
        efficacy: '清热解毒、疏散风热',
        indications: '风热感冒、咽喉肿痛、痈肿疮毒',
        caution: '脾胃虚寒者慎用。'
      },
      '鸡血藤': {
        name: '鸡血藤',
        scientific: 'Spatholobus suberectus',
        taste: '苦、甘、温',
        meridian: '肝、肾经',
        efficacy: '活血补血、调经止痛',
        indications: '月经不调、经闭痛经、风湿痹痛',
        caution: '孕妇慎用。'
      },
      '决明子': {
        name: '决明子',
        scientific: 'Cassia obtusifolia',
        taste: '甘、苦、咸、微寒',
        meridian: '肝、大肠经',
        efficacy: '清热明目、润肠通便',
        indications: '目赤肿痛、头痛眩晕、肠燥便秘',
        caution: '脾虚便溏者慎用。'
      },
      '苦参': {
        name: '苦参',
        scientific: 'Sophora flavescens',
        taste: '苦、寒',
        meridian: '心、肝、胃、大肠、膀胱经',
        efficacy: '清热燥湿、杀虫利尿',
        indications: '热痢、便血、湿疹、皮肤瘙痒',
        caution: '脾胃虚寒者慎用。'
      },
      '莱菔子': {
        name: '莱菔子',
        scientific: 'Raphanus sativus',
        taste: '辛、甘、平',
        meridian: '脾、胃、肺经',
        efficacy: '消食除胀、降气化痰',
        indications: '食积气滞、脘腹胀满、咳喘',
        caution: '气虚者慎用。'
      },
      '连翘': {
        name: '连翘',
        scientific: 'Forsythia suspensa',
        taste: '苦、微寒',
        meridian: '肺、心、小肠经',
        efficacy: '清热解毒、消肿散结',
        indications: '风热感冒、咽喉肿痛、痈肿疮毒',
        caution: '脾胃虚寒者慎用。'
      },
      '莲子心': {
        name: '莲子心',
        scientific: 'Nelumbo nucifera',
        taste: '苦、寒',
        meridian: '心、肾经',
        efficacy: '清心安神、交通心肾',
        indications: '心烦失眠、口舌生疮、遗精',
        caution: '脾胃虚寒者慎用。'
      },
      '灵芝': {
        name: '灵芝',
        scientific: 'Ganoderma lucidum',
        taste: '甘、平',
        meridian: '心、肺、肝、肾经',
        efficacy: '补气安神、止咳平喘',
        indications: '心神不宁、失眠健忘、虚劳咳嗽',
        caution: '实热证者慎用。'
      },
      '荔枝核': {
        name: '荔枝核',
        scientific: 'Litchi chinensis',
        taste: '辛、微苦、温',
        meridian: '肝、肾经',
        efficacy: '行气散结、祛寒止痛',
        indications: '寒疝腹痛、睾丸肿痛',
        caution: '孕妇慎用。'
      },
      '龙骨': {
        name: '龙骨',
        scientific: 'Fossil bone',
        taste: '甘、涩、平',
        meridian: '心、肝、肾经',
        efficacy: '镇静安神、收敛固涩',
        indications: '心悸失眠、遗精盗汗、带下',
        caution: '湿热内盛者慎用。'
      },
      '路路通': {
        name: '路路通',
        scientific: 'Liquidambar formosana',
        taste: '辛、苦、平',
        meridian: '肝、肾经',
        efficacy: '祛风活络、利水通经',
        indications: '风湿痹痛、经闭、水肿',
        caution: '孕妇慎用。'
      },
      '罗汉果': {
        name: '罗汉果',
        scientific: 'Siraitia grosvenorii',
        taste: '甘、凉',
        meridian: '肺、大肠经',
        efficacy: '清肺利咽、润肠通便',
        indications: '肺热咳嗽、咽痛失音、便秘',
        caution: '脾胃虚寒者慎用。'
      },
      '络石藤': {
        name: '络石藤',
        scientific: 'Trachelospermum jasminoides',
        taste: '苦、微寒',
        meridian: '心、肝经',
        efficacy: '祛风通络、凉血消肿',
        indications: '风湿热痹、咽喉肿痛、痈肿',
        caution: '孕妇慎用。'
      },
      '麦冬': {
        name: '麦冬',
        scientific: 'Ophiopogon japonicus',
        taste: '甘、微苦、微寒',
        meridian: '心、肺、胃经',
        efficacy: '养阴生津、润肺清心',
        indications: '肺燥干咳、阴虚痨嗽、心烦失眠',
        caution: '脾胃虚寒者慎用。'
      },
      '麦芽': {
        name: '麦芽',
        scientific: 'Hordeum vulgare',
        taste: '甘、平',
        meridian: '脾、胃经',
        efficacy: '消食健胃、回乳消胀',
        indications: '食积不化、断乳、乳房胀痛',
        caution: '哺乳期妇女慎用。'
      },
      '墨旱莲': {
        name: '墨旱莲',
        scientific: 'Eclipta prostrata',
        taste: '甘、酸、寒',
        meridian: '肝、肾经',
        efficacy: '滋补肝肾、凉血止血',
        indications: '肝肾阴虚、须发早白、血热出血',
        caution: '脾胃虚寒者慎用。'
      },
      '牡丹皮': {
        name: '牡丹皮',
        scientific: 'Paeonia suffruticosa',
        taste: '苦、辛、微寒',
        meridian: '心、肝、肾经',
        efficacy: '清热凉血、活血化瘀',
        indications: '温毒发斑、经闭痛经、痈肿疮毒',
        caution: '孕妇慎用。'
      },
      '牡蛎': {
        name: '牡蛎',
        scientific: 'Ostrea gigas',
        taste: '咸、微寒',
        meridian: '肝、肾经',
        efficacy: '重镇安神、平肝潜阳',
        indications: '心悸失眠、头晕目眩、自汗盗汗',
        caution: '脾胃虚寒者慎用。'
      },
      '木香': {
        name: '木香',
        scientific: 'Saussurea costus',
        taste: '辛、苦、温',
        meridian: '脾、胃、大肠、胆经',
        efficacy: '行气止痛、健脾消食',
        indications: '脘腹胀痛、食积不消、泻痢后重',
        caution: '阴虚津亏者慎用。'
      },
      '牛膝': {
        name: '牛膝',
        scientific: 'Achyranthes bidentata',
        taste: '苦、甘、酸、平',
        meridian: '肝、肾经',
        efficacy: '补肝肾、强筋骨、逐瘀通经',
        indications: '腰膝酸软、经闭痛经、跌打损伤',
        caution: '孕妇慎用。'
      },
      '女贞子': {
        name: '女贞子',
        scientific: 'Ligustrum lucidum',
        taste: '甘、苦、凉',
        meridian: '肝、肾经',
        efficacy: '滋补肝肾、明目乌发',
        indications: '肝肾阴虚、头晕目眩、须发早白',
        caution: '脾胃虚寒者慎用。'
      },
      '炮姜': {
        name: '炮姜',
        scientific: 'Zingiber officinale',
        taste: '辛、热',
        meridian: '脾、胃、肾经',
        efficacy: '温中散寒、温经止血',
        indications: '脘腹冷痛、虚寒出血',
        caution: '孕妇慎用。'
      },
      '佩兰': {
        name: '佩兰',
        scientific: 'Eupatorium fortunei',
        taste: '辛、平',
        meridian: '脾、胃、肺经',
        efficacy: '化湿解暑',
        indications: '湿阻中焦、暑湿头痛、口甜黏腻',
        caution: '阴虚血燥者慎用。'
      },
      '蒲公英': {
        name: '蒲公英',
        scientific: 'Taraxacum mongolicum',
        taste: '苦、甘、寒',
        meridian: '肝、胃经',
        efficacy: '清热解毒、消肿散结',
        indications: '乳痈肿痛、咽喉肿痛、湿热黄疸',
        caution: '脾胃虚寒者慎用。'
      },
      '蒲黄': {
        name: '蒲黄',
        scientific: 'Typha angustifolia',
        taste: '甘、平',
        meridian: '肝、心包经',
        efficacy: '止血化瘀、利尿通淋',
        indications: '各种出血、经闭痛经、血淋',
        caution: '孕妇慎用。'
      },
      '羌活': {
        name: '羌活',
        scientific: 'Notopterygium incisum',
        taste: '辛、苦、温',
        meridian: '膀胱、肾经',
        efficacy: '解表散寒、祛风胜湿',
        indications: '风寒感冒、头痛身痛、风湿痹痛',
        caution: '阴虚血燥者慎用。'
      },
      '前胡': {
        name: '前胡',
        scientific: 'Peucedanum praeruptorum',
        taste: '苦、辛、微寒',
        meridian: '肺经',
        efficacy: '降气化痰、散风清热',
        indications: '痰热喘满、咳喘痰黄、风热咳嗽',
        caution: '阴虚咳嗽者慎用。'
      },
      '青蒿': {
        name: '青蒿',
        scientific: 'Artemisia annua',
        taste: '苦、辛、寒',
        meridian: '肝、胆经',
        efficacy: '清热解暑、截疟',
        indications: '暑热烦渴、疟疾寒热',
        caution: '脾胃虚寒者慎用。'
      },
      '全蝎': {
        name: '全蝎',
        scientific: 'Buthus martensii',
        taste: '辛、平',
        meridian: '肝经',
        efficacy: '息风镇痉、通络止痛',
        indications: '惊风抽搐、中风半身不遂、头痛',
        caution: '孕妇慎用。'
      },
      '人参': {
        name: '人参',
        scientific: 'Panax ginseng',
        taste: '甘、微苦、微温',
        meridian: '脾、肺、心、肾经',
        efficacy: '大补元气、复脉固脱',
        indications: '气虚欲脱、脾肺气虚、心悸失眠',
        caution: '实热证者忌用。'
      },
      '人参切片': {
        name: '人参切片',
        scientific: 'Panax ginseng',
        taste: '甘、微苦、微温',
        meridian: '脾、肺、心、肾经',
        efficacy: '大补元气、复脉固脱',
        indications: '气虚欲脱、脾肺气虚、心悸失眠',
        caution: '实热证者忌用。'
      },
      '肉苁蓉根': {
        name: '肉苁蓉根',
        scientific: 'Cistanche deserticola',
        taste: '甘、咸、温',
        meridian: '肾、大肠经',
        efficacy: '补肾阳、益精血、润肠通便',
        indications: '肾阳不足、精血亏虚、肠燥便秘',
        caution: '阴虚火旺者慎用。'
      },
      '肉苁蓉片': {
        name: '肉苁蓉片',
        scientific: 'Cistanche deserticola',
        taste: '甘、咸、温',
        meridian: '肾、大肠经',
        efficacy: '补肾阳、益精血、润肠通便',
        indications: '肾阳不足、精血亏虚、肠燥便秘',
        caution: '阴虚火旺者慎用。'
      },
      '肉豆蔻': {
        name: '肉豆蔻',
        scientific: 'Myristica fragrans',
        taste: '辛、温',
        meridian: '脾、胃、大肠经',
        efficacy: '温中行气、涩肠止泻',
        indications: '脾胃虚寒、久泻不止、脘腹胀痛',
        caution: '湿热泻痢者忌用。'
      },
      '肉桂': {
        name: '肉桂',
        scientific: 'Cinnamomum cassia',
        taste: '辛、甘、大热',
        meridian: '肾、脾、心、肝经',
        efficacy: '补火助阳、散寒止痛',
        indications: '肾阳不足、腰膝冷痛、虚寒腹痛',
        caution: '阴虚火旺、孕妇慎用。'
      },
      '桑螵蛸': {
        name: '桑螵蛸',
        scientific: 'Mantis egg-case',
        taste: '甘、咸、平',
        meridian: '肝、肾经',
        efficacy: '固精缩尿、补肾助阳',
        indications: '遗精滑精、遗尿尿频、阳痿',
        caution: '阴虚火旺者慎用。'
      },
      '桑椹': {
        name: '桑椹',
        scientific: 'Morus alba',
        taste: '甘、酸、寒',
        meridian: '肝、肾经',
        efficacy: '滋阴补血、生津润燥',
        indications: '肝肾阴虚、头晕耳鸣、须发早白',
        caution: '脾胃虚寒者慎用。'
      },
      '三七': {
        name: '三七',
        scientific: 'Panax notoginseng',
        taste: '甘、微苦、温',
        meridian: '肝、胃经',
        efficacy: '散瘀止血、消肿定痛',
        indications: '各种出血、跌打损伤、胸痹心痛',
        caution: '孕妇慎用。'
      },
      '山药': {
        name: '山药',
        scientific: 'Dioscorea opposita',
        taste: '甘、平',
        meridian: '脾、肺、肾经',
        efficacy: '补脾养胃、生津益肺',
        indications: '脾虚食少、久泻不止、肺虚喘咳',
        caution: '湿盛中满者慎用。'
      },
      '山楂': {
        name: '山楂',
        scientific: 'Crataegus pinnatifida',
        taste: '酸、甘、微温',
        meridian: '脾、胃、肝经',
        efficacy: '消食健胃、行气散瘀',
        indications: '食积不化、脘腹胀痛、肉食积滞',
        caution: '胃酸过多者慎用。'
      },
      '山茱萸': {
        name: '山茱萸',
        scientific: 'Cornus officinalis',
        taste: '酸、涩、微温',
        meridian: '肝、肾经',
        efficacy: '补益肝肾、收涩固脱',
        indications: '肝肾阴虚、腰膝酸软、遗精崩漏',
        caution: '命门火炽者慎用。'
      },
      '砂仁': {
        name: '砂仁',
        scientific: 'Amomum villosum',
        taste: '辛、温',
        meridian: '脾、胃、肾经',
        efficacy: '化湿开胃、温脾止泻',
        indications: '湿阻中焦、脘腹胀满、泄泻',
        caution: '阴虚血燥者慎用。'
      },
      '蛇床子': {
        name: '蛇床子',
        scientific: 'Cnidium monnieri',
        taste: '辛、苦、温',
        meridian: '肾经',
        efficacy: '温肾壮阳、燥湿杀虫',
        indications: '阳痿宫冷、寒湿带下、湿疹瘙痒',
        caution: '阴虚火旺者慎用。'
      },
      '射干': {
        name: '射干',
        scientific: 'Belamcanda chinensis',
        taste: '苦、寒',
        meridian: '肺经',
        efficacy: '清热解毒、消痰利咽',
        indications: '咽喉肿痛、痰壅咳喘',
        caution: '脾胃虚寒者慎用。'
      },
      '升麻': {
        name: '升麻',
        scientific: 'Cimicifuga foetida',
        taste: '辛、微甘、微寒',
        meridian: '肺、脾、胃、大肠经',
        efficacy: '发表透疹、清热解毒',
        indications: '风热头痛、麻疹不透、咽喉肿痛',
        caution: '阴虚火旺者慎用。'
      },
      '神曲': {
        name: '神曲',
        scientific: 'Mass Medicata Fermentata',
        taste: '甘、辛、温',
        meridian: '脾、胃经',
        efficacy: '消食和胃',
        indications: '食积不化、脘腹胀满、食欲不振',
        caution: '脾阴虚者慎用。'
      },
      '石菖蒲': {
        name: '石菖蒲',
        scientific: 'Acorus tatarinowii',
        taste: '辛、苦、温',
        meridian: '心、胃经',
        efficacy: '开窍豁痰、醒神益智',
        indications: '神昏癫痫、健忘失眠、耳鸣耳聋',
        caution: '阴虚火旺者慎用。'
      },
      '石膏': {
        name: '石膏',
        scientific: 'Gypsum',
        taste: '辛、甘、大寒',
        meridian: '肺、胃经',
        efficacy: '清热泻火、除烦止渴',
        indications: '壮热烦渴、肺热喘咳、胃火牙痛',
        caution: '脾胃虚寒者忌用。'
      },
      '石斛': {
        name: '石斛',
        scientific: 'Dendrobium nobile',
        taste: '甘、微寒',
        meridian: '胃、肾经',
        efficacy: '益胃生津、滋阴清热',
        indications: '胃阴不足、口干烦渴、虚热不退',
        caution: '湿热未清者慎用。'
      },
      '首乌藤块': {
        name: '首乌藤块',
        scientific: 'Polygonum multiflorum',
        taste: '甘、平',
        meridian: '心、肝经',
        efficacy: '养血安神、祛风通络',
        indications: '失眠多梦、血虚身痛、风湿痹痛',
        caution: '孕妇慎用。'
      },
      '首乌藤片': {
        name: '首乌藤片',
        scientific: 'Polygonum multiflorum',
        taste: '甘、平',
        meridian: '心、肝经',
        efficacy: '养血安神、祛风通络',
        indications: '失眠多梦、血虚身痛、风湿痹痛',
        caution: '孕妇慎用。'
      },
      '水红花子': {
        name: '水红花子',
        scientific: 'Polygonum orientale',
        taste: '咸、微寒',
        meridian: '肝、胃经',
        efficacy: '散血消癥、消积止痛',
        indications: '癥瘕痞块、食积不消、水肿',
        caution: '孕妇慎用。'
      },
      '水牛角': {
        name: '水牛角',
        scientific: 'Bubalus bubalis',
        taste: '苦、寒',
        meridian: '心、肝经',
        efficacy: '清热凉血、解毒定惊',
        indications: '温病高热、发斑发疹、惊风抽搐',
        caution: '脾胃虚寒者慎用。'
      },
      '酸枣仁': {
        name: '酸枣仁',
        scientific: 'Ziziphus jujuba',
        taste: '甘、酸、平',
        meridian: '肝、胆、心经',
        efficacy: '养心补肝、宁心安神',
        indications: '虚烦不眠、惊悸多梦、体虚自汗',
        caution: '内有实邪者慎用。'
      },
      '桃仁': {
        name: '桃仁',
        scientific: 'Prunus persica',
        taste: '苦、甘、平',
        meridian: '心、肝、大肠经',
        efficacy: '活血祛瘀、润肠通便',
        indications: '经闭痛经、跌打损伤、肠燥便秘',
        caution: '孕妇忌用。'
      },
      '天冬': {
        name: '天冬',
        scientific: 'Asparagus cochinchinensis',
        taste: '甘、苦、寒',
        meridian: '肺、肾经',
        efficacy: '养阴润燥、清肺生津',
        indications: '肺燥干咳、阴虚消渴、肠燥便秘',
        caution: '脾胃虚寒者慎用。'
      },
      '天葵子': {
        name: '天葵子',
        scientific: 'Semiaquilegia adoxoides',
        taste: '甘、苦、寒',
        meridian: '肝、胃经',
        efficacy: '清热解毒、消肿散结',
        indications: '痈肿疮毒、瘰疬、毒蛇咬伤',
        caution: '孕妇慎用。'
      },
      '天麻块': {
        name: '天麻块',
        scientific: 'Gastrodia elata',
        taste: '甘、平',
        meridian: '肝经',
        efficacy: '息风止痉、平抑肝阳',
        indications: '头痛眩晕、肢体麻木、小儿惊风',
        caution: '阴虚火旺者慎用。'
      },
      '天麻片': {
        name: '天麻片',
        scientific: 'Gastrodia elata',
        taste: '甘、平',
        meridian: '肝经',
        efficacy: '息风止痉、平抑肝阳',
        indications: '头痛眩晕、肢体麻木、小儿惊风',
        caution: '阴虚火旺者慎用。'
      },
      '天南星': {
        name: '天南星',
        scientific: 'Arisaema erubescens',
        taste: '苦、辛、温',
        meridian: '肺、肝、脾经',
        efficacy: '燥湿化痰、祛风止痉',
        indications: '痰湿咳嗽、中风痰壅、癫痫',
        caution: '孕妇忌用。'
      },
      '通草': {
        name: '通草',
        scientific: 'Tetrapanax papyrifer',
        taste: '甘、淡、寒',
        meridian: '肺、胃经',
        efficacy: '清热利尿、通气下乳',
        indications: '小便不利、淋涩痛、乳汁不通',
        caution: '孕妇慎用。'
      },
      '土鳖虫': {
        name: '土鳖虫',
        scientific: 'Eupolyphaga sinensis',
        taste: '咸、寒',
        meridian: '肝经',
        efficacy: '破血逐瘀、续筋接骨',
        indications: '跌打损伤、骨折、血瘀经闭',
        caution: '孕妇忌用。'
      },
      '菟丝子': {
        name: '菟丝子',
        scientific: 'Cuscuta chinensis',
        taste: '甘、温',
        meridian: '肝、肾、脾经',
        efficacy: '补益肝肾、固精缩尿',
        indications: '阳痿遗精、腰膝酸软、小便频数',
        caution: '阴虚火旺者慎用。'
      },
      '五加皮': {
        name: '五加皮',
        scientific: 'Acanthopanax gracilistylus',
        taste: '辛、苦、温',
        meridian: '肝、肾经',
        efficacy: '祛风除湿、补肝肾、强筋骨',
        indications: '风湿痹痛、腰膝酸软、水肿',
        caution: '阴虚火旺者慎用。'
      },
      '五灵脂': {
        name: '五灵脂',
        scientific: 'Trogopterus xanthipes',
        taste: '苦、甘、温',
        meridian: '肝经',
        efficacy: '活血止痛、化瘀止血',
        indications: '胸胁刺痛、痛经、崩漏',
        caution: '孕妇慎用。'
      },
      '乌梅': {
        name: '乌梅',
        scientific: 'Prunus mume',
        taste: '酸、涩、平',
        meridian: '肝、脾、肺、大肠经',
        efficacy: '敛肺止咳、涩肠止泻',
        indications: '久咳虚喘、久泻久痢、蛔厥腹痛',
        caution: '表邪未解者忌用。'
      },
      '五味子': {
        name: '五味子',
        scientific: 'Schisandra chinensis',
        taste: '酸、甘、温',
        meridian: '肺、心、肾经',
        efficacy: '收敛固涩、益气生津',
        indications: '久咳虚喘、自汗盗汗、心悸失眠',
        caution: '表邪未解者慎用。'
      },
      '夏枯草': {
        name: '夏枯草',
        scientific: 'Prunella vulgaris',
        taste: '辛、苦、寒',
        meridian: '肝、胆经',
        efficacy: '清肝泻火、散结消肿',
        indications: '目赤肿痛、头痛眩晕、瘰疬',
        caution: '脾胃虚寒者慎用。'
      },
      '香附': {
        name: '香附',
        scientific: 'Cyperus rotundus',
        taste: '辛、微苦、微甘、平',
        meridian: '肝、脾、三焦经',
        efficacy: '疏肝解郁、理气宽中',
        indications: '肝郁气滞、胸胁胀痛、月经不调',
        caution: '阴虚火旺者慎用。'
      },
      '仙鹤草': {
        name: '仙鹤草',
        scientific: 'Agrimonia pilosa',
        taste: '苦、涩、平',
        meridian: '心、肝经',
        efficacy: '收敛止血、止痢杀虫',
        indications: '各种出血、腹泻、脱力劳伤',
        caution: '孕妇慎用。'
      },
      '小茴香': {
        name: '小茴香',
        scientific: 'Foeniculum vulgare',
        taste: '辛、温',
        meridian: '肝、肾、脾、胃经',
        efficacy: '散寒止痛、理气和胃',
        indications: '脘腹冷痛、寒疝腹痛、胃寒呕吐',
        caution: '阴虚火旺者慎用。'
      },
      '辛夷': {
        name: '辛夷',
        scientific: 'Magnolia biondii',
        taste: '辛、温',
        meridian: '肺、胃经',
        efficacy: '散风寒、通鼻窍',
        indications: '风寒头痛、鼻塞不通、鼻渊',
        caution: '阴虚火旺者慎用。'
      },
      '细辛': {
        name: '细辛',
        scientific: 'Asarum sieboldii',
        taste: '辛、温',
        meridian: '心、肺、肾经',
        efficacy: '祛风散寒、通窍止痛',
        indications: '风寒感冒、头痛牙痛、鼻渊',
        caution: '阴虚火旺者慎用。'
      },
      '续断': {
        name: '续断',
        scientific: 'Dipsacus asper',
        taste: '苦、辛、微温',
        meridian: '肝、肾经',
        efficacy: '补肝肾、强筋骨、续折伤',
        indications: '腰膝酸软、跌打损伤、骨折',
        caution: '阴虚火旺者慎用。'
      },
      '野菊花': {
        name: '野菊花',
        scientific: 'Chrysanthemum indicum',
        taste: '苦、辛、微寒',
        meridian: '肺、肝经',
        efficacy: '清热解毒、泻火平肝',
        indications: '咽喉肿痛、目赤肿痛、头痛眩晕',
        caution: '脾胃虚寒者慎用。'
      },
      '益母草': {
        name: '益母草',
        scientific: 'Leonurus japonicus',
        taste: '苦、辛、微寒',
        meridian: '肝、心包经',
        efficacy: '活血调经、利尿消肿',
        indications: '月经不调、痛经、水肿尿少',
        caution: '孕妇忌用。'
      },
      '茵陈': {
        name: '茵陈',
        scientific: 'Artemisia capillaris',
        taste: '苦、辛、微寒',
        meridian: '脾、胃、肝、胆经',
        efficacy: '清利湿热、退黄',
        indications: '黄疸尿少、湿疮瘙痒',
        caution: '脾胃虚寒者慎用。'
      },
      '薏苡仁': {
        name: '薏苡仁',
        scientific: 'Coix lacryma-jobi',
        taste: '甘、淡、微寒',
        meridian: '脾、胃、肺经',
        efficacy: '利水渗湿、健脾止泻',
        indications: '水肿脚气、脾虚泄泻、肺痈',
        caution: '孕妇慎用。'
      },
      '远志': {
        name: '远志',
        scientific: 'Polygala tenuifolia',
        taste: '苦、辛、温',
        meridian: '心、肾、肺经',
        efficacy: '安神益智、交通心肾',
        indications: '失眠多梦、心悸怔忡、健忘',
        caution: '阴虚火旺者慎用。'
      },
      '郁金': {
        name: '郁金',
        scientific: 'Curcuma aromatica',
        taste: '辛、苦、寒',
        meridian: '心、肝、胆经',
        efficacy: '活血止痛、行气解郁',
        indications: '胸胁刺痛、经闭痛经、心烦',
        caution: '阴虚血燥者慎用。'
      },
      '玉竹片': {
        name: '玉竹片',
        scientific: 'Polygonatum odoratum',
        taste: '甘、微寒',
        meridian: '肺、胃经',
        efficacy: '养阴润燥、生津止渴',
        indications: '肺胃阴伤、燥热咳嗽、咽干口渴',
        caution: '脾虚便溏者慎用。'
      },
      '玉竹条': {
        name: '玉竹条',
        scientific: 'Polygonatum odoratum',
        taste: '甘、微寒',
        meridian: '肺、胃经',
        efficacy: '养阴润燥、生津止渴',
        indications: '肺胃阴伤、燥热咳嗽、咽干口渴',
        caution: '脾虚便溏者慎用。'
      },
      '泽兰': {
        name: '泽兰',
        scientific: 'Lycopus lucidus',
        taste: '苦、辛、微温',
        meridian: '肝、脾经',
        efficacy: '活血调经、利水消肿',
        indications: '月经不调、水肿、产后瘀滞',
        caution: '孕妇慎用。'
      },
      '浙贝母': {
        name: '浙贝母',
        scientific: 'Fritillaria thunbergii',
        taste: '苦、寒',
        meridian: '肺、心经',
        efficacy: '清热化痰、散结消痈',
        indications: '风热咳嗽、痰火郁结、瘰疬',
        caution: '寒痰咳嗽者慎用。'
      },
      '珍珠母': {
        name: '珍珠母',
        scientific: 'Pinctada martensii',
        taste: '咸、寒',
        meridian: '肝、心经',
        efficacy: '平肝潜阳、安神定惊',
        indications: '头痛眩晕、心悸失眠、目赤翳障',
        caution: '脾胃虚寒者慎用。'
      },
      '知母': {
        name: '知母',
        scientific: 'Anemarrhena asphodeloides',
        taste: '苦、甘、寒',
        meridian: '肺、胃、肾经',
        efficacy: '清热泻火、滋阴润燥',
        indications: '高热烦渴、肺热咳嗽、阴虚消渴',
        caution: '脾胃虚寒者慎用。'
      },
      '枳壳片': {
        name: '枳壳片',
        scientific: 'Citrus aurantium',
        taste: '苦、辛、酸、微寒',
        meridian: '脾、胃经',
        efficacy: '理气宽中、行滞消胀',
        indications: '胸胁气滞、脘腹胀痛、食积不化',
        caution: '孕妇慎用。'
      },
      '枳壳条': {
        name: '枳壳条',
        scientific: 'Citrus aurantium',
        taste: '苦、辛、酸、微寒',
        meridian: '脾、胃经',
        efficacy: '理气宽中、行滞消胀',
        indications: '胸胁气滞、脘腹胀痛、食积不化',
        caution: '孕妇慎用。'
      },
      '枳实': {
        name: '枳实',
        scientific: 'Citrus aurantium',
        taste: '苦、辛、酸、微寒',
        meridian: '脾、胃、大肠经',
        efficacy: '破气消积、化痰散痞',
        indications: '食积气滞、胸痹结胸、痰饮内停',
        caution: '孕妇慎用。'
      },
      '竹茹': {
        name: '竹茹',
        scientific: 'Bambusa tuldoides',
        taste: '甘、微寒',
        meridian: '肺、胃、心经',
        efficacy: '清热化痰、除烦止呕',
        indications: '痰热咳嗽、胃热呕吐、心烦失眠',
        caution: '脾胃虚寒者慎用。'
      },
      '紫草': {
        name: '紫草',
        scientific: 'Arnebia euchroma',
        taste: '甘、咸、寒',
        meridian: '心、肝经',
        efficacy: '凉血活血、解毒透疹',
        indications: '温病发斑、麻疹不透、湿疹',
        caution: '脾虚便溏者慎用。'
      },
      '紫花地丁': {
        name: '紫花地丁',
        scientific: 'Viola yedoensis',
        taste: '苦、辛、寒',
        meridian: '心、肝经',
        efficacy: '清热解毒、凉血消肿',
        indications: '痈肿疮毒、毒蛇咬伤、咽喉肿痛',
        caution: '脾胃虚寒者慎用。'
      },
      '紫苑': {
        name: '紫苑',
        scientific: 'Aster tataricus',
        taste: '辛、苦、温',
        meridian: '肺经',
        efficacy: '润肺化痰、止咳平喘',
        indications: '咳嗽痰多、气喘、久咳',
        caution: '阴虚燥咳者慎用。'
      }
    }
  },
  onLaunch() {
    wx.cloud.init({
      env: 'prod-d3gwjmlm77e659517',  
      traceUser: true     
    })
    console.log('云开发已初始化')
  },
})