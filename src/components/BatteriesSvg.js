import react, { useState, useEffect, useRef } from 'react';
import { Tooltip, Popper } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import * as d3 from 'd3';
import { useWindowResize } from 'beautiful-react-hooks';
import { canvas } from 'leaflet';
import { animated, useSpring, useChain, config } from 'react-spring';
import { scaleLinear } from '@vx/scale';

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function BlockchainSvg({ transform = "" }) {
    return (
        <g transform={transform} style={{ tranformOrigin: 'center' }}>
            <g transform='translate(-24.425,-15.095)'>
                <svg xmlns="http://www.w3.org/2000/svg" width="48.85" height="30.19" viewBox="0 0 48.85 30.19">
                    <g id="Group_9" data-name="Group 9" transform="translate(-683.97 -570.23)" stroke="black">
                        <rect id="Rectangle_3" data-name="Rectangle 3" width="48.35" height="29.69" transform="translate(684.22 570.48)" fill="#cdcdcc" stroke="#000" stroke-miterlimit="10" stroke-width="0.5" />
                        <g id="Group_8" data-name="Group 8">
                            <g id="Group_7" data-name="Group 7">
                                <g id="Group_3" data-name="Group 3">
                                    <rect id="Rectangle_4" data-name="Rectangle 4" width="8.04" height="7.63" transform="translate(692.32 581.51)" />
                                </g>
                                <g id="Group_4" data-name="Group 4">
                                    <rect id="Rectangle_5" data-name="Rectangle 5" width="8.04" height="7.63" transform="translate(704.38 581.51)" />
                                </g>
                                <g id="Group_5" data-name="Group 5">
                                    <rect id="Rectangle_6" data-name="Rectangle 6" width="8.04" height="7.63" transform="translate(716.44 581.51)" />
                                </g>
                                <g id="Group_6" data-name="Group 6">
                                    <rect id="Rectangle_7" data-name="Rectangle 7" width="24.12" height="1.15" transform="translate(696.34 584.75)" />
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </g>
        </g>
    )
}

function WaterJugSvg({ transform = "" }) {
    return (
        <g transform={transform} style={{ tranformOrigin: 'center' }}>
            <g transform='translate(-21.89,-30)'>
                <svg xmlns="http://www.w3.org/2000/svg" width="43.78" height="59.99" viewBox="0 0 43.78 59.99">
                    <g id="Group_141" data-name="Group 141" transform="translate(-684.43 -469.01)" stroke="black">
                        <g id="Group_134" data-name="Group 134">
                            <rect id="Rectangle_30" data-name="Rectangle 30" width="10.81" height="5.4" transform="translate(711.45 474.42)" fill="#fff" />
                            <path id="Path_52" data-name="Path 52" d="M722.53,480.09H711.18v-5.94h11.35Zm-10.81-.54h10.27v-4.86H711.72Z" />
                        </g>
                        <g id="Group_137" data-name="Group 137">
                            <g id="Group_135" data-name="Group 135">
                                <rect id="Rectangle_31" data-name="Rectangle 31" width="11.35" height="5.94" transform="translate(689.56 474.15)" fill="#5895f2" />
                            </g>
                            <g id="Group_136" data-name="Group 136">
                                <path id="Path_53" data-name="Path 53" d="M700.64,474.42v5.4H689.83v-5.4h10.81m.54-.54H689.29v6.48h11.89v-6.48Z" />
                            </g>
                        </g>
                        <g id="Group_140" data-name="Group 140">
                            <g id="Group_138" data-name="Group 138">
                                <path id="Path_54" data-name="Path 54" d="M727.93,469.28v59.45H684.7V480.09h21.61V469.28Z" fill="#5895f2" />
                                <path id="Path_55" data-name="Path 55" d="M728.2,529H684.43V479.82h21.62V469.01h22.16V529Zm-43.23-.54h42.69V469.55H706.58v10.81H684.96v48.1Z" />
                            </g>
                            <g id="Group_139" data-name="Group 139">
                                <path id="Path_56" data-name="Path 56" d="M711.59,505.18a11.115,11.115,0,0,0-1.48-3.72,28.594,28.594,0,0,0-3.39-4.51.444.444,0,0,0-.73.02c-.51.6-1.04,1.2-1.53,1.81a19,19,0,0,0-2.68,4.28,8.629,8.629,0,0,0-.78,2.91,6.528,6.528,0,0,0,1.82,4.94,4.979,4.979,0,0,0,7.4-.36A6.19,6.19,0,0,0,711.59,505.18Z" />
                            </g>
                        </g>
                    </g>
                </svg>
            </g>
        </g>
    )
}

