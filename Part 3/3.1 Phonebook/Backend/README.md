# Phonebook Backend

* **RENDER URL**: https://zero2-phonebook.onrender.com/api/persons


### Tasks
Implement a Node application that returns a hardcoded list of phonebook entries from the address 
> http://localhost:3001/api/persons

The application must be started with the command npm start and must also offer an npm run dev command.

Implement a page at the address 
> http://localhost:3001/info

The page has to show the time that the request was received and how many entries are in the phonebook at the time of processing the request.

Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be 
> http://localhost:3001/api/persons/5

If an entry for the given id is not found, the server has to respond with the appropriate status code.

Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.

Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address 
> http://localhost:3001/api/persons

Generate a new id for the phonebook entry with the Math.random function. Use a big enough range for your random values so that the likelihood of creating duplicate ids is small.

Implement error handling for creating new entries. The request is not allowed to succeed, if:
- The name or number is missing
- The name already exists in the phonebook

Add the morgan middleware to your application for logging. Configure it to log messages to your console based on the tiny configuration.

Configure morgan so that it also shows the data sent in HTTP POST requests.

Make the backend work with the phonebook frontend from the exercises of the previous part.

Deploy the backend to the internet. I will use Render.
Test the deployed backend with a browser and Postman or VS Code REST client to ensure it works.

Generate a production build of your frontend, and add it to the Internet application using the method introduced in this part.

Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas.
Create a mongo.js file in the project directory, that can be used for adding entries to the phonebook, and for listing all of the existing entries in the phonebook.

Change the fetching of all phonebook entries so that the data is fetched from the database.

Change the backend so that new numbers are saved to the database.

Change the backend so that deleting phonebook entries is reflected in the database.

Move the error handling of the application to a new error handler middleware.

If the user tries to create a new phonebook entry for a person whose name is already in the phonebook, the frontend will try to update the phone number of the existing entry by making an HTTP PUT request to the entry's unique URL.

Update the handling of the api/persons/:id and info routes to use the database, and verify that they work directly with the browser, Postman, or VS Code REST client.