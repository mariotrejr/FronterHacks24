'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import WaitlistModal from './WaitlistModal'; // Import the modal component

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const [scrollY, setScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBarHeight = scrollY > 50 ? '50px' : '60px';
  const navBarOpacity = scrollY > 50 ? 0.9 : 1;

  // Move useColorModeValue outside of the JSX
  const bgColor = useColorModeValue('black', 'black');
  const textColor = useColorModeValue('white', 'white');
  const linkColor = useColorModeValue('white', 'white');
  const linkHoverColor = useColorModeValue('green.400', 'green.400');
  const textAlignValue = useBreakpointValue({ base: 'center', md: 'left' });

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Box
      position="fixed"
      width="100%"
      top="0"
      left="0"
      transition="all 0.3s ease"
      height={navBarHeight}
      opacity={navBarOpacity}
      zIndex={1000}
    >
      <Flex
        bg={bgColor}
        color={textColor}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link href="/" passHref>
            <Text
              textAlign={textAlignValue}
              color={textColor}
              fontWeight="bold"
              fontSize="xl"
              cursor="pointer"
            >
              ♻️ Bin Fiesta
            </Text>
          </Link>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav linkColor={linkColor} linkHoverColor={linkHoverColor} />
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
          {/* Waitlist Button */}
          <Button
            onClick={handleModalOpen} // Open the modal on click
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'green.400'}
            _hover={{ bg: 'green.300' }}
          >
            Join Waitlist
          </Button>

          {/* Demo Button */}
          <Link href="/demo" passHref>
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              bg={'white'}
              color={'black'}
              _hover={{ bg: 'gray.100' }}
            >
              Demo
            </Button>
          </Link>

      {/* Mission */}
    <Link href="/Mission" passHref>
        <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'black'}
            bg={'white'}
            _hover={{ bg: 'gray.800' }}>
            Our Mission
        </Button>
    </Link>




          {/* About Us */}
    <Link href="/About" passHref>
        <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'black'}
            bg={'white'}
            _hover={{ bg: 'gray.100' }}>
            About Us
        </Button>
    </Link>

            {/* FAQ Button */}
    <Link href="/faq" passHref>
        <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'black'}
            bg={'white'}
            _hover={{ bg: 'gray.800' }}>
            FAQ
        </Button>
    </Link>



        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav linkColor={linkColor} textColor={textColor} />
      </Collapse>

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isModalOpen} onClose={handleModalClose} />
    </Box>
  );
}

const DesktopNav = ({ linkColor, linkHoverColor }) => {
  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Link href={navItem.href ?? '#'}>
            <Box
              p={2}
              fontSize={'sm'}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: 'none',
                color: linkHoverColor,
              }}
            >
              {navItem.label}
            </Box>
          </Link>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = ({ linkColor, textColor }) => {
  return (
    <Stack bg={linkColor} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <Stack spacing={4} key={navItem.label}>
          <Link href={navItem.href ?? '#'}>
            <Box py={2} justifyContent="space-between" alignItems="center" _hover={{ textDecoration: 'none' }}>
              <Text fontWeight={600} color={textColor}>
                {navItem.label}
              </Text>
            </Box>
          </Link>
        </Stack>
      ))}
    </Stack>
  );
};

const NAV_ITEMS = [
  //{
   // label: 'FAQ',
    //href: '/faq',
  //},
  // You can add more navigation items here
];
