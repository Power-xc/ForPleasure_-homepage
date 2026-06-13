# IPAI 운영 피드백 루프

> **목적:** 스킬 실행 결과가 단발성 산출물로 끝나지 않고 비용, 인사이트, 이슈로 축적되게 한다.

---

## 표준 루프

```
skill execution
  → token
  → insight
  → task
  → skill improvement
```

| 단계 | 담당 스킬 | 입력 | 출력 |
|------|-----------|------|------|
| 실행 기록 | 모든 실행 스킬 | `skill_id`, 비용, 산출물, 실패 여부 | 표준 JSON Payload |
| 비용/이상 탐지 | `token` | 실행 로그, API 비용, 호출량 | 비용 초과, 고비용 스킬, 실패 패턴 |
| 의사결정 | `insight` | token 리포트, KPI, 작업 현황 | 오늘의 결정 3개, 스킬 개선 제안 |
| 이슈화 | `task` | insight 결정, blocked 항목 | Notion/칸반 작업 카드 |
| 개선 | 대상 스킬 | task 카드, 실패 원인 | 스킬 metadata, gates, process 업데이트 |

## 표준 Action Payload

```json
{
  "source_skill": "skill_id",
  "action": "@next command",
  "artifact": "생성된 산출물 이름",
  "blocking": false,
  "cost_usd": 0.01,
  "next_skill": "token"
}
```

## 게이트

| ID | 조건 | FAIL 기준 |
|----|------|-----------|
| G1 | 모든 실행 결과에 `source_skill` 포함 | 어떤 스킬이 비용/이슈를 만들었는지 추적 불가 |
| G2 | 비용 발생 스킬은 `token`으로 연결 | 비용 집계 누락 |
| G3 | critical/blocking 항목은 `task`로 연결 | 운영 이슈가 문서에만 남음 |
