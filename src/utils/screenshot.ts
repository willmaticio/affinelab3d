import { WebGLRenderer, Scene, Camera } from 'three';

/**
 * Utility to save the current canvas view as a PNG file
 */
export function saveScreenshot(renderer: WebGLRenderer & { scene: Scene; camera: Camera }): void {
  // Force a render to ensure we capture the current state
  renderer.render(renderer.scene, renderer.camera);
  
  // Get the canvas element
  const canvas = renderer.domElement;
  
  try {
    // Convert the canvas to a data URL
    const dataURL = canvas.toDataURL('image/png');
    
    // Create a download link
    const link = document.createElement('a');
    link.download = `affinelab-screenshot-${new Date().toISOString()}.png`;
    link.href = dataURL;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error saving screenshot:', error);
  }
}