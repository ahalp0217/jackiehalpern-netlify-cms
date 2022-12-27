import { Box, Container, Link } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Box
      boxShadow="base"
      py="20px"
      position="sticky"
      top="0"
      zIndex="1000"
      bgColor="rgba(255,255,255,.8)"
      backdropFilter="blur(20px)"
    >
      <Container maxW={{ base: "100%", lg: "1400px" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap="4"
        >
          <Link
            href="/"
            fontSize={{ base: "xl", lg: "3xl" }}
            fontWeight="bold"
            bgGradient="linear(to-r, blue.500, pink.600)"
            bgClip="text"
          >
            Jackie Halpern Quilts
          </Link>
          <Link
            href="https://www.instagram.com/quiltsandcats18/"
            target="_blank"
          >
            Instagram 🧵 🐱
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
