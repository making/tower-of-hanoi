import { Disk } from '../../types';
import { useHanoiState } from '../../hooks/useHanoiState';

export function HanoiTextView() {
  const DISK_CHAR = '■';

  const {
    disks: disks2D,
    numDisks: numDisks2D,
    setNumDisks: setNumDisks2D,
    solveHanoi: solveHanoi2D,
  } = useHanoiState(4);

  // For each peg, gather ascending order disks
  const pegArrays = [0, 1, 2].map(peg =>
    disks2D.filter(d => d.peg === peg).sort((a, b) => a.id - b.id)
  );

  // We always want to show 'numDisks2D' lines for each peg
  const maxHeight = numDisks2D;

  // Disk width
  const maxSize = Math.max(0, ...disks2D.map(d => d.size));
  const maxSquares = (maxSize + 1) * 2;
  const fieldWidth = maxSquares + 1; // center bar

  function renderDiskLine(disk: Disk | undefined): string {
    if (!disk) {
      // no disk => show just the bar
      const leftCount = Math.floor(maxSquares / 2);
      const rightCount = maxSquares - leftCount;
      return ' '.repeat(leftCount) + '|' + ' '.repeat(rightCount);
    } else {
      const totalSquares = (disk.size + 1) * 2;
      const leftCount = Math.floor(totalSquares / 2);
      const rightCount = totalSquares - leftCount;
      const shape = DISK_CHAR.repeat(leftCount) + '|' + DISK_CHAR.repeat(rightCount);
      const shapeLen = shape.length;
      const padLeft = Math.floor((fieldWidth - shapeLen) / 2);
      const padRight = fieldWidth - shapeLen - padLeft;
      return ' '.repeat(padLeft) + shape + ' '.repeat(padRight);
    }
  }

  function renderPeg(pegIndex: number): string[] {
    const arr = pegArrays[pegIndex];
    const lines: string[] = [];

    // fill blank lines on top if this peg has fewer than maxHeight disks
    const blankCount = maxHeight - arr.length;
    for (let i = 0; i < blankCount; i++) {
      lines.push(renderDiskLine(undefined));
    }

    // then actual disks
    for (const disk of arr) {
      lines.push(renderDiskLine(disk));
    }

    return lines;
  }

  function renderAllPegs(): string {
    const allLines: string[] = [];

    for (let p = 0; p < 3; p++) {
      allLines.push(`Peg ${p}:`);
      allLines.push(...renderPeg(p));
      if (p < 2) {
        allLines.push('---------');
      }
    }

    return allLines.join('\n');
  }

  return (
    <div>
      <h2 className="text-xl mb-2">Tower of Hanoi (Text)</h2>
      <div className="flex items-center gap-2 mb-4">
        <label className="mr-2">Number of disks:</label>
        <input
          type="number"
          value={numDisks2D}
          onChange={e => {
            const val = parseInt(e.target.value);
            if (val > 0 && val <= 8) {
              setNumDisks2D(val);
            }
          }}
          className="border rounded p-1 w-16"
        />
        <button
          onClick={solveHanoi2D}
          className="bg-green-500 text-white px-3 py-1 rounded-2xl shadow hover:bg-green-600"
        >
          Solve
        </button>
      </div>
      <pre className="bg-gray-100 p-2 rounded shadow-inner whitespace-pre leading-none font-mono">
        {renderAllPegs()}
      </pre>
    </div>
  );
}
