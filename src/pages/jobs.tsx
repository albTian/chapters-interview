
import { Flex, HStack } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Hero } from "../components/Hero";
import { JobsList } from "../components/JobsList";

const Jobs = () => {
  
  return (
    <Flex>
      <JobsList />
      <DarkModeSwitch />
    </Flex>
  );
};

export default Jobs;
