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
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {ModalidadeDestinacaoService} from '@cdk/services/modalidade-destinacao.service';
import {CdkModalidadeDestinacaoAutocompleteModule} from '@cdk/components/modalidade-destinacao/cdk-modalidade-destinacao-autocomplete/cdk-modalidade-destinacao-autocomplete.module';
import {CdkClassificacaoGridComponent} from './cdk-classificacao-grid.component';
import {CdkClassificacaoGridFilterModule} from './cdk-classificacao-grid-filter/cdk-classificacao-grid-filter.module';
import {FuseSidebarModule} from '@fuse/components';
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

        FuseSharedModule,
        FuseSidebarModule,
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
