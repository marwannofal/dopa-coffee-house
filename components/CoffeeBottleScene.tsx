"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { useI18n } from "@/lib/i18n";

function createCupLabelTexture(isArabic: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 246, 229, 0.96)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#472318";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "900 245px Inter, Arial, sans-serif";
  ctx.fillText("DOPA", 512, 420);

  ctx.font = isArabic ? "800 64px Tahoma, Arial, sans-serif" : "800 54px Inter, Arial, sans-serif";
  ctx.letterSpacing = isArabic ? "0px" : "4px";
  ctx.fillText(isArabic ? "آيس لاتيه تيراميسو" : "ICED LATTE TIRAMISU", 512, 595);

  ctx.strokeStyle = "rgba(71, 35, 24, 0.78)";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(248, 690);
  ctx.lineTo(776, 690);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function disposeScene(scene: THREE.Scene) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();

  scene.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (mesh.geometry) geometries.add(mesh.geometry);

    const materialList = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
    materialList.forEach((material) => {
      materials.add(material);
      Object.values(material).forEach((value) => {
        if (value instanceof THREE.Texture) textures.add(value);
      });
    });
  });

  textures.forEach((texture) => texture.dispose());
  materials.forEach((material) => material.dispose());
  geometries.forEach((geometry) => geometry.dispose());
}

