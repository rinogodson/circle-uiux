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

  return <div></div>;
}

export default ProgressBar;
