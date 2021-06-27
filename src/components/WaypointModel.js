import * as THREE from 'three';
import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree, extend, useLoader } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useSpring, config, animated } from 'react-spring';
import { Bezier } from 'bezier-js';
import { FogExp2 } from 'three';
import model from '../assets/waypoint.glb';
import bike from '../assets/bike.glb';
import { Html } from '@react-three/drei';
import { Grid, Typography } from '@material-ui/core';
import { SettingsPhoneTwoTone } from '@material-ui/icons';

extend({ OrbitControls }); // makes OrbitControls available as jsx element



const calculateControlPoint = (p1, p2) => {

    if (((p1[0] > 0) && (p2[0] > 0)) || ((p1[0] < 0) && (p2[0] < 0))) {
        // on the same side of waypoint
        return [p2[0], 21, (p1[2] + p2[2]) / 2];
    } else {
        // different side of waypoint)
        if (p1[2] > 0) {
            return [0, 50, 180];
        } else return [0, 50, -180];

    }
};


// // *** for .obj format, deprecated in favor of glb
// function Model({}) {
//     const [obj, set] = useState();
//     // useMemo(() => new OBJLoader().load(model, set), []);
//     useMemo(() => new GLTFLoader().load(model, set), [model]);
//     return obj ? <primitive object={obj.scene} rotation={[-Math.PI/2,0,0]} scale={[0.1, 0.1, 0.1]} /> : null;
// }
//
// function Bike({position}) {
//     const [obj, set] = useState();
//     useMemo(() => new OBJLoader().load(bike, set), []);
//     return obj ? <primitive object={obj} rotation={[0,Math.PI/2,0]} scale={[0.3, 0.3, 0.3]} position={position} /> : null;
// }

function Model({ }) {
    const obj = useLoader(GLTFLoader, model);
    return <primitive object={obj.scene} rotation={[-Math.PI / 2, 0, 0]} scale={[0.1, 0.1, 0.1]} dispose={null} />;
}

function Bike({ position }) {
    const [obj, set] = useState();
    useMemo(() => new GLTFLoader().load(bike, set), []);
    return obj ? <primitive object={obj.scene} rotation={[0,Math.PI/2,0]} scale={[0.3, 0.3, 0.3]} position={position} /> : null;    
    // for some reason the multiple bikes don't display when using the useLoader hook w/ Suspense
    // console.log('possition is:');
    // console.log(position);
    // const obj = useLoader(GLTFLoader, bike);
    // return <primitive object={obj.scene} rotation={[0, Math.PI / 2, 0]} scale={[0.3, 0.3, 0.3]} position={position} dispose={null} />;
}

function CameraControls({ focus }) {

    // bezier curve along which we interpolate camera when changing focus
    const [curve, setCurve] = useState(null);

    const dollyRunning = useRef(false);

    const {
        camera,
        gl: { domElement }
    } = useThree();

    const spring = useSpring({
        to: { t: 1 },
        from: { t: 0 },
        config: { mass: 2, tension: 260, friction: 180 },
        // config : { duration: 2000},
        reset: true,
        onRest: () => {
            dollyRunning.current = false;
        }
    });

    useEffect(() => {

        if (!focus) {

            const curPos = Object.values(camera.position);

            // TODO: calculate control point for bezier curve
            const controlPoint = calculateControlPoint(curPos, [55, 30, 55]);
            // const curve = new Bezier(...curPos, ...[x, 20, z]);

            setCurve(new Bezier(...curPos, ...controlPoint, ...[55, 30, 55]));
            dollyRunning.current = true;

        } else {

            const curPos = Object.values(camera.position);
            // position is focus.pos
            const x = focus.pos[0] > 0 ? 60 : -60;
            const z = focus.pos[2] > 0 ? focus.pos[2] + 10 : focus.pos[2] - 10;
            // TODO: calculate control point for bezier curve
            const controlPoint = calculateControlPoint(curPos, [x, 20, z]);
            // const curve = new Bezier(...curPos, ...[x, 20, z]);

            setCurve(new Bezier(...curPos, ...controlPoint, ...[x, 20, z]));
            dollyRunning.current = true;
            // camera.position.set(x,20,z);
            // camera.lookAt(new THREE.Vector3(focus.pos[0],focus.pos[1],focus.pos[2]));
            // camera.updateProjectionMatrix();
        }

    }, [focus]);

    useFrame((state) => {
        if (dollyRunning.current) {
            let pos = curve.get(spring.t.value);
            camera.position.set(pos.x, pos.y, pos.z);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            camera.updateProjectionMatrix();
        }
    })


    // const controls = useRef();
    // useFrame((state) => controls.current.update());

    return null;

    // return (
    //     <orbitControls ref={controls} args={[camera, domElement]} />
    // ); 

}

