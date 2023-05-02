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
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import { Introducer } from "./IntroducerList";

interface IntroducerRowProps {
  introducer: Introducer;
}

const seniorityKeywords = [
  "CEO",
  "CTO",
  "CFO",
  "COO",
  "Founder",
  "Director",
  "VP",
  "Vice President",
  "President",
  "Executive",
  "Partner",
  "Principal",
  "Managing Director",
];

export const IntroducerRow = ({ introducer }: IntroducerRowProps) => {
  const [sent, setSent] = useState(false);
  const extractLinkedInId = (url: string) => {
    const regex = /linkedin\.com\/in\/([^\/]+)/i;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const requestIntroduction = async (linkedinId: string, userId: number) => {
    const url =
      "https://chapters-interview.up.railway.app/request_introduction";

    try {
      const response = await axios.post(url, {
        linkedin_id: linkedinId,
        user_id: userId,
      });
      // Handle response from the server
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    // TODO: check if the intro is actually sent
    requestIntroduction(
      extractLinkedInId(introducer.linkedin_url),
      introducer.user_id
    );
    setSent(true);
  };

  const hasHighSeniority = (position: string) => {
    return seniorityKeywords.some((keyword) => position.includes(keyword));
  };
  return (
    <HStack
      key={introducer.user_id}
      borderWidth={1}
      borderRadius="lg"
      p={4}
      w="100%"
      justifyContent={"space-between"}
      backgroundColor={
        hasHighSeniority(introducer.position) ? 'rgba(70, 130, 180, 0.2)' : ""
      }
    >
      <Text fontWeight="bold">{introducer.name}</Text>
      <Text fontStyle="italic">{introducer.position}</Text>
      {sent ? (
        <p>sent!</p>
      ) : (
        <Button mt={2} colorScheme="blue" onClick={handleClick}>
          Request Introduction
        </Button>
      )}
    </HStack>
  );
};
