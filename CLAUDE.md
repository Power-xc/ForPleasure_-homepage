# ForPleasure 홈페이지 — CLAUDE.md
> **버전:** V6.1 (IPAI 운영 체제 기반) | **제품 ID:** FP-HOME | **상태:** v0.1 개발 중
> **목적:** 세션 시작 시 자동 로드 — 이 파일을 읽는 순간부터 아래 모든 규칙이 적용된다.
> **출처:** IPAI 스킬 라이브러리에서 재사용 가능한 스킬셋·규칙을 이식한 사이드 프로젝트.
> **전체 상세 규칙:** `skills/engineering/operating-protocol.md` 참조 (상세 아키텍처/보안/품질 기준은 이곳을 확인하라)

---

## 프로젝트 정의 `[SPEC]`

- **무엇:** ForPleasure — 데이팅 앱의 **공식 홈페이지(랜딩/마케팅 사이트)**.
- **범위:** 앱 소개, 핵심 가치 제안, 다운로드/웨이팅리스트 전환, 신뢰·안전 메시지, FAQ.
- **성격:** 사이드 프로젝트. 가볍고 빠르게 출시하되, 규칙(IPAI 프로토콜)은 그대로 지킨다.

---

## 0. 세션 시작 프로토콜 `[IPAI][MUST]`

새 세션을 열면 코드부터 짜지 않는다. 아래 순서로 맥락을 복원한다.

**읽는 순서:**
1. 이 파일 (자동 로드됨)
2. 진행 중인 작업이 있으면 → `{기능명}/명세서.md` → `리서치.md` → `계획.md`
3. 처음 세션이라면 → 프로젝트 루트 `README.md` 또는 `SPEC.md`

> 아직 `SPEC.md`/명세서가 없다. 홈페이지 첫 작업은 `skills/engineering/feature-spec-template.md`를 복사해 **명세서.md 작성**부터 시작하는 것을 권장한다.

---

## 1. IPAI 커맨드

> 한 단어로 품질 게이트를 발동. 입력하면 해당 체크리스트 전부 수행 후 결과 보고.

| 커맨드 | 동작 |
|--------|------|
| `IRESEARCH` | 코드베이스 심층 분석 → `리서치.md` 생성 |
| `IPLAN` | `리서치.md` 기반 구현 계획 → `계획.md` 생성 (코드 미작성) |
| `IEXEC` | `계획.md` 체크리스트 순서대로 구현 → 완료 항목 [x] |
| `ICODE` | 코드 작성 후 체크 (린터, 타입, Zero Warnings) |
| `ICHECK` | 전체 품질 검토 (스멜, 에러 처리, 보안) |
| `IDESIGN` | 디자인 무결성 검토 (하드코딩, 반응형, 인터랙티브) `[PROD]` |
| `ISEC` | 보안 검토 (입력값 검증, 환경변수, SQL 인젝션) `[SEC]` |
| `ICOST` | 비용 검토 (Tier 적절성, 호출 횟수) `[OPS]` |
| `IGIT` | 불필요한 코드 제거 및 원자적 커밋 브랜치 생성 |
| `IDOCS` | 커밋 전 명세서/리서치 문서를 실제 작성된 최신 코드 상태와 동기화 `[ENG]` |

**표준 워크플로우:** `IRESEARCH` → `IPLAN` → (확인) → `IEXEC` → `ICODE` → `IDOCS` → `IGIT`

---

## 2. 스킬 체이닝 로드 (요약)

> 각종 트리거(@명령어)에 반응해 특정 파일을 읽는다. 상세 목록은 `skills/README.md` 참고.

- **개발 (`[ENG]`)**: `@code architect`, `@edge hunt`, `@db design`, `@error solve`, `@qa blind-test`
- **프로덕트 (`[PROD]`)**: `@spec new`, `@brand generate`, `@motion direct`, `@ui build`
- **보안 (`[SEC]`)**: `@sec audit`, `@sec rollback`, `@sec ai`, `@sec infra`, `@sec csp`, `@sec ratelimit`
- **그로스 (`[GROWTH]`)**: `@viral write`, `@b2b propose`, `@funnel analyze`, `@strategy analyze`, `@copy write`, `@voc analyze`, `@objection handle`, `@email sequence`, `@launch plan`, `@content write`, `@content repackage`
- **운영 (`[OPS]`)**: `@insight report`, `@token report`, `@claude optimize`, `@task update`

