import * as THREE from 'three';

export function createCube(): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.8,
  });
  return new THREE.Mesh(geometry, material);
}

export function createSphere(): THREE.Mesh {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.8,
  });
  return new THREE.Mesh(geometry, material);
}

export function createPlane(): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide,
  });
  return new THREE.Mesh(geometry, material);
}

export function createCylinder(): THREE.Mesh {
  const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.8,
  });
  return new THREE.Mesh(geometry, material);
}

export function createTorus(): THREE.Mesh {
  const geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.8,
  });
  return new THREE.Mesh(geometry, material);
}

export function createLocalAxes(): THREE.Object3D {
  const axesHelper = new THREE.AxesHelper(1);
  const axes = new THREE.Object3D();
  axes.add(axesHelper);
  return axes;
}

export function createBoundingBox(object: THREE.Object3D): THREE.LineSegments {
  const box = new THREE.Box3().setFromObject(object);
  const geometry = new THREE.BoxGeometry(
    box.max.x - box.min.x,
    box.max.y - box.min.y,
    box.max.z - box.min.z
  );
  const edges = new THREE.EdgesGeometry(geometry);
  return new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0xffffff })
  );
}