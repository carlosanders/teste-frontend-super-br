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
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {CdkRemessaGridComponent} from './cdk-remessa-grid.component';
import {CdkRemessaFilterModule} from '../sidebars/cdk-remessa-filter/cdk-remessa-filter.module';
import {DndModule} from "ngx-drag-drop";
import {TableDefinitionsService} from "../../table-definitions/table-definitions.service";

@NgModule({
    declarations: [
        CdkRemessaGridComponent,
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

        CdkRemessaFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
        DndModule,
    ],
    providers: [
        TramitacaoService,
        TableDefinitionsService
    ],
    exports: [
        CdkRemessaGridComponent
    ]
})
export class CdkRemessaGridModule {
}
