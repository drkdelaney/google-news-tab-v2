## Getting Started

- Install the newest LTS version of node (https://nodejs.org/)
- Enable corepack to use yarn package manager (https://yarnpkg.com/getting-started/install)
- Open the root of the project in a terminal
- Run `yarn install` to get all of the dependencies

## Build locally

- In the root of the project, run `yarn build`
- The output of the build is in the `build` folder
- Load those files in the browser with the _Load Temporary Add-on..._ feature in FireFox

## Runing locally

- Storage sync does not work locally. To fix this open the file `src/services/StorageService.ts`
  - comment out line 6 and 11
  - uncomment out line 13
- In the terminal of the project, run `yarn start`
- The app will now run in the browser
