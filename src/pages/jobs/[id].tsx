import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Box, Text } from '@chakra-ui/react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function JobsDetails() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Box>
      <Text fontSize="3xl">bruh</Text>
      <Text fontSize="xl" color="gray.600">
        hi
      </Text>
    </Box>
  );
}
