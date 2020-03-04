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
import {CdkJuntadaGridFilterModule} from './cdk-juntada-grid-filter/cdk-juntada-grid-filter.module';
import {CdkJuntadaMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkJuntadaGridComponent,
        CdkJuntadaMainSidebarComponent,
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
