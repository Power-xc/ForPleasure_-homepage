# ForPleasure 홈페이지

데이팅 앱 **ForPleasure**의 공식 홈페이지(랜딩/마케팅 사이트). 사이드 프로젝트.

IPAI 스킬 라이브러리에서 재사용 가능한 **스킬셋·운영 규칙**을 이식해 구성했다.

## 구성

| 경로 | 설명 |
|------|------|
| `CLAUDE.md` | 세션 자동 로드 규칙 + ForPleasure 홈페이지 전용 오버라이드 |
| `AGENTS.md` | 코딩 에이전트(Codex 등) 운영 규칙 |
| `skills/` | 실행 스킬 26종 + 운영 프로토콜 + 템플릿 |
| `skills/engineering/operating-protocol.md` | 모든 규칙의 근간 (아키텍처/품질/보안/Git) |
| `skills/engineering/feature-spec-template.md` | 새 기능 시작 시 복사해 쓰는 명세서 양식 |
| `scripts/audit-skills.mjs` | 스킬 정합성 자동 감사 (`npm run skills:audit`) |

## 시작하기

새 기능은 코드부터 짜지 않는다. `skills/engineering/feature-spec-template.md`를 복사해 **명세서.md** 작성부터 시작한다.

표준 워크플로우: `IRESEARCH → IPLAN → (검토) → IEXEC → ICODE → IDOCS → IGIT`

## 스킬 감사

```bash
npm run skills:audit
```
