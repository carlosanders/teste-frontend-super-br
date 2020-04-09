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
import {HistoricoService} from '@cdk/services/historico.service';
import {CdkHistoricoGridComponent} from './cdk-historico-grid.component';
import {CdkHistoricoAutocompleteModule} from '@cdk/components/historico/cdk-historico-autocomplete/cdk-historico-autocomplete.module';
import {CdkHistoricoGridFilterModule} from '../sidebars/cdk-historico-grid-filter/cdk-historico-grid-filter.module';
import {CdkHistoricoMainSidebarComponent} from './sidebars/main/main.component';
import {MatTooltipModule} from '@angular/material/tooltip';

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

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
