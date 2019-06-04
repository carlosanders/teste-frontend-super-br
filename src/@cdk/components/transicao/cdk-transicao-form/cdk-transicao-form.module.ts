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
import {CdkTransicaoFormComponent} from './cdk-transicao-form.component';
import {CdkProcessoAutocompleteModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridsearchModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-gridsearch/cdk-processo-gridsearch.module';
import {ProcessoService} from '../../../services/processo.service';
import {CdkModalidadeTransicaoAutocompleteModule} from '../../modalidade-transicao/cdk-modalidade-transicao-autocomplete/cdk-modalidade-transicao-autocomplete.module';
import {CdkModalidadeTransicaoGridsearchModule} from '../../modalidade-transicao/cdk-modalidade-transicao-autocomplete/cdk-modalidade-transicao-gridsearch/cdk-modalidade-transicao-gridsearch.module';
import {ModalidadeTransicaoService} from '../../../services/modalidade-transicao.service';

@NgModule({
    declarations: [
        CdkTransicaoFormComponent,
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
        CdkModalidadeTransicaoAutocompleteModule,
        CdkModalidadeTransicaoGridsearchModule,

        FuseSharedModule,
    ],
    providers: [
        ProcessoService,
        ModalidadeTransicaoService
    ],
    exports: [
        CdkTransicaoFormComponent
    ]
})
export class CdkTransicaoFormModule {
}
