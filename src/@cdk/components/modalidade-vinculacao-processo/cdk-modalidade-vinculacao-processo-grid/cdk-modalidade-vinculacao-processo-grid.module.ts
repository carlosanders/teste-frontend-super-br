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

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {ModalidadeVinculacaoProcessoService} from '@cdk/services/modalidade-vinculacao-processo.service';
import {CdkModalidadeVinculacaoProcessoGridComponent} from './cdk-modalidade-vinculacao-processo-grid.component';
import {CdkModalidadeVinculacaoProcessoAutocompleteModule} from '@cdk/components/modalidade-vinculacao-processo/cdk-modalidade-vinculacao-processo-autocomplete/cdk-modalidade-vinculacao-processo-autocomplete.module';
import {CdkModalidadeVinculacaoProcessoGridFilterModule} from './cdk-modalidade-vinculacao-processo-grid-filter/cdk-modalidade-vinculacao-processo-grid-filter.module';
import {CdkModalidadeVinculacaoProcessoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkModalidadeVinculacaoProcessoGridComponent,
        CdkModalidadeVinculacaoProcessoMainSidebarComponent,
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

        CdkModalidadeVinculacaoProcessoAutocompleteModule,
        CdkModalidadeVinculacaoProcessoGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        ModalidadeVinculacaoProcessoService,
    ],
    exports: [
        CdkModalidadeVinculacaoProcessoGridComponent
    ]
})
export class CdkModalidadeVinculacaoProcessoGridModule {
}
