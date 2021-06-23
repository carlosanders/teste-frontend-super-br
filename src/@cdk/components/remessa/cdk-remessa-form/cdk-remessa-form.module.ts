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
    MatSlideToggleModule,
    MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkRemessaFormComponent} from './cdk-remessa-form.component';
import {CdkProcessoAutocompleteModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridsearchModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-gridsearch/cdk-processo-gridsearch.module';
import {ProcessoService} from '@cdk/services/processo.service';
import {CdkPessoaAutocompleteModule} from '../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {PessoaService} from '@cdk/services/pessoa.service';
import {SetorService} from '@cdk/services/setor.service';
import {CdkSetorTreeModule} from '../../setor/cdk-setor-tree/cdk-setor-tree.module';
import {CdkSetorTreeService} from '../../setor/cdk-setor-tree/services/cdk-setor-tree.service';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {CdkPessoaGridsearchModule} from "../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-gridsearch/cdk-pessoa-gridsearch.module";

@NgModule({
    declarations: [
        CdkRemessaFormComponent,
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
        MatTooltipModule,

        CdkProcessoAutocompleteModule,
        CdkProcessoGridsearchModule,
        CdkPessoaAutocompleteModule,
        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule,

        CdkSharedModule,
        CdkSetorTreeModule,
        NgxUpperCaseDirectiveModule,
        MatCardModule,
        MatRadioModule,
        CdkPessoaGridsearchModule,
    ],
    providers: [
        ProcessoService,
        PessoaService,
        SetorService,
        CdkSetorTreeService
    ],
    exports: [
        CdkRemessaFormComponent
    ]
})
export class CdkRemessaFormModule {
}
