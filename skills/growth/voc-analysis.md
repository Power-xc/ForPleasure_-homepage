<!-- 파일: skills/growth/voc-analysis.md | 스킬: VOC Analysis Bot | 부서: Growth | ID: voc -->

# Voice of Customer Analysis Skill

> **담당:** Growth
> **Tier:** 1 (Claude Haiku)
> **Skill ID:** `voc`

---

## 언제 쓰는가

- "고객 후기가 쌓였는데 광고에 어떻게 써야 할지 모르겠어"
- "우리 고객이 어떤 말로 설명하는지 뽑아줘"
- "리뷰에서 광고 헤드라인 뽑아줘"
- `@voc analyze {후기 목록}` 트리거 호출 시

> **핵심 원칙:** 고객의 언어를 그대로 쓴다. 우리가 쓰는 말이 아니라 고객이 쓰는 말이 광고가 된다.

---

## 실행 프로토콜

`@voc analyze` 트리거 후 후기 텍스트를 붙여넣으면 아래 5단계를 순서대로 실행한다.

---

### Step 1 — 언어 패턴 추출

후기 전체를 읽고 반복 등장하는 표현을 분류한다.

```
[Before 언어] — 구매 전 불편/고통 표현
  예: "맨날 헤매다가", "돈 버리는 느낌", "포기하려고 했는데"

[After 언어] — 구매 후 결과/감정 표현
  예: "이제 안 헤매요", "본전 뽑은 것 같아요", "계속 쓰게 돼요"

[핵심 키워드 TOP 5]
  등장 빈도순 + 감정 강도 가중치로 순위 산정
```

---

### Step 2 — 광고 헤드라인 5개 생성

**규칙:** 후기에서 실제로 나온 단어/표현을 그대로 사용. 창작 금지.

```
헤드라인 공식:
A: [Before 고통] → [After 결과] 공식
B: 고객 인용구 직접 사용 ("..." 따옴표 형식)
C: 숫자 + 후기 속 구체적 결과
D: 가장 많이 나온 감정 단어 앞세우기
E: 가장 강한 반전 표현 활용

각 헤드라인 옆에: "출처 후기 번호 #{n}"
```

---

### Step 3 — 소셜 증거 문구 3개

랜딩페이지·광고 배너에 바로 붙여쓸 수 있는 형식으로 출력.

```
형식: "{구체적 결과 수치} — {직업/상황, 나이대}"
     (이름 없이도 신뢰감을 주는 형식)

예시:
"첫 달에 월 수익 32% 증가 — 4년차 프리랜서"
"3번 실패했던 다이어트, 드디어 -8kg — 30대 직장맘"
```

---

### Step 4 — 랜딩페이지용 후기 인용 선별 3개

기준: ① 구체적 수치 포함 ② Before→After 구조 ③ 공감 가능한 상황 묘사

```
선별 후기 각각에 대해:
- 원본 텍스트
- 편집 제안 (너무 길면 핵심만 추출, 수치 강조)
- 배치 추천 위치 (상단 히어로 / 기능 섹션 옆 / CTA 직전)
```

---

### Step 5 — 제품 핵심 가치 한 문장

고객의 언어로 재구성한 포지셔닝 문장. 내부 기획 언어 금지.

```
형식: "우리 제품은 {구체적 타겟}이 {구체적 상황}에서
      {구체적 결과}를 얻도록 돕는다."

→ 이 문장이 모든 카피의 North Star가 된다.
```

---

## 출력 후 체이닝 제안

```
→ 핵심 키워드로 광고 카피 작성: @copy write
→ 반론 처리 카피 보강: @objection handle
→ 이메일 시퀀스에 후기 삽입 위치 지정: @email sequence
```

---

## Hard Gates

| ID | 조건 | FAIL 기준 |
|----|------|-----------|
| G1 | 고객 원문 근거 | 인용 가능한 고객 표현 없이 요약만 출력 |
| G2 | Pain/Benefit 분리 | 불만과 구매 이유가 구분되지 않음 |
| G3 | 광고 활용 문구 | 헤드라인 또는 CTA 후보가 없음 |

## Soft Findings

| ID | 조건 | 조치 |
|----|------|------|
| S1 | 세그먼트 분리 | 후기 수가 많으면 고객 유형별 분류 권장 |
| S2 | 감정 강도 | 반복 표현과 강한 감정 표현을 별도 표시 |

## Skill Chaining

- **upstream:** 고객 후기, CS 로그, 커뮤니티 반응
- **downstream:** `@copy write`, `@strategy analyze`
- **action payload:** `{"action":"@copy write","source_skill":"voc","asset":"customer_language"}`

## Registry Metadata

```json
{
  "skill_id": "voc",
  "skill_name": "VOC Analysis Bot Skill",
  "version": "1.0.0",
  "department": "Growth",
  "owner": "Growth",
  "tier": "1",
  "trigger_type": "manual",
  "dependencies": [],
  "estimated_cost_per_run_usd": 0.02,
  "last_updated": "2026-04-12"
}
```
