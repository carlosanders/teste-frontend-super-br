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

import {RemessaEditComponent} from './remessa-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkRemessaFormModule} from '@cdk/components/remessa/cdk-remessa-form/cdk-remessa-form.module';
import {RemessaEditStoreModule} from './store/store.module';
import {TramitacaoService} from '@cdk/services/tramitacao.service';

import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: ':tramitacaoHandle',
        component: RemessaEditComponent,
        children: [
            {
                path       : 'pessoa',
                loadChildren: () => import('app/main/apps/pessoa/pessoa.module').then(m => m.PessoaModule),
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/remessas/remessa-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RemessaEditComponent
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

        CdkRemessaFormModule,

        RemessaEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        TramitacaoService,
        fromGuards.ResolveGuard
    ]
})
export class RemessaEditModule {
}
