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
import {ModalidadeDestinacaoService} from '@cdk/services/modalidade-destinacao.service';
import {CdkModalidadeDestinacaoGridComponent} from './cdk-modalidade-destinacao-grid.component';
import {CdkModalidadeDestinacaoAutocompleteModule} from '@cdk/components/modalidade-destinacao/cdk-modalidade-destinacao-autocomplete/cdk-modalidade-destinacao-autocomplete.module';
import {CdkModalidadeDestinacaoGridFilterModule} from './cdk-modalidade-destinacao-grid-filter/cdk-modalidade-destinacao-grid-filter.module';
import {CdkModalidadeDestinacaoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkModalidadeDestinacaoGridComponent,
        CdkModalidadeDestinacaoMainSidebarComponent,
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

        CdkModalidadeDestinacaoAutocompleteModule,
        CdkModalidadeDestinacaoGridFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        ModalidadeDestinacaoService,
    ],
    exports: [
        CdkModalidadeDestinacaoGridComponent
    ]
})
export class CdkModalidadeDestinacaoGridModule {
}
