import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@cdk/angular/material';
import { MatIconModule } from '@cdk/angular/material';
import { MatMenuModule } from '@cdk/angular/material';
import { MatTooltipModule } from '@cdk/angular/material';

import { FusePipesModule } from '@fuse/pipes/pipes.module';

import { FuseMaterialColorPickerComponent } from '@fuse/components/material-color-picker/material-color-picker.component';

@NgModule({
    declarations: [
        FuseMaterialColorPickerComponent
    ],
    imports: [
        CommonModule,

        FlexLayoutModule,

        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,

        FusePipesModule
    ],
    exports: [
        FuseMaterialColorPickerComponent
    ],
})
export class FuseMaterialColorPickerModule
{
}
