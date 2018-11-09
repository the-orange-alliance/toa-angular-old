import { NgModule } from '@angular/core';
import {
  MdcIconRegistry,
  MdcButtonModule,
  MdcCardModule,
  MdcCheckboxModule,
  MdcDialogModule,
  MdcDrawerModule,
  MdcElevationModule,
  MdcFabModule,
  MdcFormFieldModule,
  MdcIconButtonModule,
  MdcIconModule,
  MdcLinearProgressModule,
  MdcListModule,
  MdcMenuModule,
  MdcRadioModule,
  MdcRippleModule,
  MdcSelectModule,
  MdcSliderModule,
  MdcSnackbarModule,
  MdcSwitchModule,
  MdcTabBarModule,
  MdcTextFieldModule,
  MdcTopAppBarModule,
  MdcTypographyModule
} from '@angular-mdc/web';

import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  exports: [
    MdcIconModule,
    MdcButtonModule,
    MdcCardModule,
    MdcCheckboxModule,
    MdcDialogModule,
    MdcDrawerModule,
    MdcElevationModule,
    MdcFabModule,
    MdcFormFieldModule,
    MdcIconButtonModule,
    MdcIconModule,
    MdcLinearProgressModule,
    MdcListModule,
    MdcMenuModule,
    MdcRadioModule,
    MdcRippleModule,
    MdcSelectModule,
    MdcSliderModule,
    MdcSnackbarModule,
    MdcSwitchModule,
    MdcTabBarModule,
    MdcTextFieldModule,
    MdcTopAppBarModule,
    MdcTypographyModule
  ]
})

export class AppMaterialModule {
  constructor(mdcIconRegistry: MdcIconRegistry, domSanitizer: DomSanitizer) {
    mdcIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/mdi.svg')); // Or whatever path you placed mdi.svg at
  }
}
