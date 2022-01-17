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
import {CdkVinculacaoTransicaoWorkflowFormComponent} from './cdk-vinculacao-transicao-workflow-form.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {VinculacaoTransicaoWorkflowService} from '../../../services/vinculacao-transicao-workflow.service';
import {CdkWorkflowAutocompleteModule} from '@cdk/components/workflow/cdk-workflow-autocomplete/cdk-workflow-autocomplete.module';
import {
    CdkWorkflowGridsearchModule
} from '@cdk/components/workflow/cdk-workflow-autocomplete/cdk-workflow-gridsearch/cdk-workflow-gridsearch.module';
import {
    CdkTransicaoWorkflowAutocompleteModule
} from '@cdk/components/transicao-workflow/cdk-transicao-workflow-autocomplete/cdk-transicao-workflow-autocomplete.module';
import {
    CdkTransicaoWorkflowGridsearchModule
} from '../../transicao-workflow/cdk-transicao-workflow-autocomplete/cdk-transicao-workflow-gridsearch/cdk-transicao-workflow-gridsearch.module';

@NgModule({
    declarations: [
        CdkVinculacaoTransicaoWorkflowFormComponent,
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
        CdkTransicaoWorkflowAutocompleteModule,
        CdkWorkflowAutocompleteModule,
        CdkWorkflowGridsearchModule,
        CdkSharedModule,
        MatSlideToggleModule,
        NgxUpperCaseDirectiveModule,
        CdkTransicaoWorkflowGridsearchModule,
    ],
    providers: [
        VinculacaoTransicaoWorkflowService
    ],
    exports: [
        CdkVinculacaoTransicaoWorkflowFormComponent
    ]
})
export class CdkVinculacaoTransicaoWorkflowFormModule {
}
