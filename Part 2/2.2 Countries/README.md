# Countries

Make an application that allows you to view information from different countries.
At https://studies.cs.helsinki.fi/restcountries/ you can find a service that offers a lot of information related to different countries in a so-called machine-readable format via the REST API.

The user interface is very simple. The country to be shown is found by typing a search query into the search field.

If there are too many (over 10) countries that match the query, then the user is prompted to make their query more specific.

If there are ten or fewer countries, but more than one, then all countries matching the query are shown.

When there is only one country matching the query, then the basic data of the country (eg. capital and area), its flag and the languages spoken are shown.

NB: It is enough that your application works for most countries. Some countries, like Sudan, can be hard to support since the name of the country is part of the name of another country, South Sudan. You don't need to worry about these edge cases.

Improve on the application in the previous exercise, such that when the names of multiple countries are shown on the page there is a button next to the name of the country, which when pressed shows the view for that country.