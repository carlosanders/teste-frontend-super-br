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
import {TipoAcaoWorkflowService} from '@cdk/services/tipo-acao-workflow.service';
import {CdkTipoAcaoWorkflowGridComponent} from './cdk-tipo-acao-workflow-grid.component';
import {CdkTipoAcaoWorkflowAutocompleteModule} from '@cdk/components/tipo-acao-workflow/cdk-tipo-acao-workflow-autocomplete/cdk-tipo-acao-workflow-autocomplete.module';
import {CdkTipoAcaoWorkflowFilterModule} from '../sidebars/cdk-tipo-acao-workflow-filter/cdk-tipo-acao-workflow-filter.module';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkGeneroProcessoAutocompleteModule} from '../../genero-processo/cdk-genero-processo-autocomplete/cdk-genero-processo-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';

@NgModule({
    declarations: [
        CdkTipoAcaoWorkflowGridComponent,
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

        CdkTipoAcaoWorkflowAutocompleteModule,
        CdkGeneroProcessoAutocompleteModule,
        CdkUsuarioAutocompleteModule,
        CdkTipoAcaoWorkflowFilterModule,
        MatTooltipModule,
    ],
    providers: [
        TipoAcaoWorkflowService,
    ],
    exports: [
        CdkTipoAcaoWorkflowGridComponent
    ]
})
export class CdkTipoAcaoWorkflowGridModule {
}
