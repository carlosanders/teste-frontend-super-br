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
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '../../index';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkTipoRelatorioGridComponent} from './cdk-tipo-relatorio-grid.component';
import {CdkSetorAutocompleteModule} from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkTipoRelatorioFilterModule} from '../sidebars/cdk-tipo-relatorio-filter/cdk-tipo-relatorio-filter.module';
import {TipoRelatorioService} from '@cdk/services/tipo-relatorio.service';

@NgModule({
    declarations: [
        CdkTipoRelatorioGridComponent,
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

        CdkSetorAutocompleteModule,
        CdkTipoRelatorioFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        TipoRelatorioService,
    ],
    exports: [
        CdkTipoRelatorioGridComponent
    ]
})
export class CdkTipoRelatorioGridModule {
}
