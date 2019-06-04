import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule

} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {CdkProcessoAutocompleteModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridsearchModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-gridsearch/cdk-processo-gridsearch.module';
import {ProcessoService} from '../../../services/processo.service';
import {ModalidadeVinculacaoProcessoService} from '../../../services/modalidade-vinculacao-processo.service';
import {CdkModalidadeVinculacaoProcessoGridsearchModule} from '../../modalidade-vinculacao-processo/cdk-modalidade-vinculacao-processo-autocomplete/cdk-modalidade-vinculacao-processo-gridsearch/cdk-modalidade-vinculacao-processo-gridsearch.module';
import {CdkModalidadeVinculacaoProcessoAutocompleteModule} from '../../modalidade-vinculacao-processo/cdk-modalidade-vinculacao-processo-autocomplete/cdk-modalidade-vinculacao-processo-autocomplete.module';
import {CdkVinculacaoProcessoFormComponent} from './cdk-vinculacao-processo-form.component';

@NgModule({
    declarations: [
        CdkVinculacaoProcessoFormComponent,
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

        CdkProcessoAutocompleteModule,
        CdkProcessoGridsearchModule,
        CdkModalidadeVinculacaoProcessoAutocompleteModule,
        CdkModalidadeVinculacaoProcessoGridsearchModule,

        FuseSharedModule,
    ],
    providers: [
        ProcessoService,
        ModalidadeVinculacaoProcessoService
    ],
    exports: [
        CdkVinculacaoProcessoFormComponent
    ]
})
export class CdkVinculacaoProcessoFormModule {
}
