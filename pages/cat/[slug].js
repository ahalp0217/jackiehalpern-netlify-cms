import { useState } from "react";
import { Box, Container, Image, Heading, Text, Button } from "@chakra-ui/react";
import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";

export default function Cat({ data }) {
  console.log(data);

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
            transition="all ease .2s"
          >
            <Image maxHeight="50vh" src={data.photo} />
          </Box>
          <Button
            size="lg"
            colorScheme="purple"
            onClick={() => (window.location = "/")}
          >
            View All Quilts
          </Button>
        </Container>
      </main>
    </div>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const fileContent = matter(
    fs.readFileSync(`./content/cats/${slug}.md`, "utf8")
  );
  let data = fileContent.data;

  return {
    props: { data },
  };
}

export async function getStaticPaths() {
  const filesInProjects = fs.readdirSync("./content/cats");

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
