// Named imports (not `import * as THREE`) so Rollup can tree-shake the
// unused 90%+ of three.js out of the production bundle.
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points,
  IcosahedronGeometry,
  MeshBasicMaterial,
  Mesh,
  Color,
  NormalBlending,
  AdditiveBlending,
} from 'three';

// Section theme colors the particle field lerps between as the user scrolls,
// one palette per site theme (additive blending needs brighter colors on
// dark, normal blending needs darker/more saturated colors on light).
const PALETTES = {
  light: {
    blending: NormalBlending,
    particleOpacity: 0.55,
    shapeOpacity: 0.1,
    colors: [
      '#b5632c', // hero — terracotta
      '#6b7c3f', // about — olive
      '#a4462c', // experience — clay
      '#c98a2b', // skills/projects — ochre
      '#8c7a5e', // exploring/contact — sand
    ],
  },
  dark: {
    blending: AdditiveBlending,
    particleOpacity: 0.85,
    shapeOpacity: 0.12,
    colors: [
      '#e0954f', // hero — warm amber
      '#9caf6b', // about — sage
      '#d97a53', // experience — terracotta glow
      '#e0b354', // skills/projects — mustard gold
      '#c9b38a', // exploring/contact — warm sand
    ],
  },
};

function buildThemeColors(palette) {
  return palette.colors.map((c) => new Color(c));
}

export function initScene(canvas, initialTheme = 'light') {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: 'high-performance',
    // The scene only renders on demand (see animate() below) — without this
    // the browser clears the canvas after every composite, so any frame we
    // skip would flash blank instead of holding the last drawn image.
    preserveDrawingBuffer: true,
    // mediump runs roughly 2x faster than the default highp on mobile GPUs,
    // and our flat-shaded, unlit particles/wireframes have no need for the
    // extra precision.
    precision: 'mediump',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new Scene();
  const camera = new PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 8;

  // Particle field
  const PARTICLE_COUNT = window.innerWidth < 768 ? 450 : 1100;
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const spread = 18;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));

  const material = new PointsMaterial({
    size: 0.045,
    color: '#000000',
    transparent: true,
    depthWrite: false,
  });
  const points = new Points(geometry, material);
  scene.add(points);

  // A few large soft wireframe icosahedrons drifting in the background for
  // depth. They always share the same color and opacity (set together in
  // applyThemeStyle/animate below), so one material serves all three meshes
  // instead of three separate instances doing identical per-frame updates.
  const shapeMaterial = new MeshBasicMaterial({
    color: '#000000',
    wireframe: true,
    transparent: true,
  });
  const shapes = [];
  for (let i = 0; i < 3; i++) {
    const geo = new IcosahedronGeometry(1.4 + i * 0.6, 1);
    const mesh = new Mesh(geo, shapeMaterial);
    mesh.position.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 6,
      -4 - i * 2
    );
    scene.add(mesh);
    shapes.push(mesh);
  }

  let themeName = initialTheme;
  let themeColors = buildThemeColors(PALETTES[themeName]);
  let needsRender = true;
  function applyThemeStyle() {
    const palette = PALETTES[themeName];
    material.blending = palette.blending;
    material.opacity = palette.particleOpacity;
    material.needsUpdate = true;
    shapeMaterial.opacity = palette.shapeOpacity;
  }
  applyThemeStyle();

  function setTheme(name) {
    if (!PALETTES[name] || name === themeName) return;
    themeName = name;
    themeColors = buildThemeColors(PALETTES[themeName]);
    applyThemeStyle();
    needsRender = true;
  }

  // The scene is otherwise fully idle: no clock-driven rotation, nothing
  // animates on its own. It only moves in response to the cursor (eased
  // toward the pointer position) or the scroll position (color only), and
  // the render loop below stops drawing entirely once the cursor has
  // settled — so a motionless mouse and a still page mean zero rendering
  // cost.
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      needsRender = true;
    },
    { passive: true }
  );

  // The scroll-driven color renders every frame scrollProgress actually
  // changes (main.js already coalesces raw scroll events to one update per
  // animation frame), tracking the scroll position directly with no easing.
  let scrollProgress = 0;
  function setScrollProgress(p) {
    if (p !== scrollProgress) needsRender = true;
    scrollProgress = p;
  }

  const tmpColor = new Color();
  function currentThemeColor(p) {
    const scaled = p * (themeColors.length - 1);
    const idx = Math.min(Math.floor(scaled), themeColors.length - 2);
    const t = scaled - idx;
    return tmpColor.copy(themeColors[idx]).lerp(themeColors[idx + 1], t);
  }

  // Mobile browsers collapse/expand their address bar as you scroll, which
  // changes window.innerHeight and fires 'resize' — but the viewport hasn't
  // actually changed size, so reacting to it (re-fitting the camera, resizing
  // the renderer) made the background visibly zoom during that scroll. Only
  // an actual width change (real resize or orientation change) should
  // re-fit the scene.
  let lastWidth = window.innerWidth;
  function onResize() {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    needsRender = true;
  }
  window.addEventListener('resize', onResize);

  // A lost WebGL context (GPU driver reset, mobile memory pressure) would
  // otherwise leave the background permanently blank — allow the browser to
  // restore it, and force a fresh render once it does since our on-demand
  // loop has no other reason to know the old frame is gone.
  canvas.addEventListener('webglcontextlost', (e) => e.preventDefault());
  canvas.addEventListener('webglcontextrestored', () => {
    needsRender = true;
  });

  const EPSILON = 0.0008;
  function animate() {
    if (!needsRender) {
      requestAnimationFrame(animate);
      return;
    }

    pointer.x += (pointer.targetX - pointer.x) * 0.04;
    pointer.y += (pointer.targetY - pointer.y) * 0.04;

    points.rotation.y = pointer.x * 0.15;
    points.rotation.x = pointer.y * 0.1;
    shapes.forEach((mesh, i) => {
      mesh.rotation.y = pointer.x * 0.08 * (i + 1);
      mesh.rotation.x = pointer.y * 0.05 * (i + 1);
    });

    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.03;
    camera.position.y += (-pointer.y * 0.4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    // Direct assignment, not eased — the color should track scroll position
    // exactly and immediately, so it reads as a bold, drastic shift rather
    // than a lagging fade.
    const color = currentThemeColor(scrollProgress);
    material.color.copy(color);
    shapeMaterial.color.copy(color);

    renderer.render(scene, camera);

    const pointerSettled =
      Math.abs(pointer.x - pointer.targetX) < EPSILON &&
      Math.abs(pointer.y - pointer.targetY) < EPSILON;
    needsRender = !pointerSettled;

    requestAnimationFrame(animate);
  }
  animate();

  return { setScrollProgress, setTheme };
}
