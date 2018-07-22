Simple React application the uses the [Open Weather API](https://openweathermap.org/api) to display five day forecast information for a selected city.

## The Needfull
An API key is required to be set in `config.js`.  Free from https://openweathermap.org/appid.  Copy the `src/config.baseline.js` to `src/config.js` and set the `API_KEY`

To start the application run
`npm install` and
`npm start` 

## The Good
Bootstrapped with [create-react-app](https://github.com/facebook/create-react-app), so the usual scripts are available.  In addition, a test coverage script has been added and can be invoked with `npm run test:coverage` which will produce a report in `project_root/coverage`

Linting is done via `eslint` and is based on `airbnb` rather opinionated linting rules.  The fantastic [Prettier](https://prettier.io) is incorperated with elsint for consitent code formatting.  If using `Visual Studio Code` as your editor and have the `Prettier` plugin installed, `Prettier` will format on save. 

Unit testing makes use of `create-react-app`'s built-in [Jest](https://jestjs.io), combined with [Enzyme](https://github.com/airbnb/enzyme) for component unit testing.

## The Bad
`Open Weather API` does not provide a city lookup based on name.  However, they do provide a static file to download and use.  It is rather large, so, for this application the cities have been filtered to use GB cities only.  This has been mocked in `src/api.js`

## The Ugly
A rather convoluted `normalize` function in `src/utils.js` is used to group the data provided by the `Open Weather API`, which the shape of is less than ideal for this application.
