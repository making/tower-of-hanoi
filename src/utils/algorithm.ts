import { HanoiMove } from '../types';

/**
 * Generates a sequence of moves to solve the Tower of Hanoi puzzle
 * @param numDisks - Number of disks to move
 * @param fromPeg - Source peg number (0,1,2)
 * @param toPeg - Destination peg number (0,1,2)
 * @param auxPeg - Auxiliary peg number (0,1,2)
 * @returns Array of moves, where each move is [diskId, fromPeg, toPeg]
 */
export function generateMoves(
  numDisks: number,
  fromPeg: number,
  toPeg: number,
  auxPeg: number
): HanoiMove[] {
  const moves: HanoiMove[] = [];

  function move(n: number, source: number, target: number, auxiliary: number) {
    if (n === 1) {
      moves.push([n - 1, source, target]);
    } else {
      move(n - 1, source, auxiliary, target);
      moves.push([n - 1, source, target]);
      move(n - 1, auxiliary, target, source);
    }
  }

  move(numDisks, fromPeg, toPeg, auxPeg);
  return moves;
}
