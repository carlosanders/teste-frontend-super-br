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

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {CdkEtiquetaGridComponent} from './cdk-etiqueta-grid.component';
import {CdkEtiquetaGridFilterModule} from './cdk-etiqueta-grid-filter/cdk-etiqueta-grid-filter.module';
import {CdkEtiquetaMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkEtiquetaGridComponent,
        CdkEtiquetaMainSidebarComponent,
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
        FuseSidebarModule,
    ],
    providers: [],
    exports: [
        CdkEtiquetaGridComponent
    ]
})
export class CdkEtiquetaGridModule {
}
