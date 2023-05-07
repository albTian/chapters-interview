import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useJobs } from "../hooks/useJobs";
import { ChapterJob } from "../types";
import AddJobButton from "./AddJobButton";

interface JobButtonProps {
  job: ChapterJob;
  selected: boolean;
  onClick: () => void;
}

const JobButton: React.FC<JobButtonProps> = ({ job, selected, onClick }) => {
  const { colorMode } = useColorMode();
  const textColor = !selected
    ? ""
    : colorMode === "dark"
    ? "green.300"
    : "green";
  return (
    <Button
      justifyContent="flex-start"
      variant={selected ? "solid" : "ghost"}
      colorScheme={selected ? "gray" : undefined}
      onClick={onClick}
    >
      <Text
        whiteSpace="nowrap" // Prevent the job name from wrapping to a new line
        overflow="hidden" // Hide any overflow that extends beyond the button width
        textOverflow="ellipsis" // Add an ellipsis to indicate that the text has been truncated
        color={textColor}
      >
        {job.position}
      </Text>
    </Button>
  );
};

const JobsList: React.FC = () => {
  const { jobs, isLoading, isError, mutate } = useJobs();
  const router = useRouter();
  const [addingJob, setAddingJob] = useState(false);
  // --- Resizing ---
  const MIN_WIDTH = 0.2; // minimum width in percentage of screen width
  const MAX_WIDTH = 0.5; // maximum width in percentage of screen width

  const [sidebarWidth, setSidebarWidth] = useState(0.2);

  // Parse the job ID from the route parameters
  const jobId = router.query.id?.toString() ?? "";

  const handleJobClick = (job: ChapterJob) => {
    router.push(`/jobs/${job.id}`);
  };

  if (isLoading) {
    return (
      <Box height="100vh">
        <Flex p="4">
          <Spinner size="xl" />
          <Text>Loading jobs...</Text>
        </Flex>
      </Box>
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
          minHeight: "100vh",
        }}
      />
    </Flex>
  );
};

export { JobsList };
