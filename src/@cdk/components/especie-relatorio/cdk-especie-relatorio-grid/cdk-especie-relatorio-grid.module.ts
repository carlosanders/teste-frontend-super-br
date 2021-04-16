import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
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

import {CdkEspecieRelatorioGridComponent} from './cdk-especie-relatorio-grid.component';
import {CdkEspecieRelatorioAutocompleteModule} from '@cdk/components/especie-relatorio/cdk-especie-relatorio-autocomplete/cdk-especie-relatorio-autocomplete.module';
import {CdkEspecieRelatorioFilterModule} from '../siderbars/cdk-especie-relatorio-filter/cdk-especie-relatorio-filter.module';
import {EspecieRelatorioService} from '../../../services/especie-relatorio.service';

@NgModule({
    declarations: [
        CdkEspecieRelatorioGridComponent,
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
        MatTooltipModule,
        MatSelectModule,

        CdkEspecieRelatorioAutocompleteModule,
        CdkEspecieRelatorioFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        EspecieRelatorioService
    ],
    exports: [
        CdkEspecieRelatorioGridComponent
    ]
})
export class CdkEspecieRelatorioGridModule {
}
