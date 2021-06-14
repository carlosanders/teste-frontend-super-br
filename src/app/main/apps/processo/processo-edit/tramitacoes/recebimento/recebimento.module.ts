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

import {RecebimentoComponent} from './recebimento.component';
import {RouterModule, Routes} from '@angular/router';
import {RecebimentoStoreModule} from './store/store.module';
import {CdkRecebimentoFormModule} from '@cdk/components/tramitacao/cdk-recebimento-form/cdk-recebimento-form.module';
import {modulesConfig} from 'modules/modules-config';
import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: ':tramitacaoHandle',
        component: RecebimentoComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/tramitacoes/recebimento';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RecebimentoComponent
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

        CdkRecebimentoFormModule,

        TranslateModule,

        RecebimentoStoreModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        fromGuards.ResolveGuard
    ]
})
export class RecebimentoModule {
}
