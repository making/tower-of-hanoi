import { describe, it, expect } from 'vitest';
import { generateMoves } from '../utils/algorithm';
import { HanoiMove } from '../types';

describe('Tower of Hanoi Algorithm', () => {
  it('should handle single disk correctly', () => {
    const moves = generateMoves(1, 0, 2, 1);
    expect(moves).toEqual([[0, 0, 2]]);
  });

  it('should handle two disks correctly', () => {
    const moves = generateMoves(2, 0, 2, 1);
    expect(moves).toEqual([
      [0, 0, 1],
      [1, 0, 2],
      [0, 1, 2],
    ]);
  });

  it('should handle three disks correctly', () => {
    const moves = generateMoves(3, 0, 2, 1);
    expect(moves).toEqual([
      [0, 0, 2],
      [1, 0, 1],
      [0, 2, 1],
      [2, 0, 2],
      [0, 1, 0],
      [1, 1, 2],
      [0, 0, 2],
    ]);
  });

  it('should generate correct number of moves for different disk counts', () => {
    // For n disks, optimal solution requires 2^n - 1 moves
    const testCases = [1, 2, 3, 4, 5];
    testCases.forEach(diskCount => {
      const moves = generateMoves(diskCount, 0, 2, 1);
      expect(moves.length).toBe(Math.pow(2, diskCount) - 1);
    });
  });

  it('should handle different peg configurations', () => {
    const moves = generateMoves(2, 1, 2, 0);
    expect(moves).toEqual([
      [0, 1, 0],
      [1, 1, 2],
      [0, 0, 2],
    ]);
  });

  it('should ensure all moves are valid', () => {
    const moves = generateMoves(3, 0, 2, 1);
    moves.forEach((move: HanoiMove) => {
      const [diskId, fromPeg, toPeg] = move;
      expect(diskId).toBeGreaterThanOrEqual(0);
      expect(fromPeg).toBeGreaterThanOrEqual(0);
      expect(fromPeg).toBeLessThan(3);
      expect(toPeg).toBeGreaterThanOrEqual(0);
      expect(toPeg).toBeLessThan(3);
      expect(fromPeg).not.toBe(toPeg);
    });
  });
});
