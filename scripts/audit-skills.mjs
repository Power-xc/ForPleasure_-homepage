#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const skillsDir = path.join(root, 'skills');
const readmePath = path.join(skillsDir, 'README.md');
const requiredMetadataFields = [
  'skill_id',
  'skill_name',
  'owner',
  'tier',
  'trigger_type',
  'dependencies',
  'last_updated',
];

const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function listMarkdownFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return listMarkdownFiles(fullPath);
    return entry.isFile() && entry.name.endsWith('.md') ? [fullPath] : [];
  });
}

function parseReadmeSkills() {
  const readme = read(readmePath);
  const skillRows = [];
  const tableLinkPattern = /\| \[([^\]]+)\]\(([^)]+)\) \| `([^`]+)` \|/g;
  let match;

  while ((match = tableLinkPattern.exec(readme)) !== null) {
    skillRows.push({
      name: match[1],
      relativePath: match[2],
      skillId: match[3],
      fullPath: path.join(skillsDir, match[2]),
    });
  }

  return skillRows;
}

function extractRegistryMetadata(content, relativePath) {
  const match = content.match(/## Registry Metadata\s*```json\s*([\s\S]*?)\s*```/);
  if (!match) {
    fail(`${relativePath}: Registry Metadata block missing`);
    return null;
  }

  try {
    return JSON.parse(match[1]);
  } catch (error) {
    fail(`${relativePath}: Registry Metadata is not valid JSON (${error.message})`);
    return null;
  }
}

function countCodeFences(content) {
  return (content.match(/```/g) || []).length;
}

const skillRows = parseReadmeSkills();
const knownIds = new Set(skillRows.map((row) => row.skillId));
const seenIds = new Set();

if (skillRows.length !== 26) {
  fail(`skills/README.md: expected 26 executable skills, found ${skillRows.length}`);
}

for (const row of skillRows) {
  const relativePath = path.relative(root, row.fullPath);
  if (!fs.existsSync(row.fullPath)) {
    fail(`${relativePath}: README entry points to a missing file`);
    continue;
  }

  const content = read(row.fullPath);
  const fenceCount = countCodeFences(content);
  if (fenceCount % 2 !== 0) {
    fail(`${relativePath}: unbalanced Markdown code fences (${fenceCount})`);
  }

  if (!content.includes('Skill ID')) {
    fail(`${relativePath}: Skill ID section missing`);
  }

  if (!content.includes('> **Tier:**')) {
    fail(`${relativePath}: Tier declaration missing`);
  }

  const hasGateSection =
    content.includes('## Hard Gates') ||
    content.includes('## 성공 기준') ||
    content.includes('### HARD GATE');
  if (!hasGateSection) {
    fail(`${relativePath}: Hard Gates or Success Criteria section missing`);
  }

  const metadata = extractRegistryMetadata(content, relativePath);
  if (!metadata) continue;

  for (const field of requiredMetadataFields) {
    if (!(field in metadata)) {
      fail(`${relativePath}: metadata.${field} missing`);
    }
  }

  if (metadata.skill_id !== row.skillId) {
    fail(`${relativePath}: README ID ${row.skillId} != metadata.skill_id ${metadata.skill_id}`);
  }

  if (seenIds.has(metadata.skill_id)) {
    fail(`${relativePath}: duplicate skill_id ${metadata.skill_id}`);
  }
  seenIds.add(metadata.skill_id);

  if (!Array.isArray(metadata.dependencies)) {
    fail(`${relativePath}: metadata.dependencies must be an array`);
  } else {
    for (const dependency of metadata.dependencies) {
      if (!knownIds.has(dependency)) {
        fail(`${relativePath}: unknown dependency "${dependency}"`);
      }
    }
  }

  if (typeof metadata.tier !== 'string') {
    fail(`${relativePath}: metadata.tier must be a string`);
  }

  if (!['1', '2'].includes(metadata.tier)) {
    fail(`${relativePath}: metadata.tier must be "1" or "2"`);
  }

  if (content.includes('## Hard Gates') && !content.includes('## Soft Findings')) {
    warn(`${relativePath}: Hard Gates present without Soft Findings`);
  }
}

for (const markdownFile of listMarkdownFiles(skillsDir)) {
  const relativePath = path.relative(root, markdownFile);
  const content = read(markdownFile);
  const fenceCount = countCodeFences(content);
  if (fenceCount % 2 !== 0) {
    fail(`${relativePath}: unbalanced Markdown code fences (${fenceCount})`);
  }
}

if (warnings.length > 0) {
  console.log('Skill audit warnings:');
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (errors.length > 0) {
  console.error('Skill audit failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Skill audit passed: ${skillRows.length} executable skills validated.`);
