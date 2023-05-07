import {
  Box,
  Button,
  Code,
  Flex,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../constants";
import { CandidateReferrer, useContactCandidate } from "../hooks/useCandidate";
import { useJob } from "../hooks/useJobs";
import { ChapterCandidate } from "../types";
import { useRouter } from "next/router";

interface ReachableCandidateProps {
  candidate: ChapterCandidate;
}

const ReachableCandidate: React.FC<ReachableCandidateProps> = ({
  candidate,
}) => {
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);


  const router = useRouter();
  const jobId = router.query.id?.toString() || "1";
  const { job } = useJob(jobId)   // swr handles refetching smartly so calling the hook in different places is fine

  const fetchData = async () => {
    setLoading(true);
    // Generate email with openAI. Very rudimentary
    const { data } = await axios.post(`${API_URL}/takehome/generate_email/`, {
      candidate_email: "example@example.com",
      candidate_name: candidate.name,
      recruiter_name: "Ryan Chang",
      company_name: "Chapters Recruiting",
      position: job ? job.position : "",
      feedback,
    });
    setMessage(data.message);
    setLoading(false);
    setSent(false)
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSendClick = () => {
    // call a function to send the outreach with the generated message
    setSent(true)
  };

  const handleChange = (event) => setFeedback(event.target.value);

  const displayMessage = loading ? "generating message..." : message;

  return (
    <Flex direction="column" gap="2">
      <Text>Candidate is reachable! Here's some generated outreach:</Text>
      <Code p="4">{displayMessage}</Code>
      <Input
        placeholder="Make the email more personal"
        onChange={handleChange}
      />
      <Flex width="100%" justifyContent="space-between">
        <Button isLoading={loading} onClick={fetchData}>Re-generate message</Button>
        <Button isDisabled={loading || sent} colorScheme="green" onClick={handleSendClick}>
          {sent ? "Sent!" : "Send outreach"}
        </Button>
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
    <VStack align="flex-start" spacing={4}>
      <Text>
        Candidate is not directly reachable, here are some potential referrers
        and their closeness.
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

interface ContactCandidateProps {
  candidate: ChapterCandidate;
}

export const CandidateInfo: React.FC<ContactCandidateProps> = ({
  candidate,
}) => {
  const { referrers, isLoading, isError, reachable } = useContactCandidate(
    candidate.id
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !referrers) {
    return <Text>Error fetching referrers</Text>;
  }

  return reachable ? (
    <ReachableCandidate candidate={candidate} />
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
