# JSON Server

Let's use a tool meant to be used during software development called JSON Server to act as our server.
For a while now we have only been working on "frontend", i.e. client-side (browser) functionality.
We will now take a step in direction to the "backend", i.e. server-side functionality.
Familiarizing ourselves with how the code executing in the browser communicates with the backend.

Note:
This approach has many issues, as we're rendering the entire App component only when we successfully retrieve a response


- Adding new notes

The object is sent to the server using the axios post method.

- Updating notes

Let's add a button to every note that can be used for toggling its importance.

- Extracting Communication with the Backend into a Separate Module

In the spirit of the single responsibility principle, we deem it wise to extract this communication into its own module.

- Error catching

The application should be able to handle these types of error situations gracefully. The more common way of adding a handler for rejected promises is to use the catch method.