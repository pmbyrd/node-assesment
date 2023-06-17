const fs = require("fs");
const axios = require("axios");

function fetchUrlsFromFile(filename) {
  // Check if the file exists
  if (!fs.existsSync(filename)) {
    console.log(`Error: File '${filename}' does not exist.`);
    return;
  }

  // Read the file contents
  const urls = fs
    .readFileSync(filename, "utf8")
    .split("\n")
    .map((url) => url.trim());

  // Process each URL
  urls.forEach(async (url, index) => {
    try {
      // Make the GET request
      const response = await axios.get(url);

      // Check if the request was successful
      if (response.status === 200) {
        // extract the file name from the url ir should be the domain name + .txt
        const outputFilename = url.replace(/(^\w+:|^)\/\//, "") + ".txt";

        // Write the response content to a file
        fs.writeFileSync(outputFilename, response.data);
        console.log(`Successfully fetched URL ${index}: ${url}`);
      } else {
        console.log(
          `Error fetching URL ${index}: ${url} (Status code: ${response.status})`
        );
      }
    } catch (error) {
      console.log(`Error fetching URL ${index}: ${url} (${error.message})`);
    }
  });

  console.log("All URLs processed.");
}

// Example usage: node script.js urls.txt
if (process.argv.length < 3) {
  console.log("Error: Please provide the filename as an argument.");
} else {
  const filename = process.argv[2];
  fetchUrlsFromFile(filename);
}

// // Example usage: node script.js urls.txt
