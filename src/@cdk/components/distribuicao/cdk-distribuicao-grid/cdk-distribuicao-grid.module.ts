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
    MatSelectModule, MatTooltipModule,
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {DistribuicaoService} from '@cdk/services/distribuicao.service';
import {CdkDistribuicaoGridComponent} from './cdk-distribuicao-grid.component';
import {CdkDistribuicaoAutocompleteModule} from '@cdk/components/distribuicao/cdk-distribuicao-autocomplete/cdk-distribuicao-autocomplete.module';
import {CdkDistribuicaoGridFilterModule} from './cdk-distribuicao-grid-filter/cdk-distribuicao-grid-filter.module';

@NgModule({
    declarations: [
        CdkDistribuicaoGridComponent
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

        FuseSharedModule,

        CdkDistribuicaoAutocompleteModule,
        CdkDistribuicaoGridFilterModule,
        MatTooltipModule
    ],
    providers: [
        DistribuicaoService,
    ],
    exports: [
        CdkDistribuicaoGridComponent
    ]
})
export class CdkDistribuicaoGridModule {
}
