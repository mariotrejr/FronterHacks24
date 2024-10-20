'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Input,
  Image as ChakraImage,
  Text,
  Spinner,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  Alert,
  AlertIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from '@chakra-ui/react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import the WaitlistModal and Centers Page
const WaitlistModal = dynamic(() => import('../../components/WaitlistModal'), { ssr: false });
const RecycleCentersPage = dynamic(() => import('../centers/page.js'), { ssr: false });

const AnalyzePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cameraMode, setCameraMode] = useState(false);
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const resizedImage = await resizeImage(file);
      setSelectedImage(resizedImage);
      setPhotoCaptured(false);
      setAnalysisResult([]);
      setError(null);
    } catch (err) {
      setError('Failed to resize image. Please try again.');
    }
  };

  const resizeImage = (file, maxWidth = 512, maxHeight = 512) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxWidth) {
              height = Math.floor((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.floor((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('Failed to load image'));
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      alert('Please upload an image first.');
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysisResult([]);

    try {
      const base64Image = selectedImage.split(',')[1];
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ base64Image }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      if (data.result) {
        const parsedResult = JSON.parse(data.result.replace(/```json|```/g, ''));
        if (parsedResult.result && Array.isArray(parsedResult.result)) {
          setAnalysisResult(parsedResult.result);
        } else {
          setError('Unexpected response format from API.');
        }
      } else {
        setError('No result found in API response.');
      }
    } catch (error) {
      setError('Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const startCamera = () => {
    setCameraMode(true);
    setPhotoCaptured(false);
    setAnalysisResult([]);
    setError(null);

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch(() => {
        setError('Failed to access camera. Please try again.');
        setCameraMode(false);
      });
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
    setSelectedImage(dataUrl);
    setPhotoCaptured(true);
    stopCamera();
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraMode(false);
  };

  const retryCapture = () => {
    setSelectedImage(null);
    setPhotoCaptured(false);
    setAnalysisResult([]);
    setError(null);
    startCamera();
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bgGradient="linear(to-r, black, blue.500)" color="white" p={6} position="relative">
      {/* Header */}
      <Flex position="absolute" top={0} left={0} right={0} justifyContent="space-between" p={4}>
        {/* Project Name and Link to Home */}
        <Link href="/" passHref>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            cursor="pointer"
            _hover={{ transform: 'scale(1.1)', color: 'green.400' }} // Hover effect with scale and color change
            transition="transform 0.2s ease, color 0.2s ease"
          >
            Bin Fiesta ♻️
          </Text>
        </Link>

        {/* Waitlist Button */}
        <Button colorScheme="green" onClick={handleModalOpen}>
          Join Waitlist
        </Button>
      </Flex>

      {/* Tabs for navigation */}
      <Tabs variant="soft-rounded" colorScheme="green" align="center" isFitted>
        <TabList
          position="fixed"
          top="60px" // Keeps it below the header
          width="100%"
          maxWidth="600px"
          mx="auto"
          p={2}
          bg="transparent"
          zIndex={10}
        >
          <Tab _selected={{ color: 'black', bg: 'white' }} color="white" _hover={{ color: 'white', bg: 'gray.700' }}>
            Demo
          </Tab>
          <Tab _selected={{ color: 'black', bg: 'white' }} color="white" _hover={{ color: 'white', bg: 'gray.700' }}>
            Centers
          </Tab>
        </TabList>

        <TabPanels mt="100px">
          {/* Tab for Demo */}
          <TabPanel>
            <VStack spacing={6}>
              <Text fontSize="3xl" fontWeight="bold" color="white">
                Detect Recyclable Items
              </Text>
              <Text fontSize="lg" color="whiteAlpha.800">
                Upload an image of trash or use your camera to detect recyclable items.
              </Text>

              <label htmlFor="file-upload">
                <Button as="span" colorScheme="blue" w="full" mb={4}>
                  Upload Image
                </Button>
              </label>
              <Input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} display="none" />

              {cameraMode ? (
                <Box>
                  <video ref={videoRef} autoPlay style={{ maxWidth: '100%', borderRadius: '8px' }} />
                  <canvas ref={canvasRef} width="512" height="512" style={{ display: 'none' }} />

                  <HStack spacing={4} mt={4}>
                    <Button colorScheme="teal" onClick={captureImage}>
                      Capture Image
                    </Button>
                    <Button colorScheme="red" onClick={stopCamera}>
                      Stop Camera
                    </Button>
                  </HStack>
                </Box>
              ) : (
                <Button colorScheme="blue" onClick={startCamera}>
                  Use Camera
                </Button>
              )}

              {selectedImage && (
                <Box mb={4} borderRadius="lg" overflow="hidden" boxShadow="md">
                  <ChakraImage src={selectedImage} alt="Selected Image" maxH="300px" />
                  {photoCaptured && (
                    <Button mt={4} colorScheme="yellow" onClick={retryCapture}>
                      Retry Photo
                    </Button>
                  )}
                </Box>
              )}

              <Button size="lg" colorScheme="teal" onClick={analyzeImage} isDisabled={!selectedImage || loading} _hover={{ bg: 'teal.400' }} w="full">
                {loading ? <Spinner size="md" /> : 'Analyze Image'}
              </Button>

              {loading && (
                <Box mt={4}>
                  <Spinner size="lg" />
                </Box>
              )}

              {error && (
                <Alert status="error" mt={4}>
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              {Array.isArray(analysisResult) && analysisResult.length > 0 && (
                <Box mt={4} p={4} bg="whiteAlpha.300" borderRadius="lg" w="full" textAlign="center" boxShadow="md">
                  <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                    Analysis Result:
                  </Text>
                  <Wrap justify="center" spacing={3}>
                    {analysisResult.map((item, index) => (
                      <WrapItem key={index}>
                        <Box bg="teal.600" color="white" px={4} py={2} borderRadius="full" fontWeight="bold" boxShadow="md">
                          {item}
                        </Box>
                      </WrapItem>
                    ))}
                  </Wrap>
                </Box>
              )}
            </VStack>
          </TabPanel>

          {/* Tab for Centers */}
          <TabPanel>
            <RecycleCentersPage />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Waitlist Modal */}
      {isClient && <WaitlistModal isOpen={isModalOpen} onClose={handleModalClose} />}
    </Box>
  );
};

export default AnalyzePage;
