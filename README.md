# OrgChart React
this is an organization chart UI for the training project

## Setup

Yarn is the main tool for build & dependency management. You will be able to run yarn commands in the root of this project.
* `yarn install` - Installs all the dependencies defined in the package.json
* `yarn start` - Starts the webpack dev server and hosts the application locally at `http://localhost:3000`
* `yarn jest` - Runs the Jest Unit Tests
* `yarn cypress` - Opens the Cypress Test Runner tool
* `yarn cypress:run` - Runs the Cypress Tests headlessly
& `yarn test` - Runs both the Jest and headless Cypress Tests

## Reports

After running `yarn test` a report is generated in the `coverage` folder. This is a combined code coverage report of both the Jest and Cypress tests.
