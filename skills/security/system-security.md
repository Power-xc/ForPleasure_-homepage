<!-- 파일: skills/security/system-security.md | 스킬: System Security | 부서: Security | ID: sys-sec -->

# System Security Skill

> **담당:** Security
> **Tier:** 2 (Claude Sonnet)
> **Skill ID:** `sys-sec`

## Purpose

코드베이스·인프라 설정·배포 파이프라인을 분석해 보안 취약점을 발견하고
우선순위 기반 조치 체크리스트를 자동 생성한다.
보안 사고 발생 시 즉시 대응 → 근본 원인 분석 → 재발 방지까지 전 사이클을 커버한다.
실무에서 바로 실행 가능한 형태로 산출물을 만드는 것이 핵심.

## Trigger

- `@sec audit` — 전체 보안 점검 (코드 + 인프라)
- `@sec check <파일경로>` — 특정 파일/디렉토리 집중 점검
- `@sec payment` — 결제 플로우 전용 점검 (결제 엔드포인트 출시 전 필수)
- `@sec deploy` — 배포 전 보안 최종 점검
- `@sec incident` — 보안 사고 발생 시 즉시 대응 프로토콜 실행
- `@sec rollback` — 보안 문제 직후 원클릭 형상 원복(Revert) 조치를 실행하고 경과를 사령관에게 보고

## Input

```json
{
  "target": "audit | file | payment | deploy | incident",
  // audit:    코드베이스 전체 보안 점검
  // file:     특정 파일/폴더 집중 점검
  // payment:  결제 관련 코드 + API 엔드포인트 점검
  // incident: 보안 사고 발생 — 즉시 대응 프로토콜 실행
  // deploy:  배포 전 인프라·환경변수·CI/CD 점검

  "path": "점검할 파일 또는 폴더 경로 (target=file일 때 필수)",
  // 예: "app/api/payment/route.ts", "app/admin/"

  "stack": {
    "framework": "Next.js | React | Node.js | 기타",
    "auth": "Supabase | NextAuth | Clerk | 기타",
    // 인증 방식을 알아야 세션/토큰 보안을 정확히 점검할 수 있음
    "payment": "Toss | Stripe | PortOne | 없음",
    "db": "Supabase | Prisma | MongoDB | 기타"
  },

  "focus": ["admin", "payment", "auth", "env", "api", "rls"],
  // 여러 개 선택 가능. 생략 시 전체 점검
  // admin:   어드민 페이지 접근 제어
  // payment: 결제 금액/상태 서버 검증
  // auth:    인증·세션·쿠키 보안
  // env:     환경변수 노출 여부
  // api:     API 엔드포인트 입력 검증
  // rls:     DB 행 수준 보안(Row Level Security)

  "severity_min": "critical | high | medium | low"
  // 이 등급 이상만 보고서에 포함 (기본값: medium)
}
```

## Output

1. **보안 점검 리포트** — 발견된 취약점 목록 (심각도·위치·원인·조치방법)
2. **조치 체크리스트** — 즉시 실행 가능한 형태 (파일 경로, 코드 스니펫 포함)
3. **코드 수정 예시** — Before/After 형태로 안전한 코드 제시
4. **우선순위 테이블** — Critical/High/Medium/Low 분류

```json
{
  "verdict": "PASS | FAIL",
  "hard_gates": [
    { "id": "G1", "item": "어드민 라우트 서버 측 role 검증", "status": "PASS | FAIL", "detail": "" }
  ],
  "soft_findings": [
    { "id": "S1", "item": "2FA 관리자 적용", "severity": "🟡 High | 🟢 Low", "action": "" }
  ],
  "summary": "Hard Gate X/10 통과. Critical N건, High N건, Medium N건."
}
```

## Process

