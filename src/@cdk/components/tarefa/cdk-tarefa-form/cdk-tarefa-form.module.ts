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
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {CdkTarefaFormComponent} from './cdk-tarefa-form.component';
import {CdkEspecieTarefaAutocompleteModule} from '@cdk/components/especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-autocomplete.module';
import {CdkEspecieTarefaGridsearchModule} from '@cdk/components/especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-gridsearch/cdk-especie-tarefa-gridsearch.module';
import {CdkUsuarioAutocompleteModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkUsuarioGridsearchModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-gridsearch/cdk-usuario-gridsearch.module';
import {CdkProcessoAutocompleteModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridsearchModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-gridsearch/cdk-processo-gridsearch.module';
import {UsuarioService} from '@cdk/services/usuario.service';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {ProcessoService} from '@cdk/services/processo.service';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {CdkProcessoGridModule} from '../../processo/cdk-processo-grid/cdk-processo-grid.module';
import {FavoritoService} from '@cdk/services/favorito.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {CdkLogentryGridModule} from '@cdk/components/logentry/cdk-logentry-grid/cdk-logentry-grid.module';
import {CdkLogentryGridsearchModule} from '@cdk/components/logentry/cdk-logentry-grid/cdk-logentry-gridsearch/cdk-logentry-gridsearch.module';
import {CdkBlocoResponsaveisGridModule} from '../cdk-bloco-responsaveis-grid/cdk-bloco-responsaveis-grid.module';
import {MatSliderModule} from '@angular/material/slider';
import {CdkSetorTreeModule} from '../../setor/cdk-setor-tree/cdk-setor-tree.module';
import {CdkSetorTreeService} from '../../setor/cdk-setor-tree/services/cdk-setor-tree.service';
import {MatCardModule} from '@angular/material/card';
import {CdkGrupoContatoAutocompleteModule} from '../../grupo-contato/cdk-grupo-contato-autocomplete/cdk-grupo-contato-autocomplete.module';
import {CdkGrupoContatoGridsearchModule} from '../../grupo-contato/cdk-grupo-contato-autocomplete/cdk-grupo-contato-gridsearch/cdk-grupo-contato-gridsearch.module';
import {MatMenuModule} from '@angular/material/menu';
import {CdkLotacaoAutocompleteModule} from '../../lotacao/cdk-lotacao-autocomplete/cdk-lotacao-autocomplete.module';
import {CdkLotacaoGridsearchModule} from '../../lotacao/cdk-lotacao-autocomplete/cdk-lotacao-gridsearch/cdk-lotacao-gridsearch.module';
import {CdkWorkflowAutocompleteModule} from '../../workflow/cdk-workflow-autocomplete/cdk-workflow-autocomplete.module';
import {
    CdkWorkflowGridsearchModule
} from '../../workflow/cdk-workflow-autocomplete/cdk-workflow-gridsearch/cdk-workflow-gridsearch.module';
import {
    CdkProcessoAutocompleteActionFilterModule
} from '../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete-filter/cdk-processo-autocomplete-action-filter.module';

@NgModule({
    declarations: [
        CdkTarefaFormComponent,
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
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,
        MatSlideToggleModule,
        MatTooltipModule,

        NgxUpperCaseDirectiveModule,

        CdkEspecieTarefaAutocompleteModule,
        CdkEspecieTarefaGridsearchModule,
        CdkUsuarioAutocompleteModule,
        CdkUsuarioGridsearchModule,
        CdkProcessoAutocompleteModule,
        CdkProcessoGridsearchModule,
        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule,
        CdkProcessoGridModule,

        CdkLogentryGridModule,
        CdkLogentryGridsearchModule,
        CdkBlocoResponsaveisGridModule,

        CdkGrupoContatoAutocompleteModule,
        CdkGrupoContatoGridsearchModule,

        CdkSharedModule,
        MatSliderModule,
        CdkSetorTreeModule,
        MatCardModule,
        MatMenuModule,
        CdkLotacaoAutocompleteModule,
        CdkLotacaoGridsearchModule,
        CdkWorkflowAutocompleteModule,
        CdkWorkflowGridsearchModule,
        CdkProcessoAutocompleteActionFilterModule,
    ],
    providers: [
        EspecieTarefaService,
        UsuarioService,
        ProcessoService,
        FavoritoService,
        LoginService,
        CdkSetorTreeService
    ],
    exports: [
        CdkTarefaFormComponent
    ]
})
export class CdkTarefaFormModule {
}
