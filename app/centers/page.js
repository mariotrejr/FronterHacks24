

// centers/page.js
'use client';
import { useState, useEffect } from 'react';
import { Box, Button, Text, Spinner, List, ListItem, Alert, AlertIcon } from '@chakra-ui/react';
import MapContainer from '@/components/MapContainer'; 

export default function RecycleCentersPage() {
  const [location, setLocation] = useState(null);
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          setError('Unable to retrieve location');
          console.error('Geolocation error:', err);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  // Fetch recycle centers using the API route
  const fetchRecycleCenters = async () => {
    if (!location) {
      setError('Location not available');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/recyclecenters?latitude=${location.latitude}&longitude=${location.longitude}`);
      const data = await res.json();

      if (res.ok) {
        setCenters(data);
      } else {
        setError(data.error || 'Failed to fetch recycle centers');
      }
    } catch (err) {
      setError('Error fetching recycle centers');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <Box p={5} bgGradient="linear(to-r, black, blue.400)" color="white" minHeight="100vh">
      <Box textAlign="center" mb={6}>
        <Text as="b" fontSize="2xl">
          Find Recycling Centers Near You
        </Text>
      {/* </Box> */}
      {location ? (
        <Text mb={4} textAlign="center">
          Location Retrieved! Click the button below to find recycling centers near you.
        </Text>
      ) : (
        <Text mb={4} textAlign="center">
          Getting your location...
        </Text>
      )}

      {loading && <Spinner size="lg" />}

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      <Box textAlign="center" mt={6} mb={6}>
        <Button colorScheme="green" onClick={fetchRecycleCenters} isDisabled={!location || loading}>
          Find Recycling Centers
        </Button>
      </Box>

      {centers.length > 0 && location && (
        <MapContainer location={location} centers={centers} />
      )}

      <List spacing={3} mt={7} width="100%">
        {centers.length > 0 ? (
          centers.map((center, index) => (
            <ListItem key={index} p={3} border="1px solid #ddd" borderRadius="md">
              <Box>
                <Text fontWeight="bold">{center.name}</Text>
                <Text>{center.vicinity}</Text>
              </Box>
            </ListItem>
          ))
        ) : (
          !loading && <Text>No centers found yet. Click the button to search.</Text>
        )}
      </List>
    </Box>
  );
}






