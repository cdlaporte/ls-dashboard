import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';

const Scene = styled.div`
    // margin: auto;
    width: ${ props => props.width }px;
    height: ${ props => props.height + props.heightUnit};
    // border: 1px solid #CCC;
    perspective: 800px;
`;

const AnimatedCube = styled(animated.div)`
    width: ${ props => props.width }px;
    height: ${ props => props.height + props.heightUnit };
    position: relative;
    transform-style: preserve-3d;
    // transform: ${props => `translateZ(-${props.width/2}px)`}
`;

const CubeFace = styled.div`
    // border-right: 1px solid grey;
    // border-right: 1px solid black;
    // border-left: 1px solid black;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    boder-radius: 6px;
    position: absolute;
    width: ${ props => props.width }px;
    height: ${ props => props.height + props.heightUnit};
    transform: ${ props => {
        switch(props.side) {
            case "front":
                return `rotateY(0deg) translateZ(${props.width/2}px);`;
            case "right":
                return `rotateY(90deg) translateZ(${props.width/2}px);`;
            case "back":
                return `rotateY(180deg) translateZ(${props.width/2}px);`;
            case "left":
                return `rotateY(-90deg) translateZ(${props.width/2}px);`;                                    
            case "top":
                return `rotateX(90deg) translateZ(${props.height/2}${props.heightUnit});`;       
            case "bottom":
                return `rotateX(-90deg) translateZ(${props.height/2}${props.heightUnit});`;
        }
    }}
    background: ${ props => props.background };
    
    // display: flex;
    // flex-wrap: wrap;
    // display: grid;
    // grid-template-columns: repeat(auto-fill, 200px);
    // grid-gap: 50px;
    // justify-content: center;
    // margin-right: 10px;
    scrollbar-gutter: always;
    overflow-y: hidden;
    // &:hover {
    //     overflow-y: scroll;
    //     margin-right: -10px;
    // }

	// /* width */
	// ::-webkit-scrollbar {
	//   width: 10px;
	// }
	// /* Track */
	// ::-webkit-scrollbar-track {
	//   background: #f1f1f1;
	// }
	// /* Handle */
	// ::-webkit-scrollbar-thumb {
	//   background: #bbb;
	// }
	// /* Handle on hover */
	// ::-webkit-scrollbar-thumb:hover {
	//   background: #aaa;
	// }    
`;

function CubeDisplay({width=100, height=200, heightUnit='px', showingSide="front", showColors=false, rightFace=null, frontFace=null, leftFace=null, backFace=null}) {

    // consts
    const sides = ['front', 'back', 'right', 'left'];
    const colors = ['hsla(  0, 100%, 50%, 0.7)', 'hsla(120, 100%, 50%, 0.7)', 'hsla( 60, 100%, 50%, 0.7)', 'hsla(180, 100%, 50%, 0.7)', 'hsla(240, 100%, 50%, 0.7)', 'hsla(300, 100%, 50%, 0.7)'];
    const sidePropMap = {
        'front' : frontFace,
        'back' : backFace,
        'left' : leftFace,
        'right' : rightFace
    };

    // state
    const [transforms, setTransforms] = useState({
        front : `translateZ(-${width/2}px) rotateY(0deg) rotateX(0deg)`,
        back : `translateZ(-${width/2}px) rotateY(-180deg) rotateX(0deg)`,
        right : `translateZ(-${width/2}px) rotateY(-90deg) rotateX(0deg)`,
        left : `translateZ(-${width/2}px) rotateY(90deg) rotateX(0deg)`,
        top : `translateZ(-${height/2}${heightUnit}) rotateY(0deg) rotateX(-90deg)`,
        bottom : `translateZ(-${height/2}${heightUnit}) rotateY(0deg) rotateX(90deg)`
    });

    const [cubeTransform, setCubeTransform] = useState(transforms[showingSide]);

    // on resize
    useEffect(() => {

        console.log('in cube resize did this trigger... shit looks like:');
        console.log()

        const transformMap = {
            front : `translateZ(-${width/2}px) rotateY(0deg) rotateX(0deg)`,
            back : `translateZ(-${width/2}px) rotateY(-180deg) rotateX(0deg)`,
            right : `translateZ(-${width/2}px) rotateY(-90deg) rotateX(0deg)`,
            left : `translateZ(-${width/2}px) rotateY(90deg) rotateX(0deg)`,
            top : `translateZ(-${height/2}${heightUnit}) rotateY(0deg) rotateX(-90deg)`,
            bottom : `translateZ(-${height/2}${heightUnit}) rotateY(0deg) rotateX(90deg)`
        };

        setTransforms(transformMap);
        // needed to add this for responsive initial render?
        setCubeTransform(transformMap[showingSide]);

    }, [width, height]);

    // on side change
    useEffect(() => {
        setCubeTransform(transforms[showingSide]);
    }, [showingSide]);

    // springs
    const spring = useSpring({ from: { transform: cubeTransform }, transform: cubeTransform, config: config.stiff });

    return (
        <Scene width={width} height={height} heightUnit={heightUnit}>
            <AnimatedCube width={width} height={height} heightUnit={heightUnit} style={{ transform: spring.transform }}>
                {sides.map((side, i) => (
                    <CubeFace key={side} width={width} height={height} heightUnit={heightUnit} side={side} background={ '#222222'}>
                        {sidePropMap[side]}
                    </CubeFace>
                ))}  
            </AnimatedCube>
        </Scene>
    )
}

export default CubeDisplay;