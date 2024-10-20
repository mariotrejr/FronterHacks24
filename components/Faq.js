"use client";  // Add this line at the very top

import React, { useState } from 'react';
import './faq.css'; // Ensure you have this line to import the CSS

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is Bin Fiesta?',
      answer: 'Bin Fiesta is an innovative recycling app that helps you identify whether an item can be recycled by simply uploading an image.'
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
      answer: 'If Bin Fiesta cannot recognize an item, you can manually search for it in our database or submit feedback to help improve our image recognition technology.'
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
    <div className="faq-container">
      <h1>Bin Fiesta FAQ ♻️</h1>
      {faqs.map((faq, index) => (
        <div key={index}>
          <div
            className={`faq-question ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleAnswer(index)}
          >
            {faq.question}
            <span className="arrow">{activeIndex === index ? '♻️' : '🔄'}</span> {/* Recycling emojis */}
          </div>
          <div
            className={`faq-answer ${activeIndex === index ? 'show' : ''}`}
          >
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
