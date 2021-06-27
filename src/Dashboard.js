import './App.css';
import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import WaypointModel from './components/WaypointModel';
import BatteriesSvg from './components/BatteriesSvg';
import RegionSelector from './components/RegionSelector';
import BreakEvenChart from './components/BreakEvenChart';
import RevenueStackChart from './components/RevenueStackChart';
import * as d3 from 'd3';
import { useSpring } from 'react-spring';
import { AppBar, Tabs, Tab, Grid, Paper, IconButton, Menu, Divider, Card, CardContent, GridList, GridListTile, Avatar } from '@material-ui/core'; // TODO: import separatly to reduce bundle size
import SwipeableViews from 'react-swipeable-views';
import { ReactComponent as LSLogo } from './assets/lslogo.svg';
import { ReactComponent as LSNameLogo } from './assets/lsnamelogo.svg';
import CubeDisplay from './components/CubeDisplay';
import FramePanel from './components/FramePanel';
import scott from './assets/scott-avatar.png';
import { ParentSize } from '@vx/responsive';


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const nBat = 24;

// x={ 135+(i % (batteries.length/2)) * 27 }
// y={ i < batteries.length/2 ? 44 : 120}

// battery geometry dimensions
const w = 2;
const h = 6;
const d = 3;

const totalLen = (nBat / 2) * (d + (d / 2))

const genFakeBatteries = () => {
  return d3.range(nBat).map((bat, i) => {

    // constants depend on dimentions of position of waypoint model.. TODO: remove this dependancy
    let xpos = i < nBat / 2 ? 10 : -10;
    let ypos = h / 2 + 2;
    let zpos = -(totalLen / 2 - (d + (d / 2) / 2)) + (i % (nBat / 2)) * (d + (d / 2));

    return {
      id: i,
      charge: getRandomIntInclusive(0, 100),
      rented: getRandomIntInclusive(0, 1),
      whd: [w, h, d],
      pos: [xpos, ypos, zpos]
    }
  });
}


const fakePresentation = {
  order: ['frame1', 'frame2'],
  frames: {
    "frame1": {
      // fake axes data
      layout: {
        type: 'spiral'
      },
      n: 200,
      color: 'blue',
      axes: [
        {
          type: "bottom",
          scale: null,
          label: "Bottom Axis",
          key: "botaxis1",
          name: "Axis Bottom",
          showGraticule: false
        },
        {
          type: "left",
          scale: null,
          label: "Left Axis",
          key: "leftaxis2",
          name: "Axis Left",
          showGraticule: false
        }
      ],
      camera: {
        position: [-100, -100, 1]
      },
      name: "frame1",
      text: [],
      data: [{ name: 'Test Data 1', id: 'bubs1' }],
      annotations: [{ shouldZoom: true, name: 'Annotation 1' }, { shouldZoom: false, name: 'Annotation 2' }],
      images: [] //refs
    },
    "frame2": {
      // fake axes data
      layout: {
        type: 'grid'
      },
      n: 2000,
      color: 'red',
      axes: [
        {
          type: "left",
          // scale: scaleLinear({
          // 	domain: [0, 100],
          // 	range: [600, 0] // height - top+bottom margin
          // }),
          scale: 'linear',
          domain: [0, 100],
          range: [0, 1], // relative acording to height and width
          label: "Left Axis",
          key: "leftaxis2",
          name: "Axis Left",
          showGraticule: false
        }
      ],
      camera: {
        position: [30, 30, 10]
      },
      name: "frame2",
      text: [{ name: 'text1', text: 'this is a test' }],
      data: [{ name: 'bubs1', id: 'bubs1' }],
      annotations: [{ shouldZoom: true, name: 'annotation1' }, { shouldZoom: false, name: 'annotation2' }],
      images: [] //refs
    }
  }
};

