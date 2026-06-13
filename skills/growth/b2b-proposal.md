<!-- 파일: skills/growth/b2b-proposal.md | 스킬: B2B Proposal Bot | 부서: Growth | ID: b2b -->

# B2B Proposal Bot Skill

> **담당:** Growth
> **Tier:** 2 (Claude Sonnet)
> **Skill ID:** `b2b`

## Purpose

타겟 기업 웹사이트를 크롤링하여 기업 분석 보고서와 맞춤형 마케팅 제안서, 데모 시나리오 초안을 자동 생성한다.
영업 파이프라인의 초기 접촉 비용을 최소화한다.

## Trigger

- `@b2b propose {company_url}` 명령 호출 시
- CRM에 새로운 리드 등록 시 (n8n webhook)
- 주간 아웃바운드 배치 실행 (금요일 14:00)

## Input

```json
{
  "company_url": "영업할 기업의 홈페이지 주소",
  "company_name": "기업 이름 (생략 시 홈페이지에서 자동 추출)",

  "our_products": ["marketing_saas", "watermark_solution", "finance_curation"],
  // 우리가 제안할 수 있는 제품 목록
  // AI가 이 중에서 이 기업에 가장 맞는 제품을 골라줌

  "proposal_language": "ko | en | ja",  // 제안서 언어

  "depth": "quick | standard | deep",
  // quick: 이메일 + 1페이지 요약 (빠른 첫 접촉용)
  // standard: 제안서 + 데모 시나리오 (일반 영업 미팅 준비)
  // deep: 전체 + 경쟁 분석 + ROI 시뮬레이션 (대형 계약 준비)

  "include_demo_scenario": true,  // 데모 미팅 시나리오도 만들지 여부

  "budget_hint": "startup | sme | enterprise"
  // 이 기업의 규모 힌트 — 가격 제안 범위가 달라짐
  // startup: 저가/무료 시작  |  sme: 중간  |  enterprise: 고가 맞춤형
}
```

## Output

```json
{
  "company_analysis": {
    // 홈페이지 분석으로 뽑아낸 기업 정보
    "name": "기업명",
    "industry": "어떤 산업군인지",
    "estimated_size": "startup | sme | enterprise",
    "tech_stack_detected": ["사용 중인 기술 목록"],
    // 예: React, AWS, Salesforce 등 — 어떤 솔루션에 친숙한지 파악

    "pain_points": ["이 기업이 겪고 있을 문제들"],
    // 채용공고, 블로그, 뉴스 등을 분석해서 추출
    // 예: "마케팅 자동화 인력 부족", "콘텐츠 제작 병목"

    "opportunities": ["우리 제품이 해결해줄 수 있는 기회"],
    "competitors": ["이 기업의 경쟁사 목록"]
  },

  "proposal": {
    "title": "제안서 제목",
    "executive_summary": "300자 이내 핵심 요약 (의사결정자가 30초 안에 읽을 수 있는 분량)",

    "solution_fit": {
      "product": "우리 제품 중 이 기업에 가장 맞는 것",
      "match_score": 85,       // 이 기업의 문제와 우리 제품의 기능이 얼마나 맞는지 (%)
      "key_benefits": ["핵심 혜택 목록"],
      "roi_estimate": "투자 대비 예상 수익 (업계 벤치마크 기반 추정)"
      // ROI: Return on Investment — 투자한 돈 대비 얼마를 벌 수 있는지
    },

    "pricing_suggestion": {
      "tier": "추천 요금제 이름",
      "monthly_estimate": "월 예상 비용",
      "comparison_note": "직접 고용/다른 솔루션 대비 비용 절감 효과 설명"
    },

    "next_steps": ["첫 미팅 제안, 무료 체험 안내 등 다음 단계 목록"]
  },

  "demo_scenario": {
    // 데모 미팅을 어떻게 진행할지 대본
    "title": "데모 제목",
    "duration_min": 15,  // 15분 데모로 설계
    "flow": [
      {
        "step": 1,
        "action": "이 단계에서 할 행동",
        "talking_point": "이 단계에서 할 말",
        "screenshot_note": "어떤 화면을 보여줄지"
      }
    ]
  },

  "outreach_draft": {
    // 첫 연락 메시지 초안
    "email_subject": "이메일 제목 (클릭하고 싶어지는 제목)",
    "email_body": "이메일 본문 (200자 이내 — 길면 안 읽힘)",
    "linkedin_message": "LinkedIn 메시지 (100자 이내 — 더 짧아야 읽힘)"
  }
}
```

## Process

```
1. 웹 크롤링 (company_url 기반)
   ├─ 메인 페이지, About, 채용 페이지, 블로그 최근 5개 분석
   │   // 채용공고는 "지금 뭐가 부족한지"를 솔직하게 보여주는 보물창고
   ├─ 기술 스택 감지 (Wappalyzer 방식)
   │   // 홈페이지 코드를 분석해서 어떤 기술을 쓰는지 자동 탐지
   └─ 기업 규모 추정 (직원 수, 채용 공고 수)

2. Pain Point 분석
   ├─ 산업별 공통 과제 매핑
   ├─ 채용 공고에서 니즈 추출
   │   // "마케팅 자동화 경험자 우대" → 지금 수동으로 하고 있다는 신호
   └─ 경쟁사 대비 약점 분석

3. Product-Fit 매칭
   ├─ our_products 중 최적 제품 선택
   ├─ match_score 산출 (기업 문제 ↔ 우리 기능 겹치는 비율)
   └─ ROI 추정 (같은 산업의 다른 고객사 평균 수치 활용)

4. 제안서 생성 (depth별)
5. 아웃리치 초안 생성

6. Compliance Watchdog 연동 → 크롤링 합법성 검증
   // robots.txt 위반, 개인정보 수집 여부 자동 체크
```

## Constraints

- 크롤링은 `robots.txt` 준수 필수 `[SEC]`
  // robots.txt: 웹사이트가 "이 페이지는 크롤링하지 마세요"라고 명시하는 파일
- 개인정보(이메일, 전화번호) 수집 금지 `[SEC]`
- 제안서에 허위 수치/과장 표현 금지 `[IPAI]`
- 1회 크롤링 최대 50 페이지 `[COST]`
- outreach 메시지에 스팸성 표현 자동 필터링 `[PROD]`
  // "대박", "무조건", "지금 당장" 같은 스팸 필터에 걸리는 표현 제거

## Skill Chaining

- **downstream:** Brand Identity Skill → 제안서 디자인 토큰 적용

## Hard Gates

| ID | 조건 | FAIL 기준 |
|----|------|-----------|
| G1 | 기업 맞춤성 | 기업 URL/상황 분석 없이 일반 제안서만 출력 |
| G2 | 문제-해결 연결 | Pain point와 제안 제품이 연결되지 않음 |
| G3 | 후속 행동 | 아웃리치 메시지 또는 미팅 CTA가 없음 |

## Soft Findings

| ID | 조건 | 조치 |
|----|------|------|
| S1 | ROI 근거 | 정량 추정치가 약하면 가정과 리스크 표시 |
| S2 | 브랜드 적용 | 제안서 디자인 토큰 적용 여부 표시 |

## Registry Metadata

```json
{
  "skill_id": "b2b",
  "skill_name": "B2B Proposal Bot Skill",
  "version": "1.0.0",
  "department": "Growth",
  "owner": "Growth",
  "tier": "2",
  "trigger_type": "manual | scheduled | webhook",
  "dependencies": ["brand"],
  "estimated_cost_per_run_usd": 0.20,
  "last_updated": "2026-03-17"
}
```
