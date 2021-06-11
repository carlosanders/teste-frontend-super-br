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
import {GeneroRelatorioService} from '@cdk/services/genero-relatorio.service';
import {CdkGeneroRelatorioGridComponent} from './cdk-genero-relatorio-grid.component';
import {CdkGeneroRelatorioAutocompleteModule} from '@cdk/components/genero-relatorio/cdk-genero-relatorio-autocomplete/cdk-genero-relatorio-autocomplete.module';
import {CdkGeneroRelatorioFilterModule} from '../sidebars/cdk-genero-relatorio-filter/cdk-genero-relatorio-filter.module';

@NgModule({
    declarations: [
        CdkGeneroRelatorioGridComponent,
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

        CdkGeneroRelatorioAutocompleteModule,
        CdkGeneroRelatorioFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        GeneroRelatorioService,
    ],
    exports: [
        CdkGeneroRelatorioGridComponent
    ]
})
export class CdkGeneroRelatorioGridModule {
}
