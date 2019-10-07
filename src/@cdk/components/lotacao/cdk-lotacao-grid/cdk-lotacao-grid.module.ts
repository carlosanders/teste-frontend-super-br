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
import {LotacaoService} from '@cdk/services/lotacao.service';
import {CdkLotacaoGridComponent} from './cdk-lotacao-grid.component';
import {CdkLotacaoGridFilterModule} from './cdk-lotacao-grid-filter/cdk-lotacao-grid-filter.module';

@NgModule({
    declarations: [
        CdkLotacaoGridComponent
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

        CdkLotacaoGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        LotacaoService,
    ],
    exports: [
        CdkLotacaoGridComponent
    ]
})
export class CdkLotacaoGridModule {
}
