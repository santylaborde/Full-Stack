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


### Adding style

#### Adding CSS file
First, we will add CSS to our application the old-school way; in a single file without using a CSS preprocessor.

#### Improved error message: 
Let's implement the error message as its own React component.

#### Inline styles:
Inline styles and some of the other ways of adding styles to React components go completely against the grain of old conventions. 

Traditionally, separated CSS from the content (HTML) and functionality (JavaScript). 

The goal was to write CSS, HTML, and JavaScript into their separate files.

The philosophy of React is, in fact, the polar opposite of this.

Now a React component:
- Defines the HTML for structuring the content
- The JavaScript functions for determining functionality
- The component's styling

This is to create individual components that are as independent and reusable as possible.