// TODO: put in own file?
function BatterySvg({ transform = "" }) {
    return (
        <g transform={transform} style={{ tranformOrigin: 'center' }}>
            <g transform='translate(-16.55, -30.11)'>
                <svg xmlns="http://www.w3.org/2000/svg" width="33.1" height="60.22" viewBox="0 0 33.1 60.22">
                    <g id="Group_133" data-name="Group 133" transform="translate(-689.76 -274.17)" stroke="black">
                        <g id="Group_130" data-name="Group 130">
                            <g id="Group_119" data-name="Group 119">
                                <g id="Group_117" data-name="Group 117">
                                    <rect id="Rectangle_27" data-name="Rectangle 27" width="32.55" height="43.41" transform="translate(690.04 285.29)" fill="#ffe422" />
                                </g>
                                <g id="Group_118" data-name="Group 118">
                                    <path id="Path_46" data-name="Path 46" d="M722.86,328.96h-33.1V285.01h33.1Zm-32.55-.54h32.01V285.56H690.31Z" />
                                </g>
                            </g>
                            <g id="Group_123" data-name="Group 123">
                                <g id="Group_122" data-name="Group 122">
                                    <g id="Group_120" data-name="Group 120">
                                        <path id="Path_47" data-name="Path 47" d="M690.04,274.43v10.86h5.42v-5.43h21.71v5.43h5.42V274.43Z" fill="#ffe422" />
                                    </g>
                                    <g id="Group_121" data-name="Group 121">
                                        <path id="Path_48" data-name="Path 48" d="M722.86,285.56h-5.97v-5.43H695.73v5.43h-5.97V274.17h33.1v11.39Zm-5.42-.55h4.88V274.7H690.31v10.31h4.88v-5.43h22.25Z" />
                                    </g>
                                </g>
                            </g>
                            <g id="Group_126" data-name="Group 126">
                                <g id="Group_124" data-name="Group 124">
                                    <rect id="Rectangle_28" data-name="Rectangle 28" width="5.43" height="5.43" transform="translate(690.04 328.69)" fill="#ffe422" />
                                </g>
                                <g id="Group_125" data-name="Group 125">
                                    <path id="Path_49" data-name="Path 49" d="M695.73,334.39h-5.97v-5.97h5.97Zm-5.42-.54h4.88v-4.88h-4.88Z" />
                                </g>
                            </g>
                            <g id="Group_129" data-name="Group 129">
                                <g id="Group_127" data-name="Group 127">
                                    <rect id="Rectangle_29" data-name="Rectangle 29" width="5.43" height="5.43" transform="translate(717.17 328.69)" fill="#ffe422" />
                                </g>
                                <g id="Group_128" data-name="Group 128">
                                    <path id="Path_50" data-name="Path 50" d="M722.86,334.39h-5.97v-5.97h5.97Zm-5.42-.54h4.88v-4.88h-4.88Z" />
                                </g>
                            </g>
                        </g>
                        <g id="Group_132" data-name="Group 132">
                            <g id="Group_131" data-name="Group 131">
                                <path id="Path_51" data-name="Path 51" d="M711.47,296.14l-10.85,10.85h10.85l-10.85,10.85" fill="#2f292b" />
                            </g>
                        </g>
                    </g>
                </svg>
            </g>
        </g>
    )
}

