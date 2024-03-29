# Currency Exchange

Simple application for querying currency exchange rates from the Exchange rate API
https://www.exchangerate-api.com/

The useEffect hook now has [currency] as the second parameter. The effect function is therefore executed after the first render, and always after the table as its second parameter [currency] changes. That is, when the state currency gets a new value, the content of the table changes and the effect function is executed.