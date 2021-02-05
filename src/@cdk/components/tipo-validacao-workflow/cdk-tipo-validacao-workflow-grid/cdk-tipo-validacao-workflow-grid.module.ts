import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule, MatTooltipModule,
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {TipoValidacaoWorkflowService} from '@cdk/services/tipo-validacao-workflow.service';
import {CdkTipoValidacaoWorkflowGridComponent} from './cdk-tipo-validacao-workflow-grid.component';
import {CdkTipoValidacaoWorkflowAutocompleteModule} from '@cdk/components/tipo-validacao-workflow/cdk-tipo-validacao-workflow-autocomplete/cdk-tipo-validacao-workflow-autocomplete.module';
import { CdkTipoValidacaoWorkflowFilterComponent } from './../sidebars/cdk-tipo-validacao-workflow-filter/cdk-tipo-validacao-workflow-filter.component';
import {CdkSidebarModule} from '@cdk/components/index'; 
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
        CdkUsuarioAutocompleteModule,
        CdkTipoValidacaoWorkflowFilterComponent,
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