const fakeRegions = [
  {
    name: 'Indonesia',
    subRegions: [{
      name: 'Sumba',
      region: 'Indonesia',
      center: [-9.733420, 119.952586],
      zoom: 8,
      summary: {
        "Total Waypoints": 3,
        "People Powered": 2713,
        "Water Generated": '4.2M Liters',
        "CO2 Reduction": '12.3M Lbs',
        "Lives Saved": 12,
        "Live Revenue": '$245,138k',
        "Carbon Credits": 56
      },
      waypoints: [{
        latlon: [-9.658814, 120.254512],
        id: 'Waypoint 01',
        radius: 11800,
        batteries: genFakeBatteries(),
        power: {
          batteries: 65,
          water: 35,
          mining: 0
        }
      }, {
        latlon: [-10.238923, 120.359650],
        id: 'Waypoint 02',
        radius: 11800,
        batteries: genFakeBatteries(),
        power: {
          batteries: 55,
          water: 15,
          mining: 30
        }
      }, {
        latlon: [-9.563422, 118.984267],
        id: 'Waypoint 03',
        radius: 11800,
        batteries: genFakeBatteries(),
        power: {
          batteries: 60,
          water: 20,
          mining: 20
        }
      }]
    }, {
      name: 'Sawa',
      region: 'Indonesia',
      center: [-10.529148, 121.873257],
      zoom: 10,
      summary: {
        "Total Waypoints": 2,
        "People Powered": 1512,
        "Water Generated": '2.5M Liters',
        "CO2 Reduction": '8.6M Lbs',
        "Lives Saved": 5,
        "Live Revenue": '$189,176k',
        "Carbon Credits": 36
      },
      waypoints: [{
        latlon: [-10.498459, 121.838969],
        id: 'Waypoint 04',
        radius: 11800,
        batteries: genFakeBatteries(),
        power: {
          batteries: 90,
          water: 5,
          mining: 5
        }
      }, {
        latlon: [-10.497278, 121.975972],
        id: 'Waypoint 05',
        radius: 11800,
        batteries: genFakeBatteries(),
        power: {
          batteries: 40,
          water: 30,
          mining: 30
        }
      }]
    }]
  }, {
    name: 'Nigeria',
    subRegions: [{
      name: 'South West',
      region: 'Nigeria',
      center: [7.008965, 3.613828],
      zoom: 8,
      summary: {
        "Total Waypoints": 2,
        "People Powered": 1341,
        "Water Generated": '2.2M Liters',
        "CO2 Reduction": '7.1M Lbs',
        "Lives Saved": 4,
        "Live Revenue": '$159,351k',
        "Carbon Credits": 29
      },
      waypoints: [{
        latlon: [6.518240, 3.143937],
        id: 'Waypoint 06',
        radius: 11800,
        batteries: genFakeBatteries(),
        power: {
          batteries: 60,
          water: 30,
          mining: 10
        }
      }, {
        latlon: [7.306180, 3.998224],
        id: 'Waypoint 07',
        radius: 11800,
        batteries: genFakeBatteries(),
        power: {
          batteries: 20,
          water: 75,
          mining: 5
        }
      }]
    }]
  }];
//   {
//       name: 'Nigeria',
//       subRegions: ['Sumba', 'Sumba2', 'Sumba3']
//   },
//   {
//       name: 'Benin',
//       subRegions: ['Sumba', 'Sumba2', 'Sumba3']
//   },
//   {
//       name: 'Kenya',
//       subRegions: ['Sumba', 'Sumba2', 'Sumba3']
//   }            
// ];

// -9.658814, 120.254512
// const fakeWaypoints = [{
//     latlon: [51.505, -0.09],
//     radius: 800
// }];


function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      style={{ overflow: 'hidden' }}
    >
      {/* {value === index && ( */}
      <>
        { children}
      </>
      {/* )} */}
    </div>
  )
}


