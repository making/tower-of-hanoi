/**
 * Types for the Tower of Hanoi application
 */

export interface Disk {
  id: number;
  size: number; // Larger means bigger radius.
  peg: number; // Which peg the disk is on (0,1,2)
}

export type HanoiMove = [number, number, number];
