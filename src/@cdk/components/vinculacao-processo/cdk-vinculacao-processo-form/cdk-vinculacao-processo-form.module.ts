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
import {CdkProcessoAutocompleteModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridsearchModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-gridsearch/cdk-processo-gridsearch.module';
import {ProcessoService} from '@cdk/services/processo.service';
import {ModalidadeVinculacaoProcessoService} from '@cdk/services/modalidade-vinculacao-processo.service';
import {CdkModalidadeVinculacaoProcessoGridsearchModule} from '../../modalidade-vinculacao-processo/cdk-modalidade-vinculacao-processo-autocomplete/cdk-modalidade-vinculacao-processo-gridsearch/cdk-modalidade-vinculacao-processo-gridsearch.module';
import {CdkModalidadeVinculacaoProcessoAutocompleteModule} from '../../modalidade-vinculacao-processo/cdk-modalidade-vinculacao-processo-autocomplete/cdk-modalidade-vinculacao-processo-autocomplete.module';
import {CdkVinculacaoProcessoFormComponent} from './cdk-vinculacao-processo-form.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';

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
        MatTooltipModule,

        CdkProcessoAutocompleteModule,
        CdkProcessoGridsearchModule,
        CdkModalidadeVinculacaoProcessoAutocompleteModule,
        CdkModalidadeVinculacaoProcessoGridsearchModule,

        CdkSharedModule,
        MatSlideToggleModule,
        NgxUpperCaseDirectiveModule,
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
