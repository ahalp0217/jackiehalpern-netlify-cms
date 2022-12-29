import { useState } from "react";
import { Box, Container, Image, Heading, Text, Button } from "@chakra-ui/react";
import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";
import ReactMarkdown from "react-markdown";

import ChakraUIRenderer from "chakra-ui-markdown-renderer";

const getDateString = (date) => {
  const d = new Date(date);
  return d.toDateString();
};

/* Data is everything but the blog post content stuff. I.e. just the meta data */
export default function Blog({ data, content }) {
  return (
    <div>
      <Head>
        <title>{data.title}</title>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta name="description" content={data.description} />
        <meta property="og:image" src={data.thumbnail} />
      </Head>
      <main>
        <Container maxW={{ base: "100%", lg: "1400px" }} px="0">
          <Container
            maxW={{ base: "100%", lg: "1000px" }}
            margin="0"
            py="32px"
            display="flex"
            gap="16px"
            flexDir="column"
          >
            <Text>{getDateString(data.date)}</Text>
            <Heading lineHeight={0.5} fontWeight="extrabold">
              {data.title}
            </Heading>

            <hr />

            <Box lineHeight={1} py="4">
              <ReactMarkdown
                components={ChakraUIRenderer()}
                children={content}
              />
            </Box>
            <Button
              size="lg"
              colorScheme="purple"
              onClick={() => (window.location = "/blogs")}
            >
              View All Blog Posts
            </Button>
          </Container>
        </Container>
      </main>
    </div>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const fileContent = matter(
    fs.readFileSync(`./content/blogs/${slug}.md`, "utf8")
  );
  let data = fileContent.data;
  data.date = data.date.toString();
  const content = fileContent.content;

  return {
    props: { data, content },
  };
}

export async function getStaticPaths() {
  const filesInProjects = fs.readdirSync("./content/blogs");

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
