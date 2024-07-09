import React, { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import ResizeObserver from "resize-observer-polyfill";

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

type DataPoint = { x: number; y: number };
type DataKey = 'intensity' | 'likelihood' | 'relevance';

type LineChartProps = {
    width?: number;
    height?: number;
    data: { [key in DataKey]: DataPoint[] };
};

const LineChart = ({ width = 700, height = 400, data }: LineChartProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const axesRef = useRef<SVGGElement>(null);
    const [containerWidth, setContainerWidth] = useState(width);
    const [containerHeight, setContainerHeight] = useState(height);

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
    const yMax = d3.max(Object.values(data).flat(), (d: DataPoint) => d.y);
    const yScale = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([0, yMax || 0])
            .range([boundsHeight, 0]);
    }, [data, containerHeight]);

    // X axis
    const xMax = d3.max(Object.values(data).flat(), (d: DataPoint) => d.x);
    const xScale = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([2016, xMax || 0])
            .range([0, boundsWidth]);
    }, [data, containerWidth]);

    // Render the X and Y axis using d3.js, not react
    useEffect(() => {
        const svgElement = d3.select(axesRef.current);
        svgElement.selectAll("*").remove();
        const xAxisGenerator = d3.axisBottom(xScale).tickFormat(d3.format("d"));
        svgElement
            .append("g")
            .attr("transform", "translate(0," + boundsHeight + ")")
            .call(xAxisGenerator);

        const yAxisGenerator = d3.axisLeft(yScale);
        svgElement.append("g").call(yAxisGenerator);
    }, [xScale, yScale, boundsHeight]);

    // Colors for the lines
    const colors: { [key in DataKey]: string } = {
        intensity: "#1f77b4",
        likelihood: "#ff7f0e",
        relevance: "#2ca02c"
    };

    // Build the lines
    const lineBuilder = d3
        .line<DataPoint>()
        .x((d: DataPoint) => xScale(d.x))
        .y((d: DataPoint) => yScale(d.y));

    return (
        <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
            <svg width={containerWidth} height={containerHeight}>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                >
                    {Object.keys(data).map((key) => {
                        const linePath = lineBuilder(data[key as DataKey]);
                        return (
                            <path
                                key={key}
                                d={linePath || ""}
                                opacity={1}
                                stroke={colors[key as DataKey]}
                                fill="none"
                                strokeWidth={2}
                            />
                        );
                    })}
                </g>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    ref={axesRef}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                />
            </svg>
        </div>
    );
};

export default LineChart;

interface List {
    end_year: number;
    intensity: string;
    sector: string;
    topic: string;
    insight: string;
    url: string;
    region: string;
    start_year: string;
    impact: string;
    added: string;
    published: string;
    country: string;
    relevance: string;
    pestle: string;
    source: string;
    title: string;
    likelihood: string;
    id: string;
}


const generateData = (list: List[]) => {

    const intensityData = list.map((year) => ({
        x: isNaN(Number(year.end_year)) ? 0 : Number(year.end_year),
        y: Number(year.intensity)
    })).sort((a, b) => a.x - b.x);

    const likelihoodData = list.map((year) => ({
        x: isNaN(Number(year.end_year)) ? 0 : Number(year.end_year),
        y: Number(year.likelihood)
    })).sort((a, b) => a.x - b.x);

    const relevanceData = list.map((year) => ({
        x: isNaN(Number(year.end_year)) ? 0 : Number(year.end_year),
        y: Number(year.relevance)
    })).sort((a, b) => a.x - b.x);

    return {
        intensity: intensityData,
        likelihood: likelihoodData,
        relevance: relevanceData
    };
};


type LineChartBasicDemoProps = {
    list: List[];
};

export const LineChartWrapper = ({ list }: LineChartBasicDemoProps) => {
    const data = generateData(list);
        return (<div style={{ width: "100%", height: "400px" }}>
            <LineChart data={data} />
        </div>)
};
