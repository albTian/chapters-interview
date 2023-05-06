
import { Flex, HStack } from "@chakra-ui/react";
import { Container } from "../../components/Container";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";
import { Hero } from "../../components/Hero";
import { JobsList } from "../../components/JobsList";

interface LayoutProps {
  children: React.ReactNode;
}

const JobsLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex>
      <JobsList />
      {children}
      <DarkModeSwitch />
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