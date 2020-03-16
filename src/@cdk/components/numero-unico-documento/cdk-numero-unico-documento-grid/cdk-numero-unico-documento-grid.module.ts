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

import {CdkSidebarModule} from '@cdk/components';
import {CdkSharedModule} from '@cdk/shared.module';
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

        CdkSharedModule,
        CdkSidebarModule,
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