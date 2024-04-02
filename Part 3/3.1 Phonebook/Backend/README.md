# Phonebook Backend

Implement a Node application that returns a hardcoded list of phonebook entries from the address 
> http://localhost:3001/api/persons.

The application must be started with the command npm start and must also offer an npm run dev command.

Implement a page at the address http://localhost:3001/info.
The page has to show the time that the request was received and how many entries are in the phonebook at the time of processing the request.

Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5

If an entry for the given id is not found, the server has to respond with the appropriate status code.

Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.