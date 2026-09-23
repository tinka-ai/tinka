"use client";

import { useEffect, useRef } from "react";
import { Unbounded, Manrope, IBM_Plex_Mono } from "next/font/google";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import T from "@/components/T";
import { useOfferModal } from "@/app/providers";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["500", "600", "800"],
  variable: "--font-unbounded",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

type ChipKey = "seo" | "geo" | "ai" | "analytics";

const CHIP_ANCHORS: { key: ChipKey; angle: number; height: number; radius: number }[] = [
  { key: "seo", angle: 40, height: 0.95, radius: 2.75 },
  { key: "geo", angle: 140, height: 1.3, radius: 2.55 },
  { key: "ai", angle: 235, height: 0, radius: 2.9 },
  { key: "analytics", angle: 320, height: -0.85, radius: 2.6 },
];

// Radial soft-dot sprite used for every particle system (stars, dust, face points).
function createSoftDotTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.55)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Stylised head-profile "circuit" icon used as the halo band texture.
function createHaloIconTexture() {
  const size = 640;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const nodes: [number, number][] = [
    [0, -1], [-0.55, -0.72], [0.55, -0.72], [-0.8, -0.3], [0.8, -0.3],
    [-0.4, -0.38], [0.4, -0.38], [-0.32, -0.12], [0.32, -0.12], [0, -0.15],
    [0, 0.28], [-0.68, 0.15], [0.68, 0.15], [-0.22, 0.58], [0.22, 0.58],
    [-0.42, 0.68], [0.42, 0.68], [0, 1],
  ];
  const edges: [number, number][] = [
    [0, 11], [0, 5], [1, 5], [1, 3], [2, 4], [1, 5], [2, 6], [5, 6], [3, 5], [4, 6],
    [5, 7], [6, 8], [7, 8], [5, 9], [6, 9], [7, 9], [8, 9], [9, 10], [3, 11], [4, 12],
    [11, 5], [12, 6], [11, 13], [12, 14], [13, 14], [13, 10], [14, 10], [11, 15],
    [12, 16], [13, 15], [14, 16], [15, 16], [15, 17], [16, 17], [9, 13], [9, 14],
  ];
  const warm: Record<string, true> = {
    "5-9": true, "6-9": true, "9-10": true, "13-14": true, "13-10": true, "14-10": true,
  };

  const toPx = ([x, y]: [number, number]): [number, number] => [
    (x * 0.48 + 0.5) * size,
    (y * 0.46 + 0.5) * size,
  ];

  const drawLine = (a: [number, number], b: [number, number], color: string, width: number, blur: number, alpha: number) => {
    const [ax, ay] = toPx(a);
    const [bx, by] = toPx(b);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.globalAlpha = alpha;
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
  };

  ctx.clearRect(0, 0, size, size);
  edges.forEach(([from, to]) => {
    const isWarm = warm[`${from}-${to}`];
    drawLine(
      nodes[from],
      nodes[to],
      isWarm ? "rgba(255,175,115,1)" : "rgba(190,190,255,1)",
      isWarm ? 2.6 : 2,
      isWarm ? 15 : 9,
      isWarm ? 0.85 : 0.5,
    );
  });

  ctx.shadowBlur = 6;
  ctx.globalAlpha = 0.8;
  nodes.forEach((n) => {
    const [x, y] = toPx(n);
    ctx.fillStyle = "rgba(210,210,255,1)";
    ctx.shadowColor = "rgba(190,190,255,1)";
    ctx.beginPath();
    ctx.arc(x, y, 3.2, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
  const eyeL = toPx([-0.14, -0.52]);
  const eyeR = toPx([0.14, -0.52]);
  const eyeMid = toPx([0, -0.52]);
  const eyeDown = toPx([0, -0.28]);
  ctx.strokeStyle = "rgba(255,175,115,1)";
  ctx.lineWidth = 3.4;
  ctx.globalAlpha = 0.95;
  ctx.shadowColor = "rgba(255,175,115,1)";
  ctx.shadowBlur = 16;
  ctx.beginPath();
  ctx.moveTo(eyeL[0], eyeL[1]);
  ctx.lineTo(eyeR[0], eyeR[1]);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(eyeMid[0], eyeMid[1]);
  ctx.lineTo(eyeDown[0], eyeDown[1]);
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function AiPortraitHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Partial<Record<ChipKey, HTMLDivElement | null>>>({});
  const { open } = useOfferModal() as { open?: () => void };

  useEffect(() => {
    const canvas = canvasRef.current;
    const panel = panelRef.current;
    if (!canvas || !panel) return;

    let supportsWebGL = true;
    try {
      const test = document.createElement("canvas");
      const gl = test.getContext("webgl2") || test.getContext("webgl");
      if (!gl) supportsWebGL = false;
    } catch {
      supportsWebGL = false;
    }
    if (!supportsWebGL) {
      panel.classList.add("no-webgl");
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const bgHex = 0x0a0b12;
    const accent = new THREE.Color(0xff9a56); // warm orange
    const mesh = new THREE.Color(0x8b8ef5); // violet
    const cyan = new THREE.Color(0x6fd9ff); // cyan
    const bgLinear = new THREE.Color(0.039, 0.043, 0.071);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setClearColor(0, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(bgHex, 4.2, 11);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
    camera.position.set(0, 0.15, 6.4);
    camera.lookAt(0, 0, 0);

    const headGroup = new THREE.Group();
    scene.add(headGroup);

    // ---- procedural face sculpting (icosahedron -> stylised portrait) ----
    const gaussian = (x: number, mean: number, sigma: number) => {
      const d = (x - mean) / sigma;
      return Math.exp(-d * d);
    };

    const faceDisplace = (x: number, y: number, z: number) => {
      const depth = Math.max(z, 0);
      if (depth <= 0.02) return { dx: 0, dz: 0 };
      const forehead = gaussian(x, 0, 0.095) * gaussian(y, 0.04, 0.32) * 0.36;
      const cheeks = gaussian(y, 0.3, 0.055) * gaussian(x, 0, 0.55) * 0.11;
      const jaw = gaussian(Math.abs(x), 0.4, 0.11) * gaussian(y, -0.05, 0.2) * 0.07;
      const chin = gaussian(x, 0, 0.15) * gaussian(y, -0.62, 0.13) * 0.16;
      const eyeSockets = -gaussian(Math.abs(x), 0.3, 0.09) * gaussian(y, 0.1, 0.11) * 0.09;
      const noseBridge = -gaussian(x, 0, 0.17) * gaussian(y, -0.32, 0.035) * 0.07;
      const dz = (forehead + cheeks + jaw + chin + eyeSockets + noseBridge) * depth;
      const dx = -Math.sign(x) * gaussian(x, 0, 0.1) * gaussian(y, 0.06, 0.3) * 0.03 * depth;
      return { dx, dz };
    };

    const sculpt = (point: THREE.Vector3, radius: number) => {
      const x = point.x / radius;
      const y = point.y / radius;
      const z = point.z / radius;
      let taper = 1;
      if (y > 0.35) {
        const t = Math.min((y - 0.35) / 0.65, 1);
        taper = 1 - t * t * 0.45;
      } else if (y < -0.25) {
        const t = Math.min((-0.25 - y) / 0.75, 1);
        taper = 1 - t * t * 0.62;
      }
      const { dx, dz } = faceDisplace(x, y, z);
      const nx = x * taper + dx;
      let nz = z * taper * 0.86 + dz;
      const ny = y * 1.06;
      if (nz < 0) nz *= 0.62;
      return new THREE.Vector3(nx * radius, ny * radius, nz * radius);
    };

    const sculptGeometry = (geometry: THREE.BufferGeometry, radius: number) => {
      const position = geometry.attributes.position;
      const v = new THREE.Vector3();
      for (let i = 0; i < position.count; i++) {
        v.fromBufferAttribute(position, i);
        const sculpted = sculpt(v, radius);
        position.setXYZ(i, sculpted.x, sculpted.y, sculpted.z);
      }
      geometry.computeVertexNormals();
      return geometry;
    };

    const sampleFacePoint = (u: number, v: number, radius: number, pushOut = 0) => {
      const w = Math.sqrt(Math.max(0, 1 - u * u - v * v));
      const point = sculpt(new THREE.Vector3(u * radius, v * radius, w * radius), radius);
      const normal = point.clone().normalize();
      point.addScaledVector(normal, pushOut);
      return point;
    };

    const dotTexture = createSoftDotTexture();
    const HEAD_RADIUS = 1.55;
    const SHELL_RADIUS = 1.5;

    const sharedUniforms = {
      uColor: { value: new THREE.Vector3(mesh.r, mesh.g, mesh.b) },
      uFogNear: { value: 4 },
      uFogFar: { value: 9.5 },
      uBg: { value: bgLinear.clone() },
    };

    const commonVaryings = `varying vec3 vNormalV;\nvarying float vDepth;\n`;
    const commonVertexBody = [
      "vNormalV = normalize(normalMatrix * normalize(position));",
      "vec4 mv = modelViewMatrix * vec4(position, 1.0);",
      "vDepth = -mv.z;",
    ].join("\n");
    const commonFragmentHelpers = [
      "uniform vec3 uColor;",
      "uniform vec3 uBg;",
      "uniform float uFogNear;",
      "uniform float uFogFar;",
      "float shadeFactor(){",
      "  float diffuse = clamp(dot(normalize(vNormalV), normalize(vec3(0.35,0.5,0.85))), 0.0, 1.0);",
      "  return 0.32 + 0.68 * diffuse;",
      "}",
      "vec3 fogMix(vec3 col){ return mix(col, uBg, smoothstep(uFogNear, uFogFar, vDepth)); }",
      "float fogAtten(){ return 1.0 - smoothstep(uFogNear, uFogFar, vDepth); }",
    ].join("\n");

    const headGeometry = sculptGeometry(new THREE.IcosahedronGeometry(HEAD_RADIUS, 3), HEAD_RADIUS);
    const edgesGeometry = new THREE.EdgesGeometry(headGeometry, 1);
    const wireMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: sharedUniforms,
      vertexShader: `${commonVaryings}void main(){\n${commonVertexBody}\ngl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n}`,
      fragmentShader: `${commonVaryings}${commonFragmentHelpers}\nvoid main(){\n  float s = shadeFactor();\n  vec3 col = uColor * (0.42 + 0.5 * s);\n  gl_FragColor = vec4(fogMix(col), (0.2 + 0.22 * s) * fogAtten());\n}`,
    });
    const wireframeHead = new THREE.LineSegments(edgesGeometry, wireMaterial);
    headGroup.add(wireframeHead);

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute("position", headGeometry.attributes.position.clone());
    const facePointsMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { ...sharedUniforms, uSize: { value: 0.05 } },
      vertexShader: `${commonVaryings}uniform float uSize;\nvoid main(){\n${commonVertexBody}\ngl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\ngl_PointSize = clamp(uSize * 420.0 / vDepth, 1.4, 5.0);\n}`,
      fragmentShader: `${commonVaryings}${commonFragmentHelpers}\nvoid main(){\n  vec2 uv = gl_PointCoord - 0.5;\n  float a = 1.0 - smoothstep(0.25, 0.5, length(uv));\n  float s = shadeFactor();\n  vec3 col = uColor * (0.55 + 0.7 * s);\n  gl_FragColor = vec4(fogMix(col), a * (0.38 + 0.35 * s) * fogAtten());\n}`,
    });
    const facePoints = new THREE.Points(pointsGeometry, facePointsMaterial);
    headGroup.add(facePoints);

    const shellGeometry = sculptGeometry(new THREE.SphereGeometry(SHELL_RADIUS, 110, 110), SHELL_RADIUS);
    const shellMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Vector3(accent.r, accent.g, accent.b) },
        uColorB: { value: new THREE.Vector3(mesh.r, mesh.g, mesh.b) },
        uBg: { value: bgLinear.clone() },
        uFogNear: { value: 4 },
        uFogFar: { value: 9.5 },
      },
      vertexShader: [
        "varying vec3 vNormalV;",
        "varying vec3 vViewDir;",
        "varying vec3 vPos;",
        "varying float vDepth;",
        "void main(){",
        "  vPos = position;",
        "  vec4 mv = modelViewMatrix * vec4(position,1.0);",
        "  vNormalV = normalize(normalMatrix * normal);",
        "  vViewDir = normalize(-mv.xyz);",
        "  vDepth = -mv.z;",
        "  gl_Position = projectionMatrix * mv;",
        "}",
      ].join("\n"),
      fragmentShader: [
        "uniform float uTime;",
        "uniform vec3 uColorA;",
        "uniform vec3 uColorB;",
        "uniform vec3 uBg;",
        "uniform float uFogNear;",
        "uniform float uFogFar;",
        "varying vec3 vNormalV;",
        "varying vec3 vViewDir;",
        "varying vec3 vPos;",
        "varying float vDepth;",
        "void main(){",
        "  float fresnel = pow(1.0 - max(dot(normalize(vNormalV), normalize(vViewDir)), 0.0), 2.4);",
        "  float diffuse = clamp(dot(normalize(vNormalV), normalize(vec3(0.35,0.5,0.85))), 0.0, 1.0);",
        "  float shape = 0.42 + 0.58 * diffuse;",
        "  vec2 uv = vPos.xy * 5.6 + vec2(vPos.z * 1.6, uTime * 0.06);",
        "  vec2 c = fract(uv);",
        "  vec2 distEdge = min(c, 1.0 - c);",
        "  float d = min(distEdge.x, distEdge.y);",
        "  float line = 1.0 - smoothstep(0.0, 0.028, d);",
        "  float pulse = 0.5 + 0.5 * sin(uTime * 1.3 + vPos.y * 3.2);",
        "  vec3 col = mix(uColorB, uColorA, pulse) * (line * 1.1 + fresnel * 0.6) * shape;",
        "  float alpha = clamp((line * 0.5 + fresnel * 0.42) * shape, 0.0, 1.0);",
        "  float fog = smoothstep(uFogNear, uFogFar, vDepth);",
        "  col = mix(col, uBg, fog);",
        "  alpha *= (1.0 - fog);",
        "  gl_FragColor = vec4(col, alpha);",
        "}",
      ].join("\n"),
    });
    const glowShell = new THREE.Mesh(shellGeometry, shellMaterial);
    headGroup.add(glowShell);

    const eyeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: accent, toneMapped: false });
    const eyeLeft = new THREE.Mesh(eyeGeometry, eyeMaterial);
    const eyeRight = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeLeft.position.copy(sampleFacePoint(-0.3, 0.1, HEAD_RADIUS, 0.035));
    eyeRight.position.copy(sampleFacePoint(0.3, 0.1, HEAD_RADIUS, 0.035));
    headGroup.add(eyeLeft, eyeRight);

    const haloTexture = createHaloIconTexture();
    const haloRadius = HEAD_RADIUS * 0.99;
    const haloGeometry = new THREE.PlaneGeometry(2.5, 2.35, 48, 32);
    const haloPosition = haloGeometry.attributes.position;
    for (let i = 0; i < haloPosition.count; i++) {
      const x = haloPosition.getX(i);
      const y = haloPosition.getY(i);
      const falloff = (x / 1.25) * (x / 1.25) + (y / 1.15) * (y / 1.15);
      const bulge = Math.max(0, 1 - falloff);
      const extraRadius = bulge * bulge * 0.16;
      const theta = x / haloRadius;
      const bentRadius = haloRadius + extraRadius;
      haloPosition.setX(i, Math.sin(theta) * bentRadius);
      haloPosition.setZ(i, Math.cos(theta) * bentRadius - (haloRadius - 1));
      haloPosition.setY(i, y);
    }
    haloGeometry.computeVertexNormals();
    const haloMaterial = new THREE.MeshBasicMaterial({
      map: haloTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
      opacity: 0.92,
      side: THREE.DoubleSide,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    headGroup.add(halo);

    // ---- ambient starfield + constellation lines ----
    const starGroup = new THREE.Group();
    scene.add(starGroup);

    const STAR_COUNT = 760;
    const starPositions = new Float32Array(STAR_COUNT * 3);
    const starColors = new Float32Array(STAR_COUNT * 3);
    const tintColor = new THREE.Color();
    for (let i = 0; i < STAR_COUNT; i++) {
      const r = 2.5 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(THREE.MathUtils.lerp(-1, 1, Math.random()));
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.cos(phi) * 0.72;
      starPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      tintColor.copy(mesh).lerp(cyan, Math.random() * 0.6);
      starColors[i * 3] = tintColor.r;
      starColors[i * 3 + 1] = tintColor.g;
      starColors[i * 3 + 2] = tintColor.b;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.Float32BufferAttribute(starColors, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 0.05,
      map: dotTexture,
      transparent: true,
      opacity: 0.9,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: true,
      sizeAttenuation: true,
    });
    starGroup.add(new THREE.Points(starGeometry, starMaterial));

    const constellationIndices: number[] = [];
    for (let i = 0; i < 150; i++) constellationIndices.push(Math.floor(Math.random() * STAR_COUNT));
    const linePoints: THREE.Vector3[] = [];
    const LINK_DIST = 1.05;
    for (let i = 0; i < constellationIndices.length; i++) {
      for (let j = i + 1; j < constellationIndices.length; j++) {
        const a = constellationIndices[i] * 3;
        const b = constellationIndices[j] * 3;
        const dx = starPositions[a] - starPositions[b];
        const dy = starPositions[a + 1] - starPositions[b + 1];
        const dz = starPositions[a + 2] - starPositions[b + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < LINK_DIST) {
          linePoints.push(new THREE.Vector3(starPositions[a], starPositions[a + 1], starPositions[a + 2]));
          linePoints.push(new THREE.Vector3(starPositions[b], starPositions[b + 1], starPositions[b + 2]));
        }
      }
    }
    const constellationGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    const constellationMaterial = new THREE.LineBasicMaterial({
      color: mesh,
      transparent: true,
      opacity: 0.18,
      fog: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    starGroup.add(new THREE.LineSegments(constellationGeometry, constellationMaterial));

    const DUST_COUNT = 260;
    const dustPositions = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      const r = 6 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(THREE.MathUtils.lerp(-1, 1, Math.random()));
      dustPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      dustPositions[i * 3 + 1] = r * Math.cos(phi) * 0.6;
      dustPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.Float32BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      color: mesh,
      size: 0.028,
      map: dotTexture,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: true,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(dustGeometry, dustMaterial));

    // ---- undulating ground plane ----
    const groundGroup = new THREE.Group();
    groundGroup.rotation.x = -Math.PI / 2;
    groundGroup.position.y = -1.85;
    scene.add(groundGroup);

    const waveDisplaceGlsl = [
      "uniform float uTime;",
      "varying float vWave;",
      "varying float vDist;",
      "varying float vDepth;",
      "vec3 waveDisplace(vec3 p){",
      "  float wave = sin(p.x*0.55 + uTime*0.55)*0.16 + cos(p.y*0.45 - uTime*0.35)*0.12;",
      "  vWave = wave;",
      "  p.z += wave;",
      "  return p;",
      "}",
    ].join("\n");

    const groundUniforms = {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Vector3(mesh.r, mesh.g, mesh.b) },
      uColorB: { value: new THREE.Vector3(cyan.r, cyan.g, cyan.b) },
      uBg: { value: bgLinear.clone() },
    };

    const groundPlaneGeometry = new THREE.PlaneGeometry(26, 18, 96, 60);
    const groundPointsMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: groundUniforms,
      vertexShader: `${waveDisplaceGlsl}\nvoid main(){\n  vec3 p = waveDisplace(position);\n  vDist = length(position.xy);\n  vec4 mv = modelViewMatrix * vec4(p,1.0);\n  vDepth = -mv.z;\n  gl_Position = projectionMatrix * mv;\n  gl_PointSize = clamp(240.0 / vDepth, 1.0, 3.4);\n}`,
      fragmentShader: [
        "uniform vec3 uColorA;",
        "uniform vec3 uColorB;",
        "uniform vec3 uBg;",
        "varying float vWave;",
        "varying float vDist;",
        "varying float vDepth;",
        "void main(){",
        "  vec2 uv = gl_PointCoord - 0.5;",
        "  float a = 1.0 - smoothstep(0.3, 0.5, length(uv));",
        "  vec3 col = mix(uColorA, uColorB, clamp(vWave*2.5+0.5,0.0,1.0));",
        "  float edgeFade = 1.0 - smoothstep(6.0, 12.5, vDist);",
        "  float fog = smoothstep(4.0, 12.0, vDepth);",
        "  col = mix(col, uBg, fog);",
        "  gl_FragColor = vec4(col, a * edgeFade * (1.0-fog) * 0.85);",
        "}",
      ].join("\n"),
    });
    groundGroup.add(new THREE.Points(groundPlaneGeometry, groundPointsMaterial));

    const groundWireGeometry = new THREE.WireframeGeometry(new THREE.PlaneGeometry(26, 18, 30, 20));
    const groundLinesMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: groundUniforms,
      vertexShader: `${waveDisplaceGlsl}\nvoid main(){\n  vec3 p = waveDisplace(position);\n  vDist = length(position.xy);\n  vec4 mv = modelViewMatrix * vec4(p,1.0);\n  vDepth = -mv.z;\n  gl_Position = projectionMatrix * mv;\n}`,
      fragmentShader: [
        "uniform vec3 uColorA;",
        "uniform vec3 uColorB;",
        "uniform vec3 uBg;",
        "varying float vWave;",
        "varying float vDist;",
        "varying float vDepth;",
        "void main(){",
        "  vec3 col = mix(uColorA, uColorB, clamp(vWave*2.5+0.5,0.0,1.0));",
        "  float edgeFade = 1.0 - smoothstep(6.0, 12.0, vDist);",
        "  float fog = smoothstep(4.0, 11.0, vDepth);",
        "  col = mix(col, uBg, fog);",
        "  gl_FragColor = vec4(col, edgeFade * (1.0-fog) * 0.16);",
        "}",
      ].join("\n"),
    });
    groundGroup.add(new THREE.LineSegments(groundWireGeometry, groundLinesMaterial));

    // ---- orbiting chip anchors, projected to the HTML overlay each frame ----
    const chipAnchorGroup = new THREE.Group();
    scene.add(chipAnchorGroup);
    const chipAnchors = CHIP_ANCHORS.map(({ key, angle, height, radius }) => {
      const rad = THREE.MathUtils.degToRad(angle);
      const anchor = new THREE.Object3D();
      anchor.position.set(Math.cos(rad) * radius, height, Math.sin(rad) * radius);
      chipAnchorGroup.add(anchor);
      return { key, anchor };
    });

    // ---- post-processing ----
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.05, 0.5, 0.24);
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    const resize = () => {
      const rect = panel.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      composer.setSize(width, height);
      bloomPass.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(panel);

    // ---- pointer parallax + main loop ----
    const pointer = { x: 0, y: 0 };
    let hovering = false;
    const maxYaw = THREE.MathUtils.degToRad(34);
    const maxPitch = THREE.MathUtils.degToRad(20);
    const smoothing = 4.5;
    const idleSpeed = 0.35;

    // hovering is only set on actual pointer movement (not "enter") so the
    // idle rotation keeps playing whenever the cursor isn't actively moving
    // over the panel — otherwise the head can look frozen if the mouse just
    // happens to rest over the canvas without moving.
    const onPointerMove = (e: PointerEvent) => {
      const rect = panel.getBoundingClientRect();
      pointer.x = THREE.MathUtils.clamp(((e.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      pointer.y = THREE.MathUtils.clamp(((e.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
      hovering = true;
    };
    const onPointerLeave = () => { hovering = false; };
    panel.addEventListener("pointermove", onPointerMove);
    panel.addEventListener("pointerleave", onPointerLeave);

    const clock = new THREE.Clock();
    let elapsed = 0;
    let yaw = 0;
    let pitch = 0;
    let rafId = 0;
    let disposed = false;
    const worldPos = new THREE.Vector3();
    let panelRect = panel.getBoundingClientRect();

    const tick = () => {
      if (disposed) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      elapsed += dt;
      const motionScale = prefersReducedMotion ? 0 : 1;

      if (hovering && !prefersReducedMotion) {
        const targetYaw = pointer.x * maxYaw;
        const targetPitch = pointer.y * maxPitch;
        const ease = 1 - Math.exp(-smoothing * dt);
        // yaw keeps accumulating during idle rotation (never wraps), so once it
        // has drifted several full turns away from 0, easing straight toward a
        // small target value would spin the head through all those turns to
        // "unwind" first. Take the shortest angular path instead (max half turn).
        const TWO_PI = Math.PI * 2;
        let yawDelta = (targetYaw - yaw) % TWO_PI;
        if (yawDelta > Math.PI) yawDelta -= TWO_PI;
        if (yawDelta < -Math.PI) yawDelta += TWO_PI;
        yaw += yawDelta * ease;
        pitch += (targetPitch - pitch) * ease;
      } else {
        yaw += idleSpeed * dt * motionScale;
        if (yaw > Math.PI) yaw -= Math.PI * 2;
        const ease = 1 - Math.exp(-smoothing * dt);
        pitch += (0 - pitch) * ease;
      }

      headGroup.rotation.y = yaw;
      headGroup.rotation.x = pitch;
      starGroup.rotation.y = -elapsed * 0.4 * motionScale;
      chipAnchorGroup.rotation.y = elapsed * 0.11 * motionScale;

      shellMaterial.uniforms.uTime.value = elapsed;
      groundUniforms.uTime.value = elapsed;

      const pulse = prefersReducedMotion ? 1 : 1 + Math.sin(elapsed * 2.4) * 0.35;
      eyeMaterial.color.setRGB(1, 0.6 * pulse + 0.2, 0.34 * pulse);

      composer.render();

      if (!panelRect || Math.random() < 0.02) panelRect = panel.getBoundingClientRect();
      chipAnchors.forEach(({ key, anchor }) => {
        const el = chipRefs.current[key];
        if (!el) return;
        anchor.getWorldPosition(worldPos);
        const viewSpace = worldPos.clone().applyMatrix4(camera.matrixWorldInverse);
        const projected = worldPos.clone().project(camera);
        const margin = 36;
        const x = THREE.MathUtils.clamp((projected.x * 0.5 + 0.5) * panelRect.width, margin, panelRect.width - margin);
        const y = THREE.MathUtils.clamp((1 - (projected.y * 0.5 + 0.5)) * panelRect.height, margin, panelRect.height - margin);
        const depthFactor = THREE.MathUtils.clamp(THREE.MathUtils.mapLinear(viewSpace.z, -3.2, -7.5, 1, 0), 0, 1);
        el.style.transform = `translate(-50%,-50%) translate(${x.toFixed(1)}px,${y.toFixed(1)}px) scale(${(0.78 + depthFactor * 0.34).toFixed(3)})`;
        el.style.opacity = (0.55 + depthFactor * 0.45).toFixed(3);
        el.style.zIndex = String(Math.round(depthFactor * 100) + 1);
      });

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      panel.removeEventListener("pointermove", onPointerMove);
      panel.removeEventListener("pointerleave", onPointerLeave);
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const material = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (material) {
          const materials = Array.isArray(material) ? material : [material];
          materials.forEach((m) => {
            Object.values(m).forEach((value) => {
              if (value && (value as THREE.Texture).isTexture) (value as THREE.Texture).dispose();
            });
            m.dispose();
          });
        }
      });
      dotTexture.dispose();
      haloTexture.dispose();
      bloomPass.dispose();
      composer.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      className={`ai-portrait-hero ${unbounded.variable} ${manrope.variable} ${ibmPlexMono.variable}`}
    >
      <div className="stage">
        <div className="copy">
          <span className="eyebrow">
            <T path="aiHero.eyebrow" />
          </span>

          <h1>
            <T path="aiHero.titlePrefix" />
            <em>
              <T path="aiHero.titleHighlight" />
            </em>
            <T path="aiHero.titleSuffix" />
          </h1>

          <p className="lede">
            <T path="aiHero.lede" />
          </p>

          <div className="stats">
            <div className="stat">
              <b><T path="aiHero.stat1Value" /></b>
              <span><T path="aiHero.stat1Label" /></span>
            </div>
            <div className="stat">
              <b><T path="aiHero.stat2Value" /></b>
              <span><T path="aiHero.stat2Label" /></span>
            </div>
            <div className="stat">
              <b><T path="aiHero.stat3Value" /></b>
              <span><T path="aiHero.stat3Label" /></span>
            </div>
          </div>

          <div className="cta-row">
            <button className="btn btn-primary" type="button" onClick={() => open?.()}>
              <T path="aiHero.ctaPrimary" />
            </button>
            <a className="btn btn-ghost" href="#experiente">
              <T path="aiHero.ctaSecondary" />
            </a>
          </div>
        </div>

        <div className="visual-wrap">
          <div className="visual-panel" ref={panelRef}>
            <canvas ref={canvasRef} />
            <div className="fallback-note">
              <T path="aiHero.fallback" />
            </div>

            <div className="orbit">
              <div
                className="chip"
                ref={(el) => { chipRefs.current.seo = el; }}
              >
                <svg viewBox="0 0 24 24">
                  <circle className="chip-icon-line" cx="10.5" cy="10.5" r="6.2" />
                  <line className="chip-icon-line" x1="15.3" y1="15.3" x2="20.5" y2="20.5" />
                  <circle className="chip-icon-dot" cx="10.5" cy="10.5" r="1.15" />
                </svg>
                <span className="chip-label"><T path="aiHero.chipSeo" /></span>
              </div>

              <div
                className="chip"
                ref={(el) => { chipRefs.current.geo = el; }}
              >
                <svg viewBox="0 0 24 24">
                  <circle className="chip-icon-line" cx="12" cy="12" r="8" />
                  <ellipse className="chip-icon-line" cx="12" cy="12" rx="3.2" ry="8" />
                  <line className="chip-icon-line" x1="4" y1="12" x2="20" y2="12" />
                  <circle className="chip-icon-dot" cx="12" cy="12" r="1.1" />
                </svg>
                <span className="chip-label"><T path="aiHero.chipGeo" /></span>
              </div>

              <div
                className="chip"
                ref={(el) => { chipRefs.current.ai = el; }}
              >
                <svg viewBox="0 0 24 24">
                  <path className="chip-icon-line" d="M12 3 L13.4 9.6 L20 11 L13.4 12.4 L12 19 L10.6 12.4 L4 11 L10.6 9.6 Z" />
                  <circle className="chip-icon-dot" cx="18.5" cy="5.5" r="1.1" />
                </svg>
                <span className="chip-label"><T path="aiHero.chipContent" /></span>
              </div>

              <div
                className="chip"
                ref={(el) => { chipRefs.current.analytics = el; }}
              >
                <svg viewBox="0 0 24 24">
                  <line className="chip-icon-line" x1="4" y1="20" x2="4" y2="4" />
                  <rect className="chip-icon-line" x="7" y="13" width="3" height="7" />
                  <rect className="chip-icon-line" x="12.5" y="9" width="3" height="11" />
                  <rect className="chip-icon-line" x="18" y="5" width="3" height="15" />
                  <circle className="chip-icon-dot" cx="8.5" cy="10.5" r="1.1" />
                </svg>
                <span className="chip-label"><T path="aiHero.chipAnalytics" /></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ai-portrait-hero {
          --bg: #0a0b12;
          --panel: #14151f;
          --panel-line: #23243447;
          --ink: #f0eee8;
          --ink-dim: #b9bacb;
          --muted: #767a92;
          --accent: #ff9a56;
          --accent-dim: #ff9a5633;
          --mesh: #8b8ef5;
          --mesh-soft: #8b8ef566;

          position: relative;
          margin: 0;
          color: var(--ink);
          font-family: var(--font-manrope), ui-sans-serif, system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1.25rem, 4vw, 3.5rem);
          overflow: hidden;
          background: transparent;
        }

        .ai-portrait-hero ::selection { background: var(--accent-dim); color: var(--ink); }

        .ai-portrait-hero .stage {
          width: 100%;
          max-width: 1440px;
          display: flex;
          flex-direction: column;
          gap: clamp(1.75rem, 4vw, 3rem);
        }

        .ai-portrait-hero .visual-wrap { order: 1; }
        .ai-portrait-hero .copy { order: 2; }

        .ai-portrait-hero .copy {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.35rem;
          width: 100%;
          max-width: 820px;
          margin: 0 auto;
        }

        .ai-portrait-hero .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: .6em;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: .72rem;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .ai-portrait-hero .eyebrow::before {
          content: '';
          width: .5em; height: .5em;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 .6em .05em var(--accent);
          animation: aiHeroBlink 2.6s ease-in-out infinite;
        }
        @keyframes aiHeroBlink { 0%,100%{opacity:1;} 50%{opacity:.35;} }

        .ai-portrait-hero h1 {
          margin: 0;
          font-family: var(--font-unbounded), ui-sans-serif, sans-serif;
          font-weight: 800;
          font-size: clamp(2.1rem, 4.4vw, 3.3rem);
          line-height: 1.08;
          letter-spacing: -.01em;
          text-wrap: balance;
          color: var(--ink);
        }
        .ai-portrait-hero h1 em { font-style: normal; color: var(--accent); }

        .ai-portrait-hero .lede {
          margin: 0 auto;
          max-width: 34em;
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--ink-dim);
        }

        .ai-portrait-hero .stats {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.6rem 2.2rem;
          margin: .4rem 0 .1rem;
          padding-top: 1.1rem;
          border-top: 1px solid var(--panel-line);
          width: 100%;
        }
        .ai-portrait-hero .stat { text-align: center; }
        .ai-portrait-hero .stat b {
          display: block;
          font-family: var(--font-unbounded), sans-serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--ink);
        }
        .ai-portrait-hero .stat span { font-size: .78rem; color: var(--muted); }

        .ai-portrait-hero .cta-row { display: flex; flex-wrap: wrap; justify-content: center; gap: .85rem; margin-top: .3rem; }

        .ai-portrait-hero .btn {
          font-family: var(--font-manrope), sans-serif;
          font-weight: 700;
          font-size: .94rem;
          padding: .85em 1.6em;
          border-radius: 999px;
          border: 1px solid transparent;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: transform 160ms cubic-bezier(0.23,1,0.32,1), box-shadow 160ms ease;
        }
        .ai-portrait-hero .btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
        .ai-portrait-hero .btn:active { transform: scale(0.97); }

        .ai-portrait-hero .btn-primary { background: var(--accent); color: #1c0f04; }
        .ai-portrait-hero .btn-primary:hover { box-shadow: 0 8px 24px -8px var(--accent-dim); }

        .ai-portrait-hero .btn-ghost { background: transparent; color: var(--ink-dim); border-color: var(--panel-line); }
        .ai-portrait-hero .btn-ghost:hover { color: var(--ink); border-color: #3a3c52; }

        .ai-portrait-hero .visual-wrap {
          position: relative;
          aspect-ratio: 21/9;
          width: 100%;
          margin: 0 auto;
        }

        @media (max-width: 860px) {
          .ai-portrait-hero .visual-wrap { aspect-ratio: 16/9; }
        }
        @media (max-width: 520px) {
          .ai-portrait-hero .visual-wrap { aspect-ratio: 4/3; }
        }

        .ai-portrait-hero .visual-panel {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 28px;
          background: radial-gradient(ellipse 80% 65% at 50% 40%, #171526 0%, #0d0e17 70%);
          border: 1px solid var(--panel-line);
          overflow: hidden;
        }

        .ai-portrait-hero canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }

        .ai-portrait-hero .fallback-note {
          position: absolute;
          inset: 0;
          display: none;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          text-align: center;
          font-family: var(--font-mono), monospace;
          font-size: .75rem;
          color: var(--muted);
        }
        .ai-portrait-hero .no-webgl .fallback-note { display: flex; }
        .ai-portrait-hero .no-webgl canvas { display: none; }

        .ai-portrait-hero .orbit { position: absolute; inset: 0; pointer-events: none; z-index: 5; }
        .ai-portrait-hero .chip {
          position: absolute;
          top: 0; left: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: .28rem;
          width: 4.4rem;
          padding: .55rem .3rem .5rem;
          border-radius: 14px;
          background: linear-gradient(180deg, #171a2acc 0%, #10121dcc 100%);
          backdrop-filter: blur(7px);
          border: 1px solid var(--panel-line);
          box-shadow: 0 0 0 1px #ffffff08 inset, 0 8px 20px -10px #000000aa;
          pointer-events: auto;
          transition: border-color 200ms ease, box-shadow 200ms ease;
        }
        .ai-portrait-hero .chip:hover {
          border-color: var(--accent-dim);
          box-shadow: 0 0 0 1px #ffffff08 inset, 0 0 18px -2px var(--accent-dim);
        }
        .ai-portrait-hero .chip svg { width: 1.35rem; height: 1.35rem; overflow: visible; }
        .ai-portrait-hero .chip .chip-icon-line { fill: none; stroke: var(--mesh); stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; filter: drop-shadow(0 0 3px var(--mesh-soft)); }
        .ai-portrait-hero .chip .chip-icon-dot { fill: var(--accent); filter: drop-shadow(0 0 3px var(--accent-dim)); }
        .ai-portrait-hero .chip:hover .chip-icon-line { stroke: var(--accent); filter: drop-shadow(0 0 4px var(--accent-dim)); }
        .ai-portrait-hero .chip-label {
          font-family: var(--font-mono), monospace;
          font-size: .58rem;
          letter-spacing: .06em;
          color: var(--ink-dim);
          white-space: nowrap;
        }
        .ai-portrait-hero .chip:hover .chip-label { color: var(--accent); }

        @media (prefers-reduced-motion: reduce) {
          .ai-portrait-hero .eyebrow::before { animation: none; }
          .ai-portrait-hero .btn { transition: none; }
        }
      `}</style>
    </section>
  );
}
