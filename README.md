# AffineLab 3D – Interactive Transformation Visualizer

An interactive, browser-based 3D tool for exploring linear algebra and 4×4 transformation matrices. Rotate, scale, shear, and translate 3D objects while seeing the live matrix computation and how transform order affects the result.

## Features

- **Interactive Transform Controls**
  - Translation (tx, ty, tz)
  - Rotation (rx, ry, rz in degrees)
  - Scale (sx, sy, sz)
  - Shear (shXY, shXZ, shYX, shYZ, shZX, shZY)
  - Configurable transform order
  - Reset transforms button
  - Save/Load transform presets

- **Live Math Display**
  - 4×4 homogeneous transformation matrix
  - Matrix composition formula
  - Transform order visualization
  - Local axes visualization

- **Scene Features**
  - Multiple 3D primitives (cube, sphere, plane, cylinder, torus)
  - Toggleable grid and local axes
  - Bounding box visualization
  - Scale normalization option
  - OrbitControls for camera navigation

- **Educational Presets**
  - Pure rotation (90° about Z)
  - Non-uniform scale + rotation
  - Pure shear example
  - Transform order comparison (Translate→Rotate vs. Rotate→Translate)

## Math Primer

### Homogeneous Coordinates
In computer graphics, we use 4×4 matrices to represent affine transformations. A point (x, y, z) becomes a 4D vector (x, y, z, 1), while a vector becomes (x, y, z, 0). This lets us represent both linear transformations and translations in a single matrix.

### Basic Transforms
- **Translation**: Move by (tx, ty, tz)
  ```
  │ 1  0  0  tx │
  │ 0  1  0  ty │
  │ 0  0  1  tz │
  │ 0  0  0  1  │
  ```

- **Scale**: Scale by (sx, sy, sz)
  ```
  │ sx  0   0   0 │
  │ 0   sy  0   0 │
  │ 0   0   sz  0 │
  │ 0   0   0   1 │
  ```

- **Rotation**: Rotate about X-axis by θ
  ```
  │ 1  0     0      0 │
  │ 0  cos θ -sin θ  0 │
  │ 0  sin θ  cos θ  0 │
  │ 0  0     0      1 │
  ```
  (Similar for Y and Z rotations)

### Transform Order
The order of matrix multiplication matters! For example:
- Rotate then Translate: T * R
- Translate then Rotate: R * T

This project uses column vectors and post-multiplication: v' = M * v

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open browser to localhost (see terminal for exact port)

## Usage Examples

1. **Compare Transform Order**
   - Click "Translate vs Rotate" preset
   - Toggle between TRS and RTS order
   - Observe how the final position changes

2. **Create Shear Effect**
   - Set all transforms to identity
   - Adjust shXY slider
   - Notice how vertical lines tilt while base stays fixed

3. **Export Current State**
   - Adjust transforms to desired state
   - Click "Save Preset" to download JSON
   - Use "Load Preset" to restore later

## Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run test`: Run Vitest tests
- `npm run lint`: Run ESLint
- `npm run format`: Format with Prettier

## Testing

Unit tests (Vitest) cover:
- Matrix utility functions
- Orthonormality of rotation matrices
- Transform order effects
- Shear matrix behavior

Run tests with:
```bash
npm test
```

## Screenshots

[Screenshot of UI with matrix panel - Coming soon]

## How This Demonstrates Linear Algebra

- **Matrix Composition**: See how different transform orders produce different results
- **Basis Transformation**: Watch how local axes change under transforms
- **Linear vs. Affine**: Compare how vectors and points transform differently
- **Homogeneous Coordinates**: Understand why we use 4×4 matrices
- **Shear Transforms**: Visualize less commonly understood transformations

## Roadmap

- Add quaternion rotation mode
- Implement eigen-decomposition visualization
- Add 2D mode for simpler examples
- Support for custom geometries
- Advanced matrix decomposition visualization

## License

MIT License - see LICENSE file

## Author

Created as an educational tool for exploring 3D transformations and linear algebra.