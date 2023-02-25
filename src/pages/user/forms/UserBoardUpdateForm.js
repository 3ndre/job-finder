import React, { useRef, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//--------Location component--------------------
import useGeoLocation from '../../location/useGeoLocation';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import '../../location/location.css';

// mui
import { Card, Grid, TextField, InputAdornment, IconButton, Alert, Stack, Button } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';

//-----Component
import Iconify from '../../../components/Iconify';

//--------------------Redux---------------------------------
import { useDispatch } from 'react-redux';
import { updateUserByOrg } from '../../../redux/features/apiSlice';




// ----------------------------------Map Component------------------------------------

const mapAPI = {
    maptiler: {
        url:
            "https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=fXmTwJM642uPLZiwzhA1",
        attribution:
            '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    },
  };
  
  
  const markerIcon = new L.Icon({
    iconUrl: require("../../../assets/marker.png"),
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
  });
  
  
  // ----------------------------------------------------------------------



export default function UserBoardUpdateForm({data, id}) {


     const dispatch = useDispatch(); 
     const navigate = useNavigate(); 


       //-----------------------Map-------------------------------------------------

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
 


     //------------------------------form state------------------------------
     const [userData, setUserData] = useState({ name: data[0].name, email: '', password: ''});
    

     const [open, setOpen] = useState(false);
     const [showPassword, setShowPassword] = useState(false);
     const [message, setMessage] = useState('Updating...');


     // -----------------------On change form data -----------------------------


      const handleUpdateJob = async (e) => {
        e.preventDefault();
        
        try {

          setOpen(true);

          const updateUserData = {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            latitude: position.lat,
            longitude: position.lng
        }


            const result = await dispatch(updateUserByOrg({ updateUserData, id })) //redux slice to createUser
            


            if(result.payload !== null && result.payload.status === 200) {

              setMessage('Updated successfully!!')
              setUserData({ name: '', email: '', password: ''});
              setTimeout(() => {
                setOpen(false)
                navigate('/user-board')
              }, 2000)
  

            } else {

              setOpen(false)
          }

        } catch (e) {
            console.log(e)
            setOpen(false)
        }
      }




  return (
    <>


  <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {message === 'Updated successfully!!' ? "Redirecting..." : "Updating (Do not close)"}
        </DialogTitle>
        <DialogContent sx={{mt:3}}>
          <DialogContentText id="alert-dialog-description">
          <List>
          <ListItem>
          <ListItemAvatar>
          {message === 'Updated successfully!!' ? <Iconify icon={'fluent-emoji:party-popper'} width={50} height={50} /> : <CircularProgress color="success" /> }
          </ListItemAvatar>
          <ListItemText>{message}</ListItemText>
        </ListItem>
        </List>
          </DialogContentText>
        </DialogContent>
      </Dialog>


    <form onSubmit={handleUpdateJob}>
      <Grid container spacing={3}>
        

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
          <Grid container spacing={2} >
          <Grid item xs={12} >
                  <TextField placeholder="Full Name" id="name" label="Full Name" variant="outlined" fullWidth required autoComplete='off' onChange={e => setUserData({...userData, name: e.target.value})} value={userData.name}/>
                </Grid>

                <Grid item xs={12}>
                  <TextField type="email" id="email" placeholder="Email" label="Email"  fullWidth required autoComplete='off' onChange={e => setUserData({...userData, email: e.target.value})} value={userData.email}/>
                </Grid>

                <Grid item xs={12}>
                  <TextField type={showPassword ? 'text' : 'password'}  InputProps={{
                          endAdornment: (
                      <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                      </InputAdornment>
                  ),}}
                  id="password" placeholder="Password" label="Password" variant="outlined"  fullWidth required autoComplete='off' onChange={e => setUserData({...userData, password: e.target.value})} value={userData.password}/>
              </Grid>


              <Grid item xs={6} >
                  <TextField InputProps={{ readOnly: true }} placeholder="Latitude" id="latitude" label="Latitude" variant="outlined" fullWidth required autoComplete='off' value={position.lat}/>
                </Grid>

                <Grid item xs={6} >
                  <TextField InputProps={{ readOnly: true }} placeholder="Longitude" id="longitude" label="Longitude" variant="outlined" fullWidth required autoComplete='off'  value={position.lng}/>
                </Grid>


                <Grid item xs={12}>

                    {location.loaded && location.loaded === true && position && location.lat !== 'Geolocation not supported' ?
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
                    </>
                    : 
                    <>
                    <Grid item xs={12}>
                    <Alert severity="error">To complete the submission, kindly enable your location.</Alert>
                    </Grid>
                    </>

                    }

                    </Grid>


                    <Grid item xs={12}>

                    <Stack spacing={3} mt={1}>
                    {position.lat && position.lng !== 0 ? 
                        <Button type="submit" variant="contained" size="large">
                            Update
                        </Button>
                        :
                    <Button  disabled variant="contained" size="large">
                        Update
                    </Button>
                    }

                    </Stack>
                                    
                    </Grid>

            </Grid>
           
          </Card>
        </Grid>
        
      </Grid>
    </form>
    </>
  );
}
