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
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {CdkEtiquetaGridComponent} from './cdk-etiqueta-grid.component';
import {CdkEtiquetaGridFilterModule} from './cdk-etiqueta-grid-filter/cdk-etiqueta-grid-filter.module';

@NgModule({
    declarations: [
        CdkEtiquetaGridComponent
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

        CdkEtiquetaGridFilterModule,

        FuseSharedModule,
    ],
    providers: [],
    exports: [
        CdkEtiquetaGridComponent
    ]
})
export class CdkEtiquetaGridModule {
}
