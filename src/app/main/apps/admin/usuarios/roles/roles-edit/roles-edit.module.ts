import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {RolesEditComponent} from './roles-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {AdminVinculacaoRoleEditStoreModule} from './store/store.module';
import {VinculacaoRoleService} from '@cdk/services/vinculacao-role.service';

import * as fromGuards from './store/guards';

import {PathModule} from '@cdk/components/path/path.module';
import {CdkVinculacaoRoleFormModule} from '@cdk/components/vinculacao-role/cdk-vinculacao-role-form/cdk-vinculacao-role-form.module';
import {StaticRoleService} from '@cdk/services/static-role.service';

const routes: Routes = [
    {
        path: ':roleHandle',
        component: RolesEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        RolesEditComponent
    ],
    imports: [

        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,

        AdminVinculacaoRoleEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        PathModule,
        CdkVinculacaoRoleFormModule,
    ],
    providers: [
        VinculacaoRoleService,
        StaticRoleService,
        fromGuards.ResolveGuard
    ]
})
export class RolesEditModule {
}
