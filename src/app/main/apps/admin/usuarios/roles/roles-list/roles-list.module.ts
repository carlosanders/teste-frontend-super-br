import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {RolesListComponent} from './roles-list.component';
import {VinculacaoRoleService} from '@cdk/services/vinculacao-role.service';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {AdminRolesListStoreModule} from './store/store.module';
import {PathModule} from '@cdk/components/path/path.module';
import {CdkVinculacaoRoleGridModule} from '@cdk/components/vinculacao-role/cdk-vinculacao-role-grid/cdk-vinculacao-role-grid.module';

const routes: Routes = [
    {
        path: '',
        component: RolesListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        RolesListComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatExpansionModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        TranslateModule,

        CdkSharedModule,

        AdminRolesListStoreModule,
        CdkVinculacaoRoleGridModule,
        PathModule,
    ],
    providers: [
        VinculacaoRoleService,
        fromGuards.ResolveGuard
    ],
    exports: [
        RolesListComponent
    ]
})
export class RolesListModule {
}
