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
    MatSelectModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkEtiquetaGridComponent} from './cdk-etiqueta-grid.component';
import {CdkEtiquetaFilterModule} from '../sidebars/cdk-etiqueta-filter/cdk-etiqueta-filter.module';

@NgModule({
    declarations: [
        CdkEtiquetaGridComponent,
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

        CdkEtiquetaFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [],
    exports: [
        CdkEtiquetaGridComponent
    ]
})
export class CdkEtiquetaGridModule {
}
