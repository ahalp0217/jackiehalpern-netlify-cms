const sharp = require("sharp");
const fs = require("fs");

// The path to the directory containing the images
const inputDir = "./public/images";

// The path to the directory where the resized images should be output
const outputDir = "./public/imagesOptimized";

// Loop through all the files in the input directory

console.log("Optimizing Images");

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error(`An error occurred while reading the directory: ${err}`);
    process.exit(0);
    return;
  }

  // Process each image in the directory
  files.forEach(async (file) => {
    if (!fs.existsSync(`${outputDir}/${file}`)) {
      try {
        // Read the image file
        const image = sharp(`${inputDir}/${file}`);

        // Resize the image to a width of 300 pixels
        const resizedImage = image.resize({ width: 500 });

        // Save the resized image to the output directory
        await resizedImage.toFile(`${outputDir}/${file}`);
        console.log(`Optimizing ${file}`);
      } catch (error) {
        console.error(`An error occurred while processing the image: ${error}`);
      }
    }
  });
  console.log("All images optimized");
});
