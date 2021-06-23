import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkVinculacaoDocumentoFormComponent} from './cdk-vinculacao-documento-form.component';
import {ModalidadeVinculacaoDocumentoService} from '@cdk/services/modalidade-vinculacao-documento.service';
import {CdkModalidadeVinculacaoDocumentoGridsearchModule} from '../../modalidade-vinculacao-documento/cdk-modalidade-vinculacao-documento-autocomplete/cdk-modalidade-vinculacao-documento-gridsearch/cdk-modalidade-vinculacao-documento-gridsearch.module';
import {CdkModalidadeVinculacaoDocumentoAutocompleteModule} from '../../modalidade-vinculacao-documento/cdk-modalidade-vinculacao-documento-autocomplete/cdk-modalidade-vinculacao-documento-autocomplete.module';
import {CdkDocumentoGridsearchModule} from '../../documento/cdk-documento-autocomplete/cdk-documento-gridsearch/cdk-documento-gridsearch.module';
import {DocumentoService} from '@cdk/services/documento.service';
import {CdkDocumentoAutocompleteModule} from '../../documento/cdk-documento-autocomplete/cdk-documento-autocomplete.module';

@NgModule({
    declarations: [
        CdkVinculacaoDocumentoFormComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,

        CdkDocumentoAutocompleteModule,
        CdkDocumentoGridsearchModule,
        CdkModalidadeVinculacaoDocumentoAutocompleteModule,
        CdkModalidadeVinculacaoDocumentoGridsearchModule,

        CdkSharedModule,
    ],
    providers: [
        DocumentoService,
        ModalidadeVinculacaoDocumentoService
    ],
    exports: [
        CdkVinculacaoDocumentoFormComponent
    ]
})
export class CdkVinculacaoDocumentoFormModule {
}
