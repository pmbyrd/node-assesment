const { getUrlsFromFile } = require('./urls');

describe('getUrlsFromFile', function () {
  test("it should log each URL in the file", async function () {
    const urls = ["http://www.google.com", "http://www.example.com"];
    await getUrlsFromFile("urls.txt"); // Add 'await' to ensure the function completes before running the assertions
    expect(console.log.mock.calls.length).toBe(urls.length);
    urls.forEach((url, index) => {
      expect(console.log.mock.calls[index][0]).toBe(url);
    });
  });
});


