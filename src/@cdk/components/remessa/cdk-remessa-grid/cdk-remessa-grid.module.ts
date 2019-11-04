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

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {CdkRemessaGridComponent} from './cdk-remessa-grid.component';
import {CdkRemessaGridFilterModule} from './cdk-remessa-grid-filter/cdk-remessa-grid-filter.module';
import {CdkRemessaMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkRemessaGridComponent,
        CdkRemessaMainSidebarComponent,
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
        FuseSidebarModule,
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