> 💡 **스킬 체이닝 표준**: 서로 다른 스킬 파일 간 결과를 주고받기 위해, 모든 분석/생성 스킬의 최하단에는 기계가 읽기 쉬운 표준 JSON 요약 객체를 출력하는 것을 원칙으로 한다.

---

## 3. 절대 원칙 `[IPAI][MUST]`

> 명시적 허가 없이 아래 원칙을 어길 수 없다.

1. **바이브 코딩 금지**: 전체 맥락 없이 추측으로 코드를 짜지 않는다. 코딩 전 반드시 기존 토큰과 구조 확인.
2. **모르면 질문하라 (Fail-fast)**: 아키텍처 변경, 패키지 추가, DB 스키마 변경 시 확실하지 않다면 단독으로 가정하지 말고 사령관(사용자)에게 먼저 멈춰서 질문하라.
3. **중복 개발 금지**: 새 API나 UI 만들기 전 기존 코드를 탐색해 먼저 재사용한다. `[DRY]`
4. **전 과정 한국어 주석**: 코드 설계 의도와 `[ENG]` 같은 규칙 태그는 반드시 한국어로 파일 및 로직 위에 명시한다.
5. **교체는 완전 삭제를 뜻함**: 새 구현이 대체하면 레거시 코드는 남기지 않는다.

---

## 4. 아키텍처 및 상세 규칙 (위임)
> 코드 품질 룰, FSD 레이어, 네이밍 규칙, Git 정책, 디자인 토큰 및 에러 처리 표준은 방대하므로 **`skills/engineering/operating-protocol.md`**에 위임한다. 코드를 짤 때는 반드시 해당 프로토콜을 따른다.

---

## 5. ForPleasure 홈페이지 전용 규칙 (오버라이드) `[PROD][SEC]`

> 본 섹션의 규칙은 충돌 시 루트 공통 규칙보다 **우선 적용**된다.

### 5-1. 스택 (확정 전 가정 금지 `[MUST]`)
- 권장: Next.js 14 App Router + Tailwind + FSD. **단, 사령관 승인 전까지는 가정하지 말고 명세서에서 확정한다.**
- 사이드 프로젝트 특성상 과한 의존성은 지양 — 정적/랜딩 위주면 라이브러리 최소화. `[ENG][SHOULD NOT]`

### 5-2. 디자인 토큰 `[PROD]`
- ForPleasure 전용 브랜드 토큰을 `brand-identity` 스킬로 먼저 확정한 뒤 `tailwind.config`/토큰 파일에 정의한다.
- 다른 IPAI 제품(haul=charcoal/orange, claimit=sage/lime 등)의 토큰을 혼용하지 않는다.

### 5-3. 데이팅 서비스 특화 주의 `[SEC][PROD][MUST]`
- **개인정보 민감도 최상**: 이메일/연락처 등 수집 폼은 입력값 검증(Zod) + 최소 수집 원칙. 수집 항목은 명세서에 명시.
- **연령 정책**: 19+ 또는 성인 인증이 필요한 서비스면 홈페이지에서 연령 정책을 명확히 고지한다.
- **과장·허위 금지**: "100% 매칭", "무조건 성사" 같은 보장형·과장 카피 금지. 신뢰·안전(Trust & Safety) 메시지를 우선한다.
- **선정성 수위 관리**: 앱스토어/광고 정책에 맞춰 노출 수위를 관리한다.

### 5-4. 추천 스킬 프리셋
| 작업 | 스킬 체인 | 완료 기준 |
|------|-----------|-----------|
| 랜딩 비주얼/히어로 | `brand → ui → motion → qa → token` | 토큰 기반 UI, 모바일 우선 레이아웃, 인터랙티브 5상태, CTA 동작 확인 |
| 전환 카피/메시지 | `voc → copy → objection → funnel → token` | 고객 언어 기반 카피, 반론 처리, 퍼널 병목 점검 |
| 출시/웨이팅리스트 | `launch → email → content → insight → task` | D-30 캘린더, 가입 시퀀스, 운영 이슈 등록 |
| 폼/배포 보안 | `code → edge → sys-sec → infra-sec → token` | 입력 검증, CSP/Rate Limit, 비용 추적 |

### 5-5. 금지 사항
- FSD 도입 시 레이어 역방향 import 금지.
- 수집 폼 값(이메일 등)을 클라이언트에서만 신뢰하지 않는다 — 서버 검증 필수.
- 외부 콘텐츠/사용자 입력을 시스템 프롬프트에 직접 삽입 금지. `[SEC]`
