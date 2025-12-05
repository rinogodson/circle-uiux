function ProgressBar({
  width,
  stroke,
  start,
  end,
  onChange,
}: {
  width: number;
  stroke: number;
  start: number;
  end: number;
  onChange: () => void;
}) {
  const center = width / 2;
  const radius = (width - stroke) / 2;
  const totalAngle = end - start;

  const polToCart = (angle: number) => {
    const angleInRadians = (angle * Math.PI) / 180;

    return {
      x: center + radius * Math.cos(angleInRadians),
      y: center + radius * Math.sin(angleInRadians),
    };
  };

  return <div></div>;
}

export default ProgressBar;
