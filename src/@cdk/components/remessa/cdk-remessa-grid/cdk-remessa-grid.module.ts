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
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {CdkRemessaGridComponent} from './cdk-remessa-grid.component';
import {CdkRemessaGridFilterModule} from '../sidebars/cdk-remessa-grid-filter/cdk-remessa-grid-filter.module';
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

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
