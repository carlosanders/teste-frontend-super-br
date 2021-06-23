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
import {CdkAcaoTrigger002Component} from './cdk-acao-trigger-002.component';
import {CdkDistribuirTarefaFormModule} from '../../../distribuir-tarefa/cdk-distribuir-tarefa-form/cdk-distribuir-tarefa-form.module';

@NgModule({
    declarations: [
        CdkAcaoTrigger002Component,
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

        CdkSharedModule,

    ],
    exports: [
        CdkAcaoTrigger002Component
    ]
})
export class CdkAcaoTrigger002Module {
}
