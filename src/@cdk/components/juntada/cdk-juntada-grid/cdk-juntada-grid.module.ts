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
import {JuntadaService} from '@cdk/services/juntada.service';
import {CdkJuntadaGridComponent} from './cdk-juntada-grid.component';
import {CdkJuntadaFilterModule} from '../sidebars/cdk-juntada-filter/cdk-juntada-filter.module';

@NgModule({
    declarations: [
        CdkJuntadaGridComponent,
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

        CdkJuntadaFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        JuntadaService,
    ],
    exports: [
        CdkJuntadaGridComponent
    ]
})
export class CdkJuntadaGridModule {
}
