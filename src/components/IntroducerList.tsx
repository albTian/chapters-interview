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
import { IntroducerRow } from "./IntroducerRow";

interface IntroducerListProps {
    introducers: Introducer[]
}

// TODO: PUT THIS INTO A TYPES FOLDER
export type Introducer = {
  name: string;
  position: string;
  linkedin_url: string;
  user_id: number;
};

export const IntroducerList: React.FC<IntroducerListProps> = ({ introducers }) => {
  return (
    <VStack spacing={6} width={"100%"}>
      {introducers.map((introducer: Introducer) => (
        <IntroducerRow introducer={introducer}/>
      ))}
    </VStack>
  );
};

