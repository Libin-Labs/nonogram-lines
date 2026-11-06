function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
export function lineRuns(line: readonly number[]): number[] {
  if (!Array.isArray(line) || line.length > 10000) throw new RangeError('Line length');
  const out: number[] = [];
  let run = 0;
  for (const x of line) {
    integer(x, 0, 1);
    if (x) run++;
    else if (run) {
      out.push(run);
      run = 0;
    }
  }
  if (run) out.push(run);
  return out;
}
export function nonogramCandidates(
  length: number,
  clues: readonly number[],
  maxResults = 10000,
): number[][] {
  integer(length, 0, 64);
  integer(maxResults, 1, 100000);
  if (!Array.isArray(clues) || clues.length > 32) throw new RangeError('Clue count');
  for (const c of clues) integer(c, 1, 64);
  const remaining: number[] = Array(clues.length + 1).fill(0);
  for (let i = clues.length - 1; i >= 0; i--)
    remaining[i] = clues[i]! + remaining[i + 1]! + (i + 1 < clues.length ? 1 : 0);
  const board: number[] = Array(length).fill(0),
    out: number[][] = [];
  function place(index: number, start: number): void {
    if (index === clues.length) {
      if (out.length >= maxResults) throw new RangeError('Candidate budget');
      out.push([...board]);
      return;
    }
    const size = clues[index]!;
    for (let p = start; p <= length - remaining[index]!; p++) {
      board.fill(1, p, p + size);
      place(index + 1, p + size + 1);
      board.fill(0, p, p + size);
    }
  }
  place(0, 0);
  return out;
}
export function nonogramConsensus(candidates: readonly (readonly number[])[]): number[] {
  if (!Array.isArray(candidates) || !candidates.length || candidates.length > 100000)
    throw new RangeError('Candidate count');
  const first = candidates[0];
  if (!Array.isArray(first) || first.length > 64) throw new RangeError('Line count');
  const out = [...first];
  for (const row of candidates) {
    if (!Array.isArray(row) || row.length !== first.length)
      throw new RangeError('Matching line lengths');
    for (let i = 0; i < row.length; i++) {
      integer(row[i]!, 0, 1);
      if (row[i] !== first[i]) out[i] = -1;
    }
  }
  return out;
}
