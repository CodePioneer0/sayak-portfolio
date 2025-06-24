import React, { useEffect, useRef, useCallback } from "react";

/**
 * Props for the SimpleCodeMatrix component
 */
interface SimpleCodeMatrixProps {
  className?: string;
}

/**
 * Particle class for creating animated floating shapes
 * Handles individual particle physics, rendering, and lifecycle
 */
class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  shape: "circle" | "square" | "triangle" | "diamond";
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  pulseSpeed: number;
  trail: { x: number; y: number; opacity: number }[];

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 8 + 3;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.05;
    this.opacity = Math.random() * 0.6 + 0.2;
    this.pulseSpeed = Math.random() * 0.02 + 0.01;
    this.trail = [];

    const colors = ["#3b82f6", "#22d3ee", "#6366f1", "#8b5cf6", "#06b6d4"];
    this.color = colors[Math.floor(Math.random() * colors.length)];

    const shapes = ["circle", "square", "triangle", "diamond"] as const;
    this.shape = shapes[Math.floor(Math.random() * shapes.length)];
  }

  update(time: number, canvasWidth: number, canvasHeight: number) {
    // Add current position to trail
    this.trail.push({ x: this.x, y: this.y, opacity: this.opacity });
    if (this.trail.length > 5) {
      this.trail.shift();
    }

    // Update position
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;

    // Pulsing effect
    this.opacity = 0.3 + Math.sin(time * this.pulseSpeed) * 0.3;

    // Bounce off edges
    if (this.x < 0 || this.x > canvasWidth) {
      this.speedX *= -0.8;
      this.x = Math.max(0, Math.min(canvasWidth, this.x));
    }
    if (this.y < 0 || this.y > canvasHeight) {
      this.speedY *= -0.8;
      this.y = Math.max(0, Math.min(canvasHeight, this.y));
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    // Draw trail
    this.trail.forEach((point, index) => {
      const trailOpacity = (index / this.trail.length) * this.opacity * 0.3;
      ctx.globalAlpha = trailOpacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, this.size * 0.3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw main particle
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    ctx.beginPath();
    switch (this.shape) {
      case "circle":
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        break;
      case "square":
        ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
        break;
      case "triangle":
        ctx.moveTo(0, -this.size);
        ctx.lineTo(-this.size * 0.8, this.size * 0.6);
        ctx.lineTo(this.size * 0.8, this.size * 0.6);
        ctx.closePath();
        break;
      case "diamond":
        ctx.moveTo(0, -this.size);
        ctx.lineTo(this.size, 0);
        ctx.lineTo(0, this.size);
        ctx.lineTo(-this.size, 0);
        ctx.closePath();
        break;
    }
    ctx.fill();

    // Add glow effect
    ctx.shadowColor = this.color;
    ctx.shadowBlur = this.size * 2;
    ctx.fill();

    ctx.restore();
  }
}

/**
 * Interactive particle-based background animation component
 * Features floating geometric shapes, mouse interaction, and confetti effects
 * Optimized for 60fps performance with efficient rendering
 */
const SimpleCodeMatrix = ({ className = "" }: SimpleCodeMatrixProps) => {
  // Performance constants
  const PARTICLE_COUNT = 20; // Reduced for better performance
  const MAX_CONFETTI = 50; // Limit confetti particles
  const CONFETTI_BURST_SIZE = 8; // Reduced burst size
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const isVisible = useRef(true);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const clickCountRef = useRef(0);
  const confettiRef = useRef<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      life: number;
      size: number;
    }>
  >([]);

  const animate = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      time: number
    ) => {
      // Performance optimization: skip if not visible
      if (!isVisible.current) {
        animationRef.current = requestAnimationFrame((newTime) =>
          animate(ctx, canvas, newTime)
        );
        return;
      }

      try {
        // Create gradient background that changes over time
        const gradient = ctx.createRadialGradient(
          canvas.width / 2 + Math.sin(time * 0.001) * 100,
          canvas.height / 2 + Math.cos(time * 0.001) * 100,
          0,
          canvas.width / 2,
          canvas.height / 2,
          Math.max(canvas.width, canvas.height)
        );

        // Dynamic background colors
        const hue1 = (time * 0.05) % 360;
        const hue2 = (time * 0.03 + 60) % 360;
        gradient.addColorStop(0, `hsla(${hue1}, 70%, 20%, 0.03)`);
        gradient.addColorStop(0.5, `hsla(${hue2}, 60%, 15%, 0.02)`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.01)");

        // Clear with gradient
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add subtle overlay
        ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particlesRef.current.forEach((particle) => {
          particle.update(time, canvas.width, canvas.height);
          particle.draw(ctx);
        }); // Draw connection lines between nearby particles (optimized)
        ctx.strokeStyle = "rgba(59, 130, 246, 0.1)";
        ctx.lineWidth = 1;
        const maxDistance = 150;
        const maxDistanceSquared = maxDistance * maxDistance;

        for (let i = 0; i < particlesRef.current.length - 1; i++) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const p1 = particlesRef.current[i];
            const p2 = particlesRef.current[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distanceSquared = dx * dx + dy * dy;

            if (distanceSquared < maxDistanceSquared) {
              const distance = Math.sqrt(distanceSquared);
              ctx.globalAlpha = ((maxDistance - distance) / maxDistance) * 0.2;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

        // Add floating tech icons (emoji style)
        ctx.globalAlpha = 0.4;
        ctx.font = "20px monospace";
        const techIcons = ["⚛️", "🚀", "💻", "🔧", "⚡", "🎨", "🌟", "💎"];
        techIcons.forEach((icon, index) => {
          const x =
            (canvas.width / techIcons.length) * index +
            Math.sin(time * 0.002 + index) * 50;
          const y = 50 + Math.cos(time * 0.003 + index) * 20;
          ctx.fillText(icon, x, y);
        });

        // Add floating tech icons that react to mouse hover
        if (mouseRef.current.x !== 0 || mouseRef.current.y !== 0) {
          ctx.globalAlpha = 0.6;
          ctx.font = "bold 24px monospace";
          const interactiveIcons = ["{ }", "</>", "λ", "∞", "◉", "◈"];
          interactiveIcons.forEach((icon, index) => {
            const distance = Math.sqrt(
              (mouseRef.current.x -
                (canvas.width / interactiveIcons.length) * index) **
                2 +
                (mouseRef.current.y - 100) ** 2
            );
            const scale = Math.max(0.5, 1 - distance / 200);
            ctx.save();
            ctx.translate(
              (canvas.width / interactiveIcons.length) * index,
              100
            );
            ctx.scale(scale, scale);
            ctx.fillStyle = distance < 100 ? "#22d3ee" : "#3b82f6";
            ctx.fillText(icon, 0, 0);
            ctx.restore();
          });
        }

        // Add pulsing dots in corners
        const corners = [
          { x: 50, y: 50 },
          { x: canvas.width - 50, y: 50 },
          { x: 50, y: canvas.height - 50 },
          { x: canvas.width - 50, y: canvas.height - 50 },
        ];

        corners.forEach((corner, index) => {
          const pulse = Math.sin(time * 0.003 + index) * 0.5 + 0.5;
          ctx.globalAlpha = pulse * 0.4;
          ctx.fillStyle = "#6366f1";
          ctx.beginPath();
          ctx.arc(corner.x, corner.y, 8 + pulse * 4, 0, Math.PI * 2);
          ctx.fill();

          // Add ripple effect
          ctx.strokeStyle = "#6366f1";
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.2;
          ctx.beginPath();
          ctx.arc(corner.x, corner.y, 15 + pulse * 10, 0, Math.PI * 2);
          ctx.stroke();
        }); // Update and draw confetti (optimized removal)
        ctx.globalAlpha = 1;
        for (let i = confettiRef.current.length - 1; i >= 0; i--) {
          const confetto = confettiRef.current[i];
          if (confetto.life <= 0) {
            confettiRef.current.splice(i, 1);
            continue;
          }

          confetto.x += confetto.vx;
          confetto.y += confetto.vy;
          confetto.vy += 0.05; // Gravity
          confetto.life -= 1;

          ctx.fillStyle = confetto.color;
          ctx.globalAlpha = confetto.life / 100; // Fade out effect
          ctx.beginPath();
          ctx.arc(confetto.x, confetto.y, confetto.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      } catch (error) {
        // Gracefully handle animation errors in production
        console.warn("Animation error:", error);
      }

      animationRef.current = requestAnimationFrame((newTime) =>
        animate(ctx, canvas, newTime)
      );
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr); // Recreate particles when canvas resizes
      particlesRef.current = Array.from(
        { length: PARTICLE_COUNT },
        () => new Particle(window.innerWidth, window.innerHeight)
      );
    };
    updateSize();

    // Initialize particles
    particlesRef.current = Array.from(
      { length: PARTICLE_COUNT },
      () => new Particle(window.innerWidth, window.innerHeight)
    );

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateSize, 100);
    };
    window.addEventListener("resize", handleResize);

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Add particle attraction to mouse
      particlesRef.current.forEach((particle) => {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          particle.speedX += dx * 0.0001;
          particle.speedY += dy * 0.0001;
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Click interaction for confetti
    const handleClick = (e: MouseEvent) => {
      clickCountRef.current += 1; // Add confetti burst on click (with limits for performance)
      if (confettiRef.current.length < MAX_CONFETTI) {
        for (let i = 0; i < CONFETTI_BURST_SIZE; i++) {
          const confetto = {
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            life: 100,
            size: Math.random() * 3 + 2,
          };
          confettiRef.current.push(confetto);
        }
      }
    };
    window.addEventListener("click", handleClick);

    const handleVisibilityChange = () => {
      isVisible.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Start animation
    animationRef.current = requestAnimationFrame((time) =>
      animate(ctx, canvas, time)
    );

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);
  return (
    <div className={`absolute inset-0 ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          background: "transparent",
          willChange: "transform",
        }}
        aria-hidden="true"
        role="presentation"
      />
    </div>
  );
};

export default SimpleCodeMatrix;
