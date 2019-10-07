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
import {ModalidadeRelacionamentoPessoalService} from '@cdk/services/modalidade-relacionamento-pessoal.service';
import {CdkModalidadeRelacionamentoPessoalGridComponent} from './cdk-modalidade-relacionamento-pessoal-grid.component';
import {CdkModalidadeRelacionamentoPessoalAutocompleteModule} from '@cdk/components/modalidade-relacionamento-pessoal/cdk-modalidade-relacionamento-pessoal-autocomplete/cdk-modalidade-relacionamento-pessoal-autocomplete.module';
import {CdkModalidadeRelacionamentoPessoalGridFilterModule} from './cdk-modalidade-relacionamento-pessoal-grid-filter/cdk-modalidade-relacionamento-pessoal-grid-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeRelacionamentoPessoalGridComponent
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

        CdkModalidadeRelacionamentoPessoalAutocompleteModule,
        CdkModalidadeRelacionamentoPessoalGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeRelacionamentoPessoalService,
    ],
    exports: [
        CdkModalidadeRelacionamentoPessoalGridComponent
    ]
})
export class CdkModalidadeRelacionamentoPessoalGridModule {
}
