import { AppBrowserModule } from '.././src/app/app.browser.module';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule);
});

if ('serviceWorker' in navigator && environment.production) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js');
}
