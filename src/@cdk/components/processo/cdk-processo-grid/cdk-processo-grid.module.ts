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
    MatTooltipModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
} from '@cdk/angular/material';

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {ProcessoService} from '@cdk/services/processo.service';
import {CdkProcessoGridComponent} from './cdk-processo-grid.component';
import {CdkProcessoAutocompleteModule} from '@cdk/components/processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridFilterModule} from '../sidebars/cdk-processo-grid-filter/cdk-processo-grid-filter.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CommonModule} from '@angular/common';
import {CdkChaveAcessoPluginModule} from '../../chave-acesso/cdk-chave-acesso-plugins/cdk-chave-acesso-plugin.module';

@NgModule({
    declarations: [
        CdkProcessoGridComponent,
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
        MatTooltipModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,

        CdkSharedModule,
        CdkSidebarModule,

        CdkProcessoAutocompleteModule,
        CdkProcessoGridFilterModule,
        CdkChaveAcessoPluginModule,

        CommonModule,
    ],
    providers: [
        ProcessoService,
    ],
    exports: [
        CdkProcessoGridComponent
    ]
})
export class CdkProcessoGridModule {
}