```
1. target에 따라 점검 범위 설정
   └─ audit: 전체 코드베이스 스캔
   └─ file:  지정 경로만 집중 분석
   └─ payment: 결제 API 라우트 + 클라이언트 폼 추적
   └─ deploy: .env, CI/CD 설정, Dockerfile, vercel.json 점검

2. focus 항목별 점검 실행
   // 각 항목마다 아래 체크리스트 실행

3. 발견된 취약점 심각도 분류
   critical: 즉시 서비스 중단 가능 (예: 인증 우회, 결제 금액 조작)
   high:     데이터 노출 위험 (예: API 키 하드코딩, RLS 미설정)
   medium:   잠재적 위험 (예: 에러 메시지 정보 노출, 세션 타임아웃 없음)
   low:      개선 권장 (예: 로깅 미흡, 비밀번호 정책 미적용)

4. 조치 체크리스트 생성 (파일 경로 + 코드 스니펫 포함)

5. severity_min 이하 항목 필터링 후 리포트 출력
```

## 점검 항목 체크리스트 (내장)

> AI가 점검 시 이 체크리스트를 항목별로 실행한다.

### 🔐 어드민 접근 제어

```
[ ] 어드민 라우트에 서버 측 role 검증이 있는가?
    (클라이언트 redirect만 있으면 우회 가능 — 서버 미들웨어 필수)
[ ] 2FA(2단계 인증)가 관리자 계정에 적용되어 있는가?
[ ] RBAC(역할 기반 접근 제어)로 최소 권한만 부여되어 있는가?
[ ] 어드민 접근 실패 로그가 기록되는가?
```

### 💳 결제 보안

```
[ ] 결제 금액이 클라이언트가 아닌 서버에서 검증되는가?
    (클라이언트 → 서버 → 결제사: 반드시 서버가 DB에서 원본 금액 재조회)
[ ] 주문 ID와 결제 금액이 서버에서 매칭 확인되는가?
[ ] 결제 정보(카드번호, CVV)가 로그에 남지 않는가? (마스킹 여부)
[ ] 웹훅 서명 검증이 적용되어 있는가?
[ ] PCI-DSS 준수를 위해 결제 정보를 직접 저장하지 않고 토큰화하는가?
```

**결제 서버 검증 예시 (필수 패턴):**

```typescript
// ❌ 잘못된 방식 — 클라이언트가 보낸 금액을 그대로 믿음
const { amount, orderId } = req.body;
await processPayment(amount);

// ✅ 올바른 방식 — 서버에서 DB 원본 금액 재조회 후 검증
const { orderId } = req.body;
const order = await db.orders.findUnique({ where: { id: orderId } });
// 클라이언트가 보낸 금액과 DB에 저장된 금액이 다르면 즉시 거부
if (!order || order.amount !== req.body.amount) {
  return res.status(400).json({ error: "금액 검증 실패" });
}
await processPayment(order.amount); // DB의 신뢰할 수 있는 금액만 사용
```

### 🔑 인증·세션

```
[ ] 세션 쿠키에 HttpOnly, Secure, SameSite=Strict 설정이 있는가?
    (HttpOnly: JS로 쿠키 접근 불가 → XSS 공격 차단)
    (Secure: HTTPS에서만 전송)
    (SameSite: CSRF 공격 차단)
[ ] 세션 타임아웃이 설정되어 있는가? (권장: 어드민 15분, 일반 7일)
[ ] 로그인 실패 횟수 제한(rate limiting)이 있는가?
[ ] JWT 토큰 만료 시간이 적절한가? (access: 15분, refresh: 7일 권장)
[ ] 비밀번호 해시가 bcrypt/argon2로 처리되는가? (MD5/SHA1 사용 금지)
```

### 🌍 환경변수·비밀값

```
[ ] .env 파일이 .gitignore에 포함되어 있는가?
[ ] 코드 내 API 키·비밀번호 하드코딩이 없는가?
[ ] NEXT_PUBLIC_ 접두사 변수에 서버 전용 비밀값이 없는가?
    (NEXT_PUBLIC_*: 브라우저에 노출됨 — 절대 비밀키 포함 금지)
[ ] 프로덕션 환경변수가 CI/CD 비밀 관리 도구에 저장되어 있는가?
[ ] .env.example 파일에서 실제 값이 제거되어 있는가?
```

**위험 패턴 감지:**

