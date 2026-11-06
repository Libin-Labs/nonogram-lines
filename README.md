# @lp-labs/nonogram-lines

Bounded nonogram line candidates, run extraction and consensus.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/nonogram-lines
```

## Working example

```js
import { nonogramCandidates, nonogramConsensus } from '@lp-labs/nonogram-lines';
if (nonogramConsensus(nonogramCandidates(3, [2])).join() !== '-1,1,-1') throw new Error('Nonogram');
```

CommonJS: `const api = require('@lp-labs/nonogram-lines')`.

## Behavior, customization and limits

lineRuns(binary) extracts positive run lengths from0/1 arrays length<=10000. nonogramCandidates(length,clues,maxResults=10000) enumerates binary lines in leftmost-placement order, length0..64, positive integer clues<=64, <=32 clues; at least one blank between runs, impossible clues return[]. Result budget1..100000 throws (no partial return). nonogramConsensus requires1..100000 equally sized binary candidates<=64, returns0/1 if agreed or -1 unknown. Exponential enumeration bounded by output count, depth<=32, no complete puzzle solver.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function lineRuns(line: readonly number[]): number[];
export declare function nonogramCandidates(
  length: number,
  clues: readonly number[],
  maxResults?: number,
): number[][];
export declare function nonogramConsensus(candidates: readonly (readonly number[])[]): number[];
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