// SVG Gas generator -- TODO: NEEDS ATTRIBUTION TO LEGALLY USE
function Generator({ transform = "" }) {
    return (
        <g transform={transform} fill="white">
            <path d="M368,232a32,32,0,1,0-32-32A32.03635,32.03635,0,0,0,368,232Zm0-48a16,16,0,1,1-16,16A16.01833,16.01833,0,0,1,368,184Z" />
            <circle cx="384" cy="248" r="8" /><circle cx="352" cy="248" r="8" /><rect x="288" y="176" width="24" height="16" />
            <rect x="288" y="208" width="24" height="16" /><rect x="288" y="240" width="24" height="16" />
            <rect x="248" y="176" width="24" height="16" /><rect x="248" y="208" width="24" height="16" /><rect x="248" y="240" width="24" height="16" />
            <path d="M120,256h64a8.00008,8.00008,0,0,0,8-8V176a8.00008,8.00008,0,0,0-8-8H120a8.00008,8.00008,0,0,0-8,8v72A8.00008,8.00008,0,0,0,120,256Zm8-72h48v56H128Z" />
            <rect x="144" y="200" width="16" height="24" />
            <path d="M464,328.61011V72a8.00008,8.00008,0,0,0-8-8H424a8.00008,8.00008,0,0,0-8,8v64h-3.05566l-13.78907-27.57812A7.99967,7.99967,0,0,0,392,104H318.24634l-6.48511-25.94043A8.00005,8.00005,0,0,0,304,72H240a8.00005,8.00005,0,0,0-7.76123,6.05957L225.75366,104H214.24634l-6.48511-25.94043A8.00005,8.00005,0,0,0,200,72H160a8.00005,8.00005,0,0,0-7.76123,6.05957L145.75366,104H120a7.99967,7.99967,0,0,0-7.15527,4.42188L99.05566,136H96V80a8.00008,8.00008,0,0,0-8-8H56a8.00008,8.00008,0,0,0-8,8v92.686L18.34326,202.34277A8.00076,8.00076,0,0,0,16,208V440a8.00008,8.00008,0,0,0,8,8H56a8.00008,8.00008,0,0,0,8-8V373.18506a71.955,71.955,0,0,0,48,26.35986V440a8.00008,8.00008,0,0,0,8,8h32a8.00008,8.00008,0,0,0,8-8V400H370.02527A63.999,63.999,0,1,0,464,328.61011ZM432,80h16V322.02539A63.884,63.884,0,0,0,432,320ZM376.61011,352H352V288h64v34.02539A64.24343,64.24343,0,0,0,376.61011,352ZM120,352a24.038,24.038,0,0,1-22.62378-16H200a8.00008,8.00008,0,0,0,8-8V288h16v64ZM96,288h96v32H96Zm144,0h96v64H240Zm6.24609-200h51.50782l3.99987,16H242.24622Zm-80,0h27.50782l3.99987,16H162.24622Zm-41.30175,32H387.05566l8,16H116.94434ZM416,152V272H96V152ZM80,88v82.707A27.83231,27.83231,0,0,0,68,168H64V88ZM32,211.31348,59.31348,184H68a12,12,0,0,1,0,24H56a8.00008,8.00008,0,0,0-8,8v40H32ZM48,328v32H32V272H48ZM32,432V376H48v56Zm112,0H128V400h16Zm-24-48a56.06322,56.06322,0,0,1-56-56V224h4a27.83231,27.83231,0,0,0,12-2.707V328a40.04552,40.04552,0,0,0,40,40H370.02527A63.89479,63.89479,0,0,0,368,384Zm312,48a48,48,0,1,1,48-48A48.05405,48.05405,0,0,1,432,432Z" />
            <path d="M432,360a24,24,0,1,0,24,24A24.02718,24.02718,0,0,0,432,360Zm0,32a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,432,392Z" />
        </g>
    )
}

// SVG Power line -- TODO: NEEDS ATTRIBUTION TO LEGALLY USE
function PowerLine({ transform = "" }) {
    return (
        <g transform={transform} fill="white">
            <path d="m296 272h16v16h-16z" />
            <path d="m160 72a24.027 24.027 0 0 0 -24 24v8h-8a24.113 24.113 0 0 0 -24 24 24.027 24.027 0 0 0 24 24h52.688l51.312 51.312v284.688a8 8 0 0 0 8 8h32a8 8 0 0 0 8-8v-168h56a8 8 0 0 0 8-8v-56a8 8 0 0 0 8-8v-40a8 8 0 0 0 -8-8h-60.688l48-48h17.376l.468.469a113.842 113.842 0 0 0 143.282 14.187 8 8 0 0 0 -8.876-13.312 97.86 97.86 0 0 1 -110.162-1.344h10.6a24.113 24.113 0 0 0 24-24 24.027 24.027 0 0 0 -24-24h-8v-8a24 24 0 0 0 -48 0v8h-48v-48a23.96 23.96 0 0 0 -16-22.526v-9.474a8 8 0 0 0 -16 0v9.474a23.96 23.96 0 0 0 -16 22.526v48h-48v-8a24.027 24.027 0 0 0 -24-24zm-8 24a8 8 0 0 1 16 0v8h-16zm51.312 56h28.688v28.688zm124.688 152h-48v-48h48zm8-64h-56v-24h56zm-56-59.312v-28.688h28.688zm64-84.688a8 8 0 0 1 16 0v8h-16zm40 24a8.011 8.011 0 0 1 8 8 7.8 7.8 0 0 1 -2.445 5.695 7.672 7.672 0 0 1 -5.555 2.305h-104v-16zm-136-64a8 8 0 0 1 16 0v424h-16zm-16 80h-104a8.011 8.011 0 0 1 -8-8 7.8 7.8 0 0 1 2.445-5.695 7.672 7.672 0 0 1 5.555-2.305h104z" />
        </g>
    )
}

