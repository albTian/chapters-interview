import {
  Avatar,
  Box,
  Flex,
  Spinner,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { JobsLayout } from ".";
import CandidateItem from "../../components/Candidate";
import { useCandidatesForJob } from "../../hooks/useJobs";

const JobsCandidatesContent: React.FC = () => {
  const router = useRouter();
  const jobId = router.query.id?.toString() || "";
  const { candidates, isLoading, isError } = useCandidatesForJob(jobId);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !candidates) {
    return <Text>Error fetching candidate data</Text>;
  }

  const sortedCandidates = candidates.sort(
    (a, b) => b.fit_score - a.fit_score
  );

  return (
    <Flex direction={"column"} w={"100%"} marginRight={"10vw"}>
      <Text>Candidates</Text>
      <Flex direction={"column"} w={"100%"} gap="2">
        {sortedCandidates.map((candidate) => (
          <CandidateItem candidate={candidate} />
        ))}
      </Flex>
    </Flex>
  );
};

// To handle sidebar and dark mode switch
const JobCandidatesPage: React.FC = () => {
  return (
    <JobsLayout>
      <JobsCandidatesContent />
    </JobsLayout>
  );
};

export default JobCandidatesPage;
