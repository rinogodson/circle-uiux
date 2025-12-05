/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef, useState } from "react";

const describeTheSVGArc = (
  // silly name yeahh!!
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) => {
  const start = polToCart(x, y, radius, endAngle);
  const end = polToCart(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
};

const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

const polToCart = (
  centerX: number,
  centerY: number,
  radius: number,
  angle: number,
) => {
  const angleInRadians = ((angle - 90) * Math.PI) / 180;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

function ProgressBar({
  size,
  stroke,
  span,
  sP,
  p,
}: {
  size: number;
  stroke: number;
  span: number;
  sP: any;
  p: number;
}) {
  const center = size / 2;
  const radius = (size - stroke) / 2;

  const arcSpan = span;
  const startAng = -arcSpan / 2; // -54
  const endAng = arcSpan / 2; // 54

  const svgRef = useRef<SVGSVGElement>(null);

  const [dragging, setDragging] = useState<boolean>(false);

  const calculateProgress = useCallback(
    (cX: number, cY: number) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.width / 2;

      const x = cX - centerX;
      const y = cY - centerY;

      let angDeg = Math.atan2(y, x) * (180 / Math.PI) + 90;
      if (angDeg > 180) angDeg -= 360;

      const clampedAngle = Math.max(startAng, Math.min(endAng, angDeg));

      if (Math.abs(angDeg) > 90) {
        return null;
      }

      const neoProgress = mapRange(clampedAngle, startAng, endAng, 0, 100);
      return neoProgress;
    },
    [startAng, endAng],
  );

  const handleMouseDown = (e: React.PointerEvent<SVGElement>) => {
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    const newProgress = calculateProgress(e.clientX, e.clientY);
    if (newProgress !== null) sP(Number(newProgress));
  };

  const handleMouseMove = (e: React.PointerEvent<SVGElement>) => {
    if (!dragging) return;
    const newProgress = calculateProgress(e.clientX, e.clientY);
    if (newProgress !== null) sP(Number(newProgress));
  };

  const handleMouseUp = (e: React.PointerEvent<SVGElement>) => {
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const currAng = mapRange(p, 0, 100, startAng, endAng);

  const knobPos = polToCart(center, center, radius, currAng);
  const knobSize = dragging ? 12 : 10;
  const knobFill = dragging ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)";

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        width={size}
        height={size / 3.2}
        className="overflow-visible touch-none"
        onPointerMove={handleMouseMove}
        onPointerDown={handleMouseDown}
        onPointerUp={handleMouseUp}
      >
        <path
          d={describeTheSVGArc(center, center, radius, startAng, endAng)}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={stroke}
          strokeLinecap="round"
        />

        <path
          d={describeTheSVGArc(center, center, radius, startAng, currAng)}
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth={stroke}
          strokeLinecap="round"
        />

        <g transform={`translate(${knobPos.x}, ${knobPos.y})`}>
          <circle r={knobSize} fill={knobFill} />
          <circle r={8} fill="white" />
        </g>
      </svg>
    </div>
  );
}

export default ProgressBar;
