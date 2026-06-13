<!-- 파일: skills/engineering/database-architect.md | 스킬: DB Architect | 부서: Engineering | ID: db -->

# DB Architect Skill

> **담당:** Engineering
> **Tier:** 2 (Claude Sonnet)
> **Skill ID:** `db`

## Purpose

Supabase DB 스키마 변경 시 `products/*`와 `packages/*` 전체를 크로스 체크해
다른 서비스에 사이드 이펙트(타입 에러, API 깨짐, RLS 누락)가 발생하지 않는지 사전에 검증한다.
공통 DB를 수정하다 잘 돌아가던 다른 서비스가 터지는 상황을 원천 차단하는 것이 목표.

## Trigger

- `@db check {변경 내용}` — 스키마 변경 전 사이드 이펙트 사전 검증
  - 예: `@db check payments 테이블에 refund_fee 컬럼 추가`
  - 예: `@db check users 테이블 email 컬럼 nullable → not null 변경`
- `@db migrate {파일명}` — 마이그레이션 파일 작성 + 영향 범위 리포트
- `@db audit` — 현재 스키마 전체 점검 (RLS, 인덱스, 타입 일관성)

## Input

```json
{
  "mode": "check | migrate | audit",
  // check:   변경 전 사이드 이펙트 분석
  // migrate: 마이그레이션 SQL + 영향 범위 리포트 생성
  // audit:   전체 스키마 점검

  "change": "변경 내용 자연어 설명 (check/migrate 모드 필수)",
  // 예: "payments 테이블에 refund_fee integer 컬럼 추가"
  // 예: "subsidies 테이블 difficulty 컬럼 타입 varchar → enum으로 변경"
  // 예: "user_profiles 테이블 삭제, users 테이블로 통합"

  "table": "변경 대상 테이블명 (선택 — 명시하면 분석 속도 향상)",

  "products": ["claimit", "haul"],
  // 영향 범위 검사할 프로덕트 목록 (기본값: 전체 products/*)

  "migration_timestamp": "20260411120000"
  // migrate 모드에서 파일명 prefix (생략 시 현재 시각 자동 사용)
}
```

## Output

1. **영향 범위 리포트** — 변경으로 인해 타입·API·쿼리가 깨지는 파일 목록
2. **사이드 이펙트 상세** — 각 파일에서 어떤 부분이 어떻게 깨지는지 명시
3. **마이그레이션 SQL** — `supabase/migrations/{timestamp}_{description}.sql` 형태
4. **수정 필요 파일 체크리스트** — 마이그레이션 실행 전에 먼저 코드를 수정해야 하는 파일 목록
5. **실행 순서** — 코드 수정 → 마이그레이션 → 타입 재생성 → 검증 순서 명시

## Process

```
1. 변경 대상 테이블 파악
   └─ supabase/migrations/ 최신 파일 읽기 (현재 스키마 파악)
   └─ 변경 전 현재 상태 확인

2. 모노레포 전체 크로스 체크 (격리 없음 — 전체 스캔이 목적)
   └─ products/*/src/**/*.ts 에서 변경 테이블명 grep
   └─ packages/shared/src/**/*.ts 에서 관련 타입 정의 grep
   └─ *.service.ts, *.repository.ts → 쿼리 영향 확인
   └─ *.dto.ts, types/*.ts → 타입 정의 영향 확인
   └─ supabase/migrations/*.sql → 기존 마이그레이션과 충돌 확인

3. 영향 받는 파일 분류
   CRITICAL: 마이그레이션 실행 시 즉시 런타임 에러 발생
   HIGH:     타입 에러 발생 (빌드 실패)
   MEDIUM:   타입은 맞지만 로직 수정 권장
   LOW:      주석·문서 업데이트 필요

4. 실행 안전 순서 결정
   └─ 코드 먼저 수정해야 하는 경우 vs 마이그레이션 먼저 실행해도 되는 경우 판별

5. 마이그레이션 SQL 작성 (migrate 모드)
   └─ 롤백 SQL도 함께 작성 (DOWN migration)
   └─ RLS 정책 영향 여부 확인

6. packages/shared 타입 업데이트 필요 여부 판단
   └─ 변경된 테이블에 대응하는 TypeScript 타입 수정안 제시
```

