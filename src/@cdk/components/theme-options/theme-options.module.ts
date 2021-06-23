import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatOptionModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule
} from '@cdk/angular/material';

import {DirectivesModule} from '@cdk/directives/directives';
import {CdkMaterialColorPickerModule} from '@cdk/components/material-color-picker/material-color-picker.module';
import {CdkSidebarModule} from '@cdk/components/sidebar/sidebar.module';

import {CdkThemeOptionsComponent} from './theme-options.component';

@NgModule({
    declarations: [
        CdkThemeOptionsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        MatButtonModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        MatSlideToggleModule,

        DirectivesModule,
        CdkMaterialColorPickerModule,
        CdkSidebarModule
    ],
    exports: [
        CdkThemeOptionsComponent
    ]
})
export class CdkThemeOptionsModule {
}
