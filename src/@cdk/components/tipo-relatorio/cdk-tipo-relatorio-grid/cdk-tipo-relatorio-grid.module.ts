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
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {TipoRelatorioService} from '@cdk/services/tipo-relatorio.service';
import {CdkTipoRelatorioGridComponent} from './cdk-tipo-relatorio-grid.component';
import {CdkTipoRelatorioAutocompleteModule} from '@cdk/components/tipo-relatorio/cdk-tipo-relatorio-autocomplete/cdk-tipo-relatorio-autocomplete.module';
import {CdkTipoRelatorioFilterModule} from '../sidebars/cdk-tipo-relatorio-filter/cdk-tipo-relatorio-filter.module';

@NgModule({
    declarations: [
        CdkTipoRelatorioGridComponent,
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkTipoRelatorioAutocompleteModule,
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
