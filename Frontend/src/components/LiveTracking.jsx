import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';  
import "../App.css"  


const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapContainerRef = useRef(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    // Get initial position first
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
        setIsLoading(false);

        // Initialize map with current position
        if (!mapRef.current && mapContainerRef.current) {
          // Create map instance
          mapRef.current = L.map(mapContainerRef.current, {
            center: [latitude, longitude],
            zoom: 16, // Higher zoom level for better detail
            zoomControl: true,
            minZoom: 3,
            maxZoom: 19 // Maximum zoom level for OpenStreetMap
          });

          // Add OpenStreetMap tile layer
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
            className: 'map-tiles'
          }).addTo(mapRef.current);

          // Create custom marker icon with pulse effect
          const customIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div class="marker-dot"></div><div class="marker-pulse"></div>',
            iconSize: [22, 22],
            iconAnchor: [11, 11]
          });

          // Add marker with custom icon
          markerRef.current = L.marker([latitude, longitude], {
            icon: customIcon
          })
            .addTo(mapRef.current)
            .bindPopup('Your current location')
            .openPopup();

          // Add zoom controls to bottom right
          L.control.zoom({
            position: 'bottomright'
          }).addTo(mapRef.current);
        }
      },
      (error) => {
        console.error('Error getting position:', error);
        setIsLoading(false);
        // Handle location access errors
        alert('Please enable location services to use the map features');
      },
      { enableHighAccuracy: true }
    );

    // Start watching position for real-time updates
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
        
        // Update marker position and center map
        if (mapRef.current && markerRef.current) {
          markerRef.current.setLatLng([latitude, longitude]);
          mapRef.current.panTo([latitude, longitude], {
            animate: true,
            duration: 1
          });
        }
      },
      (error) => console.error('Error watching position:', error),
      { 
        enableHighAccuracy: true, 
        maximumAge: 10000, // Cache position for 10 seconds
        timeout: 5000 // Timeout after 5 seconds
      }
    );

    // Cleanup function
    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Full-screen button handler
  const handleFullScreen = () => {
    if (mapContainerRef.current) {
      if (mapContainerRef.current.requestFullscreen) {
        mapContainerRef.current.requestFullscreen();
      } else if (mapContainerRef.current.webkitRequestFullscreen) {
        mapContainerRef.current.webkitRequestFullscreen();
      } else if (mapContainerRef.current.msRequestFullscreen) {
        mapContainerRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading map...</p>
        </div>
      )}
      <div
        ref={mapContainerRef}
        className="map-container"
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0
        }}
      />
      <button 
        className="fullscreen-button" 
        onClick={handleFullScreen}
        style={{
          position: 'absolute',
          top:"10px",
          right: '10px',
          zIndex: 1000,
          background: 'white',
          border: '2px solid rgba(0,0,0,0.2)',
          borderRadius: '4px',
          padding: '5px',
          cursor: 'pointer'
        }}
      >
        <i className="ri-fullscreen-line" style={{ fontSize: '20px' }}></i>
      </button>
    </>
  );
};

export default LiveTracking;