import React, { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import ResizeObserver from "resize-observer-polyfill";

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

type DataPoint = { x: number; y: number; source: string; insight: string };

type LineChartProps = {
    width?: number;
    height?: number;
    data: DataPoint[];
    yAxisLabel: string,
    lineColor: string
};

const LineChart = ({ width = 700, height = 400, data, yAxisLabel, lineColor }: LineChartProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const axesRef = useRef<SVGGElement>(null);
    const [containerWidth, setContainerWidth] = useState(width);
    const [containerHeight, setContainerHeight] = useState(height);

    const tooltipList = document.getElementsByClassName("tooltipLinearChart");
    while (tooltipList.length > 0) {
        tooltipList[0].remove();
    }
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.target === containerRef.current) {
                    setContainerWidth(entry.contentRect.width);
                    setContainerHeight(entry.contentRect.height);
                }
            }
        });
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    const boundsWidth = containerWidth - MARGIN.right - MARGIN.left;
    const boundsHeight = containerHeight - MARGIN.top - MARGIN.bottom;

    // Y axis
    const yMax = d3.max(data, (d: DataPoint) => d.y);
    const yScale = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([0, yMax || 0])
            .range([boundsHeight, 0]);
    }, [data, boundsHeight]);

    // X axis
    const xMax = d3.max(data, (d: DataPoint) => d.x);
    const xScale = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([2015, xMax || 0])
            .range([0, boundsWidth]);
    }, [data, boundsWidth]);

    useEffect(() => {
        const svgElement = d3.select(axesRef.current);

        svgElement.selectAll("*").remove();

        const xAxisGenerator = d3.axisBottom(xScale).tickFormat(d3.format("d"));
        svgElement
            .append("g")
            .attr("transform", `translate(0, ${boundsHeight})`)
            .call(xAxisGenerator);

        // vertical gridlines
        svgElement.selectAll("line.xGrid")
            .data(xScale.ticks())
            .join("line")
            .attr("class", "xGrid")
            .attr("x1", d => xScale(d))
            .attr("x2", d => xScale(d))
            .attr("y1", 0)
            .attr("y2", boundsHeight)
            .attr("stroke", "#808080")
            .attr("stroke-width", 0.5);

        const yAxisGenerator = d3.axisLeft(yScale);
        svgElement.append("g").call(yAxisGenerator);

        // horizontal gridlines
        svgElement.selectAll("line.yGrid")
            .data(yScale.ticks())
            .join("line")
            .attr("x1", 0)
            .attr("x2", boundsWidth)
            .attr("y1", d => yScale(d))
            .attr("y2", d => yScale(d))
            .attr("stroke", "#808080")
            .attr("stroke-width", 0.5);

        // Add Y-axis label
        svgElement.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - MARGIN.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .style("fill", "#777")
            .style("font-family", "sans-serif")
            .text(`${yAxisLabel}`);

        // Tooltip
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltipLinearChart")
            .style("position", "absolute")
            .style("display", "none")
            .style("background", "white")
            .style("border", "1px solid #ccc")
            .style("padding", "10px")
            .style("pointer-events", "none")
            .style("color", "black");

        // Circle element for the tooltip
        const circle = svgElement.append("circle")
            .attr("r", 0)
            .attr("fill", "steelblue")
            .style("stroke", "white")
            .attr("opacity", 0.70)
            .style("pointer-events", "none");

        const listeningRect = svgElement.append("rect")
            .attr("width", boundsWidth)
            .attr("height", boundsHeight)
            .attr("fill", "none")
            .attr("pointer-events", "all");

        listeningRect.on("mousemove", function (event: MouseEvent) {
            const [xCoord] = d3.pointer(event, this);
            const bisectDate = d3.bisector<DataPoint, number>(d => d.x).left;
            const x0 = xScale.invert(xCoord);
            const i = bisectDate(data, x0, 1);
            const d0 = data[i - 1];
            const d1 = data[i];
            const d = x0 - d0.x > d1.x - x0 ? d1 : d0;
            const xPos = xScale(d.x);
            const yPos = yScale(d.y);

            circle.attr("cx", xPos)
                .attr("cy", yPos)
                .attr("r", 5);

            tooltip.style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY - 30}px`)
                .style("display", "block")
                .html(`X: ${d.x}<br>Y: ${d.y}<br>${d.source}<br>${d.insight}`);
        });
        listeningRect.on("mouseout", function () {
            tooltip.style("display", "none");
            circle.attr("r", 0);
        });

    }, [xScale, yScale, boundsHeight]);

    // Build the line
    const lineBuilder = d3
        .line<DataPoint>()
        .x((d: DataPoint) => xScale(d.x))
        .y((d: DataPoint) => yScale(d.y));

    const linePath = lineBuilder(data);

    return (
        <div style={{ width: "100%", height: "400px" }}>
            <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
                <svg width={containerWidth} height={containerHeight}>
                    <g
                        width={boundsWidth}
                        height={boundsHeight}
                        transform={`translate(${MARGIN.left},${MARGIN.top})`}
                    >
                        <path
                            d={linePath || ""}
                            opacity={1}
                            stroke={lineColor}
                            fill="none"
                            strokeWidth={2}
                        />
                    </g>
                    <g
                        width={boundsWidth}
                        height={boundsHeight}
                        ref={axesRef}
                        transform={`translate(${MARGIN.left},${MARGIN.top})`}
                    />
                </svg>
            </div>
        </div>
    );
};

export default React.memo(LineChart);



