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
import {VinculacaoRoleService} from '@cdk/services/vinculacao-role.service';
import {CdkVinculacaoRoleGridComponent} from './cdk-vinculacao-role-grid.component';
import {CdkVinculacaoRoleAutocompleteModule} from '@cdk/components/vinculacao-role/cdk-vinculacao-role-autocomplete/cdk-vinculacao-role-autocomplete.module';
import {CdkVinculacaoRoleGridFilterModule} from './cdk-vinculacao-role-grid-filter/cdk-vinculacao-role-grid-filter.module';

@NgModule({
    declarations: [
        CdkVinculacaoRoleGridComponent
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
        CdkVinculacaoRoleAutocompleteModule,
        FuseSharedModule,
        CdkVinculacaoRoleGridFilterModule
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
