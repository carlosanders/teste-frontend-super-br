import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSidebarModule} from '@cdk/components';
import {CdkSharedModule} from '@cdk/shared.module';
import {NumeroUnicoDocumentoService} from '@cdk/services/numero-unico-documento.service';
import {CdkNumeroUnicoDocumentoGridComponent} from './cdk-numero-unico-documento-grid.component';
import {CdkNumeroUnicoDocumentoFilterModule} from '../sidebars/cdk-numero-unico-documento-filter/cdk-numero-unico-documento-filter.module';

@NgModule({
    declarations: [
        CdkNumeroUnicoDocumentoGridComponent,

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

        CdkNumeroUnicoDocumentoFilterModule,

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
