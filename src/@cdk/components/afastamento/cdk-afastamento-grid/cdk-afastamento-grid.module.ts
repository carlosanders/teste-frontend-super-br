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

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeAfastamentoService} from '@cdk/services/modalidade-afastamento.service';
import {CdkModalidadeAfastamentoAutocompleteModule} from '@cdk/components/modalidade-afastamento/cdk-modalidade-afastamento-autocomplete/cdk-modalidade-afastamento-autocomplete.module';
import {CdkAfastamentoGridComponent} from './cdk-afastamento-grid.component';
import {CdkAfastamentoGridFilterModule} from './cdk-afastamento-grid-filter/cdk-afastamento-grid-filter.module';
import {CdkAfastamentoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkAfastamentoGridComponent,
        CdkAfastamentoMainSidebarComponent,
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
        CdkAfastamentoGridFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        ModalidadeAfastamentoService,
    ],
    exports: [
        CdkAfastamentoGridComponent
    ]
})
export class CdkAfastamentoGridModule {
}
