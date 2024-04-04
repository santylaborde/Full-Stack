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