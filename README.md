# TheOrangeAlliance

The Orange Alliance was inspired by [The Blue Alliance](http://thebluealliance.com), but we are not affiliated.

This projet includes a full-stack development module using MySQL as the database, Express as the server-side api, Angular 4 for the client-side single page application, and Node.js for the underlying platform. (MEAN stack development).

## Running Angular 4 with ExpressJS and Client-Side Rendering

First, do a build of the Angular client with `ng build --prod && ngc`. Once finished, run the express server using `npm start`, or `node ./server/server.js`. 

## Running Angular 4 with ExpressJS and Server-Side Rendering

Open up the `package.json` file and replace the start script with the following two scripts: `"prestart": "ng build --prod && ngc", "start": "ts-node src/server.ts"`. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
