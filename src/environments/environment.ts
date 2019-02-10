// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCxK14f13kbyb0p1NRYnGoqmgSWFHJvdo8",
    authDomain: "the-orange-alliance.firebaseapp.com",
    databaseURL: "https://the-orange-alliance.firebaseio.com",
    projectId: "the-orange-alliance",
    storageBucket: "the-orange-alliance.appspot.com",
    messagingSenderId: "495169296462"
  }
};
