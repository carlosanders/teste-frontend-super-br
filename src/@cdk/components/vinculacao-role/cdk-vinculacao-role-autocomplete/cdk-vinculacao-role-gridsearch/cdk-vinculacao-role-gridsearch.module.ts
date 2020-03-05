import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {VinculacaoRoleService} from '@cdk/services/vinculacao-role.service';
import {CdkVinculacaoRoleGridsearchComponent} from './cdk-vinculacao-role-gridsearch.component';
import {CdkVinculacaoRoleGridModule} from '@cdk/components/vinculacao-role/cdk-vinculacao-role-grid/cdk-vinculacao-role-grid.module';

@NgModule({
    declarations: [
        CdkVinculacaoRoleGridsearchComponent
    ],
    imports: [

        CdkVinculacaoRoleGridModule,

        CdkSharedModule,
    ],
    providers: [
        VinculacaoRoleService
    ],
    exports: [
        CdkVinculacaoRoleGridsearchComponent
    ]
})
export class CdkVinculacaoRoleGridsearchModule {
}
