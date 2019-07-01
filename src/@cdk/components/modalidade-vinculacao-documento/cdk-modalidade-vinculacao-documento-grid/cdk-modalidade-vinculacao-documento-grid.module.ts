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
import { ModalidadeVinculacaoDocumentoService } from '@cdk/services/modalidade-vinculacao-documento.service';
import { CdkModalidadeVinculacaoDocumentoGridComponent} from './cdk-modalidade-vinculacao-documento-grid.component';
import { CdkModalidadeVinculacaoDocumentoAutocompleteModule } from '@cdk/components/modalidade-vinculacao-documento/cdk-modalidade-vinculacao-documento-autocomplete/cdk-modalidade-vinculacao-documento-autocomplete.module';
import {CdkModalidadeVinculacaoDocumentoGridFilterModule} from './cdk-modalidade-vinculacao-documento-grid-filter/cdk-modalidade-vinculacao-documento-grid-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeVinculacaoDocumentoGridComponent
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

        CdkModalidadeVinculacaoDocumentoGridFilterModule,
        CdkModalidadeVinculacaoDocumentoAutocompleteModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeVinculacaoDocumentoService,
    ],
    exports: [
        CdkModalidadeVinculacaoDocumentoGridComponent
    ]
})
export class CdkModalidadeVinculacaoDocumentoGridModule {
}
