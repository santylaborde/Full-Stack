# User Notes Backend
In this part, our focus shifts towards the backend: that is, towards implementing functionality on the server side of the stack.

We will be building our backend on top of NodeJS, which is a JavaScript runtime based on Google's Chrome V8 JavaScript engine.

Our goal is to implement a backend that will work with the notes application from part 2.

Let's make a practice application by creating a new file, mongo.js in the root of the notes backend application.
Saving the object to the database happens with the appropriately named save method.
The objects are retrieved from the database with the find method.