# User Notes Backend

In this part, we will continue our work on the backend. Our first major theme will be writing unit and integration tests for the backend. After we have covered testing, we will take a look at implementing user authentication and authorization.

- Project structure
Let's continue our work on the backend of the notes application
The contents of the index.js file used for starting the application gets simplified.
The different code have been moved into a dedicated modules.

Let's start our testing journey by looking at unit tests. The logic of our application is so simple, that there is not much that makes sense to test with unit tests.

- Adding test environment
The convention in Node is to define the execution mode of the application with the NODE_ENV environment variable.

- supertest
Let's use the supertest package to help us write our tests for testing the API.