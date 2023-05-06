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
import AddJobButton from "./AddJobButton";
import { mutate } from "swr";

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
      <Text
        whiteSpace="nowrap" // Prevent the job name from wrapping to a new line
        overflow="hidden" // Hide any overflow that extends beyond the button width
        textOverflow="ellipsis" // Add an ellipsis to indicate that the text has been truncated
      >
        {job.position}
      </Text>
    </Button>
  );
};

const JobsList: React.FC = () => {
  const { jobs, isLoading, isError, mutate } = useJobs();
  const router = useRouter();
  const [addingJob, setAddingJob] = useState(false)
  // --- Resizing ---
  const MIN_WIDTH = 0.2; // minimum width in percentage of screen width
  const MAX_WIDTH = 0.5; // maximum width in percentage of screen width

  const [sidebarWidth, setSidebarWidth] = useState(0.2);
  const [resizing, setResizing] = useState(false);

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

  const handleResize = (e: MouseEvent) => {
    setResizing(true);
    // subtract from 1 to get direction correct
    const newWidth = e.clientX / window.innerWidth;
    const sidebarPixelWidth = Math.min(
      Math.max(newWidth, MIN_WIDTH),
      MAX_WIDTH
    );
    setSidebarWidth(sidebarPixelWidth);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", handleResize);
      setResizing(false);
    });
  };

  return (
    <Flex>
      <Flex
        direction="column"
        align={"left"}
        gap={2}
        p={4}
        width={`${sidebarWidth * 100}vw`}
      >
        <Heading fontSize="24">Jobs</Heading>
        {jobs.map((job) => (
          <JobButton
            key={job.id}
            job={job}
            selected={jobId === job.id.toString()}
            onClick={() => handleJobClick(job)}
          />
        ))}
        <AddJobButton handleAddJob={mutate} />
      </Flex>
      <div
        onMouseDown={handleMouseDown}
        style={{
          width: "2px",
          overflow: "hidden",
          cursor: "col-resize",
          borderRight: "1px solid rgba(211, 211, 211, 0.5)",
          minHeight: "100vh"
        }}
      />
    </Flex>
  );
};

export { JobsList };
