import { Flex, Heading, Text } from "@chakra-ui/react";
import { JobsLayout } from "./jobs";

const Index = () => {
  return (
    <JobsLayout>
      <Flex direction="column" p="4" gap="4">
        <Heading>Welcome Ryan and Jay!</Heading>
        <Text>To get started, select a job from the sidebar.</Text>
        <Text>This mimics a recruiter platform that both searches for candidates and helps you reach out to them.</Text>
        <Text>Per my user interview with Jay, the biggest problem with selective outbound is the number of candidates you need to reach out to, and the low response rates.</Text>
        <Text>And even if many candidates respond, pushing many through the pipeline strains the engineering/interviewing resources.</Text>
        <Text>After adding a job, the platform will pretend to fetch candidates from around the internet. This is not functional, but just imagine once the candidates are fetched they will appear like the first 4 example jobs :)</Text>
      </Flex>
    </JobsLayout>
  );
};

export default Index;
