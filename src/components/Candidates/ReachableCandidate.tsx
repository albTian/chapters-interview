import {
    Button,
    Code,
    Flex,
    Input, Text
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import { useJob } from "../../hooks/useJobs";
import { ChapterCandidate } from "../../types";

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
    const { job } = useJob(jobId); // swr handles refetching smartly so calling the hook in different places is fine
  
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
      setSent(false);
    };
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleSendClick = () => {
      // call a function to send the outreach with the generated message
      setSent(true);
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
          <Button isLoading={loading} onClick={fetchData}>
            Re-generate message
          </Button>
          <Button
            isDisabled={loading || sent}
            colorScheme="green"
            onClick={handleSendClick}
          >
            {sent ? "Sent!" : "Send outreach"}
          </Button>
        </Flex>
      </Flex>
    );
  };
  
  export { ReachableCandidate };
