import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
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

        CdkSharedModule,
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
