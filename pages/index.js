import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import {
  Avatar,
  AspectRatio,
  Center,
  Badge,
  Image,
  Tag,
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Card,
  CardBody,
} from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

const getDateString = (date) => {
  const d = new Date(date);
  return d.toDateString();
};

export default function Home({ quilts, cats }) {
  const quiltsSorted = quilts.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date);
  });

  console.log(cats);

  return (
    <>
      <Head>
        <title>Jackie Halpern Quilts</title>
        <meta name="description" content="Behold my quilts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          src="/images/screen-shot-2022-01-20-at-10.15.17-pm.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container maxW={{ base: "100%", lg: "1400px" }} py="48px">
          <AspectRatio ratio={1} width="250px" margin="auto" my="16px">
            <Image
              borderRadius="1000px"
              src="/images/screen-shot-2022-01-20-at-10.15.17-pm.png"
              objectFit="cover"
            />
          </AspectRatio>
          <Box display="flex" justifyContent="center" gap={4}>
            {cats.map((cat, i) => (
              <Link href={`cat/${cat.slug}`}>
                <Avatar
                  size="lg"
                  src={cat.thumbnail}
                  filter="grayscale(.5)"
                  transition="all ease .2s"
                  _hover={{
                    filter: "grayscale(1)",
                    transform: "scale(1.1)",
                    cursor: "pointer",
                  }}
                />
              </Link>
            ))}
          </Box>

          <SimpleGrid columns={3} spacing={6} py="32px">
            <Card bgColor="purple.600" color="#fff">
              <CardBody>
                <StatGroup>
                  <Stat>
                    <StatLabel>Year Started</StatLabel>
                    <StatNumber>1997</StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      {new Date().getFullYear() - 1997} years and counting!
                    </StatHelpText>
                  </Stat>
                </StatGroup>
              </CardBody>
            </Card>
            <Card bgColor="pink.600" color="#fff">
              <CardBody>
                <StatGroup>
                  <Stat>
                    <StatLabel>Quilts Created</StatLabel>
                    <StatNumber>110 </StatNumber>
                    <StatHelpText>Self Taught Passion & Hobby</StatHelpText>
                  </Stat>
                </StatGroup>
              </CardBody>
            </Card>
            <Card bgColor="cyan.600" color="#fff">
              <CardBody>
                <StatGroup>
                  <Stat>
                    <StatLabel>Cats</StatLabel>
                    <StatNumber>4</StatNumber>
                    <StatHelpText>All Devon Rex!</StatHelpText>
                  </Stat>
                </StatGroup>
              </CardBody>
            </Card>
          </SimpleGrid>

          <Heading
            size="2xl"
            bgGradient="linear(to-r, pink.500, blue.600)"
            bgClip="text"
            lineHeight="1.5"
          >
            See My Latest Creations
          </Heading>
          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6} py="16px">
            {quiltsSorted.map((quilt, i) => (
              <Link href={`/quilt/${quilt.slug}`}>
                <Box
                  position="relative"
                  transition="all ease .2s"
                  filter="brightness(90%)"
                  _hover={{
                    transform: "translateY(-4px) scale(1.02)",
                    boxShadow: "lg",
                    filter: "brightness(115%)",
                  }}
                >
                  <AspectRatio ratio={1}>
                    <Image
                      src={quilt.thumbnail}
                      objectFit="cover"
                      borderRadius="lg"
                    />
                  </AspectRatio>
                  <Box
                    bgGradient="linear(to-b, rgba(0,0,0, 0), rgba(0,0,0.10))"
                    position="absolute"
                    bottom="0"
                    width="100%"
                    p="32px"
                    pt="64px"
                    color="#fff"
                    borderRadius="lg"
                    boxShadow="lg"
                  >
                    <Heading size="lg" noOfLines={1}>
                      {quilt.title.toUpperCase()}
                    </Heading>
                    <Heading size="sm" color="gray.400" noOfLines={1}>
                      {quilt.description}
                    </Heading>
                  </Box>
                  <Box
                    position="absolute"
                    top="12px"
                    right="12px"
                    display="flex"
                    gap="2"
                    justifyContent="around"
                  >
                    <Badge bgColor="rgba(0,0,0,.7)" color="#fff" fontSize="1em">
                      #{quiltsSorted.length - i}
                    </Badge>
                    <Badge bgColor="rgba(0,0,0,.7)" color="#fff" fontSize="1em">
                      {getDateString(quilt.date)}
                    </Badge>
                  </Box>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </Container>
      </main>
    </>
  );
}

export async function getStaticProps() {
  // List of files in blgos folder
  const filesInQuilts = fs.readdirSync("./content/quilts");

  // Get the front matter and slug (the filename without .md) of all files
  const quilts = filesInQuilts.map((filename) => {
    const file = fs.readFileSync(`./content/quilts/${filename}`, "utf8");
    const matterData = matter(file);
    console.log(matterData);

    // Make sure new entries can interpret date object https://www.netlifycms.org/docs/widgets/date/#datetime
    matterData.data.date = matterData.data.date.toString();

    return {
      ...matterData.data, // matterData.data contains front matter
      slug: filename.slice(0, filename.indexOf(".")),
    };
  });

  const filesInCats = fs.readdirSync("./content/cats");

  // Get the front matter and slug (the filename without .md) of all files
  const cats = filesInCats.map((filename) => {
    const file = fs.readFileSync(`./content/cats/${filename}`, "utf8");
    const matterData = matter(file);

    return {
      ...matterData.data, // matterData.data contains front matter
      slug: filename.slice(0, filename.indexOf(".")),
    };
  });

  return {
    props: {
      quilts,
      cats,
    },
  };
}
