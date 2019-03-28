import { TheOrangeAllianceComponent } from './app.component';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
import { BrowserModule , BrowserTransferStateModule} from '@angular/platform-browser';

@NgModule({
  bootstrap: [TheOrangeAllianceComponent],
  imports: [
    BrowserModule.withServerTransition({appId: 'app-root'}),
    BrowserTransferStateModule,
    AppModule,
  ]
})
export class AppBrowserModule {}
