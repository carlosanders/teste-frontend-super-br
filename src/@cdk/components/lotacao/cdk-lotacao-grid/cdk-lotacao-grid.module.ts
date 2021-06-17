import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {LotacaoService} from '@cdk/services/lotacao.service';
import {CdkLotacaoGridComponent} from './cdk-lotacao-grid.component';
import {CdkLotacaoFilterModule} from '../sidebars/cdk-lotacao-filter/cdk-lotacao-filter.module';

@NgModule({
    declarations: [
        CdkLotacaoGridComponent,
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

        CdkLotacaoFilterModule,

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
