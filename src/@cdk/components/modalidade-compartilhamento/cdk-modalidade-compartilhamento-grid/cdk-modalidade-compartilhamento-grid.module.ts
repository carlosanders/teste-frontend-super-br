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
import {ModalidadeCompartilhamentoService} from '@cdk/services/modalidade-compartilhamento.service';
import {CdkModalidadeCompartilhamentoGridComponent} from './cdk-modalidade-compartilhamento-grid.component';
import {CdkModalidadeCompartilhamentoAutocompleteModule} from '@cdk/components/modalidade-compartilhamento/cdk-modalidade-compartilhamento-autocomplete/cdk-modalidade-compartilhamento-autocomplete.module';
import {
    CdkModalidadeCompartilhamentoFilterModule,
} from '../sidebars/cdk-modalidade-compartilhamento-filter/cdk-modalidade-compartilhamento-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeCompartilhamentoGridComponent,
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

        CdkModalidadeCompartilhamentoAutocompleteModule,
        CdkModalidadeCompartilhamentoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeCompartilhamentoService,
    ],
    exports: [
        CdkModalidadeCompartilhamentoGridComponent
    ]
})
export class CdkModalidadeCompartilhamentoGridModule {
}