```typescript
// ❌ 하드코딩 — 절대 금지 [SEC]
const apiKey = "sk-1234567890abcdef";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

// ✅ 환경변수 사용 (서버 전용은 process.env, 클라이언트 노출 불필요 시 NEXT_PUBLIC_ 제거)
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error("OPENAI_API_KEY 환경변수가 설정되지 않았습니다");
```

### 🛡️ API 입력 검증

```
[ ] 모든 API 엔드포인트에 Zod 또는 동등한 입력 검증이 있는가?
[ ] SQL 인젝션 위험 — 원시 쿼리(raw query) 사용 시 파라미터 바인딩 적용했는가?
[ ] 파일 업로드 시 파일 타입·크기 검증이 있는가?
[ ] API 응답에 민감한 정보(비밀번호 해시, 내부 ID 등)가 포함되어 있지 않은가?
[ ] rate limiting이 공개 API에 적용되어 있는가?
```

**Zod 검증 예시:**

```typescript
import { z } from "zod"; // 입력값의 형식과 범위를 코드로 정의하는 라이브러리

// 결제 요청 스키마 — 이 형식이 아니면 처리 거부
const PaymentSchema = z.object({
  orderId: z.string().uuid(), // UUID 형식만 허용
  amount: z.number().positive().max(10_000_000), // 양수, 최대 1000만원
  currency: z.enum(["KRW", "USD"]), // 허용된 통화만 수락
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = PaymentSchema.safeParse(body); // 검증 실패 시 예외 안 던지고 결과 반환

  if (!parsed.success) {
    // 실패 이유는 서버 로그에만 남기고, 클라이언트에는 일반 메시지만 전달
    console.error("[보안] 결제 요청 검증 실패:", parsed.error);
    return Response.json({ error: "잘못된 요청입니다" }, { status: 400 });
  }

  // parsed.data: 검증 통과한 안전한 데이터만 사용
  const { orderId, amount } = parsed.data;
}
```

### 🗄️ 데이터베이스 RLS (Supabase)

```
[ ] 모든 테이블에 RLS(Row Level Security)가 활성화되어 있는가?
    (RLS 없으면 인증된 사용자가 타인 데이터에 접근 가능)
[ ] anon(비로그인) 정책이 최소 권한으로만 설정되어 있는가?
[ ] service_role 키가 서버 전용 코드에서만 사용되는가?
    (service_role: RLS를 우회하는 관리자 키 — 클라이언트 노출 절대 금지)
[ ] 관리자용 쿼리와 사용자용 쿼리가 분리되어 있는가?
```

### 📋 에러 처리 및 로깅

```
[ ] 에러 응답에 스택 트레이스, 내부 경로, DB 쿼리가 노출되지 않는가?
[ ] 로그에 비밀번호, 카드번호, 주민번호 등이 평문으로 남지 않는가?
[ ] 보안 이벤트(로그인 실패, 권한 오류)가 별도 로그로 수집되는가?
[ ] 로그 보존 기간 정책이 있는가? (GDPR 대응 — 개인정보 포함 로그 무기한 보존 금지)
```

**안전한 에러 응답 패턴:**

```typescript
// ❌ 위험 — 내부 정보 노출
return res.status(500).json({
  error: error.message, // DB 오류 메시지 노출
  stack: error.stack, // 내부 코드 경로 노출
  query: "SELECT * FROM users", // 쿼리 노출
});

// ✅ 안전 — 사용자에겐 일반 메시지, 서버에만 상세 로그
console.error("[오류] 서버 내부 오류:", {
  message: error.message,
  userId: session.userId,
});
return res
  .status(500)
  .json({ error: "처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." });
```

### 🚀 배포·CI/CD

```
[ ] CI/CD 파이프라인에 비밀값이 하드코딩되어 있지 않은가?
[ ] 배포 환경(dev/staging/prod)이 분리되어 있는가?
[ ] 자동 롤백 구성이 되어 있는가?
[ ] Docker 이미지에 불필요한 패키지·권한이 없는가?
[ ] 의존성 패키지 취약점 스캔이 CI에 포함되어 있는가? (npm audit)
```

