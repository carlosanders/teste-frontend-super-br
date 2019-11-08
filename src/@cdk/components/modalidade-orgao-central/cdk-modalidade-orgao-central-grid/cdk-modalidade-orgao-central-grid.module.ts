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

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {ModalidadeOrgaoCentralService} from '@cdk/services/modalidade-orgao-central.service';
import {CdkModalidadeOrgaoCentralGridComponent} from './cdk-modalidade-orgao-central-grid.component';
import {CdkModalidadeOrgaoCentralAutocompleteModule} from '@cdk/components/modalidade-orgao-central/cdk-modalidade-orgao-central-autocomplete/cdk-modalidade-orgao-central-autocomplete.module';
import {CdkModalidadeOrgaoCentralGridFilterModule} from './cdk-modalidade-orgao-central-grid-filter/cdk-modalidade-orgao-central-grid-filter.module';
import {CdkModalidadeOrgaoCentralMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkModalidadeOrgaoCentralGridComponent,
        CdkModalidadeOrgaoCentralMainSidebarComponent,
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

        CdkModalidadeOrgaoCentralAutocompleteModule,
        CdkModalidadeOrgaoCentralGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        ModalidadeOrgaoCentralService,
    ],
    exports: [
        CdkModalidadeOrgaoCentralGridComponent
    ]
})
export class CdkModalidadeOrgaoCentralGridModule {
}
