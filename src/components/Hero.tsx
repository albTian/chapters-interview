import { Flex, Heading } from '@chakra-ui/react'

interface HeroProps {
  title: string
}

export const Hero = ({title}: HeroProps) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    height="20vh"
    bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
    bgClip="text"
  >
    <Heading fontSize="6vw">{title}</Heading>
  </Flex>
)