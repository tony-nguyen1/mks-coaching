# MksCoaching

![GitHub contributors](https://img.shields.io/github/contributors/tony-nguyen1/mks-coaching)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/tony-nguyen1/mks-coaching)
![Static Badge](https://img.shields.io/badge/Angular-v19-red?style=for-the-badge&logo=angular&logoColor=red)





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
ng build mks-coaching --named-chunks
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

npm i -D daisyui@latest
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

## Graph ApexCharts

[Lien](https://github.com/apexcharts/ng-apexcharts) vers le dépôt sur Github ; [leur page web](https://apexcharts.com/).

```bash
ng add ng-apexcharts
```

# TODO

## Techs

- Partial hydration
- Animatations
- ~~Static Site Generation~~ il faut un server pour faire ça
- Mobile First Design
- TransformStream pour l'inscription ??? J'ai oublié ce que ça veut dire ???
- Me trouver un nouveau shell ? IDE ? éditeur de texte ?

## CSS/UX/UI

- .btn:focus-not-visible et .btn:focs:not(:focus-visible) pour focus avec tab et souris resp.
- utiliser initial-letter pour faire un style magazine
- new viewports units : lvh et svh
- inert
- animation-timeline ?
- dialog html et css ::backdrop
- popover pour faire apparaitre et disparaitre un agenda par exemple ???
- container ???

## Features

# Asset Source 

## Font

[CallHeart font](https://www.fontspace.com/callheart-font-f108820)

# Sémentique de Version

[SemVer](https://semver.org/lang/fr/)