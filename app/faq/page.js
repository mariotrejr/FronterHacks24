"use client";  // Add this line at the very top

import React, { useState } from 'react';
import './faq.css'; // Ensure you have this line to import the CSS
import { Box, Heading, Text } from '@chakra-ui/react'; // Import necessary Chakra UI components
import Link from 'next/link'; // Import the Link component
import Chat from '@/app/Chat'; // Import the Chat component




const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is Bin Fiesta?',
      answer: 'Bin Fiesta is an innovative recycling app that helps you identify whether an item can be recycled by simply uploading an image. We also offer the option to locate the nearest recycle centers based on their current location. Protecting our planet starts with you! 🌎♻️'
    },
    {
      question: 'How does Bin Fiesta work?',
      answer: 'You take a picture of an item, and Bin Fiesta analyzes it to determine if it can be recycled, providing tips for proper disposal.'
    },
    {
      question: 'Is Bin Fiesta free to use?',
      answer: 'Yes, Bin Fiesta is free to use for everyone.'
    },
    {
      question: 'Do I need an account to use Bin Fiesta?',
      answer: 'No account is necessary for basic features. In the near future, we plan to add the option to create profiles to allow you to track your recycling habits and earn rewards.'
    },
    {
      question: 'How accurate is Bin Fiesta’s recycling analysis?',
      answer: 'Bin Fiesta uses advanced image recognition and a regularly updated database to ensure accuracy.'
    },
    {
      question: 'Can Bin Fiesta provide recycling information for my location?',
      answer: 'Yes, Bin Fiesta can offer localized recycling information and guidelines based on your location to help you recycle correctly.'
    },
    {
      question: 'What should I do if Bin Fiesta cannot recognize an item?',
      answer: 'If Bin Fiesta cannot recognize an item, you can submit feedback to help improve our image recognition technology by contacting our customer support, binfiesta.support@gmail.com.'
    },
    {
      question: 'What types of items can I scan with Bin Fiesta?',
      answer: 'You can scan a wide range of items, including plastics, metals, paper, and cardboard. Bin Fiesta is constantly updating its database to include more materials.'
    },
    {
      question: 'Is my personal information safe with Bin Fiesta?',
      answer: 'Yes, Bin Fiesta takes user privacy seriously. We do not share your personal information with third parties without your consent.'
    },
    {
      question: 'What are the future plans for Bin Fiesta?',
      answer: 'We plan to introduce more features, such as gamification elements, community challenges, and partnerships with local recycling centers to enhance user engagement and promote sustainable practices.'
    },
  ];


  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };



  return (
    <Box
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bgGradient="linear(to-r, black, blue.400)"
      color="white"
      textAlign="center"
      overflow="hidden"
      className="faq-container"
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

      


      <div className="faq-inner">
        <Heading as="h1" size="2xl" mb={4}>Bin Fiesta FAQs ♻️</Heading>
        {faqs.map((faq, index) => (
          <div key={index}>
            <div
              className={`faq-question ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
              <span className="arrow">{activeIndex === index ? '♻️' : '🔄'}</span>
            </div>
            <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
              {faq.answer}
            </div>
          </div>
        ))}




{/* Add the support contact information */}
<Text 
  fontSize="lg" 
  mt={20} // Add more spacing between the FAQ and the contact section
  color="white" 
  fontWeight="bold" 
  fontFamily="Arial, sans-serif"
>
  If you have any other questions, feel free to contact customer support: 
</Text>
<Text 
  as="span" 
  color="green.400" 
  mt={2} 
  fontSize="lg" 
  fontWeight="bold" 
  fontFamily="Arial, sans-serif"
>
  <a href="mailto:binfiesta.support@gmail.com" style={{ color: 'green.400' }}>
    binfiesta.support@gmail.com
  </a>
</Text>




      </div>

      <Box mt={12}> {/* Added margin-top for spacing */}
            <Chat /> {/* Add the Chat component */}
          </Box>
    </Box>




  );

};



export default FAQ;