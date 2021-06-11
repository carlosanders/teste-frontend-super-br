import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {TipoValidacaoWorkflowService} from '@cdk/services/tipo-validacao-workflow.service';
import {CdkTipoValidacaoWorkflowGridComponent} from './cdk-tipo-validacao-workflow-grid.component';
import {CdkTipoValidacaoWorkflowAutocompleteModule} from '@cdk/components/tipo-validacao-workflow/cdk-tipo-validacao-workflow-autocomplete/cdk-tipo-validacao-workflow-autocomplete.module';
import {CdkTipoValidacaoWorkflowFilterModule} from '../sidebars/cdk-tipo-validacao-workflow-filter/cdk-tipo-validacao-workflow-filter.module';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkGeneroProcessoAutocompleteModule} from '../../genero-processo/cdk-genero-processo-autocomplete/cdk-genero-processo-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';

@NgModule({
    declarations: [
        CdkTipoValidacaoWorkflowGridComponent,
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,

        CdkSharedModule,
        CdkSidebarModule,

        CdkTipoValidacaoWorkflowAutocompleteModule,
        CdkGeneroProcessoAutocompleteModule,
        CdkUsuarioAutocompleteModule,
        CdkTipoValidacaoWorkflowFilterModule,
        MatTooltipModule,
    ],
    providers: [
        TipoValidacaoWorkflowService,
    ],
    exports: [
        CdkTipoValidacaoWorkflowGridComponent
    ]
})
export class CdkTipoValidacaoWorkflowGridModule {
}
