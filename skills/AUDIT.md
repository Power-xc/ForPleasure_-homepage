# IPAI 스킬셋 감사표

> **작성일:** 2026-04-22
> **최종 업데이트:** 2026-04-22
> **기준:** 실행 스킬 26종 + 운영 문서/템플릿 5종
> **목적:** 스킬 라이브러리의 문서 일관성, 체이닝 가능성, 유지보수 우선순위를 한곳에서 추적한다.

---

## 요약

- **검증 완료:** 26개
- **보강 필요:** 0개
- **비실행 문서:** 5개
- **병합 후보:** 없음. 현재는 역할 경계가 충분히 분리되어 있어 병합보다 표준화가 우선이다.

## 감사 기준

| 기준 | 설명 |
|------|------|
| 메타 주석 | 파일 최상단에 `파일`, `스킬`, `부서`, `ID` 정보가 있는가 |
| Skill ID | 본문 상단과 하단 metadata의 ID가 일치하는가 |
| Trigger | 사람이 호출할 수 있는 명령 또는 자동 호출 조건이 명확한가 |
| Output | 결과 형식 또는 리포트 구조가 명확한가 |
| JSON Payload | 다음 스킬이 읽을 수 있는 하단 metadata 또는 표준 JSON Payload가 있는가 |
| Dependencies | 체이닝 선후 관계가 `dependencies`로 표현되는가 |

---

## 우선순위

| 우선순위 | 항목 | 상태 | 최종 수정일 | 조치 |
|----------|------|------|------------|------|
| P0 | `CLAUDE.md` 스킬 수 불일치 | 수정 완료 | 2026-04-22 | 실행 스킬 26종 + 운영 문서/템플릿 5종 + 감사표 기준으로 갱신 |
| P0 | `운영-프로토콜.md` V6.0/V6.1 불일치 | 수정 완료 | 2026-04-22 | V6.1로 동기화 |
| P0 | `docs/ECOSYSTEM.md` 폴더명 불일치 | 수정 완료 | 2026-04-22 | `프로덕트/개발/보안/그로스/운영`으로 갱신 |
| P1 | `strategy`, `funnel` 메타 주석 누락 | 수정 완료 | 2026-04-22 | 최상단 메타 주석 추가 |
| P1 | 실행 스킬 JSON metadata 필드 편차 | 수정 완료 | 2026-04-22 | 실행 스킬 26종의 최소 필드명 보강 완료 |
| P1 | Registry Metadata 순수 JSON | 수정 완료 | 2026-04-22 | `npm run skills:audit`에서 26개 실행 스킬 파싱 검증 |
| P1 | Registry Metadata tier 타입 | 수정 완료 | 2026-04-22 | `tier`를 문자열 `"1" | "2"`로 강제 |
| P2 | 그로스 신규 7종 체이닝 관계 | 수정 완료 | 2026-04-22 | upstream/downstream/action payload 추가 |
| P2 | 운영 스킬 체이닝 | 수정 완료 | 2026-04-22 | `token → insight → task → skill improvement` 루프 명시 |

---

## 실행 스킬 인벤토리

