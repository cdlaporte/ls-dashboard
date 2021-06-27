import React, { useState, useRef, useEffect } from 'react';
import clamp from 'lodash-es/clamp';
import swap from 'lodash-move';
import { useDrag } from 'react-use-gesture';
import { useSprings, animated, interpolate } from 'react-spring';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader'
import AddSharpIcon from '@material-ui/icons/AddSharp';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import cloneDeep from 'clone-deep';
import { Card, CardContent, CardActionArea, Button, CardActions, Typography } from '@material-ui/core';

const Row = styled.div`
	width: 100%;
	height: 100%;
	// display: in-line;
`;

const StyledDiv = styled.div`	
	height: 100%;
	overflow-y: hidden;
	background: #222222;
`;

// Styled components
const StyledFramePanel = styled.div`
    
	width: ${props => props.width}px;
	height: 100%;
	overflow-y: hidden;
	position: relative;
	// background: #f5f5f5;
	background: #424242;
	border-radius: 4px;
	outline: 0;
	margin: auto;
	&:hover {
		overflow-y: none;
	}
	::-webkit-scrollbar {
	  width: 10px;
	}
	::-webkit-scrollbar-track {
	//   background: #424242;
      background: grey;
	}
	::-webkit-scrollbar-thumb {
	  background: #bbb;
	}
	::-webkit-scrollbar-thumb:hover {
	  background: #aaa;
	}

`;
// const StyledFramePanel = styled.div`
// 	width: ${props => props.width}px;
// 	height: 100%;
// 	overflow-y: hidden;
// 	position: relative;
// 	// background: #f5f5f5;
// 	background: #424242;
// 	border-radius: 4px;
// 	outline: 0;
	
// 	&:hover {
// 		overflow-y: scroll;
// 	}
// 	::-webkit-scrollbar {
// 	  width: 10px;
// 	}
// 	::-webkit-scrollbar-track {
// 	  background: #424242;
// 	}
// 	::-webkit-scrollbar-thumb {
// 	  background: #bbb;
// 	}
// 	::-webkit-scrollbar-thumb:hover {
// 	  background: #aaa;
// 	}

// `;
const StyledFrame = styled(animated.div)`		
    margin-top: 10px;
    display: inline-block;
	width: ${props => props.width}px;
	height: ${props => props.height}px;
	box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);	
	border: ${props => props.selected ? "2px solid rgb(255,233,27)" : "none"};
	pointer-events: all;
	transform-origin: 50% 50% 0px;
	border-radius: 4px;
	// border-color: white;
	color: white;
	line-height: ${props => props.height}px;
	text-align: center;
	font-size: 14.5px;
	background-color: #222222;
	text-transform: uppercase;
	letter-spacing: 2px;

  	-webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                          supported by Chrome and Opera */	
`;
// const StyledFrame = styled(animated.div)`
// 	position: absolute;		
// 	width: ${props => props.width}px;
// 	height: ${props => props.height}px;
// 	box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);	
// 	border: ${props => props.selected ? "2px solid rgb(255,233,27)" : "none"};
// 	pointer-events: all;
// 	transform-origin: 50% 50% 0px;
// 	border-radius: 4px;
// 	// border-color: white;
// 	color: white;
// 	line-height: ${props => props.height}px;
// 	text-align: center;
// 	font-size: 14.5px;
// 	background-color: #222222;
// 	text-transform: uppercase;
// 	letter-spacing: 2px;

//   	-webkit-touch-callout: none; /* iOS Safari */
//     -webkit-user-select: none; /* Safari */
//     -khtml-user-select: none; /* Konqueror HTML */
// 	-moz-user-select: none; /* Firefox */
// 	-ms-user-select: none; /* Internet Explorer/Edge */
//     user-select: none; /* Non-prefixed version, currently
//                           supported by Chrome and Opera */	
// `;

const StyledOrderNum = styled.div`	
	line-height: 0;	
	position: absolute;
	text-align: center;
	transform: translate3d(-15px,12px,0px);
`;

const FRAME_SPACING = 15;

const orderToPositions = (order) => order.reduce((acc, cur, i) => {
    acc[cur] = i;
    return acc;
}, {});

const getStyles = (order, frameHeight, down, originalIndex, curIndex, y) => (index) => (
    down && index === originalIndex ?
        { y: (curIndex * (frameHeight + FRAME_SPACING) + y), scale: 1.1, zIndex: '1', shadow: 15, immediate: (n) => (n === 'y' || n === 'zIndex') }
        : { y: (order.indexOf(index) * (frameHeight + FRAME_SPACING)), scale: 1, zIndex: '0', shadow: 5, immediate: false }
);


