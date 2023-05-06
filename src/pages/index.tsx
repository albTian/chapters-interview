
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Hero } from "../components/Hero";

const Index = () => {
  
  return (
    <Container pb={"10vh"}>
      <Hero title={"Home"}/>
      <DarkModeSwitch />
    </Container>
  );
};

export default Index;
