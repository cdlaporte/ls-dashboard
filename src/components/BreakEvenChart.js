import React, { useEffect, useCallback } from 'react';
import { Group } from '@vx/group';
import { curveBasis } from '@vx/curve';
import { LinePath, Bar, Line } from '@vx/shape';
import { Threshold } from '@vx/threshold';
import { scaleTime, scaleLinear } from '@vx/scale';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { GridRows, GridColumns } from '@vx/grid';
import cityTemperature, { CityTemperature } from '@vx/mock-data/lib/mocks/cityTemperature';
import { ParentSize } from '@vx/responsive';
import { timeFormat } from 'd3-time-format';
import { useTooltip, Tooltip, defaultStyles } from '@vx/tooltip';
import { localPoint } from '@vx/event';
import { max, extent, bisector } from 'd3-array';

// export const background = '#f3f3f3';

// accessors
const date = (d) => new Date(d.date).valueOf();
const ny = (d) => Number(d['New York']);
const sf = (d) => Number(d['San Francisco']);
const bisectDate = bisector(d => new Date(d.date)).left;

const accentColorDark = 'yellow';

// console.log('city temp length is');
// console.log(cityTemperature.length);

let city = cityTemperature.map((d, i) => {

    if (i === 0) {
        d['New York'] = 0;
        d['San Francisco'] = 25;
    } else {
        d['New York'] = cityTemperature[i - 1]['New York'] + ((0.55 - Math.random()) * 4)
        d['San Francisco'] = cityTemperature[i - 1]['San Francisco'] + ((0.51 - Math.random()) * 1)
    }
    return d;

});



// scales
const timeScale = scaleTime({
    domain: [Math.min(...city.map(date)), Math.max(...city.map(date))],
});
const temperatureScale = scaleLinear({
    domain: [
        Math.min(...city.map(d => Math.min(ny(d), sf(d)))),
        // 0,
        Math.max(...city.map(d => Math.max(ny(d), sf(d)))),
    ],
    nice: true,
});


const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };
// const defaultMargin = { top: 0, right: 0, bottom: 0, left: 0 };

// export type ThresholdProps = {
//   width: number;
//   height: number;
//   margin?: { top: number; right: number; bottom: number; left: number };
// };

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

