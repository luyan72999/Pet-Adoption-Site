import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Maps = ({ cityName }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: cityName }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          setMapCenter({ lat: location.lat(), lng: location.lng() });
        } else {
          console.error('Geocode was not successful for the following reason:', status);
        }
      });
    }
  }, [cityName]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCl-L81dTj1gD4F7i5afT4K4Bx4Fwq3SBM" loading="async">
      <GoogleMap
        mapContainerStyle={{ width: '65vh', height: '40vh'}}
        center={mapCenter}
        zoom={12}
      >
        <Marker position={mapCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Maps;
