import { useContactCandidate, CandidateReferrer } from '../hooks/useCandidate';
import { Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface ContactCandidateProps {
  linkedinId: string;
}

export const CandidateInfo: React.FC<ContactCandidateProps> = ({ linkedinId }) => {
  const { referrers, isLoading, isError, reachable } = useContactCandidate(linkedinId);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !referrers) {
    return <Text>Error fetching referrers</Text>;
  }

  if (reachable) {
    return (
        <Text>Candidate is reachable!</Text>
    )
  }

  return (
    <VStack align="flex-start" spacing={4}>
      <Text fontWeight="bold">Referrers:</Text>
      {referrers.map((referrer: CandidateReferrer) => (
        <Flex key={referrer.user_id} justifyContent="space-between" width="100%">
          <Text>{referrer.name}</Text>
          <Text fontSize="sm">{referrer.tags}</Text>
        </Flex>
      ))}
    </VStack>
  );
};
