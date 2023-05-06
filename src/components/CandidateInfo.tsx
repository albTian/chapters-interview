import { useContactCandidate, CandidateReferrer } from "../hooks/useCandidate";
import { Box, Button, Code, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface ContactCandidateProps {
  linkedinId: string;
}

const ReachableCandidate = () => {
  return (
    <Flex direction="column" gap="2">
        <Text>Candidate is reachable! Here's some generated outreach:</Text>
        <Code p="4">personalized outreach...</Code>
        <Button>Send outreach</Button>
    </Flex>
  );
};

interface ReferrableCandidateProps {
  referrers: CandidateReferrer[];
}

const ReferrableCandidate = ({ referrers }: ReferrableCandidateProps) => {
  return (
    <VStack align="flex-start" spacing={4}>
      <Text>
        Candidate is not directly reachable, here are some potential referrers.
      </Text>
      <Text fontWeight="bold">Referrers:</Text>
      {referrers.map((referrer: CandidateReferrer) => (
        <Flex
          key={referrer.user_id}
          justifyContent="space-between"
          width="100%"
        >
          <Box>
            <Text>{referrer.name}</Text>
            <Text fontSize="sm">{referrer.tags}</Text>
          </Box>
          <Text
            fontWeight="bold"
            color={getScoreColor(referrer.closeness_score)}
          >
            {Math.round(referrer.closeness_score * 100)}
          </Text>
        </Flex>
      ))}
    </VStack>
  );
};

export const CandidateInfo: React.FC<ContactCandidateProps> = ({
  linkedinId,
}) => {
  const { referrers, isLoading, isError, reachable } =
    useContactCandidate(linkedinId);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !referrers) {
    return <Text>Error fetching referrers</Text>;
  }

  if (reachable) {
    return <ReachableCandidate />;
  } else {
  }

  return reachable ? (
    <ReachableCandidate />
  ) : (
    <ReferrableCandidate referrers={referrers} />
  );
};

const getScoreColor = (score: number) => {
  if (score >= 0.8) {
    return "green.500";
  } else if (score >= 0.6) {
    return "yellow.500";
  } else {
    return "red.500";
  }
};