### 📡 프롬프트 인젝션 방어 (AI 기능 포함 서비스)

```
[ ] 웹/문서에서 가져온 내용이 시스템 프롬프트에 직접 삽입되지 않는가?
[ ] 사용자 입력이 AI 지시로 처리될 수 있는 구조인가? (RAG, 문서 처리 등)
[ ] AI 응답에서 코드/명령이 자동 실행되는 경로가 있는가?
→ 위 해당 시: 신뢰하지 않는 콘텐츠는 별도 샌드박스 처리 필수
```

## 사고 대응 프로토콜 (`@sec incident`)

> 보안 사고가 의심되거나 발생했을 때 이 섹션을 순서대로 실행한다.
> **Critical 발견 즉시 → SY에게 보고 → 단독 판단으로 넘어가지 않음 `[IPAI]`**

---
### 🚨 원클릭 자동 롤백 (`@sec rollback`)
심각한 보안 취약점(예: 토큰 노출, 인증 로직 파손) 확인 시 즉각적으로 코드를 안전한 상태로 복구한다.
1. 문제가 발생한 최신 커밋을 파악한다.
2. `git revert <문제-커밋-해시>`를 실행하여 히스토리를 보존한 채 원상복구시킨다. (reset --hard 절대 금지)
3. 롤백 처리 이후 어느 파일/로직이 제거(Revert)되었는지 콘솔 또는 Slack 메시지 형태의 리포트를 구동한다.
---

### 1단계 — 위험 상황 진단 (무엇이 터진 건지 파악)

```
[ ] 민감 정보 노출 — API 키·비밀번호가 코드/레포/로그에 남아 있는가?
[ ] 입력값 검증 부재 — 서버 입력 검증이 없거나 우회 가능한 상태인가?
[ ] 인증·권한 취약 — 세션/토큰/권한 로직에 구멍이 있는가?
[ ] 암호화 미비 — TLS 미적용, 저장 데이터 평문 저장인가?
[ ] 외부 비정상 접근 — 비정상적인 접속 시도·트래픽이 포착되었는가?
```

### 2단계 — 즉시 대응 (응급조치, 5분 이내)

```
1. 접근 차단
   └─ 의심 계정 즉시 비활성화 (Supabase Dashboard → 사용자 차단)
   └─ 의심 IP 방화벽 규칙 임시 추가
   └─ 영향받은 API 엔드포인트 임시 비활성화 (feature flag 또는 배포 롤백)

2. 자격증명 즉시 교체
   └─ 노출된 API 키 → 즉시 무효화 + 새 키 발급
   └─ Supabase service_role 키 로테이션
   └─ 영향받은 사용자 세션 전체 무효화

3. 로그 원본 보존
   └─ 관련 로그 절대 삭제·수정 금지 — 그대로 보존 (증거 훼손 방지)
   └─ 스크린샷 + 타임스탬프 기록

4. 영향 범위 파악
   └─ 어떤 데이터·사용자·시스템이 영향받았는지 즉시 식별
   └─ 영향받은 범위를 격리 (다른 서비스로 전파 차단)
```

### 3단계 — 근본 원인 분석 (사고 수습 후)

```
1. 취약점 재현 — 어떻게 발생했는지 테스트 환경에서 재현
2. 코드 리뷰 — 해당 코드 경로 전체 보안 점검 (@sec check 실행)
3. 입력 검증 강화 — 빠진 Zod 스키마 추가, 화이트리스트 정책 적용
4. 의존성 점검 — npm audit 실행, 취약점 있는 패키지 즉시 업데이트
5. 공급망 보안 — 외부 라이브러리 사용 목록 검토, 불필요한 것 제거
```

### 4단계 — 재발 방지 (장기 개선)