function Dashboard() {

  // const [batteries, setBatteries] = useState(fakeBatteries);
  const [focus, setFocus] = useState(null);
  const [subRegion, setSubRegion] = useState(fakeRegions[0].subRegions[0]);
  const [waypoint, setWaypoint] = useState(null);

  const [revenueFocusDate, setRevenueFocusDate] = useState(null);

  const [tabValue, setTabValue] = useState(0);
  const [expandMap, setExpandMap] = useState(false);

  const [showSide, setShowSide] = useState('front');


  const [presentation, setPresentation] = useState(fakePresentation);

  // current frame state
  // const [currentFrame, setCurrentFrame] = useState(presentation[0]);

  // order of presentation -- this should be somewhere in the presentation object
  const [order, setOrder] = useState(presentation.order);
  // is this the right place for this?	
  const [currentFrameId, setCurrentFrameId] = useState(order[0]);
  const [getCameraPosition, setGetCameraPosition] = useState({ getCam: () => null });

  const [currentSlideState, setCurrentSlideState] = useState(presentation.frames[currentFrameId]);


  // useEffect(() => {
  //   if(!waypoint) {
  //     setExpandMap(false);
  //   } else {
  //     setExpandMap(true);
  //   }
  // }, [waypoint]);

  return (
    <div className="App" style={{ height: '100vh'}}>
      <Grid container spacing={0} style={{ height: '100%', width: '100%' }}>
        <Grid item sm={2}
          style={{
            marginRight: 0,
            backgroundColor: '#222222',
            borderRight: '1px solid #222222',
            boxShadow: "2px 0px 3px 2px rgb(0 0 0 / 10%), 2px 3px 4px 0px rgb(0 0 0 / 14%), 2px 1px 8px 0px rgb(0 0 0 / 12%)",
            display: 'flex',
            flexDirection: 'column'
          }}>
          <div style={{ height: '30px', padding: 15, paddingBottom: 25, textAlign: 'left', display: 'flex' }} >

            <LSLogo style={{ height: '40px' }} />
            <LSNameLogo style={{ marginLeft: 10, height: '40px' }} />

          </div>
          {/* <Divider/> */}
          <div id='test' style={{ flexGrow: 1 }}>
            <ParentSize>
              {parent => (

                <CubeDisplay
                  height={100}
                  heightUnit={'%'}
                  width={parent.width}
                  showingSide={showSide}
                  frontFace={
                    <RegionSelector
                      regions={fakeRegions}
                      setSubRegion={setSubRegion}
                      setShowSide={setShowSide}
                    />
                  }
                rightFace={
                  <FramePanel                     
                    subRegion={subRegion}
                    setWaypoint={setWaypoint}
                    initialFrames={presentation}    	
                    frameHeight={190} 
                    frameWidth={parent.width - 30} // total width is 210 ( +60 for 30 margin on each side) ******TODO: make this not terrible											
                    setPresentation={setPresentation}													
                    setCurrentFrameId={setCurrentFrameId}				
                    getCameraPos={getCameraPosition}								
                    currentSlideState={currentSlideState}
                    setShowSide={setShowSide}    
                  />	              
                }
                />

              )}


            </ParentSize>
          </div>

          {/* <RegionSelector
            regions={fakeRegions}
            setSubRegion={setSubRegion}
          // setRegion={setRegion}
          /> */}
        </Grid>
        <Grid item sm={10} >

          {/* <AppBar
            color='default'
            style={{ right: 'auto'}}
          > */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}
          >
            <div
              style={{ display: 'flex' }}
            >
              <Paper square elevation={3} style={{ width: '100%', backgroundColor: '#222222', }}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-end"
                >
                  <Grid item>
                    <Tabs
                      value={tabValue}
                      onChange={(e, v) => setTabValue(v)}
                      indicatorColor="primary"
                      textColor="primary"
                    >
                      <Tab label="Overview" />
                      <Tab label="Revenue" />
                      <Tab label="Power" />
                      <Tab label="Impact" />
                      <Tab label="Waypoints" />
                      <Tab label="Power Rangers" />
                      {/* <Tab label="Anomalies" />      */}
                    </Tabs>
                  </Grid>
                  <Grid item>
                    <IconButton size="small" style={{ margin: '5px', marginRight: '20px' }}>
                      <Avatar src={scott} style={{ height: '40px', width: '40px' }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            </div>
            {/* </AppBar> */}

            <div style={{ flexGrow: 1, padding: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }} >

                <Map
                  expanded={expandMap}
                  subRegion={subRegion}
                  setWaypoint={setWaypoint}
                  waypoint={waypoint}
                />

                <SwipeableViews
                  axis={expandMap ? 'y' : 'x'}
                  index={expandMap ? -1 : tabValue}
                  onChangeIndex={(index) => setTabValue(index)}
                  disableLazyLoading={true}
                >
                  <TabPanel value={tabValue} index={0}>
                    <GridList cellHeight={'auto'} spacing={10} style={{ paddingTop: '10px' }}>

                      <GridListTile cols={1} rows={1}>

                        <Card style={{ height: '100%' }}>
                          <CardContent style={{ height: '100%', paddingTop: '50%' }}>
                            {/* <div style={{ height: '100%'}}>  */}
                            <WaypointModel
                              batteries={waypoint ? waypoint.batteries : []}
                              focus={focus}
                            />
                            {/* </div> */}
                          </CardContent>
                        </Card>

                      </GridListTile>

                      <GridListTile cols={1} rows={1}>
                        <Card>
                          <CardContent style={{ marginBottom: '5px' }}>

                            <BatteriesSvg
                              batteries={waypoint ? waypoint.batteries : []}
                              setFocus={setFocus}
                              waypoint={waypoint}
                            />

                          </CardContent>
                        </Card>
                      </GridListTile>

                    </GridList>
                  </TabPanel>

                  <TabPanel value={tabValue} index={1}>

                    <GridList cellHeight={374} spacing={10} style={{ paddingTop: '10px' }}>

                      <GridListTile cols={1} rows={1}>

                        <Card style={{ height: '100%' }}>
                          <CardContent style={{ height: '100%' }}>
                            {/* <div style={{ height: '100%'}}>  */}
                            <BreakEvenChart
                              width={300}
                              height={300}
                              focusDate={revenueFocusDate}
                              setFocusDate={setRevenueFocusDate}
                            />
                            {/* </div> */}
                          </CardContent>
                        </Card>

                      </GridListTile>

                      <GridListTile cols={1} rows={1}>
                        <Card style={{ height: '100%' }}>
                          <CardContent style={{ height: '100%' }}>
                            {/* <div style={{ height: '100%'}}>  */}
                            <RevenueStackChart
                              width={300}
                              height={300}
                              focusDate={revenueFocusDate}
                              setFocusDate={setRevenueFocusDate}
                            />
                            {/* </div> */}
                          </CardContent>
                        </Card>
                      </GridListTile>

                    </GridList>


                  </TabPanel>
                </SwipeableViews>

              </div>
            </div>


          </div>

        </Grid>


      </Grid>
    </div>
  );
}

export default Dashboard;


// return (
//   <div className="App">
//     <Grid container spacing={0} style={{ height: '100%', width: '100%' }}>
//       <Grid item sm={2}
//         style={{
//           marginRight: 0,
//           backgroundColor: '#222222',
//           borderRight: '1px solid #222222',
//           boxShadow: "2px 0px 3px 2px rgb(0 0 0 / 10%), 2px 3px 4px 0px rgb(0 0 0 / 14%), 2px 1px 8px 0px rgb(0 0 0 / 12%)"
//         }}>
//         <div style={{ height: '30px', padding: 15, paddingBottom: 25, textAlign: 'left', display: 'flex' }} >

//           <LSLogo style={{ height: '40px' }} />
//           <LSNameLogo style={{ marginLeft: 10, height: '40px' }} />

//         </div>
//         {/* <Divider/> */}
//         <RegionSelector
//           regions={fakeRegions}
//           setSubRegion={setSubRegion}
//         // setRegion={setRegion}
//         />
//       </Grid>
//       <Grid item sm={10} >

//         {/* <AppBar
//           color='default'
//           style={{ right: 'auto'}}
//         > */}
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             height: '100%'
//           }}
//         >
//           <div
//             style={{ display: 'flex' }}
//           >
//             <Paper square elevation={3} style={{ width: '100%', backgroundColor: '#222222', }}>
//               <Grid
//                 container
//                 direction="row"
//                 justify="space-between"
//                 alignItems="flex-end"
//               >
//                 <Grid item>
//                   <Tabs
//                     value={tabValue}
//                     onChange={(e, v) => setTabValue(v)}
//                     indicatorColor="primary"
//                     textColor="primary"
//                   >
//                     <Tab label="Overview" />
//                     <Tab label="Revenue" />
//                     <Tab label="Power" />
//                     <Tab label="Impact" />
//                     <Tab label="Waypoints" />
//                     <Tab label="Power Rangers" />
//                     {/* <Tab label="Anomalies" />      */}
//                   </Tabs>
//                 </Grid>
//                 <Grid item>
//                   <IconButton size="small" style={{ margin: '5px', marginRight: '20px' }}>
//                     <Avatar src={scott} style={{ height: '40px', width: '40px' }} />
//                   </IconButton>
//                 </Grid>
//               </Grid>
//             </Paper>
//           </div>
//           {/* </AppBar> */}

//           <div style={{ flexGrow: 1, padding: '10px' }}>
//             <div style={{ display: 'flex', flexDirection: 'column' }} >

//               <Map
//                 expanded={expandMap}
//                 subRegion={subRegion}
//                 setWaypoint={setWaypoint}
//               />

//               <SwipeableViews
//                 axis={expandMap ? 'y' : 'x'}
//                 index={expandMap ? -1 : tabValue}
//                 onChangeIndex={(index) => setTabValue(index)}
//                 disableLazyLoading={true}
//               >
//                 <TabPanel value={tabValue} index={0}>
//                   <GridList cellHeight={374} spacing={10} style={{ paddingTop: '10px' }}>

//                     <GridListTile cols={1} rows={1}>

//                       <Card style={{ height: '100%' }}>
//                         <CardContent style={{ height: '100%' }}>
//                           {/* <div style={{ height: '100%'}}>  */}
//                           <WaypointModel
//                             batteries={waypoint ? waypoint.batteries : []}
//                             focus={focus}
//                           />
//                           {/* </div> */}
//                         </CardContent>
//                       </Card>

//                     </GridListTile>

//                     <GridListTile cols={1} rows={1}>
//                       <Card>
//                         <CardContent style={{ marginBottom: '5px' }}>

//                           <BatteriesSvg
//                             batteries={waypoint ? waypoint.batteries : []}
//                             setFocus={setFocus}
//                             waypoint={waypoint}
//                           />

//                         </CardContent>
//                       </Card>
//                     </GridListTile>

//                   </GridList>
//                 </TabPanel>

//                 <TabPanel value={tabValue} index={1}>

//                   <GridList cellHeight={374} spacing={10} style={{ paddingTop: '10px' }}>

//                     <GridListTile cols={1} rows={1}>

//                       <Card style={{ height: '100%' }}>
//                         <CardContent style={{ height: '100%' }}>
//                           {/* <div style={{ height: '100%'}}>  */}
//                           <BreakEvenChart
//                             width={300}
//                             height={300}
//                             focusDate={revenueFocusDate}
//                             setFocusDate={setRevenueFocusDate}
//                           />
//                           {/* </div> */}
//                         </CardContent>
//                       </Card>

//                     </GridListTile>

//                     <GridListTile cols={1} rows={1}>
//                       <Card style={{ height: '100%' }}>
//                         <CardContent style={{ height: '100%' }}>
//                           {/* <div style={{ height: '100%'}}>  */}
//                           <RevenueStackChart
//                             width={300}
//                             height={300}
//                             focusDate={revenueFocusDate}
//                             setFocusDate={setRevenueFocusDate}
//                           />
//                           {/* </div> */}
//                         </CardContent>
//                       </Card>
//                     </GridListTile>

//                   </GridList>


//                 </TabPanel>
//               </SwipeableViews>

//             </div>
//           </div>


//         </div>

//       </Grid>


//     </Grid>
//   </div>
// );
// }
