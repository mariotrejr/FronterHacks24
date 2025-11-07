"use client";  // Add this line at the very top

import React from 'react';
import { Box, Heading, Text, SimpleGrid } from '@chakra-ui/react'; // Import necessary Chakra UI components
import Link from 'next/link'; // Import the Link component
import Image from 'next/image'; // Import Next.js Image component
import Chat from '@/app/Chat'; // Import the Chat component

const Creators = () => {
  return (
    <Box
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bgGradient="linear(to-r, black, blue.500)"
      color="white"
      textAlign="center"
      overflow="hidden"
      className="creators-container"
      p={8}
    >
      {/* Add the logo with a link back to the home page */}
      <Box position="absolute" top="20px" left="20px">
        <Link href="/" passHref>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="white"
            cursor="pointer"
            _hover={{ transform: 'scale(1.1)', transition: 'transform 0.2s ease' }}
          >
            Bin Fiesta ♻️
          </Text>
        </Link>
      </Box>

            {/* Spacing */}
            <Box mb={16} />

      {/* Heading at the top */}
      <Heading as="h1" size="3xl" mb={8} fontFamily="'Arial, sans-serif'">
        Meet the Creators of Bin Fiesta
      </Heading>

      {/* Spacing */}
      <Box mb={24} />

      {/* Group Image below the Heading */}
      <Box mb={16} width="full" display="flex" justifyContent="center">
        <Image 
          src="/images/group-pic.jpg" // Path to the group image
          alt="Group picture of Bin Fiesta creators"
          width={800} // Adjust width as needed
          height={400} // Adjust height as needed
          style={{ borderRadius: '0.375rem' }}
        />
      </Box>

            {/* Spacing */}
            <Box mb={24} />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {/* Individual Creator Boxes */}
        <Box
          borderWidth={1}
          borderRadius="lg"
          overflow="hidden"
          bg="blue.600"
          boxShadow="lg"
          transition="transform 0.2s ease, box-shadow 0.2s ease"
          _hover={{ boxShadow: 'xl', transform: 'translateY(-5px)' }}
          p={8}  
          height="100%"
        >
          <Image 
            src="/images/uravghacker.jpg" 
            alt="Founder 1" 
            width={500} 
            height={500} 
            style={{ borderRadius: '0.375rem' }}
          />
          <Text fontWeight="bold" mt={4}>Mario Trevino</Text>
          <Text fontStyle="italic" mt={1}>Full-Stack Developer, AI Engineer</Text>
          <Text mt={2} fontSize="sm" lineHeight="1.5">
            Mario Trevino is a skilled Full-Stack Developer and a key contributor to the Bin Fiesta project. With a passion for leveraging technology to promote sustainability, Mario has implemented advanced image analysis capabilities within the app using GPT-4 Vision Model, enabling users to identify recyclable items effortlessly.
          </Text>
        </Box>

        <Box
          borderWidth={1}
          borderRadius="lg"
          overflow="hidden"
          bg="blue.600"
          boxShadow="lg"
          transition="transform 0.2s ease, box-shadow 0.2s ease"
          _hover={{ boxShadow: 'xl', transform: 'translateY(-5px)' }}
          p={8}  
          height="100%" 
        >
          <Image 
            src="/images/IMG_20241023_115359_308.jpg" 
            alt="Founder 2" 
            width={500} 
            height={500} 
            style={{ borderRadius: '0.375rem' }} 
          />
          <Text fontWeight="bold" mt={4}>Heidy Gallardo</Text>
          <Text fontStyle="italic" mt={1}>Full-Stack Developer</Text>
          <Text mt={2} fontSize="sm" lineHeight="1.5">
            Heidy Gallardo is a talented Full-Stack Developer and an integral part of the Bin Fiesta team. With a keen focus on user experience and sustainability, Heidy has developed innovative solutions using APIs that empower users to easily locate nearby recycling centers.
          </Text>
        </Box>

        <Box
          borderWidth={1}
          borderRadius="lg"
          overflow="hidden"
          bg="blue.600"
          boxShadow="lg"
          transition="transform 0.2s ease, box-shadow 0.2s ease"
          _hover={{ boxShadow: 'xl', transform: 'translateY(-5px)' }}
          p={8}  
          height="100%" 
        >
          <Image 
            src="/images/yulijasso.jpg" 
            alt="Founder 3" 
            width={500} 
            height={500} 
            style={{ borderRadius: '0.375rem' }}
          />
          <Text fontWeight="bold" mt={4}>Yuliana Jasso</Text>
          <Text fontStyle="italic" mt={1}>Chatbot Developer, AI Engineer</Text>
          <Text mt={2} fontSize="sm" lineHeight="1.5">
            Yuliana Jasso is a vital member of the Bin Fiesta team and the innovative force behind the state-of-the-art chatbot that empowers users on their recycling journey. With an unwavering passion for sustainability and technology, she has crafted an interactive assistant powered by Google's Gemini AI, providing personalized support that enhances the user experience.
          </Text>
        </Box>

        <Box mt={12}> {/* Added margin-top for spacing */}
            <Chat /> {/* Add the Chat component */}
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Creators;

