import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule} from '@cdk/angular/material';

import {PipesModule} from '@cdk/pipes/pipes.module';

import {CdkMaterialColorPickerComponent} from './material-color-picker.component';

@NgModule({
    declarations: [
        CdkMaterialColorPickerComponent
    ],
    imports: [
        CommonModule,

        FlexLayoutModule,

        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,

        PipesModule
    ],
    exports: [
        CdkMaterialColorPickerComponent
    ],
})
export class CdkMaterialColorPickerModule {
}
