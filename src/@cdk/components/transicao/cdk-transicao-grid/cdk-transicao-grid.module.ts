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
import {TransicaoService} from '@cdk/services/transicao.service';
import {CdkTransicaoGridComponent} from './cdk-transicao-grid.component';
import {CdkTransicaoAutocompleteModule} from '@cdk/components/transicao/cdk-transicao-autocomplete/cdk-transicao-autocomplete.module';
import {CdkTransicaoGridFilterModule} from './cdk-transicao-grid-filter/cdk-transicao-grid-filter.module';
import {CdkTransicaoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkTransicaoGridComponent,
        CdkTransicaoMainSidebarComponent,
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

        CdkTransicaoAutocompleteModule,
        CdkTransicaoGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        TransicaoService,
    ],
    exports: [
        CdkTransicaoGridComponent
    ]
})
export class CdkTransicaoGridModule {
}