// SVG lightning bold in circle
function LightningBoltCircle({ transform = "" }) {
    return (
        <g transform={transform}>
            <g id="Component_2_1" data-name="Component 2 – 1">
                <g id="Ellipse_1" data-name="Ellipse 1" fill="#ffe91c" stroke="#000" strokeWidth="10px">
                    <ellipse cx="120" cy="118.5" rx="120" ry="118.5" stroke="none" />
                    <ellipse cx="120" cy="118.5" rx="116" ry="114.5" fill="none" />
                </g>
            </g>
            <g id="Component_1_1" data-name="Component 1 – 1" transform="translate(71.431 20)">
                <g id="Group_110" data-name="Group 110" transform="translate(-579.585 -765.922)">
                    <path id="Path_60" data-name="Path 60" d="M676.724,765.922l-97.139,97.039h97.139L579.585,960" />
                </g>
            </g>
        </g>
    )
}

function LightningBoltCircleTest({ transform = "" }) {
    return (
        <g transform={transform}>
            <g transform="translate(-69.45,-68.58)">
                <g id="Component_2_1" data-name="Component 2 – 1">
                    <g id="Ellipse_1" data-name="Ellipse 1" fill="#ffe91c" stroke="#000" strokeWidth="10px">
                        <ellipse cx="120" cy="118.5" rx="120" ry="118.5" stroke="none" />
                        <ellipse cx="120" cy="118.5" rx="116" ry="114.5" fill="none" />
                    </g>
                </g>
                <g id="Component_1_1" data-name="Component 1 – 1" transform="translate(71.431 20)">
                    <g id="Group_110" data-name="Group 110" transform="translate(-579.585 -765.922)">
                        <path id="Path_60" data-name="Path 60" d="M676.724,765.922l-97.139,97.039h97.139L579.585,960" />
                    </g>
                </g>
            </g>
        </g>
    )
}

function MiningCircle({ transform = "" }) {
    return (
        <g transform={transform}>
            <circle
                r={100}
                stroke="black"
                fill="#cececd"
            />
            <rect width={30} height={30} x={-70} y={-15} fill="black" stroke="none" />
            <rect width={30} height={30} x={-15} y={-15} fill="black" stroke="none" />
            <rect width={30} height={30} x={40} y={-15} fill="black" stroke="none" />
            <rect width={120} height={10} x={-60} y={-5} fill="black" stroke="none" />

        </g>
    )
}

function WaterCircle({ transform = "" }) {
    return (
        <g transform={transform}>
            <circle
                fill="#5896f3"
                stroke="black"
                r={600}
                cx={250}
                cy={225}
            />
            <g fill="black">
                <path d="M316.099,85.846c-24.586-35.32-45.821-65.827-50.974-80.433c-1.139-3.215-4.145-5.372-7.554-5.414
                    c-3.15,0.096-6.476,2.044-7.68,5.227c-5.244,13.812-25.405,42.765-48.752,76.314C147.671,158.326,74.447,263.494,74.447,331.917
                    c0,100.926,82.103,183.034,183.029,183.034s183.029-82.108,183.029-183.034C440.505,264.6,368.599,161.285,316.099,85.846z"/>
            </g>
        </g>
    )
}

// SVG lightning bolt
function LightningBolt({ transform = "", color = "white" }) {
    return (
        <g transform={transform}>
            <g id="Component_1_1" data-name="Component 1 – 1" transform="translate(71.431 20)">
                <g id="Group_110" data-name="Group 110" transform="translate(-579.585 -765.922)" fill={color}>
                    <path id="Path_60" data-name="Path 60" d="M676.724,765.922l-97.139,97.039h97.139L579.585,960" />
                </g>
            </g>
        </g>
    )
}

