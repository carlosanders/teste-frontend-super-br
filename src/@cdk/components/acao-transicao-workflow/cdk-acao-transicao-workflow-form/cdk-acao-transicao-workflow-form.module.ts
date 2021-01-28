import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatRadioModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkAcaoTransicaoWorkflowFormComponent} from './cdk-acao-transicao-workflow-form.component';
import {CdkModeloAutocompleteModule} from '../../modelo/cdk-modelo-autocomplete/cdk-modelo-autocomplete.module';
import {CdkModeloGridsearchModule} from '../../modelo/cdk-modelo-autocomplete/cdk-modelo-gridsearch/cdk-modelo-gridsearch.module';

@NgModule({
    declarations: [
        CdkAcaoTransicaoWorkflowFormComponent,
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

        CdkModeloAutocompleteModule,
        CdkModeloGridsearchModule,

        CdkSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkAcaoTransicaoWorkflowFormComponent
    ]
})
export class CdkAcaoTransicaoWorkflowFormModule {
}
