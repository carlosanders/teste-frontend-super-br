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
} from '@cdk/angular/material';

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';

import {CdkEspecieRelatorioGridComponent} from './cdk-especie-relatorio-grid.component';
import {CdkEspecieRelatorioAutocompleteModule} from '@cdk/components/especie-relatorio/cdk-especie-relatorio-autocomplete/cdk-especie-relatorio-autocomplete.module';
import {CdkEspecieRelatorioGridFilterModule} from './cdk-especie-relatorio-grid-filter/cdk-especie-relatorio-grid-filter.module';
import {CdkEspecieRelatorioMainSidebarComponent} from './sidebars/main/main.component';
import {EspecieRelatorioService} from '../../../services/especie-relatorio.service';

@NgModule({
    declarations: [
        CdkEspecieRelatorioGridComponent,
        CdkEspecieRelatorioMainSidebarComponent,
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
        CdkEspecieRelatorioGridFilterModule,

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
