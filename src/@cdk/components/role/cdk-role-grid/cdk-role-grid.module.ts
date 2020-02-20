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

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {RoleService} from '@cdk/services/role.service';
import {CdkRoleGridComponent} from './cdk-role-grid.component';
import {CdkRoleAutocompleteModule} from '@cdk/components/role/cdk-role-autocomplete/cdk-role-autocomplete.module';
import {CdkRoleGridFilterModule} from './cdk-role-grid-filter/cdk-role-grid-filter.module';
import {CdkRoleMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkRoleGridComponent,
        CdkRoleMainSidebarComponent,
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
        MatSelectModule,

        CdkRoleAutocompleteModule,
        CdkRoleGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        RoleService,
    ],
    exports: [
        CdkRoleGridComponent
    ]
})
export class CdkRoleGridModule {
}
