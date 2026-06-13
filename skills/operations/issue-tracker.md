<!-- 파일: skills/operations/issue-tracker.md | 스킬: Central Issue Tracker | 부서: Operations | ID: task -->

# Central Issue Tracker Skill

> **담당:** Operations
> **Tier:** 1 (Gemini Flash)
> **Skill ID:** `task`
> **MCP 의존:** Notion MCP (`mcp__claude_ai_Notion__*`)

## Purpose

어떤 워크스페이스에서 작업을 완료하든 Notion 중앙 칸반 보드에 진척도를 자동 업데이트한다.
여러 제품을 동시에 개발하면서도 전체 프로젝트 뷰를 한눈에 볼 수 있게 만든다.
사령관의 뇌 메모리 과부하를 방지하는 것이 핵심 목표.

## Trigger

- `@task log {workspace} {작업 내용}` — 완료된 작업을 Notion에 기록
  - 예: `@task log products/claimit 결제 웹훅 보안 강화 완료`
  - 예: `@task log products/haul 상품 이미지 CDN 연동 완료`
- `@task status` — Notion 칸반 현재 상태 조회
- `@task open {workspace} {작업 내용}` — 새 이슈 생성 (In Progress)
- `@task block {이슈 제목} {사유}` — 이슈를 Blocked 상태로 변경

## Input

```json
{
  "mode": "log | status | open | block",
  // log:    완료된 작업 기록 (Done 컬럼으로 이동)
  // status: 칸반 전체 현황 조회
  // open:   새 이슈 생성 (In Progress 컬럼)
  // block:  특정 이슈 Blocked 상태로 변경

  "workspace": "작업이 이루어진 디렉토리 (log/open 모드 필수)",
  // 예: "products/claimit", "products/haul", "packages/shared"
  // Notion 페이지에 [workspace명] 태그로 자동 분류됨

  "title": "작업 제목 (log/open 모드 필수)",
  // 예: "결제 웹훅 HMAC 서명 검증 구현"
  // 예: "상품 이미지 Supabase Storage 연동"

  "detail": "작업 상세 (선택 — 없으면 title만 기록)",
  // 커밋 메시지 수준의 간결한 설명
  // 예: "payment.controller.ts x-toss-signature 헤더 HMAC-SHA256 검증 추가"

  "type": "feat | fix | sec | refactor | docs | chore",
  // feat:     새 기능
  // fix:      버그 수정
  // sec:      보안 강화
  // refactor: 리팩토링
  // docs:     문서화
  // chore:    설정·의존성 등 기타

  "block_reason": "블록 사유 (block 모드 필수)"
  // 예: "Toss 라이브 키 발급 대기 중"
}
```

## Output

- `log` 모드: Notion 칸반 Done 컬럼에 카드 생성/이동 → 링크 반환
- `status` 모드: 전체 칸반 현황 텍스트 출력 (In Progress / Blocked / Done 수량)
- `open` 모드: Notion 칸반 In Progress 컬럼에 새 카드 생성 → 링크 반환
- `block` 모드: 해당 카드 Blocked 상태로 업데이트 + 사유 기록

## Process

```
1. Notion MCP 연결 확인
   └─ mcp__claude_ai_Notion__notion-fetch 로 DB 접근 가능 여부 확인

2. 대상 Notion 데이터베이스 조회
   └─ IPAI 중앙 칸반 DB 검색 (notion-search)
   └─ 칸반 컬럼 구조 확인: Todo / In Progress / Blocked / Done / Backlog

3. mode에 따라 동작 분기

   [log 모드]
   └─ 기존 In Progress 카드 중 title 매칭 카드 검색
   └─ 있으면: Done으로 이동 + 완료 날짜 기록
   └─ 없으면: Done에 바로 새 카드 생성
   └─ 카드 내용: [workspace] title — type — 완료 날짜

   [open 모드]
   └─ In Progress 컬럼에 새 카드 생성
   └─ 카드 내용: [workspace] title — type — 시작 날짜

   [status 모드]
   └─ 전체 DB 조회 → 컬럼별 카드 수 집계
   └─ In Progress 카드 목록 (workspace 태그 포함) 출력
   └─ Blocked 카드 + 사유 출력

   [block 모드]
   └─ title로 카드 검색
   └─ Blocked 상태로 업데이트 + block_reason 기록

4. 결과 링크 반환
```

