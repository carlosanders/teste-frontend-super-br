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
import {CdkRemessaGridComponent} from './cdk-remessa-grid.component';
import {CdkRemessaGridFilterModule} from './cdk-remessa-grid-filter/cdk-remessa-grid-filter.module';

@NgModule({
    declarations: [
        CdkRemessaGridComponent
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

        CdkRemessaGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        TramitacaoService,
    ],
    exports: [
        CdkRemessaGridComponent
    ]
})
export class CdkRemessaGridModule {
}
