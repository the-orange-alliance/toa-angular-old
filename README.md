<div align="center">
  <img width="100" height="100" src="https://theorangealliance.org/assets/imgs/favicon.png">
  <h1>The Orange Alliance</h1>
  <p>Webapp version of The Orange Alliance</p>
  <small><a href="https://theorangealliance.org" target="_blank">Live version</a></small>
</div>

## Introduction

The Orange Alliance is a project to centralize _FIRST_ Tech Challenge (FTC) Scouting Data so that anyone can have access to it. We are a project run by the FTC **community** and would love to have more people help with this project in anyway.

[Chat with us on Discord](https://discord.gg/5fH66UV)<br/>
[Like us on Facebook](https://www.facebook.com/theorangealliance/) 

![Home Page](https://user-images.githubusercontent.com/16443111/48767939-8986f800-ecc0-11e8-9d5f-0939dfb6efc5.png)

## Built with
- [Angular 6](https://angular.io)
- [Material Web Components for Angular](https://github.com/trimox/angular-mdc-web)
- [Bootstrap](https://getbootstrap.com)
- [Firebase](https://firebase.google.com)
- [MySQL](https://www.mysql.com)

And [more](https://github.com/orange-alliance/the-orange-alliance/blob/master/package.json)...

## Running locally

### Setting up the project
Clone the repository and run ``npm install``.

### Setting up Firebase
You'll need to set up Firebase's Realtime Database properly in order to make this app work.
You'll need to ֿfill the appropriate details in [environment.ts](https://github.com/orange-alliance/the-orange-alliance/blob/master/src/environments/environment.ts) and in [environment.prod.ts](https://github.com/orange-alliance/the-orange-alliance/blob/master/src/environments/environment.prod.ts).


### Running the dev server
Run ``ng serve`` for a dev server and navigate to http://localhost:4200.<br/>
The app will automatically reload if you change any of the source files.


### Build
Run ``ng build`` to build the project. The build artifacts will be stored in the ``public/`` directory.
<br/>Use the ``--prod`` flag for a production build.
