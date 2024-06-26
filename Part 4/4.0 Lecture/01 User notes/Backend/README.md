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

- db initialization
The database is cleared out at the beginning, and after that, we save the two notes stored in the initialNotes array to the database. By doing this, we ensure that the database is in the same state before every test is run.

- Async/Await
Replace the .then()/.catch() structure with async and await.
You should used try/catch for the exceptions catching.

Replace the try/catch structure using express-async-errors library.
The library handles everything under the hood. If an exception occurs in an async route, the execution is automatically passed to the error-handling middleware.