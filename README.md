This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Steps to run the project

- `git clone https://github.com/tarang9211/kintent-demo.git`
- `yarn`
- `yarn start`
- `Navigate localhost:3000 in a browser`

### Additional aspects I would have liked to cover

1. I would have liked to implement tests for the controller component i.e. `SearchInput`.
   The tests would have covered scenarios such as - The initial state of the input element i.e. (empty string). This particular test would have verified the text present in the input element. - Another test would be to verify the state of the input given an initial state. This would mock the situation where a value was present in the query parameters of the `URL`. This test would have checked if the text in the query param matched up with the state of the input element (and the text present in the input element)

2. Another test would be to verify the different states of the dataset.

   - The first test would be to verify if the `<Loading />` component is present in the DOM (maybe use test-ids) when the mock data is being fetched
   - The second test would be to check if the data is being rendered within the DOM. Again, this would verify the existence of the `<div />` element on line 103 of `home.js`
   - This sample app does not have an error state, but another test would also be to verify if the error state is being rendered i.e placeholder element

3. To test the overall functioning, I would probably use `Cypress` to mock functionalities like
   - entering text into the input element
   - verify if the `<Loading />` element shows up briefly
   - verify if the `<NoResults />` element shows up if the user enters text that has no search results.

Overall, I think there are multiple ways to test (and unit test) this application, but I would probably use the above approach.
