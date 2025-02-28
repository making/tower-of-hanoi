# Tower of Hanoi

An interactive Tower of Hanoi puzzle implementation featuring both 3D and text-based visualizations. Experience the classic puzzle-solving challenge with a modern twist, combining beautiful 3D graphics with a traditional ASCII art display.

## Live Demo

You can try the live demo of this application at: https://making.github.io/tower-of-hanoi/

The demo is automatically deployed to GitHub Pages whenever changes are pushed to the main branch.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/making/tower-of-hanoi.git
   cd tower-of-hanoi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Adjust Disk Count**
   - Use the number input to set the desired number of disks (1-8)
   - Both views will update automatically

2. **Solve Automatically**
   - Click the "Solve" button to watch the automatic solution
   - The solution will be animated in both 3D and text views

3. **3D View Controls**
   - Left click and drag to rotate the view
   - Right click and drag to pan
   - Scroll to zoom in/out

## Development

- Run tests: `npm test`
- Build for production: `npm run build`
- Format code: `npm run format`
- Lint code: `npm run lint`
