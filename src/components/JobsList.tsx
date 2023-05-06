import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  List,
  ListItem,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useJobs } from "../hooks/useJobs";
import Link from "next/link";
import { ChapterJob } from "../types";
import { useState } from "react";
import { useRouter } from "next/router";


interface JobButtonProps {
  job: ChapterJob;
  selected: boolean;
  onClick: () => void;
}

const JobButton: React.FC<JobButtonProps> = ({ job, selected, onClick }) => {
  return (
    <Button
      justifyContent="flex-start"
      variant={selected ? "solid" : "ghost"}
      colorScheme={selected ? "gray" : undefined}
      onClick={onClick}
      color={selected ? "#056ae6" : ""}
    >
      {job.position}
    </Button>
  );
};

const JobsList: React.FC = () => {
  const { jobs, isLoading, isError } = useJobs();
  const router = useRouter();

  // Parse the job ID from the route parameters
  const jobId = router.query.id?.toString() ?? "";

  const handleJobClick = (job: ChapterJob) => {
    router.push(`/jobs/${job.id}`);
  };

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Box>
        <Text>Error fetching jobs data</Text>
      </Box>
    );
  }

  console.log(jobId)

  return (
    <Flex direction="column" align={"left"} justifyContent={"left"} gap={2} p={4}>
      {/* <Text>Jobs</Text> */}
      <Heading fontSize="2vw">Jobs</Heading>
      {jobs.map((job) => (
        <JobButton
          key={job.id}
          job={job}
          selected={jobId === job.id.toString()}
          onClick={() => handleJobClick(job)}
        />
      ))}
    </Flex>
  );
};

export { JobsList };