```
1. CI/CD에 보안 자동화 추가
   └─ npm audit --audit-level=high (빌드 실패 조건 설정)
   └─ 비밀값 스캔 (git-secrets 또는 GitHub Secret Scanning 활성화)

2. 보안 점검 루틴화
   └─ 배포 전 @sec deploy 필수 실행 (operating-protocol Section 10 IGIT 연동)
   └─ 월 1회 @sec audit 전체 점검

3. 사고 기록
   └─ 리서치.md에 타임라인·원인·조치 내역 기록 (세션 날아가도 추적)
   └─ 같은 실수를 반복하지 않도록 operating-protocol Constraints에 추가 `[IPAI]`
```

### 커뮤니케이션 (사용자 영향이 있을 때만)

```
- KK + SY 즉시 공유 — 현재 상태, 영향 범위, 조치 계획
- 사용자 개인정보 노출 시 → 72시간 이내 당사자 통지 (개인정보보호법 의무)
- 외부 채널(SNS, 공지)에 취약점 상세 내용 올리지 않음 — 조치 완료 후 요약만
```

## Example Output

**리포트 형식:**

```markdown
## 보안 점검 결과 (2026-03-18)

### 🔴 Critical (즉시 조치 필요)

| #   | 위치                          | 문제                        | 조치                                               |
| --- | ----------------------------- | --------------------------- | -------------------------------------------------- |
| 1   | `app/api/payment/route.ts:34` | 클라이언트 금액 그대로 사용 | DB에서 원본 금액 재조회 후 검증 (코드 스니펫 첨부) |

### 🟠 High

| #   | 위치                 | 문제                                   | 조치                                   |
| --- | -------------------- | -------------------------------------- | -------------------------------------- |
| 2   | `.env.local`         | NEXT_PUBLIC_SUPABASE_SERVICE_KEY 노출  | NEXT*PUBLIC* 제거 + 서버 전용으로 이동 |
| 3   | `lib/supabase.ts:12` | service_role 키 클라이언트 번들에 포함 | 서버 전용 클라이언트 분리 필요         |

### 🟡 Medium

| #   | 위치              | 문제                          | 조치                                   |
| --- | ----------------- | ----------------------------- | -------------------------------------- |
| 4   | `app/api/` (전체) | Zod 입력 검증 없음            | PaymentSchema 패턴 적용                |
| 5   | `app/error.tsx`   | 스택 트레이스 클라이언트 노출 | 일반 메시지로 교체, 상세는 서버 로그만 |
```

## 성공 기준 (Success Criteria)

### HARD GATE — 하나라도 FAIL 시 배포 중단

| ID | 점검 항목 | 통과 조건 |
|----|----------|----------|
| G1 | 어드민 라우트 서버 측 role 검증 | 미들웨어/API 레벨에서 role 체크 존재 (클라이언트 redirect 단독 불가) |
| G2 | 결제 금액 서버 재검증 | DB에서 원본 금액 재조회 후 클라이언트 전달값과 대조하는 로직 존재 |
| G3 | .env .gitignore 포함 | `.env*` 패턴이 .gitignore에 명시, git status에 .env 파일 미추적 |
| G4 | API 키·비밀값 하드코딩 없음 | 코드 전수 검색 결과 리터럴 키·토큰·비밀번호 없음 |
| G5 | NEXT_PUBLIC_* 에 서버 비밀값 없음 | `NEXT_PUBLIC_` 접두사 변수에 service key, secret 포함 없음 |
| G6 | service_role 키 서버 전용 | 클라이언트 번들에 service_role 키 미포함 (번들 분석 또는 코드 탐색) |
| G7 | 에러 응답 내부 정보 미노출 | 응답 바디에 stack trace, DB 쿼리, 내부 경로 없음 |
| G8 | 세션 쿠키 보안 속성 | HttpOnly + Secure + SameSite=Strict 세 가지 모두 설정 |
| G9 | RLS 전 테이블 활성화 | Supabase 사용 시 모든 테이블 RLS enabled, anon 정책 최소 권한 |
| G10 | API 입력 Zod 검증 존재 | 모든 공개 API 엔드포인트에 Zod 또는 동등한 스키마 검증 적용 |

### SOFT FINDING — 발견 시 보고, 다음 스프린트 처리

