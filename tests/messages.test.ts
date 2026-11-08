import { describe, expect, it } from 'vitest';
import es from '../messages/es.json';
import en from '../messages/en.json';

// Every key, array length and project id must match across languages.
function shape(v: unknown, path = ''): string[] {
  if (Array.isArray(v)) return [`${path}[${v.length}]`, ...v.flatMap((x, i) => shape(x, `${path}[${i}]`))];
  if (v && typeof v === 'object') return Object.entries(v).flatMap(([k, x]) => [`${path}.${k}`, ...shape(x, `${path}.${k}`)]);
  return [];
}

describe('messages', () => {
  it('es and en have the same keys and list lengths', () => {
    expect(shape(en)).toEqual(shape(es));
  });
  it('projects keep the same ids and palettes in both languages', () => {
    expect(en.work.projects.map((p) => p.id)).toEqual(es.work.projects.map((p) => p.id));
    expect(en.work.projects.map((p) => p.palette.map((c) => c[1]))).toEqual(es.work.projects.map((p) => p.palette.map((c) => c[1])));
  });
  it('every project is labelled as a concept with a fictional brand', () => {
    expect(es.work.badge).toMatch(/conceptual/i);
    expect(es.work.fictional).toMatch(/ficticia/i);
    expect(en.work.badge).toMatch(/concept/i);
  });
});
