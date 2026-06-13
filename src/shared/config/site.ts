// [SPEC] 잇다 랜딩 콘텐츠 데이터 — 섹션별 텍스트/이미지를 한 곳에서 관리한다.
// 카피 원칙: 과장·보장형 표현 금지("100% 성사" 등). 신뢰·검증 메시지 우선. [PROD]

/** 브랜드 기본 정보 */
export const BRAND = {
  name: "잇다",
  nameEn: "Itda",
  tagline: "사랑은 결국, 잇다",
  slogan: "인연은 우연이 아니라, 잇다",
  // [SPEC] QR 프리패스 연결 대상은 아직 미정 — 결정 전까지 페이지 내 앵커로만 둔다. (TODO: 확정 시 실제 링크 연결)
  prepassAnchor: "#prepass",
} as const;

/** 헤더 내비게이션 (페이지 내 앵커) */
export const NAV = [
  { label: "왜 다른가", href: "#why" },
  { label: "이용 방법", href: "#how" },
  { label: "신뢰·안전", href: "#trust" },
  { label: "FAQ", href: "#faq" },
] as const;

/** 6가지 차별점 — 앱 온보딩 단계에서 추출 */
export const DIFFERENTIATORS = [
  {
    no: "01",
    title: "매칭이 끝이 아니라, 약속까지",
    body: "연락처 교환·일정 조율의 번거로움을 앱 안에서 끝냅니다. 매칭되는 순간 시간과 장소까지 함께 확정돼, 정해진 약속에 맞춰 만나기만 하면 됩니다.",
    image: "/homepage/images/onboarding-step-1.png",
  },
  {
    no: "02",
    title: "선택은 신중하게, 매칭은 확실하게",
    body: "여성이 먼저 프로필을 확인하고 원하는 상대에게만 프로필을 보냅니다. 남성은 이미 선택받은 상태에서 시작하므로, 거절과 반복되는 시도 없이 가능성 있는 만남에 집중합니다.",
    image: "/homepage/images/onboarding-step-2.png",
  },
  {
    no: "03",
    title: "방치되지 않는 매칭 시스템",
    body: "접속 일수·응답 속도·활동 여부를 기준으로 비활성 회원은 자동으로 매칭 대상에서 제외됩니다. 단순 가입자가 아닌, 실제로 활동 중인 회원과 연결됩니다.",
    image: "/homepage/images/onboarding-step-3.png",
  },
  {
    no: "04",
    title: "직접 보고, 직접 검증합니다",
    body: "운영진이 오프라인에서 직접 유치하고 판단한 회원을 중심으로 구성됩니다. 가입 시에도 별도 심사를 거쳐, 회원 수보다 회원의 수준을 더 중요하게 봅니다.",
    image: "/homepage/images/onboarding-step-4.png",
  },
  {
    no: "05",
    title: "프리미엄은 그대로, 가격은 합리적으로",
    body: "매칭 이후 방치되지 않도록 끝까지 관리하면서, 불필요한 추가 결제 없이 합리적인 구조로 설계했습니다.",
    image: "/homepage/images/onboarding-step-5.png",
  },
  {
    no: "06",
    title: "노력하면, 무료 만남도 가능합니다",
    body: "꾸준히 접속하고 활동하면 데일리 보상으로 매칭 재화를 드립니다. 매너와 매력이 좋은 회원일수록 더 많은 기회를 얻는 구조입니다.",
    image: "/homepage/images/onboarding-step-6.png",
  },
] as const;

/** 이용 방법 — 가입부터 만남까지의 흐름 */
export const HOW_IT_WORKS = [
  {
    step: "STEP 1",
    title: "가입 심사",
    body: "검증 기준에 맞는 회원만 승인됩니다.",
    image: "/homepage/images/temp-approval.png",
  },
  {
    step: "STEP 2",
    title: "스토리 작성",
    body: "자기소개와 가치관을 스토리로 남기면 심사를 거칩니다.",
    image: "/homepage/images/story-input.png",
  },
  {
    step: "STEP 3",
    title: "선택과 매칭",
    body: "여성이 먼저 프로필을 보고 선택해 매칭이 시작됩니다.",
    image: "/homepage/images/matching-waiting.png",
  },
  {
    step: "STEP 4",
    title: "일정·장소 확정",
    body: "앱 안에서 만날 날짜와 장소까지 함께 정합니다.",
    image: "/homepage/images/schedule-propose.png",
  },
  {
    step: "STEP 5",
    title: "약속, 그리고 만남",
    body: "확정된 약속에 맞춰 만나면 됩니다. 만남 전 연락처 교환은 필요하지 않습니다.",
    image: "/homepage/images/chat-room.png",
  },
] as const;

/** 신뢰·안전 근거 */
export const TRUST_POINTS = [
  {
    title: "직접 검증한 회원 풀",
    body: "서류·사진만으로 판단하지 않고, 운영진이 직접 보고 판단한 회원으로 구성합니다.",
  },
  {
    title: "활동하는 회원만 매칭",
    body: "비활성 회원은 자동으로 제외돼, 응답 없는 매칭에 시간을 쓰지 않습니다.",
  },
  {
    title: "약속까지 책임지는 구조",
    body: "일방적인 약속 취소에는 패널티가 적용되고, 소모한 재화는 보상으로 돌려드립니다.",
  },
] as const;

/** 이벤트/혜택 */
export const EVENTS = [
  {
    title: "친구 초대 이벤트",
    body: "친구를 초대해 가입에 성공하면 초대자·가입자 모두에게 루나를 드립니다.",
    image: "/homepage/images/event-invite-friends.png",
  },
  {
    title: "데일리 보상",
    body: "꾸준히 접속하고 활동하면 매일 매칭 재화를 적립할 수 있습니다.",
    image: "/homepage/images/events.png",
  },
] as const;

/** FAQ */
export const FAQ = [
  {
    q: "아무나 가입할 수 있나요?",
    a: "별도 심사를 거쳐 기준에 맞는 회원만 승인됩니다. 무작위 유입이 아닌, 직접 선별된 회원으로 풀을 구성합니다.",
  },
  {
    q: "연락처를 꼭 교환해야 하나요?",
    a: "아니요. 매칭되면 시간과 장소가 앱 안에서 확정되므로, 만남 전 연락처를 교환할 필요가 없습니다.",
  },
  {
    q: "무료로도 만날 수 있나요?",
    a: "꾸준한 접속과 활동에 따라 데일리 보상으로 매칭 재화를 드립니다. 활동을 이어가면 부담 없이 시작할 수 있습니다.",
  },
  {
    q: "약속이 취소되면 어떻게 되나요?",
    a: "상대의 일방적인 취소에는 패널티가 적용되고, 소모한 재화는 위로 보상과 함께 돌려드립니다.",
  },
  {
    q: "QR 프리패스가 무엇인가요?",
    a: "오프라인 행사 등에서 받은 코드로 특별히 가입할 수 있는 경로입니다. 코드가 있으면 더 빠르게 시작할 수 있습니다.",
  },
] as const;
