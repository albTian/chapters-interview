import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { API_URL } from "../constants";

interface AddJobButtonProps {
  handleAddJob: () => void;
}

export default function AddJobButton({ handleAddJob }: AddJobButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [position, setPosition] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newJob = {
      position,
      job_url: jobUrl,
      description,
    };
    console.log("submitting jobs");
    console.log(newJob);
    try {
      const response = await axios.post(`${API_URL}/takehome/jobs`, [newJob]);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    onClose();
    handleAddJob();   // Refreshes SWR to re-fetch the jobs data immediately
  };

  return (
    <>
      <Button onClick={onOpen}>Add Job</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Job</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl id="position">
                <FormLabel>Position</FormLabel>
                <Input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </FormControl>

              <FormControl id="job-url">
                <FormLabel>Job URL</FormLabel>
                <Input
                  type="text"
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                />
              </FormControl>

              <FormControl id="description">
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>

              <Button mt={4} colorScheme="blue" type="submit">
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
