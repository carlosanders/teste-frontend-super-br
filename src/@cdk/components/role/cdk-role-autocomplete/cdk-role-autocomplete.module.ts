import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {RoleService} from '@cdk/services/role.service';
import {CdkRoleAutocompleteComponent} from './cdk-role-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkRoleAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        RoleService,
    ],
    exports: [
        CdkRoleAutocompleteComponent
    ]
})
export class CdkRoleAutocompleteModule {
}
