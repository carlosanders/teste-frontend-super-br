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
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeDocumentoIdentificadorService } from '@cdk/services/modalidade-documento-identificador.service';
import { CdkModalidadeDocumentoIdentificadorGridComponent} from './cdk-modalidade-documento-identificador-grid.component';
import { CdkModalidadeDocumentoIdentificadorGridFilterComponent } from './cdk-modalidade-documento-identificador-grid-filter/cdk-modalidade-documento-identificador-grid-filter.component';
import { CdkModalidadeDocumentoIdentificadorAutocompleteModule } from '@cdk/components/modalidade-documento-identificador/cdk-modalidade-documento-identificador-autocomplete/cdk-modalidade-documento-identificador-autocomplete.module';

@NgModule({
    declarations: [
        CdkModalidadeDocumentoIdentificadorGridComponent,
        CdkModalidadeDocumentoIdentificadorGridFilterComponent
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

        CdkModalidadeDocumentoIdentificadorAutocompleteModule,

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
