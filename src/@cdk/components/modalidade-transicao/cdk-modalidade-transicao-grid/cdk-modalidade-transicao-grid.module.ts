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
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeTransicaoService } from '@cdk/services/modalidade-transicao.service';
import { CdkModalidadeTransicaoGridComponent} from './cdk-modalidade-transicao-grid.component';
import { CdkModalidadeTransicaoGridFilterComponent } from './cdk-modalidade-transicao-grid-filter/cdk-modalidade-transicao-grid-filter.component';
import { CdkModalidadeTransicaoAutocompleteModule } from '@cdk/components/modalidade-transicao/cdk-modalidade-transicao-autocomplete/cdk-modalidade-transicao-autocomplete.module';

@NgModule({
    declarations: [
        CdkModalidadeTransicaoGridComponent,
        CdkModalidadeTransicaoGridFilterComponent
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

        CdkModalidadeTransicaoAutocompleteModule,

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
