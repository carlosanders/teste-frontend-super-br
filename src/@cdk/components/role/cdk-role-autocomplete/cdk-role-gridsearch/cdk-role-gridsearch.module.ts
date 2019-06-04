import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {RoleService} from '@cdk/services/role.service';
import {CdkRoleGridsearchComponent} from './cdk-role-gridsearch.component';
import {CdkRoleGridModule} from '@cdk/components/role/cdk-role-grid/cdk-role-grid.module';

@NgModule({
    declarations: [
        CdkRoleGridsearchComponent
    ],
    imports: [

        CdkRoleGridModule,

        FuseSharedModule,
    ],
    providers: [
        RoleService
    ],
    exports: [
        CdkRoleGridsearchComponent
    ]
})
export class CdkRoleGridsearchModule {
}
