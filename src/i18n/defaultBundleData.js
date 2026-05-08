/** 기본 사이트 번들: 공통 이메일 + 언어별 세그먼트 (ko, en, zh, vi, ne) */
export const BUNDLE_VERSION = 3;

export const LOCALE_ORDER = ["ko", "en", "zh", "vi", "ne"];

export const LOCALE_LABELS = {
  ko: "한국어",
  en: "English",
  zh: "中文",
  vi: "Tiếng Việt",
  ne: "नेपाली",
};

function newsBlock(ko, en, zh, vi, ne) {
  return { ko, en, zh, vi, ne };
}

const news1 = newsBlock(
  {
    id: "n1",
    date: "2026.03",
    title: "2026년 1학기 강의 안내",
    detail: "강의계획서 및 과제·출결 정책은 학습관리시스템에서 확인해 주세요.",
  },
  {
    id: "n1",
    date: "2026.03",
    title: "Spring 2026 course information",
    detail: "Please check the LMS for syllabi, assignments, and attendance policies.",
  },
  {
    id: "n1",
    date: "2026.03",
    title: "2026年春季学期课程通知",
    detail: "教学大纲、作业与考勤政策请在学习管理系统中查看。",
  },
  {
    id: "n1",
    date: "2026.03",
    title: "Thông tin học phần kỳ xuân 2026",
    detail: "Vui lòng xem hệ thống LMS để biết đề cương, bài tập và quy định điểm danh.",
  },
  {
    id: "n1",
    date: "2026.03",
    title: "२०२६ वसन्त सेमेस्टर पाठ्यक्रम सूचना",
    detail: "पाठ्यक्रम योजना, कार्यहरू र उपस्थिती नीतिहरू LMS मा जाँच गर्नुहोला।",
  }
);

const news2 = newsBlock(
  {
    id: "n2",
    date: "2026.05",
    title: "학부 연구 프로그램 모집",
    detail: "관심 있는 학생은 이메일로 간단한 자기소개와 진로 방향을 보내 주세요.",
  },
  {
    id: "n2",
    date: "2026.05",
    title: "Undergraduate research program",
    detail: "Interested students may email a brief self-introduction and career direction.",
  },
  {
    id: "n2",
    date: "2026.05",
    title: "本科生研究项目招募",
    detail: "有意者请邮件发送简短的自我介绍与发展方向说明。",
  },
  {
    id: "n2",
    date: "2026.05",
    title: "Chương trình nghiên cứu đại học",
    detail: "Sinh viên quan tâm vui lòng gửi email giới thiệu ngắn và định hướng nghề nghiệp.",
  },
  {
    id: "n2",
    date: "2026.05",
    title: "स्नातक अनुसन्धान कार्यक्रम",
    detail: "रुचि राख्ने विद्यार्थीहरूले इमेलमार्फत् संक्षिप्त परिचय र करियर दिशा पठाउन सक्नुहन्छ।",
  }
);

const byLocale = (lc, ko, en, zh, vi, ne) =>
  ({ ko, en, zh, vi, ne }[lc]);

