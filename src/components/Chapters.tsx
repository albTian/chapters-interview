import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { IntroducerList, Introducer } from "./IntroducerList";
import { API_URL } from "../constants";

const DUMMY_RESPONSE: Introducer[] = [
  {
    name: "Ratchahan Sujithan",
    position: "Founding Engineer",
    linkedin_url: "https://www.linkedin.com/in/ratchahan-sujithan/",
    user_id: 1,
  },
  {
    name: "Jay Kennedy",
    position: "CEO",
    linkedin_url: "https://www.linkedin.com/in/iamjaykennedy/",
    user_id: 2,
  },
  {
    name: "Ryan Chang",
    position: "CTO",
    linkedin_url: "https://www.linkedin.com/in/ryancwc/",
    user_id: 3,
  },
  {
    name: "Brianne Kimmel",
    position: "Venture Investor",
    linkedin_url: "https://www.linkedin.com/in/briannekimmel/",
    user_id: 4,
  },
  {
    name: "Stefan Thomas",
    position: "Angel Investor",
    linkedin_url: "https://www.linkedin.com/in/justmoon/",
    user_id: 5,
  },
];

export const Chapters = () => {
  const [inputValue, setInputValue] = useState("");
  const [isValidURL, setIsValidURL] = useState(false);
  const [linkedInId, setLinkedInId] = useState("");
  const toast = useToast();

  const [introducers, setIntroducers] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const isValid = isLinkedInURL(value);
    setIsValidURL(isValid);

    if (isValid) {
      const extractedId = extractLinkedInId(value);
      setLinkedInId(extractedId);
      console.log(`linkedin_id: ${extractedId}`);
    }
  };

  const isLinkedInURL = (url) => {
    const regex = /^https?:\/\/(www\.)?linkedin\.com\/.+/i;
    return regex.test(url);
  };

  const extractLinkedInId = (url) => {
    const regex = /linkedin\.com\/in\/([^\/]+)/i;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const handleButtonClick = async () => {
    if (isValidURL && linkedInId) {
      const url = `${API_URL}/get_introducers/${linkedInId}`;

      try {
        console.log(`getting from ${url}`);
        const response = await axios.get(url);
        // Handle response from the server

        // const response = DUMMY_RESPONSE;
        console.log("RESPONSE");
        console.log(response);

        setIntroducers(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid LinkedIn URL.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <VStack minW={"60vw"}>
        <VStack spacing={4}>
          <FormControl id="linkedin-url">
            {/* <FormLabel>LinkedIn URL</FormLabel> */}
            <Input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              isInvalid={!isValidURL && inputValue.length > 0}
              errorBorderColor="red.300"
              placeholder="linkedin URL"
            />
          </FormControl>
          <Button
            onClick={handleButtonClick}
            colorScheme="blue"
            disabled={!isValidURL}
          >
            Send GET Request
          </Button>
          {!isValidURL && inputValue.length > 0 && (
            <Text color="red.500">Please enter a valid LinkedIn URL.</Text>
          )}
        </VStack>
        {/* <ChaptersList /> */}
        {introducers && <IntroducerList introducers={introducers} />}
      </VStack>
    </Box>
  );
};
