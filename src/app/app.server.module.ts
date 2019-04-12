import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { TheOrangeAllianceComponent } from './app.component';
import { LazyUniversalModuleLoaderProvider } from 'localize-router-lazy-universal-module-loader';


@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
  ],
  providers: [
    LazyUniversalModuleLoaderProvider
  ],
  bootstrap: [TheOrangeAllianceComponent]
})
export class AppServerModule {}
