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

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {CdkTramitacaoGridComponent} from './cdk-tramitacao-grid.component';
import {CdkTramitacaoGridFilterModule} from './cdk-tramitacao-grid-filter/cdk-tramitacao-grid-filter.module';
import {CdkTramitacaoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkTramitacaoGridComponent,
        CdkTramitacaoMainSidebarComponent,
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

        CdkSharedModule,
        CdkSidebarModule,
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
