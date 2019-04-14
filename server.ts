import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { join } from 'path';
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import express = require('express');
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// Leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Universal express-engine
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Server the static files with cache
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// Server the regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the server
app.listen(PORT, () => {
  console.log(`The app listening on http://localhost:${PORT}`);
});
