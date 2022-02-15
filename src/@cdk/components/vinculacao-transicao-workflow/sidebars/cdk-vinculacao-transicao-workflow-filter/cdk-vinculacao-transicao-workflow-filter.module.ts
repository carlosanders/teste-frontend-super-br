import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {VinculacaoTransicaoWorkflowService} from '@cdk/services/vinculacao-transicao-workflow.service';
import {CdkVinculacaoTransicaoWorkflowFilterComponent} from './cdk-vinculacao-transicao-workflow-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';
import {
    CdkWorkflowAutocompleteModule
} from '@cdk/components/workflow/cdk-workflow-autocomplete/cdk-workflow-autocomplete.module';
import {
    CdkTransicaoWorkflowAutocompleteModule
} from '@cdk/components/transicao-workflow/cdk-transicao-workflow-autocomplete/cdk-transicao-workflow-autocomplete.module';

@NgModule({
    declarations: [
        CdkVinculacaoTransicaoWorkflowFilterComponent,
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
        CdkSharedModule,
        CdkUsuarioAutocompleteModule,
        CdkTransicaoWorkflowAutocompleteModule,
        CdkWorkflowAutocompleteModule,
        MatMenuModule,
        CdkDateFilterModule,
    ],
    providers: [
        VinculacaoTransicaoWorkflowService,
    ],
    exports: [
        CdkVinculacaoTransicaoWorkflowFilterComponent,
        CdkVinculacaoTransicaoWorkflowFilterComponent
    ]
})
export class CdkVinculacaoTransicaoWorkflowFilterModule {
}
