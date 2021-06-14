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

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {ProcessoService} from '@cdk/services/processo.service';
import {CdkProcessoGridComponent} from './cdk-processo-grid.component';
import {CdkProcessoAutocompleteModule} from '@cdk/components/processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoFilterModule} from '../sidebars/cdk-processo-filter/cdk-processo-filter.module';
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
        CdkProcessoFilterModule,
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
