import {
  useColorMode,
  Flex,
  Box,
  IconButton,
  Text,
  Heading,
  Img,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import white_logo from "../assets/white_logo.svg";
import black_logo from "../assets/black_logo.svg";
import Image from "next/image";
import { useRouter } from 'next/router';



const TopNavbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const handleClick = () => {
    router.push('/');
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={1}
      borderBottom={"1px solid rgba(211, 211, 211, 0.5)"}
    >
      <Box marginLeft={"4"} onClick={handleClick} cursor="pointer">
        <Image src={colorMode === "dark" ? white_logo : black_logo} alt="Logo" height={24} />
      </Box>
      <IconButton
        aria-label="Toggle color mode"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="ghost"
      />
    </Flex>
  );
};

export default TopNavbar;
