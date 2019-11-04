import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule, MatSlideToggleModule

} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {CdkTramitacaoFormComponent} from './cdk-tramitacao-form.component';
import {CdkProcessoAutocompleteModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridsearchModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-gridsearch/cdk-processo-gridsearch.module';
import {ProcessoService} from '@cdk/services/processo.service';
import {CdkPessoaAutocompleteModule} from '../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkPessoaGridsearchModule} from '../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-gridsearch/cdk-pessoa-gridsearch.module';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {PessoaService} from '@cdk/services/pessoa.service';
import {SetorService} from '@cdk/services/setor.service';

@NgModule({
    declarations: [
        CdkTramitacaoFormComponent,
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
        MatSlideToggleModule,

        CdkProcessoAutocompleteModule,
        CdkProcessoGridsearchModule,
        CdkPessoaAutocompleteModule,
        CdkPessoaGridsearchModule,
        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule,

        FuseSharedModule,
    ],
    providers: [
        ProcessoService,
        PessoaService,
        SetorService
    ],
    exports: [
        CdkTramitacaoFormComponent
    ]
})
export class CdkTramitacaoFormModule {
}
