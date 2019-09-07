import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
import {
  MdcButtonModule,
  MdcCardModule,
  MdcCheckboxModule,
  MdcChipsModule,
  // MDCDataTableModule,
  MdcDialogModule,
  MdcDrawerModule,
  MdcElevationModule,
  MdcFabModule,
  MdcFormFieldModule,
  MdcIconButtonModule,
  MdcIconModule,
  MdcIconRegistry,
  MdcImageListModule,
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
import { isPlatformServer } from '@angular/common';

@NgModule({
  exports: [
    MdcButtonModule,
    MdcCardModule,
    MdcCheckboxModule,
    MdcChipsModule,
    // MDCDataTableModule,
    MdcDialogModule,
    MdcDrawerModule,
    MdcElevationModule,
    MdcFabModule,
    MdcFormFieldModule,
    MdcIconButtonModule,
    MdcIconModule,
    MdcImageListModule,
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
  constructor(mdcIconRegistry: MdcIconRegistry, domSanitizer: DomSanitizer, @Inject(PLATFORM_ID) private platformId: Object) {
    const svgUrl = 'assets/mdi.svg';
    const domain = (isPlatformServer(platformId)) ? 'http://localhost:4000/' : '';
    mdcIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl(domain + svgUrl));
  }
}
