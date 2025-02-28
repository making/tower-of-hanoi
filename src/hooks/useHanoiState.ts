import { useEffect, useRef, useState } from 'react';
import { Disk, HanoiMove } from '../types';
import { generateMoves } from '../utils/algorithm';

export function useHanoiState(initialDisks: number) {
  const [numDisks, setNumDisks] = useState(initialDisks);
  const [disks, setDisks] = useState<Disk[]>(() => {
    return Array.from({ length: initialDisks }, (_, i) => ({
      id: i,
      size: i,
      peg: 0,
    })).reverse();
  });

  const [moves, setMoves] = useState<HanoiMove[]>([]);
  const moveIndexRef = useRef(0);
  const animatingRef = useRef(false);

  useEffect(() => {
    const newDisks = Array.from({ length: numDisks }, (_, i) => ({
      id: i,
      size: i,
      peg: 0,
    })).reverse();
    setDisks(newDisks);
    setMoves([]);
    moveIndexRef.current = 0;
    animatingRef.current = false;
  }, [numDisks]);

  function solveHanoi() {
    if (animatingRef.current) return;
    const seq = generateMoves(numDisks, 0, 2, 1);
    setMoves(seq);
    moveIndexRef.current = 0;
    animatingRef.current = true;
  }

  useEffect(() => {
    if (!animatingRef.current || moves.length === 0) return;

    if (moveIndexRef.current >= moves.length) {
      animatingRef.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const [_, fromPeg, toPeg] = moves[moveIndexRef.current];
      const pegDisks = disks.filter(d => d.peg === fromPeg).sort((a, b) => b.id - a.id);
      const topDisk = pegDisks[pegDisks.length - 1];
      if (!topDisk) {
        console.log('No disk found on peg', fromPeg);
        return;
      }

      const updatedDisks = disks.map(d => (d.id === topDisk.id ? { ...d, peg: toPeg } : d));
      setDisks(updatedDisks);
      moveIndexRef.current += 1;
    }, 700);

    return () => clearTimeout(timer);
  }, [moves, disks]);

  return {
    disks,
    numDisks,
    setNumDisks,
    solveHanoi,
  };
}