## Notion 카드 형식

```
제목: [products/claimit] 결제 웹훅 HMAC 서명 검증 구현
속성:
  - 상태: Done / In Progress / Blocked / Backlog
  - 타입: feat / fix / sec / refactor / docs / chore
  - 완료일: 2026-04-11
  - 워크스페이스: products/claimit
본문 (선택):
  payment.controller.ts x-toss-signature 헤더 검증 추가
  timingSafeEqual로 타이밍 어택 방지
```

## 사용 시점 가이드

```
IEXEC 완료 후 → @task log {workspace} {완료한 기능명}
새 기능 시작 시 → @task open {workspace} {기능명}
배포 막혔을 때 → @task block {이슈명} {막힌 이유}
아침 스탠드업 전 → @task status
```

## Constraints

- Notion DB ID는 CLAUDE.md 또는 `.env`에 보관 — 스킬 파일에 하드코딩 금지 `[SEC]`
- 완료 처리는 `IEXEC` 또는 `IGIT` 이후에만 실행 — WIP 상태를 Done으로 올리지 않음 `[OPS]`
- 카드 삭제는 하지 않음 — Done 또는 Backlog로 이동만 허용 `[OPS]`

## Skill Chaining

- **upstream:**
  - `IEXEC` 완료 직후 자동 호출 권장
  - `IGIT` 커밋 후 호출 권장
  - `@insight report`에서 개선 결정이 나온 경우
- **downstream:** `@insight report` — 일일 모닝 리포트에 진척도 반영
- **feedback:** 완료/차단 상태를 다음 `insight` 입력으로 되돌려 스킬 개선 루프를 닫음
- **action payload:** `{"action":"@insight report","source_skill":"task","artifact":"kanban_status","next_skill":"insight"}`

## Hard Gates

| ID | 조건 | FAIL 기준 |
|----|------|-----------|
| G1 | 이슈 상태 | Todo/In Progress/Blocked/Done 중 상태가 없음 |
| G2 | 추적 가능성 | workspace, task name, source가 기록되지 않음 |
| G3 | 삭제 금지 | 완료/보류 대신 카드를 삭제하도록 제안 |

## Soft Findings

| ID | 조건 | 조치 |
|----|------|------|
| S1 | 담당자/기한 | owner와 due date가 없으면 보강 제안 |
| S2 | 회고 연결 | Done 작업을 insight 회고 입력으로 연결 |

## 초기 설정 (최초 1회)

Notion MCP가 연결된 상태에서 아래 정보를 CLAUDE.md 또는 memory에 기록:

```
NOTION_KANBAN_DB_ID: {Notion 데이터베이스 ID}
// Notion 칸반 보드 URL에서 추출
// 예: https://notion.so/workspace/abc123... → abc123...
```

칸반 컬럼 구조 (변경 가능):
- `Todo` — 예정 작업
- `In Progress` — 진행 중
- `Blocked` — 블록됨
- `Done` — 완료
- `Backlog` — 나중에

## Registry Metadata

```json
{
  "skill_id": "task",
  "skill_name": "Central Issue Tracker Skill",
  "version": "1.0.0",
  "department": "Operations",
  "owner": "Operations",
  "tier": "1",
  "trigger": "@task log | @task status | @task open | @task block",
  "trigger_type": "manual | post-implementation",
  "dependencies": ["insight"],
  "model": "gemini-flash",
  "requires_mcp": "notion",
  "last_updated": "2026-04-22"
}
```
