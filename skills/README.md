# IPAI Skill Library

> **Version:** 2.0.0 | **Last updated:** 2026-04 | **Owner:** IPAI (Intent Product AI)
>
> Full AI-agent operating standard → [engineering/operating-protocol.md](engineering/operating-protocol.md)

---

## Overview

- **Executable skills:** 26
- **Docs / templates:** 5 (`README.md`, `SKILL_TEMPLATE.md`, `OPERATING_LOOP.md`, `engineering/operating-protocol.md`, `engineering/feature-spec-template.md`)
- **Audit ledger:** [AUDIT.md](AUDIT.md)
- **Operating loop:** [OPERATING_LOOP.md](OPERATING_LOOP.md)
- **Standard:** every executable skill follows [SKILL_TEMPLATE.md](SKILL_TEMPLATE.md) — keeping `Skill ID`, `Tier`, `Trigger`, `Input/Output Schema`, `Hard Gates`, `Skill Chaining`, and a bottom JSON metadata block (`skill_id`, `skill_name`, `owner`, `tier`, `trigger_type`, `dependencies`, `last_updated`).
- **Automated audit:** `npm run skills:audit`

---

## Product `[PROD]`

| Skill | ID | Description | Tier |
|-------|----|-------------|------|
| [Brand Identity](product/brand-identity.md) | `brand` | Design guidelines → Tailwind/CSS design tokens | 1 |
| [Motion Director](product/motion-director.md) | `motion` | Script → cut/caption/BGM timeline generation | 1 |
| [UI Component Builder](product/ui-component-builder.md) | `ui` | Token-driven TSX components from the design system | 2 |

## Engineering `[ENG]`

| Skill | ID | Description | Tier |
|-------|----|-------------|------|
| [Code Architect](engineering/code-architect.md) | `code` | SPEC.md → FSD boilerplate generation + code audit | 2 |
| [Edge-case Hunter](engineering/edge-case-hunter.md) | `edge` | Spec/code → exception test scenarios | 1 |
| [Error Resolver](engineering/error-resolver.md) | `catcher` | Workspace-isolated error tracing and fix proposals | 2 |
| [Database Architect](engineering/database-architect.md) | `db` | Cross-checks schema changes across the monorepo | 2 |
| [QA Blind Test](engineering/qa-blind-test.md) | `qa` | Browser-agent UI/UX defect discovery | 2 |

## Security `[SEC]`

| Skill | ID | Description | Tier |
|-------|----|-------------|------|
| [System Security](security/system-security.md) | `sys-sec` | Codebase review, RLS DB security, one-click rollback | 2 |
| [Infrastructure Defense](security/infrastructure-defense.md) | `infra-sec` | Deploy config (CSP), WAF, rate limiting, monitoring | 2 |
| [AI Defender](security/ai-defender.md) | `ai-sec` | Prompt-injection defense + external-content sandboxing | 2 |

## Growth `[GROWTH]`

| Skill | ID | Description | Tier |
|-------|----|-------------|------|
| [Viral Script](growth/viral-script.md) | `viral` | Live trends → short-form script A/B variants | 1 |
| [B2B Proposal](growth/b2b-proposal.md) | `b2b` | Company URL → analysis report + tailored proposal | 2 |
| [Marketing Funnel](growth/marketing-funnel.md) | `funnel` | AIDA × TOFU/MOFU/BOFU bottleneck diagnosis | 1 |
| [Marketing Strategy](growth/marketing-strategy.md) | `strategy` | 3C → SWOT → STP → 4P strategy build | 2 |
| [Copywriting](growth/copywriting.md) | `copy` | Landing/ad/hook/persona copy full set | 1 |
| [VOC Analysis](growth/voc-analysis.md) | `voc` | Reviews → keywords, ad headlines, social proof | 1 |
| [Objection Handling](growth/objection-handling.md) | `objection` | Copy for the 3 core objections (price/need/timing) | 1 |
| [Email Sequence](growth/email-sequence.md) | `email` | 7-step onboarding / 4-step re-purchase sequences | 1 |
| [Launch Planner](growth/launch-planner.md) | `launch` | D-30 content calendar + segment retargeting copy | 2 |
| [Content Writing](growth/content-writing.md) | `content-write` | Expert-persona SEO blog, storytelling, titles | 1 |
| [Content Repackaging](growth/content-repackaging.md) | `content-repackage` | 5-channel repurposing, rewrite, critique, summaries | 1 |

## Operations `[OPS]`

| Skill | ID | Description | Tier |
|-------|----|-------------|------|
| [Insight Generator](operations/insight-generator.md) | `insight` | Cross-team data → daily morning report + 3 decisions | 1 |
| [Token Watchdog](operations/token-watchdog.md) | `token` | Real-time API cost tracking + budget kill-switch | 1 |
| [Claude Cost Optimizer](operations/claude-cost-optimizer.md) | `claude-optimize` | settings.json tuning to cut Claude Code cost up to 80% | 1 |
| [Issue Tracker](operations/issue-tracker.md) | `task` | Central Notion kanban auto-update + portfolio view | 1 |

---

## Docs & Templates

| File | Type | Description |
|------|------|-------------|
| [README.md](README.md) | Index | Source of truth for the skill list and chaining summary |
| [SKILL_TEMPLATE.md](SKILL_TEMPLATE.md) | Template | Baseline for creating/standardizing executable skills |
| [OPERATING_LOOP.md](OPERATING_LOOP.md) | Protocol | `token → insight → task → skill improvement` feedback loop |
| [engineering/operating-protocol.md](engineering/operating-protocol.md) | Protocol | AI-agent operating standard, skill chaining, architecture |
| [engineering/feature-spec-template.md](engineering/feature-spec-template.md) | Template | Spec template to copy when starting a new feature |

---

## Skill Chaining Summary

```
YouTube automation:  viral → motion → Remotion → ElevenLabs → social upload → token → insight
B2B sales:           b2b → brand → ui → outreach → token
New service build:   code → edge → sys-sec → TestSprite (external QA) → brand → ui → token
Pre-deploy security: sys-sec → ai-sec → infra-sec → (halt on Critical) → code → deploy
Ops reporting:       token → insight → task → skill improvement
```
