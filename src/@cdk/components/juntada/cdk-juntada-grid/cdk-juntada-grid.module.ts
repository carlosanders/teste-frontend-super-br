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
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {JuntadaService} from '@cdk/services/juntada.service';
import {CdkJuntadaGridComponent} from './cdk-juntada-grid.component';
import {CdkJuntadaGridFilterModule} from './cdk-juntada-grid-filter/cdk-juntada-grid-filter.module';

@NgModule({
    declarations: [
        CdkJuntadaGridComponent
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

        CdkJuntadaGridFilterModule,

        FuseSharedModule,
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
