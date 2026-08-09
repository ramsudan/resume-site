import * as THREE from 'three';

// Section theme colors the particle field lerps between as the user scrolls.
const THEMES = [
  new THREE.Color('#5eead4'), // hero — teal
  new THREE.Color('#818cf8'), // about — indigo
  new THREE.Color('#f472b6'), // experience — pink
  new THREE.Color('#fbbf24'), // skills/projects — amber
  new THREE.Color('#38bdf8'), // education/contact — sky
];

export function initScene(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 8;

  // Particle field
  const PARTICLE_COUNT = window.innerWidth < 768 ? 1200 : 3200;
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const spread = 18;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 0.045,
    color: THEMES[0],
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // A few large soft wireframe icosahedrons drifting in the background for depth.
  const shapes = [];
  for (let i = 0; i < 3; i++) {
    const geo = new THREE.IcosahedronGeometry(1.4 + i * 0.6, 1);
    const mat = new THREE.MeshBasicMaterial({
      color: THEMES[0],
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 6,
      -4 - i * 2
    );
    scene.add(mesh);
    shapes.push(mesh);
  }

  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  window.addEventListener('pointermove', (e) => {
    pointer.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    pointer.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  let scrollProgress = 0;
  function setScrollProgress(p) {
    scrollProgress = p;
  }

  function currentThemeColor(p) {
    const scaled = p * (THEMES.length - 1);
    const idx = Math.min(Math.floor(scaled), THEMES.length - 2);
    const t = scaled - idx;
    return THEMES[idx].clone().lerp(THEMES[idx + 1], t);
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onResize);

  const clock = new THREE.Clock();
  function animate() {
    const elapsed = clock.getElapsedTime();

    pointer.x += (pointer.targetX - pointer.x) * 0.04;
    pointer.y += (pointer.targetY - pointer.y) * 0.04;

    points.rotation.y = elapsed * 0.03 + pointer.x * 0.15;
    points.rotation.x = elapsed * 0.015 + pointer.y * 0.1;

    shapes.forEach((mesh, i) => {
      mesh.rotation.x = elapsed * 0.05 * (i + 1);
      mesh.rotation.y = elapsed * 0.03 * (i + 1);
    });

    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.03;
    camera.position.y += (-pointer.y * 0.4 - camera.position.y) * 0.03;
    camera.position.z = 8 - scrollProgress * 2;
    camera.lookAt(0, 0, 0);

    const color = currentThemeColor(scrollProgress);
    material.color.lerp(color, 0.05);
    shapes.forEach((mesh) => mesh.material.color.lerp(color, 0.05));

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  return { setScrollProgress };
}
