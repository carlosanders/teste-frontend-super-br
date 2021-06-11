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
import {ModalidadeAfastamentoService} from '@cdk/services/modalidade-afastamento.service';
import {CdkModalidadeAfastamentoGridComponent} from './cdk-modalidade-afastamento-grid.component';
import {CdkModalidadeAfastamentoAutocompleteModule} from '@cdk/components/modalidade-afastamento/cdk-modalidade-afastamento-autocomplete/cdk-modalidade-afastamento-autocomplete.module';
import {CdkModalidadeAfastamentoFilterModule} from '../sidebars/cdk-modalidade-afastamento-filter/cdk-modalidade-afastamento-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeAfastamentoGridComponent,
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

        CdkModalidadeAfastamentoAutocompleteModule,
        CdkModalidadeAfastamentoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeAfastamentoService,
    ],
    exports: [
        CdkModalidadeAfastamentoGridComponent
    ]
})
export class CdkModalidadeAfastamentoGridModule {
}
