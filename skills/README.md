# IPAI 스킬 라이브러리

> **버전:** 2.0.0 | **최종 수정:** 2026-04 | **소유:** IPAI (Intent Product AI)
>
> AI 에이전트 행동 규범 전문 → [개발/운영-프로토콜.md](개발/운영-프로토콜.md)

---

## 현황

- **실행 스킬:** 26종
- **운영 문서/템플릿:** 5종 (`README.md`, `SKILL_TEMPLATE.md`, `OPERATING_LOOP.md`, `개발/운영-프로토콜.md`, `개발/기능명세-양식.md`)
- **감사표:** [AUDIT.md](AUDIT.md)
- **운영 루프:** [OPERATING_LOOP.md](OPERATING_LOOP.md)
- **표준:** 모든 실행 스킬은 [SKILL_TEMPLATE.md](SKILL_TEMPLATE.md)를 기준으로 `Skill ID`, `Tier`, `Trigger`, `Input/Output Schema`, `Hard Gates`, `Skill Chaining`, 하단 JSON metadata(`skill_id`, `skill_name`, `owner`, `tier`, `trigger_type`, `dependencies`, `last_updated`)를 유지한다.
- **자동 감사:** `npm run skills:audit`

---

## 프로덕트/ `[PROD]`

| 파일 | 스킬 ID | 설명 | Tier |
|------|---------|------|------|
| [브랜드-아이덴티티.md](프로덕트/브랜드-아이덴티티.md) | `brand` | 디자인 가이드라인 → Tailwind/CSS 토큰 자동 변환 | 1 |
| [모션-디렉터.md](프로덕트/모션-디렉터.md) | `motion` | 대본 → 컷/자막/BGM 타임라인 자동 생성 | 1 |
| [UI-컴포넌트.md](프로덕트/UI-컴포넌트.md) | `ui` | 디자인 시스템 토큰 기반 TSX 컴포넌트 즉시 생성 | 2 |

## 개발/ `[ENG]`

| 파일 | 스킬 ID | 설명 | Tier |
|------|---------|------|------|
| [코드-아키텍트.md](개발/코드-아키텍트.md) | `code` | SPEC.md → FSD 보일러플레이트 생성 + 코드 감사 | 2 |
| [엣지케이스-헌터.md](개발/엣지케이스-헌터.md) | `edge` | 명세서/코드 → 예외 상황 테스트 시나리오 자동 생성 | 1 |
| [에러-해결사.md](개발/에러-해결사.md) | `catcher` | 워크스페이스 격리 에러 추적 및 해결안 제시 | 2 |
| [DB-아키텍트.md](개발/DB-아키텍트.md) | `db` | 스키마 변경 시 모노레포 전체 크로스 체크 | 2 |
| [QA-블라인드테스트.md](개발/QA-블라인드테스트.md) | `qa` | 브라우저 에이전트를 통한 UI/UX 결함 탐색 자동화 | 2 |

## 보안/ `[SEC]`

| 파일 | 스킬 ID | 설명 | Tier |
|------|---------|------|------|
| [시스템-보안.md](보안/시스템-보안.md) | `sys-sec` | 코드베이스 점검 및 RLS DB 보안, 원클릭 롤백 대응 | 2 |
| [인프라-방어.md](보안/인프라-방어.md) | `infra-sec` | 배포 설정(CSP), WAF, Rate Limiting 방어 및 모니터링 | 2 |
| [AI-공격방어.md](보안/AI-공격방어.md) | `ai-sec` | 프롬프트 인젝션 방어 및 외부 콘텐츠 샌드박스 격리 | 2 |

## 그로스/ `[GROWTH]`

