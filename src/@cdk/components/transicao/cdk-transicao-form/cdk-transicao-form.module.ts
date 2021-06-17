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
import {CdkTransicaoFormComponent} from './cdk-transicao-form.component';
import {CdkProcessoAutocompleteModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridsearchModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-gridsearch/cdk-processo-gridsearch.module';
import {ProcessoService} from '@cdk/services/processo.service';
import {CdkModalidadeTransicaoAutocompleteModule} from '../../modalidade-transicao/cdk-modalidade-transicao-autocomplete/cdk-modalidade-transicao-autocomplete.module';
import {CdkModalidadeTransicaoGridsearchModule} from '../../modalidade-transicao/cdk-modalidade-transicao-autocomplete/cdk-modalidade-transicao-gridsearch/cdk-modalidade-transicao-gridsearch.module';
import {ModalidadeTransicaoService} from '@cdk/services/modalidade-transicao.service';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';

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
        MatTooltipModule,

        NgxUpperCaseDirectiveModule,

        CdkProcessoAutocompleteModule,
        CdkProcessoGridsearchModule,
        CdkModalidadeTransicaoAutocompleteModule,
        CdkModalidadeTransicaoGridsearchModule,

        CdkSharedModule,
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
