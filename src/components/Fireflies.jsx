import React, { useRef, useEffect } from "react";

const NUM_FIREFLIES = 30;

const Fireflies = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const fireflies = Array.from({ length: NUM_FIREFLIES }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 2 + Math.random() * 3,
      speedX: -0.5 + Math.random(),
      speedY: -0.5 + Math.random(),
    }));

    const animate = () => {
      const ctx = containerRef.current.getContext("2d");
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      fireflies.forEach(f => {
        f.x += f.speedX;
        f.y += f.speedY;

        if (f.x < 0 || f.x > window.innerWidth) f.speedX *= -1;
        if (f.y < 0 || f.y > window.innerHeight) f.speedY *= -1;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 200, 0.8)";
        ctx.shadowColor = "rgba(255,255,150,0.7)";
        ctx.shadowBlur = 10;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <canvas
      ref={containerRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className="fixed top-0 left-0 z-0 pointer-events-none"
    />
  );
};

export default Fireflies;
