import { describe, expect, test } from 'vitest';
import { Matrix4, Vector3 } from 'three';
import {
  makeTranslation,
  makeScale,
  makeRotationX,
  makeRotationY,
  makeRotationZ,
  makeShear,
  compose,
  isOrthonormal
} from '../src/math/matrices';

describe('Matrix Utilities', () => {
  test('translation matrix correctly transforms points', () => {
    const tx = 1, ty = 2, tz = 3;
    const matrix = makeTranslation(tx, ty, tz);
    const point = new Vector3(0, 0, 0);
    point.applyMatrix4(matrix);
    
    expect(point.x).toBeCloseTo(tx);
    expect(point.y).toBeCloseTo(ty);
    expect(point.z).toBeCloseTo(tz);
  });

  test('scale matrix correctly transforms vectors', () => {
    const sx = 2, sy = 3, sz = 4;
    const matrix = makeScale(sx, sy, sz);
    const vector = new Vector3(1, 1, 1);
    vector.applyMatrix4(matrix);
    
    expect(vector.x).toBeCloseTo(sx);
    expect(vector.y).toBeCloseTo(sy);
    expect(vector.z).toBeCloseTo(sz);
  });

  test('rotation matrices are orthonormal', () => {
    const angles = [0, 45, 90, 180, 270, 360];
    for (const angle of angles) {
      expect(isOrthonormal(makeRotationX(angle))).toBe(true);
      expect(isOrthonormal(makeRotationY(angle))).toBe(true);
      expect(isOrthonormal(makeRotationZ(angle))).toBe(true);
    }
  });

  test('shear matrix behaves as documented', () => {
    const shXY = 1, shXZ = 0, shYX = 0;
    const shYZ = 0, shZX = 0, shZY = 0;
    const matrix = makeShear(shXY, shXZ, shYX, shYZ, shZX, shZY);
    const point = new Vector3(0, 1, 0);
    point.applyMatrix4(matrix);
    
    // X should be shifted by Y
    expect(point.x).toBeCloseTo(1); // because y=1 and shXY=1
    expect(point.y).toBeCloseTo(1);
    expect(point.z).toBeCloseTo(0);
  });

  test('transform order affects final position', () => {
    // Test Translate then Rotate vs Rotate then Translate
    const translation = makeTranslation(1, 0, 0);
    const rotation = makeRotationY(90); // 90 degrees about Y
    
    // T * R
    const translateFirst = compose(['T', 'R'], {
      T: translation,
      R: rotation
    });
    
    // R * T
    const rotateFirst = compose(['R', 'T'], {
      T: translation,
      R: rotation
    });
    
    const point = new Vector3(0, 0, 0);
    const pointTR = point.clone().applyMatrix4(translateFirst);
    const pointRT = point.clone().applyMatrix4(rotateFirst);
    
    // Results should be different
    expect(pointTR).not.toEqual(pointRT);
  });

  test('normalized scale preserves proportions', () => {
    const matrix = makeScale(2, 4, 6);
    const normalizedMatrix = makeScale(0.5, 1, 1.5); // divided by max=4
    
    const vector = new Vector3(1, 1, 1);
    const scaled = vector.clone().applyMatrix4(matrix);
    const normalizedScaled = vector.clone().applyMatrix4(normalizedMatrix);
    
    // Check proportions are the same
    const ratio1 = scaled.x / scaled.y;
    const ratio2 = normalizedScaled.x / normalizedScaled.y;
    expect(ratio1).toBeCloseTo(ratio2);
  });
});