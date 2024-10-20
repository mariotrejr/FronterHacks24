


"use client";

import React, { useState } from "react";
import { Box, Button, Flex, Heading, Input, VStack, Text } from "@chakra-ui/react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatHistory from "../components/ChatHistory";
import Loading from "../components/Loading";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);

  const genAI = new GoogleGenerativeAI("AIzaSyCBMB5iF6WAokgY84vf0sm97fahMz2wwvw");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;
    setIsLoading(true);

    try {
      let prompt = userInput;

      if (userInput.toLowerCase().includes("bin fiesta")) {
        prompt = `You are an interactive chatbot. Bin Fiesta is an innovative recycling app that allows users to take pictures of items to determine their recyclability. It offers instant disposal tips to promote sustainable habits. Bin Fiesta covers a variety of materials, including paper, plastic, metals, and more, and uses advanced image recognition for analysis. It's completely free, prioritizes user privacy, and includes future plans to offer gamification features and localized recycling guidelines. Whether for individuals or businesses, Bin Fiesta aims to enhance environmental awareness through technology.`;
      }

      const result = await model.generateContent(prompt);
      const responseText = await result.response?.text();

      if (responseText) {
        setChatHistory([
          ...chatHistory,
          { type: "user", message: userInput },
          { type: "bot", message: responseText },
        ]);
      } else {
        console.error("Received an invalid response");
      }
    } catch (error) {
      console.error("Error sending message", error);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  const ChatBubble = ({ type, message }) => (
    <Flex
      bg={type === "user" ? "green.400" : "blue.400"} // Different background for user and bot
      color="white"
      p={4} // Padding
      mb={3} // Margin-bottom for spacing
      rounded="lg"
      maxWidth="80%"
      flexDirection="column"
      textAlign="left" // Left align text
    >
      <Text fontWeight="bold">{type === "user" ? "You" : "Bot"}</Text>
      <Text fontSize="md">{message}</Text>
    </Flex>
  );

  return (
    <>
      <Button
        position="fixed"
        bottom="10px"
        right="10px"
        bg="green.400"
        color="white"
        p={6}
        rounded="full"
        shadow="lg"
        onClick={toggleChatVisibility}
      >
        {isChatVisible ? "Hide Chat" : "Support Chat"}
      </Button>

      {isChatVisible && (
        <Box
          position="fixed"
          bottom="70px"
          right="10px"
          bg="black"
          color="white"
          p={6}
          rounded="lg"
          shadow="lg"
          width="90%"
          maxWidth="400px"
          maxHeight="500px"
          overflow="auto"
        >
          <VStack spacing={4} align="stretch">
            <Heading as="h1" size="md" textAlign="center">
              Support Chat
            </Heading>

            <Box
              bg="gray.800"
              p={4}
              rounded="md"
              shadow="sm"
              color="white"
              maxHeight="300px"
              overflowY="auto"
            >
              {chatHistory.map((chat, index) => (
                <ChatBubble key={index} type={chat.type} message={chat.message} />
              ))}
              <Loading isLoading={isLoading} />
            </Box>

            <Flex>
              <Input
                placeholder="Type your message..."
                value={userInput}
                onChange={handleUserInput}
                onKeyDown={(e) => (e.key === 'Enter' ? sendMessage() : null)}
                flex="1"
                mr={2}
                bg="gray.700"
                color="white"
              />
              <Button
                colorScheme="green"
                onClick={sendMessage}
                isLoading={isLoading}
              >
                Send
              </Button>
            </Flex>

            <Button onClick={clearChat} colorScheme="gray" size="sm">
              Clear Chat
            </Button>
          </VStack>
        </Box>
      )}
    </>
  );
};

export default App;
