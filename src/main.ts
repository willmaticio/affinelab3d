import { Scene } from './scene';
import { UI } from './ui';
import { createInitialState } from './state/store';
import * as primitives from './objects/primitives';
import './style.css';

// Expose a typed global for debugging. Avoids using `any` which ESLint flags.
declare global {
  interface Window {
    affineUI?: unknown;
  }
}

// Initialize the app when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Create container
  const container = document.createElement('div');
  container.id = 'scene-container';
  document.body.appendChild(container);

  // Create scene and UI
  const scene = new Scene(container);
  const state = createInitialState();
  
  // Create initial cube and add it to the scene
  const cube = primitives.createCube();
  scene.add(cube);
  state.activeObject = cube;

  // Create UI
  const ui = new UI(state, scene);
  // Expose for debugging
  window.affineUI = ui as unknown;

  // Animation loop
  function animate(): void {
    requestAnimationFrame(animate);
    scene.render();
  }
  animate();
});