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

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {HistoricoService} from '@cdk/services/historico.service';
import {CdkHistoricoGridComponent} from './cdk-historico-grid.component';
import {CdkHistoricoAutocompleteModule} from '@cdk/components/historico/cdk-historico-autocomplete/cdk-historico-autocomplete.module';
import {CdkHistoricoFilterModule} from '../sidebars/cdk-historico-filter/cdk-historico-filter.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DndModule} from "ngx-drag-drop";
import {TableDefinitionsService} from "../../table-definitions/table-definitions.service";

@NgModule({
    declarations: [
        CdkHistoricoGridComponent,
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
        CdkHistoricoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
        DndModule,
    ],
    providers: [
        HistoricoService,
        TableDefinitionsService,
    ],
    exports: [
        CdkHistoricoGridComponent
    ]
})
export class CdkHistoricoGridModule {
}
