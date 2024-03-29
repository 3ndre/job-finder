import React, { useRef, useState, useCallback, useEffect } from "react";
import Page from '../components/Page';
//--------Location component--------------------
import useGeoLocation from './location/useGeoLocation';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import './location/location.css';
//--------MUI---------------------------------
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const mapAPI = {
  maptiler: {
      url:
          "https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=fXmTwJM642uPLZiwzhA1",
      attribution:
          '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  },
};

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    background: '#eef2ff'
  }));
  
  const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
  
  }));

  const markerIcon = new L.Icon({
    iconUrl: require("../assets/marker.png"),
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
  });
  
  // ----------------------------------------------------------------------


const Location = () => {

    const mapRef = useRef();
    const location = useGeoLocation();

    const markerRef = useRef(null);
    const [position, setPosition] = useState({lat: 0, lng: 0}); 
  

    const handleMarkerDragEnd = useCallback(() => {
      const marker = markerRef.current;
      if (marker != null) {
        const newPosition = marker.getLatLng();
        setPosition({
          lat: newPosition.lat,
          lng: newPosition.lng,
        });
      } 
    }, [location]);

    useEffect(() => {
      if (location.loaded && location.lat !== 'Geolocation not supported') {
          setPosition({lat: location.lat, lng: location.lng});
      }
  }, [location]);

  return (
    <Page title="Login">
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
        {location.loaded && location.loaded == true && position && location.lat !== 'Geolocation not supported' ?
        <> 
      
        <MapContainer center={{ lat: location.lat, lng: location.lng }} zoom={13} ref={mapRef}>
        <TileLayer
                url={mapAPI.maptiler.url}
                attribution={mapAPI.maptiler.attribution}
              />
                <Marker
                    draggable={true}
                    icon={markerIcon}
                    position={{ lat: position.lat, lng: position.lng }}
                    eventHandlers={{ dragend: handleMarkerDragEnd }}
                    ref={markerRef}
                  ></Marker>
              </MapContainer>
              <br></br>
              <Typography>Latitude: {position.lat}</Typography>
              <Typography>Longitude: {position.lng}</Typography>
        </>
       : null}
        </ContentStyle>
      </Container>
    </RootStyle>
  </Page>
  )
}

export default Location