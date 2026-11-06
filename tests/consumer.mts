import { nonogramCandidates, nonogramConsensus } from '@lp-labs/nonogram-lines';
if (nonogramConsensus(nonogramCandidates(3, [2])).join() !== '-1,1,-1') throw new Error('Nonogram');
// @ts-expect-error invalid argument must be rejected by declarations
nonogramCandidates(3, ['2']);
