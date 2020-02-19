import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@cdk/angular/material';
import { MatCheckboxModule } from '@cdk/angular/material';
import { MatOptionModule } from '@cdk/angular/material';
import { MatDividerModule } from '@cdk/angular/material';
import { MatFormFieldModule } from '@cdk/angular/material';
import { MatIconModule } from '@cdk/angular/material';
import { MatRadioModule } from '@cdk/angular/material';
import { MatSelectModule } from '@cdk/angular/material';
import { MatSlideToggleModule } from '@cdk/angular/material';

import { FuseDirectivesModule } from '@fuse/directives/directives';
import { FuseMaterialColorPickerModule } from '@fuse/components/material-color-picker/material-color-picker.module';
import { FuseSidebarModule } from '@fuse/components/sidebar/sidebar.module';

import { FuseThemeOptionsComponent } from '@fuse/components/theme-options/theme-options.component';

@NgModule({
    declarations: [
        FuseThemeOptionsComponent
    ],
    imports     : [
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

        FuseDirectivesModule,
        FuseMaterialColorPickerModule,
        FuseSidebarModule
    ],
    exports     : [
        FuseThemeOptionsComponent
    ]
})
export class FuseThemeOptionsModule
{
}
