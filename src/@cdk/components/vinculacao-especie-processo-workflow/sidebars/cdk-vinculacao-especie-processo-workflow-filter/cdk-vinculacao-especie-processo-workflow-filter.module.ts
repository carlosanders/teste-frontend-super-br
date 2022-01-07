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
import {VinculacaoEspecieProcessoWorkflowService} from '@cdk/services/vinculacao-especie-processo-workflow.service';
import {CdkVinculacaoEspecieProcessoWorkflowFilterComponent} from './cdk-vinculacao-especie-processo-workflow-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';
import {
    CdkEspecieProcessoAutocompleteModule
} from '@cdk/components/especie-processo/cdk-especie-processo-autocomplete/cdk-especie-processo-autocomplete.module';
import {
    CdkWorkflowAutocompleteModule
} from '@cdk/components/workflow/cdk-workflow-autocomplete/cdk-workflow-autocomplete.module';

@NgModule({
    declarations: [
        CdkVinculacaoEspecieProcessoWorkflowFilterComponent,
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
        CdkEspecieProcessoAutocompleteModule,
        CdkWorkflowAutocompleteModule,
        MatMenuModule,
        CdkDateFilterModule,
    ],
    providers: [
        VinculacaoEspecieProcessoWorkflowService,
    ],
    exports: [
        CdkVinculacaoEspecieProcessoWorkflowFilterComponent,
        CdkVinculacaoEspecieProcessoWorkflowFilterComponent
    ]
})
export class CdkVinculacaoEspecieProcessoWorkflowFilterModule {
}
