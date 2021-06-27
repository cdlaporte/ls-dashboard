import React from "react";
import { Group } from "@vx/group";
import { AreaStack } from "@vx/shape";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { scaleTime, scaleLinear, scaleOrdinal } from "@vx/scale";
import { GridRows, GridColumns } from '@vx/grid';
import { ParentSize } from '@vx/responsive';
import { timeFormat } from 'd3-time-format';

let data = [
    { date: "2012-04-23T04:00:00.000Z", Group1: 37, Group2: 12, Group3: 46 },
    { date: "2012-04-24T04:00:00.000Z", Group1: 32, Group2: 19, Group3: 42 },
    { date: "2012-04-25T04:00:00.000Z", Group1: 45, Group2: 16, Group3: 44 },
    { date: "2012-04-26T04:00:00.000Z", Group1: 24, Group2: 52, Group3: 64 }
];

const keys = ["Group1", "Group2", "Group3"];
const x = (d) => new Date(d.date);

const xScale = scaleTime({
    domain: [x(data[0]), x(data[3])]
});
const yScale = scaleLinear({
    domain: [0, 240]
});
// const zScale = scaleOrdinal({
//     range: ["#3182bd", "#6baed6", "#9ecae1"],
//     domain: keys
// });

const zScale = scaleOrdinal({
    range: ["#FFE91C", "#EFD61D", "#E0C420"],
    domain: keys
});

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };

const tickLabelPropsX = () => ({
    fill: 'white',
    fontSize: 12,
    textAnchor: 'middle'
});

const tickLabelPropsY = () => ({
    fill: 'white',
    fontSize: 12,
    textAnchor: 'middle',
    // alignmentBaseline: 'middle',
    dy: '0.4em',
    dx: '-0.7em'
}); 


const FixedRevenueStackChart = ({ width, height, margin = defaultMargin }) => {
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    xScale.range([0, xMax]);
    yScale.range([yMax, 0]);

    return (
        <svg width={width} height={height}>
            <Group top={margin.top} left={margin.left}>
                <GridRows scale={yScale} width={xMax} height={yMax} stroke="grey" strokeDasharray="3,3" />
                <GridColumns scale={xScale} width={xMax} height={yMax} stroke="grey" strokeDasharray="3,3" />
                <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="grey" />
                <AxisBottom top={yMax} scale={xScale} numTicks={width > 520 ? 10 : 5} stroke="white" tickStroke="white" tickLabelProps={tickLabelPropsX} tickFormat={(v) => timeFormat('%b %d')(v)} />
                <AxisLeft scale={yScale} stroke="white" tickStroke="white" tickLabelProps={tickLabelPropsY} />
                <text x="-70" y="15" transform="rotate(-90)" fontSize={11} fill="white">
                    Thousands of $s
                </text>
                <AreaStack
                    keys={keys}
                    data={data}
                    stroke="white"
                    strokeWidth={1}
                    x={(d) => xScale(x(d.data))}
                    y0={(d) => yScale(d[0])}
                    y1={(d) => yScale(d[1])}                    
                >
                    {({ stacks, path }) =>
                        stacks.map((stack, i) => (
                            <path
                                key={i}
                                d={path(stack) || ''}
                                // stroke="white"
                                fill={zScale(keys[i])}
                                opacity={0.6}                                
                            />
                        ))
                    }
                </AreaStack>
                {/* <AxisLeft scale={yScale} />
                <AxisBottom top={yMax} scale={xScale} /> */}
            </Group>
        </svg>
    );
};

const RevenueStackChart = ({ }) => {
    return (
        <ParentSize>
            {parent => (
                <FixedRevenueStackChart
                    width={parent.width}
                    height={parent.height}
                />
            )}
        </ParentSize>
    )
}

export default RevenueStackChart;
