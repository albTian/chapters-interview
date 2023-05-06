
import { Flex } from "@chakra-ui/react";
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
export { JobsLayout };