| ID | 점검 항목 | 권장 조치 |
|----|----------|----------|
| S1 | 2FA 관리자 계정 적용 | 어드민 계정에 TOTP 기반 2FA 활성화 |
| S2 | 어드민 접근 실패 로그 | 인증 실패 이벤트 별도 로그 수집 |
| S3 | 로그인 실패 횟수 제한 | Rate Limiting (5회 실패 시 잠금 등) 적용 |
| S4 | JWT 만료 시간 점검 | access 15분 / refresh 7일 권장 |
| S5 | 파일 업로드 검증 | 타입·크기 제한 및 MIME 검증 |
| S6 | CI/CD 의존성 스캔 | `npm audit --audit-level=high` 빌드 실패 조건 추가 |
| S7 | 로그 보존 기간 정책 | 개인정보 포함 로그 무기한 보존 금지 (GDPR/개인정보보호법) |

### 최종 판정 규칙

```
Hard Gate 전부 PASS  → verdict: "PASS" → 배포 가능
Hard Gate 1개 이상 FAIL → verdict: "FAIL" → 즉시 중단, 수정 후 재점검
Soft Finding → 배포 블록 없음, soft_findings 배열에 severity 태그 포함
```

## Skill Chaining

- **upstream (이 스킬을 호출하는 스킬들):**
  - Edge Case Hunter (`edge`) — 테스트 시나리오 작성 후 보안 관련 케이스 점검 시
  - Code Architect (`code`) — 신규 서비스 개발 완료 후 배포 전 보안 감사
- **downstream (이 스킬이 호출하는 스킬들):**
  - Token Watchdog (`token`) — 보안 이벤트 로그 비용 추적 시
  - Insight Generator (`insight`) — 보안 점검 결과를 모닝 리포트에 포함 시

## Constraints

- 보안 점검 결과를 PR 코멘트·슬랙 등 공개 채널에 그대로 올리지 않음 — 취약점 목록은 비공개 `[ENG]`
- Critical 항목 발견 시 즉시 중단하고 SY에게 보고 — 단독 판단으로 넘어가지 않음 `[IPAI]`
- 조치 제안 코드는 항상 Before/After 형태로 제시 `[ENG]`
- 테스트 환경 mock 데이터가 프로덕션 코드에 남아 있으면 High 등급으로 분류 `[SEC]`
- 환경변수 실제 값을 출력·로그에 포함하지 않음 — 키 이름만 언급 `[SEC]`
- 점검 완료 후 `리서치.md` 또는 `계획.md`에 결과 기록 (세션 날아가도 추적 가능하게) `[IPAI]`

## 보안 취약점 최종 체크 리스트

1.  코드작업을 완료하면 보안 취약점 기준으로 검토하고 OWASP Top 10 기준으로 수정
2.  JWT 검증
3.  관리자 api노출
4.  sql injection
5.  api key 노출
6.  파일 업로드 rce
7.  서비스 롤 키는 절대 브라우저에 노출 금지
8.  Supabase는 SSR에서 세션을 localStorage 대신 cookies에 저장

### API 보안
- 모든 API 엔드포인트는 인증 필수
- API 키는 절대 하드코딩 금지
- 민감 데이터는 GET URL 파라미터에 포함 금지 (POST body 사용)

### 데이터 보호
- PII는 저장/전송 시 반드시 암호화
- Flutter print()로 민감 데이터 로깅 금지 (debugPrint() 사용)
- 인증 토큰은 FlutterSecureStorage에만 저장

### 모바일 특화
- iOS NSAllowsArbitraryLoads는 반드시 false
- Android Network Security Config 필수 적용
- WebView에서 JavaScript 활성화 시 URL 허용목록 필수

## Registry Metadata

```json
{
  "skill_id": "sys-sec",
  "skill_name": "System Security Skill",
  "version": "1.0.0",
  "department": "Security",
  "owner": "Security",
  "tier": "2",
  "trigger_type": "manual | pre-deploy",
  "dependencies": ["edge"],
  "estimated_cost_per_run_usd": 0.05,
  "last_updated": "2026-03-18"
}
```
