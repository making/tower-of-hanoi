import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Disk } from '../../types';
import { DiskMesh } from './DiskMesh';
import { Peg } from './Peg';
import { Ground } from './Ground';
import { useHanoiState } from '../../hooks/useHanoiState';

export function Hanoi3DView() {
  const {
    disks: disks3D,
    numDisks: numDisks3D,
    setNumDisks: setNumDisks3D,
    solveHanoi: solveHanoi3D,
  }: { disks: Disk[]; numDisks: number; setNumDisks: (n: number) => void; solveHanoi: () => void } = useHanoiState(4);

  const pegXPositions = [-2, 0, 2];

  // Calculate each disk's 3D position
  const diskPositions = disks3D.map(disk => {
    const pegDisks = disks3D.filter(d => d.peg === disk.peg).sort((a, b) => b.id - a.id);

    const indexOfDisk = pegDisks.findIndex(d => d.id === disk.id);
    const y = 0.12 + indexOfDisk * 0.22;
    const x = pegXPositions[disk.peg];
    return [x, y, 0] as [number, number, number];
  });

  return (
    <div className="mb-8">
      <h2 className="text-xl mb-2">Tower of Hanoi (3D)</h2>
      <div className="flex items-center gap-2 mb-4">
        <label className="mr-2">Number of disks:</label>
        <input
          type="number"
          value={numDisks3D}
          onChange={e => {
            const val = parseInt(e.target.value);
            if (val > 0 && val <= 8) {
              setNumDisks3D(val);
            }
          }}
          className="border rounded p-1 w-16"
        />
        <button
          onClick={solveHanoi3D}
          className="bg-blue-500 text-white px-3 py-1 rounded-2xl shadow hover:bg-blue-600"
        >
          Solve
        </button>
      </div>
      <motion.div layout className="rounded-2xl shadow-lg w-full h-96">
        <Canvas shadows camera={{ position: [0, 3, 7], fov: 50 }} className="rounded-2xl">
          <ambientLight intensity={0.5} />
          <directionalLight
            castShadow
            intensity={0.8}
            position={[5, 10, 5]}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <Ground />
          <Peg x={-2} />
          <Peg x={0} />
          <Peg x={2} />
          {disks3D.map((disk, i) => (
            <DiskMesh key={disk.id} disk={disk} position={diskPositions[i]} />
          ))}
          <OrbitControls />
        </Canvas>
      </motion.div>
    </div>
  );
}
