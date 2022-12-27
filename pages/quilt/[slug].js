import { useState } from "react";
import { Box, Container, Image, Heading, Text, Button } from "@chakra-ui/react";
import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default function Quilt({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Head>
        <title>{data.title}</title>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta name="description" content={data.description} />
        <meta property="og:image" src={data.thumbnail} />
      </Head>
      <main>
        <Container
          maxW={{ base: "100%", lg: "1400px" }}
          py="32px"
          display="flex"
          gap="16px"
          flexDir="column"
        >
          <Heading>{data.title}</Heading>
          <Text fontSize="2xl">{data.description}</Text>
          <Box
            bgColor="gray.100"
            display="flex"
            justifyContent="center"
            onClick={() => setIsOpen(!isOpen)}
            transition="all ease .2s"
            _hover={{
              cursor: "pointer",
              transform: "scale(1.03)",
            }}
          >
            <Image maxHeight="50vh" src={data.thumbnail} />
          </Box>
          <Button
            size="lg"
            colorScheme="purple"
            onClick={() => (window.location = "/")}
          >
            View All Quilts
          </Button>
        </Container>
        {isOpen && (
          <Lightbox
            mainSrc={data.thumbnail}
            onCloseRequest={() => setIsOpen(!isOpen)}
          />
        )}
      </main>
    </div>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const fileContent = matter(
    fs.readFileSync(`./content/quilts/${slug}.md`, "utf8")
  );
  let data = fileContent.data;

  return {
    props: { data },
  };
}

export async function getStaticPaths() {
  const filesInProjects = fs.readdirSync("./content/quilts");

  // Getting the filenames excluding .md extension
  // and returning an array containing slug (the filename) as params for every route
  // It looks like this
  // paths = [
  //   { params: { slug: 'my-first-blog' }},
  //   { params: { slug: 'how-to-train-a-dragon' }},
  //   { params: { slug: 'how-to-catch-a-pokemon' }},
  // ]
  const paths = filesInProjects.map((file) => {
    const filename = file.slice(0, file.indexOf("."));
    return { params: { slug: filename } };
  });

  return {
    paths,
    fallback: false, // This shows a 404 page if the page is not found
  };
}
