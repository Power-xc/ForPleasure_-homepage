<!-- 파일: skills/growth/viral-script.md | 스킬: Viral Script | 부서: Growth | ID: viral -->

# Viral Script Skill

> **담당:** Growth
> **Tier:** 1 (Gemini Flash)
> **Skill ID:** `viral`

## Purpose

Perplexity API에서 수집한 실시간 트렌드 데이터를 조회수 최적화된 숏폼 대본 구조로 변환한다.
A/B 테스트용 다중 변형을 자동 생성하고, 과거 성과 데이터로 지속 학습한다.

## Trigger

- n8n 스케줄러에 의한 일일 자동 실행 (08:00 AM)
- `@viral write {topic}` 명령 호출 시
- 트렌드 급등 감지 시 긴급 호출 (n8n webhook)

## Input

```json
{
  "mode": "trend_auto | topic_manual | remix",
  // trend_auto: AI가 알아서 오늘의 핫한 주제를 찾아서 대본 작성
  // topic_manual: 내가 직접 주제를 지정해서 대본 작성
  // remix: 기존에 잘 됐던 영상을 새로운 각도로 재작성

  "topic": "직접 지정할 주제 (trend_auto 모드에서는 생략 가능)",

  "niche": "finance | tech | lifestyle | health | news",
  // 채널 카테고리 — 같은 주제도 카테고리에 따라 말투와 구성이 달라짐

  "platform": "youtube_shorts | tiktok | instagram_reels",
  // 플랫폼마다 최적 길이와 편집 스타일이 다름
  // shorts: 60초 이하  |  reels: 30초 이하

  "language": "ko | en | ja",
  "variants": 3,  // A/B 테스트용 대본 변형을 몇 개 만들지 (보통 3개 비교)

  "tone": "informative | provocative | humorous | dramatic",
  // 영상의 말투와 분위기
  // informative: 차분히 설명  |  provocative: 자극적·도발적
  // humorous: 유머러스  |  dramatic: 긴장감 있게

  "past_performance": [
    // 이전에 만든 대본의 실제 성과 데이터 — AI가 이걸 보고 학습해서 더 잘 만듦
    {
      "script_id": "이전 대본 ID",
      "views": 50000,          // 조회수
      "ctr": 8.5,              // 클릭률 (%) — 썸네일을 보고 클릭한 비율
      "retention_rate": 65     // 시청 유지율 (%) — 끝까지 본 사람의 비율
    }
  ]
}
```

## Output

```json
{
  "scripts": [
    {
      "variant_id": "A",  // A/B/C 중 A 버전
      "hook": "첫 0~3초 안에 시청자를 잡아야 하는 첫 문장 (15자 이내)",
      // Hook: 낚시 바늘처럼 관심을 확 낚아채는 첫 마디
      // 이 3초를 넘기지 못하면 90%가 이탈함

      "body": [
        // 본론: 정보를 beat(단계) 단위로 나눠서 전달
        { "beat": 1, "text": "첫 번째 전달 내용", "visual_note": "이 때 어떤 화면을 보여줄지" },
        { "beat": 2, "text": "두 번째 전달 내용", "visual_note": "이 때 어떤 화면을 보여줄지" }
      ],

      "cta": "마지막에 시청자에게 요청하는 행동 (구독, 좋아요, 링크 클릭 등)",
      // CTA: Call To Action — 행동 유도 문구

      "hashtags": ["관련 해시태그 목록"],
      "estimated_duration_sec": 45,  // 예상 영상 길이 (초)

      "hook_score": 8.5,
      // 이 Hook이 얼마나 시선을 끌지 예측 점수 (1~10)
      // 과거 데이터 기반으로 첫 3초 이탈률을 역으로 계산

      "virality_score": 7.2
      // 이 대본이 공유될 가능성 예측 점수 (1~10)
      // 감정 자극, 공유 욕구, 댓글 유발 요소 등을 종합 평가
    }
  ],

  "trend_source": {
    "keyword": "이 대본의 기반이 된 트렌드 키워드",
    "search_volume": "rising | stable",  // rising: 지금 급상승 중 | stable: 꾸준히 검색됨
    "freshness_hours": 6,                // 이 트렌드가 몇 시간 전에 뜬 것인지
    "source_urls": ["출처 URL 목록"]     // 어디서 이 정보를 가져왔는지
  },

  "compliance_check": {
    // 올리기 전에 확인해야 할 법적/윤리적 체크
    "copyright_clear": true,       // 저작권 침해 없음 여부
    "factcheck_notes": ["확인이 필요한 사실이나 수치 목록"],
    "disclaimer_required": false   // 금융/의료 정보 등 면책 조항이 필요한지 여부
  }
}
```

