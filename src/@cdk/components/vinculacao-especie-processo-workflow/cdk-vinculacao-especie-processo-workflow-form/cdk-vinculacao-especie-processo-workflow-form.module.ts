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
import {CdkVinculacaoEspecieProcessoWorkflowFormComponent} from './cdk-vinculacao-especie-processo-workflow-form.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {VinculacaoEspecieProcessoWorkflowService} from '../../../services/vinculacao-especie-processo-workflow.service';
import {CdkWorkflowAutocompleteModule} from '../../workflow/cdk-workflow-autocomplete/cdk-workflow-autocomplete.module';
import {
    CdkWorkflowGridsearchModule
} from '../../workflow/cdk-workflow-autocomplete/cdk-workflow-gridsearch/cdk-workflow-gridsearch.module';
import {
    CdkEspecieProcessoGridsearchModule
} from '../../especie-processo/cdk-especie-processo-autocomplete/cdk-especie-processo-gridsearch/cdk-especie-processo-gridsearch.module';
import {
    CdkEspecieProcessoAutocompleteModule
} from '../../especie-processo/cdk-especie-processo-autocomplete/cdk-especie-processo-autocomplete.module';

@NgModule({
    declarations: [
        CdkVinculacaoEspecieProcessoWorkflowFormComponent,
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
        CdkEspecieProcessoAutocompleteModule,
        CdkEspecieProcessoGridsearchModule,
        CdkWorkflowAutocompleteModule,
        CdkWorkflowGridsearchModule,
        CdkSharedModule,
        MatSlideToggleModule,
        NgxUpperCaseDirectiveModule,
    ],
    providers: [
        VinculacaoEspecieProcessoWorkflowService
    ],
    exports: [
        CdkVinculacaoEspecieProcessoWorkflowFormComponent
    ]
})
export class CdkVinculacaoEspecieProcessoWorkflowFormModule {
}