function segment(lc) {
  return {
    brandTitle: byLocale(lc, "유은수 교수 Homepage", "Prof. You Eun-sue | Homepage", "柳恩殊教授 | 主页", "GS You Eun-sue | Trang chủ", "प्रा. यु इन-सु | गृहपृष्ठ"),
    brandTag: byLocale(lc, "Insight Hub", "Insight Hub", "Insight Hub", "Insight Hub", "इनसाइट हब"),
    navHome: byLocale(lc, "Home", "Home", "首页", "Trang chủ", "गृह"),
    navResearch: byLocale(lc, "Research", "Research", "研究", "Nghiên cứu", "अनुसन्धान"),
    navCourses: byLocale(lc, "Courses", "Courses", "课程", "Môn học", "पाठ्यक्रमहरू"),
    navUpdates: byLocale(lc, "Updates", "Updates", "动态", "Cập nhật", "अपडेटहरू"),
    heroEyebrow: byLocale(lc, "TEACHING & RESEARCH LETTER", "TEACHING & RESEARCH LETTER", "教学与研究简讯", "THƯ TIN GIẢNG DẠY & NGHIÊN CỨU", "शिक्षण र अनुसन्धान पत्रिका"),
    heroTitle: byLocale(
      lc,
      "연구·교육·학생 성장을 한곳에서 나눕니다.",
      "Research, teaching, and student growth — shared here in one place.",
      "在研究、教学与学生成长的一站式空间与大家分享。",
      "Nghiên cứu, giảng dạy và phát triển sinh viên — chia sẻ tại một nơi.",
      "अनुसन्धान, शिक्षण र विद्यार्थी विकास — एकै ठाउँमा साझा गर्दछौं।"
    ),
    heroLead: byLocale(
      lc,
      "강좌·연구·상담 문의는 아래 연락처를 이용해 주세요. 공지와 강의 정보는 이 페이지에서 빠르게 확인할 수 있습니다.",
      "Use the contacts below for courses, research, or advising. Announcements and class information are summarized on this page.",
      "课程、研究与咨询请联系下方联系方式。可在本页快速查看公告与课程信息。",
      "Khóa học, nghiên cứu hoặc tư vấn xin liên hệ bên dưới. Thông báo và lớp học được cập nhật tại trang này.",
      "पाठ्यक्रम, अनुसन्धान व परामर्शका लागि तलका सम्पर्क प्रयोग गर्नुहोला। घोषणाहरू र जानकारी यस पृष्ठमा उपलब्ध छन्।"
    ),
    highlightsAriaLabel: byLocale(lc, "하이라이트", "Highlights", "要点", "Nổi bật", "मुख्य बुँदाहरू"),
    inquiryAriaLabel: byLocale(lc, "문의 안내", "Inquiry", "咨询", "Liên hệ", "जिज्ञासा"),
    adminLinkLabel: byLocale(lc, "관리자", "Admin", "管理员", "Quản trị", "प्रशासक"),
    researchLabel: byLocale(lc, "전공전문영역", "Areas of expertise", "专业领域", "Lĩnh vực chuyên môn", "विशेषज्ञता क्षेत्र"),
    researchItems: byLocale(
      lc,
      [
        "관광통역안내사(영어)-한국관광공사",
        "국외여행인솔자-문체부/한국관광공사",
        "한국어교원자격(2급)-문제부/국립국어원",
        "SMU-TESOL국제영어교사자격-숙명여자대학교 교육대학원",
        "서비스경영자격(관리자)-한국생산성본부",
      ],
      [
        "Tourist Interpretation Guide (English) — Korea Tourism Organization",
        "Outbound Tour Conductor — Ministry of Culture, Sports & Tourism / Korea Tourism Organization",
        "Korean Language Teacher Certification (Level 2) — Ministry of Culture, Sports & Tourism / National Institute of Korean Language",
        "SMU-TESOL International English Teacher Certification — Sookmyung Women's University Graduate School of Education",
        "Service Management Certification (Manager) — Korea Productivity Center",
      ],
      [
        "旅游口译导游（英语）— 韩国观光公社",
        "国外旅行领队 — 文化体育观光部 / 韩国观光公社",
        "韩国语教员资格证（2级）— 文化体育观光部 / 国立国语院",
        "SMU-TESOL 国际英语教师资格 — 淑明女子大学教育研究生院",
        "服务经营资格（管理者）— 韩国生产性本部",
      ],
      [
        "Hướng dẫn viên du lịch phiên dịch (Tiếng Anh) — Tổng cục Du lịch Hàn Quốc",
        "Trưởng đoàn tour quốc tế — Bộ Văn hóa, Thể thao và Du lịch / Tổng cục Du lịch Hàn Quốc",
        "Chứng chỉ giáo viên tiếng Hàn (Cấp 2) — Bộ Văn hóa, Thể thao và Du lịch / Viện Quốc ngữ Hàn Quốc",
        "Chứng chỉ giáo viên tiếng Anh quốc tế SMU-TESOL — Trường Sau đại học Sư phạm, Đại học Nữ Sookmyung",
        "Chứng chỉ Quản lý Dịch vụ (cấp Quản lý) — Trung tâm Năng suất Hàn Quốc",
      ],
      [
        "पर्यटन अनुवाद गाइड (अङ्ग्रेजी) — कोरिया पर्यटन सङ्गठन",
        "अन्तर्राष्ट्रिय भ्रमण नेतृत्व — संस्कृति, खेलकुद र पर्यटन मन्त्रालय / कोरिया पर्यटन सङ्गठन",
        "कोरियन भाषा शिक्षक प्रमाणपत्र (स्तर २) — संस्कृति, खेलकुद र पर्यटन मन्त्रालय / राष्ट्रिय कोरियन भाषा संस्थान",
        "SMU-TESOL अन्तर्राष्ट्रिय अङ्ग्रेजी शिक्षक प्रमाणपत्र — सुक्म्योङ महिला विश्वविद्यालय शिक्षा स्नातकोत्तर विद्यालय",
        "सेवा व्यवस्थापन प्रमाणपत्र (प्रबन्धक) — कोरिया उत्पादकत्व केन्द्र",
      ]
    ),
    researchNote: byLocale(lc, "세부는 논문·프로젝트 페이지에서 정리 예정입니다.", "Details will appear on publications and project pages.", "详细内容将陆续在论文与项目页面整理。", "Chi tiết sẽ được cập nhật trên ấn phẩm và trang dự án.", "विस्तृत जानकारी प्रकाशन र परियोजना पृष्ठहरूमा आउनेछ।"),
    coursesLabel: byLocale(lc, "담당 강좌", "Courses", "主讲课程", "Môn phụ trách", "पढाइएका पाठ्यक्रमहरू"),
    courseItems: byLocale(
      lc,
      [
        "관광실무영어(학부)",
        "항공객실서비스(학부)",
        "호텔리조트서비스(학부)",
        "축제이벤트연구(대학원)",
      ],
      [
        "Practical Tourism English (UG)",
        "Airline cabin services (UG)",
        "Hotel & resort services (UG)",
        "Festival & event studies (Grad)",
      ],
      [
        "旅游实务英语（本科）",
        "航空客舱服务（本科）",
        "酒店与度假村服务（本科）",
        "节庆与活动研究（研究生）",
      ],
      [
        "Tiếng Anh thực hành du lịch (đại học)",
        "Dịch vụ khoang hành khách hàng không (đại học)",
        "Dịch vụ khách sạn & resort (đại học)",
        "Nghiên cứu lễ hội & sự kiện (sau đại học)",
      ],
      [
        "व्यावहारिक पर्यटन अङ्ग्रेजी (स्नातक)",
        "हवाई केबिन सेवा (स्नातक)",
        "होटल तथा रिसोर्ट सेवा (स्नातक)",
        "उत्सव तथा कार्यक्रम अध्ययन (स्नातकोत्तर)",
      ]
    ),
    coursesNote: byLocale(lc, "학기별 변경 시 포털 안내를 함께 확인해 주세요.", "Check the portal for changes each term.", "学期如有调整请以门户网站通知为准。", "Mỗi học kỳ có thể thay đổi—theo cổng thông tin.", "प्रत्येक सेमेस्टर पोर्टल सूचनाहरू जाँच गर्नुहोला।"),
    contactLabel: byLocale(lc, "학생 면담 · 연락", "Student hours · Contact", "学生面谈 · 联系", "Tư vấn · Liên hệ", "विद्यार्थी परामर्श · सम्पर्क"),
    contactHours: byLocale(lc, "금요일 14:00–16:00 (사전 예약)", "Friday 14:00–16:00 (by appointment)", "周五 14:00–16:00（请预约）", "Thứ Sáu 14:00–16:00 (hẹn trước)", "शुक्रबार १४:००–१६:०० (पूर्व नियुक्ति)"),
    contactOffice: byLocale(lc, "연구실: 성지관 C3-410-1호", "Office: Seongji Hall C3-410-1", "研究室：圣志馆 C3-410-1 号", "Phòng nghiên cứu: Tòa Seongji C3-410-1", "अनुसन्धान कक्ष: सेओङजी हल C3-410-1"),
    updatesKicker: byLocale(lc, "LATEST UPDATES", "LATEST UPDATES", "最新动态", "CẬP NHẪT", "पछिल्लो अपडेट"),
    updatesDesc: byLocale(lc, "학생·방문자를 위한 공지와 안내입니다.", "Announcements for students and visitors.", "为学生与来访者提供的公告。", "Thông báo cho sinh viên và khách.", "विद्यार्थी र आगन्तुकका लाई सूचनाहरू।"),
    newsItems: [news1[lc], news2[lc]],
    ctaTitle: byLocale(lc, "강의·연구 협업이 필요하신가요?", "Need collaboration on teaching or research?", "需要教学或科研合作？", "Cần hợp tác giảng dạy hoặc nghiên cứu?", "शिकरण व अनुसन्धानमा सहकार्य चाहिन्छ?"),
    ctaDesc: byLocale(
      lc,
      "메일로 간단한 제목과 일정을 남겨 주시면 회신 드리겠습니다.",
      "Leave a brief subject and schedule by email—we will reply.",
      "请邮件留下简要主题与时间，我们会回复。",
      "Gửi email kèm tiêu đề ngắn và lịch—chúng tôi sẽ phản hồi.",
      "इमेलमा संक्षिप्त विषय र समय पठाउनुहोला—जवाफ दिनेछौं।"
    ),
    ctaButton: byLocale(lc, "협업 · 문의하기", "Collaboration · Contact", "合作 · 联系", "Hợp tác · Liên hệ", "सहकार्य · सम्पर्क"),
    collaborationSubject: byLocale(lc, "협업 · 문의", "Collaboration inquiry", "合作咨询", "Hợp tác / Liên hệ", "सहकार्य सोधपुछ"),
  };
}

export function buildDefaultBundle() {
  const locales = {};
  for (const lc of LOCALE_ORDER) {
    locales[lc] = segment(lc);
  }
  return {
    version: BUNDLE_VERSION,
    email: "eunsueyou@gmail.com",
    locales,
  };
}
