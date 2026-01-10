'use client'

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

interface ParticleBackgroundProps {
  contentBoxRef: React.RefObject<HTMLDivElement | null>;
}

const MOBILE_BREAKPOINT = 768;

export default function ParticleBackground({ contentBoxRef }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || isMobile) return;

    const canvas = canvasRef.current;

    // Scene setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.6,
      0.5,
      0.3
    );
    composer.addPass(bloomPass);

    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    // Brand color: #8B5CF6 (Aztec Purple)
    const brandColor = 0x8B5CF6;
    const particleColor = 0x8B5CF6; // Aztec purple for particles
    const burstColor = 0xc4b5fd; // Lighter purple for bursts

    // Convert screen coordinates to world coordinates
    function screenToWorld(screenX: number, screenY: number): THREE.Vector3 {
      const vec = new THREE.Vector3();
      vec.set(
        (screenX / window.innerWidth) * 2 - 1,
        -(screenY / window.innerHeight) * 2 + 1,
        0.5
      );
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      return pos;
    }

    // Get circle bounds in world coordinates
    function getCircleBounds() {
      if (!contentBoxRef.current) {
        return { centerX: 0, centerY: 0, radius: 2 };
      }
      const rect = contentBoxRef.current.getBoundingClientRect();
      const centerScreen = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      const center = screenToWorld(centerScreen.x, centerScreen.y);
      // Use half the width as radius (it's a square element), increased by 25%
      const edgePoint = screenToWorld(rect.right, centerScreen.y);
      const radius = Math.abs(edgePoint.x - center.x) * 1.25;
      return {
        centerX: center.x,
        centerY: center.y,
        radius: radius
      };
    }

    // Particle system
    const particles: Particle[] = [];
    const MAX_PARTICLES = 10;
    const PARTICLE_POOL: Particle[] = [];
    const burstParticles: BurstParticle[] = [];
    const MAX_BURST_PARTICLES = 150;

    class Particle {
      mesh: THREE.Mesh;
      velocity: THREE.Vector3;
      active: boolean;
      life: number;
      maxLife: number;
      originalOpacity: number;
      speed: number;

      constructor() {
        const size = 0.03 + Math.random() * 0.04;
        const geometry = new THREE.CircleGeometry(size, 8);
        const material = new THREE.MeshBasicMaterial({
          color: particleColor,
          transparent: true,
          opacity: 0.5 + Math.random() * 0.4,
          side: THREE.DoubleSide
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.velocity = new THREE.Vector3();
        this.active = false;
        this.life = 1;
        this.maxLife = 1;
        this.originalOpacity = (material as THREE.MeshBasicMaterial).opacity;
        this.speed = 0;

        scene.add(this.mesh);
        this.mesh.visible = false;
      }

      spawn() {
        const fromLeft = Math.random() < 0.5;
        const aspect = window.innerWidth / window.innerHeight;
        const viewHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
        const viewWidth = viewHeight * aspect;
        const margin = 1;

        const zDepth = (Math.random() - 0.5) * 0.5;

        // Get circle bounds to control spawn positions
        const circle = getCircleBounds();

        // 15% above, 15% below, 70% will hit the circle
        const spawnType = Math.random();
        let spawnY: number;

        if (spawnType < 0.15) {
          // Spawn above circle
          spawnY = circle.centerY + circle.radius + Math.random() * (viewHeight / 2 - circle.centerY - circle.radius);
        } else if (spawnType < 0.30) {
          // Spawn below circle
          spawnY = circle.centerY - circle.radius - Math.random() * (viewHeight / 2 + circle.centerY - circle.radius);
        } else {
          // Spawn at heights that will hit the circle
          spawnY = circle.centerY + (Math.random() - 0.5) * circle.radius * 1.8;
        }

        if (fromLeft) {
          this.mesh.position.set(-viewWidth / 2 - margin, spawnY, zDepth);
        } else {
          this.mesh.position.set(viewWidth / 2 + margin, spawnY, zDepth);
        }

        const targetX = fromLeft ? viewWidth / 2 + margin : -viewWidth / 2 - margin;
        const targetY = this.mesh.position.y + (Math.random() - 0.5) * 1;
        const target = new THREE.Vector3(targetX, targetY, zDepth);

        this.velocity.copy(target).sub(this.mesh.position).normalize();
        this.speed = 0.014 + Math.random() * 0.017;
        this.velocity.multiplyScalar(this.speed);

        this.life = 1;
        this.maxLife = 2.5 + Math.random() * 2;
        this.active = true;
        this.mesh.visible = true;
        (this.mesh.material as THREE.MeshBasicMaterial).opacity = this.originalOpacity;
      }

      update(deltaTime: number) {
        if (!this.active) return;

        const prevX = this.mesh.position.x;
        const prevY = this.mesh.position.y;

        this.mesh.position.add(this.velocity);

        const circle = getCircleBounds();
        const px = this.mesh.position.x;
        const py = this.mesh.position.y;

        // Calculate distance from circle center
        const dx = px - circle.centerX;
        const dy = py - circle.centerY;
        const distFromCenter = Math.sqrt(dx * dx + dy * dy);

        const prevDx = prevX - circle.centerX;
        const prevDy = prevY - circle.centerY;
        const prevDistFromCenter = Math.sqrt(prevDx * prevDx + prevDy * prevDy);

        // Check if particle crossed into the circle
        if (prevDistFromCenter >= circle.radius && distFromCenter < circle.radius) {
          // Move particle to circle edge for burst position
          const angle = Math.atan2(dy, dx);
          this.mesh.position.x = circle.centerX + Math.cos(angle) * circle.radius;
          this.mesh.position.y = circle.centerY + Math.sin(angle) * circle.radius;
          this.createBurst();
          this.deactivate();
          return;
        }

        // Also check if particle is inside circle (in case it spawned inside)
        if (distFromCenter < circle.radius) {
          this.createBurst();
          this.deactivate();
          return;
        }

        this.life -= deltaTime / this.maxLife;

        if (this.life <= 0) {
          this.deactivate();
          return;
        }

        if (this.life < 0.3) {
          (this.mesh.material as THREE.MeshBasicMaterial).opacity = this.originalOpacity * (this.life / 0.3);
        }
      }

      createBurst() {
        const burstCount = 4 + Math.floor(Math.random() * 4);
        for (let i = 0; i < burstCount; i++) {
          const burst = getBurstParticle();
          if (burst) burst.spawn(this.mesh.position.clone());
        }
      }

      deactivate() {
        this.active = false;
        this.mesh.visible = false;
        PARTICLE_POOL.push(this);
      }
    }

    class BurstParticle {
      mesh: THREE.Mesh;
      velocity: THREE.Vector3;
      active: boolean;
      life: number;

      constructor() {
        const geometry = new THREE.CircleGeometry(0.01, 6);
        const material = new THREE.MeshBasicMaterial({
          color: burstColor,
          transparent: true,
          opacity: 1
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.velocity = new THREE.Vector3();
        this.active = false;
        this.life = 1;

        scene.add(this.mesh);
        this.mesh.visible = false;
      }

      spawn(position: THREE.Vector3) {
        this.mesh.position.copy(position);

        const angle = Math.random() * Math.PI * 2;
        const speed = 0.02 + Math.random() * 0.03;
        this.velocity.set(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          (Math.random() - 0.5) * speed * 0.3
        );

        this.life = 1;
        this.active = true;
        this.mesh.visible = true;
        (this.mesh.material as THREE.MeshBasicMaterial).opacity = 1;
      }

      update(deltaTime: number) {
        if (!this.active) return;

        this.mesh.position.add(this.velocity);
        this.velocity.multiplyScalar(0.94);

        this.life -= deltaTime * 2.5;

        if (this.life <= 0) {
          this.active = false;
          this.mesh.visible = false;
          return;
        }

        (this.mesh.material as THREE.MeshBasicMaterial).opacity = this.life;
        this.mesh.scale.setScalar(this.life);
      }
    }

    // Initialize pools
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const p = new Particle();
      PARTICLE_POOL.push(p);
      particles.push(p);
    }

    for (let i = 0; i < MAX_BURST_PARTICLES; i++) {
      burstParticles.push(new BurstParticle());
    }

    function getParticle(): Particle | null {
      return PARTICLE_POOL.length > 0 ? PARTICLE_POOL.pop()! : null;
    }

    function getBurstParticle(): BurstParticle | null {
      for (const bp of burstParticles) {
        if (!bp.active) return bp;
      }
      return null;
    }

    let spawnTimer = 0;
    const spawnRate = 0.12;

    // Ambient dots
    const ambientDotsCount = 80;
    const ambientPositions = new Float32Array(ambientDotsCount * 3);

    for (let i = 0; i < ambientDotsCount; i++) {
      ambientPositions[i * 3] = (Math.random() - 0.5) * 25;
      ambientPositions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      ambientPositions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 4;
    }

    const ambientGeometry = new THREE.BufferGeometry();
    ambientGeometry.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3));

    const ambientMaterial = new THREE.PointsMaterial({
      color: brandColor,
      size: 0.04,
      transparent: true,
      opacity: 0.25,
      sizeAttenuation: true
    });

    const ambientDots = new THREE.Points(ambientGeometry, ambientMaterial);
    scene.add(ambientDots);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let lastTime = performance.now();
    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);

      const now = performance.now();
      const deltaTime = (now - lastTime) / 1000;
      lastTime = now;

      // Spawn particles
      spawnTimer += deltaTime;
      if (spawnTimer >= spawnRate) {
        spawnTimer = 0;
        const p = getParticle();
        if (p) p.spawn();
      }

      // Update particles
      for (const p of particles) {
        p.update(deltaTime);
      }

      for (const bp of burstParticles) {
        bp.update(deltaTime);
      }

      // Animate ambient dots
      const time = now * 0.001;
      const positions = ambientGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < ambientDotsCount; i++) {
        positions[i * 3 + 1] += Math.sin(time + i) * 0.0004;
        positions[i * 3] += Math.cos(time * 0.5 + i * 0.1) * 0.0002;
      }
      ambientGeometry.attributes.position.needsUpdate = true;

      composer.render();
    }

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      scene.clear();
    };
  }, [contentBoxRef, isMobile]);

  // Don't render canvas on mobile
  if (isMobile) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
    />
  );
}
