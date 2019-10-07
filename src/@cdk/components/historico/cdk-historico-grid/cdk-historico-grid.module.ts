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
import {HistoricoService} from '@cdk/services/historico.service';
import {CdkHistoricoGridComponent} from './cdk-historico-grid.component';
import {CdkHistoricoAutocompleteModule} from '@cdk/components/historico/cdk-historico-autocomplete/cdk-historico-autocomplete.module';
import {CdkHistoricoGridFilterModule} from './cdk-historico-grid-filter/cdk-historico-grid-filter.module';

@NgModule({
    declarations: [
        CdkHistoricoGridComponent
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
