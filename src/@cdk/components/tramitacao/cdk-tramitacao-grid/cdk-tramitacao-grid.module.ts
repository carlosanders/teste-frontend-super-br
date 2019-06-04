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
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {CdkTramitacaoGridComponent} from './cdk-tramitacao-grid.component';
import {CdkTramitacaoAutocompleteModule} from '@cdk/components/tramitacao/cdk-tramitacao-autocomplete/cdk-tramitacao-autocomplete.module';
import {CdkTramitacaoGridFilterModule} from './cdk-tramitacao-grid-filter/cdk-tramitacao-grid-filter.module';

@NgModule({
    declarations: [
        CdkTramitacaoGridComponent
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        CdkTramitacaoAutocompleteModule,
        FuseSharedModule,
        CdkTramitacaoGridFilterModule
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
