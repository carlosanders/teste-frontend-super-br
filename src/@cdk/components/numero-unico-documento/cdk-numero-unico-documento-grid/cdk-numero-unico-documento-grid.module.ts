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

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {NumeroUnicoDocumentoService} from '@cdk/services/numero-unico-documento.service';
import {CdkNumeroUnicoDocumentoGridComponent} from './cdk-numero-unico-documento-grid.component';
import {CdkNumeroUnicoDocumentoGridFilterModule} from './cdk-numero-unico-documento-grid-filter/cdk-numero-unico-documento-grid-filter.module';
import {CdkNumeroUnicoDocumentoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkNumeroUnicoDocumentoGridComponent,
        CdkNumeroUnicoDocumentoMainSidebarComponent,
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

        CdkNumeroUnicoDocumentoGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        NumeroUnicoDocumentoService,
    ],
    exports: [
        CdkNumeroUnicoDocumentoGridComponent
    ]
})
export class CdkNumeroUnicoDocumentoGridModule {
}
