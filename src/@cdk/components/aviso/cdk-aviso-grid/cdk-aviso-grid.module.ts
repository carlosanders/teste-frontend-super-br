import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatSelectModule,
} from '@cdk/angular/material';

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkAvisoGridComponent} from './cdk-aviso-grid.component';
import {CdkAvisoFilterModule} from '../sidebars/cdk-aviso-filter/cdk-aviso-filter.module';

@NgModule({
    declarations: [
        CdkAvisoGridComponent,
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,

        CdkAvisoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [],
    exports: [
        CdkAvisoGridComponent
    ]
})
export class CdkAvisoGridModule {
}