| 파일 | 스킬 ID | 설명 | Tier |
|------|---------|------|------|
| [바이럴-스크립트.md](그로스/바이럴-스크립트.md) | `viral` | 실시간 트렌드 → 숏폼 대본 A/B 변형 생성 | 1 |
| [B2B-제안봇.md](그로스/B2B-제안봇.md) | `b2b` | 기업 URL → 분석 보고서 + 맞춤 제안서 자동 생성 | 2 |
| [퍼널-진단.md](그로스/퍼널-진단.md) | `funnel` | AIDA × TOFU/MOFU/BOFU 병목 진단 + 처방 보고서 | 1 |
| [마케팅-전략봇.md](그로스/마케팅-전략봇.md) | `strategy` | 3C → SWOT → STP → 4P 자동 전략 수립 | 2 |
| [카피라이팅봇.md](그로스/카피라이팅봇.md) | `copy` | 상세페이지·광고·훅·페르소나별 카피 풀세트 생성 | 1 |
| [VOC-분석봇.md](그로스/VOC-분석봇.md) | `voc` | 고객 후기 → 핵심 키워드·광고 헤드라인·소셜 증거 변환 | 1 |
| [반론-처리봇.md](그로스/반론-처리봇.md) | `objection` | 3대 반론(비쌈/필요없음/나중에) 처리 카피 자동 생성 | 1 |
| [이메일-시퀀스봇.md](그로스/이메일-시퀀스봇.md) | `email` | 구독 → 첫구매 7단계 / 재구매 4단계 이메일 시퀀스 | 1 |
| [론칭-플래너.md](그로스/론칭-플래너.md) | `launch` | D-30 콘텐츠 캘린더 + 세그먼트별 리타겟팅 카피 | 2 |
| [콘텐츠-라이팅봇.md](그로스/콘텐츠-라이팅봇.md) | `content-write` | 전문가 페르소나·문체 모방·SEO 블로그·스토리텔링·제목 생성 | 1 |
| [콘텐츠-리패키징봇.md](그로스/콘텐츠-리패키징봇.md) | `content-repackage` | 5채널 변환·독자 맞춤 리라이팅·글 비평·뉴스레터 기획·3버전 요약 | 1 |

## 운영/ `[OPS]`

| 파일 | 스킬 ID | 설명 | Tier |
|------|---------|------|------|
| [인사이트-제너레이터.md](운영/인사이트-제너레이터.md) | `insight` | 전 사업부 데이터 → 일일 모닝 리포트 + 의사결정 3가지 | 1 |
| [토큰-워치독.md](운영/토큰-워치독.md) | `token` | API 비용 실시간 추적 + 예산 초과 시 킬스위치 | 1 |
| [클로드-비용최적화.md](운영/클로드-비용최적화.md) | `claude-optimize` | settings.json 최적화로 Claude Code 비용 최대 80% 절감 | 1 |
| [이슈-트래커.md](운영/이슈-트래커.md) | `task` | Notion 중앙 칸반 보드 자동 업데이트 + 전체 프로젝트 뷰 | 1 |

---

## 운영 문서/템플릿

| 파일 | 구분 | 설명 |
|------|------|------|
| [README.md](README.md) | 인덱스 | 실행 스킬 목록과 체이닝 요약의 기준 문서 |
| [SKILL_TEMPLATE.md](SKILL_TEMPLATE.md) | 템플릿 | 새 실행 스킬 생성 및 기존 스킬 표준화 기준 |
| [OPERATING_LOOP.md](OPERATING_LOOP.md) | 프로토콜 | `token → insight → task → skill improvement` 운영 피드백 루프 |
| [운영-프로토콜.md](개발/운영-프로토콜.md) | 프로토콜 | AI 에이전트 행동 규범 · 스킬 체이닝 · 아키텍처 표준 |
| [기능명세-양식.md](개발/기능명세-양식.md) | 템플릿 | 새 기능 시작 시 복사해서 쓰는 명세서 양식 |

---

## 스킬 체이닝 요약

```
YouTube 자동화:  viral → motion → Remotion → ElevenLabs → SNS 업로드 → token → insight
B2B 영업:        b2b → brand → ui → 아웃리치 발송 → token
신규 서비스 개발: code → edge → sys-sec → TestSprite(외부 QA 도구) → brand → ui → token
배포 전 보안:     sys-sec → ai-sec → infra-sec → (Critical 발견 시 중단) → code → deploy
운영 리포트:      token → insight → task → skill improvement
```
