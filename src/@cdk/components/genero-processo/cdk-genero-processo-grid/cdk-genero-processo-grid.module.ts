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
import {GeneroProcessoService} from '@cdk/services/genero-processo.service';
import {CdkGeneroProcessoGridComponent} from './cdk-genero-processo-grid.component';
import {CdkGeneroProcessoAutocompleteModule} from '@cdk/components/genero-processo/cdk-genero-processo-autocomplete/cdk-genero-processo-autocomplete.module';
import {CdkGeneroProcessoFilterModule} from '../sidebars/cdk-genero-processo-filter/cdk-genero-processo-filter.module';

@NgModule({
    declarations: [
        CdkGeneroProcessoGridComponent,
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

        CdkGeneroProcessoAutocompleteModule,
        CdkGeneroProcessoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        GeneroProcessoService,
    ],
    exports: [
        CdkGeneroProcessoGridComponent
    ]
})
export class CdkGeneroProcessoGridModule {
}
