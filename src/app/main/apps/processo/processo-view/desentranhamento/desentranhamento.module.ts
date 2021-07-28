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
import {RouterModule, Routes} from '@angular/router';

import {ProcessoViewDesentranhamentoStoreModule} from './store/store.module';
import {DesentranhamentoService} from '@cdk/services/desentranhamento.service';
import {DesentranhamentoComponent} from './desentranhamento.component';

import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';
import {CdkConfirmDialogModule, CdkSidebarModule} from '@cdk/components';
import {CdkDesentranhamentoFormModule} from '@cdk/components/desentranhamento/cdk-desentranhamento-form/cdk-desentranhamento-form.module';
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';

const routes: Routes = [
    {
        path: ':juntadaHandle',
        component: DesentranhamentoComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-view/desentranhamento';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DesentranhamentoComponent
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

        CdkDesentranhamentoFormModule,

        ProcessoViewDesentranhamentoStoreModule,
        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        CdkConfirmDialogModule
    ],
    providers: [
        DesentranhamentoService,
        fromGuards.ResolveGuard
    ],
    entryComponents: [CdkConfirmDialogComponent],
})
export class DesentranhamentoModule {
}
