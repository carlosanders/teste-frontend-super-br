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
import {ModalidadeTransicaoService} from '@cdk/services/modalidade-transicao.service';
import {CdkModalidadeTransicaoGridComponent} from './cdk-modalidade-transicao-grid.component';
import {CdkModalidadeTransicaoAutocompleteModule} from '@cdk/components/modalidade-transicao/cdk-modalidade-transicao-autocomplete/cdk-modalidade-transicao-autocomplete.module';
import {CdkModalidadeTransicaoGridFilterModule} from './cdk-modalidade-transicao-grid-filter/cdk-modalidade-transicao-grid-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeTransicaoGridComponent
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

        CdkModalidadeTransicaoAutocompleteModule,
        CdkModalidadeTransicaoGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeTransicaoService,
    ],
    exports: [
        CdkModalidadeTransicaoGridComponent
    ]
})
export class CdkModalidadeTransicaoGridModule {
}
