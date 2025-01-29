# MksCoaching

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

### Installing Cypress

To install [Cypress](https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test), run this command :

```bash
ng add @cypress/schematic
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Deployement

To deploy to github pages from the command line install [angular-cli-pages](https://www.npmjs.com/package/angular-cli-ghpages).

```bash
ng add angular-cli-ghpages
```

Then, you can use the next command. It will : 
- build the project
- nuke the source file and keep only the output
- create the error 404 page
- create the branch gh-pages, add, commit and push to the repository

```bash
ng deploy --base-href=/mks-coaching/
```

## Tailwind

[Source](https://angular.fr/technical/tailwind)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwind init
```

## Firebase 

[Link for firebase](https://firebase.google.com/docs/web/setup?authuser=0&hl=fr)

```bash
npm install firebase
```

## Firestore

```
npm install firebase@11.2.0 --save
```

