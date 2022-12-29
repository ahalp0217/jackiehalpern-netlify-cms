import { useState } from "react";
import {
  Box,
  Card,
  CardBody,
  Stack,
  Text,
  CardFooter,
  Container,
  Image,
  Heading,
  Button,
  Link,
  VStack,
} from "@chakra-ui/react";
import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";

const getDateString = (date) => {
  const d = new Date(date);
  return d.toDateString();
};

export default function Blogs({ blogs }) {
  return (
    <div>
      <Head>
        <title>Jackie Halpern Blogs</title>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta
          name="description"
          content="Jackie Halpern recommendations, adventures, and more!"
        />
        <meta
          property="og:image"
          src="/imagesOptimized/screen-shot-2022-01-20-at-10.15.17-pm.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container
          maxW={{ base: "100%", lg: "1400px" }}
          py="32px"
          display="flex"
          gap="16px"
          flexDir="column"
        >
          <Heading
            size="2xl"
            bgGradient="linear(to-r, pink.500, blue.600)"
            bgClip="text"
            lineHeight="1.5"
          >
            Follow my Journey!
          </Heading>
          <VStack spacing={4}>
            {blogs.map((blog, i) => (
              <Link
                href={`blog/${blog.slug}`}
                width="100%"
                transition="all ease .2s"
                boxShadow="md"
                _hover={{
                  cursor: "pointer",
                  boxShadow: "lg",
                }}
              >
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "200px" }}
                    src={blog.thumbnail}
                    alt=""
                  />

                  <Stack>
                    <CardBody>
                      <Heading size="md">{blog.title}</Heading>
                      <Text py="2">{getDateString(blog.date)}</Text>
                    </CardBody>

                    <CardFooter>
                      <Button variant="solid" colorScheme="purple">
                        Read More!
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
              </Link>
            ))}
          </VStack>
        </Container>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  // List of files in blgos folder
  const filesInBlogs = fs.readdirSync("./content/blogs");

  // Get the front matter and slug (the filename without .md) of all files
  let blogs = filesInBlogs.map((filename) => {
    const file = fs.readFileSync(`./content/blogs/${filename}`, "utf8");
    const matterData = matter(file);

    // Make sure new entries can interpret date object https://www.netlifycms.org/docs/widgets/date/#datetime
    matterData.data.date = matterData.data.date.toString();

    return {
      ...matterData.data, // matterData.data contains front matter
      slug: filename.slice(0, filename.indexOf(".")),
    };
  });

  blogs = blogs.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date);
  });

  return {
    props: {
      blogs,
    },
  };
}
