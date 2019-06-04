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
import { ModalidadeRelacionamentoPessoalService } from '@cdk/services/modalidade-relacionamento-pessoal.service';
import { CdkModalidadeRelacionamentoPessoalGridComponent} from './cdk-modalidade-relacionamento-pessoal-grid.component';
import { CdkModalidadeRelacionamentoPessoalGridFilterComponent } from './cdk-modalidade-relacionamento-pessoal-grid-filter/cdk-modalidade-relacionamento-pessoal-grid-filter.component';
import { CdkModalidadeRelacionamentoPessoalAutocompleteModule } from '@cdk/components/modalidade-relacionamento-pessoal/cdk-modalidade-relacionamento-pessoal-autocomplete/cdk-modalidade-relacionamento-pessoal-autocomplete.module';

@NgModule({
    declarations: [
        CdkModalidadeRelacionamentoPessoalGridComponent,
        CdkModalidadeRelacionamentoPessoalGridFilterComponent
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

        CdkModalidadeRelacionamentoPessoalAutocompleteModule,

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
