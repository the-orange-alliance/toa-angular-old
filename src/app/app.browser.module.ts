import { TheOrangeAllianceComponent } from './app.component';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  bootstrap: [TheOrangeAllianceComponent],
  imports: [
    BrowserModule.withServerTransition({appId: 'toa-webapp'}),
    AppModule,
  ]
})
export class AppBrowserModule {}
