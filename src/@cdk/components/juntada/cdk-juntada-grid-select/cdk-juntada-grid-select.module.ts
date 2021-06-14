import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
} from '@cdk/angular/material';
import {JuntadaService} from '@cdk/services/juntada.service';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkJuntadaFilterModule} from '../sidebars/cdk-juntada-filter/cdk-juntada-filter.module';
import {CdkJuntadaGridSelectComponent} from './cdk-juntada-grid-select.component';
import {CdkJuntadaGridModule} from '../cdk-juntada-grid/cdk-juntada-grid.module';

@NgModule({
    declarations: [
        CdkJuntadaGridSelectComponent,
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
        MatDividerModule,
        MatCardModule,

        CdkJuntadaFilterModule,
        CdkSharedModule,
        CdkSidebarModule,
        CdkJuntadaGridModule,
    ],
    providers: [
        JuntadaService
    ],
    exports: [
        CdkJuntadaGridSelectComponent
    ]
})
export class CdkJuntadaGridSelectModule {
}
