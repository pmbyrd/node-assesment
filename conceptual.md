### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  1. Callbacks
  2. Promises
  3. Async/Await
  4. Libraries such as jquery 

- What is a Promise?
  A value that we will be fulfilled at a later time.

- What are the differences between an async function and a regular function?
  An async functions is waiting for a promise to be fulfilled.  A regular function can be invoked anytime that it is called.
  Asynchronous functions is handed off to the browser while a regular function is executed by JavaScript itself. 

- What is the difference between Node.js and Express.js?
  Node.js is a backend JavaScript that can be ran server side on the backend.  Express.js is a framework that allows for web development of developing full stack applications using Node.js.

- What is the error-first callback pattern?
  The error-first callback pattern is a way of implementing are code to handle errors first if they occur.  This is way of handling the values that will be used in our application to make sure that are valid values that are capable of performing our intentions as well as accounting for handling unknown errors so that our code will continue to execute even if a value is incorrect.
  Telling our program how to continue to perform in case the value given or expected does not work, is of the incorrect type or if it is missing.

- What is middleware?
  Middleware our objects that we can import via third party libraries or write ourselves.  They allow us to perform operations that we want our application to use such as logging or common functions to be passed in to our routes.

- What does the `next` function do?
  The next call back method that we can pass into our routes.  When invoked within in its scope it performs an action to tell our application how to proceed when it encounters an error or to perform an action at a later time without crashing our application.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

- The variable names are hard coded in and are not particularly descriptive.
- There is no error handling.
- Promise.all() would be a better method to use than awaiting for each result individually.
