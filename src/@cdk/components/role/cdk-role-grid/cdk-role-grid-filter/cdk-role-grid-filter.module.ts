import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {RoleService} from '@cdk/services/role.service';
import {CdkRoleGridFilterComponent} from './cdk-role-grid-filter.component';

@NgModule({
    declarations: [
        CdkRoleGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        RoleService,
    ],
    exports: [
        CdkRoleGridFilterComponent
    ]
})
export class CdkRoleGridFilterModule {
}
