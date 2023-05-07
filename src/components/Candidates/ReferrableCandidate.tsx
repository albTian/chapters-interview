import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { CandidateReferrer } from "../../hooks/useCandidate";

interface ReferrerProps {
  referrer: CandidateReferrer;
}

const Referrer: React.FC<ReferrerProps> = ({ referrer }) => {
  const [isAsked, setIsAsked] = useState(false);

  const handleAskForReferenceClick = () => {
    // TODO: implement backend logic to ask for a referral!
    setIsAsked(true);
  };

  return (
    <Flex justifyContent="space-between" width="100%" alignItems="center">
      <Box>
        <Text>{referrer.name}</Text>
        <Text fontSize="sm">{referrer.tags}</Text>
      </Box>
      <Flex alignItems="center" gap="2">
        {isAsked ? (
          <Text fontWeight="bold" color="green">
            Asked!
          </Text>
        ) : (
          <>
            <Text
              fontWeight="bold"
              color={getScoreColor(referrer.closeness_score)}
            >
              {Math.round(referrer.closeness_score * 100)}
            </Text>
            <Button onClick={handleAskForReferenceClick}>
              Ask for reference
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};

interface ReferrableCandidateProps {
  referrers: CandidateReferrer[];
}

const ReferrableCandidate: React.FC<ReferrableCandidateProps> = ({
  referrers,
}) => {
  return (
    <Box>
      <Text>
        Candidate is not directly reachable, here are some potential referrers
        and their closeness.
      </Text>
      <Text fontWeight="bold">Referrers:</Text>
      <Flex direction="column" gap="2" marginTop="2">
        {referrers.map((referrer: CandidateReferrer) => (
          <Referrer key={referrer.user_id} referrer={referrer} />
        ))}
      </Flex>
    </Box>
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

export { ReferrableCandidate };
