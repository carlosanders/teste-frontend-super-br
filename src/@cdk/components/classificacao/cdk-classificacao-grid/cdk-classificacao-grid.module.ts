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
    MatTooltipModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeDestinacaoService} from '@cdk/services/modalidade-destinacao.service';
import {CdkModalidadeDestinacaoAutocompleteModule} from '@cdk/components/modalidade-destinacao/cdk-modalidade-destinacao-autocomplete/cdk-modalidade-destinacao-autocomplete.module';
import {CdkClassificacaoGridComponent} from './cdk-classificacao-grid.component';
import {CdkClassificacaoGridFilterModule} from '../sidebars/cdk-classificacao-grid-filter/cdk-classificacao-grid-filter.module';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkClassificacaoListMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkClassificacaoGridComponent,
        CdkClassificacaoListMainSidebarComponent

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
        MatTooltipModule,

        CdkModalidadeDestinacaoAutocompleteModule,
        CdkClassificacaoGridFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        ModalidadeDestinacaoService,
    ],
    exports: [
        CdkClassificacaoGridComponent
    ]
})
export class CdkClassificacaoGridModule {
}