// renders and animates the particles which are drawn on a canvas underlay
const renderCanvas = (canvasRef, sliderValue) => {

    let solarParticles = [];
    let gridParticles = [];
    let generatorParticles = [];

    const generatorFreq = sliderValue[0] / 100;
    const gridFreq = (sliderValue[1] - sliderValue[0]) / 100;
    const solarFreq = (1 - (sliderValue[1] / 100));


    const width = canvasRef.offsetWidth;
    const height = canvasRef.offsetHeight;

    // canvasRef.width = width;
    // canvasRef.height = height;

    const context = canvasRef.getContext("2d");

    canvasRef.width = width * 2;
    canvasRef.height = height * 2;
    context.scale(2, 2);

    const particleEdgeCanvasPath = (elapsed) => {


        context.clearRect(0, 0, width, height);

        context.fillStyle = "gray";
        context.lineWidth = "2px";
        for (let x in solarParticles) {

            var currentTime = elapsed - solarParticles[x].time;
            solarParticles[x].current = currentTime * 0.05 * solarParticles[x].speed;
            var currentPos = solarParticles[x].current;
            context.beginPath();
            context.fillStyle = '#ffe91c';
            context.arc(solarParticles[x].offset, currentPos, 2, 0, 2 * Math.PI);
            context.fill();
        }

        for (let x in gridParticles) {

            var currentTime = elapsed - gridParticles[x].time;
            gridParticles[x].current = currentTime * 0.05 * gridParticles[x].speed;
            var currentPos = gridParticles[x].current;
            context.beginPath();
            context.fillStyle = '#ffe91c';
            context.arc((width / 10) + currentPos, gridParticles[x].offset, 2, 0, 2 * Math.PI);
            context.fill();
        }

        for (let x in generatorParticles) {

            var currentTime = elapsed - generatorParticles[x].time;
            generatorParticles[x].current = currentTime * 0.05 * generatorParticles[x].speed;
            var currentPos = generatorParticles[x].current;
            context.beginPath();
            context.fillStyle = '#ffe91c';
            context.arc((width / 6.5) + currentPos, generatorParticles[x].offset, 2, 0, 2 * Math.PI);
            context.fill();
        }
    }

    const solarXOff = 0.38 * width;
    const solarWidth = (width / 2.15);

    const genYOff = 0.78 * height;
    const genWidth = (height / 12);
    const genRatio = genWidth / solarWidth;

    const gridYOff = 0.58 * height;
    const gridWidth = (height / 12);
    const gridRatio = gridWidth / solarWidth;

    // const gridYOff = 0.78 * height;
    // const gridWidth = (height / 12);
    // const gridRatio = gridWidth / solarWidth;    

    // const genYOff = 0.58 * height;
    // const genWidth = (height / 12);
    // const genRatio = genWidth / solarWidth;


    const solarCutoff = (205 / 500) * height - 5;
    const gridCutoff = (36 / 100) * width - 5 - (width / 10);
    const genCutoff = (36 / 100) * width - 5 - (width / 6.5)

    const tick = (elapsed, time) => {

        solarParticles = solarParticles.filter(function (d) { return d.current < solarCutoff });
        gridParticles = gridParticles.filter(function (d) { return d.current < gridCutoff });
        generatorParticles = generatorParticles.filter(function (d) { return d.current < genCutoff });

        for (let x = 0; x < 5; x++) {

            let rand = Math.random();

            if (rand < generatorFreq) {
                let genOffset = (Math.random()) * genWidth;
                if (Math.random() < (gridRatio + 0.1)) {
                    generatorParticles.push({ time: elapsed, offset: genYOff + genOffset, speed: 1.5 + (Math.random()) });
                }
            } else if (rand < sliderValue[1] / 100) {
                let gridOffset = (Math.random()) * gridWidth;
                if (Math.random() < (gridRatio + 0.1)) {
                    gridParticles.push({ time: elapsed, offset: gridYOff + gridOffset, speed: 1.5 + (Math.random()) });
                }
            } else {
                let solarOffset = (Math.random()) * solarWidth;
                solarParticles.push({ time: elapsed, offset: solarXOff + solarOffset, speed: 1.5 + (Math.random()) });
            }
        }

        particleEdgeCanvasPath(elapsed);

    };

    d3.timer(tick);


}


const batBarSpace = 0.1;
const Battery = ({ width, height, x, y, charge, focused, onClick }) => {

    const spacing = 3;
    const barH = (height - (5 * spacing)) / 4;
    const barW = (width - (2 * spacing))

    const getFill = (charge) => {
        if (focused) return 'black';
        if (charge < 26) return 'red';
        // if(charge < 51) return 'orange';
        // if(charge < 76) return 'yellow';
        // else return 'lime';
        else return 'yellow';
    }

    return (
        <g
            transform={`translate(${x},${y})`}
            onClick={onClick}
        >
            <rect
                height={height / 2}
                width={width / 2}
                fill="white"
                stroke='white'
                rx={2}
                ry={2}
                x={width / 4}
                y={-height / 10}
            />
            <rect
                height={height}
                width={width}
                // fill={'#222222'}
                stroke={focused ? "black" : "white"}
                // stroke={focused ? "yellow" : "white" } 
                fill={focused ? "white" : "black"}
                strokeWidth={2}
                rx={2}
                ry={2}

            />
            {
                d3.range(Math.ceil(charge / 25)).map((d, i) => (
                    <rect
                        height={barH}
                        width={barW}
                        rx={2}
                        ry={2}
                        fill={getFill(charge)}
                        x={spacing}
                        y={height - (((i + 1) * spacing) + ((i + 1) * barH))}
                    // opactiy={ focused ? 1.0 : 0.1 }
                    // opacity={0.1}
                    />
                ))
            }

        </g>
    )
}

const powerBarWidth = 280;
const powerBarScale = scaleLinear({
    domain: [0, 100],
    range: [0, powerBarWidth]
});