function FixedBreakEvenChart({ width, height, margin = defaultMargin, focusDate, setFocusDate }) {

    // tooltip hook
    const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        tooltipOpen,
        showTooltip,
        hideTooltip
    } = useTooltip();

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    timeScale.range([0, xMax]);
    temperatureScale.range([yMax, 0]);

    // useEffect(() => {
    //     const index = bisectDate(city, focusDate, 1);
    //     const d0 = city[index - 1];
    //     const d1 = city[index];
    //     let d = d0;
    //     if (d1 && date(d1)) {

    //     }
    //     showTooltip({
    //         tooltipData: d,
    //         tooltipLeft: timeScale(focusDate),
    //         tooltipNY: temperatureScale(ny(d)),
    //         tooltipSF: temperatureScale(sf(d)),
    //     });
    // }, [focusDate]);

    const handleTooltip = useCallback((event) => {
        const { x } = localPoint(event) || { x: 0 };
        const x0 = timeScale.invert(x-margin.left);
        // setFocusDate(x0);
        const index = bisectDate(city, x0, 1);
        const d0 = city[index - 1];
        const d1 = city[index];
        let d = d0;
        if (d1 && date(d1)) {

        }
        showTooltip({
            tooltipData: d,
            tooltipLeft: x-margin.left,
            tooltipNY: temperatureScale(ny(d)),
            tooltipSF: temperatureScale(sf(d)),
        });
    }, [showTooltip, timeScale, temperatureScale]);

    
    if (width < 10) return null;
    return (
        <svg width={width} height={height}>
            {/* <rect x={0} y={0} width={width} height={height} fill={background} rx={14} /> */}
            <Group left={margin.left} top={margin.top}>
                <GridRows scale={temperatureScale} width={xMax} height={yMax} stroke="grey" strokeDasharray="3,3" />
                <GridColumns scale={timeScale} width={xMax} height={yMax} stroke="grey" strokeDasharray="3,3" />
                <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="grey" />
                <AxisBottom top={yMax} scale={timeScale} numTicks={width > 520 ? 10 : 5} stroke="white" tickStroke="white" tickLabelProps={tickLabelPropsX} tickFormat={(v) => timeFormat('%b %d')(v)} />
                <AxisLeft scale={temperatureScale} stroke="white" tickStroke="white" tickLabelProps={tickLabelPropsY} />
                <text x="-70" y="15" transform="rotate(-90)" fontSize={11} fill="white">
                    Thousands of $s
                </text>
                <Threshold
                    id={`${Math.random()}`}
                    data={city}
                    x={d => timeScale(date(d))}
                    y0={d => temperatureScale(ny(d))}
                    y1={d => temperatureScale(sf(d))}
                    clipAboveTo={0}
                    clipBelowTo={yMax}
                    curve={curveBasis}
                    belowAreaProps={{
                        fill: '#939393',                        
                        // fill: 'red',
                        fillOpacity: 0.5,
                    }}
                    aboveAreaProps={{
                        fill: '#FFE91C',
                        // fill: 'lime',
                        fillOpacity: 0.7,
                    }}
                />
                <LinePath
                    data={city}
                    curve={curveBasis}
                    x={d => timeScale(date(d))}
                    y={d => temperatureScale(sf(d))}
                    stroke="white"
                    strokeWidth={1}
                    strokeOpacity={0.8}
                // strokeDasharray="1,2"
                />
                <LinePath
                    data={city}
                    curve={curveBasis}
                    x={d => timeScale(date(d))}
                    y={d => temperatureScale(ny(d))}
                    stroke="white"
                    strokeWidth={1.5}
                />
                <Bar
                    x={0}
                    y={0}
                    width={xMax}
                    height={yMax}
                    fill="transparent"
                    rx={14}
                    onTouchStart={handleTooltip}
                    onTouchMove={handleTooltip}
                    onMouseMove={handleTooltip}
                    onMouseLeave={() => hideTooltip()}
                />
            {tooltipData && (
                <g>
                    <Line
                        from={{ x: tooltipLeft, y: 0 }}
                        to={{ x: tooltipLeft, y: yMax }}
                        stroke={accentColorDark}
                        strokeWidth={1}
                        pointerEvents="none"
                        strokeDasharray="2,2"
                    />
                    {/* <circle
                        cx={tooltipLeft}
                        cy={temperatureScale(ny(tooltipData)) + 1}
                        r={4}
                        fill="black"
                        fillOpacity={0.1}
                        stroke="black"
                        strokeOpacity={0.1}
                        strokeWidth={2}
                        pointerEvents="none"
                    /> */}
                    <circle
                        cx={tooltipLeft}
                        cy={temperatureScale(ny(tooltipData))}
                        r={4}
                        fill="yellow"
                        // stroke="black"
                        // strokeWidth={2}
                        pointerEvents="none"
                    />
                    {/* <circle
                        cx={tooltipLeft}
                        cy={temperatureScale(sf(tooltipData)) + 1}
                        r={4}
                        fill="black"
                        fillOpacity={0.1}
                        stroke="black"
                        strokeOpacity={0.1}
                        strokeWidth={2}
                        pointerEvents="none"
                    /> */}
                    <circle
                        cx={tooltipLeft}
                        cy={temperatureScale(sf(tooltipData))}
                        r={4}
                        fill="yellow"
                        // stroke="white"
                        // strokeWidth={2}
                        pointerEvents="none"
                    />                    
                </g>
            )}

            </Group>
        </svg>

    );
}

// Wrapper to make above chart responsive
function BreakEvenChart({ }) {
    return (
        <ParentSize>
            {parent => (
                <FixedBreakEvenChart
                    width={parent.width}
                    height={parent.height}
                />
            )}
        </ParentSize>
    )
}

export default BreakEvenChart;