export function CoffeeBottleScene() {
  const { isArabic } = useI18n();
  const sceneRef = useRef<HTMLDivElement>(null);
  const cupFrameRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sceneElement = sceneRef.current;
    const cupFrame = cupFrameRef.current;
    const canvasHost = canvasHostRef.current;
    const shadow = shadowRef.current;
    if (!sceneElement || !cupFrame || !canvasHost || !shadow) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scrollTarget = document.getElementById("home-story");
    const locationTarget = document.getElementById("visit");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.08, 7.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.32;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    canvasHost.appendChild(renderer.domElement);

    const ambient = new THREE.HemisphereLight(0xfff1d1, 0x311409, 2.35);
    const keyLight = new THREE.DirectionalLight(0xffdfaa, 5.6);
    keyLight.position.set(3.8, 4.2, 4.8);
    const rimLight = new THREE.DirectionalLight(0xb53f23, 3.1);
    rimLight.position.set(-4.8, 2.4, -2.6);
    const softFront = new THREE.PointLight(0xffffff, 11, 13);
    softFront.position.set(-1.6, 1.1, 3.6);
    const topGlow = new THREE.PointLight(0xffcf86, 8, 9);
    topGlow.position.set(0.4, 3.1, 2.5);
    scene.add(ambient, keyLight, rimLight, softFront, topGlow);

    const cup = new THREE.Group();
    cup.position.y = -0.18;
    scene.add(cup);

    const plasticMaterial = new THREE.MeshPhysicalMaterial({
      color: "#fff2dc",
      roughness: 0.08,
      metalness: 0,
      transmission: 0.48,
      thickness: 0.28,
      ior: 1.38,
      transparent: true,
      opacity: 0.34,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      depthWrite: false,
    });

    const latteMaterial = new THREE.MeshPhysicalMaterial({
      color: "#d09168",
      roughness: 0.42,
      metalness: 0,
      transparent: true,
      opacity: 0.88,
      clearcoat: 0.44,
      clearcoatRoughness: 0.18,
    });

    const chocolateMaterial = new THREE.MeshStandardMaterial({
      color: "#3b130b",
      roughness: 0.33,
      metalness: 0.04,
    });

    const creamMaterial = new THREE.MeshPhysicalMaterial({
      color: "#fff6e8",
      roughness: 0.58,
      metalness: 0,
      clearcoat: 0.25,
      clearcoatRoughness: 0.36,
    });

    const biscuitMaterial = new THREE.MeshStandardMaterial({
      color: "#d9a25e",
      roughness: 0.72,
      metalness: 0,
    });

    const printMaterial = new THREE.MeshBasicMaterial({
      color: "#4a2418",
      map: createCupLabelTexture(isArabic),
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const highlightMaterial = new THREE.MeshBasicMaterial({
      color: "#fff8eb",
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const cupShell = new THREE.Mesh(new THREE.CylinderGeometry(0.98, 0.68, 2.58, 96, 1, true), plasticMaterial);
    cupShell.position.y = -0.72;
    cup.add(cupShell);

    const latte = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.62, 2.34, 96), latteMaterial);
    latte.position.y = -0.82;
    cup.add(latte);

    const topCoffee = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.92, 0.045, 96), chocolateMaterial);
    topCoffee.position.y = 0.44;
    cup.add(topCoffee);

    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.98, 0.04, 14, 96), plasticMaterial);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.57;
    cup.add(rim);

    const baseRing = new THREE.Mesh(new THREE.TorusGeometry(0.67, 0.03, 14, 96), plasticMaterial);
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.y = -2.04;
    cup.add(baseRing);

    const label = new THREE.Mesh(new THREE.CylinderGeometry(0.995, 0.705, 0.82, 72, 1, true, -0.54, 1.08), printMaterial);
    label.position.y = -0.92;
    cup.add(label);

    const sideHighlight = new THREE.Mesh(
      new THREE.CylinderGeometry(1.005, 0.71, 2.25, 16, 1, true, -0.14, 0.12),
      highlightMaterial,
    );
    sideHighlight.position.set(0, -0.68, 0);
    sideHighlight.rotation.y = -0.36;
    cup.add(sideHighlight);

    const cream = new THREE.Group();
    cream.position.y = 0.62;
    cup.add(cream);

    const creamPositions = [
      [0, 0, 0, 0.42],
      [-0.34, -0.02, 0.05, 0.34],
      [0.34, -0.01, 0.03, 0.34],
      [-0.12, 0.18, 0.02, 0.32],
      [0.18, 0.18, -0.01, 0.31],
      [-0.5, -0.12, 0.03, 0.25],
      [0.5, -0.1, 0.02, 0.25],
      [0, 0.36, 0, 0.28],
    ];

    creamPositions.forEach(([x, y, z, radius], index) => {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 16), creamMaterial);
      puff.position.set(x, y, z);
      puff.scale.set(1.16, 0.56 + (index % 3) * 0.06, 0.88);
      cream.add(puff);
    });

    const chocolateRing = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.035, 12, 96), chocolateMaterial);
    chocolateRing.position.set(0.05, 0.2, 0.02);
    chocolateRing.rotation.set(Math.PI / 2, 0.1, -0.2);
    cream.add(chocolateRing);

    for (let index = 0; index < 16; index += 1) {
      const angle = index * 0.82;
      const radius = 0.15 + (index % 5) * 0.1;
      const chip = new THREE.Mesh(new THREE.SphereGeometry(0.028 + (index % 3) * 0.01, 10, 8), chocolateMaterial);
      chip.position.set(Math.cos(angle) * radius, 0.32 + (index % 4) * 0.035, Math.sin(angle) * radius * 0.28);
      cream.add(chip);
    }

    const dripData = [
      [-0.62, 0.18, 0.22],
      [-0.28, 0.1, 0.34],
      [0.08, 0.12, 0.24],
      [0.42, 0.14, 0.3],
      [0.66, 0.08, 0.18],
    ];

    dripData.forEach(([x, y, height]) => {
      const drip = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, height, 8, 12), chocolateMaterial);
      drip.position.set(x, 0.4 - height * 0.5 + y, 0.76);
      drip.rotation.z = 0.05 * Math.sign(x);
      cup.add(drip);
    });

    const biscuit = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 1.25, 10, 18), biscuitMaterial);
    biscuit.position.set(0.58, 1.02, -0.08);
    biscuit.rotation.set(0.28, 0.18, -0.82);
    biscuit.scale.set(1, 1, 1.08);
    cup.add(biscuit);

    for (let index = 0; index < 18; index += 1) {
      const crumb = new THREE.Mesh(new THREE.SphereGeometry(0.014 + (index % 2) * 0.009, 8, 6), chocolateMaterial);
      crumb.position.set(
        0.45 + Math.cos(index * 1.7) * 0.16,
        1.03 + Math.sin(index * 0.9) * 0.4,
        0.08 + Math.sin(index * 1.3) * 0.02,
      );
      cup.add(crumb);
    }

    cup.scale.setScalar(1.28);

    const resize = () => {
      const width = canvasHost.clientWidth;
      const height = canvasHost.clientHeight;
      const mobile = window.innerWidth < 640;
      const tablet = window.innerWidth >= 640 && window.innerWidth < 1024;

      camera.aspect = width / height;
      camera.fov = mobile ? 38 : tablet ? 35 : 32;
      camera.position.z = mobile ? 8.5 : tablet ? 8.1 : 7.65;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvasHost);
    resize();

    let frame = 0;
    const render = () => {
      const elapsed = performance.now() * 0.001;
      softFront.position.x = Math.sin(elapsed * 0.8) * 1.1 - 1.2;
      topGlow.intensity = 7.2 + Math.sin(elapsed * 1.1) * 0.8;
      cream.rotation.y = Math.sin(elapsed * 0.45) * 0.08;
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };
    render();

    gsap.registerPlugin(ScrollTrigger);
    let removeLocationLock = () => {};
    const context = gsap.context(() => {
      gsap.fromTo(
        cup.scale,
        { x: 0.92, y: 0.92, z: 0.92 },
        { x: 1.28, y: 1.28, z: 1.28, duration: 1.2, ease: "power3.out", delay: 0.12 },
      );
      gsap.fromTo(
        cup.rotation,
        { x: -0.08, y: -0.78, z: -0.04 },
        { x: -0.02, y: -0.18, z: 0, duration: 1.2, ease: "power3.out", delay: 0.12 },
      );

      if (!reduceMotion && scrollTarget) {
        const scrollEnd = locationTarget ? "top 78%" : "bottom bottom";

        gsap.to(cup.rotation, {
          keyframes: [
            { y: Math.PI * 0.6, x: 0.08, z: -0.04, duration: 1 },
            { y: Math.PI * 1.35, x: -0.05, z: 0.04, duration: 1 },
            { y: Math.PI * 2.05, x: 0.06, z: -0.03, duration: 1 },
            { y: Math.PI * 2.65, x: -0.02, z: 0.02, duration: 1 },
          ],
          ease: "none",
          scrollTrigger: {
            trigger: scrollTarget,
            endTrigger: locationTarget ?? scrollTarget,
            start: "top top",
            end: scrollEnd,
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(cup.position, {
          keyframes: [
            { y: -0.28, duration: 1 },
            { y: 0.04, duration: 1 },
            { y: -0.12, duration: 1 },
            { y: -0.04, duration: 1 },
          ],
          ease: "none",
          scrollTrigger: {
            trigger: scrollTarget,
            endTrigger: locationTarget ?? scrollTarget,
            start: "top top",
            end: scrollEnd,
            scrub: 1.2,
          },
        });

        gsap.to(shadow, {
          keyframes: [
            { scaleX: 0.86, opacity: 0.2, duration: 1 },
            { scaleX: 1.2, opacity: 0.38, duration: 1 },
            { scaleX: 0.94, opacity: 0.25, duration: 1 },
            { scaleX: 1.08, opacity: 0.32, duration: 1 },
          ],
          ease: "none",
          scrollTrigger: {
            trigger: scrollTarget,
            endTrigger: locationTarget ?? scrollTarget,
            start: "top top",
            end: scrollEnd,
            scrub: 1.2,
          },
        });
      }

      if (locationTarget) {
        const parkCupAtLocation = () => {
          const cupBottom = cupFrame.offsetTop + cupFrame.offsetHeight / 2;
          const locationTop = locationTarget.getBoundingClientRect().top;
          sceneElement.style.translate = `0 ${Math.min(0, locationTop - cupBottom)}px`;
        };

        window.addEventListener("scroll", parkCupAtLocation, { passive: true });
        window.addEventListener("resize", parkCupAtLocation);
        parkCupAtLocation();

        removeLocationLock = () => {
          window.removeEventListener("scroll", parkCupAtLocation);
          window.removeEventListener("resize", parkCupAtLocation);
          sceneElement.style.removeProperty("translate");
        };
      }
    }, sceneElement);

    ScrollTrigger.refresh();

    return () => {
      removeLocationLock();
      context.revert();
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frame);
      renderer.dispose();
      disposeScene(scene);
      renderer.domElement.remove();
    };
  }, [isArabic]);

  return (
    <div
      ref={sceneRef}
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      data-dopa-cup-scene
      aria-hidden="true"
    >
      <div
        ref={cupFrameRef}
        className="absolute left-1/2 top-[60%] h-[min(57vh,34rem)] w-[min(112vw,28rem)] -translate-x-1/2 -translate-y-1/2 sm:left-[64%] sm:top-[60%] sm:h-[min(78vh,49rem)] sm:w-[min(68vw,34rem)] md:left-[62%] md:top-[60%] md:h-[clamp(38rem,82vh,58rem)] md:w-[clamp(24rem,46vw,38rem)] lg:left-1/2 lg:top-[60%] lg:h-[clamp(42rem,88vh,64rem)] lg:w-[clamp(30rem,42vw,47rem)]"
      >
        <div
          ref={shadowRef}
          className="absolute bottom-[2%] left-[12%] h-[9%] w-[76%] rounded-[100%] bg-[#1b0f09]/45 blur-2xl will-change-transform"
        />
        <div ref={canvasHostRef} className="absolute inset-0" />
      </div>
    </div>
  );
}
