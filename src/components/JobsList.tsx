import {
  Box,
  Button,
  Center,
  HStack,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useJobs } from "../hooks/useJobs";
import Link from "next/link";

const JobsList: React.FC = () => {
  const { jobs, isLoading, isError } = useJobs();

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

  return (
    <Box>
      <List spacing={3}>
        {jobs.map((job) => (
          <ListItem key={job.id}>
            <Link href={`/jobs/${job.id}`}>
              <HStack
                spacing={3}
                alignItems="center"
                justifyContent="space-between"
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                p={3}
              >
                <Text fontSize="xl" fontWeight="bold">
                  {job.position}
                </Text>
                <Button
                  as="a"
                  href={job.job_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  variant="outline"
                >
                  Apply
                </Button>
              </HStack>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export { JobsList };
