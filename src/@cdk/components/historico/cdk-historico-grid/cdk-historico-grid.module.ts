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
} from '@cdk/angular/material';

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {HistoricoService} from '@cdk/services/historico.service';
import {CdkHistoricoGridComponent} from './cdk-historico-grid.component';
import {CdkHistoricoAutocompleteModule} from '@cdk/components/historico/cdk-historico-autocomplete/cdk-historico-autocomplete.module';
import {CdkHistoricoGridFilterModule} from './cdk-historico-grid-filter/cdk-historico-grid-filter.module';
import {CdkHistoricoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkHistoricoGridComponent,
        CdkHistoricoMainSidebarComponent,
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

        CdkHistoricoAutocompleteModule,
        CdkHistoricoGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        HistoricoService,
    ],
    exports: [
        CdkHistoricoGridComponent
    ]
})
export class CdkHistoricoGridModule {
}
