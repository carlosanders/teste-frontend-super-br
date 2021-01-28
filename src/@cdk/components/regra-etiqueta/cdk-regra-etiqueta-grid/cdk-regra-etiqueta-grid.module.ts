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

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkRegraEtiquetaGridComponent} from './cdk-regra-etiqueta-grid.component';
import {CdkRegraEtiquetaFilterModule} from '../sidebars/cdk-regra-etiqueta-filter/cdk-regra-etiqueta-filter.module';
import {CdkSidebarModule} from '../..';

@NgModule({
    declarations: [
        CdkRegraEtiquetaGridComponent,
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
        MatSelectModule,
        CdkRegraEtiquetaFilterModule,
        CdkSidebarModule,
        CdkSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkRegraEtiquetaGridComponent
    ]
})
export class CdkRegraEtiquetaGridModule {
}