## Process

```
1. 트렌드 수집 (mode: trend_auto)
   ├─ Perplexity API 호출 → niche별 최근 24시간 급등 키워드
   │   // Perplexity: 실시간 웹을 검색해주는 AI — 구글보다 최신 정보에 강함
   ├─ 검색량/신선도 기반 우선순위 정렬
   └─ 기존 제작 이력과 중복 체크 (같은 주제 반복 방지)

2. 대본 구조 생성
   ├─ Hook (0~3초): 질문형/충격형/공감형 중 과거 성과 최적 패턴 선택
   │   // 예) 질문형: "혹시 이거 모르세요?"
   │   //     충격형: "이걸 모르면 100만 원 손해입니다"
   │   //     공감형: "나만 이런 거 아니었구나..."
   ├─ Body (3~45초): beat 단위 정보 전달 (beat당 7~10초)
   ├─ CTA (마지막 3~5초): 구독/좋아요/다음 영상 예고
   └─ 플랫폼별 최적 길이 조정

3. variants 수만큼 변형 생성
   ├─ Hook 변형: 질문형 vs 충격형 vs 숫자형 ("3가지 방법...")
   ├─ Tone 변형: 같은 내용을 다른 말투로
   └─ CTA 변형: 다른 행동 유도 문구

4. 스코어링 (과거 데이터 기반 AI 예측)

5. Compliance 검사
   ├─ 저작권 침해 여부 (다른 영상의 내용을 그대로 베끼지 않았는지)
   ├─ 팩트체크 (수치/통계의 출처가 확인 가능한지)
   └─ 면책 조항 필요 여부 (금융/건강 정보는 "전문가 상담 필요" 문구 필수)

6. Motion Director Skill로 자동 체이닝 (파이프라인 모드 시)
```

## Constraints

- Hook은 반드시 15자(ko) / 10 words(en) 이내 `[PROD]`
  // 너무 길면 첫 3초 안에 다 읽히지 않아 효과가 없음
- 팩트체크 불가한 수치는 `[미확인]` 태그 필수 `[IPAI]`
  // 허위 정보 유포 방지 — 추후 검수자가 확인할 수 있게 표시
- 저작권 침해 리스크 감지 시 해당 variant 자동 폐기 `[SEC]`
- 하루 최대 생성량: 50개 대본 (API 비용 방어) `[COST]`

## Skill Chaining

- **downstream:** Motion Director Skill → 자동 체이닝 (파이프라인 모드)

## Hard Gates

| ID | 조건 | FAIL 기준 |
|----|------|-----------|
| G1 | 3초 훅 | 첫 3초 안에 관심을 끄는 hook이 없음 |
| G2 | 플랫폼 길이 | 플랫폼별 권장 길이를 초과하거나 불명확함 |
| G3 | 검증 가능성 | 트렌드 출처 또는 성과 예측 근거가 없음 |

## Soft Findings

| ID | 조건 | 조치 |
|----|------|------|
| S1 | A/B 테스트 | 훅과 CTA 변형을 3개 이상 제안 |
| S2 | 리패키징 | 긴 글/뉴스레터로 확장 가능한 포인트 표시 |

## Registry Metadata

```json
{
  "skill_id": "viral",
  "skill_name": "Viral Script Skill",
  "version": "1.0.0",
  "department": "Growth",
  "owner": "Growth",
  "tier": "1",
  "trigger_type": "manual | scheduled | webhook",
  "dependencies": [],
  "estimated_cost_per_run_usd": 0.05,
  "last_updated": "2026-03-17"
}
```