// TODO: organize this helper componenets better, maybe own file in subdirectory
function Plane({ position }) {

    return (
        <gridHelper rotation={[Math.PI, 0, 0]} args={[500, 70, "#ffe91c", "#ffe91c"]} />
        // <mesh receiveShadow>
        //     <planeBufferGeometry attach="geometry" args={[1000, 1000]} />            
        //     <meshStandardMaterial attach="material" color="#00ee33" />
        // </mesh>
    )
}

function Box({ id, position, whd, color = "#575757", focus, charge }) {

    const finished = useRef(false);

    const spring = useSpring({
        to: { width: '150px' },
        from: { width: '0px' },
        //    config: config.molasses,
        reset: true,
        onRest: () => {
            finished.current = true;
        },
        onStart: () => {
            finished.current = false;
        }
    });

    return (
        <mesh castShadow receiveShadow position={position}>
            <boxGeometry attach="geometry" args={whd} />
            <meshStandardMaterial attach="material" roughness={0.5} color={color} />
            {focus && (
                <Html>
                    <animated.div style={{ width: spring.width, backgroundColor: 'rgba(0,0,0,0.7)', padding: '10px', transform: 'translate(30%,-50%)' }}>
                        {finished.current && (
                            <div>
                                <p1>Battery {id}</p1>
                                <p style={{ margin: 2 }}>Charge: {charge}%</p>


                                {/* <Grid
                                    style={{margin: 2}}                                    
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Typography variant="body2">Battery</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2">#2847</Typography>
                                    </Grid>
                                </Grid> 
                                <Grid
                                    style={{margin: 2}}                                    
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Typography variant="body2">Charge</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2">49%</Typography>
                                    </Grid>
                                </Grid>                                                                  */}
                            </div>
                        )}
                    </animated.div>
                </Html>
            )}
        </mesh>
    )
}

function WaypointModel({ batteries, focus }) {



    return (
        <Canvas
            shadowMap
            camera={{
                position: [0, 0, 15],
                fov: 50
            }}
            onCreated={({ gl }) => {
                // gl.toneMapping = THREE.ACESFilmicToneMapping
                // gl.outputEncoding = THREE.sRGBEncoding
                gl.setClearColor('#222222')
            }}
        >
            {/* <color attach="background" args={["#222222"]} /> */}
            <fog attach="fog" args={['#222222', 30, 140]} />
            {/* <fogExp2 attach="fog" args={['black', 0.02155]}/> */}
            <CameraControls focus={focus} />
            <pointLight position={[-10, -10, 30]} intensity={0.55} />
            <spotLight intensity={0.4} position={[-30, -30, 50]} angle={0.2} penumbra={1} castShadow />
            <ambientLight intensity={0.5} />
            <Plane />

            {/* <Box 
                position={[0, 0, 4.25]}
                whd={[20,8,8.5]}
            />
            <Box 
                position={[0, -7.5, 8.5]}
                whd={[20,7,0.2]}         
                color="#3656a7"       
            />
            <Box 
                position={[0, 7.5, 8.5]}
                whd={[20,7,0.2]}                
                color="#3656a7" 
            /> */}
            {batteries.map((bat, i) => {
                return (
                    <Box
                        id={bat.id}
                        key={bat.id}
                        position={bat.pos}
                        charge={bat.charge}
                        whd={bat.whd}
                        focus={focus && (bat.id === focus.id)}
                        color={focus ? (bat.id === focus.id ? 'red' : 'yellow') : "yellow"}
                    />
                );
            })}
            <mesh>
                <Suspense fallback={null}>
                    <Model attach="geometry" />
                </Suspense>
                <meshStandardMaterial attach="material" color='#ff0000' />
            </mesh>
            
            <Bike
                position={[20, 0, 39]}
            />
            <Bike
                position={[20, 0, 46]}
            />
            
        </Canvas>
    )
}

export default WaypointModel;