function FramePanel({ width, height, subRegion, setWaypoint, waypoint, initialFrames, frameHeight = 90, frameWidth = 90, setPresentation, setCurrentFrameId, getCameraPos, currentSlideState, setShowSide }) {






    // const [frames, setFrames] = useState(initialFrames.frames);
    const [orderIds, setOrderIds] = useState(initialFrames.order);


    const [selectedIndex, setSelectedIndex] = useState(0);
    // const [getCameraPosition, setGetCameraPosition] = useState(getCameraPos);



    // Store frame order as array of indicies in a local ref. Maps order of display to order of frames..
    const order = useRef(orderIds.map((_, i) => i));
    const idOrder = useRef(orderIds);






    // Maps frame (ref by index) to current order
    const [positions, setPositions] = useState(orderToPositions(order.current));


    // Create springs, each corresponds to a frame, controlling its transform
    const [springs, setSprings] = useSprings(Object.keys(initialFrames.frames).length, getStyles(order.current, frameHeight));

    // TODO: change originalindex to origid
    const bind = useDrag(({ args: [originalIndex], down, movement: [, y] }) => {

        const curIndex = order.current.indexOf(originalIndex);

        const curRow = clamp(Math.round((curIndex * (frameHeight + FRAME_SPACING) + y) / (frameHeight + FRAME_SPACING)), 0, Object.keys(initialFrames.frames).length - 1);

        const newOrder = swap(order.current, curIndex, curRow);
        const newIdOrder = swap(idOrder.current, curIndex, curRow);
        
        // Feed springs new style data, they'll animate the view without causing a single render.. TODO: added frameHeight, is this still true?
        setSprings(getStyles(newOrder, frameHeight, down, originalIndex, curIndex, y));

        if (!down) {
            order.current = newOrder; // save order in ref
            idOrder.current = newIdOrder;
            setPositions(orderToPositions(newOrder));
            // safe order in frame objects TODO			
        }
    });



    // TODO: fix.. look at styled components	
    // <StyledFramePanel width={frameWidth+2*FRAME_SPACING} style={{ height: (frames.length*(frameHeight+FRAME_SPACING) + FRAME_SPACING) }}>	
    console.log('frame pannel render');
    return (

        <StyledDiv>
            <Divider style={{backgroundColor: 'rgba(255, 255, 255, 0.08)'}}/>
            <List
                style={{borderTop: '1px solid grey'}}
                disablePadding
                subheader={
                    <Row>
                        <ListSubheader style={{ textAlign: 'left' }}>{subRegion.name}, {subRegion.region}</ListSubheader>
                        <ListItemSecondaryAction
                            style={{
                                zIndex: 99999999
                            }}
                        >
                            <IconButton
                                aria-label="new slide"
                                color="primary"
                                onClick={() => setShowSide('front')}
                            // size="small"
                            // edge="end"														
                            >
                                <ArrowBackIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </Row>
                }
            >
                <Divider />
            </List>
            <StyledFramePanel width={frameWidth + 2 * FRAME_SPACING}>
                {/* {springs.map(({ zIndex, shadow, y, scale }, i) => ( */}
                { subRegion.waypoints.map((d, i) => (
                    <StyledFrame
                        // {...bind(i)}
                        onClick={() => { setSelectedIndex(i); setCurrentFrameId(idOrder.current[positions[i]]); setWaypoint(d); }}
                        className='child'
                        // height={frameHeight}
                        width={frameWidth}
                        selected={selectedIndex === i}
                        key={i}
                        // style={{
                        //     zIndex,
                        //     boxShadow: shadow.interpolate(s => `rgba(0, 0, 0, 0.35) 0px ${s}px ${2 * s}px 0px`),
                        //     transform: interpolate([y, scale], (y, s) => `translate3d(${FRAME_SPACING}px,${y + FRAME_SPACING}px,0px) scale(${s})`)
                        // }}
                    >
                        {/* <StyledOrderNum>{positions[i]+1}</StyledOrderNum>						 */}
                        {/* <div>Waypoint {i}</div> */}
                        <Card>
                            <CardActionArea>
                                <CardContent style={{ margin: 10}}>
                                    <Typography gutterBottom variant="h6" component="h2" style={{ textAlign: 'left' }}>
                                        {d.id}
                                    </Typography>
                                    
                                    {/* <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: 'left' }}>
                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                        across all continents except Antarctica
                                    </Typography> */}
                                </CardContent>                        
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Remove
                                </Button>
                                {/* <Button size="small" color="primary">
                                    Learn More
                                </Button> */}
                            </CardActions>                                    
                        </Card>

                    </StyledFrame>
                ))}
            </StyledFramePanel>
        </StyledDiv>

    );

}

export default FramePanel;


