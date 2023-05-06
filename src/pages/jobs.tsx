
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Hero } from "../components/Hero";
import { JobsList } from "../components/JobsList";

const Jobs = () => {
  
  return (
    <Container pb={"10vh"}>
      <Hero title="Jobs" />
      <JobsList />

      <DarkModeSwitch />
    </Container>
  );
};

export default Jobs;
