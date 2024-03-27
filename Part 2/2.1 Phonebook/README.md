# Phonebook

Let's create a simple phonebook. In this part, we will only be adding names to the phonebook.

Let us start by implementing the addition of a person to the phonebook.

Prevent the user from being able to add names that already exist in the phonebook.

Expand your application by allowing users to add phone numbers to the phone book.

Implement a search field that can be used to filter the list of people by name.

If you have implemented your application in a single component, refactor it by extracting suitable parts into new components. Maintain the application's state and all event handlers in the App root component.

Store the initial state of the application in the file db.json
Modify the application such that the initial state of the data is fetched from the server using the axios-library. Complete the fetching with an Effect hook.

Currently, the numbers that are added to the phonebook are not saved to a backend server. Fix this situation. Extract the code that handles the communication with the backend into its own module.

Make it possible for users to delete entries from the phonebook. The deletion can be done through a dedicated button for each person in the phonebook list. You can confirm the action from the user by using the window.confirm method.

Change the functionality so that if a number is added to an already existing user, the new number will replace the old number. It's recommended to use the HTTP PUT method for updating the phone number. If the person's information is already in the phonebook, the application can ask the user to confirm the action

Use the improved error message example from part 2 as a guide to show a notification that lasts for a few seconds after a successful operation is executed (a person is added or a number is changed)

 The unsuccessful message is shown to the user when the operation does not succeed.