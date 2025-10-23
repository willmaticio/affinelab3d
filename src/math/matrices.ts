import { Matrix4, Vector3 } from 'three';

// Note: We use column-major matrices (standard in computer graphics)
// and column vectors. This means:
// 1. Transformations are applied right-to-left
// 2. Vectors are multiplied on the right: M * v
// This matches three.js conventions

export function makeTranslation(tx: number, ty: number, tz: number): Matrix4 {
  return new Matrix4().makeTranslation(tx, ty, tz);
}

export function makeScale(sx: number, sy: number, sz: number): Matrix4 {
  return new Matrix4().makeScale(sx, sy, sz);
}

export function makeRotationX(degrees: number): Matrix4 {
  return new Matrix4().makeRotationX(degrees * Math.PI / 180);
}

export function makeRotationY(degrees: number): Matrix4 {
  return new Matrix4().makeRotationY(degrees * Math.PI / 180);
}

export function makeRotationZ(degrees: number): Matrix4 {
  return new Matrix4().makeRotationZ(degrees * Math.PI / 180);
}

export function makeShear(shXY: number, shXZ: number, 
                         shYX: number, shYZ: number,
                         shZX: number, shZY: number): Matrix4 {
  // Shear matrix using the convention:
  // - shXY: X sheared along Y axis
  // - shXZ: X sheared along Z axis
  // - etc.
  return new Matrix4().set(
    1,    shYX, shZX, 0,
    shXY, 1,    shZY, 0,
    shXZ, shYZ, 1,    0,
    0,    0,    0,    1
  );
}

export type TransformType = 'T' | 'R' | 'S' | 'Sh' | 'X' | 'Y' | 'Z';

export function compose(orderArray: TransformType[], 
                       transforms: {
                         [key in TransformType]?: Matrix4
                       }): Matrix4 {
  const result = new Matrix4();
  
  // Apply transforms in specified order (right to left)
  orderArray.forEach(type => {
    const transform = transforms[type];
    if (transform) {
      result.multiply(transform);
    }
  });
  
  return result;
}

export function isOrthonormal(matrix: Matrix4, tolerance = 1e-6): boolean {
  // Extract the 3x3 rotation part
  const elements = matrix.elements;
  const cols = [
    new Vector3(elements[0], elements[1], elements[2]),
    new Vector3(elements[4], elements[5], elements[6]),
    new Vector3(elements[8], elements[9], elements[10])
  ];
  
  // Check unit length
  for (const col of cols) {
    if (Math.abs(col.length() - 1) > tolerance) {
      return false;
    }
  }
  
  // Check orthogonality
  for (let i = 0; i < 3; i++) {
    for (let j = i + 1; j < 3; j++) {
      if (Math.abs(cols[i].dot(cols[j])) > tolerance) {
        return false;
      }
    }
  }
  
  return true;
}