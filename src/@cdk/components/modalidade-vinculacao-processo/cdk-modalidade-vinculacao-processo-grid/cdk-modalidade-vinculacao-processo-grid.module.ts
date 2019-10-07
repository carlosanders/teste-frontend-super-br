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
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {ModalidadeVinculacaoProcessoService} from '@cdk/services/modalidade-vinculacao-processo.service';
import {CdkModalidadeVinculacaoProcessoGridComponent} from './cdk-modalidade-vinculacao-processo-grid.component';
import {CdkModalidadeVinculacaoProcessoAutocompleteModule} from '@cdk/components/modalidade-vinculacao-processo/cdk-modalidade-vinculacao-processo-autocomplete/cdk-modalidade-vinculacao-processo-autocomplete.module';
import {CdkModalidadeVinculacaoProcessoGridFilterModule} from './cdk-modalidade-vinculacao-processo-grid-filter/cdk-modalidade-vinculacao-processo-grid-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeVinculacaoProcessoGridComponent
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
