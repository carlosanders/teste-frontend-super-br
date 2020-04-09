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
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {LotacaoService} from '@cdk/services/lotacao.service';
import {CdkLotacaoGridComponent} from './cdk-lotacao-grid.component';
import {CdkLotacaoGridFilterModule} from '../sidebars/cdk-lotacao-grid-filter/cdk-lotacao-grid-filter.module';
import {CdkLotacaoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkLotacaoGridComponent,
        CdkLotacaoMainSidebarComponent,
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

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
