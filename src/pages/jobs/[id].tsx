import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { JobsLayout } from ".";
import CandidateItem from "../../components/Candidate";
import { useCandidatesForJob } from "../../hooks/useJobs";

// TODO: Could optimize this to use SSR and inital props
const JobsCandidatesContent: React.FC = () => {
  const router = useRouter();
  const jobId = router.query.id?.toString() || "-1";
  const { candidates, isLoading, isError } = useCandidatesForJob(jobId);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !candidates) {
    return <Text>Error fetching candidate data</Text>;
  }

  if (candidates.length === 0) {
    return (
      <Flex p="4">
        <Spinner />
        <Text pl={4}>Fetching candidates from across the internet...</Text>
      </Flex>
    );
  }

  return (
    <Flex direction={"column"} gap="2" py="2">
      {candidates.map((candidate) => (
        <CandidateItem candidate={candidate} />
      ))}
    </Flex>
  );
};

// To handle sidebar and dark mode switch
const JobCandidatesPage: React.FC = () => {
  return (
    <JobsLayout>
      <Flex direction="column" width="100%" marginRight={"10vw"} p="4">
        <Heading fontSize="24">Candidates</Heading>
        <JobsCandidatesContent />
      </Flex>
    </JobsLayout>
  );
};

export default JobCandidatesPage;
