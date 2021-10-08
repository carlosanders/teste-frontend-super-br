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

import {VisibilidadeEditComponent} from './visibilidade-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkVisibilidadeFormModule} from '@cdk/components/visibilidade/cdk-visibilidade-form/cdk-visibilidade-form.module';
import {VisibilidadeEditStoreModule} from './store/store.module';

import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';
import {CdkVisibilidadeRoleFormModule} from '@cdk/components/visibilidade/cdk-visibilidade-role-form/cdk-visibilidade-role-form.module';
import {StaticRoleService} from '@cdk/services/static-role.service';

const routes: Routes = [
    {
        path: '',
        component: VisibilidadeEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/visibilidades/visibilidade-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        VisibilidadeEditComponent
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

        CdkVisibilidadeFormModule,

        VisibilidadeEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        CdkVisibilidadeRoleFormModule,
    ],
    providers: [
        StaticRoleService,
        fromGuards.ResolveGuard
    ]
})
export class VisibilidadeEditModule {
}
