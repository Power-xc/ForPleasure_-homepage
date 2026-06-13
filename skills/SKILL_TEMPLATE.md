# IPAI 실행 스킬 표준 템플릿

> 새 실행 스킬은 이 구조를 그대로 복사한 뒤 필요한 내용만 채운다. 실행 스킬 26종은 이 템플릿을 기준으로 점진 정리한다.

```markdown
<!-- 파일: skills/{부서}/{파일명}.md | 스킬: {English Name} | 부서: {부서명} | ID: {skill_id} -->

# {한글 스킬명} ({English Skill Name})

> **담당:** {부서명}
> **Tier:** {1 | 2} ({모델})
> **Skill ID:** `{skill_id}`

## Purpose

이 스킬이 해결하는 문제와 성공 상태를 2-3문장으로 설명한다.

## Trigger

- `@command example` — 사람이 직접 호출하는 경우
- `{자동 조건}` — scheduled, webhook, chained 등 자동 호출 조건

## Input Schema

```json
{
  "mode": "required-mode",
  "target": "required-target"
}
```

## Output Schema

```json
{
  "verdict": "PASS | FAIL",
  "summary": "한 문장 요약",
  "artifacts": [],
  "next_actions": []
}
```

## Process

1. 입력과 현재 컨텍스트를 검증한다.
2. 필요한 파일/데이터만 읽는다.
3. 결과물을 생성한다.
4. Hard Gates를 판정한다.
5. 표준 JSON Payload와 Registry Metadata를 출력한다.

## Hard Gates

| ID | 조건 | FAIL 기준 |
|----|------|-----------|
| G1 | 반드시 충족해야 하는 조건 | 누락되면 실행 실패 |

## Soft Findings

| ID | 조건 | 조치 |
|----|------|------|
| S1 | 개선 권장 조건 | 다음 스프린트 처리 |

## Skill Chaining

- **upstream:** `{이전 스킬 또는 커맨드}`
- **downstream:** `{다음 스킬 또는 커맨드}`
- **action payload:** `{"action":"@next command","source_skill":"{skill_id}"}`

## Constraints

- 이 스킬이 절대 하면 안 되는 행동을 명시한다.

## Registry Metadata

```json
{
  "skill_id": "{skill_id}",
  "skill_name": "{English Skill Name}",
  "version": "1.0.0",
  "department": "{부서명}",
  "owner": "{부서명}",
  "tier": "1",
  "trigger_type": "manual",
  "dependencies": [],
  "estimated_cost_per_run_usd": 0.01,
  "last_updated": "YYYY-MM-DD"
}
```
```
