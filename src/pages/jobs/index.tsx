
import { Flex, HStack } from "@chakra-ui/react";
import { Container } from "../../components/Container";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";
import { Hero } from "../../components/Hero";
import { JobsList } from "../../components/JobsList";
import Navbar from "../../components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const JobsLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex direction="column">
      <Navbar />
    <Flex>
      <JobsList />
      {children}
      <DarkModeSwitch />
    </Flex>
    </Flex>
  );
};

const Jobs = () => {
  
  return (
    <JobsLayout><></></JobsLayout>
  );
};


export default Jobs;
export {JobsLayout}