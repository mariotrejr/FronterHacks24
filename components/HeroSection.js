'use client'

import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Icon,
  createIcon,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react';
import WaitlistModal from './WaitlistModal'; // Import the WaitlistModal component
import Link from 'next/link'; // Import Link from Next.js

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Container maxW={'7xl'}>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}>
        <Stack flex={1} spacing={{ base: 5, md: 10 }} textAlign="center">
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'red.400',
                zIndex: -1,
              }}>
              Bin there, done that!
            </Text>
            <br />
            <Text as={'span'} color={'green.400'}>
              Bin Fiesta! ♻️
            </Text>
          </Heading>
          <Text color={'white.500'}>
            Bin Fiesta! ♻️ is an innovative recycling app that lets you take a picture of any item to find out if it can be recycled. Get instant feedback on responsible disposal methods and promote sustainable habits. Join Bin Fiesta today for a cleaner, greener planet!
          </Text>
          <VStack spacing={4}>
            {/* Waitlist Button */}
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              colorScheme={'black'}
              bg={'black'}
              color={'white'}
              _hover={{ bg: 'gray.800' }}
              onClick={handleOpen}>
              Join the Waitlist
            </Button>

            <Link href="/demo" passHref>
  <Button
    rounded={'full'}
    size={'lg'}
    fontWeight={'normal'}
    px={6}
    bg={'white'}
    color={'black'}
    _hover={{ bg: 'gray.100' }}>
    Try Our Demo
  </Button>
</Link>

            
          </VStack>
        </Stack>
        
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}>
          <Blob
            w={'150%'}
            h={'150%'}
            position={'absolute'}
            top={'-20%'}
            left={0}
            zIndex={-1}
            color={useColorModeValue('red.50', 'red.400')}
          />
          <Box
            position={'relative'}
            height={'300px'}
            width={'100%'}
            rounded={'2xl'}
            overflow={'hidden'}
            boxShadow={'2xl'}
          >
            {/* Embedded YouTube video */}
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/Gv9EkUXPHBo?autoplay=1&mute=1" 
              title="Bin Fiesta YouTube Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </Box>
        </Flex>
      </Stack>

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isModalOpen} onClose={handleClose} />
    </Container>
  );
}

const Blob = (props) => {
  return (
    <Icon
      width={'100%'}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.008-44.682-37.707-21.184-65.503-50.03-83.024-88.137-16.17-33.573-26.258-71.636-18.725-106.337 6.54-28.693 29.65-46.282 57.925-52.94 39.542-8.264 67.052 20.893 97.045 48.481 30.237 27.849 64.687 51.387 104.444 62.677 42.672 12.828 90.513 8.825 129.332-3.09 31.161-10.182 60.523-29.542 80.509-57.57 21.872-30.563 26.248-67.078 9.824-100.252-15.35-30.616-47.428-49.762-81.702-46.652-43.189 3.642-79.607 37.19-106.091 63.847-30.582 30.38-61.657 55.393-94.322 60.157-49.271 7.582-69.676-25.156-100.664-35.033C2.586 77.044 2.35 68.567 1.068 58.836c-3.37-26.504 3.7-54.652 21.276-75.667 15.874-19.451 39.533-31.092 64.798-28.492 20.625 2.156 38.678 14.778 55.292 27.292 21.871 16.004 35.658 38.12 47.546 61.418 13.046 25.074 20.189 53.785 14.802 81.792-5.601 30.885-29.132 55.36-56.674 75.72-33.563 24.06-76.247 34.277-115.784 19.442-34.267-12.441-54.592-46.627-54.596-83.885 0-8.564 1.014-17.27 1.905-25.838 1.7-16.267 3.986-32.016 9.115-47.444 8.494-26.383 29.983-45.17 55.342-53.346 43.356-14.456 85.872-15.176 127.585-2.84 15.54 3.194 28.177 15.626 36.23 29.38 9.744 15.06 14.7 34.533 15.228 52.204.566 29.972-6.905 59.104-19.805 85.414-8.204 17.186-19.418 33.68-30.854 48.494-16.927 22.378-37.257 41.125-62.777 50.77-41.956 15.023-86.767 11.33-126.352-5.317-47.836-18.006-84.9-54.193-102.17-100.704C-6.56 154.045-5.456 103.47 16.885 61.814c9.608-20.353 25.64-38.573 44.372-52.27C89.545-7.916 122.06-15.33 157.433 1.703c43.202 18.556 74.894 62.602 69.355 109.135-4.12 38.037-37.114 62.418-67.348 80.266-30.332 17.881-61.783 27.826-92.275 22.125-31.191-5.628-60.618-27.88-69.655-58.188-8.074-27.135-2.66-55.967 11.193-81.83 14.1-28.235 39.268-50.63 67.083-66.044C234.298 1.11 238.572-.657 239.184 0c16.82 1.779 31.682 6.06 44.374 12.96 27.87 14.067 49.105 36.206 61.344 63.825 14.306 34.83 17.884 71.067 15.853 107.428-2.15 29.445-17.47 55.104-36.85 78.143-30.45 35.295-70.203 57.837-111.075 66.525-31.118 6.918-63.192 7.27-95.498 2.39-28.142-4.186-55.332-12.69-80.93-23.233-14.883-6.149-29.72-13.436-43.028-21.977 3.026-1.475 6.131-2.884 9.287-4.273 43.258-19.253 81.748-44.593 110.256-77.014C233.902 392.835 236.642 413.648 239.184 439.443z"
        fill="currentColor"
      />
    </Icon>
  )
}
