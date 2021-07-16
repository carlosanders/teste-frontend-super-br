import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {WorkflowService} from '@cdk/services/workflow.service';
import {CdkWorkflowFilterComponent} from './cdk-workflow-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkGeneroAtividadeAutocompleteModule} from '../../../genero-atividade/cdk-genero-atividade-autocomplete/cdk-genero-atividade-autocomplete.module';
import {CdkEspecieProcessoAutocompleteModule} from '../../../especie-processo/cdk-especie-processo-autocomplete/cdk-especie-processo-autocomplete.module';
import {CdkEspecieTarefaAutocompleteModule} from '../../../especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-autocomplete.module';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';

@NgModule({
    declarations: [
        CdkWorkflowFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,
        MatCheckboxModule,

        CdkSharedModule,

        CdkUsuarioAutocompleteModule,
        CdkGeneroAtividadeAutocompleteModule,
        CdkEspecieProcessoAutocompleteModule,
        CdkEspecieTarefaAutocompleteModule,
        MatMenuModule,
        CdkDateFilterModule,
    ],
    providers: [
        WorkflowService,
    ],
    exports: [
        CdkWorkflowFilterComponent
    ]
})
export class CdkWorkflowFilterModule {
}
