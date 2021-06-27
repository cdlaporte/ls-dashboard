import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { GridList, GridListTile, Card, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import 'leaflet/dist/leaflet.css'; // need leaflet css to display map correctly
import L from 'leaflet';
import energy from '../assets/lightning2.svg';
import { useSpring, animated, config } from 'react-spring';
import { TramOutlined } from '@material-ui/icons';
import { isNull } from 'lodash';

const energyIcon = new L.Icon({
    iconUrl: energy,
    iconRetinaUrl: energy,
    // iconAnchor: [5,5],
    iconSize: [30, 30]
});
// -9.658814, 120.254512
const fakeWaypoints = [{
    latlon: [51.505, -0.09],
    radius: 800
}];

const AnimatedMapContainer = animated(MapContainer);

const AnimatedGridList = animated(GridList);

// summary: {
//     "Total Waypoints": 2,
//     "People Powered": 1341,
//     "Water Generated": '2.2M Liters',
//     "CO2 Reduction": '7.1M Lbs',
//     "Lives Saved": 4,
//     "Live Revenue": '$159,351k',
//     "Carbon Credits": 29
//   },


function WaypointMarker({ latlon, radius, onClick, selected }) {

    useEffect(() => {
        console.log('selected updated... it is', selected);
    }, [selected]);

    const eventHandlers = {
        click: onClick
    }

    return (
        <>
            <Circle
                center={latlon}
                radius={radius}
                color="#ffe91c"
                stroke={false}
                // dashArray=
                weight="2"
                eventHandlers={eventHandlers}
            />
            {selected && (
                <Circle
                    center={latlon}
                    radius={radius}
                    color="#ffe91c"
                    dashArray="5 10"
                    weight="2"
                    eventHandlers={eventHandlers}
                />
            )}
            <Marker
                position={latlon}
                onClick={onClick}
                eventHandlers={eventHandlers}
                icon={energyIcon}
            >
                {/* <Popup>
                    A Waypoint
                </Popup> */}
            </Marker>
        </>
    )
}

// Helper componenet to animate view change (useMap hook can only be used in child of MapContainer)
function SetView({ center, zoom }) {
    const map = useMap();
    map.flyTo(center, zoom, {
        animate: true,
    });

    return null
}

function Map({ subRegion, expanded = false, setWaypoint, waypoint }) {

    const [view, setView] = useState({ zoom: subRegion.zoom, center: subRegion.center });

    const [selected, setSelected] = useState(null);

    // const mapSpring = useSpring({
    //     height: expanded ? '600px' : '300px'
    // });

    useEffect(() => {
        setView({ center: subRegion.center, zoom: subRegion.zoom });
    }, [subRegion]);

    useEffect(() => {
        if(waypoint) {
            setView({ zoom: 10, center: waypoint.latlon })
            setSelected(waypoint.id);
        } else {
            setView({ center: subRegion.center, zoom: subRegion.zoom });
            setSelected(null);
        }
        
    }, [waypoint]);

    const titleSpring = useSpring({
        from: {
            top: '-200px'
        },
        to: {
            top: '-15px'
        },
        config: config.default,
        // reset: true
    })


    return (

        // <AnimatedGridList cellHeight={mapSpring.height} spacing={10} style={{ width: '100%', height: mapSpring.height, marginRight: 0, paddingRight: 0 }}>
        <GridList cellHeight={300} spacing={10} style={{ width: '100%', height: '300px', marginRight: 0, paddingRight: 0 }}>
            <GridListTile cols={2} rows={1} style={{ height: '300px' }}>
                <Card style={{ width: '100%' }}>
                    <CardContent style={{ width: '100%' }}>
                        <div style={{ height: '100%', width: '100%' }}>
                            <AnimatedMapContainer style={{ height: '300px' }} center={view.center} zoom={view.zoom} scrollWheelZoom={true} attributionControl={false}>
                                <SetView center={view.center} zoom={view.zoom} />
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=40e0ac14-04b3-4bca-9737-fdf46afa8aa0"
                                />
                                {subRegion.waypoints.map(d => (
                                    <WaypointMarker
                                        latlon={d.latlon}
                                        radius={d.radius}
                                        selected={selected === d.id}
                                        onClick={() => {
                                            console.log('clicked the waypoint');
                                            if (selected === d.id) {
                                                setWaypoint(null);
                                                setSelected(null);
                                                setView({ zoom: subRegion.zoom, center: subRegion.center });
                                            } else {
                                                setWaypoint(d);
                                                setSelected(d.id);
                                                setView({ zoom: 10, center: d.latlon });
                                            }
                                        }}
                                    />
                                ))}


                            </AnimatedMapContainer>


                        </div>
                        <animated.div style={{ width: '19%', borderRadius: 5, position: 'absolute', left: 'calc(80% - 20px)', top: titleSpring.top, zIndex: 9999999999, background: 'rgba(0,0,0,0.7)', padding: 20, paddingTop: 20 }}>
                            <Typography variant="h6" style={{ margin: 0}}>
                                {subRegion.name}, {subRegion.region}
                            </Typography>
                            <Divider light={true} variant="fullWidth"/>

                            {Object.keys(subRegion.summary).map(key => (
                                <Grid
                                    style={{margin: 2}}
                                    key={key}
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Typography color="textSecondary" variant="body2">{key}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2">{subRegion.summary[key]}</Typography>
                                    </Grid>
                                </Grid>
                            ))}

                        </animated.div>
                    </CardContent>
                </Card>

            </GridListTile>
        </GridList>

    )

}

export default Map;