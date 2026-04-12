import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { SoftShadows, PerspectiveCamera, Edges } from "@react-three/drei";
import * as THREE from "three";

// --- MAZE DEFINITIONS ---
const DESKTOP_MAZE = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1],
  [2, 2, 2, 1, 0, 0, 0, 2, 0, 0, 0, 1, 2, 2, 2],
  [1, 1, 1, 1, 0, 1, 2, 2, 2, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  [2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const MOBILE_MAZE = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [2, 2, 1, 0, 0, 2, 0, 0, 1, 2, 2],
  [1, 1, 1, 0, 1, 2, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [2, 2, 1, 0, 0, 0, 0, 0, 1, 2, 2],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// --- UTILITIES ---
const getMazeConfig = (width) => {
  const isMobile = width < 768;
  const maze = isMobile ? MOBILE_MAZE : DESKTOP_MAZE;
  const cols = maze[0].length;
  const rows = maze.length;
  return { maze, cols, rows, cx: cols / 2, rz: rows / 2, isMobile };
};

// --- CAMERA CONTROLLER ---
// joystickOffset: { azimuth: radians, elevation: radians }
const CameraController = ({ view, isMobile, joystickOffset }) => {
  useFrame((state, delta) => {
    let basePos;
    if (view === "top") {
      basePos = isMobile ? [0, 32, 0.01] : [0, 24, 0.01];
    } else if (view === "side") {
      basePos = isMobile ? [28, 8, 0] : [22, 6, 0];
    } else {
      basePos = isMobile ? [0, 22, 18] : [0, 16, 12];
    }

    // Compute spherical radius from base position
    const base = new THREE.Vector3(...basePos);
    const radius = base.length();

    // Convert base to spherical
    let baseAzimuth = Math.atan2(base.x, base.z);
    let baseElevation = Math.asin(Math.max(-1, Math.min(1, base.y / radius)));

    // Apply joystick offset
    const az = baseAzimuth + (joystickOffset.current?.azimuth ?? 0);
    const el = Math.max(
      0.05,
      Math.min(Math.PI / 2 - 0.05,
        baseElevation + (joystickOffset.current?.elevation ?? 0)
      )
    );

    const targetPos = new THREE.Vector3(
      radius * Math.cos(el) * Math.sin(az),
      radius * Math.sin(el),
      radius * Math.cos(el) * Math.cos(az)
    );

    state.camera.position.lerp(targetPos, 4 * delta);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

// --- JOYSTICK WIDGET ---
const JOYSTICK_RADIUS = 40; // outer ring radius in px
const KNOB_RADIUS = 16;     // draggable knob radius in px
const SENSITIVITY = 0.018;  // radians per px

const Joystick = ({ joystickOffset, onStart }) => {
  const outerRef = useRef(null);
  const knobRef = useRef(null);
  const dragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const [touched, setTouched] = useState(false);

  const clampKnob = (dx, dy) => {
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = JOYSTICK_RADIUS - KNOB_RADIUS;
    if (dist > maxDist) {
      const ratio = maxDist / dist;
      return { x: dx * ratio, y: dy * ratio };
    }
    return { x: dx, y: dy };
  };

  const setKnobStyle = (x, y, spring = false) => {
    if (knobRef.current) {
      knobRef.current.style.transition = spring
        ? "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)"
        : "none";
      knobRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  // Attach move/up to window so dragging outside the ring still works
  const onPointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragging.current = true;
    if (!touched) setTouched(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    onStart?.();

    const onMove = (ev) => {
      if (!dragging.current) return;
      const dx = ev.clientX - startPos.current.x;
      const dy = ev.clientY - startPos.current.y;
      const clamped = clampKnob(dx, dy);
      setKnobStyle(clamped.x, clamped.y, false);
      if (joystickOffset.current) {
        joystickOffset.current.azimuth = dx * SENSITIVITY;
        joystickOffset.current.elevation = -dy * SENSITIVITY;
      }
    };

    const onUp = () => {
      dragging.current = false;
      setKnobStyle(0, 0, true);          // spring-snap back to center
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  // Inject keyframes once
  useEffect(() => {
    const id = "joystick-keyframes";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes joystick-ring-pulse {
        0%, 100% { box-shadow: 0 0 12px 2px rgba(0,255,200,0.35), inset 0 0 10px rgba(0,255,200,0.08); }
        50% { box-shadow: 0 0 28px 6px rgba(0,255,200,0.55), inset 0 0 18px rgba(0,255,200,0.15); }
      }
      @keyframes joystick-knob-wobble {
        0%, 100% { transform: translate(0px, 0px); }
        20% { transform: translate(5px, -3px); }
        40% { transform: translate(-4px, 4px); }
        60% { transform: translate(3px, 5px); }
        80% { transform: translate(-5px, -2px); }
      }
      @keyframes joystick-hint-bounce {
        0%, 100% { transform: translateY(0); opacity: 1; }
        50% { transform: translateY(-5px); opacity: 0.7; }
      }
      @keyframes joystick-arrow-flash {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 0.7; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div
      className="absolute z-50 pointer-events-auto"
      style={{ bottom: 80, left: 20 }}
      title="Drag to orbit camera"
    >
      {/* Label */}
      <p
        className="text-[10px] uppercase tracking-[0.25em] text-center mb-2 font-mono select-none font-bold"
        style={{
          background: "linear-gradient(90deg, #00ffc8, #cfa355, #00ffc8)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "joystick-arrow-flash 2s ease-in-out infinite",
        }}
      >
        Joystick : Change View
      </p>

      {/* "Drag me" floating hint — disappears after first touch */}
      {!touched && (
        <p
          className="text-[9px] text-center font-mono select-none mb-1 font-bold"
          style={{
            color: "#00ffc8",
            animation: "joystick-hint-bounce 1.2s ease-in-out infinite",
            textShadow: "0 0 8px rgba(0,255,200,0.6)",
          }}
        >
          ↕ Drag Me! ↔
        </p>
      )}

      {/* Outer ring */}
      <div
        ref={outerRef}
        onPointerDown={onPointerDown}
        className="relative flex items-center justify-center rounded-full cursor-grab active:cursor-grabbing select-none touch-none"
        style={{
          width: JOYSTICK_RADIUS * 2,
          height: JOYSTICK_RADIUS * 2,
          background: "radial-gradient(circle, rgba(0,255,200,0.1) 0%, rgba(0,0,0,0.4) 100%)",
          border: "2px solid rgba(0,255,200,0.4)",
          backdropFilter: "blur(10px)",
          animation: touched ? "none" : "joystick-ring-pulse 2s ease-in-out infinite",
        }}
      >
        {/* Cross-hair guides */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{ width: 1, height: "80%", background: "rgba(0,255,200,0.15)" }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{ width: "80%", height: 1, background: "rgba(0,255,200,0.15)" }} />
        </div>

        {/* Knob */}
        <div
          ref={knobRef}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: KNOB_RADIUS * 2,
            height: KNOB_RADIUS * 2,
            background: "radial-gradient(circle at 35% 35%, #ffffff, #cfa355 70%, #00ffc8)",
            boxShadow: "0 2px 16px rgba(0,255,200,0.5), 0 0 10px rgba(207,163,85,0.6), inset 0 -2px 6px rgba(0,0,0,0.3)",
            animation: (!touched && !dragging.current) ? "joystick-knob-wobble 2.5s ease-in-out infinite" : "none",
            transition: dragging.current ? "none" : "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />

        {/* Direction arrows — animated flash when untouched */}
        {[
          { label: "▲", top: 3, left: "50%", transform: "translateX(-50%)" },
          { label: "▼", bottom: 3, left: "50%", transform: "translateX(-50%)" },
          { label: "◀", left: 3, top: "50%", transform: "translateY(-50%)" },
          { label: "▶", right: 3, top: "50%", transform: "translateY(-50%)" },
        ].map((arrow, i) => (
          <span
            key={i}
            className="absolute pointer-events-none select-none"
            style={{
              fontSize: 8,
              color: touched ? "rgba(255,255,255,0.2)" : "#00ffc8",
              top: arrow.top,
              bottom: arrow.bottom,
              left: arrow.left,
              right: arrow.right,
              transform: arrow.transform,
              lineHeight: 1,
              animation: touched ? "none" : `joystick-arrow-flash 1.5s ease-in-out ${i * 0.2}s infinite`,
              textShadow: touched ? "none" : "0 0 6px rgba(0,255,200,0.6)",
            }}
          >
            {arrow.label}
          </span>
        ))}
      </div>
    </div>
  );
};

// --- GAME LOGIC COMPONENT ---
const PacManEngine = ({ gameState, setScore, setGameOver, setGameWon, pelletRefs, userInteracted, config }) => {
  const playerRef = useRef();
  const ghostRefs = useRef([]);
  const { maze, cols, rows, cx, rz } = config;

  const getPos = (currX, currZ) => [currX - Math.floor(cx), 0.5, currZ - Math.floor(rz)];
  const totalPellets = useMemo(() => maze.flat().filter(cell => cell === 0).length, [maze]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const gs = gameState.current;
      if (gs.gameOver || gs.gameWon) return;
      const validKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
      if (validKeys.includes(e.key)) {
        userInteracted.current = true;
        if (e.key === "ArrowLeft") { gs.player.nextDir = { x: -1, z: 0 }; e.preventDefault(); }
        if (e.key === "ArrowRight") { gs.player.nextDir = { x: 1, z: 0 }; e.preventDefault(); }
        if (e.key === "ArrowUp") { gs.player.nextDir = { x: 0, z: -1 }; e.preventDefault(); }
        if (e.key === "ArrowDown") { gs.player.nextDir = { x: 0, z: 1 }; e.preventDefault(); }
      }
    };
    window.addEventListener("keydown", handleKeyDown, { capture: false });
    return () => window.removeEventListener("keydown", handleKeyDown, { capture: false });
  }, [gameState, userInteracted]);

  const moveEntity = (entity, dt, isPlayer = false) => {
    const gs = gameState.current;
    const targetX = entity.x + entity.dir.x;
    const targetZ = entity.z + entity.dir.z;
    const overX = entity.dir.x > 0 ? entity.fx >= targetX : entity.dir.x < 0 ? entity.fx <= targetX : false;
    const overZ = entity.dir.z > 0 ? entity.fz >= targetZ : entity.dir.z < 0 ? entity.fz <= targetZ : false;

    if (overX || overZ || (entity.dir.x === 0 && entity.dir.z === 0)) {
      if (entity.dir.x !== 0 || entity.dir.z !== 0) {
        entity.fx = targetX; entity.fz = targetZ;
        entity.x = targetX; entity.z = targetZ;
      }
      if (isPlayer) {
        if (gs.maze[entity.z]?.[entity.x] === 0) {
          gs.maze[entity.z][entity.x] = 2;
          gs.score += 10; gs.eatenCount += 1;
          setScore(gs.score);
          const pelletMesh = pelletRefs.current.get(`${entity.x}-${entity.z}`);
          if (pelletMesh) pelletMesh.visible = false;
          if (gs.eatenCount === totalPellets) { gs.gameWon = true; setGameWon(true); }
        }
        if (entity.nextDir.x !== 0 || entity.nextDir.z !== 0) {
          const checkX = entity.x + entity.nextDir.x;
          const checkZ = entity.z + entity.nextDir.z;
          if (gs.maze[checkZ]?.[checkX] !== 1) {
            entity.dir = { ...entity.nextDir };
            entity.nextDir = { x: 0, z: 0 };
          }
        }
      } else {
        const possibleDirs = [
          { x: 1, z: 0 }, { x: -1, z: 0 }, { x: 0, z: 1 }, { x: 0, z: -1 }
        ].filter(d => {
          if (d.x === -entity.dir.x && d.z === -entity.dir.z && (entity.dir.x !== 0 || entity.dir.z !== 0)) return false;
          return gs.maze[entity.z + d.z]?.[entity.x + d.x] !== 1 && gs.maze[entity.z + d.z]?.[entity.x + d.x] !== undefined;
        });
        entity.dir = possibleDirs.length > 0
          ? possibleDirs[Math.floor(Math.random() * possibleDirs.length)]
          : { x: -entity.dir.x, z: -entity.dir.z };
      }
      const fwdX = entity.x + entity.dir.x;
      const fwdZ = entity.z + entity.dir.z;
      if (gs.maze[fwdZ]?.[fwdX] === 1) entity.dir = { x: 0, z: 0 };
    }
    entity.fx += entity.dir.x * entity.speed * dt;
    entity.fz += entity.dir.z * entity.speed * dt;
  };

  useFrame((state, delta) => {
    const gs = gameState.current;
    if (gs.gameOver || gs.gameWon) return;
    const dt = Math.min(delta, 0.1);
    moveEntity(gs.player, dt, true);
    if (playerRef.current) {
      const p3 = getPos(gs.player.fx, gs.player.fz);
      playerRef.current.position.set(...p3);
      if (gs.player.dir.x !== 0 || gs.player.dir.z !== 0) {
        const targetAngle = Math.atan2(gs.player.dir.x, gs.player.dir.z);
        playerRef.current.rotation.y = THREE.MathUtils.lerp(playerRef.current.rotation.y, targetAngle, 10 * dt);
      }
    }
    gs.ghosts.forEach((ghost, idx) => {
      moveEntity(ghost, dt, false);
      const mRef = ghostRefs.current[idx];
      if (mRef) { const g3 = getPos(ghost.fx, ghost.fz); mRef.position.set(...g3); }
      const dx = gs.player.fx - ghost.fx;
      const dz = gs.player.fz - ghost.fz;
      if (dx * dx + dz * dz < 0.6) { gs.gameOver = true; setGameOver(true); }
    });
  });

  return (
    <group>
      {maze.map((row, z) => row.map((cell, x) => {
        if (cell === 1) return (
          <mesh key={`wall-${x}-${z}`} position={getPos(x, z)} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#cc0000" emissive="#440000" roughness={0.5} metalness={0.3} />
            <Edges scale={1.02} threshold={15} color="white" />
          </mesh>
        );
        if (cell === 0) return (
          <mesh key={`pellet-${x}-${z}`} position={[x - Math.floor(cx), 0.2, z - Math.floor(rz)]}
            ref={(el) => pelletRefs.current.set(`${x}-${z}`, el)}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#e5e5e0" emissive="#e5e5e0" emissiveIntensity={0.5} />
          </mesh>
        );
        return null;
      }))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[cols, rows]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh ref={playerRef} castShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#cfa355" roughness={0.4} />
      </mesh>
      {gameState.current.ghosts.map((g, i) => (
        <mesh key={`ghost-${i}`} ref={(el) => (ghostRefs.current[i] = el)} castShadow>
          <boxGeometry args={[0.7, 0.8, 0.7]} />
          <meshStandardMaterial color={g.color} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
};

// --- MAIN GAME SECTION ---
const Game = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);
  const [cameraView, setCameraView] = useState("isometric");

  const userInteracted = useRef(false);
  const pelletRefs = useRef(new Map());

  // Joystick offset: accumulated azimuth + elevation deltas in radians
  const joystickOffset = useRef({ azimuth: 0, elevation: 0 });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const config = useMemo(() => getMazeConfig(windowWidth), [windowWidth]);

  const getInitialGameState = (cfg) => {
    const spawnX = cfg.isMobile ? 5 : 7;
    return {
      maze: JSON.parse(JSON.stringify(cfg.maze)),
      score: 0, eatenCount: 0, gameOver: false, gameWon: false,
      player: { x: spawnX, z: 11, fx: spawnX, fz: 11, dir: { x: 0, z: 0 }, nextDir: { x: 0, z: 0 }, speed: 5 },
      ghosts: [
        { x: spawnX, z: 6, fx: spawnX, fz: 6, dir: { x: 0, z: -1 }, speed: 3.5, color: '#ff4d4d' },
        { x: spawnX - 1, z: 7, fx: spawnX - 1, fz: 7, dir: { x: 1, z: 0 }, speed: 3.2, color: '#4dffff' },
        { x: spawnX + 1, z: 7, fx: spawnX + 1, fz: 7, dir: { x: -1, z: 0 }, speed: 3.8, color: '#ffb84d' },
      ],
    };
  };

  const gameState = useRef(getInitialGameState(config));

  useEffect(() => {
    if (!userInteracted.current && !gameOver && !gameWon) {
      gameState.current = getInitialGameState(config);
      pelletRefs.current.forEach((mesh) => { if (mesh) mesh.visible = true; });
    }
  }, [config, gameOver, gameWon]);

  const touchStart = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    userInteracted.current = true;
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e) => {
    const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    const dx = touchEnd.x - touchStart.current.x;
    const dy = touchEnd.y - touchStart.current.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 30) gameState.current.player.nextDir = { x: 1, z: 0 };
      else if (dx < -30) gameState.current.player.nextDir = { x: -1, z: 0 };
    } else {
      if (dy > 30) gameState.current.player.nextDir = { x: 0, z: 1 };
      else if (dy < -30) gameState.current.player.nextDir = { x: 0, z: -1 };
    }
  };

  const restartGame = () => {
    gameState.current = getInitialGameState(config);
    setScore(0); setGameOver(false); setGameWon(false);
    pelletRefs.current.forEach((mesh) => { if (mesh) mesh.visible = true; });
  };

  useEffect(() => {
    if (gameOver || gameWon) {
      const timer = setTimeout(restartGame, 2500);
      return () => clearTimeout(timer);
    }
  }, [gameOver, gameWon, config]);

  useEffect(() => {
    const handleScroll = () => {
      if (userInteracted.current) return;
      const section = document.getElementById("game");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      let progress = 1 - (rect.bottom / (windowHeight + rect.height));
      progress = Math.max(0, Math.min(1, progress));
      if (progress < 0.35) setCameraView("top");
      else if (progress < 0.65) setCameraView("isometric");
      else setCameraView("side");
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle camera + RESET joystick offset
  const toggleView = () => {
    userInteracted.current = true;
    joystickOffset.current = { azimuth: 0, elevation: 0 }; // reset orbit on toggle
    const views = ["isometric", "top", "side"];
    const nextIndex = (views.indexOf(cameraView) + 1) % views.length;
    setCameraView(views[nextIndex]);
  };

  // Called when joystick starts dragging — mark user as interacted
  const handleJoystickStart = useCallback(() => {
    userInteracted.current = true;
  }, []);

  return (
    <section id="game" className="relative w-full h-[80vh] md:h-screen bg-black overflow-hidden border-y border-black/10">
      {/* Overlay UI */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center p-4">
        {gameOver && (
          <div className="bg-black/90 p-6 md:p-10 rounded-2xl md:rounded-3xl flex flex-col items-center pointer-events-auto border-4 border-red-500/40 backdrop-blur-xl scale-90 md:scale-110 mb-20 shadow-[0_0_80px_rgba(255,0,0,0.3)] transition-all">
            <h2 className="text-3xl md:text-5xl text-red-500 font-amiamie font-black mb-4 uppercase tracking-widest text-center">
              You Lost<br />Try Again
            </h2>
            <div className="w-16 h-1 bg-red-500/30 mb-4" />
            <p className="text-white text-base md:text-lg font-light">Points Scored: <span className="font-bold text-gold text-xl md:text-2xl">{score}</span></p>
            <p className="text-red-500/60 mt-4 text-xs md:text-sm animate-pulse uppercase tracking-[0.2em] font-bold">Restarting Simulation...</p>
          </div>
        )}

        {gameWon && (
          <div className="bg-black/90 p-6 md:p-10 rounded-2xl md:rounded-3xl flex flex-col items-center pointer-events-auto border-4 border-gold/40 backdrop-blur-xl scale-90 md:scale-110 mb-20 shadow-[0_0_80px_rgba(255,215,0,0.3)] transition-all">
            <h2 className="text-3xl md:text-5xl text-gold font-amiamie font-black mb-4 uppercase tracking-widest text-center">
              You Won<br />Starting Again
            </h2>
            <div className="w-16 h-1 bg-gold/30 mb-4" />
            <p className="text-white text-base md:text-lg font-light">All Nodes Captured!</p>
            <p className="text-gold/60 mt-4 text-xs md:text-sm animate-pulse uppercase tracking-[0.2em] font-bold">Restarting Simulation...</p>
          </div>
        )}

        {(!gameOver && !gameWon) && (
          <>
            {/* Score — top left */}
            <div className="absolute top-4 left-4 md:top-10 md:left-10 bg-black/60 px-4 py-2 md:px-8 md:py-3 rounded-full border border-white/10 backdrop-blur-md">
              <p className="text-white font-amiamie text-lg md:text-2xl tracking-widest uppercase">
                Score: <span className="text-gold font-bold">{score}</span>
              </p>
            </div>

            {/* Toggle Camera — top right */}
            <button
              onClick={toggleView}
              className="absolute top-4 right-4 md:top-10 md:right-10 px-4 py-3 md:px-8 md:py-4 rounded-full text-white uppercase tracking-tighter md:tracking-widest font-black pointer-events-auto active:scale-95 outline-none bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 shadow-[0_0_20px_rgba(255,0,128,0.5)] hover:shadow-[0_0_40px_rgba(255,0,128,0.8)] hover:scale-105 border border-white/20 animate-[pulse_2s_infinite] transition-all duration-300 z-50 text-[10px] md:text-base cursor-pointer"
            >
              Toggle Camera: {cameraView}
            </button>

            {/* Joystick — bottom left */}
            <Joystick
              joystickOffset={joystickOffset}
              onStart={handleJoystickStart}
            />

            {/* Hint — bottom center */}
            <p className="absolute bottom-4 md:bottom-10 text-white/40 tracking-[0.1em] md:tracking-[0.3em] uppercase font-bold text-[10px] md:text-sm pointer-events-none text-center">
              Use Arrow Keys or Swipe to take control
            </p>
          </>
        )}
      </div>

      <div
        className="w-full h-full"
        style={{ touchAction: (!gameOver && !gameWon) ? "none" : "auto" }}
        onTouchStart={(!gameOver && !gameWon) ? handleTouchStart : undefined}
        onTouchEnd={(!gameOver && !gameWon) ? handleTouchEnd : undefined}
      >
        <Canvas shadows>
          <CameraController view={cameraView} isMobile={config.isMobile} joystickOffset={joystickOffset} />
          <PerspectiveCamera makeDefault position={[0, 16, 12]} fov={50} />
          <SoftShadows size={25} samples={16} focus={0.5} />
          <ambientLight intensity={0.4} />
          <directionalLight castShadow position={[5, 20, 5]} intensity={1.5} shadow-mapSize={[2048, 2048]} />
          <PacManEngine
            gameState={gameState}
            setScore={setScore}
            setGameOver={setGameOver}
            setGameWon={setGameWon}
            pelletRefs={pelletRefs}
            userInteracted={userInteracted}
            config={config}
          />
        </Canvas>
      </div>
    </section>
  );
};

export default Game;
