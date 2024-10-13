import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useMarkerRef } from '@vis.gl/react-google-maps';

const containerStyle = {
  width: '100%',
  height: '900px'
};

const initialCenter = {
  lat: 36.9741,
  lng: -122.0308
};

const GoogleMaps = () => {
  const [type, setType] = useState("");
  const [donors, setDonors] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [center, setCenter] = useState(initialCenter);
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [markerRef, marker] = useMarkerRef();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  const handleMarkerClick = useCallback((markerData) => {
    setSelectedMarker(markerData);
    setInfoWindowShown(true);

    if (markerData.foodType) {
      setType("Donor");
    } else {
      setType("Shelter");
    }
    
    
  }, []);

  const handleClose = useCallback(() => {
    setInfoWindowShown(false);
    setSelectedMarker(null);
  }, []);

  const geocodeAddress = async (address) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].geometry.location;
    }
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donorsResponse = await fetch('http://localhost:5001/donors');
        const donorsData = await donorsResponse.json();
        const geocodedDonors = await Promise.all(donorsData.map(async (donor) => {
          const location = await geocodeAddress(donor.address);
          return { ...donor, location };
        }));
        setDonors(geocodedDonors);

        const sheltersResponse = await fetch('http://localhost:5001/shelters');
        const sheltersData = await sheltersResponse.json();
        const geocodedShelters = await Promise.all(sheltersData.map(async (shelter) => {
          const location = await geocodeAddress(shelter.address);
          return { ...shelter, location };
        }));
        setShelters(geocodedShelters);
      } catch (error) {
        console.error('Error fetching or geocoding data:', error);
      }
    };

    fetchData();
  }, []);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && donors.length > 0 && shelters.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      [...donors, ...shelters].forEach(item => {
        if (item.location) {
          bounds.extend(item.location);
        }
      });
      map.fitBounds(bounds);
      setCenter(bounds.getCenter().toJSON());
    }
  }, [map, donors, shelters]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {donors.map((donor, index) => (
        donor.location && (
          <Marker
            ref={markerRef}
            key={`donor-${index}`}
            position={donor.location}
            icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
            onClick={() => handleMarkerClick(donor)}
          />
        )
      ))}
      {shelters.map((shelter, index) => (
        shelter.location && (
          <Marker
            key={`shelter-${index}`}
            position={shelter.location}
            icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
            onClick={() => handleMarkerClick(shelter)}
          />
        )
      ))}
      {infoWindowShown && selectedMarker && selectedMarker.location && (
        <InfoWindow
          anchor={marker}
          position={selectedMarker.location}
          onClose={handleClose}
        >
          <div>
            <h2>{type}</h2>
            <h3>{selectedMarker.name}</h3>
            <p>{selectedMarker.address}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : <></>
};

export default GoogleMaps;
