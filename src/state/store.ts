// This file contains TypeScript definitions and interfaces for the application state.
import { Object3D } from 'three';

export type TransformOrder = 'SRST' | 'TRS' | 'RTS' | 'STR';

export interface TransformParams {
  // Translation
  tx: number;
  ty: number;
  tz: number;
  
  // Rotation (degrees)
  rx: number;
  ry: number;
  rz: number;
  
  // Scale
  sx: number;
  sy: number;
  sz: number;
  
  // Shear
  shXY: number;
  shXZ: number;
  shYX: number;
  shYZ: number;
  shZX: number;
  shZY: number;
}

export interface DisplayParams {
  showGrid: boolean;
  showLocalAxes: boolean;
  showBoundingBox: boolean;
  normalizeScale: boolean;
}

export interface AppState {
  transform: TransformParams;
  transformOrder: TransformOrder;
  display: DisplayParams;
  activeObject: Object3D | null;
}

const initialTransform: TransformParams = {
  tx: 0, ty: 0, tz: 0,
  rx: 0, ry: 0, rz: 0,
  sx: 1, sy: 1, sz: 1,
  shXY: 0, shXZ: 0, shYX: 0,
  shYZ: 0, shZX: 0, shZY: 0
};

const initialDisplay: DisplayParams = {
  showGrid: true,
  showLocalAxes: true,
  showBoundingBox: false,
  normalizeScale: false
};

export const createInitialState = (): AppState => ({
  transform: { ...initialTransform },
  transformOrder: 'TRS',
  display: { ...initialDisplay },
  activeObject: null
});