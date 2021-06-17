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
    MatRadioModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CommonModule} from '@angular/common';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkModeloAutocompleteModule} from '../../../modelo/cdk-modelo-autocomplete/cdk-modelo-autocomplete.module';
import {CdkModeloGridsearchModule} from '../../../modelo/cdk-modelo-autocomplete/cdk-modelo-gridsearch/cdk-modelo-gridsearch.module';
import {RouterModule} from '@angular/router';
import {CdkTipoAcaoWorkflowTrigger002Component} from './cdk-tipo-acao-workflow-trigger-002.component';
import {CdkDistribuirTarefaFormModule} from '../../../distribuir-tarefa/cdk-distribuir-tarefa-form/cdk-distribuir-tarefa-form.module';

@NgModule({
    declarations: [
        CdkTipoAcaoWorkflowTrigger002Component,
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
        MatRadioModule,
        MatTooltipModule,
        RouterModule,
        CommonModule,
        CdkModeloAutocompleteModule,
        CdkModeloGridsearchModule,
        CdkDistribuirTarefaFormModule,
        CdkSharedModule
    ],
    exports: [
        CdkTipoAcaoWorkflowTrigger002Component
    ]
})
export class CdkTipoAcaoWorkflowTrigger002Module {
}
