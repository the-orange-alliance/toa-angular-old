/**
 * Created by Kyle Flynn on 5/29/2017.
 */
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { TheOrangeAllianceComponent } from './app.component';

@NgModule({
  imports: [
    ServerModule,
    AppModule
  ],
  bootstrap: [TheOrangeAllianceComponent]
})
export class AppServerModule { }
