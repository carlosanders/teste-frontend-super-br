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
import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';
import {CdkRelacionamentoPessoalGridComponent} from './cdk-relacionamento-pessoal-grid.component';
import {CdkRelacionamentoPessoalAutocompleteModule} from '@cdk/components/relacionamento-pessoal/cdk-relacionamento-pessoal-autocomplete/cdk-relacionamento-pessoal-autocomplete.module';
import {CdkRelacionamentoPessoalGridFilterModule} from './cdk-relacionamento-pessoal-grid-filter/cdk-relacionamento-pessoal-grid-filter.module';

@NgModule({
    declarations: [
        CdkRelacionamentoPessoalGridComponent
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

        CdkRelacionamentoPessoalAutocompleteModule,
        CdkRelacionamentoPessoalGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        RelacionamentoPessoalService,
    ],
    exports: [
        CdkRelacionamentoPessoalGridComponent
    ]
})
export class CdkRelacionamentoPessoalGridModule {
}
