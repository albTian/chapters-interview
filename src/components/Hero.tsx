import { Flex, Heading } from '@chakra-ui/react'

export const Hero = () => (
  <Flex
    justifyContent="center"
    alignItems="center"
    height="20vh"
    bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
    bgClip="text"
  >
    <Heading fontSize="6vw">Chapters linkedin referrals!</Heading>
  </Flex>
)