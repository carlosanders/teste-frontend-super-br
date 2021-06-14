import {NgModule} from '@angular/core';
import {
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTooltipModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {CdkDateFilterComponent} from './cdk-date-filter.component';
import {MatDatetimepickerModule} from '@mat-datetimepicker/core';

@NgModule({
    declarations: [
        CdkDateFilterComponent
    ],
    imports: [
        PipesModule,

        CdkSharedModule,

        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatDatetimepickerModule
    ],
    exports: [
        CdkDateFilterComponent
    ]
})
export class CdkDateFilterModule {
}
