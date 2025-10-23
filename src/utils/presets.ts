/**
 * Save/load transform presets to/from JSON
 */
import { TransformParams, TransformOrder } from '../state/store';

export interface PresetData {
  transform: TransformParams;
  transformOrder: TransformOrder;
}

export function savePreset(data: PresetData): void {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = `affinelab-preset-${new Date().toISOString()}.json`;
    link.href = url;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error saving preset:', error);
  }
}

export function loadPreset(file: File): Promise<PresetData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event): void => {
      try {
        const jsonString = event.target?.result as string;
        const data = JSON.parse(jsonString) as PresetData;
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid preset file format'));
      }
    };
    
    reader.onerror = (): void => { reject(new Error('Error reading preset file')); };
    reader.readAsText(file);
  });
}