## 크로스 체크 체크리스트 `[ENG][MUST]`

```
스키마 변경 전 반드시 확인:

[ ] 변경 테이블을 참조하는 .service.ts 파일 모두 확인
[ ] 변경 컬럼을 사용하는 SELECT/INSERT/UPDATE 쿼리 전부 확인
[ ] packages/shared의 관련 TypeScript 타입 정의 확인
[ ] Supabase RLS 정책이 변경에 영향받는지 확인
[ ] 컬럼 타입 변경 시 기존 데이터 마이그레이션 필요 여부 판단
[ ] NOT NULL 추가 시 기존 레코드에 기본값 처리 여부 확인
[ ] 외래키 추가/삭제 시 연관 테이블 데이터 정합성 확인
[ ] 인덱스 변경이 쿼리 성능에 미치는 영향 확인
```

## 마이그레이션 파일 규칙 `[ENG]`

```sql
-- 파일명: supabase/migrations/{timestamp}_{snake_case_description}.sql
-- 예: 20260411120000_add_refund_fee_to_payments.sql

-- UP migration
ALTER TABLE payments ADD COLUMN refund_fee integer DEFAULT 0 NOT NULL;

-- 인덱스 필요 여부 판단 (WHERE/JOIN에 자주 사용되는 컬럼이면 추가)
CREATE INDEX IF NOT EXISTS idx_payments_refund_fee ON payments(refund_fee);

-- RLS 정책 추가 여부 판단
-- (새 컬럼이 민감 데이터이면 RLS 정책 업데이트 필수)

-- ⬇️ 롤백 시 실행 (아래 주석 처리된 코드를 DOWN migration으로 사용)
-- ALTER TABLE payments DROP COLUMN IF EXISTS refund_fee;
```

## Constraints

- 전체 모노레포 스캔 — 격리 없이 `products/*`, `packages/*` 모두 읽음 `[ENG]`
- 마이그레이션 파일은 직접 실행하지 않음 — 생성 후 사령관이 직접 실행 `[SEC][MUST]`
- `service_role` 키 직접 접근 금지 — Supabase CLI 또는 대시보드 사용 권장 `[SEC]`
- 롤백 SQL 항상 함께 제공 — 돌이킬 수 없는 변경 방지 `[ENG]`
- 프로덕션 DB 스키마 변경은 반드시 스테이징 환경 검증 후 `[ENG][MUST]`

## Skill Chaining

- **upstream:** `@code architect` — 새 기능 개발 시 DB 설계 단계에서 호출
- **downstream:**
  - `@sec check supabase/` — 마이그레이션 후 RLS 점검
  - `ICHECK` — 수정된 TypeScript 타입 검증

## Hard Gates

| ID | 조건 | FAIL 기준 |
|----|------|-----------|
| G1 | 롤백 경로 | 마이그레이션 또는 스키마 변경에 롤백 방안이 없음 |
| G2 | 영향 범위 | API, Web, Mobile, Shared 타입 영향 범위를 점검하지 않음 |
| G3 | RLS/권한 | Supabase 테이블 변경 시 RLS 영향이 누락됨 |

## Soft Findings

| ID | 조건 | 조치 |
|----|------|------|
| S1 | 인덱스 최적화 | 조회 패턴이 명확하면 인덱스 후보 제안 |
| S2 | 타입 동기화 | 공유 타입/클라이언트 타입 재생성 필요 여부 표시 |

## Registry Metadata

```json
{
  "skill_id": "db",
  "skill_name": "DB Architect Skill",
  "version": "1.0.0",
  "department": "Engineering",
  "owner": "Engineering",
  "tier": "2",
  "trigger": "@db check {변경내용} | @db migrate {파일명} | @db audit",
  "trigger_type": "manual",
  "dependencies": ["code"],
  "model": "claude-sonnet-4-6",
  "last_updated": "2026-04-22"
}
```
