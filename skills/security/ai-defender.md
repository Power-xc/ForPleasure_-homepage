<!-- 파일: skills/security/ai-defender.md | 스킬: AI 공격방어 | 부서: Security | ID: ai-sec -->

# AI Defender Skill

> **담당:** Security
> **Tier:** 2 (Claude Sonnet)
> **Skill ID:** `ai-sec`

## Purpose

AI 모델에 대한 직접적인 프롬프트 인젝션 공격과 악의적 지시를 방어한다.
사용자 입력이나 외부 문서에 포함된 코드가 AI의 원래 지침(System Prompt)을 무력화하지 못하도록 검역 레이어를 구축하는 것이 핵심 목적.

## Trigger

- `@sec ai` — 시스템 프롬프트 및 사용자 입력 처리 로직에 대한 인젝션 방어 테스팅
- `@sec sandbox` — 외부 콘텐츠(웹 크롤링, 문서)를 안전하게 처리하는 샌드박스 및 데이터 파싱 설계
- `@sec guardrail` — AI 출력에 대한 무결성 검증 및 필터링 로직 제안

## Input

```json
{
  "target": "ai | sandbox | guardrail",
  "prompt_path": "검토가 필요한 시스템 프롬프트 코드 또는 파일 경로 (선택)"
}
```

## Output

```json
{
  "verdict": "PASS | FAIL",
  "hard_gates": [
    { "id": "G1", "item": "System/User 입력 분리", "status": "PASS | FAIL", "detail": "" }
  ],
  "soft_findings": [
    { "id": "S1", "item": "Jailbreak 패턴 필터", "severity": "🟡 High | 🟢 Low", "action": "" }
  ],
  "summary": "Hard Gate X/5 통과. Soft Finding N건."
}
```

## Process

```
1. 지정된 파일에서 AI 호출부(prompt 구성, 외부 데이터 결합) 스캔
2. 사용자 입력이 System 지침으로 오인될 가능성(Prompt Leaking, Jailbreaking) 평가
3. 외부 데이터의 안전한 격리(Sandboxing) 설정 확인
4. dangerouslySetInnerHTML / eval() 사용 여부 전수 검색
5. 방어 레이어(Delimiter, Guardrail 등)가 적용되지 않았다면 즉각적인 코드 수정안 도출
6. 각 Hard Gate 항목별 PASS/FAIL 판정 후 최종 verdict 결정
```

## 성공 기준 (Success Criteria)

### HARD GATE — 하나라도 FAIL 시 배포 중단

| ID | 점검 항목 | 통과 조건 |
|----|----------|----------|
| G1 | System/User 입력 분리 | System Prompt와 User Input이 XML/JSON delimiter로 명확히 구분됨 |
| G2 | 외부 데이터 샌드박스 | 크롤링·문서 데이터가 System Prompt에 직접 삽입되지 않고 샌드박스 태그 내 배치됨 |
| G3 | AI 출력 직접 실행 금지 | `dangerouslySetInnerHTML`, `eval()` 등에 AI 출력 미사용 (코드 전수 검색) |
| G4 | 사용자 입력 길이/형식 검증 | 무제한 입력 불가, 길이 및 허용 형식 제한 존재 |
| G5 | 민감 데이터 노출 차단 | AI 응답에서 API 키, 비밀번호, 개인정보 패턴 필터링 로직 존재 |

### SOFT FINDING — 발견 시 보고, 다음 스프린트 처리

| ID | 점검 항목 | 권장 조치 |
|----|----------|----------|
| S1 | Jailbreak 패턴 필터 | "ignore previous instructions" 등 알려진 패턴 차단 |
| S2 | 외부 URL allowlist | 크롤링 대상 URL에 allowlist 또는 도메인 제한 적용 |
| S3 | 프롬프트 이상 로깅 | 비정상 패턴 감지 시 로그 기록 및 알림 |
| S4 | AI 응답 스키마 검증 | 구조화된 출력 사용 시 Zod 등으로 응답 형식 강제 |

### 최종 판정 규칙

```
Hard Gate 전부 PASS  → verdict: "PASS" → 배포 가능
Hard Gate 1개 이상 FAIL → verdict: "FAIL" → 즉시 중단, 수정 후 재점검
Soft Finding → 배포 블록 없음, soft_findings 배열에 severity 태그 포함
```

## Constraints

- 사용자 입력이나 외부 데이터는 반드시 무결성을 검증하고, XML/JSON 등의 샌드박스 태그 내에만 배치 `[SEC]`
- AI 결과물을 `dangerouslySetInnerHTML` 또는 `eval()` 과 같이 클라이언트나 서버에서 직접 실행하는 것을 절대 금지 `[SEC]`

## Registry Metadata

```json
{
  "skill_id": "ai-sec",
  "skill_name": "AI Defender Skill",
  "version": "1.0.0",
  "department": "Security",
  "owner": "Security",
  "tier": "2",
  "trigger_type": "manual | pre-deploy",
  "dependencies": ["sys-sec"],
  "estimated_cost_per_run_usd": 0.05,
  "last_updated": "2026-04-11"
}
```
