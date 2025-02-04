import React, { useRef, useMemo } from 'react';
import * as d3 from 'd3'; // Ensure d3 typings are properly installed

type DataItem = {
  name: string;
  value: number;
};

type DonutChartProps = {
  width: number;
  height: number;
  data: DataItem[];
};

const MARGIN_X = 150;
const MARGIN_Y = 50;
const INFLEXION_PADDING = 20; // space between donut and label inflexion point

const colors = [
  "#e0ac2b",
  "#e85252",
  "#6689c6",
  "#9a6fb0",
  "#a53253",
  "#69b3a2",
];

const DonutChart: React.FC<DonutChartProps> = ({ width, height, data }) => {
  const ref = useRef<SVGGElement>(null);

  const radius = Math.min(width - 2 * MARGIN_X, height - 2 * MARGIN_Y) / 2;
  const innerRadius = radius / 2;

  const pie = useMemo(() => {
    const pieGenerator = d3.pie<DataItem>().value(d => d.value);
    return pieGenerator(data);
  }, [data]);

  const arcGenerator = d3.arc<any, d3.DefaultArcObject>()
    .innerRadius(innerRadius)
    .outerRadius(radius);

  const shapes = pie.map((grp, i) => {
    // First arc is for the donut
    const slicePath = arcGenerator(grp);

    // Second arc is for the legend inflexion point
    const inflexionPoint = arcGenerator({
      ...grp,
      innerRadius: radius + INFLEXION_PADDING,
      outerRadius: radius + INFLEXION_PADDING
    }).centroid();

    const isRightLabel = inflexionPoint[0] > 0;
    const labelPosX = inflexionPoint[0] + 50 * (isRightLabel ? 1 : -1);
    const textAnchor = isRightLabel ? "start" : "end";
    const label = `${grp.data.name} (${grp.data.value})`;

    return (
      <g
        key={i}
        className="slice"
        onMouseEnter={() => {
          if (ref.current) {
            ref.current.classList.add("hasHighlight");
          }
        }}
        onMouseLeave={() => {
          if (ref.current) {
            ref.current.classList.remove("hasHighlight");
          }
        }}
      >
        <path d={slicePath || ''} fill={colors[i]} />
        <circle cx={inflexionPoint[0]} cy={inflexionPoint[1]} r={2} />
        <line
          x1={inflexionPoint[0]}
          y1={inflexionPoint[1]}
          x2={labelPosX}
          y2={inflexionPoint[1]}
          stroke={"black"}
          fill={"black"}
        />
        <text
          x={labelPosX + (isRightLabel ? 2 : -2)}
          y={inflexionPoint[1]}
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fontSize={14}
        >
          {label}
        </text>
      </g>
    );
  });

  return (
    <svg width={width} height={height} style={{ display: "inline-block" }}>
      <g
        transform={`translate(${width / 2}, ${height / 2})`}
        ref={ref}
      >
        {shapes}
      </g>
    </svg>
  );
};

export default DonutChart;
