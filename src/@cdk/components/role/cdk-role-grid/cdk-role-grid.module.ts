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
import {RoleService} from '@cdk/services/role.service';
import {CdkRoleGridComponent} from './cdk-role-grid.component';
import {CdkRoleAutocompleteModule} from '@cdk/components/role/cdk-role-autocomplete/cdk-role-autocomplete.module';
import {CdkRoleGridFilterModule} from './cdk-role-grid-filter/cdk-role-grid-filter.module';

@NgModule({
    declarations: [
        CdkRoleGridComponent
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
        CdkRoleAutocompleteModule,
        FuseSharedModule,
        CdkRoleGridFilterModule
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
