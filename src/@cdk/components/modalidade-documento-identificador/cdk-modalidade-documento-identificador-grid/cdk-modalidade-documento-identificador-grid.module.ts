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
import {ModalidadeDocumentoIdentificadorService} from '@cdk/services/modalidade-documento-identificador.service';
import {CdkModalidadeDocumentoIdentificadorGridComponent} from './cdk-modalidade-documento-identificador-grid.component';
import {CdkModalidadeDocumentoIdentificadorAutocompleteModule} from '@cdk/components/modalidade-documento-identificador/cdk-modalidade-documento-identificador-autocomplete/cdk-modalidade-documento-identificador-autocomplete.module';
import {CdkModalidadeDocumentoIdentificadorGridFilterModule} from './cdk-modalidade-documento-identificador-grid-filter/cdk-modalidade-documento-identificador-grid-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeDocumentoIdentificadorGridComponent
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

        CdkModalidadeDocumentoIdentificadorAutocompleteModule,
        CdkModalidadeDocumentoIdentificadorGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeDocumentoIdentificadorService,
    ],
    exports: [
        CdkModalidadeDocumentoIdentificadorGridComponent
    ]
})
export class CdkModalidadeDocumentoIdentificadorGridModule {
}
