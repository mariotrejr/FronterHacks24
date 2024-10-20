// components/MapContainer.js
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px', 
};

const center = {
  lat: 0,
  lng: 0,
};

function MapContainer({ location, centers }) {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: location.latitude, lng: location.longitude }} 
        zoom={12}
      >
       
        {centers.map((center, index) => (
          <Marker
            key={index}
            position={{
              lat: center.geometry.location.lat,
              lng: center.geometry.location.lng,
            }}
            title={center.name} 
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapContainer;
