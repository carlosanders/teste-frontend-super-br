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

import {SetorEditComponent} from './setor-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkSetorFormModule} from '@cdk/components/setor/cdk-setor-form/cdk-setor-form.module';
import {SetorEditStoreModule} from './store/store.module';
import {SetorService} from '@cdk/services/setor.service';

import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: SetorEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/coordenador/setor/setor-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        SetorEditComponent
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

        CdkSetorFormModule,

        SetorEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        PathModule,
    ],
    providers: [
        SetorService,
        fromGuards.ResolveGuard
    ]
})
export class SetorEditModule {
}
