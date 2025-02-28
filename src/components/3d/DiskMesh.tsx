import { Disk } from '../../types';

interface DiskMeshProps {
  disk: Disk;
  position: [number, number, number];
}

export function DiskMesh({ disk, position }: DiskMeshProps) {
  const colors = ['#e53935', '#8e24aa', '#3949ab', '#00897b', '#fdd835', '#fb8c00'];
  const color = colors[disk.id % colors.length] || '#ffffff';
  const radiusTop = 0.4 + disk.size * 0.12;
  const radiusBottom = 0.4 + disk.size * 0.12;
  const height = 0.2;

  return (
    <mesh position={position} castShadow>
      <cylinderGeometry args={[radiusTop, radiusBottom, height, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
