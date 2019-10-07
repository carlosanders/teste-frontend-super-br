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
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {CdkTramitacaoGridComponent} from './cdk-tramitacao-grid.component';
import {CdkTramitacaoGridFilterModule} from './cdk-tramitacao-grid-filter/cdk-tramitacao-grid-filter.module';

@NgModule({
    declarations: [
        CdkTramitacaoGridComponent
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

        CdkTramitacaoGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        TramitacaoService,
    ],
    exports: [
        CdkTramitacaoGridComponent
    ]
})
export class CdkTramitacaoGridModule {
}