| 영역 | 파일 | ID | Tier | Trigger | Payload | Dependencies | 판정 | 조치 |
|------|------|----|------|---------|---------|--------------|------|------|
| 프로덕트 | `프로덕트/브랜드-아이덴티티.md` | `brand` | 1 | 있음 | 있음 | `[]` | 유지 | 브랜드 토큰 시작점으로 유지 |
| 프로덕트 | `프로덕트/모션-디렉터.md` | `motion` | 1 | 있음 | 있음 | `["viral"]` | 유지 | 숏폼 제작 체인 유지 |
| 프로덕트 | `프로덕트/UI-컴포넌트.md` | `ui` | 2 | 있음 | 있음 | `["brand"]` | 유지 | 디자인 토큰 의존 유지 |
| 개발 | `개발/코드-아키텍트.md` | `code` | 2 | 있음 | 있음 | `[]` | 유지 | 개발 체인의 기준 스킬로 유지 |
| 개발 | `개발/DB-아키텍트.md` | `db` | 2 | 있음 | 있음 | `["code"]` | 수정 완료 | 최소 metadata 필드 보강 완료 |
| 개발 | `개발/엣지케이스-헌터.md` | `edge` | 1 | 있음 | 있음 | `["code"]` | 유지 | `code → edge` 체인 유지 |
| 개발 | `개발/에러-해결사.md` | `catcher` | 2 | 있음 | 있음 | `[]` | 수정 완료 | 최소 metadata 필드 보강 완료 |
| 개발 | `개발/QA-블라인드테스트.md` | `qa` | 2 | 있음 | 있음 | `["code","edge"]` | 수정 완료 | JSON payload와 Registry Metadata 보강 완료 |
| 보안 | `보안/시스템-보안.md` | `sys-sec` | 2 | 있음 | 있음 | `["edge"]` | 보강 | Hard Gate 결과 구조를 표준으로 유지 |
| 보안 | `보안/AI-공격방어.md` | `ai-sec` | 2 | 있음 | 있음 | `["sys-sec"]` | 보강 | AI 출력/입력 샌드박스 게이트 유지 |
| 보안 | `보안/인프라-방어.md` | `infra-sec` | 2 | 있음 | 있음 | `["sys-sec"]` | 보강 | CSP/Rate Limit 게이트 유지 |
| 그로스 | `그로스/바이럴-스크립트.md` | `viral` | 1 | 있음 | 있음 | `[]` | 유지 | `viral → motion` 체인 유지 |
| 그로스 | `그로스/B2B-제안봇.md` | `b2b` | 2 | 있음 | 있음 | `["brand"]` | 유지 | B2B 영업 체인 유지 |
| 그로스 | `그로스/퍼널-진단.md` | `funnel` | 1 | 있음 | 있음 | `[]` | 수정 완료 | 메타 주석 추가 완료 |
| 그로스 | `그로스/마케팅-전략봇.md` | `strategy` | 2 | 있음 | 있음 | `[]` | 수정 완료 | 메타 주석 추가 완료 |
| 그로스 | `그로스/카피라이팅봇.md` | `copy` | 1 | 있음 | 있음 | `["voc","funnel"]` | 검증 완료 | VOC/퍼널 기반 전환 카피 체인 |
| 그로스 | `그로스/VOC-분석봇.md` | `voc` | 1 | 있음 | 있음 | `[]` | 검증 완료 | 고객 언어 → copy/strategy 연계 |
| 그로스 | `그로스/반론-처리봇.md` | `objection` | 1 | 있음 | 있음 | `["copy"]` | 검증 완료 | copy 후속 반론 처리 체인 |
| 그로스 | `그로스/이메일-시퀀스봇.md` | `email` | 1 | 있음 | 있음 | `["launch","objection"]` | 검증 완료 | launch/objection 후속 이메일 체인 |
| 그로스 | `그로스/론칭-플래너.md` | `launch` | 2 | 있음 | 있음 | `["copy","viral"]` | 검증 완료 | 출시 체인 오케스트레이터 |
| 그로스 | `그로스/콘텐츠-라이팅봇.md` | `content-write` | 1 | 있음 | 있음 | `["strategy","voc"]` | 검증 완료 | 전략/VOC 기반 콘텐츠 생성 |
| 그로스 | `그로스/콘텐츠-리패키징봇.md` | `content-repackage` | 1 | 있음 | 있음 | `["content-write"]` | 검증 완료 | 기존 원고 변환 후 채널별 후속 작업 |
| 운영 | `운영/토큰-워치독.md` | `token` | 1 | 있음 | 있음 | `[]` | 유지 | 비용 집계 시작점으로 유지 |
| 운영 | `운영/인사이트-제너레이터.md` | `insight` | 1 | 있음 | 있음 | `["token"]` | 유지 | 비용 데이터 기반 리포트 유지 |
| 운영 | `운영/클로드-비용최적화.md` | `claude-optimize` | 1 | 있음 | 있음 | `[]` | 유지 | Claude Code 비용 최적화 전용으로 유지 |
| 운영 | `운영/이슈-트래커.md` | `task` | 1 | 있음 | 있음 | `["insight"]` | 수정 완료 | `insight → task` metadata 반영 완료 |

---

## 운영 문서/템플릿

| 파일 | 구분 | 판정 | 조치 |
|------|------|------|------|
| `README.md` | 인덱스 | 수정 완료 | 실행 스킬과 운영 문서/템플릿 분리 |
| `SKILL_TEMPLATE.md` | 템플릿 | 추가 완료 | 새 실행 스킬과 표준화 기준 |
| `OPERATING_LOOP.md` | 프로토콜 | 추가 완료 | `token → insight → task → skill improvement` 루프 정의 |
| `개발/운영-프로토콜.md` | 프로토콜 | 수정 완료 | V6.1 및 JSON 최소 필드 정의 추가 |
| `개발/기능명세-양식.md` | 템플릿 | 유지 | 실행 스킬 카운트에서 제외 |

---

## 제품별 적용 감사 — Claimit

| 날짜 | 체인 | 대상 | 판정 | 조치 |
|------|------|------|------|------|
| 2026-04-22 | `code → sys-sec → infra-sec → qa` | `products/claimit/apps/mobile` | 수정 완료 | 문서상 삭제된 legacy mobile 앱 제거 |
| 2026-04-22 | `sys-sec → infra-sec → qa` | Web checkout | 수정 완료 | API 실패 시 mock 결제 성공 fallback 제거, Toss key 누락 시 진행 차단 |
| 2026-04-22 | `sys-sec → infra-sec` | API env validation | 수정 완료 | `JWT_SECRET` 64자+, production Toss secret 필수 검증 |
| 2026-04-22 | `ai-sec → sys-sec` | Gemini 기반 문서/질문 서비스 | 수정 완료 | `untrusted_document` boundary 공통화 및 적용 |
| 2026-04-22 | `code → qa` | TypeScript 품질 | 수정 완료 | `any`, `console.*`, production placeholder PDF 흐름 정리 |
| 2026-04-22 | `qa → task` | Claimit 문서 | 수정 완료 | logger 잔여 이슈 제거, Web 단일 전략과 README 동기화 |

---

## 다음 정리 후보

1. `npm run skills:audit`를 PR/커밋 전 체크에 연결한다.
2. 보안 3종의 Output JSON을 결과 payload와 registry metadata로 더 명확히 분리한다.
3. 실제 스킬 실행 로그를 `OPERATING_LOOP.md`의 Action Payload 형식으로 축적한다.
