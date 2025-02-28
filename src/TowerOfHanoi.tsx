import { Hanoi3DView } from './components/3d/Hanoi3DView';
import { HanoiTextView } from './components/text/HanoiTextView';

export default function TowerOfHanoi() {
  return (
    <div className="p-4">
      <Hanoi3DView />
      <HanoiTextView />
    </div>
  );
}
