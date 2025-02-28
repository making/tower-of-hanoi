interface PegProps {
  x: number;
}

export function Peg({ x }: PegProps) {
  return (
    <mesh position={[x, 0.5, 0]} receiveShadow castShadow>
      <cylinderGeometry args={[0.1, 0.1, 2, 16]} />
      <meshStandardMaterial color="#888" />
    </mesh>
  );
}
