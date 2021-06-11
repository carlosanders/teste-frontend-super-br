import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {VinculacaoRoleService} from '@cdk/services/vinculacao-role.service';
import {CdkVinculacaoRoleAutocompleteComponent} from './cdk-vinculacao-role-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkVinculacaoRoleAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        VinculacaoRoleService,
    ],
    exports: [
        CdkVinculacaoRoleAutocompleteComponent
    ]
})
export class CdkVinculacaoRoleAutocompleteModule {
}
