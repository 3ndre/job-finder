import { useState, useEffect } from 'react'

const useGeoLocation = () => {

    const [location, setLocation] = useState({loaded: false, lat: '', lng: ''})

    const onSuccess = location => {
        setLocation({
            loaded: true,
            lat: location.coords.latitude,   
            lng: location.coords.longitude,   
        })
    }

    const onError = error => {
        setLocation({
            loaded: true,
            lat: "Geolocation not supported",
            lng: "Geolocation not supported",
        })
    }

    useEffect(() => {
        if(!("geolocation" in navigator)) {
            onError({
                lat: "Geolocation not supported",
                lng: "Geolocation not supported",
            })
        };

        navigator.geolocation.getCurrentPosition(onSuccess, onError);

    }, []);

  return location;
}

export default useGeoLocation