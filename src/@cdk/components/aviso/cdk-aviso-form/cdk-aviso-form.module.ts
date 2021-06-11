import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkAvisoFormComponent} from './cdk-aviso-form.component';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {EspecieTarefaService} from '../../../services/especie-tarefa.service';
import {FavoritoService} from '../../../services/favorito.service';
import {CdkEspecieTarefaAutocompleteModule} from '../../especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-autocomplete.module';
import {CdkModalidadeOrgaoCentralAutocompleteModule} from '../../modalidade-orgao-central/cdk-modalidade-orgao-central-autocomplete/cdk-modalidade-orgao-central-autocomplete.module';
import {CdkModalidadeOrgaoCentralGridsearchModule} from '../../modalidade-orgao-central/cdk-modalidade-orgao-central-autocomplete/cdk-modalidade-orgao-central-gridsearch/cdk-modalidade-orgao-central-gridsearch.module';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    declarations: [
        CdkAvisoFormComponent,
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
        NgxUpperCaseDirectiveModule,

        CdkSharedModule,
        CdkEspecieTarefaAutocompleteModule,
        CdkModalidadeOrgaoCentralAutocompleteModule,
        CdkModalidadeOrgaoCentralGridsearchModule,
        CdkSetorGridsearchModule,
        CdkSetorAutocompleteModule,
        MatSelectModule,
    ],
    providers: [
        EspecieTarefaService,
        FavoritoService
    ],
    exports: [
        CdkAvisoFormComponent
    ]
})
export class CdkAvisoFormModule {
}