function BatteriesSvg({ batteries, setFocus, waypoint }) {

    const [highlight, setHighlight] = useState(null);
    const [sliderValue, setSliderValue] = useState([30, 50]);

    const [focusGrid, setFocusGrid] = useState(false);
    const [focusGen, setFocusGen] = useState(false);
    const [focusSolar, setFocusSolar] = useState(false);

    // if true, shows the power distribution bars in an area to the right of the main viz
    const [showRight, setShowRight] = useState(false);

    const canvasRef = useRef();

    const spring1Ref = useRef();
    const spring = useSpring({
        to: {
            left: showRight ? -350 : 0,
        },
        ref: spring1Ref
    });

    const spring2Ref = useRef();
    const spring2 = useSpring({
        to: {
            box: showRight ? 600 : 0
        },
        ref: spring2Ref,
        // config: config.stiff
    });

    // used to animated power distribution bars/numbers in the showRight mode
    const barSpring = useSpring({
        to: {
            water: waypoint ? waypoint.power.water : 0,
            batteries: waypoint ? waypoint.power.batteries : 0,
            mining: waypoint ? waypoint.power.mining : 0
        }
    });

    // cue the two springs above in sequence
    useChain(showRight ? [spring1Ref, spring2Ref] : [spring2Ref, spring1Ref], [0, showRight ? 0.3 : 0.1]);

    useEffect(() => {
        renderCanvas(canvasRef.current, sliderValue);
    }, []);

    useWindowResize((event) => {
        renderCanvas(canvasRef.current, sliderValue);
    });

    // console.log('waypoint looks like:');
    // console.log(waypoint);
    // if(waypoint) {
    //     console.log(powerBarScale(waypoint.power.water));
    // }


    //old background color: 222222
    // other color maybe: 939393
    return (
        <>
            <div
                style={{ height: '100%', width: '13%', position: 'absolute', right: 0, backgroundColor: 'transparent', zIndex: 5 }}
                onMouseOver={() => { setShowRight(true) }}
            // onMouseOut={() => { setShowRight(false) }}
            />
            <div
                style={{ height: '100%', width: '13%', position: 'absolute', left: 0, backgroundColor: 'transparent', zIndex: 5 }}
                // onMouseOver={() => { setShowRight(true) }}
                onMouseOver={() => { setShowRight(false) }}
            />
            <animated.div style={{ position: 'relative', left: spring.left }}>
                <div style={{ position: 'relative', backgroundColor: '#222222' }}>
                    <svg viewBox="0 0 1000 500" style={{ width: '100%', background: '#222222', position: 'absolute', zIndex: 0 }} />
                    {/* The following svg contains 3 triangles used to clip the particles underneath the solar panel lines so they are hidden, for a nice asthetic effect */}
                    <svg viewBox="0 0 1000 500" style={{ width: '100%', position: 'absolute', zIndex: 2 }}>
                        <path
                            fill="#222222"
                            // fill="green"
                            d="M 0,0 L 0,267.9 L 1000,267.9 Z"
                            transform="translate(355,153) scale(0.22,0.22)"
                        />
                        <path
                            fill="#222222"
                            // fill="green"
                            d="M 0,0 L 0,267.9 L 1000,267.9 Z"
                            transform="translate(515,153) scale(0.22,0.22)"
                        />
                        <path
                            fill="#222222"
                            // fill="green"
                            d="M 0,0 L 0,267.9 L 1000,267.9 Z"
                            transform="translate(675,153) scale(0.22,0.22)"
                        />
                    </svg>
                    <canvas style={{ height: "100%", width: '100%', position: 'absolute', zIndex: 1 }} ref={canvasRef} />
                    <svg viewBox="0 0 1500 500" width="150%" style={{ background: "none", position: 'relative', zIndex: 3 }}>

                        <LightningBoltCircle
                            transform="scale(0.3,0.3) translate(50,100)"
                        />

                        <PowerLine
                            transform="scale(0.35, 0.37) translate(-140, 720)"
                        />
                        <Generator
                            transform="translate(80, 380) scale(0.15, 0.15)"
                        />

                        <g
                            id="container-frame"
                            transform="translate(360, 216)"
                            stroke="white"
                        >
                            {/* SVG components for power distibution bars when showRight is true */}
                            <g
                                transform="translate(550, 110)"
                            >
                                <LightningBolt
                                    transform="scale(0.2,0.2) translate(-200,-130)"
                                />

                                <path
                                    fill="#fee208"
                                    d="M 0,0 L 150,-180 L 150,-110 Z"
                                    stroke="none"
                                    opacity={0.5}
                                />
                                <path
                                    fill="#5896f3"
                                    d="M 0,0 L 150,35 L 150,-35 Z"
                                    stroke="none"
                                    opacity={0.5}
                                />
                                <path
                                    fill="#cececd"
                                    d="M 0,0 L 150,180 L 150,110 Z"
                                    stroke="none"
                                    opacity={0.5}
                                />

                                <rect
                                    x={150}
                                    y={-35}
                                    height={70}
                                    width={powerBarWidth}
                                    fill="#5896f3"
                                    stroke="none"
                                    opacity={0.5}
                                />
                                <animated.rect
                                    x={150}
                                    y={-35}
                                    height={70}
                                    // width={waypoint ? powerBarScale(waypoint.power.water) : 0}
                                    width={barSpring.water.interpolate(val => powerBarScale(val))}
                                    fill="#5896f3"
                                    stroke="none"
                                />
                                <text alignmentBaseline="middle" textAnchor="middle" x={150 + powerBarWidth / 2} y={0} stroke="none" fill="white" fontSize={30} pointerEvents="none">Water</text>
                                <animated.text alignmentBaseline="middle" textAnchor="middle" x={150 + powerBarWidth + 120} y={0} stroke="none" fill="white" fontSize={30}>{barSpring.water.interpolate(val => Math.floor(val) + '%')}</animated.text>
                                <WaterJugSvg transform={`translate(${150+powerBarWidth+45},0) scale(1.1)`} />

                                <rect
                                    x={150}
                                    y={-180}
                                    height={70}
                                    width={powerBarWidth}
                                    fill="#fee208"
                                    stroke="none"
                                    opacity={0.5}
                                />
                                <animated.rect
                                    x={150}
                                    y={-180}
                                    height={70}
                                    width={barSpring.batteries.interpolate(val => powerBarScale(val))}
                                    fill="#fee208"
                                    stroke="none"
                                    opacity={0.8}
                                />
                                <text alignmentBaseline="middle" textAnchor="middle" x={150 + powerBarWidth / 2} y={-145} stroke="none" fill="white" fontSize={30} pointerEvents="none">Batteries/Mobility</text>
                                <animated.text alignmentBaseline="middle" textAnchor="middle" x={150 + powerBarWidth + 120} y={-145} stroke="none" fill="white" fontSize={30}>{barSpring.batteries.interpolate(val => Math.floor(val) + '%')}</animated.text>
                                {/* <LightningBoltCircleTest transform="translate(465,-156) scale(0.27,0.27)" /> */}
                                <BatterySvg transform={`translate(${150+powerBarWidth+45},-145) scale(1.1)`} />

                                <Tooltip
                                    title="test"
                                    enterDelay={0}
                                    pos
                                >
                                    <rect
                                        x={150}
                                        y={110}
                                        height={70}
                                        width={powerBarWidth}
                                        fill="#cececd"
                                        stroke="none"
                                        opacity={0.5}
                                    />
                                </Tooltip>
                                <animated.rect
                                    x={150}
                                    y={110}
                                    height={70}
                                    width={barSpring.mining.interpolate(val => powerBarScale(val))}
                                    fill="#cececd"
                                    stroke="none"
                                />
                                <text alignmentBaseline="middle" textAnchor="middle" x={150 + powerBarWidth / 2} y={145} stroke="none" fill="white" fontSize={30} pointerEvents="none">Mining</text>
                                <animated.text alignmentBaseline="middle" textAnchor="middle" x={150 + powerBarWidth + 120} y={145} stroke="none" fill="white" fontSize={30}>{barSpring.mining.interpolate(val => Math.floor(val) + '%')}</animated.text>
                                <BlockchainSvg transform={`translate(${150+powerBarWidth+45},145) scale(1.1)`} />

                                <text
                                    fill="white"
                                    stroke="none"
                                    x={150}
                                    y={-230}
                                    fontSize={40}
                                    pointerEvents="none"
                                >
                                    Power Allocation
                            </text>
                                {/* "reveal" rect -- hides above contents when not in view */}
                                <animated.rect
                                    x={spring2.box}
                                    y={-300}
                                    width={800}
                                    height={600}
                                    fill="#222222"
                                    stroke="none"
                                />

                            </g>


                            <LightningBolt
                                transform="translate(30, -105) scale(0.17,0.17)"
                            />
                            <LightningBolt
                                transform="translate(190, -105) scale(0.17,0.17)"
                            />
                            <LightningBolt
                                transform="translate(350, -105) scale(0.17,0.17)"
                            />

                            <rect stroke="none" fill="white" width={150} height={5} transform="translate(20, -60) rotate(15)" />
                            <rect stroke="none" fill="white" width={150} height={5} transform="translate(180, -60) rotate(15)" />
                            <rect stroke="none" fill="white" width={150} height={5} transform="translate(340, -60) rotate(15)" />

                            <rect width={500} height={220} strokeWidth={4} fill="none" />

                            <rect width={40} height={13} fill="white" strokeWidth={4} stroke="white" x={0} y={220} />
                            <rect width={40} height={13} fill="white" strokeWidth={4} stroke="white" x={460} y={220} />

                            <path
                                fill="#ffe91c"
                                d="M 0,90 L 60,90 L 60,0 L 64,0 L 64,108 L 100,108 L 100,70 L 115,70 L 115,74 L 104,74 L 104,146 L 115,146 L 115,150 L 100,150 L 100,112 L 64,112 L 64,200 L 0,200 L 0,196 L 60,196 L 60,94 L 0,94 Z"
                            />

                            {batteries.map((d, i) => (
                                <Tooltip
                                    key={i}
                                    title="test"
                                    enterDelay={0}
                                    pos
                                >
                                    <Battery
                                        width={23}
                                        height={50}
                                        x={115 + (i % (batteries.length / 2)) * 31}
                                        y={i < batteries.length / 2 ? 44 : 125}
                                        focused={highlight === d.id}
                                        charge={d.charge}
                                        onClick={() => {
                                            console.log('setting forcus for: ', d.id);
                                            console.log(d);
                                            if (highlight === d.id) {
                                                setFocus(null);
                                                setHighlight(null);
                                            } else {
                                                setHighlight(d.id);
                                                setFocus(d);
                                            }
                                        }}
                                    />
                                    {/* <rect                            
                                height={56}
                                width={27}
                                x={ 135+(i % (batteries.length/2)) * 27 }
                                y={ i < batteries.length/2 ? 44 : 120}
                                fill={highlight === d.id ? "red" : "yellow"}
                                strokeWidth={2}
                                stroke='black'
                                onClick={() => {
                                    console.log('setting forcus for: ', d.id);
                                    console.log(d);
                                    if(highlight === d.id) {
                                        setFocus(null);
                                        setHighlight(null);
                                    } else {
                                        setHighlight(d.id);
                                        setFocus(d);
                                    }
                                }}
                            /> */}
                                </Tooltip>
                            ))}


                        </g>


                        {/* <rect width="90" height="90" stroke="green" stroke-width="3" fill="yellow" filter="url(#f1)" /> */}

                        <defs>
                            <filter id="f1" x="0" y="0">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
                            </filter>
                            <linearGradient id="grad1" gradientTransform="rotate(90)">
                                <stop offset="0%" stopColor="#222222" />
                                <stop offset="50%" stopColor="yellow" />
                                <stop offset="100%" stopColor="#222222" />
                            </linearGradient>
                            <linearGradient id="grad2">
                                <stop offset="0%" stopColor="#222222" />
                                <stop offset="50%" stopColor="yellow" />
                                <stop offset="100%" stopColor="#222222" />
                            </linearGradient>
                        </defs>
                        <rect
                            width={490}
                            height={214}
                            x={368}
                            y={0}
                            // opacity={0.25}
                            opacity={focusSolar ? 0.25 : 0.0}
                            stroke="none"
                            // fill={ focusGrid ? "url(#grad1)" : "none" }
                            fill="url(#grad2)"
                            filter="url(#f1)"
                            onMouseOver={() => setFocusSolar(true)}
                            onMouseOut={() => setFocusSolar(false)}
                        />
                        <rect
                            width={268}
                            height={50}
                            x={90}
                            y={289}
                            // opacity={0.25}
                            opacity={focusGrid ? 0.25 : 0.0}
                            stroke="none"
                            // fill={ focusGrid ? "url(#grad1)" : "none" }
                            fill="url(#grad1)"
                            filter="url(#f1)"
                            onMouseOver={() => setFocusGrid(true)}
                            onMouseOut={() => setFocusGrid(false)}
                        />
                        <rect
                            width={207}
                            height={50}
                            x={150}
                            y={390}
                            // opacity={0.25}
                            opacity={focusGen ? 0.25 : 0.0}
                            stroke="none"
                            // fill={ focusGrid ? "url(#grad1)" : "none" }
                            fill="url(#grad1)"
                            filter="url(#f1)"
                            onMouseOver={() => setFocusGen(true)}
                            onMouseOut={() => setFocusGen(false)}
                        />

                        <line
                            x1={0}
                            x2={1000}
                            y1={450}
                            y2={450}
                            stroke={'white'}
                            strokeWidth={4}
                        />

                    </svg>
                </div>
                <div style={{ backgroundColor: '#222222', padding: 20 }}>
                    <Slider
                        track={false}
                        min={0}
                        max={100}
                        defaultValue={[30, 70]}
                        // valueLabelDisplay="auto"       
                        aria-labelledby="track-false-range-slider"
                        onChangeCommitted={(event, value) => {
                            setSliderValue(value);
                            renderCanvas(canvasRef.current, value)
                        }}
                    />

                </div>
            </animated.div>
        </>
    )

}

export default BatteriesSvg;
