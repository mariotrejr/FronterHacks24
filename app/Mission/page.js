"use client";  // Ensure this is at the very top to indicate client-side rendering

import Head from 'next/head';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import WithSubnavigation from '@/components/HomeNav';
import Chat from '@/app/Chat'; // Import the Chat component
import Image from 'next/image'; // Next.js Image component

import { keyframes } from '@emotion/react'; // Import keyframes from Emotion

// Define the keyframes for rotation using @emotion/react
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export default function Mission() {
  return (
    <>
      <Head>
        <title>Bin Fiesta - Mission</title>
        <meta name="description" content="Learn about Bin Fiesta's mission" />
      </Head>
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="100vh"
        bgGradient="linear(to-r, black, blue.400)"
        color="white"
        textAlign="center"
        overflow="hidden"
        px={6} // Add horizontal padding
      >
        <Box flex="1" w="full">
          <WithSubnavigation />
          
          <Box mt={12} p={8}> {/* Margin top for spacing and padding for content */}
            <Heading as="h1" size="3xl" mb={8} fontFamily="'Arial, sans-serif'"> {/* Increased margin-bottom */}
              Our Mission
            </Heading>

            <Text fontWeight="bold" fontSize="2xl" mb={6} color="green.400"> {/* Increased margin-bottom */}
              Protecting our planet starts with you!
            </Text>

            {/* Rotating Earth */}
            <Box
              as="div"
              w="200px" // Increased the size for better visibility
              h="200px"
              mx="auto"
              mb={10} // Increased margin-bottom for more spacing below the globe
              animation={`${spin} infinite 20s linear`} // Infinite spinning animation
              overflow="hidden" // Ensures anything outside the box is hidden
              borderRadius="50%" // Makes the container perfectly round
              position="relative"
            >
              <Image 
                src="/images/world.png" // Add your world image here (ensure the path is correct)
                alt="Revolving Earth"
                fill // Makes the image fill the Box container
                objectFit="cover" // Ensures the globe fits perfectly without distortion
                style={{ clipPath: 'circle(50%)' }} // Clips the image into a perfect circle
              />
            </Box>

            <Text fontWeight="bold" fontSize="xl" mb={6}> {/* Increased margin-bottom */}
              Empowering a Sustainable Future
            </Text>

            <Text fontSize="lg" lineHeight="1.8" maxW="800px" mx="auto" mb={10}> {/* Increased margin-bottom */}
              At Bin Fiesta, our mission is to inspire and empower communities to recycle responsibly. 
              By simplifying the recycling process, we aim to reduce environmental impact and promote a 
              cleaner, greener world. Through innovative technology, we provide users with the tools 
              they need to make informed recycling decisions, access local recycling centers, and 
              contribute to a sustainable future.
            </Text>
          </Box>
  
          <Box mt={12}> {/* Added margin-top for spacing */}
            <Chat /> {/* Add the Chat component */}
          </Box>
          
        </Box>
      </Flex>
    </>
  );
}
