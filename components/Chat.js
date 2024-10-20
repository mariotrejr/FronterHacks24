// components/Chat.js

"use client";

import React, { useState } from 'react';
import { Box, Input, Button } from '@chakra-ui/react';
import { startBinFiestaChat } from '../services/binfiestaChatService';

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hi there! I can help you with recycling queries. Ask away!' }
  ]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', text: input }]);
      
      // Send user message to the API and get response
      const response = await startBinFiestaChat(input);
      
      setMessages(prevMessages => [...prevMessages, { role: 'model', text: response }]); 
      setInput('');
    }
  };

  return (
    <Box bg="white" color="black" p={4} borderRadius="md" maxW="md" width="100%">
      <Box mb={4}>
        {messages.map((message, index) => (
          <Box key={index} alignSelf={message.role === 'user' ? 'flex-end' : 'flex-start'}>
            <strong>{message.role}:</strong>
            <p>{message.text}</p>
          </Box>
        ))}
      </Box>
      <Input
        placeholder="Type your message..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => (e.key === 'Enter' ? handleSendMessage() : null)}
      />
      <Button onClick={handleSendMessage} mt={2} colorScheme="blue">Send</Button>
    </Box>
  );
};

export default Chat;