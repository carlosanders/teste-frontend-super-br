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
import {VinculacaoRoleService} from '@cdk/services/vinculacao-role.service';
import {CdkVinculacaoRoleGridComponent} from './cdk-vinculacao-role-grid.component';
import {CdkVinculacaoRoleAutocompleteModule} from '@cdk/components/vinculacao-role/cdk-vinculacao-role-autocomplete/cdk-vinculacao-role-autocomplete.module';
import {CdkVinculacaoRoleGridFilterModule} from './cdk-vinculacao-role-grid-filter/cdk-vinculacao-role-grid-filter.module';
import {CdkVinculacaoRoleMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkVinculacaoRoleGridComponent,
        CdkVinculacaoRoleMainSidebarComponent,
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

        CdkVinculacaoRoleAutocompleteModule,
        CdkVinculacaoRoleGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        VinculacaoRoleService,
    ],
    exports: [
        CdkVinculacaoRoleGridComponent
    ]
})
export class CdkVinculacaoRoleGridModule {
}
